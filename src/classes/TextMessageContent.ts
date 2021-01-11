const showdown = require('showdown')

class TextMessageContent implements MessageContent {
  ascii?: string
  utf8?: string
  html?: string
  markdown?: string
  markdown_whatsapp?: string
  vendor?: {[index: string]: object | TextMessageContent}

  markdownConverter = new showdown.Converter()

  // Generates a TextMessageContent
  constructor(message: string, options?: {initialFormat?:string}){
    this.utf8 = message
    switch (options?.initialFormat){
      case "ascii":
        this.ascii = message
      case "html":
        this.html = message
        // TODO: Add HTML to Markdown converter
      case "markdown":
        this.markdown = message
        this.markdown_whatsapp = this.convertMarkdownToWhatsapp(message)
        this.html = this.convertMarkdownToHTML(message)
    }
  }

  /**
   * Generates HTML code from Markdown
   * 
   * @param markdown Markdown string to be converted
   */
  convertMarkdownToHTML(markdown: string){
    return this.markdownConverter.makeHtml(markdown)
  }

  /**
   * Generates a WhatsApp and Telegram-compatible Markdown format, which differs from other Markdown specification such as CommonMark and GitHub-Flavored Markdown (GFM)
   * 
   * @param markdown Markdown string to be converted
   */
  convertMarkdownToWhatsapp(markdown: string){
    // WhatsApp-flavored Markdown only uses _..._ for italic text, instead of *...*global.fetch = require('node-fetch');
    // Convert them to _..._ first to avoid with *...* (for bold text)
    markdown.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/, "_$1_")
    
    // Replace **...** (bold) to *...*
    markdown.replace(/\*\*(.+?)\*\*/, "*$1*")
    
    // Replace ~~...~~ (strikethrough) to ~...~
    markdown.replace(/~~(.+?)~~/, "~$1~")

    // Replace `...` (code block) to ```...```
    markdown.replace(/(?<!``)`([^`\n]+)`(?!``)/, "```$1```")

    markdown = this.convertCheckboxGFMToUnicode(markdown)
    return markdown
  }

  /**
   * Generates common Markdown-formatted strings from ones from WhatsApp and Telegram
   * 
   * @param markdown WhatsApp-based markdown string to be converted
   */
  convertWhatsappToMarkdown(markdown: string){
    // Replace *...* (bold) to **...** to avoid confusion with italics
    markdown.replace(/\*(.+?)\*/, "**$1**")

    // Replace ~...~ (strikethrough) to ~~...~~
    markdown.replace(/~(.+?)~/, "~~$1~~")

    return markdown
  }

  /**
   * Convert GitHub-Flavored Markdown (GFM) checkboxes "Task List Items" to Unicode emojis
   * 
   * @param markdown Markdown string to be converted
   */
  convertCheckboxGFMToUnicode(markdown: string){
    markdown.replace(/^(\s*)- \[x\]/, "$1☑️")
    markdown.replace(/^(\s*)- \[ \]/, "$1🔲")
    return markdown
  }

  /**
   * Convert Unicode emojis generated from convertCheckboxGFMToUnicode() to original, GFM-based "Task Item List" syntax
   * 
   * @param markdown Markdown string to be converted
   */
  convertCheckboxUnicodeToGFM(markdown: string){
    markdown.replace(/^(\s*)☑️/, "$1- [x]")
    markdown.replace(/^(\s*)🔲/, "$1- [ ]")
    return markdown
  }
}