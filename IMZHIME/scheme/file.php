<?php
$path = 'D:\pproject\php\imzhi.me\IMZHIME\js\common\jquery-easyui\themes\icons\16x16\actions';
function generateCssFileForIcon() {
    global $path;
    $d = dir($path);
    chdir($path);
    $content =  '';
    while (false !== ($entry = $d->read())) {
        if ('.' === $entry || '..' === $entry || !is_file($entry)) continue;
        $pathinfo = pathinfo($entry);
        $filename = $pathinfo['filename'];
        // .icon-search{
        //     background:url('icons/search.png') no-repeat center center;
        // }
        $content .= ".icon-$filename { background: url('icons/XX/$entry') no-repeat center center; }\n";
    }
}

generateCssFileForIcon();