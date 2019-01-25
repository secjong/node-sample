var pool = require('../commons/mariadb.con');

//shopping ad SELECT
module.exports.SELECTTableList = function () {


  return new Promise(function (resolve, reject) {
    pool.getConnection()
    .then((conn) => {
        var sql = "SHOW TABLES";
        conn.query(sql)
        .then((result) => {
            // 조회 결과를 resolve
            resolve(result);
        })
        .catch((err) => {
            throw new Error(err);
        })
        .finally(() => {
            // connection 반환
            conn.release();
        });
    })
    .catch((err) => {
        // 조회 결과를 reject
        reject(err);
    });
  });


};
