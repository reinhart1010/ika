interface MessageObject extends Object {
  type: string
  content: MessageContent | Array<MessageContent>
  options?: object
}

