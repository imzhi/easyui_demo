var SITE_INFO = {
    DLG_ID: '#site_info_dialog'
};

$(function() {
    $('<div/>').attr('id', SITE_INFO.DLG_ID.substring(1)).Dialog({
        title: '站点信息', width: 320, href: 'Site/info',
        buttonUrl: 'Api/Site/edit_info', buttonIconCls: 'icon-save',
        onLoadCallback: function() {
            $.getJSON('Api/Site/get_info', function(result) {
                $('form', SITE_INFO.DLG_ID).form('load', result);
            });
        }
    });
});