const crypto = window.require('crypto');

const secret = 'blablabla';
const algorithm = 'aes-256-ctr';
const ivLength = 16;

const getCipherKey = password =>
  crypto.createHash('sha256').update(password).digest();

export const encrypt = async data => {
  try {
    const iv = crypto.randomBytes(ivLength);
    const CIPHER_KEY = getCipherKey(secret);
    const cipher = crypto.createCipheriv(algorithm, CIPHER_KEY, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    const result = `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    return result;
  } catch (err) {
    console.log('Encrypt error', err);
    throw err;
  }
}

export const decrypt = async content => {
  try {
    const [iv, data] = content.split(':');
    const CIPHER_KEY = getCipherKey(secret);
    const decipher = crypto.createDecipheriv(algorithm, CIPHER_KEY, Buffer.from(iv, 'hex'));
    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(data, 'hex')),
      decipher.final(),
    ]);
    return decrpyted.toString();
  } catch (err) {
    console.log('Decrypt error', err);
    throw err;
  }
}