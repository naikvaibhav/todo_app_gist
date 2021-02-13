let appConfig = {};

appConfig.port = process.env.PORT;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";

appConfig.db = {
//  uri: "mongodb://127.0.0.1:27017/todo_app_gist",
    uri: `mongodb+srv://vaibhav:${process.env.MONGODB_ATLAS__PASSWORD}@vncluster.dhl0q.mongodb.net/${process.env.MONGODB_ATLAS_USERNAME}?retryWrites=true&w=majority`
};
appConfig.apiVersion = "/api/v1";

module.exports = {
  port: appConfig.port,
  allowedCorsOrigin: appConfig.allowedCorsOrigin,
  environment: appConfig.env,
  db: appConfig.db,
  apiVersion: appConfig.apiVersion,
};