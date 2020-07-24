(function (mod) {
  if (typeof exports == "object" && typeof module == "object")
    // CommonJS
    mod();
  else if (typeof define == "function" && define.amd)
    // AMD
    define([], mod);
  // Plain browser env
  else mod(CodeMirror);
})(function (CodeMirror) {
  "use strict";
  CodeMirror.Vim.defineEx("!", "", function (cm, params) {
    console.log(params);
    CodeMirror.signal(
      cm,
      "save-run",
      "Save & run" + "\n参数是：" + params.args || ""
    );
  });
});
