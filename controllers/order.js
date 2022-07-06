const ErrorResponse  = require("../utils/ErrorResponse")
 const axios = require("axios")

 const Orders = require("../models/Orders")


 // Check order status
exports.checkOrderStatus =  (req,res,next)=>{

// Get Order ID from Request
let order_id = req.body.order_id;

//create payload 
let payload = {
    "orders":[
        {
            "orderNo":order_id
        }
    ]
}
//Check if order exist.
axios.post(process.env.OPTIMOROUTE_URL+'/get_completion_details?key='+process.env.OPTIMOROUTE_KEY, payload)
      .then((response) => {
        console.log(response.data)
        res.send({
            "data":response.data

        })
      }, (error) => {
        res.send ({
            "data":error
        })
      });
}

exports.fetchOrderDetails = (req,res,next)=>{

    let order_id = req.body.order_id;

    //create payload 
    let payload = {
        "orders":[
            {
                "orderNo":order_id
            }
        ]
    }
    //Check if order exist.
    axios.post(process.env.OPTIMOROUTE_URL+'/get_orders?key='+process.env.OPTIMOROUTE_KEY, payload)
          .then((response) => {
            console.log(response.data)
            res.send({
                "data":response.data
    
            })
          }, (error) => {
            res.send ({
                "data":error
            })
          });
}


exports.fetchOrderCompletedDetails = async (req,res,next)=>{
    const order = await Orders.find()

    res.status(200).json({sucess:true,order})
}