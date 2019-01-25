var logHelper = require('./log_helper');

function utils() {
  //실제로 빈 값인지 검사하는 메서드
  //빈객체 or 빈문자열 or null or undefined 인 경우 빈 값임
  //false or 0 인 경우는 빈값이 아님
  function isEmpty(value) {
    if ((value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) && value != 0) {
      return true;
    } else {
      return false;
    }
  };

  //Object의 각 프로퍼티들이 Json String인 경우 JSON.parse 수행하는 메서드
  function checkAndParseJson(item) {
    for (v in item) {
      var checkJson = false;
      try {
        checkJson = JSON.parse(item[v]);
      } catch (e) {
        logHelper.info("프로퍼티는 JSON String 이 아닙니다.");
      }
      if (!!checkJson && typeof checkJson == "object") {
        item[v] = JSON.parse(item[v]);
      }
    }
    return item;
  };


  return {
    "isEmpty": isEmpty,
    "checkAndParseJson": checkAndParseJson
  };

}

module.exports = utils();