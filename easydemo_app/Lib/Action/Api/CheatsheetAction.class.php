<?php
class CheatsheetAction extends CommonAction {
    private static $m;
    public function _initialize() {
        parent::_initialize();
        self::$m = M('Cheatsheet');
    }

    public function get_cheatsheets() {
        $page = I('post.page', 1, 'intval');
        $rows = I('post.rows', 10, 'intval');
        $sort = I('post.sort', 'id');
        $order = I('post.order', 'ASC');

        $data = array();
        $where = array();

        if ($count = self::$m->where($where)->count()) {
            $data = self::$m->field('id,cate_name,command,describe')
                ->where($where)
                ->limit(($page-1)*$rows, $rows)
                ->select();
        }
        datagrid_return($data, $count);
    }

    public function add() {
        $posts = I('post.');
        if (!isset(self::$user) || !self::$m->add(array(
            'add_user_id' => self::$user['user_id'],
            'add_time' => time(),
            'cate_name' => $posts['cate_name'],
            'command' => $posts['command'],
            'describe' => $posts['describe'],
        ))) {
            $this->ajaxReturn(null, '添加快捷键失败', 0);
        }
        $this->ajaxReturn(null, '添加快捷键成功', 1);
    }

    public function batch_add() {
        $posts = I('post.');
        $p1 = preg_match_all('/.+/m', $posts['command'], $command_matches);
        $p2 = preg_match_all('/.+/m', $posts['describe'], $describe_matches);
        $count1 = count($command_matches[0]);
        $count2 = count($describe_matches[0]);
        if (isset(self::$user) && $p1 && $p2 && $count1 == $count2) {
            $cate_name = trim($posts['cate_name']);
            for ($i = 0; $i < $count1; ++$i) {
                if (!self::$m->add(array(
                    'add_user_id' => self::$user['user_id'],
                    'add_time' => time(),
                    'cate_name' => $cate_name,
                    'command' => trim($command_matches[0][$i]),
                    'describe' => trim($describe_matches[0][$i]),
                ))) {
                    $this->ajaxReturn(null, '批量添加快捷键失败', 0);
                }
            }
            $this->ajaxReturn(null, '批量添加快捷键成功', 1);
        }
        $this->ajaxReturn(null, '命令/快捷键与解释/描述的条数不符合，总之添加失败', 0);
    }

    public function edit() {
        $id = I('post.id', 0, 'intval');
        $command = I('post.command', '', 'trim');
        $describe = I('post.describe', '', 'trim');

        if (!isset(self::$user) || $id <= 0 || empty($command) || empty($describe)) {
            $this->ajaxReturn(null, 'not access', 0);
        }

        if (false === self::$m->where('id=%d', $id)->save(array(
            'edit_user_id' => self::$user['user_id'],
            'edit_time' => time(),
            'command' => $command,
            'describe' => $describe,
        ))) {
            $this->ajaxReturn(null, '编辑快捷键失败', 0);
        }
        $this->ajaxReturn(null, '编辑快捷键成功', 1);
    }

    public function delete() {
        $id = I('post.id', 0, 'intval');

        if ($id <= 0) {
            $this->ajaxReturn(null, 'not access', 0);
        }

        if (false === self::$m->where('id=%d', $id)->delete()) {
            $this->ajaxReturn(null, '删除快捷键失败', 0);
        }
        $this->ajaxReturn(null, '删除快捷键成功', 1);
    }

    public function get_cate_names() {
        $where = array();
        $data = array();
        if ($cates = self::$m->field('distinct(`cate_name`) as cate_name')
            ->where($where)
            ->select()) {
            foreach ($cates as $v) {
                $data[$v['cate_name']] = $v['cate_name'];
            }
        }
        combobox_return($data);
    }
}