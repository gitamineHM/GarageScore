var request = require('request');
var URL_BOT_KEY = 'https://www.garagescore.com/recruitbot/give-me-a-key'
var URL_BOT_CHALLENGE = 'https://www.garagescore.com/recruitbot/unlock?key='

Get_Key().then((key) =>
 {   Unlock_Next_Challenge(key).then((challenge) =>
     {
       // console.log(challenge) ;
     });
});


//function that get the key for the next challenge
function Get_Key(){
  return new Promise(function (resolve, reject) {

      request.post(URL_BOT_KEY,{}, function (err, res, body) {
        if (err) {
          reject(err);
        }
        else {
          resolve(body)
        }
      });
  });
}

//function that open next challenge with a key
function Unlock_Next_Challenge(key){
  return new Promise(function (resolve, reject) {
  var credentials = {}
      request.post(URL_BOT_CHALLENGE + key , function (err, res, body) {
        if (err) {
          reject(err);
        }
        else {
          credentials.appId = body.split('"')[1]
          credentials.appSecret = body.split('"')[3]
          resolve(credentials)
        }
      });
  });
}

module.exports = {
  Get_Key : Get_Key,
  Unlock_Next_Challenge : Unlock_Next_Challenge
}
