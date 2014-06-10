;(function($) {
    $.extend({
        Show_Warning: function(msg, title) {
            $.messager.show({
                title: title || '提示',
                iconCls: 'icon-help',
                msg: msg,
                showType: 'slide',
            });
        },
        Show_Error: function(msg, title) {
            $.messager.alert(title || '错误', msg, 'error');
        },
        Close_Progress: function() {
            $.messager.progress('close');
        },
        Open_Progress: function() {
            $.messager.progress();
        }
    });
    $.fn.extend({
        serializeJSON: function() {
            var o = {};
            $(this.serializeArray()).each(function() {
                o[this.name] = this.value;
            });
            return o;
        },
        Destroy_Dialog: function() {
            return this.dialog('destroy');
        },
        Center_Dialog: function() {
            return this.dialog('center');
        },
        Reload_Datagrid: function() {
            return this.datagrid('reload');
        },
        Get_Selected_Datagrid: function() {
            return this.datagrid('getSelected');
        },
        Unselect_All_Datagrid: function() {
            return this.datagrid('unselectAll');
        },
        Reload_Treegrid: function() {
            return this.treegrid('reload');
        },
        Get_Selected_Treegrid: function() {
            return this.treegrid('getSelected');
        },
        Unselect_All_Treegrid: function() {
            return this.treegrid('unselectAll');
        }
    });
    $.extend($.fn.validatebox.defaults.rules, {
        minLength: {
            validator: function(value, param) {
                return value.length >= param[0];
            },
            message: '请最少输入{0}个字符'
        }
    });
})(jQuery);
