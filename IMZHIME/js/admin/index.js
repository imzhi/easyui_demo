var INDEX = {
    LEFT_NAV_TREE_ID: '#left_nav_tree',
    TABS_ID: '#index_tabs',
    DLG_ID: '#index_dialog',
    CB_THEMES_ID: '#combobox_themes',
    full_screen_view: function() {},
    expand_view: function() {
        if ($('#left_layout').layout().panel('options').collapsed) {
            $('body').layout('expand', 'south');
            $('body').layout('expand', 'north');
            $('body').layout('expand', 'west');
        } else {
            $('body').layout('collapse', 'south');
            $('body').layout('collapse', 'north');
            $('body').layout('collapse', 'west');
        }
    },
    close_tab: function() {
        var $index_tabs = $(INDEX.TABS_ID);
        $index_tabs.tabs('close', $index_tabs.tabs('getTabIndex', $index_tabs.tabs('getSelected')));
    },
    close_other_tabs: function() {
        var $index_tabs = $(INDEX.TABS_ID);

        var all_tabs = $index_tabs.tabs('tabs');
        var count = all_tabs.length;

        var curr_tab = $index_tabs.tabs('getSelected');
        var curr_index = $index_tabs.tabs('getTabIndex', curr_tab);
        var curr_title = $index_tabs.tabs('getTab', curr_index).panel('options').title;
        while (count--) {
            if (count !== curr_index && $index_tabs.tabs('getTab', count).panel('options').closable) {
                $index_tabs.tabs('close', count);
            }
        }
        $index_tabs.tabs('select', curr_title);
    },
    close_left_tabs: function() {},
    close_right_tabs: function() {},
    close_all_tabs: function() {
        var $index_tabs = $(INDEX.TABS_ID);
        var all_tabs = $index_tabs.tabs('tabs');
        var count = all_tabs.length;
        while(count--) {
            if ($index_tabs.tabs('getTab', count).panel('options').closable) {
                $index_tabs.tabs('close', count);
            }
        }
    },
    add_tab: function(title, url) {
        $(INDEX.TABS_ID).tabs('add', {
            title: title,
            href: url,
            iconCls: 'icon-help',
            closable: true,
            tools: [{
                iconCls: 'icon-mini-refresh',
                handler: function() {
                    INDEX.refresh_tab(title, url);
                }
            }]
        });
    },
    refresh_tab: function(title, url) {
        $(INDEX.TABS_ID).tabs('select', title).tabs('getTab', title).panel('refresh', url);
    },
    sign_in: function() {
        var self = this;
        $('<div/>').attr('id', self.DLG_ID.substring(1)).dialog({
            title: '登陆',
            width: 280,
            cache: false,
            modal: true,
            iconCls: 'icon-help',
            collapsible: true,
            href: '/index.php/Public/sign_in',
            onLoad: function() {
                $(self.DLG_ID).Center_Dialog();
            },
            onClose: function() {
                $(self.DLG_ID).Destroy_Dialog();
            },
            buttons: [{
                text: '登陆',
                iconCls: 'icon-help',
                handler: function() {
                    $('form', self.DLG_ID).form('submit', {
                        url: '/index.php/Api/Public/sign_in',
                        onSubmit: function() {
                            var isValid = $(this).form('validate');
                            if (!isValid) {
                                $.Close_Progress();
                            }
                            return isValid;
                        },
                        success: function(res) {
                            $.Close_Progress();
                            var result = $.parseJSON(res);
                            if (1 === result.status) {
                                // $.Show_Warning(result.info);
                                $(self.DLG_ID).Destroy_Dialog();
                                window.location = result.data;
                            } else {
                                SIGN_IN.refreshVcode();
                                $.Show_Error(result.info);
                            }
                        }
                    });
                }
            }, {
                text: '关闭',
                iconCls: 'icon-no',
                handler: function() {
                    console.log($(self.DLG_ID));
                    $(self.DLG_ID).Destroy_Dialog();
                }
            }]
        });
    },
    sign_up: function() {},
    change_password: function() {
        var self = this;
        $('<div/>').attr('id', self.DLG_ID.substring(1)).dialog({
            title: '修改密码',
            width: 280,
            cache: false,
            modal: true,
            iconCls: 'icon-help',
            collapsible: true,
            href: '/index.php/User/change_password',
            onLoad: function() {
                $(self.DLG_ID).Center_Dialog();
            },
            onClose: function() {
                $(self.DLG_ID).Destroy_Dialog();
            },
            buttons: [{
                text: '保存',
                iconCls: 'icon-help',
                handler: function() {
                    $('form', self.DLG_ID).form('submit', {
                        url: '/index.php/Api/User/change_password',
                        onSubmit: function() {
                            var isValid = $(this).form('validate');
                            if (!isValid) {
                                $.Close_Progress();
                            }
                            return isValid;
                        },
                        success: function(res) {
                            $.Close_Progress();
                            var result = $.parseJSON(res);
                            if (1 === result.status) {
                                $.Show_Warning(result.info);
                                $(self.DLG_ID).Destroy_Dialog();
                                // window.location = result.data;
                            } else {
                                SIGN_IN.refreshVcode();
                                $.Show_Error(result.info);
                            }
                        }
                    });
                }
            }, {
                text: '关闭',
                iconCls: 'icon-no',
                handler: function() {
                    console.log($(self.DLG_ID));
                    $(self.DLG_ID).Destroy_Dialog();
                }
            }]
        });
    },
    log_out: function() {
        $.messager.confirm('提示', '确定要登出吗？', function(r) {
            if (r) {
                $.post('/index.php/Api/Public/log_out', function(result) {
                    if (result.status === 1) {
                        window.location = result.data;
                    } else {
                        $.Show_Error(result.info);
                    }
                }, 'json');
            }
        });
    }
};

$(function() {
    $(INDEX.LEFT_NAV_TREE_ID).tree({
        animate: true,
        lines: true,
        url: '/index.php/Api/Menu/get_tree_menus',
        loadFilter: function(data) {
            return data;
        },
        onClick: function(node) {
            if (!$(INDEX.LEFT_NAV_TREE_ID).tree('isLeaf', node.target)) {
                $(INDEX.LEFT_NAV_TREE_ID).tree('toggle', node.target);
            } else if (node.attributes) {
                if (node.attributes.type === 'tab') {
                    if ($(INDEX.TABS_ID).tabs('exists', node.text)) {
                        $(INDEX.TABS_ID).tabs('select', node.text);
                    } else {
                        INDEX.add_tab(node.text, node.attributes.url);
                    }
                }
            }
        }
    });

    $(INDEX.CB_THEMES_ID).combobox({
        url: '/index.php/Api/Data/combobox_themes',
        valueField: 'id',
        textField: 'value',
        groupField: 'group',
        editable: false,
        panelHeight: 'auto',
        onLoadSuccess: function() {
            $(this).combobox('setValue', window.DEFAULTS.THEME);
        },
        onSelect: function(record) {
            var $link = $('link:first');
            var arr = $link.attr('href').split('/');
            arr[arr.length - 2] = record.id;
            $link.attr('href', arr.join('/'));
            $.post('/index.php/Api/Public/set_theme', {theme: record.id}, function(result) {
                if (result.status === 1) {
                    $.Show_Warning(result.info);
                } else {
                    $.Show_Error(result.info);
                }
            }, 'json');
        }
    });
});