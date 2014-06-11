var MENU = {
    DLG_ID: '#menu_dialog',
    TG_ID: '#menu_treegrid',
    TB_ID: '#menu_treegrid_toolbar',
    add: function() {
        var self = this;
        $('<div/>').attr('id', self.DLG_ID.substring(1)).dialog({
            title: '添加菜单项',
            width: 300,
            cache: false,
            modal: true,
            iconCls: 'icon-help',
            collapsible: true,
            href: '/index.php/Admin/Menu/edit',
            onLoad: function() {
                $(self.DLG_ID).Center_Dialog();
            },
            onClose: function() {
                $(self.DLG_ID).Destroy_Dialog();
            },
            buttons: [{
                text: '保存',
                iconCls: 'icon-help',
                handler: function() {}
            }, {
                text: '关闭',
                iconCls: 'icon-no',
                handler: function() {
                    $(self.DLG_ID).Destroy_Dialog();
                }
            }]
        });
    },
    edit: function() {
        var self = this;
        var selected = $(self.TG_ID).Get_Selected_Treegrid();
        if (selected) {
            $('<div/>').attr('id', self.DLG_ID.substring(1)).dialog({
                title: '编辑菜单项',
                width: 300,
                cache: false,
                modal: true,
                iconCls: 'icon-help',
                collapsible: true,
                href: '/index.php/Admin/Menu/edit',
                onLoad: function() {
                    $('form', self.DLG_ID).form('load', selected);
                    $(self.DLG_ID).Center_Dialog();
                },
                onOpen: function() {},
                onClose: function() {
                    $(self.DLG_ID).Destroy_Dialog();
                },
                buttons: [{
                    text: '保存',
                    iconCls: 'icon-help',
                    handler: function() {
                        $('form', self.DLG_ID).form('submit', {
                            url: '/index.php/Api/Menu/do_edit',
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
                                if (result.status === 1) {
                                    $.Show_Warning(result.info);
                                    $(self.DLG_ID).Destroy_Dialog();
                                    $(self.TG_ID).Reload_Treegrid();
                                } else {
                                    $.Show_Error(result.info);
                                }
                            }
                        });
                    }
                }, {
                    text: '关闭',
                    iconCls: 'icon-no',
                    handler: function() {
                        $(self.DLG_ID).Destroy_Dialog();
                    }
                }]
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
                        $.post('/index.php/Api/Menu/del_menu', {id: selected.menu_id}, function(result) {
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
    add: function() {},
    edit: function() {},
    delete: function() {}
};

$(function() {
    $(MENU.TG_ID).treegrid({
        title: '菜单列表',
        fit: true,
        toolbar: MENU.TB_ID,
        rownumbers: true,
        border: false,
        singleSelect: true,
        animate: true,
        idField: 'menu_id',
        treeField: 'title',
        url: '/index.php/Api/Menu/get_treegrid_menus',
        method: 'post',
        columns: [[
            {field: 'menu_id', title: 'ID', width: 40, align: 'center'},
            {field: 'title', title: '菜单中文名', width: 200},
            {field: 'name', title: '菜单英文名', width: 150},
            {field: 'url', title: 'URL', width: 300},
            {
                field: 'type', title: '类型', width: 50, align: 'center',
                styler: function(value, row) {
                    if (row.children && value !== 'null') {
                        return 'color:#f00';
                    }
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
            console.log(row);
            if (!row.children) {
                $(MENU_AUTH.DG_ID).datagrid('load', {menu_id: row.menu_id});
            }
        }
    });

    $(MENU_AUTH.DG_ID).datagrid({
        iconCls: 'icon-help',
        fit: true,
        toolbar: MENU_AUTH.TB_ID,
        rownumbers: true,
        border: false,
        singleSelect: true,
        idField: 'id',
        url: '/index.php/Api/Menu/get_menu_auth',
        method: 'post',
        columns: [[
            {field: 'name', title: '规则名称', sortable: true, width: 250},
            {field: 'title', title: '规则描述', sortable: true, width: 150}
        ]]
    });
});