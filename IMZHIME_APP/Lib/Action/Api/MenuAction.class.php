<?php
class MenuAction extends CommonAction {
    public function _initialize() {
        parent::_initialize();
    }

    public function get_all_tree_menus($user_id = false) {
        $where['status'] = '1';
        $cate_id = I('post.cate_id', 0, 'intval');
        $cate_id > 0 && $where['cate_id'] = $cate_id;

        // 用户拥有权限的菜单ID
        if ($user_id && 'EXTRA_ROOT' !== I('post.type')) {
            $menu_ids = M('AuthGroup')->where('id=%d', $user_id)->getField('menu_rules');
            $where['menu_id'] = array('in', $menu_ids);
        }

        $field = array('menu_id' => 'id', 'title' => 'text', 'parent_id',
            'cate_id', 'url', 'type', 'state');
        $data = M('Menu')->field($field)->where($where)
            ->order('`parent_id` ASC,`order` ASC,`cate_id` ASC,`menu_id` ASC')->select();
        list($data, $children) = $this->get_parents_children($data);
        foreach ($children as $c) {
            $this->format_tree_menus($data, $c);
        }
        $this->unset_unused_item($data);

        // 供编辑菜单列表的combotree使用
        'EXTRA_ROOT' === I('post.type') && array_unshift($data, array(
            'id' => 0, 'text' => '根结点', 'iconCls' => 'icon-help'
        ));
        json_return($data);
    }

    public function get_tree_menus() {
        $user_id = isset(self::$user) ? self::$user['user_id'] : 6;
        $this->get_all_tree_menus($user_id);
    }

    private function format_tree_menus(&$data, $new) {
        foreach ($data as $k => &$v) {
            if ($v['id'] === $new['parent_id']) {
                $data[$k]['children'][] = $new;
                break;
            } else if (isset($v['children'])) {
                $this->format_tree_menus($v['children'], $new);
            }
        }
    }

    /**
     * 去掉tree json数据中不需要的cate_id,parent_id...属性，加入attributes属性
     */
    private function unset_unused_item(&$data) {
        foreach ($data as $k => &$v) {
            if (isset($v['children'])) {
                $this->unset_unused_item($v['children']);
            } else {
                unset($v['state']);
                if ('null' !== $v['type']) {
                    $v['attributes'] = array('url' => $v['url'], 'type' => $v['type']);
                }
            }
            unset($v['url'], $v['type'], $v['parent_id']);
        }
    }

    public function get_treegrid_menus() {
        $where = array();
        $where['cate_id'] = I('post.cate_id', 0, 'intval');
        $data = M('Menu')->where($where)
            ->order('`parent_id` ASC,`order` ASC,`menu_id` ASC')
            ->select();
        list($data, $children) = $this->get_parents_children($data);
        foreach ($children as $c) {
            $this->format_treegird_menus($data, $c);
        }
        json_return($data);
    }

    // 返回array(菜单的根结点,子结点)
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

    private function format_treegird_menus(&$data, $new) {
        foreach ($data as $k => &$v) {
            if ($v['menu_id'] === $new['parent_id']) {
                $data[$k]['children'][] = $new;
                break;
            } else if (isset($v['children'])) {
                $this->format_treegird_menus($v['children'], $new);
            }
        }
    }

    public function edit() {
        $menu_id = I('post.menu_id', 0, 'intval');
        $parent_id = I('post.parent_id', 0, 'intval');
        $title = I('post.title', '', 'trim');
        $name = I('post.name', '', 'trim');
        $url = I('post.url', '', 'trim');

        $m = M('Menu');
        if ($menu_id <= 0 || !$m->where('menu_id=%d', $menu_id)->count()) {
            $this->ajaxReturn(null, '无此菜单项', 0);
        }

        if (false !== $m->where('menu_id=%d', $menu_id)->save(array(
            'parent_id' => $parent_id,
            'title' => $title,
            'name' => $name,
            'url' => $url,
            'order' => I('post.order', 0, 'intval'),
            'type' => I('post.type'),
            'state' => I('post.state'),
            'status' => I('post.status'),
            'cate_id' => I('post.cate_id'),
            'cate_name' => I('post.cate_name')
        ))) {
            $this->ajaxReturn(null, '编辑菜单项成功', 1);
        } else {
            $this->ajaxReturn(null, '编辑菜单项失败', 0);
        }
    }

    public function add() {
        // $menu_id = I('post.menu_id', 0, 'intval');
        $parent_id = I('post.parent_id', 0, 'intval');
        $title = I('post.title', '', 'trim');
        $name = I('post.name', '', 'trim');
        $url = I('post.url', '', 'trim');

        if (!M('Menu')->add(array(
            'parent_id' => $parent_id,
            'title' => $title,
            'name' => $name,
            'url' => $url,
            'order' => I('post.order', 0, 'intval'),
            'type' => I('post.type'),
            'state' => I('post.state'),
            'status' => I('post.status'),
            'cate_id' => I('post.cate_id'),
            'cate_name' => I('post.cate_name')
        ))) {
            echo M()->_sql();
            $this->ajaxReturn(null, '添加菜单项失败', 0);
        }
        $this->ajaxReturn(null, '添加菜单项成功', 1);
    }

    public function delete() {
        $menu_id = I('post.menu_id', 0, 'intval');

        if ($menu_id <= 0) {
            $this->ajaxReturn(null, '无此菜单项', 0);
        }
        if (false === M('Menu')->where('menu_id=%d', $menu_id)->delete()) {
            $this->ajaxReturn(null, '删除菜单项失败', 0);
        }
        $this->ajaxReturn(null, '删除菜单项成功', 1);
    }

    public function get_menu_auth() {
        $menu_id = I('post.menu_id', 0, 'intval');

        if ($menu_id <= 0) {
            datagrid_return(array());
        }

        $auths = M()->table('z_menu_auth a')
            ->join('z_auth_rule r on r.id=a.auth_id')
            ->field('a.menu_id,a.auth_id,r.name,r.title')
            ->where('menu_id=%d', $menu_id)->select();
        $auths || $auths = array();
        datagrid_return($auths);
    }

    /**
     * 批量添加菜单的权限。若有重复则不添加。
     */
    public function add_menu_auth() {
        $menu_id = I('post.menu_id', 0, 'intval');
        $auth_ids = I('post.auth_ids', '');
        $status = I('post.status', 1, 'intval');

        if ($menu_id <= 0 || !$auth_ids) {
            $this->ajaxReturn(null, 'not access', 0);
        }

        $m = M('MenuAuth');
        foreach ($auth_ids as $v) {
            if (!$m->where('menu_id=%d AND auth_id=%d', $menu_id, $v)->count()) {
                if (!$m->add(array(
                    'menu_id' => $menu_id,
                    'auth_id' => $v,
                    'status' => $status,
                ))) {
                    $this->ajaxReturn(null, '添加菜单对应的权限失败', 0);
                }
            }
        }
        $this->ajaxReturn(null, '添加菜单对应的权限成功', 1);
    }

    public function del_menu_auth() {
        $menu_id = I('post.menu_id', 0, 'intval');
        $auth_id = I('post.auth_id', 0, 'intval');

        if ($menu_id <= 0 || $auth_id <= 0) {
            $this->ajaxReturn(null, 'not access', 0);
        }

        if (false === M('MenuAuth')->where('menu_id=%d AND auth_id=%d', $menu_id, $auth_id)
            ->delete()) {
            $this->ajaxReturn(null, '删除菜单对应的权限失败', 0);
        }
        $this->ajaxReturn(null, '删除菜单对应的权限成功', 1);
    }
}
