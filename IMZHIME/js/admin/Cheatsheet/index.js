var CHEATSHEET = {
    DLG_ID: '#cheatsheet_dialog',
    DG_ID: '#cheatsheet_datagrid',
    TB_ID: '#cheatsheet_datagrid_toolbar',
    add: function() {
        var self = this;
        $('<div/>').attr('id', CHEATSHEET.DLG_ID.substring(1)).Dialog({
            title: '添加快捷键',
            width: 360,
            href: 'Cheatsheet/edit',
            buttonUrl: 'Api/Cheatsheet/add',
            submitSuccessCallback: function() {
                $(self.DG_ID).Reload_Datagrid();
            }
        });
    },
    batch_add: function() {
        var self = this;
        $('<div/>').attr('id', CHEATSHEET.DLG_ID.substring(1)).Dialog({
            title: '批量添加快捷键',
            width: 360,
            href: 'Cheatsheet/batch_add',
            buttonUrl: 'Api/Cheatsheet/batch_add',
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
                title: '编辑快捷键',
                width: 360,
                href: 'Cheatsheet/edit',
                selected: selected,
                buttonUrl: 'Api/Cheatsheet/edit',
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
                    $.post('Api/Cheatsheet/delete', {id: selected.id}, function(result) {
                        $.Close_Progress();
                        if (result.status === 1) {
                            $(self.DG_ID).Unselect_All_Datagrid(); // 取消选择
                            $(self.DG_ID).Reload_Datagrid();
                            $.Show_Warning(result.info);
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
    $(CHEATSHEET.DG_ID).Datagrid({
        title: '各种快捷键',
        toolbar: CHEATSHEET.TB_ID,
        url: 'Api/Cheatsheet/get_cheatsheets',
        groupField: 'cate_name',
        view: groupview,
        groupFormatter: function(value, row) {
            return value + ' - ' + row.length + ' 项';
        },
        columns: [[
            // {field: 'id', title: 'ID', sortable: true, width: 40, align: 'center'},
            {field: 'command', title: '命令/快捷键', sortable: true, width: 200},
            {field: 'describe', title: '解释/描述', sortable: true, width: 500},
        ]]
    });
});