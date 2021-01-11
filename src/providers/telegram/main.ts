class TelegramServiceProvider implements ServiceProvider {
  constructor(options: object){

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
    }
    
    return message;
  }
}

module.exports = TelegramServiceProvider