interface ServiceProvider extends Object {
  /* SETTERS */
  // Set the name of the bot


  /* GETTERS */
  // Retrieves the name of the service
  getServiceName(): string

  // Retrieves the RDN (Reverse Domain Notation) name of the service
  getServiceRDN(): string

  // Retrieves the name of the service provider, if the ServiceProvider relies on another library
  getProviderName(): string

  // Retrieves the RDN (Reverse Domain Notation) name of the service provider, if the ServiceProvider relies on another library
  getProviderRDN(): string

  // Retrieves the supported received message types
  getSupportedIncomingMessageTypes(): object

  // Retrieves the supported message types for sending
  getSupportedOutgoingMessageTypes(): object

  // Retrieves the preferred message type for a given MessageObject
  getPreferredMessageType(message: MessageObject): MessageObject
}