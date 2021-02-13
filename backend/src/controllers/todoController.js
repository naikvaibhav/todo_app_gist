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
const formatErrorValidationMsg = require("./../libs/formatValidationErrorMsg")
/* Models */
const TodoModel = mongoose.model("Todo");
const ProjectModel = mongoose.model("Project");


const createTodo = async (req,res) => {
    let isTodoPresent = await TodoModel.findOne({description: req.body.description}).catch(err=> console.log(err))

    if(check.isEmpty(isTodoPresent)){
        let newTodo = new TodoModel({
            todoId: shortid.generate(),
            description: req.body.description,
            projectId: req.params.projectId,
            createdOn: time.now(),
        })

        try{
            let savedTodo = await newTodo.save()
            savedTodo = savedTodo.toObject();
    
            let apiResponse = response.generate(
                false,
                "Todo created successfully",
                201,
                savedTodo
            );
            //store the todo reference in respective project collection
            await ProjectModel.findOneAndUpdate({projectId: req.params.projectId}, {$push: {listOfTodos: savedTodo._id}})
            return res.send(apiResponse);
        }catch(err){
            if (err.name == 'ValidationError') {
                console.error('Error Validating!', err);
                let message = formatErrorValidationMsg.formatErrorMsg(err.message)
                let apiResponse = response.generate(true, message, 422, null);
            return res.send(apiResponse);
            } else {
                let apiResponse = response.generate(true, err.message, 500, null);
                return res.send(apiResponse);
            }
        }
    }else{
        let apiResponse = response.generate(
            true,
            "Todo with the same description is already created",
            403,
            null
          );
          return res.send(apiResponse);
    }
}


const editTodo = async (req,res) => {
    const {id, projectId} = req.params
    const options = req.body;

    let isTodoPresent = await TodoModel.findOne({todoId: id}).catch(err=> console.log(err))

    if(!check.isEmpty(isTodoPresent)){
        try{
            options.updatedOn = time.now()
            let editTodo = await TodoModel.updateOne(
                { todoId: id },
                options,
                {
                  multi: true,
                  runValidators: true
                }
              );
            
              if (check.isEmpty(editTodo)) {
                let apiResponse = response.generate(true, "Failed to update todo", 500);
                return res.send(apiResponse);
              } else {
                let apiResponse = response.generate(
                  false,
                  "The todo is updated",
                  200,
                  editTodo
                );
                res.send(apiResponse);
              }         
        }catch(err){
            if (err.name == 'ValidationError') {
                console.error('Error Validating!', err);
                let message = formatErrorValidationMsg.formatErrorMsg(err.message)
                let apiResponse = response.generate(true, message, 422, null);
                return res.send(apiResponse);
            } else {
                let apiResponse = response.generate(true, err.message, 500, null);
                return res.send(apiResponse);
            }
        }
    }else{
        let apiResponse = response.generate(
            true,
            "The todo is not present in DB",
            400,
            null
          );
          return res.send(apiResponse);
    }
}

const removeTodo = async (req,res) => {
  const {id} = req.params;
  
  let isTodoPresent = await TodoModel.findOne({todoId: id}).catch(err=> console.log(err))

  if(!check.isEmpty(isTodoPresent)){
    try{
        let removeTodo = await TodoModel.deleteOne(
            { todoId: id }
          );
        
          if (check.isEmpty(removeTodo)) {
            let apiResponse = response.generate(true, "Failed to update todo", 500);
            return res.send(apiResponse);
          } else {
            let apiResponse = response.generate(
              false,
              "The todo is deleted",
              200,
              removeTodo
            );
            res.send(apiResponse);

            // await ProjectModel.findOneAndUpdate(
            //   { projectId: isTodoPresent.projectId },
            //   { $pull: { listOfTodos: { todoId: id } } }
            //   )
            //   .then((data) => {})
            //   .catch((err) => console.log(err.message));
          }         
    }catch(err){
        if (err.name == 'ValidationError') {
            console.error('Error Validating!', err);
            let message = formatErrorValidationMsg.formatErrorMsg(err.message)
            let apiResponse = response.generate(true, message, 422, null);
            return res.send(apiResponse);
        } else {
            let apiResponse = response.generate(true, err.message, 500, null);
            return res.send(apiResponse);
        }
    }
}else{
    let apiResponse = response.generate(
        true,
        "The todo is not present in DB",
        400,
        null
      );
      return res.send(apiResponse);
}
}

const getTodo = async (req,res) => {
    const {id} = req.params

    let isTodoPresent = await TodoModel.findOne({todoId: id}).catch(err=> console.log(err))

    if(!check.isEmpty(isTodoPresent)){
        try{
            let getTodo = await TodoModel.findOne(
                { todoId: id }
              );
            
              if (check.isEmpty(getTodo)) {
                let apiResponse = response.generate(true, "Failed to get todo", 500);
                return res.send(apiResponse);
              } else {
                let apiResponse = response.generate(
                  false,
                  "The todo is fetched",
                  200,
                  getTodo
                );
                res.send(apiResponse);
              }         
        }catch(err){
            let apiResponse = response.generate(true, err.message, 500, null);
            return res.send(apiResponse);
        }
    }else{
        let apiResponse = response.generate(
            true,
            "The todo is not present in DB",
            400,
            null
          );
          return res.send(apiResponse);
    }
}

const getAllTodo = async (req,res) => {
    const {projectId} = req.params

    let isProjectPresent = await ProjectModel.findOne({projectId: projectId}).catch(err=> console.log(err))

    if(!check.isEmpty(isProjectPresent)){
        try{
            let getAllTodos = await TodoModel.find(
                { projectId: projectId }
              );
            
              if (check.isEmpty(getAllTodos)) {
                let apiResponse = response.generate(true, "Failed to get todos", 500);
                return res.send(apiResponse);
              } else {
                let apiResponse = response.generate(
                  false,
                  "The todo is fetched",
                  200,
                  getAllTodos
                );
                res.send(apiResponse);
              }         
        }catch(err){
            let apiResponse = response.generate(true, err.message, 500, null);
            return res.send(apiResponse);
        }
    }else{
        let apiResponse = response.generate(
            true,
            "The project is not present in DB",
            400,
            null
          );
          return res.send(apiResponse);
    }
}

module.exports = {
    createTodo: createTodo,
    editTodo: editTodo,
    removeTodo: removeTodo,
    getTodo: getTodo,
    getAllTodo: getAllTodo
}