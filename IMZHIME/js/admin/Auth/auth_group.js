var AUTH_GROUP = {
    DG_ID: '#auth_group_datagrid',
    NA_DG_ID: '#normal_auth_datagrid',
    MA_TG_ID: '#menu_auth_treegrid',
    TB_ID: '#auth_group_datagrid_toolbar',
    DLG_ID: '#auth_group_dialog',
    // 添加用户组
    add: function() {
        var self = this;
        $('<div/>').attr('id', self.DLG_ID.substring(1)).dialog({
            title: '添加用户组',
            width: 280,
            cache: false,
            modal: true,
            iconCls: 'icon-help',
            collapsible: true,
            href: '/index.php/Auth/edit_auth_group',
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
                        url: '/index.php/Api/Auth/add_auth_group',
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
    },
    edit: function() {
        var self = this;
        var selected = $(self.DG_ID).Get_Selected_Datagrid();
        if (selected) {
            $('<div/>').attr('id', self.DLG_ID.substring(1)).dialog({
                title: '编辑用户组',
                width: 280,
                cache: false,
                modal: true,
                iconCls: 'icon-edit',
                collapsible: true,
                href: '/index.php/Admin/Auth/edit_auth_group',
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
                            url: '/index.php/Api/Auth/edit_auth_group',
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
            $.Show_Warning('请先选择一项');
        }
    },
    delete: function() {
        var self = this;
        var selected = $(self.DG_ID).Get_Selected_Datagrid();
        if (selected) {
            $.messager.confirm('提示', '确定删除吗？', function(r) {
                if (r) {
                    $.post('/index.php/Api/Auth/del_auth_group', {id: selected.id}, function(result) {
                        $.Close_Progress();
                        if (result.status === 1) {
                            $(self.DG_ID).Unselect_All_Datagrid(); // 取消选择
                            $.Show_Warning(result.info);
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
    },
    edit_normal_auth: function() {
        var self = this;
        var selected = $(self.DG_ID).Get_Selected_Datagrid();
        if (selected) {
            $('<div/>').attr('id', self.DLG_ID.substring(1)).dialog({
                title: '编辑普通权限',
                width: 280,
                cache: false,
                modal: true,
                iconCls: 'icon-edit',
                collapsible: true,
                href: '/index.php/Admin/Auth/edit_normal_auth',
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
                            url: '/index.php/Api/Auth/edit_normal_auth',
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
                                    $(self.NA_DG_ID).Reload_Datagrid();
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
    edit_menu_auth: function() {
        var self = this;
        var selected = $(self.DG_ID).Get_Selected_Datagrid();
        if (selected) {
            $('<div/>').attr('id', self.DLG_ID.substring(1)).dialog({
                title: '编辑菜单权限',
                width: 280,
                cache: false,
                modal: true,
                iconCls: 'icon-edit',
                collapsible: true,
                href: '/index.php/Admin/Auth/edit_menu_auth',
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
                            url: '/index.php/Api/Auth/edit_menu_auth',
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
                                    $(self.MA_TG_ID).Reload_Treegrid();
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
    }
};

$(function() {
    $(AUTH_GROUP.DG_ID).datagrid({
        title:'用户组',
        iconCls:'icon-help',
        fit: true,
        toolbar: AUTH_GROUP.TB_ID,
        rownumbers: true,
        border: false,
        singleSelect: true,
        pagination: true,
        pageList: CONSTANTS.PAGELIST,
        pageSize: CONSTANTS.PAGESIZE,
        idField: 'id',
        url: '/index.php/Api/Auth/get_auth_group',
        method: 'post',
        columns: [[
            {field: 'id', title: 'ID', sortable: true, width: 40, align: 'center'},
            {field: 'title', title: '用户组', sortable: true, width: 100, align: 'center'},
            {
                field: 'status', title: '状态', sortable: true, width: 50, align: 'center',
                formatter: function(value, row) {
                    if (value === '1') {
                        return '启用';
                    }
                    return '禁用';
                }
            }
        ]],
        onSelect: function(rowIndex, rowData) {
            var selected = $(AUTH_GROUP.DG_ID).Get_Selected_Datagrid();
            $(AUTH_GROUP.NA_DG_ID).datagrid('load', { id: selected.id });
            $(AUTH_GROUP.MA_TG_ID).treegrid('load', { menu_id: selected.id });
            // $(AUTH_GROUP.MA_TG_ID).treegrid('loadData', {total: 0, rows: []});
        }
    });

    $(AUTH_GROUP.NA_DG_ID).datagrid({
        title:'普通权限',
        iconCls:'icon-help',
        fit: true,
        rownumbers: true,
        border: false,
        singleSelect: true,
        url: '/index.php/Api/Auth/get_group_normal_auth',
        method: 'post',
        columns: [[
            {field: 'name', title: '规则名称', width: 150},
            {field: 'title', title: '规则描述', width: 150},
            {field: 'condition', title: '规则表达式', width: 100},
            {
                field: 'status', title: '状态', width: 40, align: 'center',
                formatter: function(value, row) {
                    if (value === '1') {
                        return '启用';
                    }
                    return '禁用';
                }
            }
        ]]
    });

    $(AUTH_GROUP.MA_TG_ID).treegrid({
        title:'菜单权限',
        iconCls:'icon-help',
        fit: true,
        rownumbers: true,
        border: false,
        singleSelect: true,
        animate: true,
        idField: 'menu_id',
        treeField: 'title',
        url: '/index.php/Api/Auth/get_group_menu_auth',
        method: 'post',
        columns: [[
            {field: 'title', title: '菜单中文名', width: 200},
            {field: 'url', title: 'URL', width: 200}
        ]]
    });
});