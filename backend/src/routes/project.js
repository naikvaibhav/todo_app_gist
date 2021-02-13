const express = require("express");
const router = express.Router();
const projectController = require("./../controllers/projectController");
const appConfig = require("./../../config/appConfig");

/*Middleware*/
const auth = require("../middlewares/auth");

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/project`;

    app.post(`${baseUrl}/create`, auth.isAuthorized, projectController.createProject);

    app.get(`${baseUrl}/view/:id`, auth.isAuthorized, projectController.viewProject);

    app.get(`${baseUrl}/view`, auth.isAuthorized, projectController.viewAllProject);

    app.put(`${baseUrl}/edit/:id`, auth.isAuthorized, projectController.editProject);

    app.delete(`${baseUrl}/delete/:id`, auth.isAuthorized, projectController.deleteProject);

}