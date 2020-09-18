# The MessageObject Specification

`MessageObject` represents the message content

## Primitive Message Types

Ika provides a set of primitive message types


| Attribute | Values | Description |
|--|--|--|
| `type` | `"text"`, `"image"`, `"sticker"`, `"voice"`, `"audio"`, `"video"`, `"file"`, `"input"` | **Required.** This attribute identifies the type of the message. |
| `content` | Must be either a string (on supported message types), a `MessageContent` object, or an array (containing strings and/or `MessageContent`) | **Required.** This attribute identifies that content of the message.<ul><li>The specification for each `MessageContent` object differs between message types.</li><li>All contents located inside the array will be considered as **chained messages**, which will be sent individually before the `nextMessage`.</li> |
| `options` | Accepts a `MessageOptions` object | This attribute specifies the options for a specific `MessageContent`
| `nextMessage` | Accepts a `MessageObject` | This attribute assign the next message to be sent. This allows multiple messages to be chained.<ul><li>Chained messages will be sent first before the message item set on the `nextMessage`</li></ul> |

### Text Message

To declare a text message, create a `MessageObject` with the `type` set to `"text"`.

```
{
  type: "text",
  content: "Hello, World!"
}
```

The `content` of a text message may contain either a string (treated as a UTF-8 encoded text), a `TextMessageContent` (subclass of `MessageContent`), or an array of string and/or `TextMessageContent` as shown on the examples below.

```
{
  type: "text",
  content: [
    "I'm fine",
    "Thank you",
    "How about you?"
  ]
}
```

```
{
  type: "text",
  content: {
    "ascii": "Visit our website: https://github.com/reinhart1010/ika",
    "utf8": "Visit our website 👉 https://github.com/reinhart1010/ika"
  }
}
```

```
{
  type: "text",
  content: [
    {
      ascii: "I'm smiling :)",
      utf8: "I'm smiling 😊",
      markdown: "**I'm smiling 😊**",
      markdown_whatsapp: "*I'm smiling 😊*"
      vendor: {
        "jp.naver.line": {
          text: "I'm smiling $",
          emojis: [
            {
              index: 12,
              productId: "5ac1bfd5040ab15980c9b435",
              emojiId: "002"
            }
          ]
        }
      }
    },
    "How do you do?"
  ]
}
```

| Attribute | Values | Description |
|--|--|--|
| `ascii` | An ASCII-compatible string | **Either `ascii` or `utf8` is required.** Provides an ASCII-compatible text message. |
| `utf8` | A string | **Either `ascii` or `utf8` is required.** Provides an UTF-8 (default) text message. |
| `markdown` | A markdown-encoded string | Provides an inline Markdown-encoded (generally [CommonMark](https://commonmark.org/) or [Github-Flavored Markdown](https://guides.github.com/features/mastering-markdown/)) text message to allow limited rich-text rendering (e.g. on Discord). |
| `markdown_whatsapp` | A WhatsApp-based markdown-encoded string | Provides a text message encoded with a special markdown syntax, originally used for WhatsApp. See https://faq.whatsapp.com/general/chats/how-to-format-your-messages/ for details. |
| `vendor` | A `VendorTextMessageContent` | Provides a custom text message format for use in specific apps. See **Vendors** for information. |

### Image Message

To declare an image message, create a `MessageObject` with the `type` set to `"image"`.

```
{
  type: "image",
  content: {
    jpeg: {
      type: "file",
      location: "/storage/temp/05a9fce42bef903a.jpg"
    }
  }
}
```

| Attribute | Values | Description |
|--|--|--|
| `jpeg` | A `FileMessageContent` containing a JPEG (`.jpe`, `.jpg`, `.jpeg`) image | Provides a JPEG image containing the sticker. |
| `png` | A `FileMessageContent` containing a PNG image | Provides a PNG image containing the sticker. |
| `webp` | A `FileMessageContent` containing a WEBP image | Provides a WEBP image containing the sticker. |
| `vendor` | A `VendorFileMessageContent` content | Provides a custom image message format for use in specific apps. See **Vendors** for information. |

### Sticker Message

To declare a sticker message, create a `MessageObject` with the `type`**` set to `"sticker"`.

```
{
  type: "sticker",
  content: {
    webp: {
      type: "file",
      location: "/assets/stickers/hi.webp"
    },
    vendor: {
      "jp.naver.line": {
        packageId: 11537,
        stickerId: 52002738
      }
    }
  }
}
```

Since stickers are implemented differently between applications, the `content` of a sticker message should **not** be a string.

| Attribute | Values | Description |
|--|--|--|
| `jpeg` | A `FileMessageContent` containing a JPEG (`.jpe`, `.jpg`, `.jpeg`) image | Provides a JPEG image containing the sticker. |
| `png` | A `FileMessageContent` containing a PNG image | Provides a PNG image containing the sticker. |
| `webp` | A `FileMessageContent` containing a WEBP image | Provides a WEBP image containing the sticker. |
| `vendor` | A `VendorFileMessageContent` content | Provides a custom sticker format for use in specific apps. See **Vendors** for information. |

For compatibility reasons, Ika will try to send WEBP, PNG, or JPEG stickers as images to services which currently do not support inserting stickers. However, you can assign an `ImageMessageOptions` to the `MessageObject` to disable this mechanism.

```
{
  type: "sticker",
  content: {
    webp: {
      type: "file",
      location: "/assets/stickers/shiny-sky.webp"
    }
  },
  options: {
    disableImageFallback: true
  }
}
```

| Attribute | Values | Description |
|--|--|--|
| `disableImageFallback` | A Boolean value: `true` or `false` (default) | Do not send stickers as images to apps which do not support them. |

> **Best Practices for Stickers**
> 
> Since some stickers can be represented as an emoji, it is recommended to set a fallback text message for apps which does not support them.
>
> ```
> // On an EventObject
> {
>   ...
>   message: [
>     {
>       type: "sticker",
>       content: {
>         webp: {
>           type: "file",
>           location: "/assets/stickers/hi.webp"
>         }
>       }
>     },
>     {
>       type: "text",
>       content: {
>         ascii: "Hi...",
>         utf8: "Hi 👋"
>       }
>     }
>   ]
> }
>
>