"use strict";

const express = require("express");
const apiRoutes = express.Router();

const jwt = require("jsonwebtoken");
const passport = require("passport");
const db = require("../../../configs/db");

const User = require("../../models/User");
const fs = require('fs');

const httpResponse = {
  onUserNotFound: {
    success: false,
    message: "User not found."
  },
  onAuthenticationFail: {
    success: false,
    message: "Passwords did not match."
  }
};

function logging(request, response) {
  let { email, password } = request.body;

  if ( !(email == "bruno@gmail.com" || email == "coco@gmail.com")) {
    return response.send(httpResponse.onUserNotFound);
  }

  const user = new User();
  user.email = email;
  user.FirstName = email == "coco@gmail.com"? "Coco": "Bruno";
  user.LastName = email == "coco@gmail.com"? "Martinez": "Rodriguez";
  user.roles = email == "coco@gmail.com"? ["Resident"]: ["Admin"] ;

  //check pass
  var token = jwt.sign(user.toJSON(), db.secret, {
    expiresIn: 10080
  });

  return response.json({ success: true, return_code:200, jwt: token });

}

function UpdateProfile(request, response) {
  let { FirstName, LastName } = request.body;

  if (FirstName != "bruno") {
    return response.json({ success: false, Message: "Not Updated" });
  } else {
    return response.json({ success: true, Message: "Updated" });
  }

}


function GetStats(request, response) {

 

  let teams = fs.readFileSync(__dirname + '/Teams.json');
  let Teams = JSON.parse(teams);
  var params = "?type=wz&next=null"
  var endpoint = "https://api.tracker.gg/api/v1/warzone/matches/";
  var endpoints = [];
  
  Teams.forEach(T => {
    var finalendPoint = endpoint + T.Players[0].platform +"/"+ encodeURIComponent(T.Players[0].UserName) + params
    
    


    
  });




  return response.json(endpoints);



}




module.exports = {
  logging: logging,
  UpdateProfile: UpdateProfile,
  GetStats: GetStats
};
