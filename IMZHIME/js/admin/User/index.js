var USER = {
    DLG_ID: '#user_dialog',
    DG_ID: '#user_datagrid',
    edit: function() {
        var self = this;
        var selected = $(self.DG_ID).Get_Selected_Datagrid();
        if (selected) {
            $('<div/>').attr('id', self.DLG_ID.substring(1)).dialog({
                title: '编辑用户',
                width: 280,
                cache: false,
                modal: true,
                iconCls: 'icon-edit',
                collapsible: true,
                href: '/index.php/Admin/User/edit',
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
                    iconCls: 'icon-save',
                    handler: function() {
                        $('form', self.DLG_ID).form('submit', {
                            url: '/index.php/Api/User/save',
                            onSubmit: function() {
                                var isValid = $(this).form('validate');
                                if (!isValid) {
                                    $.Close_Progress();
                                }
                                return isValid;
                            },
                            success: function() {
                                $.Close_Progress();
                                $(self.DLG_ID).Destroy_Diaglog();
                                $(self.DG_ID).Reload_Datagrid();
                            }
                        });
                    }
                }, {
                    text: '关闭',
                    iconCls: 'icon-no',
                    handler: function() {
                        $(self.DLG_ID).Destroy_Diaglog();
                    }
                }]
            });
        } else {
            $.Show_Warning('请先选择一项');
        }
    }
};

$(function() {
    $('#user_datagrid').datagrid({
        title: '用户列表',
        fit: true,
        toolbar: '#user_datagrid_toolbar',
        rownumbers: true,
        border: false,
        singleSelect: true,
        pagination: true,
        pageList: [10,20,30,40,50],
        pageSize: 10,
        idField: 'user_id',
        url: '/index.php/Api/User/get_users',
        method: 'post',
        columns: [[
            {field: 'user_id', title: 'ID', sortable: true, width: 40, align: 'center'},
            {field: 'user_name', title: '用户名', sortable: true, width: 100, align: 'center'},
            {field: 'email', title: '邮箱', sortable: true, width:120, align: 'center'},
            {field: 'reg_time', title: '注册时间', sortable: true, width: 120, align: 'center'},
            {field: 'reg_ip', title: '注册IP', sortable: true, width: 100, align: 'center'},
            {field: 'last_login', title: '最后登陆时间', sortable: true, width: 120, align: 'center'},
            {field: 'log_num', title: '登陆次数', sortable: true, width: 60, align: 'center'},
            {field: 'user_type', title: '用户类型', sortable: true, width: 60, align: 'center'},
            {field: 'status', title: '状态', sortable: true, width:60, align: 'center'},
        ]]
    });

    $('#user_type_combo').combobox({
        panelHeight: 'auto',
        editable: false,
        valueField: 'value',
        textField: 'text',
        data: [
            {value: '', text: '请选择'},
            {value: 'user', text: 'user'},
            {value: 'moderator', text: 'moderator'},
            {value: 'admin', text: 'admin'}
        ]
    });
    $('#user_status_combo').combobox({
        panelHeight: 'auto',
        editable: false,
        valueField: 'value',
        textField: 'text',
        data: [
            {value: '', text: '请选择'},
            {value: 'check', text: 'check'},
            {value: 'pass', text: 'pass'},
            {value: 'fail', text: 'fail'},
            {value: 'del', text: 'del'},
            {value: 'noaccess', text: 'noaccess'},
            {value: 'nopost', text: 'nopost'},
            {value: 'lock', text: 'lock'}
        ]
    });

    $('#search_button').bind('click', function(e) {
        var params = $('#search_form').serializeJSON();
        $('#user_datagrid').datagrid('load', params);
    });
});