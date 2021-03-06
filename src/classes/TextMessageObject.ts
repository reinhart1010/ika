class TextMessageObject implements MessageObject {
  type = "text";
  content: Array<TextMessageContent>;
  // options: TextMessageOptions;

  // The `content` of a text message may contain either a string (treated as a UTF-8 encoded text), a `TextMessageContent` object, or an array of string and/or `TextMessageContent`.
  constructor(message: undefined | string | object | TextMessageContent | {vendor?: {[index: string]: object | TextMessageContent}} | Array<string | TextMessageContent | {vendor?: {[index: string]: object | TextMessageContent}}>){
    this.content = [];
    // Directly pass the TextMessageContent
    if (typeof message === "undefined") return;
    // If the content is an Array, then parse each contents first returning an array of TextMessageContent
    else if (message instanceof Array){
      let i: number;
      for (i = 0; i < message.length; i++){
        let list: string | {vendor?: {[index: string]: object | TextMessageContent}} | TextMessageContent = message[i]
        if (typeof list === "object") {
          this.content[i] = list as TextMessageContent;
        } else {
          this.content[i] = new TextMessageContent(list as string);
        }
      }
    // If the content is a String, create a new TextMessageContent containing that string
    } else if (typeof message === "string") {
      this.content[0] = new TextMessageContent(message);
    // If the content is a Object, use that as a TextMessageContent
    } else if (typeof message === "object") {
      // Object
      this.content[0] = message as TextMessageContent;
    }
  }
}