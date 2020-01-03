const { encrypter } = require("../config");
const Cryptnp = require("cryptnp");

class CryptNpClient {
  constructor() {
    this.cryptnp = new Cryptnp(encrypter);
  }

  encrypt(data) {
    return this.cryptnp.rail(data);
  }

  decrypt(encrypted) {
    return this.cryptnp.derail(encrypted);
  }
}

module.exports = CryptNpClient;
