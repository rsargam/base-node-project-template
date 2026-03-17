const {Logger} = require("../config");
const { error } = require("../utils/common/error-response");
const {StatusCodes}=require('http-status-codes')
const AppError = require("../utils/errors/app-error");

class CrudRepository{
    constructor(model){
        this.model=model;
    }
    async create(data){
        console.log("inside repositories")
        try{
            const response=await this.model.create(data);
            return response;
        }
        catch(error){
           Logger.error("Something went wrong in crud repository");
            throw error;
        }
    }
    async destroy(data){
       
            const response=await this.model.destroy({
                where:{
                    id:data
                }
            });
            if(!response){
                throw new AppError('not able to find the resource',StatusCodes.NOT_FOUND);
            }
            return response;
        
        
    }
    async get(data){
      
            const response=await this.model.findByPk(data);
            if(!response){
                throw new AppError('not able to find the resource',StatusCodes.NOT_FOUND);
            }
            return response; 

        
    }
    async getAll(){
       
            const response=await this.model.findAll();
            return response;
        
       
    }
    async update(id,data){ //data ->{col,val..}
        
            const response=await this.model.update(data,{
                where:{
                    id:id
                }
            });
            return response;
        
        
    }
    
}

module.exports=CrudRepository;