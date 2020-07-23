版本
v5.56.0

搭建好简单的 Demo 之后，大致了解了那几个目录是做什么的。

首先执行:!,看到了报错信息，去全局搜索报错信息，就找到了错误信息是在哪里触发的，在那个位置打印调用栈，即拿到了出错的调用栈。
然后官方的 Demo 里面有保存的例子，我输入:s，能够弹出 Save。在 Save 的位置打印调用栈。

```javascript
// 成功
Error
    at Object.CodeMirror.commands.save (index.html:48)
    at Object.write (vim.js:6284)
    at ExCommandDispatcher._processCommand (vim.js:5630)
    at vim.js:5573
    at runInOp (codemirror.js:3915)
    at CodeMirror.operation (codemirror.js:8590)
    at ExCommandDispatcher.processCommand (vim.js:5571)
    at onPromptClose (vim.js:2313)
    at HTMLInputElement.<anonymous> (dialog.js:82)

// 失败
Error
    at ExCommandDispatcher._processCommand (vim.js:5625)
    at vim.js:5573
    at runInOp (codemirror.js:3915)
    at CodeMirror.operation (codemirror.js:8590)
    at ExCommandDispatcher.processCommand (vim.js:5571)
    at onPromptClose (vim.js:2313)
    at HTMLInputElement.<anonymous> (dialog.js:82)
```

成功和失败的调用栈都有了，对比一下就能看到重合的路径，于是着重阅读那几个函数的源码。

读完源码之后，大致就知道插件应该怎么写了。
