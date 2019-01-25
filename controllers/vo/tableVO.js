module.exports = function () {

    var table_in_mydb;

    var getTable_in_mydb = function(){
        return table_in_mydb;
    }

    var setTable_in_mydb = function(data){
        table_in_mydb = data;
    }

    return {
        getTable_in_mydb : getTable_in_mydb,
        setTable_in_mydb : setTable_in_mydb
    };

}();
  
  // function Ad(initialVal) {
  
  //   var no = null;
  //   var nccAdId = null;
  //   var nccAdgroupId = null;
  //   var customerId = null;
  //   var inspectStatus = null;
  //   var type = null;
  //   var ad = null;
  //   var adAttr = null;
  //   var userLock = null;
  //   var enable = null;
  //   var referenceKey = null;
  //   var referenceData = null;
  //   var delFlag = null;
  //   var regTm = null;
  //   var editTm = null;
  //   var status = null;
  //   var statusReason = null;
  //   var nccQi = null;
  //   var currentRank = null;
  //   var aimedRank = null;
  //   var bidAmtLimit = null;
  //   var beforeBidAmt = null;
  //   var autoBidding = null;
  //   var keyword = null;
  //   var isActive = null;
  
  //   this.setNccAdID = function (input) {
  //     nccAdId = input;
  //   };
  //   this.getNccAdId = function () {
  //     return nccAdId
  //   };
  
  //   this.setAimedRank = function (input) {
  //     aimedRank = input;
  //   };
  //   this.getAimedRank = function () {
  //     return aimedRank;
  //   };
  
  //   this.setBidAmtLimit = function (input) {
  //     bidAmtLimit = input;
  //   };
  //   this.getBidAmtLimit = function () {
  //     return bidAmtLimit;
  //   };
  
  
  //   this.setKeyword = function (input) {
  //     keyword = input;
  //   };
  //   this.getKeyword = function () {
  //     return keyword;
  //   };
  
  //   this.setIsActive = function (input) {
  //     isActive = input;
  //   };
  //   this.getIsActive = function () {
  //     return isActive;
  //   };
  
  // };
  