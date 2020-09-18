class ChatAjaServiceProvider implements ServiceProvider {
  private apiUrl = 'https://api.chataja.co.id/api/v1/chat/conversations/';
  private options: object;

  constructor(options: object){
    this.options = options
  }

  getProviderName(){
    return "ChatAja"
  }
  
  getProviderRDN(){
    return "id.chataja"
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

module.exports = ChatAjaServiceProvider