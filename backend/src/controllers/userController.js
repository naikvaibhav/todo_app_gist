const mongoose = require("mongoose");
const response = require("./../libs/responseLib");
const logger = require("./../libs/loggerLib");
const axios = require('axios');
const appConfig = require("./../../config/appConfig");
/*Import libraries*/
const check = require("../libs/checkLib")
const time = require("./../libs/timeLib");
const tokenLib = require("./../libs/tokenLib");
/* Models */
const UserModel = mongoose.model("User");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
let token = null;

const githubLogin = async (req,res) => {
    console.log('githubLogin')
    const redirect_uri = `http://localhost:3000/login`
    const gitHubAuthPage = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=gist&redirect_uri=${redirect_uri}`
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=gist&redirect_uri=${redirect_uri}`);
    // res.send(200).json({link: `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=gist`})
    // let apiResponse = response.generate(
    //   false,
    //   "User registered successfully",
    //   201,
    //   gitHubAuthPage
    // );
    // return res.send(apiResponse);
  } 

const fetchGithubAccessToken = async (req,res) => {
  console.log('fetchGithubAccessToken')
    const body = {
        client_id: clientId,
        client_secret: clientSecret,
        code: req.query.code
    };

    const opts = { headers: { accept: 'application/json' } };

    try{
      let result = await axios.post(`https://github.com/login/oauth/access_token`, body, opts)    
      let _token = await result.data['access_token']
      token = _token
      console.log('My token:', _token);
      
      const {data} = await axios.get(`https://api.github.com/user`,{ headers: { authorization: `token ${token}` } })
      
      let verifiedInfoOfGithubUser = '';
      if(data){
        verifiedInfoOfGithubUser = {
            userName: data.login,
            userId: data.id.toString(),
            githubURL: data.html_url,
            name: data.name,
            location: data.location,
            userType: data.type,
            avatar: data.avatar_url
        }
      }
      console.log('verifiedInfoOfGithubUser', verifiedInfoOfGithubUser)
      let user = await UserModel.findOne({
        userId: verifiedInfoOfGithubUser.userId,
      }).catch((err) => console.log(err));

      if (check.isEmpty(user)) {
        console.log("Not a registered email");
        let newUser = new UserModel({
            userId: verifiedInfoOfGithubUser.userId,
            userName: verifiedInfoOfGithubUser.userName,
            name: verifiedInfoOfGithubUser.name,
            location: verifiedInfoOfGithubUser.location,
            userType: verifiedInfoOfGithubUser.userType,
            avatar: verifiedInfoOfGithubUser.avatar,
            githubURL: verifiedInfoOfGithubUser.githubURL,
            githubAccessToken: token,
            createdOn: time.now(),
          });
        
        try {
            let savedUser = await newUser.save();
            savedUser = savedUser.toObject();
            
            let jwttoken = "";
            tokenLib.generateToken(savedUser, (err, tokenDetails) => {
                if (err) {
                  logger.error(err.message, "userController:generateToken", 10);
                  let apiResponse = response.generate(
                    true,
                    "Failed to generate the token",
                    500,
                    null
                  );
                  return res.send(apiResponse);
                } else {
                  (tokenDetails.userId = savedUser.userId), (tokenDetails.userDetails = savedUser);
                  jwttoken = tokenDetails.token;
                }
            });

            savedUser.jwttoken = jwttoken;

            let apiResponse = response.generate(
                false,
                "User registered successfully",
                201,
                savedUser
            );
            return res.send(apiResponse);
        }catch(err){
            let apiResponse = response.generate(true, err.message, 500, null);
            return res.send(apiResponse);
        }
      }else{
        console.log("Already a registered email");
        let updateGitHubAcessToken = await UserModel.findOneAndUpdate(verifiedInfoOfGithubUser.userId, {githubAccessToken: token}, {
            returnOriginal: false
          })
        updateGitHubAcessToken = updateGitHubAcessToken.toObject();
        delete updateGitHubAcessToken.__v;

        let jwttoken = "";
        tokenLib.generateToken(updateGitHubAcessToken, (err, tokenDetails) => {
            if (err) {
              logger.error(err.message, "userController:generateToken", 10);
              let apiResponse = response.generate(
                true,
                "Failed to generate the token",
                500,
                null
              );
              return res.send(apiResponse);
            } else {
              (tokenDetails.userId = updateGitHubAcessToken.userId), (tokenDetails.userDetails = updateGitHubAcessToken);
              jwttoken = tokenDetails.token;
            }
        });

        updateGitHubAcessToken.jwttoken = jwttoken;

        let apiResponse = response.generate(
            false,
            "Login successful",
            200,
            updateGitHubAcessToken
          );
          return res.send(apiResponse);
      }
    }catch(err){
        res.status(500).json({ message: err.message })
    }
}

// let getInfoOfGithubUser = async (req,res) => {
//     try{
//      const {data} = await axios.get(`https://api.github.com/user`,{ headers: { authorization: `token ${token}` } })
//      console.log(data) 
//      res.status(200).json({message: data})
//     }catch(err){
//         res.status(500).json({ message: err.message })
//     }
// }
    
module.exports = {
    githubLogin: githubLogin,
    fetchGithubAccessToken: fetchGithubAccessToken,
}