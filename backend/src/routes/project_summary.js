const express = require("express");
const router = express.Router();
const appConfig = require("../../config/appConfig");
const projectSummaryController = require("./../controllers/projectSummaryController");


/*Middleware*/
const auth = require("../middlewares/auth");

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/project_summary`;

    app.post(`${baseUrl}`, auth.isAuthorized, projectSummaryController.createSummary);
}