const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = mongoose.model("User");

const logger = require("./../libs/loggerLib");
const response = require("./../libs/responseLib");
const token = require("./../libs/tokenLib");
const check = require("./../libs/checkLib");


let isAuthorized = (req, res, next) => {

  const receivedtoken = req.header('token'); // token, mandatory
  if (receivedtoken) {
    token.verifyClaim(receivedtoken, process.env.secretKey, (err, {data}) => {
        if (err) {
            logger.error(err.message, "Authorization middleware", 10);
            let apiResponse = response.generate(
              true,
              "Failed to Authorize",
              500,
              null
            );
            res.send(apiResponse);
        } else if (check.isEmpty(data)) {
            logger.error(
              "No Authorization key is present",
              "Authorization middleware",
              10
            );
            let apiResponse = response.generate(
              true,
              "Invalid or Expired AuthorizationKey",
              404,
              null
            );
            res.send(apiResponse);
          }else{
              UserModel.findOne({userId: data.userId}).then(user=>{
                  req.user = user;
                  next();
              }).catch(err=>{
                let apiResponse = response.generate(
                    true,
                    "Failed to verify token",
                    400,
                    null
                  );
                  res.send(apiResponse);
              })
          }
      });
  }else{
    logger.error("AuthorizationToken Missing", "AuthorizationMiddleware", 5);
    let apiResponse = response.generate(
      true,
      "AuthorizationToken is missing in request",
      400,
      null
    );
    res.send(apiResponse);
  }
}; //end isAuthorized

module.exports = {
  isAuthorized: isAuthorized,
};