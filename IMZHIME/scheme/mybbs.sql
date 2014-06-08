-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- 主机: 127.0.0.1:3306
-- 生成日期: 2014 年 04 月 23 日 23:33
-- 服务器版本: 5.5.19
-- PHP 版本: 5.4.25

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `mybbs`
--

-- --------------------------------------------------------

--
-- 表的结构 `bb_admin_action`
--

DROP TABLE IF EXISTS `bb_admin_action`;
CREATE TABLE IF NOT EXISTS `bb_admin_action` (
  `oid` mediumint(8) unsigned NOT NULL,
  `uid` mediumint(8) unsigned NOT NULL,
  `add_time` int(11) unsigned NOT NULL,
  `type` smallint(5) unsigned NOT NULL,
  `url` varchar(40) NOT NULL DEFAULT '',
  PRIMARY KEY (`oid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='管理员用户动态，加精、置顶、删除...等';

-- --------------------------------------------------------

--
-- 表的结构 `bb_admin_action_type`
--

DROP TABLE IF EXISTS `bb_admin_action_type`;
CREATE TABLE IF NOT EXISTS `bb_admin_action_type` (
  `type_id` smallint(5) unsigned NOT NULL,
  `message` varchar(400) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `bb_admin_log`
--

DROP TABLE IF EXISTS `bb_admin_log`;
CREATE TABLE IF NOT EXISTS `bb_admin_log` (
  `lid` mediumint(8) unsigned NOT NULL,
  `uid` mediumint(8) unsigned NOT NULL,
  `log_time` int(11) unsigned NOT NULL,
  `ip` int(11) unsigned NOT NULL,
  PRIMARY KEY (`lid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='后台登陆日志';

-- --------------------------------------------------------

--
-- 表的结构 `bb_attachment`
--

DROP TABLE IF EXISTS `bb_attachment`;
CREATE TABLE IF NOT EXISTS `bb_attachment` (
  `aid` mediumint(8) unsigned NOT NULL,
  `tid` mediumint(8) unsigned NOT NULL,
  `name` varchar(40) NOT NULL,
  `intro` varchar(200) NOT NULL DEFAULT '',
  `filename` varchar(40) NOT NULL,
  `path` varchar(100) NOT NULL,
  `size` mediumint(8) unsigned NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `bb_class`
--

DROP TABLE IF EXISTS `bb_class`;
CREATE TABLE IF NOT EXISTS `bb_class` (
  `cid` tinyint(2) unsigned NOT NULL,
  `name` varchar(20) NOT NULL,
  `fid` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='分类';

-- --------------------------------------------------------

--
-- 表的结构 `bb_forum`
--

DROP TABLE IF EXISTS `bb_forum`;
CREATE TABLE IF NOT EXISTS `bb_forum` (
  `fid` smallint(5) unsigned NOT NULL,
  `parent_id` smallint(5) unsigned NOT NULL,
  `name` varchar(20) NOT NULL,
  `intro` varchar(1000) NOT NULL,
  PRIMARY KEY (`fid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='版块';

-- --------------------------------------------------------

--
-- 表的结构 `bb_notification`
--

DROP TABLE IF EXISTS `bb_notification`;
CREATE TABLE IF NOT EXISTS `bb_notification` (
  `nid` mediumint(8) unsigned NOT NULL,
  `uid` mediumint(8) unsigned NOT NULL,
  `content` varchar(255) NOT NULL,
  `status` enum('unread','readed','ignore','del') DEFAULT NULL COMMENT '是否已经阅读/删除',
  `note_type` enum('system','normal') DEFAULT NULL COMMENT '系统通知或者其它通知',
  PRIMARY KEY (`nid`),
  KEY `uid` (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `bb_post`
--

DROP TABLE IF EXISTS `bb_post`;
CREATE TABLE IF NOT EXISTS `bb_post` (
  `pid` mediumint(8) unsigned NOT NULL,
  `tid` mediumint(8) unsigned NOT NULL,
  `uid` mediumint(8) unsigned NOT NULL,
  `content` int(11) unsigned NOT NULL,
  `add_time` int(11) unsigned NOT NULL,
  `edit_time` int(11) unsigned NOT NULL,
  `like_num` smallint(5) unsigned NOT NULL DEFAULT '0',
  `dislike_num` smallint(5) unsigned NOT NULL DEFAULT '0',
  `report_num` smallint(5) unsigned NOT NULL DEFAULT '0',
  `status` enum('0','1') DEFAULT '1' COMMENT '是否已删除',
  PRIMARY KEY (`pid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `bb_thread`
--

DROP TABLE IF EXISTS `bb_thread`;
CREATE TABLE IF NOT EXISTS `bb_thread` (
  `tid` mediumint(8) unsigned NOT NULL,
  `uid` mediumint(8) unsigned NOT NULL,
  `add_time` int(11) unsigned NOT NULL,
  `edit_time` int(11) unsigned NOT NULL DEFAULT '0',
  `username` varchar(20) NOT NULL,
  `last_poster` varchar(20) NOT NULL,
  `last_post_time` int(11) unsigned NOT NULL,
  `reply_num` smallint(5) unsigned NOT NULL DEFAULT '0',
  `like_num` smallint(5) unsigned NOT NULL DEFAULT '0',
  `dislike_num` smallint(5) unsigned NOT NULL DEFAULT '0',
  `report_num` smallint(5) unsigned NOT NULL DEFAULT '0',
  `is_good` enum('0','1') DEFAULT '1' COMMENT '是否精品',
  `is_top` enum('0','1') DEFAULT '1' COMMENT '是否置顶',
  `good_time` int(11) unsigned NOT NULL DEFAULT '0',
  `top_time` int(11) unsigned NOT NULL DEFAULT '0',
  `status` enum('0','1') DEFAULT '1' COMMENT '是否已删除',
  PRIMARY KEY (`tid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `bb_user`
--

DROP TABLE IF EXISTS `bb_user`;
CREATE TABLE IF NOT EXISTS `bb_user` (
  `uid` mediumint(8) unsigned NOT NULL,
  `username` varchar(20) NOT NULL,
  `log_num` smallint(5) unsigned NOT NULL DEFAULT '0',
  `last_login` int(11) unsigned NOT NULL,
  `user_type` enum('user','moderator','admin') DEFAULT 'user' COMMENT '用户类型，版主，普通用户，管理员',
  `signature` varchar(200) NOT NULL DEFAULT '' COMMENT '签名',
  `status` enum('check','pass','fail','del') DEFAULT NULL COMMENT '待审核、未通过、通过、已删除',
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `bb_user_action`
--

DROP TABLE IF EXISTS `bb_user_action`;
CREATE TABLE IF NOT EXISTS `bb_user_action` (
  `oid` mediumint(8) unsigned NOT NULL,
  `uid` mediumint(8) unsigned NOT NULL,
  `add_time` int(11) unsigned NOT NULL,
  `type_id` smallint(5) unsigned NOT NULL,
  `url` varchar(40) NOT NULL DEFAULT '',
  PRIMARY KEY (`oid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='动态，收藏、顶、踩...等';

-- --------------------------------------------------------

--
-- 表的结构 `bb_user_action_type`
--

DROP TABLE IF EXISTS `bb_user_action_type`;
CREATE TABLE IF NOT EXISTS `bb_user_action_type` (
  `type_id` smallint(5) unsigned NOT NULL,
  `message` varchar(400) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `bb_user_info`
--

DROP TABLE IF EXISTS `bb_user_info`;
CREATE TABLE IF NOT EXISTS `bb_user_info` (
  `uid` mediumint(8) unsigned NOT NULL,
  `username` varchar(20) NOT NULL,
  `pwd` char(32) NOT NULL,
  `reg_time` int(11) unsigned NOT NULL,
  `reg_ip` int(11) unsigned NOT NULL,
  `email` varchar(40) NOT NULL,
  `qq` char(11) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
