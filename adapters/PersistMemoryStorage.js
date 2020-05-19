const TelegramNodeBot = require('telegram-node-bot');
const fs = require('fs');
/**
 *
 *
 * @class PersistMemoryStorage
 * @extends {TelegramNodeBot.BaseStorage}
 */
class PersistMemoryStorage extends TelegramNodeBot.BaseStorage {
  /**
   *Creates an instance of PersistMemoryStorage.
   * @param {*} userStoragePath
   * @param {*} chatStoragePath
   * @memberof PersistMemoryStorage
   */
  constructor(userStoragePath, chatStoragePath) {
    super();
    this.userStoragePath = userStoragePath;
    this.chatStoragePath = chatStoragePath;

    this._storage = {
      userStorage: require(userStoragePath),
      chatStorage: require(chatStoragePath),
    };
  }
  /**
 *
 *
 * @param {*} storage
 * @param {*} key
 * @return {Promise}
 * @memberof PersistMemoryStorage
 */
  get(storage, key) {
    return new Promise((resolve) => {
      console.log(this._storage[storage][key]);

      resolve(this._storage[storage][key] || {});
    });
  }
  /**
 *
 *
 * @param {*} storage
 * @param {*} key
 * @param {*} data
 * @return {Promise}
 * @memberof PersistMemoryStorage
 */
  set(storage, key, data) {
    console.log(storage);
    console.log(key);
    console.log(data);

    return new Promise((resolve) => {
      this._storage[storage][key] = data;
      resolve();
    });
  }
  /**
 *
 *
 * @param {*} storage
 * @param {*} key
 * @return {Promise}
 * @memberof PersistMemoryStorage
 */
  delete(storage, key) {
    return new Promise((resolve) => {
      delete this._storage[storage][key];
      resolve;
    });
  }
  /**
 *
 *
 * @memberof PersistMemoryStorage
 */
  flush() {
    // eslint-disable-next-line max-len
    fs.writeFileSync(this.userStoragePath, JSON.stringify(this._storage.userStorage));
    // eslint-disable-next-line max-len
    fs.writeFileSync(this.chatStoragePath, JSON.stringify(this._storage.chatStorage));
  }
}
module.exports = PersistMemoryStorage;
