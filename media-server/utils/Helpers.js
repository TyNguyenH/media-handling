const { v4: uuidv4 } = require("uuid");


const Helpers = {
    createUUID: () => {
        return uuidv4();
    }
}


module.exports = Helpers;