$(function () {
    let user = JSON.parse(sessionStorage.getItem("loginUser"));
    //是否已经Log in
    //如果已经Log in不允许进入
    if(user != null){
        location.href= "index.html";
    }
})
//用户Log in
function userLogin() {
    //获取用户输入的账号密码
    let username = $("#username").val();
    let password = $("#password").val();
    if(username == null || username == "" || password == null || password == ""){
        $("#error_msg").text("Please enter the information completely");
    }else{
        let url = "/TheCharity/user/userLogin";
        let args = {"username":username,"password":password};
        $.post(url,args,function (responseEntity) {
            //判断是否Log in成功
            if(responseEntity.result == "SUCCESS"){
                //Log in成功
                //将user存入sessionStorage域对象
                sessionStorage.setItem("loginUser",JSON.stringify(responseEntity.data));
                //跳转主页
                location.href="index.html";
            }else{
                //Log in失败
                //回显错误消息
                $("#error_msg").text(responseEntity.message);
            }
        })
    }
    return false;
}
//用户Register
function register() {
    //获取用户输入
    let username = $("#username").val();
    let email = $("#email").val();
    let pwd = $("#pwd").val();
    let pwdAgain = $("#pwdAgain").val();
    let checkCode1 = $("#emailCheckCode").val();
    let checkCode2 = $("#realCheckCode").val();
    if(username == null || username == "" || email == null || email == ""|| pwd == null
        || pwd == ""|| pwdAgain == null || pwdAgain == "" ){
        $("#error_msg").text("Please enter the information completely");
    }else{
        if(pwd == pwdAgain){
                //邮箱验证一致
                //ajax异步交互
                let url = "/TheCharity/user/register";
                let args = {"userName":username,"email":email,"password":pwd};
                $.post(url,args,function (responseEntity) {
                    if(responseEntity.result == "SUCCESS"){
                        //Register成功
                        //跳转Log in页面
                        location.href = "login.html";
                    }else{
                        //Log in失败
                        //回显错误消息
                        $("#error_msg").text(responseEntity.message);
                        //并刷新验证码
                        $("#realCheckCode").val(' ');
                    }
                })

        }else{
            $("#error_msg").text("The two passwords are inconsistent. Please re-enter them");
        }
    }
    return false;
}
//Retrieve password
function findPwd(){
    //获取用户输入
    let username = $("#username").val();
    let email = $("#email").val();
    let checkCode1 = $("#emailCheckCode").val();
    let checkCode2 = $("#realCheckCode").val();
    if(username == null || username == "" || email == null || email == "" ){
        $("#error_msg").text("Please enter the information completely");
    }else{
        alert(checkCode2)

            //发送请求看是否存在该用户并验证邮箱是否与该用户邮箱一致
            let url = "/TheCharity/user/findPwd";
            let args = {"username":username,"email":email};
            $.post(url,args,function (responseEntity) {
                if(responseEntity.result == "SUCCESS"){
                    //存在该用户并邮箱一致
                    //显示该用户密码
                    $("#tipMsg").text("恭喜您！！成功Retrieve password！！");
                    $("#findPwdForm").attr("style","display:none");
                    $("#returnLogin").attr("style","display:block");
                    $("#tipMsg").after("<br/><br/><p>您的密码为："+responseEntity.data+"</p><br/>")
                }else{
                    //找回失败
                    //回显错误消息
                    $("#error_msg").text(responseEntity.message);
                    //并刷新验证码
                    $("#realCheckCode").val(' ');
                }
            })
    }
    return false;
}


//获取验证码
function getCheckCode() {
    //获取邮箱
    let email = $("#email").val();
    //验证邮箱
    let reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
    let flag = reg.test(email);
    if(flag){
        timeBtn($("#getCode").get(0),60);
        //让后端发送邮件并获取验证码回显表单
        let url = "/TheCharity/user/sendCheckCode";
        let args = {"email":email};
        $.post(url,args,function (responseEntity) {
            if(responseEntity.result == "SUCCESS"){
                //发送成功
                //回显验证码
                layer.msg("The verification code is sent successfully. Procedure");
                $("#realCheckCode").val(responseEntity.data);
            }else{
                //显示错误信息
                layer.msg(responseEntity.message);
            }
        })
    }else{
        layer.msg("Email format is not correct, please re-enter to obtain verification code!!");
    }
}
//防止用户一直点击获取验证码
function timeBtn(e,waitTime) {
    if(waitTime === 0){
        e.disabled = false;
        e.innerHTML = '获取验证码';
        waitTime = 60;
    }else{
        e.disabled = true;
        e.innerHTML = waitTime + '秒后再点击';
        waitTime--;
        setTimeout(function () {
            timeBtn(e,waitTime);
        },1000)
    }
}


