console.log("Hello from the module"); // 只运行一次，证明require函数会将代码放到内存，后面的三次运行来自于内存

module.exports = () => console.log("Log this beautiful text");
