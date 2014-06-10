<?php
class MenuAction extends CommonAction {
    public function _initialize() {
        parent::_initialize();
    }

    public function get_tree_menus() {
        $where['status'] = '1';
        $field = array('menu_id' => 'id', 'title' => 'text', 'parent_id', 'cate_id', 'url', 'type', 'state');
        $data = M('Menu')->field($field)->where($where)->order('`parent_id` ASC,`order` ASC,`menu_id` ASC')->select();
        list($parents, $children) = $this->get_parents_children($data);
        foreach ($parents as &$v) {
            unset($v['type'], $v['url'], $v['parent_id'], $v['cate_id']);
        }
        foreach ($children as $c) {
            $this->format_tree_menus($parents, $c);
        }
        $this->unset_unused_item($parents);
        // var_dump($parents);exit;
        header('Content-Type:application/json; charset=utf-8');
        exit(json_encode($parents));
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

    // 去掉tree json数据中不需要的cate_id,parent_id...属性，加入attributes属性
    private function unset_unused_item(&$data) {
        foreach ($data as $k => &$v) {
            if (isset($v['children'])) {
                unset($v['url'], $v['type'], $v['cate_id'], $v['parent_id']);
                $this->unset_unused_item($v['children']);
            } else {
                if ('null' !== $v['type']) {
                    $v['attributes'] = array('url' => $v['url'], 'type' => $v['type']);
                }
                unset($v['url'], $v['type'], $v['cate_id'], $v['parent_id'], $v['state']);
            }
        }
    }

    public function get_treegrid_menus() {
        $data = M('Menu')->order('`parent_id` ASC,`order` ASC,`menu_id` ASC')->select();
        list($parents, $children) = $this->get_parents_children($data);
        foreach ($children as $c) {
            $this->format_treegird_menus($parents, $c);
        }
        header('Content-Type: application/json; charset: utf-8');
        exit(json_encode($parents));
    }

    // 返回array(菜单的根结点,子结点)
    private function get_parents_children($data) {
        $parents = array();
        foreach ($data as $k => $v) {
            if ($v['parent_id'] === '0') {
                unset($data[$k]);
                $parents[] = $v;
            } else {
                break;
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

    public function do_edit() {
        $menu_id = I('post.menu_id', 0, 'intval');
        $title = I('post.title', '', 'trim');
        $name = I('post.name', '', 'trim');
        $url = I('post.url', '', 'trim');

        $m = M('Menu');
        if ($menu_id <= 0 || !$m->where('menu_id=%d', $menu_id)->count()) {
            $this->ajaxReturn(null, '无此菜单项', 0);
        }

        if (false !== $m->where('menu_id=%d', $menu_id)->save(array(
            'title' => $title,
            'name' => $name,
            'url' => $url,
            'order' => I('post.order', 0, 'intval'),
            'type' => I('post.type'),
            'state' => I('post.state'),
            'status' => I('post.status'),
        ))) {
            $this->ajaxReturn(null, '编辑菜单项成功', 1);
        } else {
            $this->ajaxReturn(null, '编辑菜单项失败', 0);
        }
    }
}