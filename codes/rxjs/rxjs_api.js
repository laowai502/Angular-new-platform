/**
 * Rxjs unsubscribe
 * Rxjs 相比promise强大很多，可理解为promise的超级拓展，超集，可中途撤回，发射多个值以及一些必要的工具函数
 * Promise 动作创建动作是之后是无法撤回的，Observable不用，可以通过unsubscribe方法取消订阅
 */

'use strict'

const { Observable } = require('rxjs')

const _ob = new Observable(observer => {
    setTimeout(() => {
        observer.next('excute observer')
    }, 500)
})

const _obInstance = _ob.subscribe(data => console.log(data))

setTimeout(() => {
    _obInstance.unsubscribe() //_ob is retracted
}, 100)

/**
 * Rxjs 订阅后多次执行，简单的说，一次异步请求回调多次执行，promise无法做到，因为promise要么resolve，
 * 要么reject，而且都触发一次；Observable则可不断触发
 */
const _promise_one = new Promise(resolve => {
    // setInterval(() => {
    //     resolve('promise resolve interval')
    // }, 1000)
    setTimeout(() => {
        resolve('promise resolve interval 1000')
    }, 1000)
    setTimeout(() => {
        resolve('promise resolve interval 1500')
    }, 1500)
})

_promise_one.then(data => console.log(data))

const _ob_one = new Observable(observer => {
    let count = 0
    setInterval(() => {
        observer.next(count++)
        if (count > 10) {
            process.exit(0)
        }
    }, 500)
})

_ob_one.subscribe(data => console.log('_ob_one ： ' + data))

