const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const appConfig = require("./../../config/appConfig");

/*Middleware*/
const auth = require("../middlewares/auth");

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}`

    app.get(`${baseUrl}/github/login`, userController.githubLogin)
    app.get(`${baseUrl}/oauth-callback`, userController.fetchGithubAccessToken)
}