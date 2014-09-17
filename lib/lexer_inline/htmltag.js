// Process html tags

'use strict';


var HTML_TAG_RE = require('../common/html_re').HTML_TAG_RE;


function isLetter(ch) {
  /*eslint no-bitwise:0*/
  var lc = ch | 0x20; // to lower case
  return (lc >= 0x61/* a */) && (lc <= 0x7a/* z */);
}


module.exports = function htmltag(state) {
  var ch, match, max, pos = state.pos;

  if (!state.options.html) { return false; }

  // Check start
  max = state.posMax;
  if (state.src.charCodeAt(pos) !== 0x3C/* < */ ||
      pos + 2 >= max) {
    return false;
  }

  // Quick fail on second char
  ch = state.src.charCodeAt(pos + 1);
  if (ch !== 0x21/* ! */ &&
      ch !== 0x3F/* ? */ &&
      ch !== 0x2F/* / */ &&
      !isLetter(ch)) {
    return false;
  }
//  console.log(HTML_TAG_RE)

  match = state.src.slice(pos).match(HTML_TAG_RE);
  if (!match) { return false; }

//  console.log('--------')
//  console.log(state.src.slice(pos))
//  console.log(match)

  state.push({
    type: 'htmltag',
    content: state.src.slice(pos, pos + match[0].length)
  });
//console.log(state.tokens)
  state.pos += match[0].length;
  return true;
};