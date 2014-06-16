<?php
class CommonAction extends Action {
    public static $user;
    public function _initialize() {
        $user = session('user');

        // 检查站点是否关闭
        $site_info = M('SiteInfo')->field('id', true)->where('id=1')->find();
        if (!$user['unlock'] && $site_info['site_status'] === '0') {
            // $this->redirect();
        }
        $save = array();
        if (($site_info['site_status'] === '0' && $site_info['close_to_time'] <= time())
            || ($site_info['site_status'] === '1' && ($site_info['close_to_time'])
                || $site_info['close_reason'])) {
            $save = array(
                'site_status' => '1',
                'close_to_time' => 0,
                'close_reason' => '',
            );
            M('SiteInfo')->where('id=1')->save($save);
        }
        $this->assign('site_info', array_merge($site_info, $save));

        $login_user = array();
        if ($user) {
            $login_user = M('user')->where('user_id=%d', $user['user_id'])->field('theme')->find();
        }
        self::$user = array_merge($user, $login_user);
        $this->assign('login_user', $login_user);
        $this->assign('curr_theme',
            isset($login_user['theme']) ? $login_user['theme'] :
            (cookie('theme') ? cookie('theme') : $site_info['site_theme']));
    }
}