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
                        reject(err);
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
                        reject(err);
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
                        reject(err);
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
                        reject(err);
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
                        reject(err);
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

// INSERT Table Data
module.exports.INSERTTableData = function (data) {

    // INSERT INTO movietable (mNo, mTitle, mDirector, mDate) VALUES(null, '더 새로운 영화', '김구라', now())

    return new Promise(function (resolve, reject) {
        pool.getConnection()
            .then((conn) => {
                var sql = "INSERT INTO " + data.tableName + " (";
                
                var keyStr = "";
                var valueStr = "";
                
                var keyArr = [];
                var valueArr = [];

                for(var key in data.params){
                    // 객체의 모든 속성에 대해서
                    keyArr.push(key);
                    valueArr.push(data.params[key]);
                }

                for(var i = 0; i < keyArr.length; i++){
                    // 쿼리 key 부분 만들기
                    keyStr += (keyArr[i]);
                    if(i+1 !== keyArr.length){
                        // 마지막 요소가 아니라면
                        keyStr += ", ";
                    } else {
                        // 마지막 요소라면 괄호 닫기
                        keyStr += ")";
                    }
                }

                for(var i = 0; i < valueArr.length; i++){
                    // 쿼리 value 부분 만들기
                    if(valueArr[i] === ''){
                        // 값이 입력되지 않았다면
                        valueStr += "null";
                    } else if (valueArr[i] === 'now()'){
                        // 값이 내장함수 now() 라면
                        valueStr += "now()";
                    } else {
                        // 값이 입력되었다면
                        valueStr += ("'" + (valueArr[i]) + "'");
                    }
                    
                    if(i+1 !== valueArr.length){
                        // 마지막 요소가 아니라면
                        valueStr += ", ";
                    } else {
                        // 마지막 요소라면 괄호 닫기
                        valueStr += ")";
                    }
                }

                // 최종 완성된 쿼리
                sql += (keyStr + " VALUES (" + valueStr);

                console.log("sql : " , sql);

                conn.query(sql)
                    .then((result) => {
                        // 조회 결과를 resolve
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
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

// UPDATE Table Data
module.exports.UPDATETableData = function (data) {

    return new Promise(function (resolve, reject) {
        pool.getConnection()
            .then((conn) => {

                var paramsLength = Object.keys(data.params).length; // 객체의 속성 갯수

                var sql = "UPDATE " + data.tableName + " SET ";
                
                var count = 0; // 객체 속성 돌리기 카운터
                for(var key in data.params){
                    count += 1;
                    // 객체의 모든 속성에 대해서
                    
                    // 쿼리 value 부분 만들기
                    if(data.params[key] === ''){
                        // 값이 입력되지 않았다면
                        sql += (key + "= null");
                    } else if (data.params[key] === 'now()'){
                        // 값이 내장함수 now() 라면
                        sql += (key + "= now()");
                    } else {
                        // 값이 입력되었다면
                        sql += (key + "='" + data.params[key] + "'");
                    }

                    if(count !== paramsLength){
                        // 마지막 속성이 아니라면
                        sql += ", ";
                    }
                }

                // where 절 추가
                sql += (" WHERE " + data.priKey + " = '" + data.pk + "'"); 

                console.log("sql : " , sql);

                conn.query(sql)
                    .then((result) => {
                        // 조회 결과를 resolve
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
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

// CUSTOM Query
module.exports.CUSTOMQuery = function (data) {

    return new Promise(function (resolve, reject) {
        pool.getConnection()
            .then((conn) => {
                conn.query(data.query)
                .then((result) => {
                    // 조회 결과를 resolve
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
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

// TRUNCATE Table
module.exports.TRUNCATETable = function (tableName) {

    return new Promise(function (resolve, reject) {
        pool.getConnection()
            .then((conn) => {
                var sql = "TRUNCATE " + tableName;
                conn.query(sql)
                .then((result) => {
                    // 조회 결과를 resolve
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
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

// DROP Table
module.exports.DROPTable = function (tableName) {

    return new Promise(function (resolve, reject) {
        pool.getConnection()
        .then((conn) => {
            var sql = "DROP TABLE " + tableName;
            conn.query(sql)
            .then((result) => {
                // 조회 결과를 resolve
                resolve(result);
            })
            .catch((err) => {
                reject(err);
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



