const TelegramNodeBot = require('telegram-node-bot');

/**
 * Represents TodoController
 */
class TodoController extends TelegramNodeBot.TelegramBaseController {
  /**
  * This method of your controller will be called to handle command.
  *
  * @param {Scope} $
  * @return {Object} store todo
  */
  addHandler($) {
    // $.sendMessage('pong');
    const todo = $.message.text.split(' ').slice(1).join(' ');
    if (!todo) return $.sendMessage('sorry, please pass todo item.');
    $.getUserSession('todos')
        .then((todos) => {
          console.log(todos);
          console.log(todo);

          if (!Array.isArray(todos)) $.setUserSession('todos', [todo]);
          else $.setUserSession('todos', todos.concat([todo]));
          $.sendMessage('Added new todo');
        })
        .catch((err) => {
          console.log(err);
        });
  }

  /**
  * This method of your controller will be called to handle command.
  *
  * @param {Scope} $
  */
  getHandler($) {
    $.getUserSession('todos')
        .then((todos) => {
          console.log(todos);

          $.sendMessage(this._serializeList(todos), {parse_mode: 'Markdown'});
        })
        .catch((err) => {
          console.log(err);
        });
  }
  /**
  * This method of your controller will be called to handle command.
  *
  * @param {Scope} $
  * @return {Object} store todo
  *
  */
  checkHandler($) {
    let index;
    try {
      index = $.message.text.split(' ').slice(1)[0];
    } catch (error) {
      return $.sendMessage('Sorry, please enter valid index');
    }

    $.getUserSession('todos')
        .then((todos) => {
          console.log(todos);
          todos.splice(index, 1);
          $.setUserSession('todos', todos);
          $.sendMessage('checked');
        })
        .catch((err) => {
          console.log(err);
        });
  }

  /**
   * handle commands
   */
  get routes() {
    return {
      addCommand: 'addHandler',
      getCommand: 'getHandler',
      checkCommand: 'checkHandler',
    };
  }

  /**
   *
   * Convert array to string format
   * @param {list} todoList list of todos
   * @return {String} serialized text.
   */
  _serializeList(todoList) {
    let serialized = ' *Your todos:* \n\n ';
    todoList.forEach((todo, i) => {
      serialized += `*${i + 1}* - ${todo} \n`;
    });
    return serialized;
  }
}

module.exports = TodoController;
