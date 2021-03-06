const stringifyAttr = require('../template-compiler/compiler').stringifyAttr
const type = require('./type')

function stringifyAttrs (attrs) {
  let result = ''
  Object.keys(attrs).forEach(function (name) {
    result += ' ' + name
    let value = attrs[name]
    if (value != null && value !== '' && value !== true) {
      result += '=' + stringifyAttr(value)
    }
  })
  return result
}

function genComponentTag (part, processor = {}) {
  // normalize
  if (type(processor) === 'Function') {
    processor = {
      content: processor
    }
  }
  const tag = processor.tag ? processor.tag(part) : part.type
  const attrs = processor.attrs ? processor.attrs(part) : part.attrs
  const content = processor.content ? processor.content(part) : part.content
  let result = ''
  if (tag) {
    result += `<${tag}`
    if (attrs) {
      result += stringifyAttrs(attrs)
    }
    if (content) {
      result += `>${content}</${tag}>`
    } else {
      result += '/>'
    }
  }
  return result
}

module.exports = genComponentTag
