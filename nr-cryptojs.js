/**
 * Copyright 2016 Willem Eradus
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
	"use strict";
	// require any external libraries we may need....
	var CryptoJS = require("crypto-js");
	var btoa = require('btoa')

	// The main node definition - most things happen in here
	function cryptojsDecryptNode(n) {
        	// Create a RED node
        	RED.nodes.createNode(this,n);

		// Store local copies of the node configuration (as defined in the .html)
		this.key = n.key;
		this.iv  = n.iv;

		// copy "this" object in case we need it in context of callbacks of other functions.
		var node = this;

		function deCrypt(data, key, iv) {
            		//node.warn("I saw a payload: " + data);
            		//node.warn("I saw a key: " + key);
			var obj = {};
			try {
				var bytes = CryptoJS.AES.decrypt( data , key );
				obj.data = bytes.toString(CryptoJS.enc.base64);
				//node.warn("Decoded data: " + bytes.toString(CryptoJS.enc.Utf8));
			} catch(err) {
				node.error("Error decrypting data...");
			}
		

			return obj;

		}
        // Do whatever you need to do in here - declare callbacks etc
        // Note: this sample doesn't do anything much - it will only send
        // this message once at startup...
        // Look at other real nodes for some better ideas of what to do....
		// respond to inputs....
        this.on('input', function (msg) {
            	//node.warn("I saw a payload: "+msg.payload.rawData);

		var obj = deCrypt( msg.payload.rawData, this.key, this.iv);;
		msg.decrypted = obj.data;
            	node.send(msg);
        });

        this.on("close", function() {
            // Called when the node is shutdown - eg on redeploy.
            // Allows ports to be closed, connections dropped etc.
            // eg: node.client.disconnect();
        });
    }

    // Register the node by name. This must be called before overriding any of the
    // Node functions.
    RED.nodes.registerType("cryptojs",cryptojsDecryptNode);

}
