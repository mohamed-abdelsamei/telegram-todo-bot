const TelegramNodeBot = require('telegram-node-bot');
/**
 * OtherwiseController
 */
class OtherwiseController extends TelegramNodeBot.TelegramBaseController {
  /**
   * This method of your controller will be called to handle command.
   *
   * @param {Scope} scope
   */
  handle() {
    $.sendMessage('Sorry, I don\'t understand');
  }
}
module.exports = OtherwiseController;
