/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50519
Source Host           : 127.0.0.1:3306
Source Database       : imzhime

Target Server Type    : MYSQL
Target Server Version : 50519
File Encoding         : 65001

Date: 2014-06-27 08:19:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `z_auth_group`
-- ----------------------------
DROP TABLE IF EXISTS `z_auth_group`;
CREATE TABLE `z_auth_group` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `title` char(100) NOT NULL DEFAULT '',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `rules` char(200) NOT NULL DEFAULT '',
  `menu_rules` char(200) NOT NULL DEFAULT '' COMMENT '菜单ID字串',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of z_auth_group
-- ----------------------------
INSERT INTO `z_auth_group` VALUES ('1', '管理员', '1', '2,3,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,55,56,57,58,59,60,11,12,13,14,15,16,18,19,20,21,22,52,53,54,7,8,9,10,17,51', '1,2,3,4,5,6,7,8,9,10,13,14,20,21,22,24');
INSERT INTO `z_auth_group` VALUES ('3', '版主', '1', '2,3,7', '1,2,3,4,5,6');
INSERT INTO `z_auth_group` VALUES ('5', '会员', '1', '', '');
INSERT INTO `z_auth_group` VALUES ('6', '贱民', '1', '', '20,21,22');

-- ----------------------------
-- Table structure for `z_auth_group_access`
-- ----------------------------
DROP TABLE IF EXISTS `z_auth_group_access`;
CREATE TABLE `z_auth_group_access` (
  `uid` mediumint(8) unsigned NOT NULL,
  `group_id` mediumint(8) unsigned NOT NULL,
  UNIQUE KEY `uid_group_id` (`uid`,`group_id`),
  KEY `uid` (`uid`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of z_auth_group_access
-- ----------------------------
INSERT INTO `z_auth_group_access` VALUES ('1', '1');
INSERT INTO `z_auth_group_access` VALUES ('1', '3');
INSERT INTO `z_auth_group_access` VALUES ('1', '5');
INSERT INTO `z_auth_group_access` VALUES ('6', '1');
INSERT INTO `z_auth_group_access` VALUES ('6', '3');
INSERT INTO `z_auth_group_access` VALUES ('6', '5');
INSERT INTO `z_auth_group_access` VALUES ('8', '5');

-- ----------------------------
-- Table structure for `z_auth_rule`
-- ----------------------------
DROP TABLE IF EXISTS `z_auth_rule`;
CREATE TABLE `z_auth_rule` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(80) NOT NULL DEFAULT '',
  `title` char(20) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `condition` char(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of z_auth_rule
-- ----------------------------
INSERT INTO `z_auth_rule` VALUES ('2', 'Api/Auth/add_auth_group', 'Api-新增用户组', '1', '');
INSERT INTO `z_auth_rule` VALUES ('3', 'Api/Auth/del_auth_group', 'Api-删除用户组', '1', '');
INSERT INTO `z_auth_rule` VALUES ('7', 'Auth/auth_rule', '列表-权限规则', '1', '');
INSERT INTO `z_auth_rule` VALUES ('8', 'Auth/auth_group', '列表-用户组', '1', '');
INSERT INTO `z_auth_rule` VALUES ('9', 'Auth/auth_group_access', '列表-用户组明细', '1', '');
INSERT INTO `z_auth_rule` VALUES ('10', 'User/index', '列表-用户信息', '1', '');
INSERT INTO `z_auth_rule` VALUES ('11', 'Auth/edit_auth_group', '窗口-编辑用户组', '1', '');
INSERT INTO `z_auth_rule` VALUES ('12', 'Auth/edit_auth_group_access', '窗口-编辑用户组明细', '1', '');
INSERT INTO `z_auth_rule` VALUES ('13', 'Site/close', '窗口-关闭站点', '1', '');
INSERT INTO `z_auth_rule` VALUES ('14', 'Auth/edit_auth_rule', '窗口-编辑权限规则', '1', '');
INSERT INTO `z_auth_rule` VALUES ('15', 'Auth/edit_normal_auth', '窗口-编辑普通权限', '1', '');
INSERT INTO `z_auth_rule` VALUES ('16', 'Auth/edit_menu_auth', '窗口-编辑菜单权限', '1', '');
INSERT INTO `z_auth_rule` VALUES ('17', 'Menu/index', '列表-菜单信息', '1', '');
INSERT INTO `z_auth_rule` VALUES ('18', 'Menu/edit', '窗口-编辑菜单', '1', '');
INSERT INTO `z_auth_rule` VALUES ('19', 'Menu/menu_auth_edit', '窗口-编辑菜单权限', '1', '');
INSERT INTO `z_auth_rule` VALUES ('20', 'User/change_password', '窗口-修改密码', '1', '');
INSERT INTO `z_auth_rule` VALUES ('21', 'Site/info', '窗口-站点信息', '1', '');
INSERT INTO `z_auth_rule` VALUES ('22', 'User/edit', '窗口-编辑用户', '1', '');
INSERT INTO `z_auth_rule` VALUES ('23', 'Api/Auth/get_auth_group', 'Api-获取用户组', '1', '');
INSERT INTO `z_auth_rule` VALUES ('24', 'Api/Auth/get_auth_rule', 'Api-获取权限规则', '1', '');
INSERT INTO `z_auth_rule` VALUES ('25', 'Api/Auth/edit_auth_group', 'Api-编辑用户组', '1', '');
INSERT INTO `z_auth_rule` VALUES ('26', 'Api/Auth/del_auth_rule', 'Api-删除权限规则', '1', '');
INSERT INTO `z_auth_rule` VALUES ('27', 'Api/Auth/add_auth_rule', 'Api-新增权限规则', '1', '');
INSERT INTO `z_auth_rule` VALUES ('28', 'Api/Auth/edit_auth_rule', 'Api-编辑权限规则', '1', '');
INSERT INTO `z_auth_rule` VALUES ('29', 'Api/Auth/get_auth_group_access', 'Api-获取用户组明细', '1', '');
INSERT INTO `z_auth_rule` VALUES ('30', 'Api/Auth/add_auth_group_access', 'Api-新增用户组明细', '1', '');
INSERT INTO `z_auth_rule` VALUES ('31', 'Api/Auth/edit_auth_group_access', 'Api-编辑用户组明细', '1', '');
INSERT INTO `z_auth_rule` VALUES ('32', 'Api/Auth/del_auth_group_access', 'Api-删除用户组明细', '1', '');
INSERT INTO `z_auth_rule` VALUES ('33', 'Api/Auth/get_group_normal_auth', 'Api-用户组对应普通权限', '1', '');
INSERT INTO `z_auth_rule` VALUES ('34', 'Api/Auth/get_group_menu_auth', 'Api-用户组对应菜单权限', '1', '');
INSERT INTO `z_auth_rule` VALUES ('35', 'Api/Auth/edit_normal_auth', 'Api-编辑用户组对应普通权限', '1', '');
INSERT INTO `z_auth_rule` VALUES ('36', 'Api/Auth/edit_menu_auth', 'Api-编辑用户组对应菜单权限', '1', '');
INSERT INTO `z_auth_rule` VALUES ('37', 'Api/Menu/get_treegrid_menus', 'Api-获取菜单树形表格', '1', '');
INSERT INTO `z_auth_rule` VALUES ('38', 'Api/Menu/edit', 'Api-编辑菜单项', '1', '');
INSERT INTO `z_auth_rule` VALUES ('39', 'Api/Menu/add', 'Api-添加菜单项', '1', '');
INSERT INTO `z_auth_rule` VALUES ('40', 'Api/Menu/delete', 'Api-删除菜单项', '1', '');
INSERT INTO `z_auth_rule` VALUES ('41', 'Api/Menu/get_menu_auth', 'Api-获取菜单拥有的权限', '1', '');
INSERT INTO `z_auth_rule` VALUES ('42', 'Api/Menu/add_menu_auth', 'Api-添加菜单拥有的权限', '1', '');
INSERT INTO `z_auth_rule` VALUES ('43', 'Api/Menu/del_menu_auth', 'Api-删除菜单拥有权限', '1', '');
INSERT INTO `z_auth_rule` VALUES ('44', 'Api/Site/edit_info', 'Api-编辑站点信息', '1', '');
INSERT INTO `z_auth_rule` VALUES ('45', 'Api/Site/get_info', 'Api-获取站点信息', '1', '');
INSERT INTO `z_auth_rule` VALUES ('46', 'Api/Site/close', 'Api-关闭站点', '1', '');
INSERT INTO `z_auth_rule` VALUES ('47', 'Api/User/get_users', 'Api-获取用户列表', '1', '');
INSERT INTO `z_auth_rule` VALUES ('48', 'Api/User/save', 'Api-保存用户信息', '1', '');
INSERT INTO `z_auth_rule` VALUES ('51', 'Cheatsheet/index', '列表-各种快捷键', '1', '');
INSERT INTO `z_auth_rule` VALUES ('52', 'Cheatsheet/edit', '窗口-编辑快捷键', '1', '');
INSERT INTO `z_auth_rule` VALUES ('53', 'Cheatsheet/add', '窗口-添加快捷键', '1', '');
INSERT INTO `z_auth_rule` VALUES ('54', 'Cheatsheet/batch_add', '窗口-批量添加快捷键', '1', '');
INSERT INTO `z_auth_rule` VALUES ('55', 'Api/Cheatsheet/get_cheatsheets', 'Api-获取各种快捷键', '1', '');
INSERT INTO `z_auth_rule` VALUES ('56', 'Api/Cheatsheet/add', 'Api-添加快捷键', '1', '');
INSERT INTO `z_auth_rule` VALUES ('57', 'Api/Cheatsheet/batch_add', 'Api-批量添加快捷键', '1', '');
INSERT INTO `z_auth_rule` VALUES ('58', 'Api/Cheatsheet/edit', 'Api-编辑快捷键', '1', '');
INSERT INTO `z_auth_rule` VALUES ('59', 'Api/Cheatsheet/delete', 'Api-删除快捷键', '1', '');
INSERT INTO `z_auth_rule` VALUES ('60', 'Api/Menu/get_all_tree_menus', 'Api-获取全部菜单', '1', '');

-- ----------------------------
-- Table structure for `z_cheatsheet`
-- ----------------------------
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
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COMMENT='快捷键或命令表';

-- ----------------------------
-- Records of z_cheatsheet
-- ----------------------------
INSERT INTO `z_cheatsheet` VALUES ('1', '0', 'sublime', 'ctrl+x', '删除整行', '1', '1403424767', '1', '1403442753');
INSERT INTO `z_cheatsheet` VALUES ('2', '0', 'sublime', 'ctrl+k+u', '转换大写', '1', '1403424795', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('37', '0', 'vim', 'j', '光标下移一行', '1', '1403443184', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('4', '0', 'sublime', 'Ctrl+L\r', '选择整行(按住-继续选择下行)\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('5', '0', 'sublime', 'Ctrl+KK\r', '从光标处删除至行尾\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('6', '0', 'sublime', 'Ctrl+Shift+K\r', '删除整行\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('7', '0', 'sublime', 'Ctrl+Shift+D\r', '复制光标所在整行，插入在该行之前\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('8', '0', 'sublime', 'Ctrl+J\r', '合并行(已选择需要合并的多行时)\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('9', '0', 'sublime', 'Ctrl+KU\r', '改为大写\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('10', '0', 'sublime', 'Ctrl+KL\r', '改为小写\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('11', '0', 'sublime', 'Ctrl+D\r', '选词(按住-继续选择下个相同的字符串)\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('12', '0', 'sublime', 'Ctrl+M\r', '光标移动至括号内开始或结束的位置\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('13', '0', 'sublime', 'Ctrl+Shift+M\r', '选择括号内的内容(按住-继续选择父括号)\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('14', '0', 'sublime', 'Ctrl+/\r', '注释整行(如已选择内容，同“Ctrl+Shift+/”效果)\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('15', '0', 'sublime', 'Ctrl+Shift+/\r', '注释已选择内容\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('16', '0', 'sublime', 'Ctrl+Space\r', '自动完成(win与系统快捷键冲突，需修改)\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('17', '0', 'sublime', 'Ctrl+Z\r', '撤销\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('18', '0', 'sublime', 'Ctrl+Y\r', '恢复撤销\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('19', '0', 'sublime', 'Ctrl+Shift+V\r', '粘贴并自动缩进(其它兄弟写的，实测win系统自动缩进无效)\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('20', '0', 'sublime', 'Ctrl+M\r', '光标跳至对应的括号\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('21', '0', 'sublime', 'Alt+.\r', '闭合当前标签\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('22', '0', 'sublime', 'Ctrl+Shift+A\r', '选择光标位置父标签对儿\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('23', '0', 'sublime', 'Ctrl+Shift+[\r', '折叠代码\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('24', '0', 'sublime', 'Ctrl+Shift+]\r', '展开代码\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('25', '0', 'sublime', 'Ctrl+KT\r', '折叠属性\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('26', '0', 'sublime', 'Ctrl+K0\r', '展开所有\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('27', '0', 'sublime', 'Ctrl+U\r', '软撤销\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('28', '0', 'sublime', 'Ctrl+T\r', '词互换\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('29', '0', 'sublime', 'Ctrl+Enter\r', '插入行后\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('30', '0', 'sublime', 'Ctrl+Shift Enter\r', '插入行前\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('31', '0', 'sublime', 'Ctrl+K Backspace\r', '从光标处删除至行首\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('32', '0', 'sublime', 'Ctrl+Shift+UP\r', '与上行互换\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('33', '0', 'sublime', 'Ctrl+Shift+DOWN\r', '与下行互换\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('34', '0', 'sublime', 'Shift+Tab\r', '去除缩进\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('35', '0', 'sublime', 'Tab\r', '缩进\r', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('36', '0', 'sublime', 'F9', '行排序(按a-z)', '1', '1403439935', '0', '0');
INSERT INTO `z_cheatsheet` VALUES ('38', '0', 'git', 'git push origin master', 'push本地代码', '1', '1403443288', '0', '0');

-- ----------------------------
-- Table structure for `z_log_info`
-- ----------------------------
DROP TABLE IF EXISTS `z_log_info`;
CREATE TABLE `z_log_info` (
  `log_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL,
  `add_time` int(11) unsigned NOT NULL,
  `ip` int(11) unsigned NOT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='登陆日志';

-- ----------------------------
-- Records of z_log_info
-- ----------------------------

-- ----------------------------
-- Table structure for `z_menu`
-- ----------------------------
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
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of z_menu
-- ----------------------------
INSERT INTO `z_menu` VALUES ('1', '0', '0', '', '', '基本设置', '', '0', 'null', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('2', '1', '0', '', 'site_info', '站点信息', 'js/admin/Site/info.js', '0', 'dialog', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('3', '1', '0', '', 'menu_list', '菜单列表', 'Menu/index', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('4', '1', '0', '', 'close_site', '关闭站点', 'js/admin/Site/close.js', '0', 'dialog', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('5', '0', '0', '', '', '权限管理', '', '0', 'null', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('6', '5', '0', '', '', '权限规则', 'Auth/auth_rule', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('7', '5', '0', '', '', '用户组', 'Auth/auth_group', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('8', '5', '0', '', '', '用户组明细', 'Auth/auth_group_access', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('9', '0', '0', '', '', '用户管理', '', '0', 'null', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('10', '9', '0', '', '', '用户列表', 'User/index', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('13', '0', '0', '', '', '缓存管理', '', '0', 'null', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('14', '13', '0', '', '', '缓存列表', '', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('20', '0', '0', '', 'common_site', '常用站点', '', '0', 'null', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('21', '20', '0', '', 'jquery_1_7_api', 'jquery1.7 API', 'http://tool.oschina.net/uploads/apidocs/jquery/', '0', 'iframe', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('22', '20', '0', '', 'baidu', '百度', 'http://www.baidu.com/', '0', 'iframe', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('24', '20', '0', '', 'cheatsheet', '各种快捷键', 'Cheatsheet/index', '0', 'tab', 'open', '0', '1');

-- ----------------------------
-- Table structure for `z_menu_auth`
-- ----------------------------
DROP TABLE IF EXISTS `z_menu_auth`;
CREATE TABLE `z_menu_auth` (
  `menu_id` smallint(6) unsigned NOT NULL COMMENT '菜单ID',
  `auth_id` smallint(6) unsigned NOT NULL COMMENT '权限ID',
  `status` enum('0','1') NOT NULL DEFAULT '1' COMMENT '状态 1-正常 2-禁用'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='菜单权限表';

-- ----------------------------
-- Records of z_menu_auth
-- ----------------------------
INSERT INTO `z_menu_auth` VALUES ('3', '17', '0');
INSERT INTO `z_menu_auth` VALUES ('3', '37', '0');
INSERT INTO `z_menu_auth` VALUES ('2', '45', '0');
INSERT INTO `z_menu_auth` VALUES ('2', '21', '0');
INSERT INTO `z_menu_auth` VALUES ('4', '13', '0');
INSERT INTO `z_menu_auth` VALUES ('6', '7', '0');
INSERT INTO `z_menu_auth` VALUES ('6', '24', '0');
INSERT INTO `z_menu_auth` VALUES ('7', '8', '0');
INSERT INTO `z_menu_auth` VALUES ('7', '23', '0');
INSERT INTO `z_menu_auth` VALUES ('8', '9', '0');
INSERT INTO `z_menu_auth` VALUES ('8', '29', '0');
INSERT INTO `z_menu_auth` VALUES ('7', '33', '0');
INSERT INTO `z_menu_auth` VALUES ('7', '34', '0');
INSERT INTO `z_menu_auth` VALUES ('10', '47', '0');
INSERT INTO `z_menu_auth` VALUES ('10', '10', '0');
INSERT INTO `z_menu_auth` VALUES ('24', '55', '0');
INSERT INTO `z_menu_auth` VALUES ('24', '51', '0');

-- ----------------------------
-- Table structure for `z_site_info`
-- ----------------------------
DROP TABLE IF EXISTS `z_site_info`;
CREATE TABLE `z_site_info` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `site_title` char(40) NOT NULL COMMENT '站点标题',
  `site_description` varchar(200) NOT NULL COMMENT '站点描述',
  `site_keywords` varchar(100) NOT NULL COMMENT '站点关键词',
  `site_theme` char(20) NOT NULL DEFAULT 'default' COMMENT '站点默认主题',
  `site_status` enum('1','0') NOT NULL DEFAULT '1' COMMENT '站点状态',
  `close_to_time` int(11) unsigned NOT NULL COMMENT '关闭至时间',
  `close_reason` char(200) NOT NULL COMMENT '关闭原因',
  `cookie_expire_time` smallint(6) unsigned NOT NULL DEFAULT '1800' COMMENT 'cookie过期时间，默认30分钟',
  `login_vcode` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '登陆验证码',
  `register_vcode` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '注册验证码',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='站点信息表';

-- ----------------------------
-- Records of z_site_info
-- ----------------------------
INSERT INTO `z_site_info` VALUES ('1', 'IMZHI.ME', 'IMZHI', 'IMZHI', 'bootstrap', '1', '0', '', '0', '1', '1');

-- ----------------------------
-- Table structure for `z_user`
-- ----------------------------
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
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of z_user
-- ----------------------------
INSERT INTO `z_user` VALUES ('1', 'tt', '81dc9bdb52d04dc20036dbd8313ed055', '0', '0', 'tt@tt.com', '2014-06-25', '80', '1403405245', '2130706433', 'metro-gray', 'user', 'pass');
INSERT INTO `z_user` VALUES ('6', 'yy', '81dc9bdb52d04dc20036dbd8313ed055', '0', '0', '', null, '2', '1400940410', '2130706433', 'black', 'user', 'pass');
INSERT INTO `z_user` VALUES ('7', 'xx', '81dc9bdb52d04dc20036dbd8313ed055', '1402893403', '2130706433', '', null, '4', '1402899752', '2130706433', 'bootstrap', 'user', 'pass');
INSERT INTO `z_user` VALUES ('8', 'uu', '81dc9bdb52d04dc20036dbd8313ed055', '1402989520', '2130706433', 'tt@tt.com', '2014-05-27', '3', '1403403331', '2130706433', 'metro-orange', 'user', 'pass');
