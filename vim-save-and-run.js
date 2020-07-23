(function (mod) {
  if (typeof exports == "object" && typeof module == "object")
    // CommonJS
    mod();
  // mod(
  //   require("../lib/codemirror"),
  //   require("../addon/search/searchcursor"),
  //   require("../addon/dialog/dialog"),
  //   require("../addon/edit/matchbrackets.js")
  // );
  else if (typeof define == "function" && define.amd)
    // AMD
    define([
      //   "../lib/codemirror",
      //   "../addon/search/searchcursor",
      //   "../addon/dialog/dialog",
      //   "../addon/edit/matchbrackets",
    ], mod);
  // Plain browser env
  else mod(CodeMirror);
})(function (CodeMirror) {
  "use strict";
  CodeMirror.Vim.defineEx("!", "", function (cm, params) {
    CodeMirror.signal(cm, "save-run", "Save & run");
  });
});
