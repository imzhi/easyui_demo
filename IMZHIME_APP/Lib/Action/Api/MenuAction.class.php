<?php
class MenuAction extends CommonAction {
    public function _initialize() {
        parent::_initialize();
    }

    public function get_tree_menus() {
        $where['status'] = '1';
        $user = session('user');
        $user_id = isset($user['user_id']) ? $user['user_id'] : 6;
        // �û�ӵ��Ȩ�޵Ĳ˵�ID
        if ('EXTRA_ROOT' !== I('get.type')) {
            $menu_ids = M('AuthGroup')->where('id=%d', self::$user['user_id'])->getField('menu_rules');
            $where['menu_id'] = array('in', $menu_ids);
        }

        $field = array('menu_id' => 'id', 'title' => 'text', 'parent_id',
            'cate_id', 'url', 'type', 'state');
        $data = M('Menu')->field($field)->where($where)
            ->order('`parent_id` ASC,`order` ASC,`menu_id` ASC')->select();
        list($data, $children) = $this->get_parents_children($data);
        foreach ($children as $c) {
            $this->format_tree_menus($data, $c);
        }
        $this->unset_unused_item($data);

        // ���༭�˵��б��combotreeʹ��
        'EXTRA_ROOT' === I('get.type') && array_unshift($data, array(
            'id' => 0, 'text' => '�����', 'iconCls' => 'icon-help'
        ));
        json_return($data);
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
     * ȥ��tree json�����в���Ҫ��cate_id,parent_id...���ԣ�����attributes����
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
            unset($v['url'], $v['type'], $v['cate_id'], $v['parent_id']);
        }
    }

    public function get_treegrid_menus() {
        $data = M('Menu')->order('`parent_id` ASC,`order` ASC,`menu_id` ASC')->select();
        list($data, $children) = $this->get_parents_children($data);
        foreach ($children as $c) {
            $this->format_treegird_menus($data, $c);
        }
        json_return($data);
    }

    // ����array(�˵��ĸ����,�ӽ��)
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
            $this->ajaxReturn(null, '�޴˲˵���', 0);
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
        ))) {
            $this->ajaxReturn(null, '�༭�˵���ɹ�', 1);
        } else {
            $this->ajaxReturn(null, '�༭�˵���ʧ��', 0);
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
        ))) {
            echo M()->_sql();
            $this->ajaxReturn(null, '��Ӳ˵���ʧ��', 0);
        }
        $this->ajaxReturn(null, '��Ӳ˵���ɹ�', 1);
    }

    public function delete() {
        $menu_id = I('post.menu_id', 0, 'intval');

        if ($menu_id <= 0) {
            $this->ajaxReturn(null, '�޴˲˵���', 0);
        }
        if (false === M('Menu')->where('menu_id=%d', $menu_id)->delete()) {
            $this->ajaxReturn(null, 'ɾ���˵���ʧ��', 0);
        }
        $this->ajaxReturn(null, 'ɾ���˵���ɹ�', 1);
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
     * ������Ӳ˵���Ȩ�ޡ������ظ�����ӡ�
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
                    $this->ajaxReturn(null, '��Ӳ˵���Ӧ��Ȩ��ʧ��', 0);
                }
            }
        }
        $this->ajaxReturn(null, '��Ӳ˵���Ӧ��Ȩ�޳ɹ�', 1);
    }

    public function del_menu_auth() {
        $menu_id = I('post.menu_id', 0, 'intval');
        $auth_id = I('post.auth_id', 0, 'intval');

        if ($menu_id <= 0 || $auth_id <= 0) {
            $this->ajaxReturn(null, 'not access', 0);
        }

        if (false === M('MenuAuth')->where('menu_id=%d AND auth_id=%d', $menu_id, $auth_id)
            ->delete()) {
            $this->ajaxReturn(null, 'ɾ���˵���Ӧ��Ȩ��ʧ��', 0);
        }
        $this->ajaxReturn(null, 'ɾ���˵���Ӧ��Ȩ�޳ɹ�', 1);
    }
}
