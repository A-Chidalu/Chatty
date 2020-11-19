const moment = require('moment');

function formatMessage(userName, roomName, msgString) {
    return {
        userName,
        roomName,
        msgString,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;