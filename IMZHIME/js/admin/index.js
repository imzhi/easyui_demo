var INDEX = {
    LEFT_NAV_TREE_ID: '#left_nav_tree_1',
    TABS_ID: '#index_tabs',
    DLG_ID: '#index_dialog',
    CB_THEMES_ID: '#combobox_themes',
    PORTAL_ID: '#center_portal',
    refresh_nav_tree: function(serial) {
        $(INDEX.LEFT_NAV_TREE_ID.slice(0, -1) + serial).Reload_Tree();
    },
    full_screen_view: function() {
        $('body').requestFullScreen();
    },
    expand_view: function() {
        if ($('#left_layout').layout().panel('options').collapsed) {
            // $('body').layout('expand', 'south');
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
        var curr_tab = $index_tabs.tabs('getSelected');
        var curr_index = $index_tabs.tabs('getTabIndex', curr_tab);

        if ($index_tabs.tabs('getTab', curr_index).panel('options').closable) {
            $index_tabs.tabs('close', curr_index);
        }
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
    add_iframe_tab: function(title, url) {
        var content = '<iframe scrolling="auto" frameborder="0" marginwidth="0" marginheight="0" src="' + url + '" style="width:100%;height:100%;"></iframe>';
        $(INDEX.TABS_ID).tabs('add', {
            title: title,
            content: content,
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
        var tab = $(INDEX.TABS_ID).tabs('select', title).tabs('getTab', title);
        if (/^https?:\/\//.test(url)) {
            $(INDEX.TABS_ID).tabs('update', {
                tab: tab,
                options: { content: tab.tabs().panel('options').content }
            });
        } else {
            tab.panel('refresh', url);
        }
    },
    sign_in: function() {
        $('<div/>').attr('id', this.DLG_ID.substring(1)).Dialog({
            title: '登陆',
            href: 'Public/sign_in',
            buttonText: '登陆',
            buttonUrl: 'Api/Public/sign_in',
            submitSuccess: function(result) {
                window.location = result.data;
            },
            submitFailureCallback: function() {
                SIGN_IN.refreshVcode();
            }
        });
    },
    sign_up: function() {
        $('<div/>').attr('id', this.DLG_ID.substring(1)).Dialog({
            title: '注册',
            href: 'Public/sign_up',
            buttonText: '注册',
            buttonUrl: 'Api/Public/sign_up',
            submitSuccess: function(result) {
                window.location = result.data;
            },
            submitFailureCallback: function() {
                SIGN_IN.refreshVcode();
            }
        });
    },
    personal_info: function() {
        $('<div/>').attr('id', this.DLG_ID.substring(1)).Dialog({
            title: '个人信息',
            href: 'User/info',
            buttonUrl: 'Api/User/edit_info',
            selected: window.DEFAULTS.USER,
            submitSuccess: function(result) {
                window.location = result.data;
            }
        });
    },
    change_password: function() {
        $('<div/>').attr('id', this.DLG_ID.substring(1)).Dialog({
            title: '修改密码',
            href: 'User/change_password',
            buttonUrl: 'Api/User/change_password',
            submitFailureCallback: function() {
                SIGN_IN.refreshVcode();
            }
        });
    },
    log_out: function() {
        $.messager.confirm('提示', '确定要登出吗？', function(r) {
            if (r) {
                $.post('Api/Public/log_out', function(result) {
                    if (result.status === 1) {
                        window.location = result.data;
                    } else {
                        $.Show_Error(result.info);
                    }
                }, 'json');
            }
        });
    },
    guestbook: function() {
        $('<div/>').attr('id', this.DLG_ID.substring(1)).Dialog({
            title: '留言',
            resizable:true,
            height: 450,
            width: 800,
            content: '<iframe scrolling="auto" frameborder="0" src="Public/guestbook" style="width:100%;height:99%;"></iframe>',
            buttons: [],
            onMove: function(left, top) {
                // console.log(left, top);
                // if (top <= 0) {
                    // $(INDEX.DLG_ID).dialog('move', {
                    //     left: left,
                    //     top: 0
                    // });
                // }
            }
        });
    }
};

$(function() {
    $(INDEX.LEFT_NAV_TREE_ID).Tree({
        url: 'Api/Menu/get_tree_menus',
        onClick: function(node) {
            if (!$(INDEX.LEFT_NAV_TREE_ID).tree('isLeaf', node.target)) {
                $(INDEX.LEFT_NAV_TREE_ID).tree('toggle', node.target);
            } else if (node.attributes) {
                if (node.attributes.type === 'tab') {
                    var data = node.attributes.url.split('/').slice(-2).join('/');
                    $.post('Api/Auth/check_menu_auth', {data: data}, function(res) {
                        if (0 === res) {
                            $.messager.alert('错误', '未授权', 'error');
                            return false;
                        }
                        if ($(INDEX.TABS_ID).tabs('exists', node.text)) {
                            $(INDEX.TABS_ID).tabs('select', node.text);
                        } else {
                            INDEX.add_tab(node.text, node.attributes.url);
                        }
                    });
                } else if (node.attributes.type === 'dialog') {
                    $.get(node.attributes.url + '?' + $.createRandNum(4));
                } else if (node.attributes.type === 'iframe') {
                    if ($(INDEX.TABS_ID).tabs('exists', node.text)) {
                        $(INDEX.TABS_ID).tabs('select', node.text);
                    } else {
                        INDEX.add_iframe_tab(node.text, node.attributes.url);
                    }
                }
            }
        }
    });

    $(INDEX.CB_THEMES_ID).Combobox({
        url: 'Api/Data/combobox_themes',
        groupField: 'group',
        onLoadSuccess: function() {
            $(this).combobox('setValue', window.DEFAULTS.THEME);
        },
        onSelect: function(record) {
            var $link = $('link:first');
            var arr = $link.attr('href').split('/');
            arr[arr.length - 2] = record.id;
            $link.attr('href', arr.join('/'));
            $.post('Api/Public/set_theme', {theme: record.id}, function(result) {
                if (result.status === 1) {
                    $.Show_Warning(result.info);
                } else {
                    $.Show_Error(result.info);
                }
            }, 'json');
        }
    });
    $(INDEX.PORTAL_ID).portal({
        border:false,
        fit:true
    });
});