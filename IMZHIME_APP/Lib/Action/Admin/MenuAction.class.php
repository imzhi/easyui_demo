<?php
class MenuAction extends CommonAction {
    public function _initialize() {
        parent::_initialize();
    }

    public function index() {
        $this->display();
    }

    public function edit() {
        $this->display();
    }

    public function menu_auth_edit() {
        $this->display();
    }
}