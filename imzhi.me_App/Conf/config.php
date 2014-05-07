<?php

return array(
    'APP_STATUS' => 'debug_home',

    'SHOW_PAGE_TRACE' => FALSE,

    'DB_TYPE' => 'pdo',
    'DB_PREFIX' => 'imz_',

    // 虚拟空间数据库 用户名 和 密码
    // 'DB_USER' => 'root',
    // 'DB_PWD' => '1234',
    // 'DB_DSN' => 'mysql:host=127.0.0.1;dbname=mybbs;charset=utf8',

    'URL_MODEL' => 2,
    'URL_CASE_INSENSITIVE' => TRUE,
    'URL_ROUTER_ON' => TRUE,
    'URL_ROUTE_RULES' => array(),

    'TMPL_PARSE_STRING' => array(
        '__PUBLIC__' => '',
    ),
);
