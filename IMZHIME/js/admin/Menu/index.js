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
                handler: function() {
                    $('form', self.DLG_ID).form('submit', {
                        url: '/index.php/Api/Menu/do_add',
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
                        $.post('/index.php/Api/Menu/del_menu', {
                            id: selected.menu_id
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
            $('<div/>').attr('id', self.DLG_ID.substring(1)).dialog({
                title: '添加菜单拥有的权限',
                width: 270,
                cache: false,
                modal: true,
                iconCls: 'icon-help',
                collapsible: true,
                href: '/index.php/Admin/Menu/menu_auth_edit',
                onLoad: function() {
                    $(self.DLG_ID).Center_Dialog();
                    $('form', self.DLG_ID).form('load', selected);
                },
                onClose: function() {
                    $(self.DLG_ID).Destroy_Dialog();
                },
                buttons: [{
                    text: '保存',
                    iconCls: 'icon-help',
                    handler: function() {
                        $('form', self.DLG_ID).form('submit', {
                            url: '/index.php/Api/Menu/do_add_menu_auth',
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
                                    $(self.DG_ID).Reload_Datagrid();
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
            $.Show_Warning('请先在菜单列表中选择一项子节点');
        }
    },
    delete: function() {
        var self = this;
        var selected = $(self.DG_ID).Get_Selected_Datagrid();
        if (selected) {
            $.messager.confirm('提示', '确定删除吗？', function(r) {
                if (r) {
                    $.post('/index.php/Api/Menu/del_menu_auth', {
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
    $(MENU.TG_ID).treegrid({
        title:'菜单列表',
        iconCls:'icon-help',
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
            // console.log(row);
            if (!row.children) {
                $(MENU_AUTH.DG_ID).datagrid('load', {menu_id: row.menu_id});
            } else {
                // 选择了父菜单节点则，载入空数据
                $(MENU_AUTH.DG_ID).datagrid('loadData', {total: 0, rows: []});
            }
        }
    });

    $(MENU_AUTH.DG_ID).datagrid({
        title:'拥有的权限',
        iconCls:'icon-help',
        border: false,
        fit: true,
        rownumbers: true,
        singleSelect: true,
        toolbar: MENU_AUTH.TB_ID,
        idField: 'id',
        url: '/index.php/Api/Menu/get_menu_auth',
        method: 'post',
        columns: [[
            {field: 'name', title: '规则名称', sortable: true, width: 200},
            {field: 'title', title: '规则描述', sortable: true, width: 150}
        ]]
    });
});