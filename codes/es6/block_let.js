for (let i=0; i<3; i++) {
    // console.log(i);
    let i = 'laowai';
    console.log(i);
}
console.log(i);
for (var i=0; i<3; i++) {
    console.log(i);
    var i = 'laowai';
    console.log(i);
}

let b = 12;
// let b = 22; // Identifier 'b' has already been declared

let c = '22';

function fn() {
    console.log(c); // TDZ 暂时性死区
    let c = '15';
}
fn();

{

}

/*
    定义（声明）变量

    var a = 'laowai';
    let a = 'laowai';

    作用域
        全局
        函数作用域

    let 相当于var
    const 常量，定义后不能改变

    let（特点） :
        1：没有预解析，不存在变量提升
            在代码块内，只要let定义变量，提前使用，error
        2：同一作用域，不能重复定义
        3：for循环，可以理解为（）父级 {} 子级作用域 

    const:
        特性和let一样
        1：const定义变量不能修改
        2：直接赋值，不能后赋值
        
        引用类型做常量，不允许修改，可以使用 Object.freeze([]|{});

    块级作用域： 

        {}

        {
            {
                // block scope
            }
        }

        if() {}
        for() {}
        while() {}

        {
            // todo 
        }

        直接相当于

        IIFE
        (function() {
            // todo
        })();

 */