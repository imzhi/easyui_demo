var AUTH_RULE = {
    DG_ID: '#auth_rule_datagrid',
    TB_ID: '#auth_rule_datagrid_toolbar',
    DLG_ID: '#auth_rule_dialog',
    // 添加用户组
    add: function() {
        var self = this;
        $('<div/>').attr('id', self.DLG_ID.substring(1)).dialog({
            title: '添加权限规则',
            width: 300,
            cache: false,
            modal: true,
            iconCls: 'icon-help',
            collapsible: true,
            href: '/index.php/Admin/Auth/edit_auth_rule',
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
                        url: '/index.php/Api/Auth/do_auth_rule',
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
                title: '编辑权限规则',
                width: 300,
                cache: false,
                modal: true,
                iconCls: 'icon-edit',
                collapsible: true,
                href: '/index.php/Admin/Auth/edit_auth_rule',
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
                            url: '/index.php/Api/Auth/do_auth_rule',
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
                    $.post('/index.php/Api/Auth/del_auth_rule', {id: selected.id}, function(result) {
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
    var dg_id = AUTH_RULE.DG_ID;
    var tb_id = AUTH_RULE.TB_ID;
    $(dg_id).datagrid({
        title: '权限规则',
        fit: true,
        toolbar: tb_id,
        rownumbers: true,
        border: false,
        singleSelect: true,
        pagination: true,
        pageList: [10,20,30,40,50],
        pageSize: 10,
        idField: 'id',
        url: '/index.php/Api/Auth/get_auth_rule',
        method: 'post',
        columns: [[
            {field: 'id', title: 'ID', sortable: true, width: 40, align: 'center'},
            {field: 'name', title: '规则名称', sortable: true, width: 250, align: 'center'},
            {field: 'title', title: '规则描述', sortable: true, width: 150, align: 'center'},
            {field: 'condition', title: '规则表达式', sortable: true, width: 200, align: 'center'},
            {field: 'status', title: '状态', sortable: true, width: 50, align: 'center'}
        ]],
        onDblClickRow: function(rowIndex, rowData) {
            AUTH_RULE.edit();
        }
    });
});