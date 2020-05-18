const { TOKEN } = require('./config');
const TelegramNodeBot = require('telegram-node-bot');
const TelegramBaseController = TelegramNodeBot.TelegramBaseController
const TextCommand = TelegramNodeBot.TextCommand
const tg = new TelegramNodeBot.Telegram(TOKEN, { workers: 1 })
const PingController = require('./controllers/ping')
const OtherwiseController  = require('./controllers/otherwise')
tg.router.when(new TextCommand('/ping', 'pingCommand'), new PingController())
    .otherwise(new OtherwiseController())