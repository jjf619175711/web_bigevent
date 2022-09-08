$(function () {
    // 点击去注册切换到注册界面
    $('#link_reg').on('click', () => {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    // 点击去登录切换到登录界面
    $('#link_login').on('click', () => {
        $('.reg_box').hide()
        $('.login_box').show()
    })

    // 通过layui 调用 form 对象
    var form = layui.form
    // 通过layui 调用 layer 对象
    var layer = layui.layer
    // 登录注册表单验证
    form.verify({
        reg_username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },
        reg_pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        reg_repwd: function (value) {
            var pwd = $('.reg_box [name=password]').val()
            if (pwd !== value) return '两次密码不一致'
        },
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    })

    // 登录验证
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) return layer.msg(res.message);
                layer.msg(res.message);
                // 将登录后服务器发送过来的token保存到本地localStorage
                localStorage.setItem('token', res.token)
                // 登录成功后2s  跳转到首页
                setTimeout(() => {
                    location.href = 'index.html'
                }, 2000)
            }
        })
    })

})


