<?php
class CommonAction extends Action {
    protected static $user;
    public function _initialize() {
        self::$user = session('user');
        $site_info = M('SiteInfo')->field('id', true)->where('id=1')->find();
        $this->assign('site_info', $site_info);

        // 检查权限
        if (!action_check_auth()) {
            if ($this->isAjax()) {
                $this->ajaxReturn(null, 'not access', 0);
            } else {
                exit('not access');
            }
        }

        $this->assign('curr_theme',
            isset(self::$user) ? self::$user['theme'] :
            (cookie('theme') ? cookie('theme') : $site_info['site_theme']));
    }
}