var SITE_CLOSE = {
    DLG_ID: '#SITE_CLOSE_dialog'
};

$(function() {
    $('<div/>').attr('id', SITE_CLOSE.DLG_ID.substring(1)).dialog({
        title: '关闭站点',
        width: 350,
        cache: false,
        modal: true,
        iconCls: 'icon-help',
        collapsible: true,
        href: '/index.php/Site/close',
        onLoad: function() {
            $(SITE_CLOSE.DLG_ID).Center_Dialog();
        },
        onOpen: function() {},
        onClose: function() {
            $(SITE_CLOSE.DLG_ID).Destroy_Dialog();
        },
        buttons: [{
            text: '关闭',
            iconCls: 'icon-help',
            handler: function() {
                $.messager.confirm('提示', '确定关闭站点吗？', function(r) {
                    if (!r) { return false; }
                    $('form', SITE_CLOSE.DLG_ID).form('submit', {
                        url: '/index.php/Api/Site/close',
                        onSubmit: function() {
                            var isValid = $(this).form('validate');
                            if (!isValid) {
                                $.Close_Progress();
                            }
                            return isValid;
                        },
                        success: function(res) {
                            $.Close_Progress();
                            var result = $.parseJSON(res);
                            if (1 === result.status) {
                                window.location = result.data;
                            } else {
                                $.Show_Error(result.info);
                            }
                        }
                    });
                });

            }
        }, {
            text: '关闭',
            iconCls: 'icon-no',
            handler: function() {
                $(SITE_CLOSE.DLG_ID).Destroy_Dialog();
            }
        }]
    });
});