const { StatusCodes } = require("http-status-codes");
const {ErrorResponse}=require('../utils/common');
const AppError=require('../utils/errors/app-error');
function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error=new AppError(['flightNumber not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
        ErrorResponse.error={explaination:'flightNumber not found in the oncoming request in the correct form'}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    if(!req.body.airplaneId){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error=new AppError(['airplaneId not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
        ErrorResponse.error={explaination:'airplaneId not found in the oncoming request in the correct form'}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error=new AppError(['departureAirportId not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
        ErrorResponse.error={explaination:'departureAirportId not found in the oncoming request in the correct form'}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error=new AppError(['arrivalAirportId not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
        ErrorResponse.error={explaination:'arrivalAirportId not found in the oncoming request in the correct form'}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error=new AppError(['arrivalTime not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
        ErrorResponse.error={explaination:'arrivalTime not found in the oncoming request in the correct form'}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    // if(!req.body.departureTime){
    //     ErrorResponse.message="something went wrong while creating flight";
    //     ErrorResponse.error=new AppError(['departureTime not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
    //     ErrorResponse.error={explaination:'departureTime not found in the oncoming request in the correct form'}
    //     return res
    //     .status(StatusCodes.BAD_REQUEST)
    //     .json(ErrorResponse)
    // }
    if (!req.body.departureTime) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "something went wrong while creating flight",
          error: {
            explanation: "departureTime not found in the request"
          }
        });
      }

    if(!req.body.price){
        ErrorResponse.message="something went wrong while creating price";
        ErrorResponse.error=new AppError(['price not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
        ErrorResponse.error={explaination:'price not found in the oncoming request in the correct form'}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }

    if(!req.body.price){
        ErrorResponse.message="something went wrong while creating price";
        ErrorResponse.error=new AppError(['price not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
        ErrorResponse.error={explaination:'price not found in the oncoming request in the correct form'}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    next();
}
module.exports={
    validateCreateRequest
}