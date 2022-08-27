const asyncHandler = (fn) => (req, res, next) =>
/**It doesn't work because .catch block receives as an argument a function to which arguments an error will be passed
  .catch(e =>{});
  but in this case a result of next() function is passed and if its result is a standard controller's response,
  then the current code in catch looks like .catch((e) => response(e)).. this fails and 
  calls the error handler, which tries to modify response (but can't because response has been sent away already)
  **/
  Promise.resolve(fn(req, res, next)).catch(next());
/** Although this way to avoid ugly 'try... catch' block in async functions is quite common,
    I think there is no harm in keeping the 'try... catch' in the controllers. 
    Whether you'll keep the current way of how your controllers look or fix this function and wrap the controllers
    is a matter of choice. Both options are fine. 

*/
module.exports = asyncHandler;
/**
 * And this function is not a middleware, it more belongs to utils..(or somewhere else)
 * The same as logger
 */
