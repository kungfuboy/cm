CodeMirror 版本：v5.56.0

首先，搭建好简单的 Demo Page，大致了解了`CodeMirror`那几个目录是做什么的。

首先在`vim`命令模式下输入`:!`, 看到了报错信息，去全局搜索报错信息，就找到了错误信息是在哪里触发的，在那个位置打印调用栈，即拿到了出错的调用栈。

官方的 Demo 里面有保存的例子，我输入:s，能够弹出 Save。在 Save 的位置打印调用栈，于是拿到了成功的调用栈。

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

成功和失败的调用栈都有了，对比一下就能看到重合的路径，于是着重阅读那几个函数的源码，然而没有找到想要的。

通过打印调用栈的方式虽然没有直接获得答案，但相关的逻辑应该就在调用路径上的几个文件里。

既然是在 vim 的模式下，那在`keymap/vim.js`文件里的可能性最大，换我我就写那！

然而`keymap/vim.js`的源码相当庞大，我先注意到了`defaultKeymap`这个对象数组，它里面有这个结构。

```javascript
// Ex command
{ keys: ":", type: "ex" },
```

专门给这个对象写了句注释叫`Ex Command`，虽然我还不知道`Ex`的精准定义，但大致知道会与它有关，之后多多留意与`Ex`有关的函数应该没错了。

再往下看到了`defineEx`这个函数，从名字上看应该就是它了，API 找到了，但用法不算很了解。

于是去在`test/vim_test.js`的测试用例里面搜索这个函数，一共只有两个相关的测试，也比较好懂。

```javascript
// test/vim_test.js ex_special_names用例
CodeMirror.Vim.defineEx(name, "", function (cm, params) {
  ran = params.commandName;
  val = params.argString;
});
```

读完源码之后，大致就知道插件应该怎么写了。

接下来在 Demo Page 页上尝试，然后再抽成插件。插件的外层结构是直接使用了`vim.js`文件的结构，兼容 amd 和 cmd 模式，但把文件的引用路径删掉了。

至少在 Demo Page 上，题目里基本的需求应该满足的。

#### 相关的测试

自己稍加测试了一下，输入 `:!` 能广播出`save-run`事件，这是最基本的。

输入`:!!`则会抛错，当然，我觉得这是合理的错误。

然而，执行`:!s`、`:!w`、`:!z`之类的命令，也会广播出`save-run`事件，`s、w、z`都作为参数传入了插件。

毕竟没有进一步了解需求，因此不贸然做处理，只是把参数也广播出来了。

整个答题的过程大致就是如此。
