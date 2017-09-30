if(process.env.NODE_ENV === 'production') {
    //We are in production mode. Return production keys
    module.exports = require('./prod');
}else {
    //We are in dev mode. Return the dev keys.
    module.exports = require('./dev');
}