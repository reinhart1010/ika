class TextMessageObject implements MessageObject {
  type = "text";
  content: TextMessageContent | Array<TextMessageContent>;

  // The `content` of a text message may contain either a string (treated as a UTF-8 encoded text), a `TextMessageContent` object, or an array of string and/or `TextMessageContent`.
  constructor(message: string | TextMessageContent | object | Array<string | TextMessageContent | object>){
    // Directly pass the TextMessageContent
    if (message instanceof Array){
      this.content = [];
      let i: number;
      for (i = 0; i < message.length; i++){
        let list: string | object | TextMessageContent = message[i]
        if (list instanceof TextMessageContent) {
          this.content[i] = message[i] as TextMessageContent;
        } else {
          this.content[i] = new TextMessageContent(message[i] as string);
        }
        
      }
    } else if (typeof message === "string") {
      this.content = new TextMessageContent(message);
    } else {
      // Object
      this.content = message as TextMessageContent;
    }
  }
}