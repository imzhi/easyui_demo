<?php
class CommonAction extends Action {
    protected static $user;
    public function _initialize() {
        self::$user = session('user');

        // 检查站点是否关闭
        $site_info = M('SiteInfo')->field('id', true)->where('id=1')->find();

        $save = array();
        if (
                (
                    $site_info['site_status'] === '0' && time() > $site_info['close_to_time']
                )
                ||
                (
                    $site_info['site_status'] === '1' &&
                    (
                        !empty($site_info['close_to_time']) || !empty($site_info['close_reason'])
                    )
                )
            ) {
            $save = array(
                'site_status' => '1',
                'close_to_time' => 0,
                'close_reason' => '',
            );
            M('SiteInfo')->where('id=1')->save($save);
        }
        $site_info = array_merge($site_info, $save);
        if (!self::$user['unlock'] && $site_info['site_status'] === '0') {
            $this->redirect('/Lock');
        }
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