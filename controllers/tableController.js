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
    res.status(500).json(err);
  });

};

module.exports.SELECTTableDesc = function (req, res) {
  var tableName = req.params.tableName;
  var p = tableModel.SELECTTableDesc(tableName);
  p
  .then(function (result) {
    res.json(result);
  })
  .catch(function (err) {
    logHelper.error(err);
    res.status(500).json(err);
  });

};

module.exports.SELECTTableData = function (req, res) {
  var tableName = req.params.tableName;
  var p = tableModel.SELECTTableData(tableName);
  p
  .then(function (result) {
    res.json(result);
  })
  .catch(function (err) {
    logHelper.error(err);
    res.status(500).json(err);
  });

};

module.exports.CREATETable = function (req, res) {
  var tableName = req.body.tableName;
  var params = req.body.params;

  logHelper.debug(tableName);
  logHelper.debug(params);

  var data = {
    tableName : tableName,
    params : params
  };

  var p = tableModel.CREATETable(data);
  p
  .then(function (result) {
    res.json(result);
  })
  .catch(function (err) {
    logHelper.error(err);
    res.status(500).json(err);
  });

};

module.exports.DELETETable = function (req, res) {

  var tableName = req.params.tableName;
  var priKey = req.body.priKey;
  var pk = req.params.pk;

  var data = {
    tableName : tableName,
    priKey : priKey,
    pk : pk
  };

  logHelper.trace(data);

  var p = tableModel.DELETETable(data);
  p
  .then(function (result) {
    logHelper.trace(result);
    res.json(result);
  })
  .catch(function (err) {
    logHelper.error(err);
    res.status(500).json(err);
  });

};

module.exports.INSERTTableData = function (req, res) {

  var tableName = req.params.tableName;
  var params = req.body.params;
  
  var data = {
    tableName : tableName,
    params : params
  };

  var p = tableModel.INSERTTableData(data);
  p
  .then(function (result) {
    logHelper.trace(result);
    res.json(result);
  })
  .catch(function (err) {
    logHelper.error(err);
    res.status(500).json(err);
  });

};

module.exports.UPDATETableData = function (req, res) {

  var tableName = req.params.tableName;
  var params = req.body.params;
  var priKey = req.body.priKey;
  var pk = req.params.pk;

  var data = {
    tableName : tableName,
    priKey : priKey,
    pk : pk,
    params : params
  };

  logHelper.trace(data);

  var p = tableModel.UPDATETableData(data);
  p
  .then(function (result) {
    logHelper.trace(result);
    res.json(result);
  })
  .catch(function (err) {
    logHelper.error(err);
    res.status(500).json(err);
  });

};

module.exports.CUSTOMQuery = function (req, res) {

  var data = {
    query : req.body.query
  };

  var p = tableModel.CUSTOMQuery(data);
  p
  .then(function (result) {
    logHelper.trace(result);
    res.json(result);
  })
  .catch(function (err) {
    logHelper.error(err);
    res.status(500).json(err);
  });

};

module.exports.TRUNCATETable = function (req, res) {
  var tableName = req.params.tableName;
  var p = tableModel.TRUNCATETable(tableName);
  p
  .then(function (result) {
    logHelper.trace(result);
    res.json(result);
  })
  .catch(function (err) {
    logHelper.error(err);
    res.status(500).json(err);
  });

};

module.exports.DROPTable = function (req, res) {
  
  var tableName = req.params.tableName;

  var p = tableModel.DROPTable(tableName);
  p
  .then(function (result) {
    logHelper.trace(result);
    res.json(result);
  })
  .catch(function (err) {
    logHelper.error(err);
    res.status(500).json(err);
  });

};








