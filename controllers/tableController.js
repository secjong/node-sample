//사용자정의모듈
var utils = require('../commons/utils');
var logHelper = require('../commons/log_helper');
var tableModel = require('../models/tableModel');

module.exports.SELECTTableList = function (req, res) {
  // var adgroupId = req.get('adgroupid');

  // if (filter === "autobidding" && customerId !== null && adgroupId === null) {
  //   //실제로 자동입찰 중인 광고소재만 호출
  //   var p = naverSearchAdModel.SELECTShoppingAdAutoBidding(customerId);
  // } else if (filter === null && customerId === null && adgroupId !== null) {
  //   //해당 광고그룹에 속한 광고소재만 호출
  //   var p = naverSearchAdModel.SELECTShoppingAd(adgroupId);
  // } else {
  //   res.sendResponse(400, {
  //     "rtmsg": "params must contain autobidding or filter, customerid"
  //   });
  // }
  var p = tableModel.SELECTTableList();

  p
  .then(function (result) {
    res.json(result);
  })
  .catch(function (err) {
    logHelper.error(err);
    // res.sendResponse(500, {
    //   "trace": error.message
    // });
  });

};





