//내장모듈
var path = require('path');

//외장모듈
var mkdirs = require('mkdirs');

var config = {
    //로그파일저장경로
    debug_log_path : path.join(__dirname, '../files/_logs'),
    //에러로그파일저장경로
    error_log_path : path.join(__dirname, '../files/_logs'),
    //데이터베이스 접속정보
    database : {
        host : 'localhost',
        port : '3306',
        user : 'root', //root 는 관리자
        password : '1234',
        database : 'mydb', //만들어져있어야함
        connectionLimit : 10,
        // connectTimeout : 10000,
        acquireTimeout : 30000,
        canRetry: true, //기다린 후 재접속 여부,
        waitForConnections: true //커넥션풀이 풀방인 경우 기다릴지 여부
    },
    
    //웹서버 구성정보
    //포트
    server_port: 3000,
    //루트경로
    document_root: path.join(__dirname, '../public'),
    //favicon경로
    favicon_path: path.join(__dirname, '../public/images/favicon.png'),
    //에러페이지경로
    error_page: {
        not_found: path.join(__dirname, '../views/404.html')
    },
    //업로드경로
    upload: {
        uri: '/upload',
        dir: path.join(__dirname, '../files/uploads'),
        max_size: 1024*1024*10,
        max_count: 10
    },
    //다운로드경로
    download: {
        uri: '/download',
        dir: path.join(__dirname, '../files/downloads'),
        max_size: 1024*1024*10,
        max_count: 10
    },
    //보안키(암호화키)
    secure: {
        cookie_encrypt_key: 'credit!23',
        session_encrypt_key: 'credit!23'
    },
    //메일발송정보
    mail_server: {
        service: 'Gmail',
        //직접 구축한 smtp서버를 쓰려면 위의 sevice 지우고 아래옵션으로
        // host: 'mail.mas-i.com',
        // port: 25,
        // secure: false, //대상서버가 아이디와 비밀번호를 요구하는지 여부(이메일서버 개발자에게 확인)
        // auth: {
        //     user: 'info@babyandmama.kr',
        //     pass: 'aB12345!@#$%'
        // }
    }
};



//저장경로에 있는 폴더가 없으면 에러나니까 미리 생성한다. 반복문의로 존재여부 확인하고 생성하는 절차를 mkdirs를 쓰면 이렇게 쉬움!
mkdirs(config.debug_log_path, 0755);
mkdirs(config.error_log_path, 0755);
mkdirs(config.upload.dir, 0755);

//설정정보 내보내기
module.exports = config;