/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable line-comment-position */
import { TransactionEvent, ErrorEvent, Event } from '@sentry/types';
import { isObject, snakeCase } from 'lodash';

// https://github.com/getsentry/sentry-python/blob/8094c9e4462c7af4d73bfe3b6382791f9949e7f0/sentry_sdk/scrubber.py#L14
const DEFAULT_DENYLIST = [
  // stolen from relay
  'password',
  'passwd',
  'secret',
  'api_key',
  'apikey',
  'auth',
  'credentials',
  'mysql_pwd',
  'privatekey',
  'private_key',
  'token',
  'ip_address',
  'session',
  // django
  'csrftoken',
  'sessionid',
  // wsgi
  'remote_addr',
  'x_csrftoken',
  'x_forwarded_for',
  'set_cookie',
  'cookie',
  'authorization',
  'x_api_key',
  'x_forwarded_for',
  'x_real_ip',
  // other common names used in the wild
  'aiohttp_session', // aiohttp
  'connect.sid', // Express
  'csrf_token', // Pyramid
  'csrf', // (this is a cookie name used in accepted answers on stack overflow)
  '_csrf', // Express
  '_csrf_token', // Bottle
  'PHPSESSID', // PHP
  '_session', // Sanic
  'symfony', // Symfony
  'user_session', // Vue
  '_xsrf', // Tornado
  'XSRF-TOKEN' // Angular, Laravel
];

const SENTRY_DENYLIST = [...DEFAULT_DENYLIST, 'register_number'];

export const cleanSensitiveData = (data: Record<string, unknown>) => {
  Object.entries(data).forEach(([key, value]) => {
    if (
      SENTRY_DENYLIST.includes(key) ||
      SENTRY_DENYLIST.includes(snakeCase(key))
    ) {
      delete data[key];
    } else if (Array.isArray(value)) {
      data[key] = value.map(item =>
        isObject(item)
          ? cleanSensitiveData(item as Record<string, unknown>)
          : item
      );
    } else if (isObject(value)) {
      data[key] = cleanSensitiveData(value as Record<string, unknown>);
    }
  });

  return data;
};

export const beforeSend = (event: ErrorEvent): Event =>
  (cleanSensitiveData(
    (event as unknown) as Record<string, unknown>
  ) as unknown) as ErrorEvent;

export const beforeSendTransaction = (
  event: TransactionEvent
): TransactionEvent =>
  (cleanSensitiveData(
    (event as unknown) as Record<string, unknown>
  ) as unknown) as TransactionEvent;
