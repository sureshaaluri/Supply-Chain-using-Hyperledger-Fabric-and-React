const apiResponse = require('../utils/apiResponse.js');

module.exports = async (req, res, next) => {
    console.log("hi I am Checkrole")
    const {loggedUserType} = req.body;
    console.log(req.body);

    if (!loggedUserType) {
        console.log("loggedusertype is not present in checkrole")
        return apiResponse.unauthorized(res, 'Unauthorised user');
    }

    try {
        console.log("hi I am try in checkrole")
        if( loggedUserType === 'admin') {
            console.log("hi I am admin in checkrole")
            return next();
        }
        return apiResponse.unauthorized(res, "User type admin required");
    } catch (err) {
        console.log("hi I am catch in checkrole")
        return apiResponse.unauthorized(res, err.toString());
    }
};
