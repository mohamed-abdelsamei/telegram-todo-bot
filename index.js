const {TOKEN} = require('./config');
const {Telegram, TextCommand} = require('telegram-node-bot');
const PersistMemoryStorage =require('./adapters/PersistMemoryStorage');
console.log( `${__dirname}/data/userStorage.json`);

const storage = new PersistMemoryStorage(
    `${__dirname}/data/userStorage.json`,
    `${__dirname}/data/chatStorage.json`,
);
const tg = new Telegram(TOKEN, {workers: 1, storage: storage});
const TodoController = require('./controllers/todo');
const OtherwiseController = require('./controllers/otherwise');
const todoCtrl = new TodoController();
tg.router.when(new TextCommand('/add', 'addCommand'), todoCtrl)
    .when(new TextCommand('/get', 'getCommand'), todoCtrl)
    .when(new TextCommand('/check', 'checkCommand'), todoCtrl)
    .otherwise(new OtherwiseController());
/**
 *
 *
 * @param {*} exitCode
 */
function exitHandler(exitCode) {
  storage.flush();
  process.exit(exitCode);
}
process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null, 1));
