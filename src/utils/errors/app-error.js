class AppError extends Error{
    constructor(message,stausCode){
        super(message);
        this.statusCode=stausCode;
        this.explaination=message;
    }
}
module.exports=AppError;