<?php
class StatusAction extends CommonAction {
    public function _initialize() {
        parent::_initialize();
        if (!$this->isAjax()) {
            exit('not access');
        }
    }

    public function combobox_user_status() {
        combobox_return(array(
            'check' => 'check',
            'pass' => 'pass',
            'fail' => 'fail',
            'del' => 'del',
            'noaccess' => 'noaccess',
            'nopost' => 'nopost',
            'lock' => 'lock',
        ));
    }

    public function combobox_user_type() {
        combobox_return(array(
            'admin' => 'admin',
            'user' => 'user',
            'moderator' => 'moderator',
        ));
    }

    public function combobox_auth_group_status() {
        combobox_return(array('禁用', '启用'));
    }

    public function combobox_menu_status() {
        combobox_return(array('禁用', '启用'));
    }

    public function combobox_menu_state() {
        combobox_return(array('open' => '展开', 'closed' => '折叠'));
    }

    public function combobox_menu_type() {
        combobox_return(array(
            'null' => 'null',
            'iframe' => 'iframe',
            'tab' => 'tab',
            'dialog' => 'dialog'
        ));
    }
}