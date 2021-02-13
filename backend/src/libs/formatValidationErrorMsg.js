let formatErrorMsg = (message) => {
    return message.split(":").pop().trim();
};
  
module.exports = {
    formatErrorMsg: formatErrorMsg
};