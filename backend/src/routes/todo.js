const express = require("express");
const router = express.Router();
const todoController = require("./../controllers/todoController");
const appConfig = require("./../../config/appConfig");

/*Middleware*/
const auth = require("../middlewares/auth");

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/todo`;

    app.post(`${baseUrl}/create/:projectId`, auth.isAuthorized, todoController.createTodo);

    app.put(`${baseUrl}/edit/:id/:projectId`, auth.isAuthorized, todoController.editTodo);

    app.get(`${baseUrl}/:id`, auth.isAuthorized, todoController.getTodo);

    app.get(`${baseUrl}/view/:projectId`, auth.isAuthorized, todoController.getAllTodo);

    app.delete(`${baseUrl}/:id`, auth.isAuthorized, todoController.removeTodo)
}