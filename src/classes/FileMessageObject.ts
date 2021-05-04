class FileMessageObject implements MessageObject {
  type = "file";
  content: Array<FileMessageContent>;
  // options: TextMessageOptions;

  // The `content` of a file may contain a `FileMessageContent` object, or an array of `FileMessageContent`.
  constructor(message: undefined | object | FileMessageContent | {vendor?: {[index: string]: object | FileMessageContent}} | Array<FileMessageContent | {vendor?: {[index: string]: object | FileMessageContent}}>){
    this.content = [];
    // Directly pass the TextMessageContent
    if (typeof message === "undefined") return;
    // If the content is an Array, then parse each contents first returning an array of TextMessageContent
    else if (message instanceof Array){
      let i: number;
      for (i = 0; i < message.length; i++){
        let list: string | {vendor?: {[index: string]: object | FileMessageContent}} | FileMessageContent = message[i]
        if (typeof list === "object") {
          this.content[i] = list as FileMessageContent;
        } else {
          this.content[i] = new FileMessageContent(list as string);
        }
      }
    // If the content is a String, create a new TextMessageContent containing that string
    } else if (typeof message === "string") {
      this.content[0] = new FileMessageContent(message);
    // If the content is a Object, use that as a TextMessageContent
    } else if (typeof message === "object") {
      // Object
      this.content[0] = message as FileMessageContent;
    }
  }
}