<?php
class StatusAction extends CommonAction {
    public function _initialize() {
        parent::_initialize();
        must_ajax();
    }

    public function combobox_user_status() {
        combobox_return(C('CB.USER_STATUS'));
    }

    public function combobox_user_type() {
        combobox_return(C('CB.USER_TYPE'));
    }

    public function combobox_auth_group_status() {
        combobox_return(C('CB.COMMON_STATUS'));
    }

    public function combobox_menu_status() {
        combobox_return(C('CB.COMMON_STATUS'));
    }

    public function combobox_menu_state() {
        combobox_return(C('CB.MENU_STATE'));
    }

    public function combobox_menu_type() {
        combobox_return(C('CB.MENU_TYPE'));
    }

    public function combobox_menu_auth_status() {
        combobox_return(C('CB.COMMON_STATUS'));
    }
}