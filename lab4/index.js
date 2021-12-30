'use strict';

const forge = require('node-forge');
const BigNumber = require('bignumber.js');

const options = {
  algorithm: {
    name: 'PRIMEINC',
    workers: -1,
  },
};
class RSA {
  static genaratePrimePair(bits) {    
    return new Promise((res, rej) => {
      forge.prime.generateProbablePrime(bits, options, function (err, num) {
        if (err) return rej(err);
        res(new BigNumber(num.toString()));
      });
    });
  }
}

(async () => {
  try {
    const a = await RSA.genaratePrimePair(1024);
    const b = await RSA.genaratePrimePair(1024);

    console.dir({
      a: a.toString(),
      b: b.toString(),
    });

    console.dir({
      sum: a.plus(b).toString(),
      mult: a.multipliedBy(b).toString(),
      mod: a.modulo(2).toString(),
      pow: a.exponentiatedBy(2).toString(),
    });
  } catch (err) {
    console.dir(err);
  }
})();
