const TelegramNodeBot = require('telegram-node-bot');
const {TextCommand} = TelegramNodeBot;
const {TOKEN} = require('./config');
const tg = new TelegramNodeBot.Telegram(TOKEN, {workers: 1});
const TodoController = require('./controllers/todo');
const OtherwiseController = require('./controllers/otherwise');
const todoCtrl = new TodoController();
tg.router.when(new TextCommand('/add', 'addCommand'), todoCtrl)
    .when(new TextCommand('/get', 'getCommand'), todoCtrl)
    .when(new TextCommand('/check', 'checkCommand'), todoCtrl)
    .otherwise(new OtherwiseController());
