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
}