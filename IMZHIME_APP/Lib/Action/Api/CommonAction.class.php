<?php
class CommonAction extends Action {
    public function _initialize() {
        // 检查权限
        if (!action_check_auth(MODULE_NAME)) {
            if ($this->isAjax()) {
                $this->ajaxReturn(null, 'not access', 0);
            } else {
                exit('not access');
            }
        }
    }
}