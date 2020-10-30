# Lazyload Module

<hr>

&#x2003;&#x2003;默认情况下，NgModule 都是急性加载的，也就是说它会在应用加载时尽快加载，所有模块都是如此，无论是否立即要用。对于带有很多路由的大型应用，考虑使用惰性加载 —— 一种按需加载 NgModule 的模式。惰性加载可以减小初始包的尺寸，从而减少加载时间。

<br>

```javascript

    // syntax
    // bad not support in angular-cli+ 
    const routes: Routes = [
        { path: 'login', loadChildren: './login/login.module#LoginModule' }
    ]

    // right
    const routes: Routes = [
        {
            path: 'pages',
            loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
        }
    ];

```

<br>


### 依赖注入 DI

<hr>

&#x2003;&#x2003;依赖注入（DI）是一种创建依赖其他对象的方法。在创建一个新的对象实例时，依赖注入系统将会提供依赖对象（称为依赖关系）

<br>

### 使用惰性加载模块限制提供者的作用域

<hr>

&#x2003;&#x2003;在 CLI 生成的基本应用中，模块是急性加载的，这意味着它们都是由本应用启动的，Angular 会使用一个依赖注入体系来让一切服务都在模块间有效。对于急性加载式应用，应用中的根注入器会让所有服务提供者都对整个应用有效。

当使用惰性加载时，这种行为需要进行改变。惰性加载就是只有当需要时才加载模块，比如路由中。它们没办法像急性加载模块那样进行加载。这意味着，在它们的 providers 数组中列出的服务都是不可用的，因为根注入器并不知道这些模块。

当 Angular 的路由器惰性加载一个模块时，它会创建一个新的注入器。这个注入器是应用的根注入器的一个子注入器。想象一棵注入器树，它有唯一的根注入器，而每一个惰性加载模块都有一个自己的子注入器。路由器会把根注入器中的所有提供者添加到子注入器中。如果路由器在惰性加载时创建组件，Angular 会更倾向于使用从这些提供者中创建的服务实例，而不是来自应用的根注入器的服务实例。

任何在惰性加载模块的上下文中创建的组件（比如路由导航），都会获取该服务的局部实例，而不是应用的根注入器中的实例。而外部模块中的组件，仍然会收到来自于应用的根注入器创建的实例。

虽然你可以使用惰性加载模块来提供实例，但不是所有的服务都能惰性加载。比如，像路由之类的模块只能在根模块中使用。路由器需要使用浏览器中的全局对象 location 进行工作。

### 在模块中提供服务还是在组件中？

&#x2003;&#x2003;通常，要在根模块中提供整个应用都需要的服务，在惰性加载模块中提供限定范围的服务。

&#x2003;&#x2003;路由器工作在根级，所以如果你把服务提供者放进组件（即使是 AppComponent）中，那些依赖于路由器的惰性加载模块，将无法看到它们。

&#x2003;&#x2003;当你必须把一个服务实例的作用域限定到组件及其组件树中时，可以使用组件注册一个服务提供者。 比如，用户编辑组件 UserEditorComponent，它需要一个缓存 UserService 实例，那就应该把 UserService 注册进 UserEditorComponent 中。 然后，每个 UserEditorComponent 的实例都会获取它自己的缓存服务实例。


##### <font color=#FF0000>forRoot() 与 forChild()</font>

<br>

&#x2003;&#x2003;你可能已经注意到了，CLI 会把 RouterModule.forRoot(routes) 添加到 AppRoutingModule 的 imports 数组中。 这会让 Angular 知道 AppRoutingModule 是一个路由模块，而 forRoot() 表示这是一个根路由模块。 它会配置你传入的所有路由、让你能访问路由器指令并注册 Router。 forRoot() 在应用中只应该使用一次，也就是这个 AppRoutingModule 中。

&#x2003;&#x2003;CLI 还会把 RouterModule.forChild(routes) 添加到各个特性模块中。这种方式下 Angular 就会知道这个路由列表只负责提供额外的路由并且其设计意图是作为特性模块使用。你可以在多个模块中使用 forChild()。

forRoot() 方法为路由器管理全局性的注入器配置。 forChild() 方法中没有注入器配置，只有像 RouterOutlet 和 RouterLink 这样的指令

<br>