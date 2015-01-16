var LOGIN = {
    DLG_ID: '#form',
    refreshVcode: function() {
        var src = $('#vcode').attr('src');
        $('#vcode').attr('src', (src.indexOf('?') !== -1 ? src.substring(0, src.indexOf('?')) : src) + '?' + Math.random().toString().slice(-4));
    }
};

$(function() {
    var dlg_id = LOGIN.DLG_ID;
    $(dlg_id).dialog({
        title: '登陆',
        width: 280,
        closed: false,
        cache: false,
        modal: false,
        closable: false,
        draggable: false,
        iconCls: 'icon-help',
        buttons: [{
            text: '登陆',
            iconCls: 'icon-help',
            handler: function() {
                $(dlg_id).form('submit', {
                    url: 'Public/do_login',
                    onSubmit: function() {
                        return $(this).form('validate');
                    }
                    // success: function() {}
                });
            }
        }, {
            text: '重置',
            iconCls: 'icon-help',
            handler: function() {
                $(dlg_id).form('clear');
            }
        }]
    }).dialog('center');
});