function f() {
    //页面跳转
    $('a').each(function(){
        if($(this).index()==0){
            $(this).bind("click",function(){
                window.location.href='forgetpassword.html';
            });
        }else{
            $(this).bind("click",function(){
                window.location.href='register.html';
            });
        }
    });

    //登陆验证
    $(".login_btn").click(function() {
        var arr = new Array();
        $('.el-input__inner').each(function(){
            arr.push($(this).val());
        });

        var userName = $.trim(arr[0]);
        var passWord = $.trim(arr[1]);

        //前台的非空验证
        if(userName == "" || userName == null){
            vm.$message({
                showClose: true,
                message: '对不起，登录账号不能为空',
                type: 'warning'
            });
        }else if(passWord == "" || passWord == null){
            vm.$message({
                showClose: true,
                message: '对不起，登录密码不能为空',
                type: 'warning'
            });
        }else{
            //如果账号和密码都不为空，就进行 ajax 异步提交
            $.ajax({
                type:'POST',  //提交方法是POST
                url:'http://apibeta.e-elitech.cn/apiLoginAction.do?method=glogin', //请求的路径
                data:{username:userName,
                    password:passWord,
                },
                dataType:'json', //后台返回的数据类型是json文本
                timeout:1000,  //请求超时时间，毫秒
                error:function(){  //请求失败的回调方法
                    vm.$message({
                        showClose: true,
                        message: '请求失败！请重试',
                        type: 'error'
                    });
                },
                success:function(result){   //请求成功的回调方法
                    if(result.success ){
                        //若登录成功，跳转到"index.html"
                        window.location.href='index.html';
                    }else{
                        vm.$message({
                            showClose: true,
                            message: '登录失败！请重试',
                            type: 'error'
                        });
                    }
                }
            });
        }
    });
}