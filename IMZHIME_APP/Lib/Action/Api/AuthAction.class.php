<?php
class AuthAction extends CommonAction {
    public function _initialize() {
        parent::_initialize();

        if (!action_check_auth(__CLASS__)) { // 检查权限
            if ($this->isAjax()) {
                $this->ajaxReturn(null, 'not access', 0);
            } else {
                exit('not access');
            }
        }
    }

    public function get_auth_group() {
        $page = I('post.page', 1, 'intval');
        $rows = I('post.rows', 10, 'intval');
        $sort = I('post.sort', 'id');
        $order = I('post.order', 'ASC');

        $where = array();

        $count = 0;
        $groups = array();

        if ($count = M()->table('z_auth_group')->where($where)->count()) {
            $groups = M()->table('z_auth_group')
                ->field('*')
                ->where($where)
                ->order("$sort $order")
                ->limit(($page-1)*$rows, $rows)
                ->select();
        }
        datagrid_return($groups, $count);
    }

    public function get_auth_rule() {
        $page = I('post.page', 1, 'intval');
        $rows = I('post.rows', 10, 'intval');
        $sort = I('post.sort', 'id');
        $order = I('post.order', 'ASC');

        $where = array();

        $count = 0;
        $rules = array();

        if ($count = M()->table('z_auth_rule')->where($where)->count()) {
            $rules = M()->table('z_auth_rule')
                ->where($where)
                ->order("$sort $order")
                ->limit(($page-1)*$rows, $rows)
                ->select();
        }
        datagrid_return($rules, $count);
    }

    public function add_auth_group() {
        $title = I('post.title');
        $status = I('post.status', 0, 'intval');

        if (M('AuthGroup')->add(array(
            'title' => $title,
            'status' => $status,
        ))) {
            $this->ajaxReturn(null, '新增用户组成功', 1);
        }
        $this->ajaxReturn(null, '新增用户组失败', 0);
    }

    public function edit_auth_group() {
        $id = I('post.id', 0, 'intval');
        $title = I('post.title');
        $status = I('post.status', 0, 'intval');

        if ($id <= 0) {
            $this->ajaxReturn(null, 'not access', 0);
        }

        if (false !== M('AuthGroup')->where('id=%d', $id)->save(array(
            'title' => $title,
            'status' => $status,
        ))) {
            $this->ajaxReturn(null, '编辑用户组成功', 1);
        }
        $this->ajaxReturn(null, '编辑用户组失败', 0);
    }

    public function del_auth_group() {
        $id = I('post.id', 0, 'intval');
        if (!M('AuthGroup')->where('id=%d', $id)->delete()) {
            $this->ajaxReturn(null, '删除用户组失败', 0);
        } else {
            $this->ajaxReturn(null, '删除用户组成功', 1);
        }
    }

    public function do_auth_rule() {
        $id = I('post.id', 0, 'intval');
        $name = I('post.name');
        $title = I('post.title');
        $condition = I('post.condition', '');
        $status = I('post.status', 0, 'intval');

        if ($id > 0) {
            $this->edit_auth_rule($id, $name, $title, $condition, $status);
        } else {
            $this->add_auth_rule($name, $title, $condition, $status);
        }
    }

    private function edit_auth_rule($id, $name, $title, $condition, $status) {
        if (false !== M('AuthRule')->where('id=%d', $id)->save(array(
            'name' => $name,
            'title' => $title,
            'condition' => $condition,
            'status' => $status,
        ))) {
            $this->ajaxReturn(null, '编辑权限规则成功', 1);
        } else {
            $this->ajaxReturn(null, '编辑权限规则失败', 0);
        }

    }

    private function add_auth_rule($name, $title, $condition, $status) {
        if (M('AuthRule')->add(array(
            'name' => $name,
            'title' => $title,
            'condition' => $condition,
            'status' => $status,
        ))) {
            $this->ajaxReturn(null, '新增权限规则成功', 1);
        } else {
            $this->ajaxReturn(null, '新增权限规则失败', 0);
        }
    }

    public function del_auth_rule() {
        $id = I('post.id', 0, 'intval');
        if (!M('AuthRule')->where('id=%d', $id)->delete()) {
            $this->ajaxReturn(null, '删除权限规则失败', 0);
        } else {
            $this->ajaxReturn(null, '删除权限规则成功', 1);
        }
    }

    public function get_auth_group_access() {
        $page = I('post.page', 1, 'intval');
        $rows = I('post.rows', 10, 'intval');
        $sort = I('post.sort', 'uid');
        $order = I('post.order', 'ASC');

        $where = array();

        $count = 0;
        $accesses = array();

        if ($count = M()->table('z_auth_group_access')->where($where)->group('uid')->count()) {
            $accesses = M()->table('z_auth_group_access a')
                ->join('z_user u on u.user_id=a.uid')
                ->join('z_auth_group g on g.id=a.group_id')
                ->field('a.uid,u.user_name,GROUP_CONCAT(CAST(a.group_id AS CHAR) ORDER BY a.group_id ASC) AS group_ids,GROUP_CONCAT(CAST(g.title AS CHAR) ORDER BY g.title ASC) AS group_names')
                ->where($where)
                ->group('a.uid')
                ->order("$sort $order")
                ->limit(($page-1)*$rows, $rows)
                ->select();
        }
        // "SELECT a.uid,u.username,GROUP_CONCAT(CAST(a.group_id AS CHAR) ORDER BY a.group_id ASC) AS group_ids,GROUP_CONCAT(CAST(g.title AS CHAR) ORDER BY g.title ASC) AS group_names
        // FROM z_auth_group_access a
        // LEFT JOIN z_user u ON u.uid=a.uid
        // LEFT JOIN z_auth_group g ON g.id=a.group_id
        // GROUP BY a.uid";
        datagrid_return($accesses, $count);
    }

    public function do_auth_group_access() {
        $uid = I('post.uid', 0, 'intval');
        $group_ids = I('post.group_id', array());
        foreach ($group_ids as $k => $v) {
            $add_data[$k]['uid'] = $uid;
            $add_data[$k]['group_id'] = $v;
        }

        $m = M('AuthGroupAccess');
        if (false !== $m->where('uid=%d', $uid)->delete() && !$m->addAll($add_data)) {
            $this->ajaxReturn(null, '编辑用户组明细成功', 1);
        } else {
            $this->ajaxReturn(null, '编辑用户组明细失败', 0);
        }
    }

    public function add_auth_group_access() {
        $username = I('post.username', '', 'trim');
        $group_ids = I('post.group_id', array());

        if (!$uid = M('User')->where('username="%s"', $username)->getField('uid')) {
            $this->ajaxReturn(null, '不存在此用户', 0);
        }

        if (M()->table('z_auth_group_access a')
            ->join('z_user u on u.uid=a.uid')
            ->where('u.username="%s"', $username)->count()) {
            $this->ajaxReturn(null, '已存在此用户组明细', 0);
        }

        foreach ($group_ids as $g) {
            if (!M('AuthGroupAccess')->add(array(
                'uid'=>$uid,
                'group_id' => $g
            ))) {
                $this->ajaxReturn(null, '添加此用户组明细失败', 0);
            }
        }
        $this->ajaxReturn(null, '添加此用户组明细成功', 1);
    }

    public function edit_auth_group_access() {
        $uid = I('post.uid', 0, 'intval');
        $group_ids = I('post.group_id', array());

        $m = M('AuthGroupAccess');
        if (!$m->where('uid=%d', $uid)->count()) {
            $this->ajaxReturn(null, '不存在此用户组明细', 0);
        }

        if (false === $m->where('uid=%d', $uid)->delete()) {
            $this->ajaxReturn(null, '编辑此用户组明细失败', 0);
        } else {
            foreach ($group_ids as $g) {
                if (!$m->add(array(
                    'uid'=>$uid,
                    'group_id' => $g
                ))) {
                    $this->ajaxReturn(null, '编辑此用户组明细失败', 0);
                }
            }
        }
        $this->ajaxReturn(null, '编辑此用户组明细成功', 1);
    }

    public function del_auth_group_access() {
        $uid = I('post.uid', 0, 'intval');
        if ($uid > 0 && M('AuthGroupAccess')->where('uid=%d', $uid)->delete()) {
            $this->ajaxReturn(null, '删除用户组明细成功', 1);
        } else {
            $this->ajaxReturn(null, '删除用户组明细失败', 0);
        }
    }

    public function combotree_auth_group() {
        $groups = M('AuthGroup')->field('id,title as text')->where('status<5')->select();
        json_return($groups);
    }

    // 获取用户组对应的普通权限
    public function get_group_normal_auth() {
        $id = I('id', 0, 'intval');
        if ($id <= 0) {
            datagrid_return(array());
        }

        $data = array();
        $rules = M('AuthGroup')->where('id=%d', $id)->getField('rules');
        $rules && $data = M('AuthRule')->field('*')->where("id IN (%s)", $rules)->select();
        datagrid_return($data);
    }

    // 获取用户组对应的菜单权限
    public function get_group_menu_auth() {
        $id = I('post.menu_id', 0, 'intval');
        $data = array();
        if ($id <= 0) {
            datagrid_return($data);
        }

        $menu_rules = M('AuthGroup')->where('id=%d', $id)->getField('menu_rules');
        if ($menu_rules) {
            $data = M('Menu')->field('menu_id,parent_id,title,url')->where("menu_id IN (%s)", $menu_rules)->select();
            if ($data) {
                list($data, $children) = $this->get_parents_children($data);
                foreach ($children as $c) {
                    $this->format($data, $c);
                }
            }
        }
        // var_dump($data);exit;
        datagrid_return($data);
    }

    private function get_parents_children($data) {
        $parents = array();
        foreach ($data as $k => $v) {
            if ($v['parent_id'] === '0') {
                unset($data[$k]);
                $parents[] = $v;
            }
        }
        return array($parents, $data);
    }

    private function format(&$data, $new) {
        foreach ($data as $k => &$v) {
            if ($v['menu_id'] === $new['parent_id']) {
                $data[$k]['children'][] = $new;
                break;
            } else if (isset($v['children'])) {
                $this->format($v['children'], $new);
            }
        }
    }

    public function edit_normal_auth() {
        $id = I('post.id', 0, 'intval');
        $rules = I('post.rules');
        if ($id <= 0) {
            $this->ajaxReturn(null, 'not access', 0);
        }
        if (false !== M('AuthGroup')->where('id=%d', $id)
            ->setField('rules', $rules)) {
            $this->ajaxReturn(null, '编辑普通权限成功', 1);
        }
        $this->ajaxReturn(null, '编辑普通权限失败', 0);
    }

    public function edit_menu_auth() {
        $id = I('post.id', 0, 'intval');
        $menu_rules = I('post.menu_rules');
        if ($id <= 0) {
            $this->ajaxReturn(null, 'not access', 0);
        }
        if (false !== M('AuthGroup')->where('id=%d', $id)
            ->setField('menu_rules', $menu_rules)) {
            $this->ajaxReturn(null, '编辑菜单权限成功', 1);
        }
        $this->ajaxReturn(null, '编辑菜单权限失败', 0);
    }
}
