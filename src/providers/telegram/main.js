"use strict";
var TelegramServiceProvider = /** @class */ (function () {
    function TelegramServiceProvider(options) {
        this.token = "";
        this.token = options.token;
    }
    TelegramServiceProvider.prototype.getServiceName = function () {
        return "Telegram";
    };
    TelegramServiceProvider.prototype.getServiceRDN = function () {
        return "org.telegram.messenger";
    };
    TelegramServiceProvider.prototype.getProviderName = function () {
        return "Telegraf";
    };
    TelegramServiceProvider.prototype.getProviderRDN = function () {
        return "org.js.telegraf";
    };
    TelegramServiceProvider.prototype.getSupportedIncomingMessageTypes = function () {
        return {
            sticker: ["webp", "img", "vendor.animated"],
            text: ["utf8"],
        };
    };
    TelegramServiceProvider.prototype.getSupportedOutgoingMessageTypes = function () {
        return {
            text: ["markdown_whatsapp", "markdown", "utf8", "ascii"],
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
            // Alternatively, try to convert a common Markdown-formatted text message
            else if ("markdown" in message.content[i]) {
                message.content[i] = { markdown: message.content[i].convertMarkdownToWhatsapp(message.content[i].markdown) };
            }
            // Alternatively, use raw HTML
            else if ("html" in message.content[i]) {
                message.content[i] = { html: message.content[i].html };
            }
            // Alternatively, use UTF-8
            else if ("utf8" in message.content[i]) {
                message.content[i] = { utf8: message.content[i].utf8 };
            }
            // Alternatively, directly convert ASCII to UTF-8
            else if ("ascii" in message.content[i]) {
                message.content[i] = { utf8: message.content[i].ascii };
            }
            else {
                message.content[i] = {};
            }
        }
        return message;
    };
    return TelegramServiceProvider;
}());
module.exports = TelegramServiceProvider;
