var SITE_CLOSE = {
    DLG_ID: '#site_close_dialog'
};

$(function() {
    $('<div/>').attr('id', SITE_CLOSE.DLG_ID.substring(1)).Dialog({
        title: '关闭站点', width: 350, href: 'Site/close',
        buttonText: '确定', buttonIconCls: 'icon-help',
        buttonHandler: function() {
            $.messager.confirm('提示', '确定关闭站点吗？', function(r) {
                if (!r) { return false; }
                $('form', SITE_CLOSE.DLG_ID).form('submit', {
                    url: 'Api/Site/close',
                    onSubmit: function() {
                        var isValid = $(this).form('validate');
                        if (!isValid) { $.Close_Progress(); }
                        return isValid;
                    },
                    success: function(res) {
                        $.Close_Progress();
                        var result = $.parseJSON(res);
                        if (1 === result.status) { window.location = result.data; }
                        else { $.Show_Error(result.info); }
                    }
                });
            });
        }
    });
});