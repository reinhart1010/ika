"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var console_1 = require("console");
var http = require('http');
var imageType = require('image-type');
var validUrl = require('valid-url');
var FileMessageContent = /** @class */ (function () {
    function FileMessageContent(file, options) {
        // If the input file is a Buffer, use them as is
        if (file instanceof Buffer)
            this.file = file;
        // If the input file is a string, check whether it's an URLor a file
        else if (typeof file == "string") {
            if (validUrl.isUri(file)) {
                // URI
                this.url = file;
            }
            else {
                throw console_1.exception("Invalid URL");
            }
        }
    }
    return FileMessageContent;
}());
