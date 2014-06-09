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
        var_dump($parents);exit;
        header('Content-Type:application/json; charset=utf-8');
        exit(json_encode($parents));
    }

    private function format_tree_menus(&$data, $new) {
        foreach ($data as $k => &$v) {
            if ($v['id'] === $new['parent_id']) {
                if ('null' !== $new['type']) {
                    $new['attributes'] = array('url' => $new['url'], 'type' => $new['type']);
                }
                unset($new['url'], $new['type'],$new['cate_id'],$new['parent_id']);
                $data[$k]['children'][] = $new;
                break;
            } else if (isset($v['children'])) {
                unset($v['type'], $v['url'], $v['parent_id'], $v['cate_id'], $v['children'][0]['attributes'],$v['children'][0]['state']);
                $this->format_tree_menus($v['children'], $new);
            }
        }

        // foreach ($menus as $k => $v) {
        //     if ($v['parent_id'] === '0') {
        //         unset($v['parent_id'],$v['cate_id'],$v['cate_name']);
        //         if ($v['type'] === 'null') {
        //             unset($v['url'],$v['type']);
        //         } else {
        //             $v['attributes'] = array('url' => $v['url'], 'type' => $v['type']);
        //         }
        //         $data[] = $v;
        //     } else {
        //         foreach ($data as $kk => $vv) {
        //             if ($vv['id'] === $v['parent_id']) {
        //                 $v['attributes'] = array('url' => $v['url'], 'type' => $v['type']);
        //                 unset($v['parent_id'],$v['cate_id'],$v['cate_name'], $v['url'], $v['type']);
        //                 $data[$kk]['children'][] = $v;
        //             } else if (isset($vv['children'])) {
        //                 foreach ($vv['children'] as $key => $val) {
        //                     if ($val['id'] === $v['parent_id']) {
        //                         unset($data[$kk]['children'][$key]['attributes']);
        //                         unset($v['parent_id'],$v['cate_id'],$v['cate_name']);
        //                         $data[$kk]['children'][$key]['children'][] = $v;
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
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
}