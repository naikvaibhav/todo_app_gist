const mongoose = require("mongoose");
const response = require("./../libs/responseLib");
const logger = require("./../libs/loggerLib");
const axios = require('axios');
const appConfig = require("./../../config/appConfig");
const shortid = require("shortid");
/*Import libraries*/
const check = require("../libs/checkLib")
const time = require("./../libs/timeLib");
const tokenLib = require("./../libs/tokenLib");
const formatErrorValidationMsg = require("./../libs/formatValidationErrorMsg");
const { isEmpty } = require("../libs/checkLib");

/* Models */
const ProjectModel = mongoose.model("Project");
const UserModel = mongoose.model("User");


const createSummary = async (req,res) => {
    const data = req.body

    try{
    let getResult = await UserModel.findOne({userId: req.user.userId})
    console.log('getResult====', getResult.githubAccessToken)

    const opts = { headers: { accept: 'application/json' } };

    axios({
        method: "post",
        url: `https://api.github.com/gists`,
        headers: {
            Authorization: `Bearer ${getResult.githubAccessToken}`,
            "Content-Type": "application/json"
        },
        data:data
        })
        .then(result => {
            console.log('result===>', result)
            // callback(null, {
            //     statusCode: 200,
            //     body: JSON.stringify(res.data)
            // });
        })
        .catch(err => {
            // callback(err);
            console.log(err.message)
        });
    res.json({message: 'Success'})

    }catch(err){
        console.log(err)
        res.json({message: err})
    }
}


module.exports = {
    createSummary: createSummary
}