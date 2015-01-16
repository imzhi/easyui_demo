DROP TABLE IF EXISTS `z_auth_group`;
CREATE TABLE `z_auth_group` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `title` char(100) NOT NULL DEFAULT '',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `rules` char(200) NOT NULL DEFAULT '',
  `menu_rules` char(200) NOT NULL DEFAULT '' COMMENT '菜单ID字串',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

INSERT INTO `z_auth_group` (`id`, `title`, `status`, `rules`, `menu_rules`) VALUES
(1, '主公', 1, '2,3,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,55,56,57,58,59,60,11,12,13,14,15,16,18,19,20,21,22,52,53,54,7,8,9,10,17,51', '20,22,27,21,24,25,26,1,2,3,4,5,6,7,8,9,10'),
(3, '贵族', 1, '2,3,7', '1,2,3,4,5,6'),
(5, '贱民', 1, '', ''),
(6, '平民', 1, '', '20,22,27,24'),
(7, '将军', 1, '', ''),
(8, '元帅', 1, '', '');

DROP TABLE IF EXISTS `z_auth_group_access`;
CREATE TABLE `z_auth_group_access` (
  `uid` mediumint(8) unsigned NOT NULL,
  `group_id` mediumint(8) unsigned NOT NULL,
  UNIQUE KEY `uid_group_id` (`uid`,`group_id`),
  KEY `uid` (`uid`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `z_auth_group_access` (`uid`, `group_id`) VALUES
(1, 1),
(8, 5);

DROP TABLE IF EXISTS `z_auth_rule`;
CREATE TABLE `z_auth_rule` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(80) NOT NULL DEFAULT '',
  `title` char(20) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `condition` char(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=61 ;

INSERT INTO `z_auth_rule` (`id`, `name`, `title`, `status`, `condition`) VALUES
(2, 'Api/Auth/add_auth_group', 'Api-新增用户组', 1, ''),
(3, 'Api/Auth/del_auth_group', 'Api-删除用户组', 1, ''),
(7, 'Auth/auth_rule', '列表-权限规则', 1, ''),
(8, 'Auth/auth_group', '列表-用户组', 1, ''),
(9, 'Auth/auth_group_access', '列表-用户组明细', 1, ''),
(10, 'User/index', '列表-用户信息', 1, ''),
(11, 'Auth/edit_auth_group', '窗口-编辑用户组', 1, ''),
(12, 'Auth/edit_auth_group_access', '窗口-编辑用户组明细', 1, ''),
(14, 'Auth/edit_auth_rule', '窗口-编辑权限规则', 1, ''),
(15, 'Auth/edit_normal_auth', '窗口-编辑普通权限', 1, ''),
(16, 'Auth/edit_menu_auth', '窗口-编辑菜单权限', 1, ''),
(17, 'Menu/index', '列表-菜单信息', 1, ''),
(18, 'Menu/edit', '窗口-编辑菜单', 1, ''),
(19, 'Menu/menu_auth_edit', '窗口-编辑菜单权限', 1, ''),
(20, 'User/change_password', '窗口-修改密码', 1, ''),
(21, 'Site/info', '窗口-站点信息', 1, ''),
(22, 'User/edit', '窗口-编辑用户', 1, ''),
(23, 'Api/Auth/get_auth_group', 'Api-获取用户组', 1, ''),
(24, 'Api/Auth/get_auth_rule', 'Api-获取权限规则', 1, ''),
(25, 'Api/Auth/edit_auth_group', 'Api-编辑用户组', 1, ''),
(26, 'Api/Auth/del_auth_rule', 'Api-删除权限规则', 1, ''),
(27, 'Api/Auth/add_auth_rule', 'Api-新增权限规则', 1, ''),
(28, 'Api/Auth/edit_auth_rule', 'Api-编辑权限规则', 1, ''),
(29, 'Api/Auth/get_auth_group_access', 'Api-获取用户组明细', 1, ''),
(30, 'Api/Auth/add_auth_group_access', 'Api-新增用户组明细', 1, ''),
(31, 'Api/Auth/edit_auth_group_access', 'Api-编辑用户组明细', 1, ''),
(32, 'Api/Auth/del_auth_group_access', 'Api-删除用户组明细', 1, ''),
(33, 'Api/Auth/get_group_normal_auth', 'Api-用户组对应普通权限', 1, ''),
(34, 'Api/Auth/get_group_menu_auth', 'Api-用户组对应菜单权限', 1, ''),
(35, 'Api/Auth/edit_normal_auth', 'Api-编辑用户组对应普通权限', 1, ''),
(36, 'Api/Auth/edit_menu_auth', 'Api-编辑用户组对应菜单权限', 1, ''),
(37, 'Api/Menu/get_treegrid_menus', 'Api-获取菜单树形表格', 1, ''),
(38, 'Api/Menu/edit', 'Api-编辑菜单项', 1, ''),
(39, 'Api/Menu/add', 'Api-添加菜单项', 1, ''),
(40, 'Api/Menu/delete', 'Api-删除菜单项', 1, ''),
(41, 'Api/Menu/get_menu_auth', 'Api-获取菜单拥有的权限', 1, ''),
(42, 'Api/Menu/add_menu_auth', 'Api-添加菜单拥有的权限', 1, ''),
(43, 'Api/Menu/del_menu_auth', 'Api-删除菜单拥有权限', 1, ''),
(44, 'Api/Site/edit_info', 'Api-编辑站点信息', 1, ''),
(45, 'Api/Site/get_info', 'Api-获取站点信息', 1, ''),
(47, 'Api/User/get_users', 'Api-获取用户列表', 1, ''),
(48, 'Api/User/save', 'Api-保存用户信息', 1, ''),
(51, 'Cheatsheet/index', '列表-各种快捷键', 1, ''),
(52, 'Cheatsheet/edit', '窗口-编辑快捷键', 1, ''),
(53, 'Cheatsheet/add', '窗口-添加快捷键', 1, ''),
(54, 'Cheatsheet/batch_add', '窗口-批量添加快捷键', 1, ''),
(55, 'Api/Cheatsheet/get_cheatsheets', 'Api-获取各种快捷键', 1, ''),
(56, 'Api/Cheatsheet/add', 'Api-添加快捷键', 1, ''),
(57, 'Api/Cheatsheet/batch_add', 'Api-批量添加快捷键', 1, ''),
(58, 'Api/Cheatsheet/edit', 'Api-编辑快捷键', 1, ''),
(59, 'Api/Cheatsheet/delete', 'Api-删除快捷键', 1, ''),
(60, 'Api/Menu/get_all_tree_menus', 'Api-获取全部菜单', 1, '');

DROP TABLE IF EXISTS `z_cheatsheet`;
CREATE TABLE `z_cheatsheet` (
  `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `cate_id` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '分类ID',
  `cate_name` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '分类名称',
  `command` varchar(100) NOT NULL COMMENT '命令或快捷键',
  `describe` varchar(400) NOT NULL COMMENT '解释描述',
  `add_user_id` smallint(6) unsigned NOT NULL COMMENT '添加人ID',
  `add_time` int(11) unsigned NOT NULL COMMENT '添加时间',
  `edit_user_id` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '编辑人ID',
  `edit_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '编辑时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='快捷键或命令表' AUTO_INCREMENT=39 ;

INSERT INTO `z_cheatsheet` (`id`, `cate_id`, `cate_name`, `command`, `describe`, `add_user_id`, `add_time`, `edit_user_id`, `edit_time`) VALUES
(1, 0, 'sublime', 'ctrl+x', '删除整行', 1, 1403424767, 1, 1403442753),
(2, 0, 'sublime', 'ctrl+k+u', '转换大写', 1, 1403424795, 0, 0),
(37, 0, 'vim', 'j', '光标下移一行', 1, 1403443184, 0, 0),
(4, 0, 'sublime', 'Ctrl+L\r', '选择整行(按住-继续选择下行)\r', 1, 1403439935, 0, 0),
(5, 0, 'sublime', 'Ctrl+KK\r', '从光标处删除至行尾\r', 1, 1403439935, 0, 0),
(6, 0, 'sublime', 'Ctrl+Shift+K\r', '删除整行\r', 1, 1403439935, 0, 0),
(7, 0, 'sublime', 'Ctrl+Shift+D\r', '复制光标所在整行，插入在该行之前\r', 1, 1403439935, 0, 0),
(8, 0, 'sublime', 'Ctrl+J\r', '合并行(已选择需要合并的多行时)\r', 1, 1403439935, 0, 0),
(9, 0, 'sublime', 'Ctrl+KU\r', '改为大写\r', 1, 1403439935, 0, 0),
(10, 0, 'sublime', 'Ctrl+KL\r', '改为小写\r', 1, 1403439935, 0, 0),
(11, 0, 'sublime', 'Ctrl+D\r', '选词(按住-继续选择下个相同的字符串)\r', 1, 1403439935, 0, 0),
(12, 0, 'sublime', 'Ctrl+M\r', '光标移动至括号内开始或结束的位置\r', 1, 1403439935, 0, 0),
(13, 0, 'sublime', 'Ctrl+Shift+M\r', '选择括号内的内容(按住-继续选择父括号)\r', 1, 1403439935, 0, 0),
(14, 0, 'sublime', 'Ctrl+/\r', '注释整行(如已选择内容，同“Ctrl+Shift+/”效果)\r', 1, 1403439935, 0, 0),
(15, 0, 'sublime', 'Ctrl+Shift+/\r', '注释已选择内容\r', 1, 1403439935, 0, 0),
(16, 0, 'sublime', 'Ctrl+Space\r', '自动完成(win与系统快捷键冲突，需修改)\r', 1, 1403439935, 0, 0),
(17, 0, 'sublime', 'Ctrl+Z\r', '撤销\r', 1, 1403439935, 0, 0),
(18, 0, 'sublime', 'Ctrl+Y\r', '恢复撤销\r', 1, 1403439935, 0, 0),
(19, 0, 'sublime', 'Ctrl+Shift+V\r', '粘贴并自动缩进(其它兄弟写的，实测win系统自动缩进无效)\r', 1, 1403439935, 0, 0),
(20, 0, 'sublime', 'Ctrl+M\r', '光标跳至对应的括号\r', 1, 1403439935, 0, 0),
(21, 0, 'sublime', 'Alt+.\r', '闭合当前标签\r', 1, 1403439935, 0, 0),
(22, 0, 'sublime', 'Ctrl+Shift+A\r', '选择光标位置父标签对儿\r', 1, 1403439935, 0, 0),
(23, 0, 'sublime', 'Ctrl+Shift+[\r', '折叠代码\r', 1, 1403439935, 0, 0),
(24, 0, 'sublime', 'Ctrl+Shift+]\r', '展开代码\r', 1, 1403439935, 0, 0),
(25, 0, 'sublime', 'Ctrl+KT\r', '折叠属性\r', 1, 1403439935, 0, 0),
(26, 0, 'sublime', 'Ctrl+K0\r', '展开所有\r', 1, 1403439935, 0, 0),
(27, 0, 'sublime', 'Ctrl+U\r', '软撤销\r', 1, 1403439935, 0, 0),
(28, 0, 'sublime', 'Ctrl+T\r', '词互换\r', 1, 1403439935, 0, 0),
(29, 0, 'sublime', 'Ctrl+Enter\r', '插入行后\r', 1, 1403439935, 0, 0),
(30, 0, 'sublime', 'Ctrl+Shift Enter\r', '插入行前\r', 1, 1403439935, 0, 0),
(31, 0, 'sublime', 'Ctrl+K Backspace\r', '从光标处删除至行首\r', 1, 1403439935, 0, 0),
(32, 0, 'sublime', 'Ctrl+Shift+UP\r', '与上行互换\r', 1, 1403439935, 0, 0),
(33, 0, 'sublime', 'Ctrl+Shift+DOWN\r', '与下行互换\r', 1, 1403439935, 0, 0),
(34, 0, 'sublime', 'Shift+Tab\r', '去除缩进\r', 1, 1403439935, 0, 0),
(35, 0, 'sublime', 'Tab\r', '缩进\r', 1, 1403439935, 0, 0),
(36, 0, 'sublime', 'F9', '行排序(按a-z)', 1, 1403439935, 0, 0),
(38, 0, 'git', 'git push origin master', 'push本地代码', 1, 1403443288, 0, 0);

DROP TABLE IF EXISTS `z_log_info`;
CREATE TABLE `z_log_info` (
  `log_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL,
  `add_time` int(11) unsigned NOT NULL,
  `ip` int(11) unsigned NOT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='登陆日志' AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `z_menu`;
CREATE TABLE `z_menu` (
  `menu_id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '父ID',
  `cate_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `cate_name` char(20) NOT NULL DEFAULT '',
  `name` char(60) NOT NULL DEFAULT '' COMMENT '菜单英文名称',
  `title` char(40) NOT NULL COMMENT '菜单中文名称',
  `url` varchar(100) NOT NULL DEFAULT '',
  `level` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '菜单层级',
  `type` enum('iframe','dialog','null','tab') NOT NULL DEFAULT 'tab' COMMENT '菜单类型',
  `state` enum('closed','open') NOT NULL DEFAULT 'open' COMMENT '节点状态',
  `order` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '排序序号',
  `status` enum('1','0') NOT NULL DEFAULT '1' COMMENT '状态 1-启用 0-禁用',
  PRIMARY KEY (`menu_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

INSERT INTO `z_menu` (`menu_id`, `parent_id`, `cate_id`, `cate_name`, `name`, `title`, `url`, `level`, `type`, `state`, `order`, `status`) VALUES
(1, 0, 3, '管理区域', '', '基本设置', '', 0, 'null', 'open', 0, '1'),
(2, 1, 3, '管理区域', 'site_info', '站点信息', 'js/admin/Site/info.js', 0, 'dialog', 'open', 0, '1'),
(3, 1, 3, '管理区域', 'menu_list', '菜单列表', 'Menu/index', 0, 'tab', 'open', 0, '1'),
(5, 0, 3, '管理区域', '', '权限管理', '', 0, 'null', 'open', 0, '1'),
(6, 5, 3, '管理区域', '', '权限规则', 'Auth/auth_rule', 0, 'tab', 'open', 0, '1'),
(7, 5, 3, '管理区域', '', '用户组', 'Auth/auth_group', 0, 'tab', 'open', 0, '1'),
(8, 5, 3, '管理区域', '', '用户组明细', 'Auth/auth_group_access', 0, 'tab', 'open', 0, '1'),
(9, 0, 3, '管理区域', '', '用户管理', '', 0, 'null', 'open', 0, '1'),
(10, 9, 3, '管理区域', '', '用户列表', 'User/index', 0, 'tab', 'open', 0, '1'),
(25, 0, 2, '个人区域', 'douniwan', '逗你玩', '', 0, 'null', 'open', 0, '1'),
(20, 0, 1, '公共区域', 'common_site', '常用站点', '', 0, 'null', 'open', 0, '1'),
(21, 27, 1, '公共区域', 'jquery_1_7_api', 'jquery1.7 API', 'http://tool.oschina.net/uploads/apidocs/jquery/', 0, 'iframe', 'open', 0, '1'),
(22, 20, 1, '公共区域', 'baidu', '百度', 'http://www.baidu.com/', 0, 'iframe', 'open', 0, '1'),
(24, 27, 1, '公共区域', 'cheatsheet', '各种快捷键', 'Cheatsheet/index', 0, 'tab', 'open', 0, '1'),
(26, 25, 2, '个人区域', 'douniwaner', '逗你玩儿', 'emptyaction', 0, 'tab', 'open', 0, '1'),
(27, 0, 1, '公共区域', 'memo', '备忘', '', 0, 'null', 'open', 0, '1');

DROP TABLE IF EXISTS `z_menu_auth`;
CREATE TABLE `z_menu_auth` (
  `menu_id` smallint(6) unsigned NOT NULL COMMENT '菜单ID',
  `auth_id` smallint(6) unsigned NOT NULL COMMENT '权限ID',
  `status` enum('0','1') NOT NULL DEFAULT '1' COMMENT '状态 1-正常 2-禁用'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='菜单权限表';

INSERT INTO `z_menu_auth` (`menu_id`, `auth_id`, `status`) VALUES
(3, 17, '0'),
(3, 37, '0'),
(2, 45, '0'),
(2, 21, '0'),
(4, 13, '0'),
(6, 7, '0'),
(6, 24, '0'),
(7, 8, '0'),
(7, 23, '0'),
(8, 9, '0'),
(8, 29, '0'),
(7, 33, '0'),
(7, 34, '0'),
(10, 47, '0'),
(10, 10, '0'),
(24, 55, '0'),
(24, 51, '0');

DROP TABLE IF EXISTS `z_site_info`;
CREATE TABLE `z_site_info` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `site_title` char(40) NOT NULL COMMENT '站点标题',
  `site_description` varchar(200) NOT NULL COMMENT '站点描述',
  `site_keywords` varchar(100) NOT NULL COMMENT '站点关键词',
  `site_theme` char(20) NOT NULL DEFAULT 'default' COMMENT '站点默认主题',
  `site_status` enum('1','0') NOT NULL DEFAULT '1' COMMENT '站点状态',
  `cookie_expire_time` smallint(6) unsigned NOT NULL DEFAULT '1800' COMMENT 'cookie过期时间，默认30分钟',
  `login_vcode` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '登陆验证码',
  `register_vcode` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '注册验证码',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='站点信息表' AUTO_INCREMENT=2 ;

INSERT INTO `z_site_info` (`id`, `site_title`, `site_description`, `site_keywords`, `site_theme`, `site_status`, `cookie_expire_time`, `login_vcode`, `register_vcode`) VALUES
(1, 'EasyUI权限管理Demo', 'EasyUI权限管理Demo', 'EasyUI权限管理Demo', 'metro-blue', '1', 0, 1, 1);

DROP TABLE IF EXISTS `z_user`;
CREATE TABLE `z_user` (
  `user_id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用户名',
  `password` char(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '密码',
  `reg_time` int(11) unsigned NOT NULL,
  `reg_ip` bigint(20) unsigned NOT NULL COMMENT '注册IP',
  `email` varchar(40) NOT NULL,
  `birthday` date DEFAULT NULL,
  `log_num` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '登录次数',
  `last_login` int(11) unsigned NOT NULL COMMENT '最后登录时间',
  `last_ip` bigint(20) unsigned NOT NULL COMMENT '最后登陆IP',
  `theme` char(20) NOT NULL DEFAULT 'default' COMMENT '主题',
  `user_type` enum('admin','moderator','user') NOT NULL DEFAULT 'user' COMMENT '用户类型，普通用户，版主，管理员',
  `status` enum('check','pass','fail','del','noaccess','nopost','lock') NOT NULL DEFAULT 'pass' COMMENT '待审核、未通过、通过、删除、禁止访问、禁止发言、锁定',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='用户表' AUTO_INCREMENT=9 ;

INSERT INTO `z_user` (`user_id`, `user_name`, `password`, `reg_time`, `reg_ip`, `email`, `birthday`, `log_num`, `last_login`, `last_ip`, `theme`, `user_type`, `status`) VALUES
(1, 'tt', 'e10adc3949ba59abbe56e057f20f883e', 0, 0, 'tt@tt.com', '2014-06-25', 87, 1421408409, 2130706433, 'default', 'user', 'pass'),
(6, 'yy', 'e10adc3949ba59abbe56e057f20f883e', 0, 0, '', NULL, 2, 1400940410, 2130706433, 'black', 'user', 'pass'),
(7, 'xx', 'e10adc3949ba59abbe56e057f20f883e', 1402893403, 2130706433, '', NULL, 4, 1402899752, 2130706433, 'bootstrap', 'user', 'pass'),
(8, 'uu', 'e10adc3949ba59abbe56e057f20f883e', 1402989520, 2130706433, 'tt@tt.com', '2014-05-27', 3, 1403403331, 2130706433, 'metro-orange', 'user', 'pass');