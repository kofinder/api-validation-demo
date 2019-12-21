import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppConfig } from './app.config';


import * as uuid from 'uuid';
import * as CryptoJS from 'crypto-js';

import AppSignature from './app.signature';
import AppCrypto from './app.crypto';


/**
 * @author - JamesLwin
 * @createdAt - DEC 22, 2019
 * @Mail - finderbar.theinlwin@gmail.com
*/
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // generate  aesBody
    const json = req.body;
    const iv = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    const salt = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    const aesUtil = new AppCrypto(AppConfig.KEY_SIZE, AppConfig.ITERATION_COUNT);
    const aesBody = aesUtil.encrypt(salt, iv, AppConfig.API_SERECT, json);
    const contentAES = iv + ":" + salt;

    // generate signature
    const nonce = uuid.v4();
    const dateStr = new Date().toUTCString();
    const apiBuilder = new AppSignature(
      AppConfig.SCHEMA,           //scheme
      AppConfig.HOST,             // host
      AppConfig.METHOD,           // method
      AppConfig.RESOURCE,         // resource
      nonce,                      // nonce
      AppConfig.API_KEY,          // apikey
      AppConfig.API_SERECT,       // apiSecret
      aesBody,                    // payLoad
      dateStr,                    // dateStr
      AppConfig.CONTENT_TYPE,     // contentType
      AppConfig.DELIMETER);       // delimiter

    const signature = apiBuilder.getSignature();
    const authorization = AppConfig.ALGORITHM +
      AppConfig.SPACING +
      AppConfig.API_KEY +
      AppConfig.SEMICOLUMN +
      nonce +
      AppConfig.SEMICOLUMN +
      signature;

    req = req.clone({ headers: req.headers.set('Accept', AppConfig.CONTENT_TYPE) });
    req = req.clone({ headers: req.headers.set('Content-Type', AppConfig.CONTENT_TYPE) });
    req = req.clone({ headers: req.headers.set('User-Agent', AppConfig.USER_AGENT) });
    req = req.clone({ headers: req.headers.set('Content-Date', dateStr) });
    req = req.clone({ headers: req.headers.set('Authorization', authorization) });
    req = req.clone({ headers: req.headers.set('Content-AES', contentAES) }); // custom body
    req = req.clone({ withCredentials: true });
    req = req.clone({ body: aesBody });

    console.log(req);

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}
