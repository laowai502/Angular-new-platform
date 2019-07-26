/**
 * Rxjs 工具函数 map, filter
 * angular6 以后使用以前版本的rxjs方法，必须安装rxjs-compat模块才可使用
 */

const { Observable } = require('rxjs')
const { map, filter } = require('rxjs/operators')

const ob = new Observable(observer => {
    let count = 0
    setInterval(() => {
        observer.next(count++)
        if (count > 10) {
            process.exit(0)
        }
    }, 1000)
})

ob.pipe(
    filter(val => val % 2 === 0)
).subscribe(data => console.log('filter: ' + data))

ob.pipe(
    map(val => val * val)
).subscribe(data => console.log('map: ' + data))