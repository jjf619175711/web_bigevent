$(function () {

    var layer = layui.layer
    var form = layui.form

    // 调用 initArtCateList 获取文章分类列表函数
    initArtCateList()

    // 获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexAdd = null
    // 点击出现弹出层
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
        })
    })
    // 添加分类
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg(res.message)
                layer.close(indexAdd)
            }
        })
    })

    // 点击 弹出修改弹出层
    var indexEdit = null
    $('tbody').on('click', '#btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')

        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('form-edit', res.data)
            }
        })
    })
    // 提交修改文章分类
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg(res.message)
                layer.close(indexEdit)
            }
        })
    })
    // 删除文章分类
    $('body').on('click', '#btn-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除吗？',{icon:3,title:'提示'},function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg(res.message)
                    }
                    initArtCateList()
                    layer.msg(res.message)
                    layer.close(index)
                }
            })
        })
    })
})