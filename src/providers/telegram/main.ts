class TelegramServiceProvider implements ServiceProvider {
  constructor(options: object){

  }

  getProviderName(){
    return "Telegram"
  }
  
  getProviderRDN(){
    return "org.telegram"
  }

  getSupportedOutgoingMessageTypes(){
    return {
      text: true
    }
  }

  getPreferredMessageType(message: MessageObject){
    // For easier processing, non-array content will be modified into a single-value array
    if (!Array.isArray(message.content)) message.content = [message.content]
    
    let i: number;
    return message;
  }
}

module.exports = TelegramServiceProvider