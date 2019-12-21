import * as CryptoJS from 'crypto-js';


/**
 * @author - JamesLwin
 * @createdAt - DEC 22, 2019
 * @Mail - finderbar.theinlwin@gmail.com
*/
export default class AppSignature {
  private scheme: string;
	private host: string;
	private method: string;
	private resource: string;
	private nonce: string;
	private apiKey: string;
  private apiSecret: string;
  private payLoad: string;
  private date: string;
  private contentType: string;
  private delimiter: string;

  /**
  * Creates an instance of crypto builder
  */
  constructor(scheme: string, host: string, method: string, resource: string, nonce: string, apiKey: string, apiSecret: string, payLoad: string, date: string, contentType: string, delimiter: string) {
      this.scheme = scheme;
      this.host = host;
      this.method = method;
      this.resource = resource;
      this.nonce = nonce;
      this.apiKey = apiKey;
      this.apiSecret = apiSecret;
      this.payLoad = payLoad;
      this.date = date;
      this.contentType = contentType;
      this.delimiter = delimiter;
  }

  // return hash string
  public getSignature() {
    let message = this.method + this.delimiter
                + this.scheme + this.delimiter
                + this.host + this.delimiter
                + this.resource + this.delimiter
                + this.contentType + this.delimiter
                + this.apiKey + this.delimiter
                + this.nonce + this.delimiter
                + this.date + this.delimiter
                + this.payLoad + this.delimiter;
                
    // generate digest
    let digest = CryptoJS.HmacSHA512(message, this.apiSecret);
    return CryptoJS.enc.Base64.stringify(digest)
  }
}
