// err = information that happened before 
// next = information that happened after 
// intercepting the error, trying to find a bit of information about it,so we know what went wrong
const errorMiddleware = (err, req, res, next) => {
try {
let error = {...err};

error.message = err.message;

console.error(err)
  // Mongoose bad ObjectId
  if (err.name === 'castError') {
    const message = 'resource not found';

    error = new Error(message);
    error.statusCode = 404;

    // mongoose duplicate key 
    if (err.code === 11000) {
      const message = 'duplicate field value entered'
      error = new Error(message);
      error.statusCode = 400;
    }
    // mongoose validation error
    if (err.name == 'validationError') {
      const message = Object.values(err.errors).map(val => val.message);
      error = new Error(message.join(','));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({ success: false, error: error.message || 'server Error'});
  }
  } catch (error) {
    next(error);
    }
}

export default errorMiddleware;