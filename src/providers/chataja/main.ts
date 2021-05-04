class ChatAjaServiceProvider implements ServiceProvider {
  private apiUrl = 'https://api.chataja.co.id/api/v1/chat/conversations/';
  private options: object;

  constructor(options: object){
    this.options = options
  }

  getServiceName(){
    return "ChatAja"
  }

  getServiceRDN(){
    return "id.chataja"
  }

  getProviderName(){
    return "ChatAja"
  }
  
  getProviderRDN(){
    return "id.chataja"
  }

  getSupportedIncomingMessageTypes(){
    return {
      text: ["utf8"]
    }
  }

  getSupportedOutgoingMessageTypes(){
    return {
      text: ["utf8", "ascii"]
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