$(() => {
    var layer = layui.layer
    $('#form_register').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) return layer.msg(res.message);
                layer.msg(res.message + '请登录');
                setTimeout(() => {
                    $('#link_login').click()
                }, 2000)
            }
        })
    })
})
