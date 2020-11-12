const moment = require('moment');

function formatMessage(userName, msgString) {
    return {
        userName,
        msgString,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;