const {FlightRepository}=require("../repositories");
const {Op}=require("sequelize");
const {StatusCodes}=require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const e = require("express");
const { Airport } = require("../models");

const flightRepository=new FlightRepository();

async function createFlight(data){
    try{
   
        const flight = await flightRepository.create(data);
         return flight;
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
        throw new AppError("Cannot create new flight object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
    
}

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
  
    // if (query.trips) {
    //   const [departureAirportId, arrivalAirportId] = query.trips.split("-");
    //   customFilter.departureAirportId = departureAirportId;
    //   customFilter.arrivalAirportId = arrivalAirportId;
    // }
    if (query.trips) {
        const [departureCode, arrivalCode] = query.trips.split("-");
      
        const airports = await Airport.findAll({
          where: {
            code: [departureCode, arrivalCode]
          }
        });
      
        if (airports.length !== 2) {
          throw new AppError("Invalid airport codes", StatusCodes.BAD_REQUEST);
        }
      
        const departureAirport = airports.find(a => a.code === departureCode);
        const arrivalAirport = airports.find(a => a.code === arrivalCode);
      
        customFilter.departureAirportId = departureAirport.id;
        customFilter.arrivalAirportId = arrivalAirport.id;
      }
  
    if (query.price) {
      const [minPrice, maxPrice] = query.price.split("-");
      customFilter.price = {
        [Op.between]: [
          Number(minPrice),
          Number(maxPrice || 20000)
        ]
      };
    }
  
    if (query.travellers) {
      customFilter.totalSeats = {
        [Op.gte]: Number(query.travellers)
      };
    }
  
    if (query.tripDate) {
      customFilter.departureTime = {
        [Op.between]: [
          new Date(query.tripDate + " 00:00:00"),
          new Date(query.tripDate + " 23:59:59")
        ]
      };
    }
  
    if (query.sort) {
      const params = query.sort.split(",");
      sortFilter = params.map(param => param.split("_"));
    }
  
    try {
      const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
      return flights;
    } catch (error) {
      console.log(error);
      throw new AppError(
        "Cannot fetch data of all flights",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

module.exports={
    createFlight,
    getAllFlights
}