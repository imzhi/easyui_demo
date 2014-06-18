/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50168
Source Host           : 127.0.0.1:3306
Source Database       : imzhime

Target Server Type    : MYSQL
Target Server Version : 50168
File Encoding         : 65001

Date: 2014-06-18 19:28:20
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
INSERT INTO `z_auth_group` VALUES ('1', '管理员', '1', '3,2,9,10', '1,2,3');
INSERT INTO `z_auth_group` VALUES ('3', '版主', '1', '2,3,7', '1,2,3,4,5,6');
INSERT INTO `z_auth_group` VALUES ('5', '会员', '1', '', '');
INSERT INTO `z_auth_group` VALUES ('6', '贱民', '1', '', '');

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
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of z_auth_rule
-- ----------------------------
INSERT INTO `z_auth_rule` VALUES ('2', 'Auth/add_auth_group', '新增用户组', '1', '');
INSERT INTO `z_auth_rule` VALUES ('3', 'Auth/del_auth_group', '删除用户组', '1', '');
INSERT INTO `z_auth_rule` VALUES ('7', 'Auth/auth_rule', '权限规则', '1', '');
INSERT INTO `z_auth_rule` VALUES ('8', 'Auth/auth_group', '用户组', '1', '');
INSERT INTO `z_auth_rule` VALUES ('9', 'Auth/auth_group_access', '用户组明细', '1', '');
INSERT INTO `z_auth_rule` VALUES ('10', 'User/index', '用户列表', '1', '');
INSERT INTO `z_auth_rule` VALUES ('11', 'Auth/edit_auth_group', '编辑用户组', '1', '');
INSERT INTO `z_auth_rule` VALUES ('12', 'Auth/add_auth_group_access', '新增用户组明细', '1', '');
INSERT INTO `z_auth_rule` VALUES ('13', 'Site/close', '菜单-关闭站点', '1', '');

-- ----------------------------
-- Table structure for `z_cheatsheet`
-- ----------------------------
DROP TABLE IF EXISTS `z_cheatsheet`;
CREATE TABLE `z_cheatsheet` (
  `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `cate_id` smallint(6) unsigned NOT NULL COMMENT '分类ID',
  `command` varchar(100) NOT NULL COMMENT '命令或快捷键',
  `describe` varchar(400) NOT NULL COMMENT '解释描述',
  `add_user_id` smallint(6) unsigned NOT NULL COMMENT '添加人ID',
  `add_time` int(11) unsigned NOT NULL COMMENT '添加时间',
  `edit_user_id` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '编辑人ID',
  `edit_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '编辑时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='快捷键或命令表';

-- ----------------------------
-- Records of z_cheatsheet
-- ----------------------------

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
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of z_menu
-- ----------------------------
INSERT INTO `z_menu` VALUES ('1', '0', '0', '', '', '基本设置', '', '0', 'null', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('2', '1', '0', '', 'site_info', '站点信息', 'js/admin/Site/info.js', '0', 'dialog', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('3', '1', '0', '', 'menu_list', '菜单列表', '/index.php/Menu/index', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('4', '1', '0', '', 'close_site', '关闭站点', 'js/admin/Site/close.js', '0', 'dialog', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('5', '0', '0', '', '', '权限管理', '', '0', 'null', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('6', '5', '0', '', '', '权限规则', '/index.php/Admin/Auth/auth_rule', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('7', '5', '0', '', '', '用户组', '/index.php/Admin/Auth/auth_group', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('8', '5', '0', '', '', '用户组明细', '/index.php/Admin/Auth/auth_group_access', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('9', '0', '0', '', '', '用户管理', '', '0', 'null', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('10', '9', '0', '', '', '用户列表', '/index.php/Admin/User', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('13', '0', '0', '', '', '缓存管理', '', '0', 'null', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('14', '13', '0', '', '', '缓存列表', '', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('15', '14', '0', '', '', '缓存2', '', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('16', '15', '0', '', '', '缓存2_2', '', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('17', '14', '0', '', '', '缓存3', '', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('18', '15', '0', '', '', '缓存2_3', '', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('19', '16', '0', '', '', '缓存2_2_1', '', '0', 'tab', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('20', '0', '0', '', 'tool_site', '工具站点', '', '0', 'null', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('21', '20', '0', '', 'jquery_1_7_api', 'jquery1.7 API', 'http://tool.oschina.net/uploads/apidocs/jquery/', '0', 'iframe', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('22', '20', '0', '', 'baidu', '百度', 'http://www.baidu.com/', '0', 'iframe', 'open', '0', '1');
INSERT INTO `z_menu` VALUES ('23', '0', '0', '', 'test', '测试', '', '0', 'null', 'open', '0', '1');

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
INSERT INTO `z_menu_auth` VALUES ('2', '8', '0');
INSERT INTO `z_menu_auth` VALUES ('2', '2', '0');
INSERT INTO `z_menu_auth` VALUES ('2', '3', '0');
INSERT INTO `z_menu_auth` VALUES ('2', '7', '0');

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
  `birthday` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '生日',
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
INSERT INTO `z_user` VALUES ('1', 'tt', '81dc9bdb52d04dc20036dbd8313ed055', '0', '0', '', '0', '73', '1403062891', '2130706433', 'metro-gray', 'user', 'lock');
INSERT INTO `z_user` VALUES ('6', 'yy', '81dc9bdb52d04dc20036dbd8313ed055', '0', '0', '', '0', '2', '1400940410', '2130706433', 'black', 'user', 'check');
INSERT INTO `z_user` VALUES ('7', 'xx', '81dc9bdb52d04dc20036dbd8313ed055', '1402893403', '2130706433', '', '0', '4', '1402899752', '2130706433', 'bootstrap', 'user', 'pass');
INSERT INTO `z_user` VALUES ('8', 'uu', '81dc9bdb52d04dc20036dbd8313ed055', '1402989520', '2130706433', '', '0', '1', '1402989520', '2130706433', 'metro-blue', 'user', 'pass');
