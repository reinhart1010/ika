interface ServiceProvider extends Object {
  /* SETTERS */
  // Set the name of the bot


  /* GETTERS */
  // Retrieves the name of the service provider
  getProviderName(): string

  // Retrieves the RDN (Reverse Domain Notation) name of the service provider
  getProviderRDN(): string

  // Retrieves the supported message types for sending
  getSupportedOutgoingMessageTypes(): object

  // Retrieves the preferred message type for a given MessageObject
  getPreferredMessageType(message: MessageObject): MessageObject
}