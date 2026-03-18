const { StatusCodes } = require("http-status-codes");
const {ErrorResponse}=require('../utils/common');
const AppError=require('../utils/errors/app-error');
function validateCreateRequest(req,res,next){
    if(!req.body.modelNumber){
        ErrorResponse.message="Model Number not found in the oncoming request in the correct form";
        new AppError(['Model Number not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
        ErrorResponse.error={explaination:'Model Number not found in the oncoming request in the correct form'}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    
    next();
}
module.exports={
    validateCreateRequest
}