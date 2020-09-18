interface MessageObject {
  type: string
  content: MessageContent | Array<MessageContent>
  options?: object
}

