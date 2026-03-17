// const {AirplaneService}=require('../services');
// const{ StatusCodes }=require('http-status-codes');
// const {SuccessResponse,ErrorResponse}=require('../utils/common');
// const AppError = require("../utils/errors/app-error");
// async function createAirplane(req,res){
//     try{
       
        
//         const airplane=await AirplaneService.createAirplane({
//             modelNumber:req.body.modelNumber,
//             capacity:req.body.capacity
//         });
//         SuccessResponse.data=airplane;
//         return res
//         .status(StatusCodes.CREATED)
//         .json(SuccessResponse)
//     }
//     // catch(error){
//     //     ErrorResponse.error=error;
//     //     return res
//     //     .status(StatusCodes.INTERNAL_SERVER_ERROR)
//     //     .json(ErrorResponse)
//     // }
  
//     // catch(error){

//     //     ErrorResponse.error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//     //     ErrorResponse.error.explanation = error.message;
      
//     //     return res
//     //       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//     //       .json(ErrorResponse);
//     //   }
//     catch(error){

//         ErrorResponse.error.statusCode =
//           error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      
//         ErrorResponse.error.explanation = error.message;
      
//         return res
//           .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
//           .json(ErrorResponse);
//       }
// }
// async function getAirplanes(req,res){
//     try{
//         const airplanes=await AirplaneService.getAirplanes();
//         SuccessResponse.data=airplanes;
//         return res
//                 .status(StatusCodes.OK)
//                 .json(SuccessResponse);
//     }
//     catch(error){
//         ErrorResponse.error=error;
//         return res
//                  .status(error.statusCode)
//                  .json(ErrorResponse);
//     }
// }
// async function getAirplane(req,res){
//     try{
    
//     const airplane = await AirplaneService.getAirplane(req.params.id);
    
//     SuccessResponse.data = airplane;
    
//     return res
//     .status(StatusCodes.OK)
//     .json(SuccessResponse);
    
//     }catch(error){
    
//     ErrorResponse.error = error;
    
//     return res
//     .status(error.statusCode)
//     .json(ErrorResponse);
//     }
//     }
// async function destroyAirplane(req,res){
//     try{
//         const airplanes=await AirplaneService.destroyAirplane(req.params.id);
//         SuccessResponse.data=airplanes;
//         return res
//                 .status(StatusCodes.OK)
//                 .json(SuccessResponse);
//     }
//     catch(error){
//         ErrorResponse.error=error;
//         return res
//                  .status(error.statusCode)
//                  .json(ErrorResponse);
//     }
// }
// module.exports={
//     createAirplane,
//     getAirplanes,
//     destroyAirplane,
//     getAirplane
   
// }
const { AirplaneService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createAirplane(req,res){
try{

const airplane = await AirplaneService.createAirplane({
modelNumber: req.body.modelNumber,
capacity: req.body.capacity
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

async function getAirplanes(req,res){
try{

const airplanes = await AirplaneService.getAirplanes();

SuccessResponse.data = airplanes;

return res
.status(StatusCodes.OK)
.json(SuccessResponse);

}catch(error){

ErrorResponse.error = error;

return res
.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
.json(ErrorResponse);
}
}

async function getAirplane(req,res){
try{

const airplane = await AirplaneService.getAirplane(req.params.id);

SuccessResponse.data = airplane;

return res
.status(StatusCodes.OK)
.json(SuccessResponse);

}catch(error){

ErrorResponse.error = error;

return res
.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
.json(ErrorResponse);
}
}

async function destroyAirplane(req,res){
try{

const response = await AirplaneService.destroyAirplane(req.params.id);

SuccessResponse.data = response;

return res
.status(StatusCodes.OK)
.json(SuccessResponse);

}catch(error){

ErrorResponse.error = error;

return res
.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
.json(ErrorResponse);
}
}

module.exports = {
createAirplane,
getAirplanes,
getAirplane,
destroyAirplane
};