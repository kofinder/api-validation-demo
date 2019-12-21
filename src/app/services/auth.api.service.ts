import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BizApiConstants } from './biz.api.constants';


/**
 * @author - JamesLwin
 * @createdAt - DEC 22, 2019
 * @Mail - finderbar.theinlwin@gmail.com
*/

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  public signIn(json: string) {
    const url = BizApiConstants.BASE_URL + BizApiConstants.SIGNIN;
    return this.httpClient.post(url, json);
  }

  public signUp(json: string) {
    const url = BizApiConstants.BASE_URL + BizApiConstants.SIGNUP;
    return this.httpClient.post(url, json);
  }

  public twoFactor(json: string) {
    const url = BizApiConstants.BASE_URL + BizApiConstants.TWOFACTOR;
    return this.httpClient.post(url, json);
  }

  public forgotPassword(json: string) {
    const url = BizApiConstants.BASE_URL + BizApiConstants.FORGOT_PASSWORD;
    return this.httpClient.post(url, json);
  }

  public resetPassword(json: string) {
    const url = BizApiConstants.BASE_URL + BizApiConstants.RESET_PASSWORD;
    return this.httpClient.post(url, json);
  }

  public sendOTP(json: string) {
    const url = BizApiConstants.BASE_URL + BizApiConstants.OTP;
    return this.httpClient.post(url, json);
  }
}
