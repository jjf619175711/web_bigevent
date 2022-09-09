$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        samepwd: function (value) {
            var newpwd = $('#formUpdatePWD [name=newPwd]').val()
            if (newpwd == value) {
                return '新密码不能与旧密码一致'
            }
        },
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('#formUpdatePWD [name=newPwd]').val()
            if (pwd !== value) return '两次密码不一致'
        }
    })

    updatePwd()

    function updatePwd() {
        $('#formUpdatePWD').submit(function (e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/my/updatepwd',
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    // 重置表单
                    // $('#formUpdatePWD [type=password]').val('')
                    $('#formUpdatePWD')[0].reset()

                }
            })
        })
    }
})