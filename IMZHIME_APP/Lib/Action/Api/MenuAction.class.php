<?php
class MenuAction extends CommonAction {
    public function _initialize() {
        parent::_initialize();
    }

    public function get_menus() {
        $where['status'] = '1';
        $field = array('menu_id' => 'id', 'title' => 'text','parent_id','cate_id','url','type');
        $menus = M('Menu')->field($field)->where($where)->order('`parent_id` ASC,`order` ASC,`menu_id` ASC')->select();
        $menus = $this->format_menus($menus);
        exit(json_encode($menus));
    }

    // 暂时只能格式化两级
    private function format_menus($menus) {
        $data = array();
        foreach ($menus as $k => $v) {
            if ($v['parent_id'] === '0') {
                unset($v['parent_id'],$v['cate_id'],$v['cate_name'],$v['url'],$v['type']);
                $data[] = $v;
            } else {
                foreach ($data as $kk => $vv) {
                    if ($vv['id'] === $v['parent_id']) {
                        unset($v['parent_id'],$v['cate_id'],$v['cate_name']);
                        $data[$kk]['children'][] = $v;
                    } else if (isset($vv['children'])) {
                        foreach ($vv['children'] as $key => $val) {
                            if ($val['id'] === $v['parent_id']) {
                                unset($data[$kk]['children'][$key]['url'],$data[$kk]['children'][$key]['type']);
                                unset($v['parent_id'],$v['cate_id'],$v['cate_name']);
                                $data[$kk]['children'][$key]['children'][] = $v;
                            }
                        }
                    }
                }
            }
        }
        return $data;
    }
}