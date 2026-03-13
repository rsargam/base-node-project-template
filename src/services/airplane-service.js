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
module.exports={
    createAirplane,
    getAirplanes
}