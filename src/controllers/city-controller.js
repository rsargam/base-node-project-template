const { CityService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createCity(req,res){
    try{
    
    const airplane = await CityService.createCity({
    name:req.body.name
    });
    
    SuccessResponse.data = airplane;
    
    return res
    .status(StatusCodes.CREATED)
    .json(SuccessResponse);
    
    }catch(error){
    
    ErrorResponse.error.statusCode =
    error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    
    ErrorResponse.error.explanation = error.message;
    
    return res
    .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(ErrorResponse);
    }
    }
    
    module.exports={
        createCity
    }