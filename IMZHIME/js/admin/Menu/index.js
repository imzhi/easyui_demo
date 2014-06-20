var MENU = {
    DLG_ID: '#menu_dialog',
    TG_ID: '#menu_treegrid',
    TB_ID: '#menu_treegrid_toolbar',
    add: function() {
        var self = this;
        $('<div/>').attr('id', self.DLG_ID.substring(1)).Dialog({
            title: '添加菜单项',
            width: 300,
            iconCls: 'icon-help',
            href: 'Menu/edit',
            buttonIconCls: 'icon-help',
            buttonUrl: 'Api/Menu/add',
            submitSuccessCallback: function() {
                $(self.TG_ID).Reload_Treegrid();
            }
        });
    },
    edit: function() {
        var self = this;
        var selected = $(self.TG_ID).Get_Selected_Treegrid();
        if (selected) {
            $('<div/>').attr('id', self.DLG_ID.substring(1)).Dialog({
                title: '编辑菜单项',
                width: 300,
                href: 'Menu/edit',
                selected: selected,
                buttonUrl: 'Api/Menu/edit',
                submitSuccessCallback: function() {
                    $(self.TG_ID).Reload_Treegrid();
                }
            });
        } else {
            $.Show_Warning('请先选择一项');
        }
    },
    delete: function() {
        var self = this;
        var selected = $(self.TG_ID).Get_Selected_Treegrid();
        if (selected) {
            // 简化逻辑。必须先删除下级元素
            if (selected.children) {
                $.Show_Warning('请先删除下级元素');
            } else {
                $.messager.confirm('提示', '确定删除吗？', function(r) {
                    if (r) {
                        $.post('Api/Menu/delete', {
                            menu_id: selected.menu_id
                        }, function(result) {
                            $.Close_Progress();
                            if (result.status === 1) {
                                $.Show_Warning(result.info);
                                $(self.TG_ID).Unselect_All_Treegrid(); // 取消选择
                                $(self.TG_ID).Reload_Treegrid();
                            } else {
                                $.Show_Error(result.info);
                            }
                        }, 'json');
                    }
                });
            }
        } else {
            $.Show_Warning('请先选择一项');
        }
    }
};

var MENU_AUTH = {
    DLG_ID: '#menu_auth_dialog',
    DG_ID: '#menu_auth_datagrid',
    TB_ID: '#menu_auth_datagrid_toolbar',
    add: function() {
        var self = this;
        var selected = $(MENU.TG_ID).Get_Selected_Treegrid();
        if (selected && !selected.children) {
            $('<div/>').attr('id', self.DLG_ID.substring(1)).Dialog({
                title: '添加菜单拥有的权限',
                href: 'Menu/menu_auth_edit',
                selected: selected,
                buttonUrl: 'Api/Menu/add_menu_auth',
                submitSuccessCallback: function() {
                    $(self.DG_ID).Reload_Datagrid();
                }
            });
        } else {
            $.Show_Warning('请先在菜单列表中选择一项子节点');
        }
    },
    delete: function() {
        var self = this;
        var selected = $(self.DG_ID).Get_Selected_Datagrid();
        if (selected) {
            $.messager.confirm('提示', '确定删除吗？', function(r) {
                if (r) {
                    $.post('Api/Menu/del_menu_auth', {
                        menu_id: selected.menu_id, auth_id: selected.auth_id
                    }, function(result) {
                        $.Close_Progress();
                        if (result.status === 1) {
                            $.Show_Warning(result.info);
                            $(self.DG_ID).Unselect_All_Datagrid(); // 取消选择
                            $(self.DG_ID).Reload_Datagrid();
                        } else {
                            $.Show_Error(result.info);
                        }
                    }, 'json');
                }
            });
        } else {
            $.Show_Warning('请先选择一项');
        }
    }
};

$(function() {
    $(MENU.TG_ID).Treegrid({
        title:'菜单列表',
        toolbar: MENU.TB_ID,
        idField: 'menu_id',
        treeField: 'title',
        url: 'Api/Menu/get_treegrid_menus',
        columns: [[
            {field: 'menu_id', title: 'ID', width: 40, align: 'center'},
            {field: 'title', title: '菜单中文名', width: 200},
            {field: 'name', title: '菜单英文名', width: 150},
            {field: 'url', title: 'URL', width: 300},
            {
                field: 'type', title: '类型', width: 50, align: 'center',
                styler: function(value, row) {
                    if ((row.children && 'null' !== value) ||
                        (/^https?:\/\//.test(row.url) && 'iframe' !== value) ||
                        (/\.js$/.test(row.url) && 'dialog' !== value)) {
                        return 'color:#f00';
                    }
                },
                formatter: function(value, row) {
                    var val;
                    switch (value) {
                        case 'iframe': val = '框架'; break;
                        case 'dialog': val = '对话框'; break;
                        case 'tab': val = '标签'; break;
                        case 'null': val = '无'; break;
                    }
                    return val;
                }
            },
            {field: 'order', title: '排序', width: 40, align: 'center'},
            {
                field: 'state', title: '节点状态', width: 60, align: 'center',
                formatter: function(value, row) {
                    if (value === 'open') {
                        return '展开';
                    }
                    return '折叠';
                }
            },
            {
                field: 'status', title: '状态', width: 40, align: 'center',
                styler: function(value, row) {
                    if (value === '0') {
                        return 'background-color:#D3D3D3;';
                    }
                },
                formatter: function(value, row) {
                    if (value === '1') {
                        return '启用';
                    }
                    return '禁用';
                }
            },
        ]],
        onLoadSuccess: function(row, data) {
            // $(MENU.TG_ID).treegrid('collapseAll');
        },
        rowStyler: function(row) {},
        onClickRow: function(row) {
            // 选择了子节点并且不为iframe类型，则载入数据
            if (!row.children && !/^https?:\/\//.test(row.url)) {
                $(MENU_AUTH.DG_ID).datagrid('load', {menu_id: row.menu_id});
            } else {
                $(MENU_AUTH.DG_ID).datagrid('loadData', {total: 0, rows: []});
            }
        }
    });

    $(MENU_AUTH.DG_ID).Datagrid({
        title:'拥有的权限',
        toolbar: MENU_AUTH.TB_ID,
        pagination: false,
        url: 'Api/Menu/get_menu_auth',
        columns: [[
            { field: 'name', title: '规则名称', sortable: true, width: 200 },
            { field: 'title', title: '规则描述', sortable: true, width: 150 }
        ]]
    });
});