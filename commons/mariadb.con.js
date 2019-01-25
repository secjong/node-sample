var mariadb = require("mariadb");
var config = require("./_config");

// connection pool 생성
var pool = mariadb.createPool({
    host: config.database.host,
    user: config.database.user,
    port: config.database.port,
    password: config.database.password,
    connectionLimit: config.database.connectionLimit,
    database: config.database.database
});

module.exports = pool;