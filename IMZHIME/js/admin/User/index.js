var USER = {
    DLG_ID: '#user_dialog',
    DG_ID: '#user_datagrid',
    TB_ID: '#user_datagrid_toolbar',
    BTN_ID: '#search_button',
    USER_TYPE_CB_ID: '#user_type_combobox',
    USER_STATUS_CB_ID: '#user_status_combobox',
    edit: function() {
        var self = this;
        var selected = $(self.DG_ID).Get_Selected_Datagrid();
        if (selected) {
            $('<div/>').attr('id', self.DLG_ID.substring(1)).Dialog({
                title: '编辑用户',
                href: 'User/edit',
                selected: selected,
                buttonUrl: 'Api/User/save',
                submitSuccessCallback: function() {
                    $(self.DG_ID).Reload_Datagrid();
                }
            });
        } else {
            $.Show_Warning('请先选择一项');
        }
    }
};

$(function() {
    $(USER.DG_ID).Datagrid({
        title: '用户列表',
        toolbar: USER.TB_ID,
        idField: 'user_id',
        url: 'Api/User/get_users',
        columns: [[
            {field: 'user_id', title: 'ID', sortable: true, width: 40, align: 'center'},
            {field: 'user_name', title: '用户名', sortable: true, width: 100},
            {field: 'email', title: '邮箱', sortable: true, width:120},
            {field: 'reg_time', title: '注册时间', sortable: true, width: 120},
            {field: 'reg_ip', title: '注册IP', sortable: true, width: 100},
            {field: 'last_login', title: '最后登陆时间', sortable: true, width: 120},
            {field: 'log_num', title: '登陆次数', sortable: true, width: 60, align: 'center'},
            {field: 'user_type', title: '用户类型', sortable: true, width: 60},
            {field: 'status', title: '状态', sortable: true, width:60},
        ]]
    });

    $(USER.USER_TYPE_CB_ID).Combobox({
        url: 'Api/Status/combobox_user_type'
    });
    $(USER.USER_STATUS_CB_ID).Combobox({
        url: 'Api/Status/combobox_user_status'
    });

    $(USER.BTN_ID).bind('click', function(e) {
        var params = $('#search_form').serializeJSON();
        $(USER.DG_ID).datagrid('load', params);
    });
});