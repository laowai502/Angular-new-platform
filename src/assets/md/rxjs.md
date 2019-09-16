# RxJs

&#x2003;官方：RxJS 是 Reactive Extensions for JavaScript 的缩写，起源于 Reactive Extensions，是一个基于可观测数据流在异步编程应用中的库。RxJS 是 Reactive Extensions 在 JavaScript 上的实现。

&#x2003;Keywords: 基于流，观察者模式，迭代器模式，响应式 的一类JavaScript类库

### 迭代器

&#x2003;Rxjs 内部实现是通过es6的 Iterator对象

1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

2. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

3. 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

4. 不断调用指针对象的next方法，直到它指向数据结构的结束位置。

&#x2003;每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

<br>

&#x2003;在ES6中，有三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构，对象（Object）之所以没有默认部署Iterator接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。
Iterator接口部署在对象的Symbol.Iterator属性上, 可以调用这个属性，就得到遍历器对象。

<br>

```javascript
     var arr = ['a', 'b', 'c'];
     var iterator = arr[Symbol.iterator]();
     var a = iterator.next();
     console.log(a)   //{value: 'a', done: false}
```

### 流程图

<div align=center>
    <img src="../assets/images/main.jpg"/>
</div>

### Observable —— 被观察者

&#x2003;Rxjs是观察者 + 迭代器模式的结合，Observable作为被观察者，是一个值或事件的流集合。就像是一个序列，裡面的元素会随着时间推送。

<br>

```typescript
    var observable = Rx.Observable
    // 通过create方法创建一个Observable
    // 回调函数会接受observer参数，也就是观察者角色
        .create(function(observer) {
            observer.next('hi');
            observer.next('world');

            setTimeout(() => {
                observer.next('这一段是异步操作');
            }, 30)
        })

    // 订阅这个 observable
    // 只有在订阅之后，才会在流Observable变化的时候，调用observer提供的方法，并通知他	
    // 订阅之后也可以取消订阅，调用unsubscribe()即可
    console.log('start')
    var subscription = observable.subscribe(function(value) {
        console.log(value);
    })
    console.log('end')
    setTimeOut(()=> {
    subscription.unsubscribe()
    }, 5000)
```

<br>

| 创建方式        | API           |
| ------------- |:-------------:|
| 多个值      | from枚举 |
| 从事件create     | fromEvent      |
| 转换promise | fromPromise      |
| 自定义 | create |

### Observer —— 观察者

&#x2003;和迭代器模式一一对应，提供三个方法，next、error、complete

<br>

```typescript
    var Observer = {
        next(value) { /* 处理值*/ },
        error(error) { /* 处理异常 */ },
        complete() { /* 处理已完成态 */ }
    };

    next(): 接收Observable发出的值  （必传）
    error(): 不同于迭代器里面用try catch，Observer用error方法接收错误 （可选）
    complete(): 当没有新的数据发出的时候，触发操作  （可选）
```

### Subject —— 观察模式的实现

&#x2003;其实观察者模式又叫发布订阅模式（Publish/Subscribe），它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，可以理解成本身是个主题管理观察者对象的，更高一级的职位关系

### rxjs的工具函数，operators

&#x2003;[https://rxjs-dev.firebaseapp.com/api?query=operators](https://rxjs-dev.firebaseapp.com/api?query=operators)

<br>

```typescript
    /**
     * Rxjs 工具函数 map, filter, debounce, takeUntil, every, endWith 等一系列的数据操作，dom操作
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
```
### fromEvent

&#x2003;功能: 将一个元素上的事件转化为一个Observable, 我们实际开发中善用的话替我们解决很多问题

<br>

```typescript
    // eg
    var clicks = Rx.Observable.fromEvent(document, 'click');
    clicks.subscribe(x => console.log(x));
    // listening window resize
    import {fromEvent} from 'rxjs';
    ...
    ngOnInit() { 
        fromEvent(window, 'resize').subscribe((event) => { console.log('todo something'); 
    }); 
    ...
```

### Angular 中的可观察对象

&#x2003;最后我们说一下Angular中封装的Observable对象

#### &#x2003;事件发送器 EventEmitter

&#x2003;&#x2003;Angular 提供了一个 EventEmitter 类，它用来从组件的 @Output() 属性中发布一些值。EventEmitter 扩展了 Observable，并添加了一个 emit() 方法，这样它就可以发送任意值了。当你调用 emit() 时，就会把所发送的值传给订阅上来的观察者的 next() 方法。

#### &#x2003;HTTP

&#x2003;&#x2003;Angular 的 HttpClient 从 HTTP 方法调用中返回了可观察对象。例如，http.get(‘/api’) 就会返回可观察对象。相对于基于承诺（Promise）的 HTTP API，它有一系列优点：

* 可观察对象不会修改服务器的响应（和在承诺上串联起来的 .then() 调用一样）。反之，你可以使用一系列操作符来按需转换这些值。
* HTTP 请求是可以通过 unsubscribe() 方法来取消的。
* 请求可以进行配置，以获取进度事件的变化。
* 失败的请求很容易重试。

#### &#x2003; 此外还有Async 管道, 路由器 (Router.events), ActivatedRoute(可注入的路由服务), 响应式表单 (reactive forms)

&#x2003;&#x2003;  [https://www.angular.cn/guide/observables-in-angular#reactive-forms](https://www.angular.cn/guide/observables-in-angular#reactive-forms)

### 关于资源回收，如何在angular里面优雅的取消订阅

&#x2003;对于一些angular自带的全局Observable，Router.events， 高级别作用域的EventEmitter(同级组件，或者跨度很大的，简言之非父子组件)，HttpClient等在路由组件之间使用时需要手动进行回收，否则会造成内存泄漏，就好比c#中存在堆内存的变量

<br>

```typescript
    // 以route举例
    import { Router, NavigationStart, NavigationEnd } from '@angular/router';
    ...
    myDestory: any;
    constructor(
        private router: Router
    ) {
        this.myDestory = router.events.pipe(
        filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            //todo
        });
    }
    ngOnDestroy() {
        this.myDestory.unsubscribe();
    }
    ...
```

<br>

&#x2003;takeUntil，takeWhile，skipUntil，skipWhile等过滤操作符如有代码不慎的情况也会造成，这些高级用法在使用时需要注意，感兴趣可自己搜一些文章










