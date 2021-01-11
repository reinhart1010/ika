class TelegramServiceProvider implements ServiceProvider {
  token: string = ""

  constructor(options: {token: string}){
    this.token = options.token
  }

  getProviderName(){
    return "Telegram"
  }
  
  getProviderRDN(){
    return "org.telegram.messenger"
  }

  getSupportedOutgoingMessageTypes(){
    return {
      text: true
    }
  }

  getPreferredMessageType(message: TextMessageObject){
    // For easier processing, non-array content will be modified into a single-value array
    if (!Array.isArray(message.content)) message.content = [message.content]
    
    let i: number;
    let preferred: TextMessageContent | object;

    let content: Array<TextMessageContent | object>;
    content = message.content;

    for (i = 0; i < message.content.length; i++){
      // If the text message contains vendor-specific format, use that instead
      if ("vendor" in message.content[i] && "org.telegram.messenger" in message.content[i].vendor!){
        message.content[i] = message.content[i].vendor!["org.telegram.messenger"] as TextMessageContent;
      }
      // Telegram supports basic text message with WhatsApp-like "MarkdownV2" format
      if ("markdown_whatsapp" in message.content[i]){
        message.content[i] = {markdown_whatsapp: message.content[i].markdown_whatsapp} as TextMessageContent
      }
      // Alternatively, try to convert a common Markdown-formatted text message
      else if ("markdown" in message.content[i]){
        message.content[i] = {markdown: message.content[i].convertMarkdownToWhatsapp(message.content[i].markdown!)} as TextMessageContent
      }
      // Alternatively, use raw HTML
      else if ("html" in message.content[i]){
        message.content[i] = {html: message.content[i].html} as TextMessageContent
      }
      // Alternatively, use UTF-8
      else if ("utf8" in message.content[i]){
        message.content[i] = {utf8: message.content[i].utf8} as TextMessageContent
      }
      // Alternatively, directly convert ASCII to UTF-8
      else if ("ascii" in message.content[i]){
        message.content[i] = {utf8: message.content[i].ascii} as TextMessageContent
      }
      else {
        message.content[i] = {} as TextMessageContent
      }
    }
    return message;
  }
  
}

module.exports = TelegramServiceProvider