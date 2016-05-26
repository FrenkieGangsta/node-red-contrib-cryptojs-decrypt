var CryptoJS = require("crypto-js");

// Change the value below to your message.
var message = "this is the message that we want to be encrypted.";

// The AES encryption/decription key to be used.
var AESKey = '2B7E151628AED2A6ABF7158809CF4F3C';

message=new Buffer(message).toString("base64");

// Encrypt
var ciphertext = CryptoJS.AES.encrypt(message, AESKey );

console.log("Cypher text: ");
console.log( ciphertext.toString(CryptoJS.enc.base64) );
console.log(" ");
console.log("Copy the above cipher text to the Node-Red Dummy message node, and paste the value on the rawData field");

console.log(" ");
console.log(" ");
console.log("Let's decrypt: ");

ciphertext='U2FsdGVkX185evptPg8xRLoe7NmMoO++K4rd8K8BFM7btrmREGCI6t0oKpRoZYZO';

// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), AESKey );
var plaintext = bytes.toString(CryptoJS.enc.Utf8);

console.log("Decrypted message UTF8 decoded: ");
console.log(plaintext);
console.log(" ");
console.log(" ");

console.log("Decrypted message Base64/HEX decoded: ");
console.log( bytes.toString(CryptoJS.enc.base64) );
var mes = new Buffer( bytes.toString(CryptoJS.enc.base64), 'hex').toString('ascii');
console.log(mes);


