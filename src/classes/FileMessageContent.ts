import { exception } from "console"

const http = require('http')
const imageType = require('image-type')
const validUrl = require('valid-url')

class FileMessageContent implements MessageContent {
  alt?: TextMessageContent
  file?: Buffer
  url?: string
  options?: {encoding?:string, httpMethod?:string, httpHeaders?:object, httpBody?:object, httpExpectedStatus:number}

  constructor(file: Buffer | string, options?: {encoding?:string, httpMethod?:string, httpHeaders?:object, httpBody?:object, httpExpectedStatus:number}){
    // If the input file is a Buffer, use them as is
    if (file instanceof Buffer) this.file = file
    // If the input file is a string, check whether it's an URLor a file
    else if (typeof file == "string"){
      if (validUrl.isUri(file)){
        // URI
        this.url = file
      } else {
        throw exception("Invalid URL")
      }
    }
  }
}