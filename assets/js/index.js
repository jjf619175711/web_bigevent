$(function () {
    // 判断用户有没有登录，如果没有登录跳转到登录界面
    // if (localStorage.getItem('token') == null) {
    //     location.href = 'login.html'
    // }
    var layer = layui.layer
    getUserInfo()

    $('#btnlogout').on('click', function () {
        layer.confirm('确定退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            //do something

            // 点击退出登录，并清空本地存储的token
            localStorage.clear('token')
            // 跳转到登录页面
            location.href = 'login.html'

            // 调用
            layer.close(index);
        });

    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status != 0) return layer.msg('获取用户列表失败');
            layer.msg('用户列表请求成功');
            var username = res.data.username
            $('#welcome').html('欢迎：' + username)
            renderAvatar(res.data)
        },
        // 不管成功还是失败 都会调用complete回调函数
        // complete: function (res) {
        //     // console.log(res);
        //     // responseJSON: {status: 1, message: '身份认证失败！'}
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         //判断用户有没有登录，如果没有登录跳转到登录界面
        //         localStorage.clear('token')
        //         location.href = 'login.html'
        //     }
        // }

    })

    // 渲染用户头像
    function renderAvatar(data) {
        var username = data.nickname || data.username
        // 设置欢迎文本
        $('#welcome').html('欢迎：' + username)
        if (data.user_pic == null) {
            // 渲染文本图像
            $('.layui-nav-img').hide()
            $('.text-avatar').html(username.substring(0, 1).toUpperCase()).show()
        } else {
            // 渲染图片头像
            $('.text-avatar').hide()
            $('.layui-nav-img').attr('src', data.user_pic).show()

        }
    }
}