
//Log in
function adminLogin() {
    //获取用户输入
    let username = $("#username").val();
    let pwd = $("#Password").val();
    let url = "/Admin/user/adminLogin";
    let arg = {"username":username,"password":pwd};
    $.post(url,arg,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //Log in成功跳转到主页
            //存sessionStorage
            sessionStorage.setItem("loginAdmin",JSON.stringify(responseEntity.data));
            //跳转主页
            location.href="index.html";
        }else{
            //Log in失败并提示用户
            layer.msg(responseEntity.message);
        }
    })
    return false;
}

//Retrieve password
function findAdminPwd() {
    let name = $("#name").val();
    let workNo = $("#workNo").val();
    let url = "/Admin/user/adminFindPwd";
    let arg = {"username":name,"id":workNo};
    $.post(url,arg,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //找回成功跳转到主页
            //展示给用户
            layer.confirm('您的密码是：'+responseEntity.data, {
                btn: ['确定'] //按钮
            },function(){
                //跳转Log in页面
                location.href="login.html";
            });
        }else{
            //Log in失败并提示用户
            layer.msg(responseEntity.message);
        }
    })
    return false;
}