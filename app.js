// process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'production' : 'development';

//express 기본모듈
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

//추가외부모듈
// var errorHandler = require('express-error-handler');
var url = require('url');
var useragent = require('express-useragent');
var expressSession = require('express-session');

//사용자정의모듈
var config = require('./commons/_config');
var router = require('./routes');
var logHelper = require('./commons/log_helper');
var webHelper = require('./commons/web_helper.js');

var app = express();
app.use(useragent.express());
app.set('env', 'development');





// URL이 지정되지 않을 경우, 모든 요청에 대해서 먼저 응답함.
app.use(function (req, res, next) {
  // favicon에 대한 요청이 아닌 경우만 로그 남기기
  if (req.url != "/favicon.ico") {

    // console.log("프로세스 환경 : ", process.env.NODE_ENV);
    console.log("프로세스 환경 : ", app.get('env'));

    var begin = Date.now();

    logHelper.info("------------ client connection ------------");
    logHelper.info("[Process Id] " + process.pid);

    var current_url = url.format({
      protocol: req.protocol,
      host: req.get('host'),
      port: req.port,
      pathname: req.originalUrl
    });

    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    logHelper.info('[ip] %s', ip);

    logHelper.info('[CLIENT INFO] %s / %s (%s) / %s', req.useragent.os, req.useragent.browser, req.useragent.version, req.useragent.platform);
    logHelper.info("[HTTP %s] %s", req.method, current_url);

    // 응답이 종료된 경우의 이벤트
    res.on('finish', function () {
      logHelper.info("---------- client disconnection end ------------");
      var end = Date.now(); // 접속 종료시간
      var time = end - begin;
      logHelper.info('runtime=%dms', time);
      logHelper.info(); // 빈 줄 표시
    });
  }

  res.header('X-Frame-Options', 'SAMEORIGIN');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'http://localhost:8083');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

  next(); // path에 맞는 다음 미들웨어로 제어 넘김
});





app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// bodyParser 설정
// app.use(bodyParser.urlencoded({
//   'extended': 'false'
// }));
// app.use(bodyParser.text());
// app.use(bodyParser.json());
app.use(logger('dev')); //morgan 사용시 미들웨어 설정

// set the secret key variable for jwt & password
app.set('jwt-secret', config.secure.jwt_encrypt_key);
app.set('password-secret', config.secure.password_encrypt_key);

//쿠키값 처리 모듈 설정
app.use(cookieParser(config.secure.cookie_encrypt_key));

//세션 처리 모듈 설정
app.use(expressSession({
  secret: config.secure.session_encrypt_key,
  resave: false,
  saveUninitialized: true
}));

// serve angular front end files from root path
// document root 경로 지정
// 여기부터 모든 자원접근에 대한 경로는 dist 폴더를 기준으로 한다
// --> http://localhost:4000/폴더명/파일명" 형식으로 dist 폴더의 자원에 접근 가능.
// app.use(express.static(path.join(__dirname, '../dist'), {
//   redirect: false
// }));
app.use(express.static(path.join(__dirname, 'public')));

// WebHelper 설정
app.use(webHelper());

//라우터 모듈을 app 모듈에 등록
app.use('/', router);

// error handler
// var err = errorHandler({
//     static: {
//         '404': config.error_page.not_found, //404에러페이지
//         '500': config.error_page.interna_server_error //500에러페이지
//     }
// });
// app.use(errorHandler.httpError(404)); //404에러를 사용하겠다.
// app.use(errorHandler.httpError(500));
// app.use(err); //에러처리 설정정보 전달




// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
