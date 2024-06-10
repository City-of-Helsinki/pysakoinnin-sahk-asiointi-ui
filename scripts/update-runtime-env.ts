#!/usr/bin/env ts-node-script
import * as path from 'path';
import fs from 'fs';
import util from 'util';
import dotenv from 'dotenv';

const USE_TEST_ENV = process.env.NODE_ENV === 'test';
const defaultNodeEnv = USE_TEST_ENV ? 'test' : 'development';

/* @ts-ignore */
import.meta.env = {};

import.meta.env.NODE_ENV = process.env.NODE_ENV || defaultNodeEnv;

dotenv.config({
  processEnv: import.meta.env,
  ...(USE_TEST_ENV
    ? { path: ['.env', '.env.test.local'] }
    : { path: ['.env', `.env.${import.meta.env.NODE_ENV}`, '.env.local'] }),
  override: true,
});

// Prevent collision if app is running while tests are started
const configFile = USE_TEST_ENV ? 'test-env-config.js' : 'env-config.js';

const configurationFile: string = path.join(
  __dirname,
  '../public/' + configFile
);

const start = async () => {
  try {
    const envVariables = import.meta.env;

    fs.writeFile(
      configurationFile,
      'window._env_ = ' + util.inspect(envVariables, false, 2, false),
      function(err) {
        if (err) {
          return console.error(err);
        }
        return console.log('File created!');
      }
    );
  } catch (err) {
    console.error(err.message); // eslint-disable-line
    process.exit(1);
  }
};

start();
