function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    return getComputedStyle(obj, null)[attr];
}

export function slideUp(elemt, speed) { // 向上滑动  Height ~ 0
    // 如果当前高度不为0，则执行上拉动画
    if (elemt.offsetHeight !== 0) {
        speed = speed || 500; // 执行总时间
        const timeSpeed = speed / 50; // 速度
        elemt.style.cssText = 'display:block;overflow:hidden;';
        // 顶部内边距
        const paddingTop = parseInt(getStyle(elemt, 'paddingTop'), 10);
        let styPaddingTop = paddingTop;
        // 底部内边距
        const paddingBottom = parseInt(getStyle(elemt, 'paddingBottom'), 10);
        let styPaddingBottom = paddingBottom;
        // 顶部外边距
        const marginTop = parseInt(getStyle(elemt, 'marginTop'), 10);
        let styMarginTop = marginTop;
        // 底部外边距
        const marginBottom = parseInt(getStyle(elemt, 'marginBottom'), 10);
        let styMarginBottom = marginBottom;
        // 高度
        const height = elemt.clientHeight - paddingTop - paddingBottom;
        let styHeight = height;

        let num = 0;
        // tslint:disable-next-line: only-arrow-functions
        const timer = setInterval(function() {
            // 更改高度
            if (styHeight !== 0) {
                styHeight = styHeight - height / 50;
                elemt.style.height = styHeight < 1 ? 0 : styHeight + 'px';
            }
            // 更改Padding-top
            if (styPaddingTop !== 0) {
                styPaddingTop = styPaddingTop - paddingTop / 50;
                elemt.style.paddingTop = styPaddingTop < 1 ? 0 : styPaddingTop + 'px';
            }
            // 更改Padding-bottom
            if (styPaddingBottom !== 0) {
                styPaddingBottom = styPaddingBottom - paddingBottom / 50;
                elemt.style.paddingBottom = styPaddingBottom < 1 ? 0 : styPaddingBottom + 'px';
            }
            // 更改Padding-top
            if (styMarginTop !== 0) {
                styMarginTop = styMarginTop - marginBottom / 50;
                elemt.style.marginBottom = styMarginTop < 1 ? 0 : styMarginTop + 'px';
            }
            // 更改Padding-bottom
            if (styMarginBottom !== 0) {
                styMarginBottom = styMarginBottom - marginBottom / 50;
                elemt.style.marginBottom = styMarginBottom < 1 ? 0 : styMarginBottom + 'px';
            }
            num += timeSpeed;
            if (num >= speed) {
                elemt.style.cssText = 'display:none';
                clearInterval(timer);
            }
        }, timeSpeed);
    }
}
// 2）下拉函数
export function slideDown(elemt, speed) { // 向下滑动 0 ~ Height
    speed = speed || 500; // 执行总时间
    const timeSpeed = speed / 50; // 速度
    // console.log(timeSpeed);
    elemt.style.cssText = 'display:block';
    // 顶部内边距
    const paddingTop = parseInt(getStyle(elemt, 'paddingTop'), 10);
    let styPaddingTop = 0;
    // 底部内边距
    const paddingBottom = parseInt(getStyle(elemt, 'paddingBottom'), 10);
    let styPaddingBottom = 0;
    // 顶部外边距
    const marginTop = parseInt(getStyle(elemt, 'marginTop'), 10);
    let styMarginTop = 0;
    // 底部外边距
    const marginBottom = parseInt(getStyle(elemt, 'marginBottom'), 10);
    let styMarginBottom = 0;
    // 高度
    const height = elemt.clientHeight - paddingTop - paddingBottom;
    let styHeight = 0;

    elemt.style.height = '0px';
    elemt.style.paddingTop = '0px';
    elemt.style.paddingBottom = '0px';
    elemt.style.marginTop = '0px';
    elemt.style.marginBottom = '0px';

    let num = 0;
    // tslint:disable-next-line: only-arrow-functions
    const timer = setInterval(function() {
        // 更改高度
        if (height > 0) {
            styHeight = styHeight + height / 50;
            elemt.style.height = styHeight > height ? height : styHeight + 'px';
        }
        // 更改Padding-top
        if (paddingTop > 0) {
            styPaddingTop = styPaddingTop + paddingTop / 50;
            elemt.style.paddingTop = styPaddingTop > paddingTop ? paddingTop : styPaddingTop + 'px';
        }
        // 更改Padding-bottom
        if (paddingBottom > 0) {
            styPaddingBottom = styPaddingBottom + paddingBottom / 50;
            elemt.style.paddingBottom = styPaddingBottom > paddingBottom ? paddingBottom : styPaddingBottom + 'px';
        }
        // 更改Padding-top
        if (marginTop > 0) {
            styMarginTop = styMarginTop + marginTop / 50;
            elemt.style.marginTop = styMarginTop > marginTop ? marginTop : styMarginTop + 'px';
        }
        // 更改Padding-bottom
        if (marginBottom > 0) {
            styMarginBottom = styMarginBottom + marginBottom / 50;
            elemt.style.marginBottom = styMarginBottom > marginBottom ? marginBottom : styMarginBottom + 'px';
        }

        num += timeSpeed;
        if (num >= speed) {
            elemt.style.cssText = 'display:block';
            clearInterval(timer);
        }
    }, timeSpeed);
}
