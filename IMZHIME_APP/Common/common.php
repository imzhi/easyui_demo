<?php
// ip字串地址转换成长整型
function ipConvertLong($ip = FALSE) {
    if (!$ip) {
        $ip = get_client_ip(1);
    } else {
        $long = sprintf("%u",ip2long($ip));
        $ip   = $long ? $long : 0;
    }
    return $ip;
}

// cookie存储登陆信息
function setLoginCookie($uid, $name) {
    $auth_str = $uid . '|' . $name . '|' . md5($name . C('COOKIE_AUTH'));
    cookie(C('COOKIE_NAME'), $auth_str);
}

// 是否已登陆 或者 是否未登陆
// @return [用户ID, 用户名]
function loginOrNot($is = TRUE) {
    if ($is) {
        $return = FALSE;
        $cookie = cookie(C('COOKIE_NAME'));
        $arr = explode('|', $cookie);
        count($arr) === 3
            && md5($arr[1] . C('COOKIE_AUTH')) === $arr[2]
            && $return = array($arr[0], $arr[1]);
    }
    return $return;
}

function clearLoginCookie() {
    cookie(C('COOKIE_NAME'), NULL);
}

function bootstrap_page($count, $list_rows = 15) {
    import('ORG.Util.Page');
    $Page = new Page($count, $list_rows);
    $page_num = ceil($count / $list_rows);
    $Page->setConfig('first', '1...');
    $Page->setConfig('last', "...$page_num");
    $Page->setConfig('prev', '&laquo;');
    $Page->setConfig('next', '&raquo;');
    $Page->setConfig('theme', '%upPage% %first% %linkPage% %end% %downPage%');
    $show = $Page->show();
    $search_arr  = array('<a', '</a>', '<span', '</span>');
    $replace_arr = array('<li><a', '</a></li>', '<li class="active"><span',
        '</span></li>');

    return array(
        'limit' => "$Page->firstRow,$Page->listRows",
        'show' => str_replace($search_arr, $replace_arr, $show),
    );
}


/************************
Admin 使用
************************/

function datagrid_return($data, $count = 0) {
    // 防止 json 数据里出现 null，前台将报错
    $data || $data = array();
    $data = array('total' => $count, 'rows' => $data);
    json_return($data);
}

function combobox_return($array) {
    $data = array();
    while (list($key, $val) = each($array)) {
        // 如果是分了组的combobox数据
        if (is_array($val)) {
            while (list($k, $v) = each($val)) {
                $data[] = array('id' => $k, 'value' => $v, 'group' => $key);
            }
        } else {
            $data[] = array('id' => $key, 'value' => $val);
        }
    }
    json_return($data);
}

function json_return($data) {
    header('Content-Type:application/json; charset=utf-8');
    exit(json_encode($data));
}

// 检查权限
function action_check_auth($class) {
    // echo strtr($class, array('Action' => ''));exit;
    $rules = M('AuthRule')->field('name')
        ->where('name LIKE "'.strtr($class, array('Action' => '')).'%"')->select();
    import('ORG.Util.Auth');
    $auth = new Auth();
    foreach ($rules as $r) {
        if ($r['name'] === MODULE_NAME.'/'.ACTION_NAME
            && !$auth->check(MODULE_NAME.'/'.ACTION_NAME, 1)) {
            return false;
        }
    }
    return true;
}

function html_check_auth($class, $method) {
    import('ORG.Util.Auth');
    $auth = new Auth();
    return $auth->check("{$class}/{$method}", 1);
}

// 拥有的菜单权限
function get_own_auths($id = 1) {
    $auths = M('AuthGroup')->field('rules,menu_rules')->where('id=%d', $id)->find();
    return $auths;
}

function is_user_name($value) {
    return preg_match('#[a-z0-9]{2,20}#i', $value);
}

function is_password($value) {
    return strlen($value) <= 20
        && strlen($value) >= 4
        && false === strpos($value, ' ');
}
