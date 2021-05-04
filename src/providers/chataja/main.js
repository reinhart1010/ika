"use strict";
var ChatAjaServiceProvider = /** @class */ (function () {
    function ChatAjaServiceProvider(options) {
        this.apiUrl = 'https://api.chataja.co.id/api/v1/chat/conversations/';
        this.options = options;
    }
    ChatAjaServiceProvider.prototype.getServiceName = function () {
        return "ChatAja";
    };
    ChatAjaServiceProvider.prototype.getServiceRDN = function () {
        return "id.chataja";
    };
    ChatAjaServiceProvider.prototype.getProviderName = function () {
        return "ChatAja";
    };
    ChatAjaServiceProvider.prototype.getProviderRDN = function () {
        return "id.chataja";
    };
    ChatAjaServiceProvider.prototype.getSupportedIncomingMessageTypes = function () {
        return {
            text: ["utf8"]
        };
    };
    ChatAjaServiceProvider.prototype.getSupportedOutgoingMessageTypes = function () {
        return {
            text: ["utf8", "ascii"]
        };
    };
    ChatAjaServiceProvider.prototype.getPreferredMessageType = function (message) {
        // For easier processing, non-array content will be modified into a single-value array
        if (!Array.isArray(message.content))
            message.content = [message.content];
        var i;
        return message;
    };
    return ChatAjaServiceProvider;
}());
module.exports = ChatAjaServiceProvider;
