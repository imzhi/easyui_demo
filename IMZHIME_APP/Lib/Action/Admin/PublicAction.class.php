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

    public function sign_up() {
        $this->display();
    }

    public function sign_in() {
        $this->display();
    }

    public function change_password() {
        $this->display();
    }

    public function guestbook() {
        C('SHOW_PAGE_TRACE', false);
        $this->display();
    }
}