export const test = async (req, res, next) => {
  try {
    let status = '200'
    let data = {};
    let message = 'Testing'

    data.message = message;
   
    res.status(status).send(data)
  } catch (err) {
    console.log(err)
    let error = errorToJson(err)
    res.status(error.code).send(error)
  }
}

export const grade = async (req,res,next) => {
  try {
    
    let status = '200'
    let data = {};
    let message = 'Testing'
   
    res.status(status).send(data)
  
  } catch (err) {
    console.log(err)
    let error = errorToJson(err)
    res.status(error.code).send(error)
  }
}