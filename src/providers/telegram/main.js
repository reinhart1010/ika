"use strict";
var TelegramServiceProvider = /** @class */ (function () {
    function TelegramServiceProvider(options) {
    }
    TelegramServiceProvider.prototype.getProviderName = function () {
        return "Telegram";
    };
    TelegramServiceProvider.prototype.getProviderRDN = function () {
        return "org.telegram.messenger";
    };
    TelegramServiceProvider.prototype.getSupportedOutgoingMessageTypes = function () {
        return {
            text: true
        };
    };
    TelegramServiceProvider.prototype.getPreferredMessageType = function (message) {
        // For easier processing, non-array content will be modified into a single-value array
        if (!Array.isArray(message.content))
            message.content = [message.content];
        var i;
        var preferred;
        var content;
        content = message.content;
        for (i = 0; i < message.content.length; i++) {
            // If the text message contains vendor-specific format, use that instead
            if ("vendor" in message.content[i] && "org.telegram.messenger" in message.content[i].vendor) {
                message.content[i] = message.content[i].vendor["org.telegram.messenger"];
            }
            // Telegram supports basic text message with WhatsApp-like "MarkdownV2" format
            if ("markdown_whatsapp" in message.content[i]) {
                message.content[i] = { markdown_whatsapp: message.content[i].markdown_whatsapp };
            }
        }
        return message;
    };
    return TelegramServiceProvider;
}());
module.exports = TelegramServiceProvider;
