"use strict";
var FileMessageObject = /** @class */ (function () {
    // options: TextMessageOptions;
    // The `content` of a file may contain a `FileMessageContent` object, or an array of `FileMessageContent`.
    function FileMessageObject(message) {
        this.type = "file";
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
                    this.content[i] = new FileMessageContent(list);
                }
            }
            // If the content is a String, create a new TextMessageContent containing that string
        }
        else if (typeof message === "string") {
            this.content[0] = new FileMessageContent(message);
            // If the content is a Object, use that as a TextMessageContent
        }
        else if (typeof message === "object") {
            // Object
            this.content[0] = message;
        }
    }
    return FileMessageObject;
}());
