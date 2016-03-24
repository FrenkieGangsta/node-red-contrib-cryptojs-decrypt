# node-red-contrib-cryptojs-decrypt: This is a simple node that decrypts AES encrypted messages 

WARNING: This is work in progress.

This node picks up BASE64 encrypted data on msg.payload.rawData and decrypts it by using an AES key.

#To setup

Install pre-requisities:

npm install crypto-js
npm install btoa

Install the node:

cd .node-red/node_modules
git clone https://github.com/fcgdam/node-red-contrib-cryptojs-decrypt.git

Reload node-red and the new node should appear as cryptojs under the function nodes.

#Testing:
I provide a standalone gen.js file that generates an encripted message with the provided key, and a sample Node-Red flow, to check if decoding works.

Edit the gen.js file and change the message value to the data that is to be encrypted and the provided key, if needed.
Run the file with node gen.js command.

Import the denc_flow.txt file into Node-Red and change the rawData property on the Dummy Message node. Change the key on the crypto-js node if needed. 

#To be done:
Using the initialization vector and block mode.


