const authenticateUtil = require('../utils/authenticate');
const apiResponse = require('../utils/apiResponse.js');

module.exports = async (req, res, next) => {
    console.log("hi auth")
    const accessToken = req.headers['x-access-token'];

    if (!accessToken) {
        console.log("hi auth is not present")
        return apiResponse.unauthorized(res, 'Required access token');
    }

    try {
        console.log("hi I am present ")
        const result = await authenticateUtil.certifyAccessToken(accessToken);
        console.log("Result "+JSON.stringify(result))
        req.body.id = result.id;
        req.body.loggedUserType = result.UserType;
        req.body.loggedUserName = result.Name;
        return next();
    } catch (err) {
        console.log("hi I am auth catch error")
        return apiResponse.unauthorized(res, err.toString());
    }
};
