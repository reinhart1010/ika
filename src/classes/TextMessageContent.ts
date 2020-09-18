class TextMessageContent implements MessageContent {
  ascii?: string
  utf8: string
  html?: string
  markdown?: string
  markdown_whatsapp?: string
  vendor?: object

  // Generates a TextMessageContent
  constructor(message: string){
    this.utf8 = message
  }


}