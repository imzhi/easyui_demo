<?php
class SiteAction extends CommonAction {
    public function _initialize() {
        parent::_initialize();
    }

    public function close() {
        $this->display();
    }

    public function info() {
        $this->display();
    }
}