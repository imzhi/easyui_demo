<?php
class CommonAction extends Action {
    public static $user;
    public function _initialize() {
        must_ajax();

        self::$user = session('user');

        // 检查权限
        if (!action_check_auth()) {
            if ($this->isAjax()) {
                $this->ajaxReturn(null, 'not access', 0);
            } else {
                exit('not access');
            }
        }
    }
}