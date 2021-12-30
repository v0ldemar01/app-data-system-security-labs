'use strict';

const crypto = require('crypto');

const data = 'lab6';

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

const signature = (data, privateKey) => crypto.sign('SHA256', Buffer.from(data), privateKey);

const isVerified = (data, publicKey, signature) => crypto.verify('SHA256', Buffer.from(data), publicKey, signature);

const sign = signature(data, privateKey);

console.log(`Is signature verified: ${isVerified(data, publicKey, sign)}`);