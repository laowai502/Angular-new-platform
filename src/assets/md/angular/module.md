# Angular Module

* ng new testProject;

* ng g module xxx/lazyload -- routing

* ng g module customers --route customers --module app.module

* ng g module sharing

* ng g module provide

<br>

&#x2003;&#x2003;现如今比较流行的web application，前端方面，很多都使用spa（single page application），得益于前端框架的发展最先是由google的开发团队，研发出来的angularjs这么一个前端框架，好多新的设计理念都是由此提出来的，依赖注入，mvvm, 以及项目工程模块构建上的的mvc,而后又涌现出来许多新式的优秀框架，高度组件化的 react， react-native， angular（重量级框架就前端来说），以及国内很受欢迎的vue，一款渐进式的框架，集合前两大框架的优点且摒弃了缺点

<br>

&#x2003;&#x2003;这块说一下前端mvc和mvvm， 随之ajax的兴趣，我们前端称之为jquery的时代，（不是以前古老的php，jsp页面的时代了），mvc设计模式是如何操作的

<br>

``` javascript
    //MVC
    model: 定义的变量  const data = 'hello javascript';

    view:   <input type="text" value="" id="myInput" />
            <button type="button" onclick="getVal()">quzhi</button>

    cotroller： 
        var myInput = document.getElementById('myInput'); myInput.value = data; 

        function getVal() { data = myInput.value; }

        $("#myInput").val(data); data = $("#myInput").val();
        
    // MVVM: model - view view - model; 动态的双向绑定
    <input type="text" [(ngModel)]="bindData" />

    this.bindData = 'laowai';

    function getVal() { this.bindData = 'laoding'; }

    // var vm = this;

```

<br>

&#x2003;&#x2003;我们只需要去操作数据，甚至来讲我们在开发时的思路就变了，完全由数据去驱动.

<br>

&#x2003;&#x2003;这个中间的具体操作步骤呢，就有我们的框架去帮我们做了，angularjs， angular， vue也是如何，但是他们的底层的实现方式不一样

<br>

&#x2003;&#x2003;好了，话说回来，咱们现在的前端页面的开发都是又不同的组件构成的，组件就是页面上的一个个小的单元，用angular这个框架去讲呢就叫元数据，
那我们整个前端的系统工程呢，都是由各个不同分工的模块组成的，（我们经常能听到，页面组件化，工程模块化） angular的设计思路就是如此，angular就是由NgModule这种特有的angular module来构成的，
各个NgModule组成了我们的工程

<br>

### NgModules

NgModules 用于配置注入器和编译器，并帮你把那些相关的东西组织在一起。

NgModule 是一个带有 @NgModule 装饰器的类。 @NgModule 的参数是一个元数据对象，用于描述如何编译组件的模板，以及如何在运行时创建注入器。 它会标出该模块自己的组件、指令和管道，通过 exports 属性公开其中的一部分，以便外部组件使用它们。 NgModule 还能把一些服务提供者添加到应用的依赖注入器中。

### Angular 模块化

    模块是组织应用和使用外部库扩展应用的最佳途径。

    Angular 自己的库都是 NgModule，比如 FormsModule、HttpClientModule 和 RouterModule。 很多第三方库也是 NgModule，比如 Material Design、 Ionic 和 AngularFire2。

    NgModule 把组件、指令和管道打包成内聚的功能块，每个模块聚焦于一个特性区域、业务领域、工作流或通用工具。

    模块还可以把服务加到应用中。 这些服务可能是内部开发的（比如你自己写的），或者来自外部的（比如 Angular 的路由和 HTTP 客户端）。

    模块可以在应用启动时急性加载，也可以由路由器进行异步的惰性加载。

<br>

##### NgModule 的元数据会做这些：

* 声明某些组件、指令和管道属于这个模块。

* 公开其中的部分组件、指令和管道，以便其它模块中的组件模板中可以使用它们。

* 导入其它带有组件、指令和管道的模块，这些模块中的元件都是本模块所需的。

* 提供一些供应用中的其它组件使用的服务。

    每个 Angular 应用都至少有一个模块，也就是根模块。 你可以引导那个模块，以启动该应用。

    对于那些只有少量组件的简单应用，根模块就是你所需的一切浏览器中运行使用。 随着应用的成长，你要把这个根模块重构成一些特性模块，它们代表一组密切相关的功能集。 然后你再把这些模块导入到根模块中。

<br>

| name        | from           | how to use  |
| -------------: |:-------------:|-----|
| BrowserModule | @angular/browser | 配置跟模块用的 |
| CommonModule | @angular/common | ngIf *ngFor |
| FormModule | @angular/form | [(ngModel)] |
| ReactiveFormModule | @angular/form | 响应式表单的 |
| RouterModule | @angular/route | 提供路由服务的和路由指令的 |
| httpClientModule | @angular/common/http | 与服务器回话用的 |


<br>

&#x2003;&#x2003; 前端应用都需要通过HTTP协议与后端进行服务通，目前浏览器主要支持两种API通讯：XMLHttpRequest 接口和 fetch() API。而anluar最新提供的HttpClient是基于XMLHttpRequest 提供的接口。

<br>

### NgModule API

&#x2003;&#x2003;宏观来讲，NgModule 是组织 Angular 应用的一种方式，它们通过 @NgModule 装饰器中的元数据来实现这一点。 这些元数据可以分成三类：

* 静态的：编译器配置，用于告诉编译器指令的选择器并通过选择器匹配的方式决定要把该指令应用到模板中的什么位置。它是通过 declarations 数组来配置的。
 
* 运行时：通过 providers 数组提供给注入器的配置。

* 组合/分组：通过 imports 和 exports 数组来把多个 NgModule 放在一起，并让它们可用。

<br>

```javascript

    @NgModule({
        declarations: [],
        entryComponents: [],
        providers: [],
        imports: [],
        exports: [],
        bootstrap: [AppComponent]
    })

```

<br>

### 模块的分类

&#x2003;&#x2003;根据模块的特性，官方建议给模块进行分类

* shareModule
* minxModule
* lazyLoadModule

<br>

&#x2003;&#x2003;为那些可能会在应用中到处使用的组件、指令和管道创建 SharedModule。 这种模块应该只包含 declarations，并且应该导出几乎所有 declarations 里面的声明。SharedModule 可以重新导出其它小部件模块，比如 CommonModule、FormsModule 和提供你广泛使用的 UI 控件的那些模块。注意：SharedModule不应该带有 providers

<br>

```javascript
import {
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatIconModule,
  MatSlideToggleModule,
  MatTooltipModule
} from '@angular/material';

import { CommonModule } from '@angular/common';
import { FormModule } from '@angular/forms';

@NgModule({
    declarations: []
    imports: []
    exports: [
        CommonModule,
        FormModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        MatIconModule,
        MatSlideToggleModule,
        MatTooltipModule
    ]
})
export class ShareModule {}

```

&#x2003;&#x2003; Mixed Module 即存在静态的组件指令管道，又同时存在运行时实例化的服务。RouterModule，该模块不仅提供了<router-ooutlet> routerLink 指令还提供Router服务
对于AppModule, RouterModule.forRoot(routes)， 对于子模块， RouterModule.forChild(routes)

<br>

&#x2003;&#x2003; lazyLoadModule