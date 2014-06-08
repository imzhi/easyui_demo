$(function() {
    $('#left_nav_tree').tree({
        animate: true,
        lines: true,
        url: '/index.php/Api/Menu/get_menus',
        loadFilter: function(data) {
            console.log(data);
            return data;
        },
        // data: [{
        //     text: '基本设置',
        //     children: [{
        //         text: '站点信息',
        //         attr: {
        //             type: 'tab',
        //             href: ''
        //         }
        //     }, {
        //         text: '菜单列表',
        //         attr: {
        //             type: 'tab',
        //             href: ''
        //         }
        //     }, {
        //         text: '关闭站点',
        //         attr: {
        //             type: 'dialog',
        //             href: '',
        //         }
        //     }]
        // },{
        //     text: '权限管理',
        //     children: [{
        //         text: '权限规则',
        //         attr: {
        //             type: 'tab',
        //             href: '/index.php/Admin/Auth/auth_rule'
        //         }
        //     },{
        //         text: '用户组',
        //         attr: {
        //             type: 'tab',
        //             href: '/index.php/Admin/Auth/auth_group'
        //         }
        //     },{
        //         text: '用户组明细',
        //         attr: {
        //             type: 'tab',
        //             href: '/index.php/Admin/Auth/auth_group_access'
        //         }
        //     }]
        // },{
        //     text: '用户管理',
        //     children: [{
        //         text: '用户列表',
        //         attr: {
        //             type: 'tab',
        //             href: '/index.php/Admin/User'
        //         }
        //     }]
        // },{
        //     text: '缓存管理',
        //     children: [{
        //         text: '缓存列表',
        //         attr: {
        //             type: 'tab',
        //             href: ''
        //         }
        //     }]
        // }],
        onClick: function(node) {
            if (node.attr) {
                if (node.attr.type === 'tab') {
                    $index_tabs = $('#index_tabs');
                    if ($index_tabs.tabs('exists', node.text)) {
                        $index_tabs.tabs('select', node.text);
                    } else {
                        $index_tabs.tabs('add', {
                            title: node.text,
                            iconCls: 'icon-help',
                            href: node.attr.href,
                            closable: true,
                        });
                    }
                }
            }
        }
    });
});