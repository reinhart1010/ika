"use strict";
var TextMessageObject = /** @class */ (function () {
    // The `content` of a text message may contain either a string (treated as a UTF-8 encoded text), a `TextMessageContent` object, or an array of string and/or `TextMessageContent`.
    function TextMessageObject(message) {
        this.type = "text";
        this.content = [];
        // Directly pass the TextMessageContent
        if (typeof message === "undefined")
            return;
        else if (message instanceof Array) {
            var i = void 0;
            for (i = 0; i < message.length; i++) {
                var list = message[i];
                if (typeof list === "object") {
                    this.content[i] = list;
                }
                else {
                    this.content[i] = new TextMessageContent(list);
                }
            }
        }
        else if (typeof message === "string") {
            this.content[0] = new TextMessageContent(message);
        }
        else if (typeof message === "object") {
            // Object
            this.content[0] = message;
        }
    }
    return TextMessageObject;
}());
