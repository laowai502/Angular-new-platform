/**
 * Promise and Rxjx async prepare
 */
const { Observable } = require('rxjs')

const _promise = new Promise(resolve => {
    setTimeout(() => {
        resolve('promise excute')
    }, 1000)
})

_promise.then(data => console.log(data)) //excute by node, console.info do not print

const _ob = new Observable(observer => {
    setTimeout(() => {
        observer.next('excute observer')
    }, 1000)
})

_ob.subscribe(data => console.log(data))