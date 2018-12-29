function f() {
    //密码重置
    $(".login_btn").click(function(){
        var arr = new Array();
        $('.el-input__inner').each(function(){
            arr.push($(this).val());
        });
        paw = $.trim(arr[0]);
        restPaw = $.trim(arr[1]);
        if (paw=="" || paw==null || restPaw=="" || restPaw==null) {
            vm.$message({
                showClose: true,
                message: '密码不能为空，请重新填写',
                type: 'warning'
            });
        }else {
            var user = new Object();
            user.paw = paw;
            user.restPaw = restPaw;
            //就进行 ajax 异步提交
            $.ajax({
                type:"POST",  //提交方法是POST
                url:'http://apibeta.e-elitech.cn/apiUserAction.do?method=newPassword', //请求的路径
                data:{user:JSON.stringify(user)}, //以JSON字符串形式把 user 传到后台
                dataType:'json', //后台返回的数据类型是html文本
                timeout:1000,  //请求超时时间，毫秒
                error:function(){  //请求失败的回调方法
                    vm.$message({
                        showClose: true,
                        message: '请求失败！请重试',
                        type: 'error'
                    });
                },
                success:function(result){   //请求成功的回调方法
                    if(result.success){
                        //若登录成功，跳转到"forgetok.html"
                        window.location.href='forgetok.html';
                    }else{
                        vm.$message({
                            showClose: true,
                            message: result.result,
                            type: 'error'
                        });
                    }
                },
                complete : function(XMLHttpRequest,status) { //请求完成后最终执行参数
                    if (status == 'timeout') {//超时,status还有success,error等值的情况
                        ajaxTimeoutTest.abort();
                        vm.$message({
                            showClose: true,
                            message: '超时！请重试',
                            type: 'error'
                        });
                    }
                }
            });
        }
    });
}