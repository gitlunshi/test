function f() {


    var btns = $('button');
    //循环遍历所有的按钮，一个一个添加事件绑定

    //验证码获取
    btns[0].onclick = function () {
        var arr = new Array();
        $('.el-input__inner').each(function () {
            arr.push($(this).val());
        });
        textEmail = $.trim(arr[0]);
        if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(textEmail) == false || textEmail == '') {
            vm.$message({
                showClose: true,
                message: '邮箱错误，请重新填写',
                type: 'warning'
            });
        } else {
            var user = new Object();
            user.textEmail = textEmail;
            //就进行 ajax 异步提交
            $.ajax({
                type: "POST",  //提交方法是POST
                url: 'test_forgetpassword.php', //请求的路径
                data: {user: JSON.stringify(user)}, //以JSON字符串形式把 user 传到后台
                dataType: 'json', //后台返回的数据类型是json文本
                timeout: 1000,  //请求超时时间，毫秒
                error: function () {  //请求失败的回调方法
                    vm.$message({
                        showClose: true,
                        message: '请求失败！请重试',
                        type: 'error'
                    });
                },
                success: function (result) {   //请求成功的回调方法
                    if (result.success) {
                        vm.$message({
                            showClose: true,
                            message: '获取验证码已发送，请注意查收',
                            type: 'success'
                        });
                    } else {
                        vm.$message({
                            showClose: true,
                            message: '获取验证码失败！请重试',
                            type: 'error'
                        });
                    }
                },
                complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                    if (status == 'timeout') {//超时,status还有success,error等值的情况
                        vm.$message({
                            showClose: true,
                            message: '请求超时！请重试',
                            type: 'warning'
                        });
                    }
                }
            });
        }
    };

    //邮箱/验证码验证
    btns[1].onclick = function () {
        var arr = new Array();
        $('.el-input__inner').each(function () {
            arr.push($(this).val());
        });
        var info = new Object();
        info.email = $.trim(arr[0]);
        info.emailCode = $.trim(arr[1]);

        //前台的非空验证
        if (info.email == "" || info.email == null || info.emailCode == "" || info.emailCode == null) {
            vm.$message({
                showClose: true,
                message: '邮箱/验证码不能为空',
                type: 'warning'
            });
        } else {
            //如果账号和密码都不为空，就进行 ajax 异步提交
            $.ajax({
                type: 'POST',  //提交方法是POST
                url: 'http://apibeta.e-elitech.cn/apiUserAction.do?method=newPassword', //请求的路径
                data: {info: JSON.stringify(info)}, //以JSON字符串形式把 user 传到后台
                dataType: 'json', //后台返回的数据类型是json文本
                timeout: 1000,  //请求超时时间，毫秒
                error: function () {  //请求失败的回调方法
                    vm.$message({
                        showClose: true,
                        message: '请求失败！请重试',
                        type: 'error'
                    });
                },
                success: function (result) {   //请求成功的回调方法
                    if (result.success) {
                        //若登录成功，跳转到"xxx.html"
                        window.location.href = 'forgetpassword1.html';
                    } else {
                        vm.$message({
                            showClose: true,
                            message: '验证失败！请重试',
                            type: 'error'
                        });
                    }
                }
            });
        }
    }
}
