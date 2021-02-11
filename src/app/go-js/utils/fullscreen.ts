export function checkFull() {
    return  !! (
        document['mozFullScreen'] ||
        document['webkitIsFullScreen'] ||
        document['webkitFullScreen'] ||
        document['msFullScreen']
    );
}

export function requestFullScreen(element) {
    // 判断各种浏览器，找到正确的方法
    const requestMethod = element.requestFullScreen || // W3C
        element.webkitRequestFullScreen || // FireFox
        element.mozRequestFullScreen || // Chrome等
        element.msRequestFullScreen; // IE11
    if (requestMethod) {
        requestMethod.call(element);
    }
}

export function exitFull() {
    // 判断各种浏览器，找到正确的方法
    const exitMethod = document.exitFullscreen || // W3C
        // tslint:disable-next-line:no-string-literal
        document['mozCancelFullScreen'] || document['webkitExitFullscreen'] || document['webkitExitFullscreen'];
    if (exitMethod) {
        exitMethod.call(document);
    }
}
