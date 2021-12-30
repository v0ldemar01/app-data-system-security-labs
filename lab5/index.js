'use strict';

const crypto = require('crypto');

const generateKeyPair = () => crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: ''
  }
});

const encrypt = (data, publicKey) => {
  const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(data));
  return encrypted.toString('base64');
};

const decrypt = (ciphertext, privateKey) => {
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      passphrase: '',
    },
    Buffer.from(ciphertext, 'base64')
  );
  return decrypted.toString('utf8');
}

(async () => {
  const data = 'Checking correctness';
  const keyPair = generateKeyPair();
  const encrypted = encrypt(data, keyPair.publicKey);
  const decrypted = decrypt(encrypted, keyPair.privateKey);
  console.log('Data: ', data);
  console.log('Encrypted: ', encrypted);
  console.log('Decrypted: ', decrypted);
})();



