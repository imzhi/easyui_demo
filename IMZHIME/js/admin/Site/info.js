var SITE_INFO = {
    DLG_ID: '#site_info_dialog'
};

$(function() {
    $('<div/>').attr('id', SITE_INFO.DLG_ID.substring(1)).dialog({
        title: '站点信息',
        width: 320,
        cache: false,
        modal: true,
        iconCls: 'icon-help',
        collapsible: true,
        href: '/index.php/Site/info',
        onLoad: function() {
            $.getJSON('/index.php/Api/Site/get_info', function(result) {
                $('form', SITE_INFO.DLG_ID).form('load', result);
            });
            $(SITE_INFO.DLG_ID).Center_Dialog();
        },
        onOpen: function() {},
        onClose: function() {
            $(SITE_INFO.DLG_ID).Destroy_Dialog();
        },
        buttons: [{
            text: '保存',
            iconCls: 'icon-help',
            handler: function() {
                $('form', SITE_INFO.DLG_ID).form('submit', {
                    url: '/index.php/Api/Site/edit_info',
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
                            $.Show_Warning(result.info);
                            $(SITE_INFO.DLG_ID).Destroy_Dialog();
                        } else {
                            $.Show_Error(result.info);
                        }
                    }
                });
            }
        }, {
            text: '关闭',
            iconCls: 'icon-no',
            handler: function() {
                $(SITE_INFO.DLG_ID).Destroy_Dialog();
            }
        }]
    });
});