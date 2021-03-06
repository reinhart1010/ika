"use strict";
var TextMessageObject = /** @class */ (function () {
    // options: TextMessageOptions;
    // The `content` of a text message may contain either a string (treated as a UTF-8 encoded text), a `TextMessageContent` object, or an array of string and/or `TextMessageContent`.
    function TextMessageObject(message) {
        this.type = "text";
        this.content = [];
        // Directly pass the TextMessageContent
        if (typeof message === "undefined")
            return;
        // If the content is an Array, then parse each contents first returning an array of TextMessageContent
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
            // If the content is a String, create a new TextMessageContent containing that string
        }
        else if (typeof message === "string") {
            this.content[0] = new TextMessageContent(message);
            // If the content is a Object, use that as a TextMessageContent
        }
        else if (typeof message === "object") {
            // Object
            this.content[0] = message;
        }
    }
    return TextMessageObject;
}());
