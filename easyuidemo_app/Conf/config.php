<?php
return array(
    'SHOW_PAGE_TRACE' => false,

    'DB_TYPE' => 'pdo',
    'DB_USER' => 'AIgZsJAL6audtOSx',
    'DB_PWD' => '6OLtLNHEJHgCc3dK',
    'DB_PREFIX' => 'z_',
    'DB_DSN' => 'mysql:host=192.168.3.5;dbname=cf_4b9b7cb6_5295_4d97_bdb8_2c886fcb0486;charset=utf8',

    'URL_MODEL' => 2,

    'DEFAULT_FILTER' => 'htmlspecialchars',

    'URL_HTML_SUFFIX' => '',

    'APP_GROUP_LIST' => 'Admin,Api',
    'DEFAULT_GROUP' => 'Admin',

    'LOAD_EXT_CONFIG' => array(
        // 'ACTION' => 'action',
        'CB' => 'combobox_data',
        'ABANDON' => 'abandon'
    ),

    'TMPL_PARSE_STRING' => array(
        '__PUBLIC__' => '',
    ),

    'AUTH_CONFIG' => array(
        'AUTH_ON' => true, //认证开关
        'AUTH_TYPE' => 1, // 认证方式，1为时时认证；2为登录认证。
        'AUTH_GROUP' => 'z_auth_group', //用户组数据表名
        'AUTH_GROUP_ACCESS' => 'z_auth_group_access', //用户组明细表
        'AUTH_RULE' => 'z_auth_rule', //权限规则表
        'AUTH_USER' => 'z_user'//用户信息表
    ),
);
