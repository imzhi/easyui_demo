var AUTH_GROUP_ACCESS = {
    DG_ID: '#auth_group_access_datagrid',
    TB_ID: '#auth_group_access_datagrid_toolbar',
    DLG_ID: '#auth_group_access_dialog',
    add: function() {
        var self = this;
        $('<div/>').attr('id', self.DLG_ID.substring(1)).Dialog({
            title: '添加用户组明细', width: 300, href: 'Auth/edit_auth_group_access',
            buttonUrl: 'Api/Auth/add_auth_group_access',
            submitSuccessCallback: function() { $(self.DG_ID).Reload_Datagrid(); }
        });
    },
    edit: function() {
        var self = this;
        var selected = $(self.DG_ID).Get_Selected_Datagrid();
        if (selected) {
            $('<div/>').attr('id', self.DLG_ID.substring(1)).Dialog({
                title: '编辑用户组明细', width: 300, href: 'Auth/edit_auth_group_access',
                selected: selected, buttonUrl: 'Api/Auth/edit_auth_group_access',
                onLoadCallback: function() {
                    $('#validatebox_username', self.DLG_ID).attr('disabled', 'disabled');
                },
                submitSuccessCallback: function() { $(self.DG_ID).Reload_Datagrid(); }
            });
        } else { $.Show_Warning('请先选择一项'); }
    },
    delete: function() {
        var self = this;
        var selected = $(self.DG_ID).Get_Selected_Datagrid();
        if (selected) {
            $.messager.confirm('提示', '确定删除吗？', function(r) {
                if (r) {
                    $.post('Api/Auth/del_auth_group_access', {uid: selected.uid}, function(result) {
                        $.Close_Progress();
                        if (result.status === 1) {
                            $(self.DG_ID).Unselect_All_Datagrid(); // 取消选择
                            $.Show_Warning(result.info);
                            $(self.DG_ID).Reload_Datagrid();
                        } else { $.Show_Error(result.info); }
                    }, 'json');
                }
            });
        } else { $.Show_Warning('请先选择一项'); }
    }
};

$(function() {
    $(AUTH_GROUP_ACCESS.DG_ID).Datagrid({
        title: '用户组明细', toolbar: AUTH_GROUP_ACCESS.TB_ID, idField: 'user_id',
        url: 'Api/Auth/get_auth_group_access',
        columns: [[
            {field: 'user_name', title: '用户名', sortable: true, width: 80},
            {field: 'group_names', title: '所属用户组', sortable: true, width: 250}
        ]]
    });
    whetherRemoveToolbar(AUTH_GROUP_ACCESS.TB_ID);
});