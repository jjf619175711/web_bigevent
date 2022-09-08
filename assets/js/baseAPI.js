// 每次在调用 $.get() 、$.post()、$.ajax()的时候，会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的ajax请求前 统一拼接url请求根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // 统一为有权限的的接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') }
    }
    // 统一挂载全局 complete 函数
     // 不管成功还是失败 都会调用complete回调函数
    options.complete = function (res) {
        // console.log(res);
        // responseJSON: {status: 1, message: '身份认证失败！'}
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //判断用户有没有登录，如果没有登录跳转到登录界面
            localStorage.clear('token')
            location.href = 'login.html'
        }
    }
})