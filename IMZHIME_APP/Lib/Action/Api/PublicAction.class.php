<?php
class PublicAction extends Action {
    // public function _initialize() {
    //     parent::_initialize();
    // }

    public function sign_in() {
        $user_name = I('post.user_name');
        $password = I('post.password');
        $vcode = I('post.vcode');

        if (session('vcode') != md5($vcode)) {
            $this->ajaxReturn(null, '验证码不正确', 0);
        }

        $user_info = M('User')->where('user_name="%s"', $user_name)->field('user_id,password')->find();
        if (!$user_info || $user_info['password'] != md5($password)) {
            $this->ajaxReturn(null, '用户名或密码不正确', 0);
        }

        $this->login_mark($user_info['user_id'], $user_name);
        $this->ajaxReturn(__ROOT__, '登陆成功', 1);
    }

    public function sign_up() {
        $user_name = I('post.user_name');
        $password = I('post.password');
        $repassword = I('post.repassword');
        $email = I('post.email', '', 'email');
        $birthday = I('post.birthday', 0);
        $vcode = I('post.vcode');

        if (session('vcode') != md5($vcode)) {
            $this->ajaxReturn(null, '验证码不正确', 0);
        }
        if (!is_user_name($user_name)) {
            $this->ajaxReturn(null, '用户名在2-20位之间，由字母或者数字组成', 0);
        }
        if (R('User/username_exists', array($user_name))) {
            $this->ajaxReturn(null, '用户名已存在，请另取', 0);
        }
        if (!is_password($password)) {
            $this->ajaxReturn(null, '密码在4-20位之间，且不能包含空格', 0);
        }
        if ($password != $repassword) {
            $this->ajaxReturn(null, '重复密码不一致', 0);
        }
        // if (!$email) {
        //     $this->ajaxReturn(null, '电子邮件格式不正确', 0);
        // }
        // if (!$birthday) {
        //     $this->ajaxReturn(null, '生日格式不正确', 0);
        // }

        $time = time();
        $ip = sprintf('%u', get_client_ip(1));
        if (!$user_id = M('User')->add(array(
            'user_name' => $user_name,
            'password' => md5($password),
            'email' => $email,
            'birthday' => $birthday,
            'reg_time' => $time,
            'last_login' => $time,
            'reg_ip' => $ip,
            'last_ip' => $ip,
            'log_num' => 0,
        ))) {
            $this->ajaxReturn(null, '注册会员失败', 0);
        }

        $this->login_mark($user_id, $user_name);
        $this->ajaxReturn(__ROOT__, '登陆成功', 1);
    }

    public function log_out() {
        $this->logout_mark();
        $this->ajaxReturn(__ROOT__, '注销成功', 1);
    }

    public function set_theme() {
        $theme = I('post.theme');
        $user = session('user');
        if ($user) {
            M('User')->where('user_id=%d', $user['user_id'])->setField('theme', $theme);
        } else {
            cookie('theme', $theme, 30);
        }
        $this->ajaxReturn(null, "主题已修改为[{$theme}]", 1);
    }

    private function login_mark($user_id, $user_name) {
        session('user', array(
            'user_id' => $user_id,
            'user_name' => $user_name,
        ));
        M('User')->where('user_id=%d', $user_id)->save(array(
            'log_num' => array('exp', 'log_num+1'),
            'last_login' => time(),
            'last_ip' => sprintf('%u', get_client_ip(1)),
        ));
    }

    private function logout_mark() {
        session('user', null);
    }
}