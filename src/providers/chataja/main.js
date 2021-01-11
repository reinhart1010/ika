"use strict";
var ChatAjaServiceProvider = /** @class */ (function () {
    function ChatAjaServiceProvider(options) {
        this.apiUrl = 'https://api.chataja.co.id/api/v1/chat/conversations/';
        this.options = options;
    }
    ChatAjaServiceProvider.prototype.getProviderName = function () {
        return "ChatAja";
    };
    ChatAjaServiceProvider.prototype.getProviderRDN = function () {
        return "id.chataja";
    };
    ChatAjaServiceProvider.prototype.getSupportedOutgoingMessageTypes = function () {
        return {
            text: true
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
