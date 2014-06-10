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
                handler: function() {}
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
                            success: function() {
                                $.Close_Progress();
                                $(self.DLG_ID).Destroy_Dialog();
                                $(self.TG_ID).Reload_Treegrid();
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
        } else {
            $.Show_Warning('请先选择一项');
        }
    }
};

$(function() {
    $(MENU.TG_ID).treegrid({
        title: '菜单列表',
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
            {field: 'type', title: '类型', width: 50, align: 'center'},
            {field: 'state', title: '节点状态', width: 60, align: 'center'},
            {field: 'order', title: '排序', width: 40, align: 'center'},
            {field: 'status', title: '状态', width: 40, align: 'center', styler: function(value, row, index) {
                if (value === '0') {
                    return 'background-color:#FFCAE1;';
                } else if (value === '1') {
                    return 'background-color:#C3FFCF;';
                }
            }},
        ]],
        onLoadSuccess: function(row, data) {
            // $(MENU.TG_ID).treegrid('collapseAll');
        },
        rowStyler: function(row) {
            // if (row.status === '0') {
            //     return 'background-color:#FAD6D6;';
            // } else if (row.status === '1') {
            //     return 'background-color:#FAD6D6;';
            // }
        }
    });
});