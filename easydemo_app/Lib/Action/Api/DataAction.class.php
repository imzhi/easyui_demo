<?php
class DataAction extends CommonAction {
    public function _initialize() {
        parent::_initialize();
        must_ajax();
    }

    public function combobox_themes() {
        combobox_return(C('CB.THEMES'));
    }

    public function combobox_menu_cate() {
        combobox_return(C('CB.MENU_CATE'));
    }
}