var pool = require('../commons/mariadb.con');

// SELECT Table List
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

// Table Desc
module.exports.SELECTTableDesc = function (tableName) {

    return new Promise(function (resolve, reject) {
        pool.getConnection()
            .then((conn) => {
                var sql = "DESC " + tableName;
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

// SELECT Table Data
module.exports.SELECTTableData = function (tableName) {

    return new Promise(function (resolve, reject) {
        pool.getConnection()
            .then((conn) => {
                var sql = "SELECT * FROM " + tableName;
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

// CREATE Table Data
module.exports.CREATETable = function (data) {
    var tableName = data.tableName;
    var params = data.params;

    var sql = "CREATE TABLE " + tableName + " (";

    for(var i = 0; i < params.length; i+=1){
        var constraintsStr = ""; // 제약조건 저장할 변수
        for(key in params[i]){
            if(key === "colName"){
                var colNameStr = params[i][key];
            }
            if(key === "type"){
                var typeStr = params[i][key];
            }
            if(key === "size"){
                var sizeStr = params[i][key];
            }
            if(key === "constraints" && params[i][key].length !== 0){
                // 제약조건이 걸린 경우
                
                for(var j = 0; j < params[i][key].length; j+=1){
                    constraintsStr += (" " + params[i][key][j]);
                }
            }
        }
        sql += (colNameStr + " " + typeStr + "(" + sizeStr + ")" + constraintsStr);
        if(params.length !== i+1){
            // 마지막 객체가 아닌 경우
            // 컬럼을 구분하는 컴마 추가
            sql += ", ";
        } else {
            // 마지막 객체인 경우 괄호 닫기
            sql += ")";
        }
    }

    return new Promise(function (resolve, reject) {
        pool.getConnection()
            .then((conn) => {
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

// DELETE Table
module.exports.DELETETable = function (data) {

    return new Promise(function (resolve, reject) {
        pool.getConnection()
            .then((conn) => {
                var sql = "DELETE FROM " + data.tableName + " WHERE " + data.priKey + " = ?";
                conn.query(sql, [data.pk])
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



