var AUTH_GROUP = {
    DG_ID: '#auth_group_datagrid',
    NA_DG_ID: '#normal_auth_datagrid',
    MA_TG_ID: '#menu_auth_treegrid',
    TB_ID: '#auth_group_datagrid_toolbar',
    DLG_ID: '#auth_group_dialog',
    // 添加用户组
    add: function() {
        var self = this;
        $('<div/>').attr('id', self.DLG_ID.substring(1)).Dialog({
            title: '添加用户组',
            iconCls: 'icon-help',
            href: 'Auth/edit_auth_group',
            buttonUrl: 'Api/Auth/add_auth_group',
            submitSuccessCallback: function() {
                $(self.DG_ID).Reload_Datagrid();
            }
        });
    },
    edit: function() {
        var self = this;
        var selected = $(self.DG_ID).Get_Selected_Datagrid();
        if (selected) {
            $('<div/>').attr('id', self.DLG_ID.substring(1)).Dialog({
                title: '编辑用户组',
                href: 'Auth/edit_auth_group',
                selected: selected,
                buttonUrl: 'Api/Auth/edit_auth_group',
                submitSuccessCallback: function() {
                    $(self.DG_ID).Reload_Datagrid();
                }
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
                    $.post('Api/Auth/del_auth_group', {id: selected.id}, function(result) {
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
            $('<div/>').attr('id', self.DLG_ID.substring(1)).Dialog({
                title: '编辑普通权限',
                href: 'Auth/edit_normal_auth',
                selected: selected,
                buttonUrl: 'Api/Auth/edit_normal_auth',
                submitSuccessCallback: function() {
                    $(self.DG_ID).Reload_Datagrid();
                    $(self.NA_DG_ID).Reload_Datagrid();
                }
            });
        } else {
            $.Show_Warning('请先选择一项');
        }
    },
    edit_menu_auth: function() {
        var self = this;
        var selected = $(self.DG_ID).Get_Selected_Datagrid();
        if (selected) {
            $('<div/>').attr('id', self.DLG_ID.substring(1)).Dialog({
                title: '编辑菜单权限',
                href: 'Auth/edit_menu_auth',
                selected: selected,
                buttonUrl: 'Api/Auth/edit_menu_auth',
                submitSuccessCallback: function() {
                    $(self.MA_TG_ID).Reload_Treegrid();
                }
            });
        } else {
            $.Show_Warning('请先选择一项');
        }
    }
};

$(function() {
    $(AUTH_GROUP.DG_ID).Datagrid({
        title:'用户组',
        toolbar: AUTH_GROUP.TB_ID,
        url: 'Api/Auth/get_auth_group',
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
            // treegrid load 方法的属性字段名不能为 id !important
            $(AUTH_GROUP.MA_TG_ID).treegrid('load', { menu_id: selected.id });
            // $(AUTH_GROUP.MA_TG_ID).treegrid('loadData', {total: 0, rows: []});
        }
    });

    $(AUTH_GROUP.NA_DG_ID).Datagrid({
        title:'普通权限',
        url: 'Api/Auth/get_group_normal_auth',
        pagination: false,
        columns: [[
            {field: 'name', title: '规则名称', width: 200},
            {field: 'title', title: '规则描述', width: 150},
            {field: 'condition', title: '规则表达式', width: 150},
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

    $(AUTH_GROUP.MA_TG_ID).Treegrid({
        title:'菜单权限',
        idField: 'menu_id',
        treeField: 'title',
        url: 'Api/Auth/get_group_menu_auth',
        columns: [[
            {field: 'title', title: '菜单中文名', width: 240},
            {field: 'url', title: 'URL', width: 240}
        ]]
    });
});