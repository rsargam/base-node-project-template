const {AirportRepository}=require("../repositories");
const {StatusCodes}=require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const airportRepository=new AirportRepository();

async function createAirport(data){
    try{
   
         const airport=await airportRepository.create(data);
         return airport;
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
        throw new AppError("Cannot create new airport object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
    
}
async function getAirports(){
    try{
        const airports= await airportRepository.getAll();
        return airports;
    }
    catch(error){
        throw new AppError('Cannot fetch all the data of all the airports',StatusCodes.INTERNAL_SERVER_ERROR);
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

async function getAirport(id){
    try {
  
      const airport = await airportRepository.get(id);
  
      // If airplane not found → return 404
      if(!airport){
        throw new AppError(
          'The airport you requested is not present',
          StatusCodes.NOT_FOUND
        );
      }
  
      return airport;
  
    } catch(error){
  
      // If already a custom error → rethrow
      if(error instanceof AppError){
        throw error;
      }
  
      // Otherwise it's a real server error
      throw new AppError(
        'Cannot fetch the airport',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

async function destroyAirport(id){
    try{
    
    const response = await airportRepository.destroy(id);
    
    if(!response){
    throw new AppError(
    'The airport you requested is not present',
    StatusCodes.NOT_FOUND
    );
    }
    
    return response;
    
    }catch(error){
    
    if(error instanceof AppError){
    throw error;
    }
    
    throw new AppError(
    'Cannot delete the airport',
    StatusCodes.INTERNAL_SERVER_ERROR
    );
    }
    }
module.exports={
    createAirport,
    getAirports,
    getAirport, 
    destroyAirport
}