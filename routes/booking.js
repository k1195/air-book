const express = require('express')
const router = express.Router()
const mongoose = require('../utility/connect_mongoose')
const Booking = mongoose.model("Booking")

router.get('/booking',(req,res)=>{
    const {flightDate} = req.body
    if(!flightDate){
        return res.status(422).json({error:"please input date"})
    }
    const date = new Date(flightDate) 
    var seatsBlocked = []
    Booking.find({flightDate:date})
    .then(results=>{
        console.log(results)
        results.map(item =>{
            seatsBlocked = seatsBlocked.concat(item.seats)
        })    
        return res.status(200).json(seatsBlocked)
    }).catch(err=>{
        console.log(err)
        return res.status(404).json({error: err.error})
    })
})

router.post('/bookingsave', async (req,res)=>{
    const { contact,flightDate,seats } = req.body
    if(!contact || !flightDate|| !seats){
        return res.status(422).json({error:"please input all the fields"})
    }
        if( seats.length > 6 ){
            return  res.status(422).json({message:"Max of 6 seats allowed per booking"})
        }
           var seatsObjArr = []
           
           seats.map(item=>{
               var seatObj = {seatId : item,
                              seatNo:Number(item.slice(1))}
                  seatsObjArr.push(seatObj)            
           })

           console.log(seatsObjArr)

        const date = new Date(flightDate)    
          var id = await Booking.count() 
          id = id + 1
         const bookingObj = new Booking({
             bookingId : id,
             contact,
             flightDate : date,
             seats:seatsObjArr,
             boardingStatus:false  
         })
         bookingObj.save()
         .then(result=>{
             res.status(200).json({message:"saved successfully"})
         })
         .catch(err=>{
            res.status(400).json({message:err})
         })
 })

 module.exports = router