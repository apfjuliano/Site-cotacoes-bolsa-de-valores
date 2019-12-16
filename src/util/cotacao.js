const request = require('request')
const apiToken = 'Rev2THFHnpF4tf3xjSlIXFco26EW6pwX9A8QrX49tZc84DuQkc9BdjnBN2mD'

const cotacao = (symbol, callback)=>{
    let error    
    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${apiToken}`
    console.log(symbol)
    request(
        {url: url, json: true}, 
        (err, response) => {
            if(err){
                // error = {
                //     message: `Something went wrong: ${err}`
                // }
                // return callback(null, error)
                callback({message: `Something went wrong: ${err}`}, undefined)
            }

            if(response.body.data===undefined){
                if(response.body.Message){
                    // error = {
                    //     message: `${response.body.Message}\nStock: ${this.symbol}`
                    // }
                    
                    callback({
                        message: `${response.body.Message}`, 
                        code: 500,
                        stock: `${this.symbol}`
                    })
                }else{
                    // error = {
                    //     message: `No data found`
                    // }
                    callback({
                        message: `No data found`,
                        code: 404
                    }, undefined)
                }
                return callback(null, error)
            }else{
                const {symbol, name, price, price_open, day_high, day_low} = response.body.data[0]
                
                data = ({symbol, description: name, price, price_open, day_high, day_low})
                
                return callback(undefined, data)
            }
        }
    )
}

module.exports = cotacao



// const request = require('request')
// const apiToken = 'Rev2THFHnpF4tf3xjSlIXFco26EW6pwX9A8QrX49tZc84DuQkc9BdjnBN2mD'

// const cotacao = (symbol, callback)=>{
    
//     const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${apiToken}`
//     request(
//         {url: url, json: true}, 
//         (err, response) => {
//             if(err){
//                 const error = {
//                     message: `Something went wrong: ${err}`
//                 }
//                 callback(null, error)
//             }else{
//                 try{
//                     const data = []
//                     const {symbol, name, price, price_open, day_high, day_low} = response.body.data[0]
//                     data.push({symbol, description: name, price, price_open, day_high, day_low})
//                     callback(data, null)
//                 }catch(e){
//                     if(err !== null){
//                         const error = {
//                             message: `Something went wrong!`
//                         }
//                         console.error('err')
//                     }else{
//                         //throw new Error(response.body.Message)
//                         const error = {
//                             message: `${response.body.Message}\nStock: ${symbol}`
//                         }
//                     }
//                 }
//             }
//         }
//     )
// }

// module.exports = cotacao