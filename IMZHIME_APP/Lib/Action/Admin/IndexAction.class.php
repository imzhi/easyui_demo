<?php
class IndexAction extends CommonAction {
    public function _initialize() {
        parent::_initialize();
    }

    public function index() {
        $this->display();
    }
}