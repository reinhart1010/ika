"use strict";
var showdown = require('showdown');
var TextMessageContent = /** @class */ (function () {
    // Generates a TextMessageContent
    function TextMessageContent(message, options) {
        this.markdownConverter = new showdown.Converter();
        this.utf8 = message;
        switch (options === null || options === void 0 ? void 0 : options.initialFormat) {
            case "ascii":
                this.ascii = message;
            case "html":
                this.html = message;
            // TODO: Add HTML to Markdown converter
            case "markdown":
                this.markdown = message;
                this.markdown_whatsapp = this.convertMarkdownToWhatsapp(message);
                this.html = this.convertMarkdownToHTML(message);
        }
    }
    /**
     * Generates HTML code from Markdown
     *
     * @param markdown Markdown string to be converted
     */
    TextMessageContent.prototype.convertMarkdownToHTML = function (markdown) {
        return this.markdownConverter.makeHtml(markdown);
    };
    /**
     * Generates a WhatsApp and Telegram-compatible Markdown format, which differs from other Markdown specification such as CommonMark and GitHub-Flavored Markdown (GFM)
     *
     * @param markdown Markdown string to be converted
     */
    TextMessageContent.prototype.convertMarkdownToWhatsapp = function (markdown) {
        // WhatsApp-flavored Markdown only uses _..._ for italic text, instead of *...*global.fetch = require('node-fetch');
        // Convert them to _..._ first to avoid with *...* (for bold text)
        markdown.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/, "_$1_");
        // Replace **...** (bold) to *...*
        markdown.replace(/\*\*(.+?)\*\*/, "*$1*");
        // Replace ~~...~~ (strikethrough) to ~...~
        markdown.replace(/~~(.+?)\~~/, "~$1~");
        // Replace `...` (code block) to ```...```
        markdown.replace(/(?<!``)`([^`\n]+)`(?!``)/, "```$1```");
        markdown = this.convertCheckboxGFMToUnicode(markdown);
        return markdown;
    };
    /**
     * Convert GitHub-Flavored Markdown (GFM) checkboxes "Task List Items" to Unicode emojis
     *
     * @param markdown Markdown string to be converted
     */
    TextMessageContent.prototype.convertCheckboxGFMToUnicode = function (markdown) {
        markdown.replace(/^(\s*)- \[x\]/, "$1☑️");
        markdown.replace(/^(\s*)- \[ \]/, "$1🔲");
        return markdown;
    };
    /**
     * Convert Unicode emojis generated from convertCheckboxGFMToUnicode() to original, GFM-based "Task Item List" syntax
     *
     * @param markdown Markdown string to be converted
     */
    TextMessageContent.prototype.convertCheckboxUnicodeToGFM = function (markdown) {
        markdown.replace(/^(\s*)☑️/, "$1- [x]");
        markdown.replace(/^(\s*)🔲/, "$1- [ ]");
        return markdown;
    };
    return TextMessageContent;
}());
