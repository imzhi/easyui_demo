<?php
class PublicAction extends Action {
    public function _initialize() {
    }

    public function login() {
        $this->display();
    }

    public function vcode() {
        import('ORG.Util.Image');
        Image::buildImageVerify(4, 1, 'png', 48, 22, 'vcode');
    }

    public function test() {
        $this->display();
    }

    public function edit() {
        $this->display();
    }
}