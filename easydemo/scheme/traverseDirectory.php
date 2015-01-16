<?php
class traverseDirectory {
    private $path;
    private $path_array;
    private $level;
    private $basename;
    private $filename;
    private $sub_directory;

    public function __construct($path) {
        if (!is_dir($path))
            exit('"'.$path.'" is not a directory.');

        $this->path = $path;
        // $this->level = $level;
        $this->path_array = explode('\\', $path);
        $this->sub_directory = array();

        $data = array();
        $data = $this->traverse($this->path, $data);
        // print_r($data);

        $this->create_css($data);
    }

    private function create_css($data) {
        foreach ($data as $v) {
            $v = substr(str_replace($this->path, '', $v), 1);
            $pathinfo = pathinfo($v);
            // var_dump('icon-'.str_replace('\\', '-', $pathinfo['dirname']).'-'.$pathinfo['filename'].'-16x16');exit;
            $class = '.icon-'.str_replace('\\', '-', $pathinfo['dirname']).'-'.$pathinfo['filename'].'-16x16';
            $style = " { background: url('icons/16x16/".str_replace('\\', '/', str_replace($this->path, '', $v))."') no-repeat center center; }\n";
            // var_dump($style);exit;
            file_put_contents('D:/css.css', $class.$style, FILE_APPEND);
            // var_dump('icon-'.str_replace('\\', '-', $v));exit;
        }
    }

    private function traverse($path, &$data) {
        $d = dir($path);

        while (false !== ($entry = $d->read())) {

            if ('.' === $entry || '..' === $entry)
                continue;

            if (!is_dir($path.'\\'.$entry) && !is_file($path.'\\'.$entry)) {
                // ...（可删除文件）
            } else if (is_file($path.'\\'.$entry)) {
                $data[] = $path.'\\'.$entry;
            } else if (is_dir($path.'\\'.$entry)) {
                $this->traverse($path.'\\'.$entry, $data);
            }
        }
        return $data;
    }
}

$t = new traverseDirectory('D:\pproject\php\imzhi.me\IMZHIME\js\common\jquery-easyui\themes\icons\16x16');
