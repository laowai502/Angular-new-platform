const path = require('path');

//错误日志输出完整路径
const errorLogPath = path.resolve(__dirname, "../logs/error/error");

//监控日志输出完整路径
const watchLogPath = path.resolve(__dirname, "../logs/watch/watch");

//访问日志输出完整路径
const responseLogPath = path.resolve(__dirname, "../logs/response/response");

module.exports = {
　　//日志格式等设置
    appenders:
    {
        "rule-console": {"type": "console"},
        "errorLogger": {
            "type": "dateFile",//类型 console在控制台输出，file普通文件，datefile按时间分文件
            "filename": errorLogPath,//目录加上文件名
            "pattern": "-yyyy-MM-dd-hh.log",//-yyyy-MM-dd-hh:mm:ss.log
            "alwaysIncludePattern": true,//开启按时间分文件
            "daysToKeep": 7
        },
        "watchLogger": {
            "type": "dateFile",
            "filename": watchLogPath,
            "pattern": "-yyyy-MM-dd-hh.log",
            "alwaysIncludePattern": true,
            "layout": { type: "basic" },//格式化输出日志的格式type值：basic，coloured ，messagePassThrough，dummy，可以自定义格式log4js.addLayout
            "daysToKeep": 7
        },
        "http": {
            "type": "dateFile",
            "filename": responseLogPath,
            "pattern": "-yyyy-MM-dd-hh.log",
            "alwaysIncludePattern": true,
            "daysToKeep": 7
        },
    },
 　　//供外部调用的名称和对应设置定义
    categories: {
        "default": {"appenders": ["rule-console"], "level": "all"},
        "http": {"appenders": ["http"], "level": "info"},
        "errorLogger": {"appenders": ["errorLogger"], "level": "error"},//level最小日志级别
        "watchLogger": {"appenders": ["watchLogger"], "level": "info"},
        "start": {"appenders": ["http"],"level": "info"}
    },
    levels: {//自定义日志级别  默认级别ALL <TRACE <DEBUG <INFO <WARN <ERROR <FATAL <MARK <OFF

    }
}
