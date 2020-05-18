const TelegramNodeBot = require('telegram-node-bot');

class PingController extends TelegramNodeBot.TelegramBaseController {
    pingHandler($) {
        $.sendMessage('pong')
    }
    get routes() {
        return {
            'pingCommand': 'pingHandler'
        }
    }
}

module.exports = PingController