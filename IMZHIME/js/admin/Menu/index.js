var MENU = {
    DLG_ID: '#menu_dialog',
    DG_ID: '#menu_datagrid',
    TB_ID: '#menu_datagrid_toolbar',
    add: function() {},
    edit: function() {},
    delete: function() {}
};

$(function() {
    $(MENU.DG_ID).treegrid({
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
            {field: 'status', title: '状态', width: 40, align: 'center'},
        ]]
    });
});