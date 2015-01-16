<?php
class SiteAction extends CommonAction {
    public function _initialize() {
        parent::_initialize();
    }

    public function edit_info() {
        $posts = I('post.');
        $login_vcode = I('post.login_vcode', 0, 'intval');
        $register_vcode = I('post.register_vcode', 0, 'intval');

        if (false !== M('SiteInfo')->where('id=1')->save(array(
            'site_title' => $posts['site_title'],
            'site_description' => $posts['site_description'],
            'site_keywords' => $posts['site_keywords'],
            'site_theme' => $posts['site_theme'],
            'register_vcode' => $register_vcode,
            'login_vcode' => $login_vcode,
            'site_status' => $posts['site_status'],
        ))) {
            $this->ajaxReturn(null, '编辑站点信息成功', 1);
        }
        $this->ajaxReturn(null, '编辑站点信息失败', 0);
    }

    public function get_info() {
        $site_info = M('SiteInfo')->where('id=1')->find();
        json_return($site_info);
    }
}