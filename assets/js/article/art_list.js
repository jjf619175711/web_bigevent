$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    // 定义文章查询参数q ，后面请求是将提交这些参数给服务器
    var q = {
        pagenum: 1, //	页码值
        pagesize: 2,//每页显示多少条数据
        cate_id: '',//文章分类的 Id
        state: ''//文章的状态，可选值有：已发布、草稿
    }
    // 定义格式化时间过滤器
    template.defaults.imports.dateFormat = function () {
        var dt = new Date()

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getDate())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
    // 定义时间补零函数
    function padZero(n) {
        return n < 10 ? '0' + n : n
    }

    initArtTable()
    initCate()
    // 获取文章列表
    function initArtTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    // 初始化文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    // 根据条件筛选文章
    $('#form-search').submit(function (e) {
        // 阻止表单默认提交动作
        e.preventDefault()
        // 将表单中的值赋值给q查询对象中的相关参数
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        initArtTable()
    })

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',  //分页容器ID
            count: total,  //	数据总数
            limit: q.pagesize,  //每页显示的条数
            curr: q.pagenum,  //起始页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候调用 jump 回调函数
            // 出发jump回调有两种凡是方式
            // 1.点击页码的时候,触发 jump 回调函数
            // 2.只要调用了 laypage.render() 就会触发 jump 函数
            jump: function (obj, first) {
                // 更具最新的页码值获取文章列表数据
                q.pagenum = obj.curr
                // 把最新的每页条目数赋值给 q 查询参数对象中的 pagesize 属性
                q.pagesize = obj.limit
                // 可以通过 first 来判断通过那种方式触发了jump函数
                // 如果 first 为 true 就是第2种方式,如果是 undefined 则是第1种方式
                if (!first) {
                    initArtTable()
                }
            }
        })
    }

    // 点击删除按钮删除文章
    $('body').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除嘛?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    layer.close(index)
                    // 删除文章后需要判断当前页有没有剩余的文章
                    // 如果没有,页码值需要减1
                    if ($('.btn-delete').length === 1) {
                        // 页码值最小必须是1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }

                    initArtTable()
                }

            })
        })
    })


})