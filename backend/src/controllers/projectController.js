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
const ProjectModel = mongoose.model("Project");

const createProject = async (req,res) => {
   
    let isProjectPresent = await ProjectModel.findOne({title: req.body.title}).catch(err=> console.log(err))

    if(!isProjectPresent){
    let newProject = new ProjectModel({
        projectId: shortid.generate(),
        title: req.body.title,
        createdOn: time.now(),
        createdBy: req.user.userId
    })
    try{
        let savedProject = await newProject.save()
        savedProject = savedProject.toObject();

        let apiResponse = response.generate(
            false,
            "Project created successfully",
            201,
            savedProject
        );
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
            "Project with the same name is already created",
            403,
            null
          );
          return res.send(apiResponse);
    }
}

const viewProject = async (req,res) => {
    const id = req.params.id

    let isProjectPresent = await ProjectModel.findOne({projectId: id}).populate('listOfTodos').catch(err=> console.log(err))

    if(!check.isEmpty(isProjectPresent)){
        try{
            const apiResponse = response.generate(
                false,
                "Project found",
                200,
                isProjectPresent
              );
              res.send(apiResponse);
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

const viewAllProject = async (req,res) => {
    const userId = req.user.userId;

    try{
     const getAllProjects = await ProjectModel.find({createdBy: userId}).populate('listOfTodos')

     if(!check.isEmpty(getAllProjects)){
        let apiResponse = response.generate(
            false,
            "Found all the projects of the user",
            200,
            getAllProjects
          );
          res.send(apiResponse);
     }else{
        let apiResponse = response.generate(
            false,
            "No projects found",
            400,
            null
          );
          res.send(apiResponse);
     }

    }catch(err){
        let apiResponse = response.generate(true, err.message, 500, null);
        return res.send(apiResponse);
    }
}

const editProject = async (req,res) => {
    const id = req.params.id;
    const options = req.body;
    const isProjectPresent = await ProjectModel.findOne({projectId: id}).catch(err=> console.log(err))
     
    if(!check.isEmpty(isProjectPresent)){
        try{
            options.updatedOn = time.now()
            let editProject = await ProjectModel.updateOne(
                { projectId: id },
                options,
                {
                  multi: true,
                }
              );
            
              if (check.isEmpty(editProject)) {
                let apiResponse = response.generate(true, "Failed to update project", 500);
                return res.send(apiResponse);
              } else {
                let apiResponse = response.generate(
                  false,
                  "The project is updated",
                  200,
                  editProject
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

const deleteProject = async (req,res) => {
    const id = req.params.id;

    const isProjectPresent = await ProjectModel.findOne({projectId: id}).catch(err=> console.log(err))

    if(!check.isEmpty(isProjectPresent)){
        try{
            let deleteProject = await ProjectModel.deleteOne(
                { projectId: id }
              );
            
              if (check.isEmpty(deleteProject)) {
                let apiResponse = response.generate(true, "Failed to delete project", 500);
                return res.send(apiResponse);
              } else {
                let apiResponse = response.generate(
                  false,
                  "The project is deleted successfully",
                  200,
                  null
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
            "The project is no longer present in DB",
            400,
            null
          );
          return res.send(apiResponse);
    }
}

module.exports = {
    createProject: createProject,
    viewProject: viewProject,
    viewAllProject: viewAllProject,
    editProject: editProject,
    deleteProject: deleteProject
}