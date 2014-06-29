var AUTH_RULE = {
    DG_ID: '#auth_rule_datagrid',
    TB_ID: '#auth_rule_datagrid_toolbar',
    DLG_ID: '#auth_rule_dialog',
    // 添加用户组
    add: function() {
        var self = this;
        $('<div/>').attr('id', self.DLG_ID.substring(1)).Dialog({
            title: '添加权限规则', width: 300, href: 'Auth/edit_auth_rule',
            buttonUrl: 'Api/Auth/add_auth_rule',
            submitSuccessCallback: function() { $(self.DG_ID).Reload_Datagrid(); }
        });
    },
    edit: function() {
        var self = this;
        var selected = $(self.DG_ID).Get_Selected_Datagrid();
        if (selected) {
            $('<div/>').attr('id', self.DLG_ID.substring(1)).Dialog({
                title: '编辑权限规则', width: 300, href: 'Auth/edit_auth_rule',
                selected: selected, buttonUrl: 'Api/Auth/edit_auth_rule',
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
                    $.post('Api/Auth/del_auth_rule', {id: selected.id}, function(result) {
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
    $(AUTH_RULE.DG_ID).Datagrid({
        title: '权限规则', url: 'Api/Auth/get_auth_rule', toolbar: AUTH_RULE.TB_ID,
        columns: [[
            {field: 'id', title: 'ID', sortable: true, width: 40, align: 'center'},
            {field: 'name', title: '规则名称', sortable: true, width: 250},
            {field: 'title', title: '规则描述', sortable: true, width: 150},
            {field: 'condition', title: '规则表达式', sortable: true, width: 200},
            {
                field: 'status', title: '状态', sortable: true, width: 50, align: 'center',
                formatter: function(value, row) {
                    if (value === '1') { return '启用'; }
                    return '禁用';
                }
            }
        ]]
    });
    whetherRemoveToolbar(AUTH_RULE.TB_ID);
});