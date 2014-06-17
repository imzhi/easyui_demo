<?php
class UserAction extends CommonAction {
    public function _initialize() {
        parent::_initialize();
    }

    public function get_users() {
        $page = I('post.page', 1, 'intval');
        $rows = I('post.rows', 10, 'intval');
        $sort = I('post.sort', 'user_id');
        $order = I('post.order', 'ASC');
        $username = I('post.username', '', 'trim');
        $user_type = I('post.user_type', '');
        $status =I('post.status', '');

        $where = array();
        $user_type && $where['u.user_type'] = $user_type;
        $status && $where['u.status'] = $status;
        $username && $where['u.username'] = array('LIKE', '%'.$username.'%');

        $count = 0;
        $users = array();
        $m = M('User');

        if ($count = $m->where($where)->count()) {
            $users = $m->field('*')
                ->where($where)
                ->order("$sort $order")
                ->limit(($page-1)*$rows, $rows)
                ->select();
            foreach ($users as $k => $v) {
                $users[$k]['last_login'] = date('Y-m-d H:i', $v['last_login']);
                $users[$k]['reg_time'] = date('Y-m-d H:i', $v['reg_time']);
                $users[$k]['reg_ip'] = long2ip($v['reg_ip']);
            }
        }
        datagrid_return($users, $count);
    }

    public function save() {
        $user_id = I('post.user_id', 0, 'intval');
        $user_type = I('post.user_type');
        $status = I('post.status');
        M('User')->where('user_id=%d', $user_id)->save(array(
            'user_type' => $user_type,
            'status' => $status,
        ));
    }


    public function change_password() {
        $rawpassword = I('post.rawpassword');
        $password = I('post.password');
        $repassword = I('post.repassword');

        if (md5($rawpassword) !=
            M('User')->where('user_id=%d', self::$user['user_id'])
            ->getField('password')) {
            $this->ajaxReturn(null, '原密码不正确', 0);
        }
        if (!is_password($password)) {
            $this->ajaxReturn(null, '密码在4-20位之间，且不能包含空格', 0);
        }
        if ($password != $repassword) {
            $this->ajaxReturn(null, '重复密码不一致', 0);
        }

        if (false === M('User')->where('user_id=%d', self::$user['user_id'])->setField('password', md5($password))) {
            $this->ajaxReturn(null, '修改密码失败', 0);
        }
        $this->ajaxReturn(null, '修改密码成功', 1);
    }

    public function user_name_exists($user_name = '') {
        $user_name = $user_name ? $user_name : I('post.user_name', '');
        $exists = M('User')->where('user_name="%s"', $user_name)->count() ? true : false;
        json_return($exists);
    }

    public function user_name_not_exists($user_name = '') {
        $user_name = $user_name ? $user_name : I('post.user_name', '');
        $exists = M('User')->where('user_name="%s"', $user_name)->count() ? false : true;
        json_return($exists);
    }
}