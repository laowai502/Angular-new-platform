### Angular 中 Dom 相关 API

&#x2003;&#x2003;以下几个api是angular中能获取到DOM元素的

* ElementRef  
* viewChild  
* viewChildren

#### ElementRef

&#x2003;&#x2003;视图中的原生dom元素包装器，在组件的构造器中注入则返回整个组件的最外层元素，通过nativeElement属性得到原生的dom节点，进而向下查找或做其他操作.
（nativeElement，该属性无法在angular自带的Web Worker中使用）

#### @viewChild()

&#x2003;&#x2003;可以通过ViewChild这个装饰器获取视图元素中的内容，获取子组件或者子元素，如下是查询方式

<br>

```javascript
    @ViewChild('#DomExample', { static: false }) domExample: ElementRef;  //<div #DomExample></div>
    // @Component 或 @Directive 装饰器的类
    @ViewChild(ChildComponent, { static: false }) childCp: ChildComponent;  //<child-component></div>
    @ViewChild(ExampleDirective, { static: false }) egDirective: ExampleDirective;  //<div eg-directive></div>
    @ViewChild(TemplateRef) template: TemplateRef; // <ng-template></ng-template>
```

<br>

&#x2003;&#x2003;<font color=#FF0000>注意</font>，升级到 Angular8.0.0 所有的 @ViewChild 必须加一个静态标识属性 { static: boolean }, 此处是升级版本需要迁移代码的一部分；
其实部分应用会将其设置为 static: false, 基本上就是一个默认值了，但其存在是因为（angular对于前端来说是一个很重的框架）依赖其或者与其高耦合的类库并不会第一时间升级，会导致不可控的编译错误，等到 Angular 9 及更高版本中，任意删除 {static: false} 标志都是安全的

<br>

```javascript
    // 之前
    @ViewChild('foo') foo: ElementRef;
    //之后
    @ViewChild('foo', {static: true}) foo: ElementRef; // query results available in ngOnInit
    OR
    @ViewChild('foo', {static: false}) foo: ElementRef; // query results available in ngAfterViewInit
```

<br>

&#x2003;&#x2003;理解一个概念，Angular虽然不像react使用虚拟dom，但是其通过zone.js进行脏检查; 所有元素在生命周期中存在应用阶段和渲染阶段，检测计算完成后生成真实dom，这也是为什么操作通过ElementRef或者 @viewChild 获取元素，一定要在 ngAfterViewInit 周期之后再使用。 详情 [https://angular.cn/guide/static-query-migration#what-does-this-flag-mean](https://angular.cn/guide/static-query-migration#what-does-this-flag-mean)

<br>

```javascript
    // eg
    @ViewChild(Foo) foo: Foo;
    <div foo></div> // static
    <div foo *ngIf="showing"></div> // dynamic
```

#### Renderer2 (API > @angular/core)

&#x2003;&#x2003;获取dom之后，可使用原生js进行dom操作，也可使用Angular提供了更好的跨平台方式Renderer2，也更安全

<br>

```javascript
abstract class Renderer2 {
    abstract data: {...}
    destroyNode: ((node: any) => void) | null
    abstract destroy(): void
    abstract createElement(name: string, namespace?: string): any
    abstract createComment(value: string): any
    abstract createText(value: string): any
    abstract appendChild(parent: any, newChild: any): void
    abstract insertBefore(parent: any, newChild: any, refChild: any): void
    abstract removeChild(parent: any, oldChild: any, isHostElement?: boolean): void
    abstract selectRootElement(selectorOrNode: any, preserveContent?: boolean): any
    abstract parentNode(node: any): any
    abstract nextSibling(node: any): any
    abstract setAttribute(el: any, name: string, value: string, namespace?: string): void
    abstract removeAttribute(el: any, name: string, namespace?: string): void
    abstract addClass(el: any, name: string): void
    abstract removeClass(el: any, name: string): void
    abstract setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void
    abstract removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void
    abstract setProperty(el: any, name: string, value: any): void
    abstract setValue(node: any, value: string): void
    abstract listen(target: any, eventName: string, callback: (event: any) => boolean | void): () => void
}
```
