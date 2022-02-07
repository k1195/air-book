const mongoose = require('../utility/connect_mongoose')
// const {ObjectId} = mongoose.Schema.Types

const bookingSchema = new mongoose.Schema({
    bookingId:{
         type:String,
         required:true,
         unique : true,
         default : 1,
    },
    contact:{
        type:String,
        required:true
    },
    flightDate:{
        type:Date,
        required:true
    },
    seats:[ {seatId : String,
            seatNo : Number}],
    boardingStatus:{
        type:Boolean,
    }, 
},
    { timestamps: { createdAt: true, updatedAt: false }
      
    })

mongoose.model("Booking",bookingSchema)