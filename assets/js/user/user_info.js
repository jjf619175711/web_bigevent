$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })
    // 调用 initUserinfo 初始化用户信息函数
    initUserinfo()
    // 调用 updateUserinfo 更新用户信息
    updateUserinfo()
    // 调用 reSet 重置用户信息函数
    reSet()


    // 初始化用户信息
    function initUserinfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 更新用户信息
    function updateUserinfo() {
        $('#formUserInfo').submit(function (e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/my/userinfo',
                data: $(this).serialize(),
                success: function (res) {
                    // {status: 0, message: '修改用户信息成功！'}
                    if (res.status != 0 && res.message != '修改用户信息成功！') {
                        return layer.msg('修改用户信息失败！')
                    }
                    layer.msg(res.message)
                    // 调用父页面中的方法 重新渲染头像和用户名
                    window.parent.getUserInfo()
                }
            })
        })
    }

    // 重置用户信息
    function reSet(){
        $('#btnreset').on('click',function(e){
            e.preventDefault()
            initUserinfo()
        })
    }
})

