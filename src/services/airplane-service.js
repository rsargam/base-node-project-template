const {AirplaneRepository}=require("../repositories");
const {StatusCodes}=require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const airplaneRepository=new AirplaneRepository();

async function createAirplane(data){
    try{
   
         const airplane=await airplaneRepository.create(data);
         return airplane;
    }
    catch(error){
        console.log(error)
        if(error.name=='SequelizeValidationError'){
            let explaination=[];
            console.log(error);
           error.errors.forEach(err => {
            explaination.push(err.message);
           });
           console.log(explaination)
            throw new AppError(explaination,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create new airplane object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
    
}
async function getAirplanes(){
    try{
        const airplanes= await airplaneRepository.getAll();
        return airplanes;
    }
    catch(error){
        throw new AppError('Cannot fetch all the data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
// async function getAirplane(id){
//     try{
//         const airplanes= await airplaneRepository.get(id);
        
//         return airplanes;
//     }
//     catch(error){
//         if(error.statusCodes==StatusCodes.NOT_FOUND){
//             throw new AppError('The airplane you requested is not present',error.StatusCodes)
//         }
//         throw new AppError('Cannot fetch all the data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
//     }
// }

async function getAirplane(id){
    try {
  
      const airplane = await airplaneRepository.get(id);
  
      // If airplane not found → return 404
      if(!airplane){
        throw new AppError(
          'The airplane you requested is not present',
          StatusCodes.NOT_FOUND
        );
      }
  
      return airplane;
  
    } catch(error){
  
      // If already a custom error → rethrow
      if(error instanceof AppError){
        throw error;
      }
  
      // Otherwise it's a real server error
      throw new AppError(
        'Cannot fetch the airplane',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

async function destroyAirplane(id){
    try{
    
    const response = await airplaneRepository.destroy(id);
    
    if(!response){
    throw new AppError(
    'The airplane you requested is not present',
    StatusCodes.NOT_FOUND
    );
    }
    
    return response;
    
    }catch(error){
    
    if(error instanceof AppError){
    throw error;
    }
    
    throw new AppError(
    'Cannot delete the airplane',
    StatusCodes.INTERNAL_SERVER_ERROR
    );
    }
    }
module.exports={
    createAirplane,
    getAirplanes,
    getAirplane, 
    destroyAirplane
}