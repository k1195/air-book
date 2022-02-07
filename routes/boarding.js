const express = require('express')
const router = express.Router()
const mongoose = require('../utility/connect_mongoose')
const Booking = mongoose.model("Booking")


router.get('/boarding',(req,res)=>{

    const {flightDate} = req.body
    if(!flightDate){
        return res.status(422).json({error:"please input date"})
    }
        const date = new Date(flightDate) 

    // Booking.find({flightDate:date})
    // .select("-_id -createdAt")
    // .then(results=>{
    //     return res.status(200).json(results)
    // }).catch(err=>{
    //     return res.status(404).json({error: "No Booking Found"})
    // })

    // Booking.find({},
    //     {bookingId:1,contact:1,seats:1,_id:0})
    //     .sort({"seats":1})
    //     .then(results=>{
    //             return res.status(200).json(results)
    //         }).catch(err=>{
    //             return res.status(404).json({error: err})
    //         })

    Booking.aggregate([
        { $unwind: '$seats' },
        { $sort: { 'seats.seatNo': -1 }},
     { $group: { _id: '$bookingId' ,index:{$first:'$seats.seatNo'},
                    contact:{$first:'$contact'},  seats: { $push: '$seats'}}},
     { $sort: { index: -1 }},
    ])
        .then(results=>{
                        return res.status(200).json(results)
                    }).catch(err=>{
                        console.log(err)
                        return res.status(404).json({error: err})
                    })
        
    
})

module.exports = router