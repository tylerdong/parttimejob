/**
 * 注册一个service worker从本地缓存中获取资源
 * 这样加载后，访问线下资源，速度更快。
 **/

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // ipv6地址
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
)

export default function register() {
    if(process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // 所有浏览器都支持URL函数
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location)
        if(publicUrl.origin !== window.location.origin) {
            // PUBLIC_URL和origin不同的时候service worker不能工作
            return
        }

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`
            if(isLocalhost) {
                // 本地，检查service worker是否开始工作
                checkValidServiceWorker(swUrl)

                // 添加一些日志，提示用户参考文档
                navigator.serviceWorker.ready.then(() => {
                    console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ");
                })
            } else {
                // 不是本地，直接注册service worker
                registerValidSW(swUrl)
            }
        })
    }
}

function registerValidSW(swUrl) {
    navigator.serviceWorker.register(swUrl).then(registration => {
        registration.onupdatefound = () => {
            const installingWorker = registration.installing
            installingWorker.onstatechange = () => {
                if(installingWorker.state === 'instated') {
                    if(navigator.serviceWorker.controller) {
                        // 加载新的内容
                        console.log("New content is available please refresh");
                    } else {
                        // 内容被缓存起来
                        console.log("Content is cached for offline use.");
                    }
                }
            }
        }
    }).catch(error => {
        console.log("Error during service worker registration:", error);
    })
}

function checkValidServiceWorker(swUrl) {
    // 如果找不到service worker，重新加载页面
    fetch(swUrl).then(response => {
        // 确定service worker存在，确实是一个js文件
        if(response.status === 404 || response.headers.get('content-type').indexOf('javascript') === -1) {
            // 找不到，可能是一个不同的应用，重新加载页面
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister().then(() => {
                    window.location.reload()
                })
            })
        } else {
            // 正常处理service worker
            registerValidSW(swUrl)
        }
    }).catch(() => {
        console.log("No internet connection found. App is running in offline mode.");
    })
}

export function unregister() {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister()
        })
    }
}