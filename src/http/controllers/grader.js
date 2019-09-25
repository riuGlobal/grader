export const test = async (req, res, next) => {
    try {
      let message = 'Ha ocurrido un error, tu carrito de compras no existe'
      let status = '200'
      let data = {};

        data.message = message;
   
  
      
      res.status(status).send(data)
    } catch (err) {
      console.log(err)
      let error = errorToJson(err)
      res.status(error.code).send(error)
    }
  }