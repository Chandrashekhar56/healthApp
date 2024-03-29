/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable radix */
/* eslint-disable one-var */
/* eslint-disable no-underscore-dangle */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-bitwise */
/* eslint-disable eqeqeq */
/* eslint-disable no-throw-literal */
/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable strict */
/* eslint-disable lines-around-directive */
/* eslint-disable spaced-comment */
// ASN.1 JavaScript decoder
// Copyright (c) 2008-2014 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
/*global oids */
(function() {
    "use strict";
    function Stream(enc, pos) {
      if (enc instanceof Stream) {
        this.enc = enc.enc;
        this.pos = enc.pos;
      } else {
        this.enc = enc;
        this.pos = pos;
      }
    }
    Stream.prototype.get = function(pos) {
      if (pos == undefined) pos = this.pos++;
      if (pos >= this.enc.length) throw "Requesting byte offset " + pos + " on a stream of length " + this.enc.length;
      return this.enc[pos];
    };
    Stream.prototype.hexDigits = "0123456789ABCDEF";
    Stream.prototype.hexByte = function(b) {
      return this.hexDigits.charAt((b >> 4) & 0xf) + this.hexDigits.charAt(b & 0xf);
    };
    Stream.prototype.hexDump = function(start, end) {
      var s = "";
      for (var i = start; i < end; ++i) {
        s += this.hexByte(this.get(i));
        switch (i & 0xf) {
          case 0x7:
            s += "  ";
            break;
          case 0xf:
            s += "\n";
            break;
          default:
            s += " ";
        }
      }
      return s;
    };
    Stream.prototype.parseStringISO = function(start, end) {
      var s = "";
      for (var i = start; i < end; ++i)
        s += String.fromCharCode(this.get(i));
      return s;
    };
    Stream.prototype.parseStringUTF = function(start, end) {
      var s = "";
      for (var i = start; i < end; ) {
        var _c = this.get(i++);
        if (_c < 128) s += String.fromCharCode(_c);
        else if (_c > 191 && _c < 224) s += String.fromCharCode(((_c & 0x1f) << 6) | (this.get(i++) & 0x3f));
        else s += String.fromCharCode(((_c & 0x0f) << 12) | ((this.get(i++) & 0x3f) << 6) | (this.get(i++) & 0x3f));
        //TODO: this doesn't check properly 'end', some char could begin before and end after
      }
      return s;
    };
    Stream.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
    Stream.prototype.parseTime = function(start, end) {
      var s = this.parseStringISO(start, end);
      var m = this.reTime.exec(s);
      if (!m) return "Unrecognized time: " + s;
      s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
      if (m[5]) {
        s += ":" + m[5];
        if (m[6]) {
          s += ":" + m[6];
          if (m[7]) s += "." + m[7];
        }
      }
      if (m[8]) {
        s += " UTC";
        if (m[8] != "Z") {
          s += m[8];
          if (m[9]) s += ":" + m[9];
        }
      }
      return s;
    };
    Stream.prototype.parseInteger = function(start, end) {
      //TODO support negative numbers
      var len = end - start;
      if (len > 4) {
        len <<= 3;
        var s = this.get(start);
        if (s == 0) len -= 8;
        else
          while (s < 128) {
            s <<= 1;
            --len;
          }
        return "(" + len + " bit)";
      }
      var n = 0;
      for (var i = start; i < end; ++i)
        n = (n << 8) | this.get(i);
      return n;
    };
    Stream.prototype.parseBitString = function(start, end) {
      var unusedBit = this.get(start);
      var lenBit = ((end - start - 1) << 3) - unusedBit;
      var s = "(" + lenBit + " bit)";
      if (lenBit <= 20) {
        var skip = unusedBit;
        s += " ";
        for (var i = end - 1; i > start; --i) {
          var b = this.get(i);
          for (var j = skip; j < 8; ++j)
            s += (b >> j) & 1 ? "1" : "0";
          skip = 0;
        }
      }
      return s;
    };
    Stream.prototype.parseOctetString = function(start, end) {
      var len = end - start;
      var s = "(" + len + " byte) ";
      if (len > 20) end = start + 20;
      for (var i = start; i < end; ++i)
        s += this.hexByte(this.get(i));
      if (len > 20) s += String.fromCharCode(8230); // ellipsis
      return s;
    };
    Stream.prototype.parseOID = function(start, end) {
      var s, n = 0, bits = 0;
      for (var i = start; i < end; ++i) {
        var v = this.get(i);
        n = (n << 7) | (v & 0x7f);
        bits += 7;
        if (!(v & 0x80)) {
          // finished
          if (s == undefined) s = parseInt(n / 40) + "." + n % 40;
          else s += "." + (bits >= 31 ? "bigint" : n);
          n = bits = 0;
        }
        s += String.fromCharCode();
      }
      return s;
    };
  
    Stream.prototype.parseStringHex = function(start, end) {
      if (typeof end == "undefined") end = this.enc.length;
      var s = "";
      for (var i = start; i < end; ++i) {
        var h = this.get(i);
        s += this.hexDigits.charAt(h >> 4) + this.hexDigits.charAt(h & 0xf);
      }
      return s;
    };
  
    function ASN1(stream, header, length, tag, sub) {
      this.stream = stream;
      this.header = header;
      this.length = length;
      this.tag = tag;
      this.sub = sub;
    }
  
    ASN1.prototype.toHexTree = function() {
      var node = {};
      node.type = this.typeName();
      if (node.type != "SEQUENCE") node.value = this.stream.parseStringHex(this.posContent(), this.posEnd());
      if (this.sub != null) {
        node.sub = [];
        for (var i = 0, max = this.sub.length; i < max; ++i)
          node.sub[i] = this.sub[i].toHexTree();
      }
      return node;
    };
  
    ASN1.prototype.typeName = function() {
      if (this.tag == undefined) return "unknown";
      var tagClass = this.tag >> 6;
      //var tagConstructed = (this.tag >> 5) & 1;
      var tagNumber = this.tag & 0x1f;
      switch (tagClass) {
        case 0: // universal
          switch (tagNumber) {
            case 0x00:
              return "EOC";
            case 0x01:
              return "BOOLEAN";
            case 0x02:
              return "INTEGER";
            case 0x03:
              return "BIT_STRING";
            case 0x04:
              return "OCTET_STRING";
            case 0x05:
              return "NULL";
            case 0x06:
              return "OBJECT_IDENTIFIER";
            case 0x07:
              return "ObjectDescriptor";
            case 0x08:
              return "EXTERNAL";
            case 0x09:
              return "REAL";
            case 0x0a:
              return "ENUMERATED";
            case 0x0b:
              return "EMBEDDED_PDV";
            case 0x0c:
              return "UTF8String";
            case 0x10:
              return "SEQUENCE";
            case 0x11:
              return "SET";
            case 0x12:
              return "NumericString";
            case 0x13:
              return "PrintableString"; // ASCII subset
            case 0x14:
              return "TeletexString"; // aka T61String
            case 0x15:
              return "VideotexString";
            case 0x16:
              return "IA5String"; // ASCII
            case 0x17:
              return "UTCTime";
            case 0x18:
              return "GeneralizedTime";
            case 0x19:
              return "GraphicString";
            case 0x1a:
              return "VisibleString"; // ASCII subset
            case 0x1b:
              return "GeneralString";
            case 0x1c:
              return "UniversalString";
            case 0x1e:
              return "BMPString";
            default:
              return "Universal_" + tagNumber.toString(16);
          }
        case 1:
          return "Application_" + tagNumber.toString(16);
        case 2:
          return "[" + tagNumber + "]"; // Context
        case 3:
          return "Private_" + tagNumber.toString(16);
      }
    };
    ASN1.prototype.content = function() {
      if (this.tag == undefined) return null;
      var tagClass = this.tag >> 6;
      if (
        tagClass != 0 // universal
      )
        return this.sub == null ? null : "(" + this.sub.length + ")";
      var tagNumber = this.tag & 0x1f;
      var content = this.posContent();
      var len = Math.abs(this.length);
      switch (tagNumber) {
        case 0x01: // BOOLEAN
          return this.stream.get(content) == 0 ? "false" : "true";
        case 0x02: // INTEGER
          return this.stream.parseInteger(content, content + len);
        case 0x03: // BIT_STRING
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(content, content + len);
        case 0x04: // OCTET_STRING
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(content, content + len);
        //case 0x05: // NULL
        case 0x06: // OBJECT_IDENTIFIER
          return this.stream.parseOID(content, content + len);
        //case 0x07: // ObjectDescriptor
        //case 0x08: // EXTERNAL
        //case 0x09: // REAL
        //case 0x0A: // ENUMERATED
        //case 0x0B: // EMBEDDED_PDV
        case 0x10: // SEQUENCE
        case 0x11: // SET
          return "(" + this.sub.length + " elem)";
        case 0x0c: // UTF8String
          return this.stream.parseStringUTF(content, content + len);
        case 0x12: // NumericString
        case 0x13: // PrintableString
        case 0x14: // TeletexString
        case 0x15: // VideotexString
        case 0x16: // IA5String
        //case 0x19: // GraphicString
        case 0x1a: // VisibleString
          //case 0x1B: // GeneralString
          //case 0x1C: // UniversalString
          //case 0x1E: // BMPString
          return this.stream.parseStringISO(content, content + len);
        case 0x17: // UTCTime
        case 0x18: // GeneralizedTime
          return this.stream.parseTime(content, content + len);
      }
      return null;
    };
    ASN1.prototype.toString = function() {
      return (
        this.typeName() +
        "@" +
        this.stream.pos +
        "[header:" +
        this.header +
        ",length:" +
        this.length +
        ",sub:" +
        (this.sub == null ? "null" : this.sub.length) +
        "]"
      );
    };
    ASN1.prototype.print = function(indent) {
      if (indent == undefined) indent = "";
      document.writeln(indent + this);
      if (this.sub != null) {
        indent += "  ";
        for (var i = 0, max = this.sub.length; i < max; ++i)
          this.sub[i].print(indent);
      }
    };
    ASN1.prototype.toPrettyString = function(indent) {
      if (indent == undefined) indent = "";
      var s = indent + this.typeName() + " @" + this.stream.pos;
      if (this.length > 0 || this.length === 0) {
        s += '+';
      } 
      s += this.length;
      if (this.tag & 0x20) s += " (constructed)";
      else if ((this.tag == 0x03 || this.tag == 0x04) && this.sub != null) s += " (encapsulates)";
      s += "\n";
      if (this.sub != null) {
        indent += "  ";
        for (var i = 0, max = this.sub.length; i < max; ++i)
          s += this.sub[i].toPrettyString(indent);
      }
      return s;
    };
    ASN1.prototype.toDOM = function() {
      var node = document.createElement("div");
      node.className = "node";
      node.asn1 = this;
      var head = document.createElement("div");
      head.className = "head";
      var s = this.typeName().replace(/_/g, " ");
      head.innerHTML = s;
      var content = this.content();
      if (content != null) {
        content = String(content).replace(/</g, "&lt;");
        var preview = document.createElement("span");
        preview.className = "preview";
        preview.innerHTML = content;
        head.appendChild(preview);
      }
      node.appendChild(head);
      this.node = node;
      this.head = head;
      var value = document.createElement("div");
      value.className = "value";
      s = "Offset: " + this.stream.pos + "<br/>";
      s += "Length: " + this.header + "+";
      if (this.length > 0) { 
        s += this.length;
      } else if (this.length === 0) {
        s += this.length;
      } 
      else s += -this.length + " (undefined)";
      if (this.tag & 0x20) s += "<br/>(constructed)";
      else if ((this.tag == 0x03 || this.tag == 0x04) && this.sub != null) s += "<br/>(encapsulates)";
      //TODO if (this.tag == 0x03) s += "Unused bits: "
      if (content != null) {
        s += "<br/>Value:<br/><b>" + content + "</b>";
        if (typeof oids == "object" && this.tag == 0x06) {
          var oid = oids[content];
          if (oid) {
            if (oid.d) s += "<br/>" + oid.d;
            if (oid.c) s += "<br/>" + oid.c;
            if (oid.w) s += "<br/>(warning!)";
          }
        }
      }
      value.innerHTML = s;
      node.appendChild(value);
      var sub = document.createElement("div");
      sub.className = "sub";
      if (this.sub != null) {
        for (var i = 0, max = this.sub.length; i < max; ++i)
          sub.appendChild(this.sub[i].toDOM());
      }
      node.appendChild(sub);
      head.switchNode = node;
      head.onclick = function() {
        var _node = this.switchNode;
        _node.className = _node.className == "node collapsed" ? "node" : "node collapsed";
      };
      return node;
    };
  
    ASN1.prototype.posStart = function() {
      return this.stream.pos;
    };
    ASN1.prototype.posContent = function() {
      return this.stream.pos + this.header;
    };
    ASN1.prototype.posEnd = function() {
      return this.stream.pos + this.header + Math.abs(this.length);
    };
    ASN1.prototype.fakeHover = function(current) {
      this.node.className += " hover";
      if (current) this.head.className += " hover";
    };
    ASN1.prototype.fakeOut = function(current) {
      var re = / ?hover/;
      this.node.className = this.node.className.replace(re, "");
      if (current) this.head.className = this.head.className.replace(re, "");
    };
    ASN1.prototype.toHexDOM_sub = function(node, className, stream, start, end) {
      if (start >= end) return;
      var sub = document.createElement("span");
      sub.className = className;
      sub.appendChild(document.createTextNode(stream.hexDump(start, end)));
      node.appendChild(sub);
    };
    ASN1.prototype.toHexDOM = function(root) {
      var node = document.createElement("span");
      node.className = "hex";
      if (root == undefined) root = node;
      this.head.hexNode = node;
      this.head.onmouseover = function() {
        this.hexNode.className = "hexCurrent";
      };
      this.head.onmouseout = function() {
        this.hexNode.className = "hex";
      };
      node.asn1 = this;
      node.onmouseover = function() {
        var current = !root.selected;
        if (current) {
          root.selected = this.asn1;
          this.className = "hexCurrent";
        }
        this.asn1.fakeHover(current);
      };
      node.onmouseout = function() {
        var current = root.selected == this.asn1;
        this.asn1.fakeOut(current);
        if (current) {
          root.selected = null;
          this.className = "hex";
        }
      };
      this.toHexDOM_sub(node, "tag", this.stream, this.posStart(), this.posStart() + 1);
      // this.toHexDOM_sub(
      //   node,
      //   this.length >= 0 ? 'dlen' : 'ulen',
      //   this.stream,
      //   this.posStart() + 1,
      //   this.posContent(),
      // );
      let lenValue = 'ulen';
      if (this.length===0 || this.length>0 ) {
        lenValue = 'dlen';
      } 
      
      this.toHexDOM_sub(
        node,
        lenValue,
        this.stream,
        this.posStart() + 1,
        this.posContent(),
      );
      if (this.sub == null)
        node.appendChild(document.createTextNode(this.stream.hexDump(this.posContent(), this.posEnd())));
      else if (this.sub.length > 0) {
        var first = this.sub[0];
        var last = this.sub[this.sub.length - 1];
        this.toHexDOM_sub(node, "intro", this.stream, this.posContent(), first.posStart());
        for (var i = 0, max = this.sub.length; i < max; ++i)
          node.appendChild(this.sub[i].toHexDOM(root));
        this.toHexDOM_sub(node, "outro", this.stream, last.posEnd(), this.posEnd());
      }
      return node;
    };
    ASN1.decodeLength = function(stream) {
      var buf = stream.get();
      var len = buf & 0x7f;
      if (len == buf) return len;
      if (len > 3) throw "Length over 24 bits not supported at position " + (stream.pos - 1);
      if (len == 0) return -1; // undefined
      buf = 0;
      for (var i = 0; i < len; ++i)
        buf = (buf << 8) | stream.get();
      return buf;
    };
    ASN1.hasContent = function(tag, len, stream) {
      if (
        tag & 0x20 // constructed
      )
        return true;
      if (tag < 0x03 || tag > 0x04) return false;
      var p = new Stream(stream);
      if (tag == 0x03) p.get(); // BitString unused bits, must be in [0, 7]
      var subTag = p.get();
      if (
        (subTag >> 6) &
        0x01 // not (universal or context)
      )
        return false;
      try {
        var subLength = ASN1.decodeLength(p);
        return p.pos - stream.pos + subLength == len;
      } catch (exception) {
        return false;
      }
    };
    ASN1.decode = function(stream) {
      if (!(stream instanceof Stream)) stream = new Stream(stream, 0);
      var streamStart = new Stream(stream);
      var tag = stream.get();
      var len = ASN1.decodeLength(stream);
      var header = stream.pos - streamStart.pos;
      var sub = null;
      if (ASN1.hasContent(tag, len, stream)) {
        // it has content, so we decode it
        var start = stream.pos;
        if (tag == 0x03) stream.get(); // skip BitString unused bits, must be in [0, 7]
        sub = [];
        if (len >= 0) {
          // definite length
          var end = start + len;
          while (stream.pos < end)
            sub[sub.length] = ASN1.decode(stream);
          if (stream.pos != end) throw "Content size is not correct for container starting at offset " + start;
        } else {
          // undefined length
          try {
            while(true) {
              var s = ASN1.decode(stream);
              if (s.tag == 0) break;
              sub[sub.length] = s;
            }
            len = start - stream.pos;
          } catch (e) {
            throw "Exception while decoding undefined length content: " + e;
          }
        }
      } else stream.pos += len; // skip content
      return new ASN1(streamStart, header, len, tag, sub);
    };
    ASN1.test = function() {
      var test = [
        { value: [0x27], expected: 0x27 },
        { value: [0x81, 0xc9], expected: 0xc9 },
        { value: [0x83, 0xfe, 0xdc, 0xba], expected: 0xfedcba }
      ];
      for (var i = 0, max = test.length; i < max; ++i) {
        //var pos = 0;
        var stream = new Stream(test[i].value, 0);
        var res = ASN1.decodeLength(stream);
        if (res != test[i].expected)
          document.write("In test[" + i + "] expected " + test[i].expected + " got " + res + "\n");
      }
    };
  
    // export globals
    if (typeof module !== "undefined") {
      module.exports = ASN1;
    } else {
      window.ASN1 = ASN1;
    }
  })();
  