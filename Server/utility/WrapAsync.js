// WrapAsync is a function that wraps an async function and catches any errors
// It is used to avoid using try catch blocks in the routes

const WrapAsync = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
};

module.exports = WrapAsync;