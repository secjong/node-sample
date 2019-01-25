/*----------------------------------------------------------
 | /common/web_helper.js
 |----------------------------------------------------------
 | Express 모듈이 갖는 req, res 객체의 기능을 확장하기 위한 모듈
 -----------------------------------------------------------*/

 var config = require('./_config.js');
 var logHelper = require('./log_helper.js');
 var multer = require('multer');
 var fs = require('fs'); //내장
 var path = require('path'); //내장
 var nodemailer = require('nodemailer');
 
 module.exports = function () {
   return function webHelper(req, res, next) {
     req._get_param = function (method, key, def) {
       if (def == undefined) {
         def = null;
       }
 
       var result = def;
       if (this.method == method.toUpperCase()) {
         var param = null;
         if (this.method == 'GET') {
           param = this.query[key] || this.params[key]; //쿼리스트링방식인 경우 || URL파라미터방식인 경우
         } else {
           param = this.body[key]; //POST방식인 경우
         }
         // 파라미터 값이 존재한다면?
         if (param !== undefined) {
           param = typeof param === "string" ? param.trim() : param;
           // param = param.trim();선생님이 준 소스
           if ((typeof param === "string" && param !== "") || typeof param !== "string") {
             //문자열이면서 빈값이 아니거나 문자가 아닌 경우
             result = param;
           }
         }
       }
 
       logHelper.debug('[HTTP %s PARAMS] %s=%s', this.method, key, result);
       return result;
     };
 
     req.get = function (key, def) {
       return this._get_param('GET', key, def);
     };
 
     req.post = function (key, def) {
       return this._get_param('POST', key, def);
     };
 
     req.put = function (key, def) {
       return this._get_param('PUT', key, def);
     };
 
     req.delete = function (key, def) {
       return this._get_param('DELETE', key, def);
     };
 
     //호출하면서
     //첫번째 인자로 응답상태, 두번째 인자로 응답정보를
     //응답정보는 result, trace, rtmsg 키로 생성하여 주입
     res.sendResponse = function (status, data) {
       //200 : 요청 정상처리
       //204 : 요청 정상처리, 응답 데이터는 없음
       //400 : 클라이언트의 요청 구문이 옳지 않음. Bad Request
       //403 : 접근금지. 허가되지 않은 접근. Forbidden
       //404 : 요청한 리소스가 존재하지 않음. Not Found
       //500 : 서버에서 처리중 에러 발생. Internal Server Error
 
       var statusCode = {
         200: "OK",
         204: "No Content",
         400: "Bad Request",
         403: "Forbidden",
         404: "Not Found",
         500: "Internal Server Error"
       };
 
       var result = {};
 
       for (code in statusCode) {
         if (code == status) {
           //statusCode 에 status 와 일치하는 키가 있는 경우
           result.status = status;
           result.rt = statusCode[code];
         }
       }
 
       if (data != undefined) {
         for (var attrName in data) {
           result[attrName] = data[attrName];
         }
       }
 
       logHelper.debug('[STATUS %d] %s-%s', result.status, result.rt, result.rtmsg);
       this.status(status).json(result);
     };
 
     //인자 : 전송할 데이터
     // res.sendApi = function (data) {
     //     var json = {
     //         status: 200,
     //         rt: 'OK',
     //         rtmsg: 'SUCCESS'
     //     }
 
     //     if (data != undefined) {
     //         for (var attrname in data) {
     //             json[attrname] = data[attrname];
     //         }
     //     }
 
     //     logHelper.debug('[STATUS %d] %s-%s', json.status, json.rt, json.rtmsg);
     //     this.status(200).send(json);
     // };
 
     //접근권한이 없는 문서를 요청
     //인자1 : 에러메시지
     //인자2 : 에러정보객체
     // res.sendBadRequest = function (msg, trace) {
     //     var json = {
     //         status: 403,
     //         rt: 'Bad Request',
     //         rtmsg: msg
     //     };
 
     //     if (trace != undefined) {
     //         json.trace = trace;
     //     }
 
     //     logHelper.error('[STATUS %d] %s-%s', json.status, json.rt, json.rtmsg);
     //     this.status(403).send(json);
     // };
 
     //서버에러
     //인자1 : 에러메시지
     //인자2 : 에러정보객체
     // res.sendError = function (msg, trace) {
     //     var json = {
     //         status: 500,
     //         rt: 'Server Error',
     //         rtmsg: msg
     //     };
 
     //     if (trace != undefined) {
     //         json.trace = trace;
     //     }
 
     //     logHelper.error('[STATUS %d] %s-%s', json.status, json.rt, json.rtmsg);
     //     this.status(500).send(json);
     // };
 
     req.multipart = multer({
       // 스토리지 설정
       storage: multer.diskStorage({
         // 업로드 될 파일이 저장될 폴더
         destination: function (req, file, callback) {
           callback(null, config.upload.dir);
         },
         // 업로드 된 파일이 저장될 파일이름 규칙
         filename: function (req, file, callback) {
           var fileName = file.originalname;
           var extName = fileName.substring(fileName.lastIndexOf('.'));
           var saveName = Date.now().toString() + extName.toLowerCase();
           file.webpath = '/' + target.replace(path.join(__dirname, '../'), '') + '/' + saveName;
           callback(null, saveName);
         }
       }),
       limits: { // 업로드 제약
         files: config.upload.max_count,
         fileSize: config.upload.max_size
       }
     });
 
     res.sendMail = function (mailOptions, onSuccess, onError) {
       // 메일 발송 서버 인증 정보
       var smtpTransport = nodemailer.createTransport(config.mail_server);
 
       /** 3) 메일 발송하기 */
       smtpTransport.sendMail(mailOptions, function (error, response) {
         if (error) {
           if (onError != undefined) {
             onError(error);
           }
         } else {
           onSuccess(response);
         }
       });
     };
 
     next();
   };
 }