import * as CryptoJS from 'crypto-js';

/**
 * @author - JamesLwin
 * @createdAt - DEC 22, 2019
 * @Mail - finderbar.theinlwin@gmail.com
*/
export default class AppCrypto {
  private keySize: number;
  private iterationCount: number;

  /**
  * Creates an instance of crypto builder
  */
  constructor(keySize: number, iterationCount: number) {
    this.keySize = keySize / 32;
    this.iterationCount = iterationCount;
  }

  /**
   * @summary - encrypt any data
   * @param {number} salt
   * @param {string} apiSecret
   * @param {string} json
   * @returns {string} hash key
  */
  private generateKey(salt: string, apiSecret: string) {
    return CryptoJS.PBKDF2(apiSecret, CryptoJS.enc.Hex.parse(salt), {
      keySize: this.keySize,
      iterations: this.iterationCount
    });
  }

  /**
   * @summary - encrypt any data
   * @param {string} salt
   * @param {string} vi
   * @param {string} apiSecret
   * @param {string} json
   * @returns {string} hash string
  */
  public encrypt(salt: string, iv: string, apiSecret: string, json: string) {
    const key = this.generateKey(salt, apiSecret);
    const encrypted = CryptoJS.AES.encrypt(json, key, { iv: CryptoJS.enc.Hex.parse(iv) });

    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }


  /**
   * @summary - decrypt any data
   * @param {string} salt
   * @param {string} vi
   * @param {string} apiSecret
   * @param {string} encryptedText
   * @returns {string} json string
  */
  public decrypt(salt: string, iv: string, apiSecret: string, encryptedText: string) {
    const key = this.generateKey(salt, apiSecret);
    const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(encryptedText) });
    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, { iv: CryptoJS.enc.Hex.parse(iv) });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
