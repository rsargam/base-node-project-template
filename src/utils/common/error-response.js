// const error={
//     data:{},
//     success:false,
//     message:"Not able to create an airplane",
//     error:{}
// }
// module.exports=error;

const error = {
    data: {},
    success: false,
    message: "Something went wrong",
    error: {
      statusCode: null,
      explanation: null
    }
  };
  
  module.exports = error;