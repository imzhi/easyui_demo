<?php
class MenuAction extends CommonAction {
    public function _initialize() {
        parent::_initialize();
    }

    public function get_menus() {
        $where['status'] = '1';
        $field = array('menu_id' => 'id', 'title' => 'text','parent_id','cate_id','url','type');
        $menus = M('Menu')->field($field)->where($where)->order('`order` ASC,`menu_id` ASC')->select();
        $menus = $this->format_menus($menus);
        exit(json_encode($menus));
    }

    // 暂时只能格式化两级
    private function format_menus($menus) {
        $data = array();
        foreach ($menus as $k => $v) {
            if ($v['parent_id'] === '0') {
                $data[] = $v;
            } else {
                foreach ($data as $kk => $vv) {
                    if (isset($vv['children'])) {
                        foreach ($vv['children'] as $key => $val) {
                            $val['id'] === $v['parent_id'] && $data[$kk]['children'][$key]['children'][] = $v;
                        }
                    } else {
                        $vv['id'] === $v['parent_id'] && $data[$kk]['children'][] = $v;
                    }
                }
            }
        }
        var_dump($data);exit;
        return $data;
    }

    private function format(&$data) {
        // 数据库 => tree json

        foreach ($data as &$v) {

        }
    }
}