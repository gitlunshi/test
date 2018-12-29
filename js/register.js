function f() {
    //注册验证
    $(".login_btn").click(function(){

        var arr = new Array();
        $('.el-input__inner').each(function(){
            arr.push($(this).val());
        });

       var companyName = $.trim(arr[0]);
       var firstName = $.trim(arr[1]);
       var lastName = $.trim(arr[2]);
       var phone = $.trim(arr[3]);
       var email = $.trim(arr[4]);

        //前台的非空验证
        if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email) == false || email == '' || email == null) {
            vm.$message({
                showClose: true,
                message: '邮箱错误，请重新填写',
                type: 'warning'
            });
        } else
        {
            if(/^1[34578]\d{9}$/.test(phone) == false || phone == null) {
                vm.$message({
                    showClose: true,
                    message: '手机号错误，请重新填写',
                    type: 'warning'
                });
            }else {
                if(companyName == null || firstName == null || lastName == null){
                    vm.$message({
                        showClose: true,
                        message: '所有选项为必填项，不能为空',
                        type: 'warning'
                    });
                }else {
                    var username = lastName.toString()+firstName.toString();
                    var data = "username="+username+"&authcode=0000"+"&email="+email+"&password="+username+"&source=0"+"&company.name="+companyName;
                    //进行 ajax 异步提交
                    $.ajax({
                        type: 'POST',  //提交方法是POST
                        url: 'http://apibeta.e-elitech.cn/apiLoginAction.do?method=register', //请求的路径
                        data: data,
                        dataType: 'json', //后台返回的数据类型是json文本
                        timeout: 1000,  //请求超时时间，毫秒
                        error: function () {  //请求失败的回调方法
                            vm.$message({
                                showClose: true,
                                message: '注册失败！请核对信息后重试',
                                type: 'error'
                            });
                        },
                        success: function (result) {   //请求成功的回调方法
                            if (result.success) {
                                //若登录成功，跳转到"xxxx.html"
                                window.location.href = 'index.html';
                            } else{
                                vm.$message({
                                    showClose: true,
                                    message: result.result,
                                    type: 'error'
                                });
                            }
                        }
                    });
                }
            }
        }
    });
    //页面跳转
    $('a').click(function () {
        window.location.href='login.html';
    });
}