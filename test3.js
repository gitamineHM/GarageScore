var request = require('request');
var crypto = require('crypto');
var fct = require('./test2.js')
var appID = 'f10dfe479c65aa989406dc2b839d46a3';
var appSecret = 'dy3cXBViF4QCeuWD76sDunnpTTqg0rlw';
var URL = 'http://api.garagescore.com/garage/reviews/05/09/2017?appId=xx&signature=yy'

Get_Data(URL)

function Get_Data(url){
    return new Promise(function (resolve, reject) {
          fct.Get_Key().then((key) => {
             fct.Unlock_Next_Challenge(key).then((challenge) => {
                 Sign_Request(url, challenge.appId, challenge.appSecret).then((signed_url) => {
                      Get_Route(signed_url).then((res) => {
                         resolve(res)
                      }).catch((err) => reject(err))
                 }).catch((err) => reject(err))
             }).catch((err) => reject(err))
          }).catch((err) => reject(err))
    })
}

function Sign_Request(request, appId, appSecret){
    return new Promise(function (resolve, reject) {
        var url, i, param, method, split_param, signatureString, parametersString = '', signature, timestamp;
        timestamp = Date.now();
        method = 'GET';
        url = request.split("?")[0];
        split_param = request.split("?")[1].split("&");
        split_param.sort();
        for(i=0;i<split_param.length;i++)
        {
          param = split_param[i].split("=")
          if (param[0] != "appId" && param[0] != "signature")
          parametersString += param[0] + '=' + param[1] + '&'
        }
        parametersString = parametersString.substring(0, parametersString.length - 1);
        signatureString = appId + method + encodeURI(url) + parametersString + Math.round(timestamp/1000);
        signature = crypto.createHmac('sha1', appSecret).update(signatureString).digest('hex')
        resolve(url + '?appId=' + appId + '&signature=' + signature)
      })
}

//function that get the key for the next challenge
function Get_Route(url){
    return new Promise(function (resolve, reject) {

      request.get(url, function (err, res, body) {
        if (err) {
          reject(err);
        }
        else {
          resolve(body)
        }
      });
   });
}

module.exports = {
  Get_Data : Get_Data,
  Get_Route : Get_Route,
  Sign_Request : Sign_Request
}
