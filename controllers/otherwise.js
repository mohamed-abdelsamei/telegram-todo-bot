const TelegramNodeBot = require('telegram-node-bot');

class OtherwiseController extends TelegramNodeBot.TelegramBaseController {
    handle($) {
        $.sendMessage('Sorry, I don\'t understand')
    }
}
module.exports = OtherwiseController