var AUTH_GROUP_ACCESS = {
    DG_ID: '#auth_group_access_datagrid',
    TB_ID: '#auth_group_access_datagrid_toolbar',
    DLG_ID: '#auth_group_access_dialog',
    add: function() {
        var self = this;
        $('<div/>').attr('id', self.DLG_ID.substring(1)).dialog({
            title: '添加用户组明细',
            width: 280,
            cache: false,
            modal: true,
            iconCls: 'icon-edit',
            collapsible: true,
            href: '/index.php/Admin/Auth/edit_auth_group_access',
            onLoad: function() {
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
                        url: '/index.php/Api/Auth/add_auth_group_access',
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
                title: '编辑用户组明细',
                width: 280,
                cache: false,
                modal: true,
                iconCls: 'icon-edit',
                collapsible: true,
                href: '/index.php/Admin/Auth/edit_auth_group_access',
                onLoad: function() {
                    $(self.DLG_ID).Center_Dialog();
                    $('#edit_auth_group_access_form', self.DLG_ID).form('load', selected);
                    $('#validatebox_username', self.DLG_ID).attr('disabled', 'disabled');
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
                            url: '/index.php/Api/Auth/edit_auth_group_access',
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
                    $.post('/index.php/Api/Auth/del_auth_group_access', {uid: selected.uid}, function(result) {
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
    }
};

$(function() {
    var dg_id = AUTH_GROUP_ACCESS.DG_ID;
    var tb_id = AUTH_GROUP_ACCESS.TB_ID;
    $(dg_id).datagrid({
        title: '用户组明细',
        fit: true,
        toolbar: tb_id,
        rownumbers: true,
        border: false,
        singleSelect: true,
        pagination: true,
        pageList: [10,20,30,40,50],
        pageSize: 10,
        // idField: 'id',
        url: '/index.php/Api/Auth/get_auth_group_access',
        method: 'post',
        columns: [[
            {field: 'user_name', title: '用户名', sortable: true, width: 80, align: 'center'},
            {field: 'group_names', title: '所属用户组', sortable: true, width: 250, align: 'center'},
        ]],
        onDblClickRow: function(rowIndex, rowData) {
            AUTH_GROUP_ACCESS.edit();
        }
    });
});