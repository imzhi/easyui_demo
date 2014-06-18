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
        },
        createRandNum: function(num) {
            return Math.random().toString().slice(-Math.abs(num));
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
        },
        Dialog: function(settings) {
            var self = this;
            var defaults = {
                // 默认属性
                title: '新窗口',
                iconCls: 'icon-help',
                width: 280,
                cache: false,
                modal: true,
                collapsible: true,
                // 新增属性
                selected: null,
                onBeforeLoadCallback: function() {},
                onLoadCallback: function() {},
                onBeforeOpenCallback: function() {},
                onOpenCallback: function() {},
                submitSuccess: function(result) {
                    $(self).Destroy_Dialog();
                    $.Show_Warning(result.info);
                },
                submitSuccessCallback: function() {},
                submitFailure: function(result) {
                    $.Show_Error(result.info);
                },
                submitFailureCallback: function() {},
                buttonText: '保存',
                buttonIconCls: 'icon-help'
            };

            defaults['buttonFormSubmit'] = function() {
                $('form', self).form('submit', {
                    url: defaults.buttonUrl,
                    onSubmit: function() {
                        var isValid = $(self).form('validate');
                        if (!isValid) {
                            $.Close_Progress();
                        }
                        return isValid;
                    },
                    success: function(res) {
                        $.Close_Progress();
                        var result = $.parseJSON(res);
                        if (1 === result.status) {
                            defaults.submitSuccess(result);
                            defaults.submitSuccessCallback();
                        } else {
                            defaults.submitFailure(result);
                            defaults.submitFailureCallback();
                        }
                    }
                });
            };
            defaults['buttonHandler'] = function() {
               defaults['buttonFormSubmit']();
            };

            $.extend(defaults, settings);

            var options = $.extend({}, defaults, {
                onBeforeLoad: function() {
                    defaults.onBeforeLoadCallback();
                },
                onLoad: function() {
                    defaults.selected && $('form', self).form('load', defaults.selected);
                    defaults.onLoadCallback();
                    $(self).Center_Dialog();
                },
                onBeforeOpen: function() {
                    if (false !== $(self).html().indexOf('not access')) {
                        $.messager.alert('错误', '此对话框未授权', 'error');
                        return false;
                    }
                    defaults.onBeforeOpenCallback();
                },
                onOpen: function() {
                    defaults.onOpenCallback();
                },
                onClose: function() {
                    $(self).Destroy_Dialog();
                },
                buttons: [{
                    text: defaults.buttonText,
                    iconCls: defaults.buttonIconCls,
                    handler: defaults.buttonHandler
                }, {
                    text: '关闭',
                    iconCls: 'icon-no',
                    handler: function() {
                        $(self).Destroy_Dialog();
                    }
                }]
            }, settings);
            $(self).dialog(options);
        },
        Tree: function(settings) {
            var self = this;
            var defaults = {
                animate: true,
                lines: false,
                loadFilter: function(data) {
                    return data;
                },
            };
            var options = $.extend({}, defaults, settings);
            $(self).tree(options);
        },
        Combobox: function(settings) {
            var self = this;
            var defaults = {
                valueField: 'id',
                textField: 'value',
                groupField: null,
                editable: false,
                required: true,
                panelHeight: 'auto'
            };
            var options = $.extend({}, defaults, settings);
            $(self).combobox(options);
        },
        Treegrid: function(settings) {
            var self = this;
            var defaults = {
                iconCls:'icon-help',
                fit: true,
                rownumbers: true,
                border: false,
                singleSelect: true,
                animate: true,
                method: 'post',
            };
            var options = $.extend({}, defaults, settings);
            $(self).treegrid(options);
        },
        Datagrid: function(settings) {
            var self = this;
            var defaults = {
                iconCls:'icon-help',
                border: false,
                fit: true,
                rownumbers: true,
                singleSelect: true,
                idField: 'id',
                method: 'post',
                pagination: true,
                pageList: window.CONSTANTS.PAGELIST,
                pageSize: window.CONSTANTS.PAGESIZE
            };
            var options = $.extend({}, defaults, settings);
            $(self).datagrid(options);
        },
        Combogrid: function(settings) {
            var self = this;
            var defaults = {
                editable: false,
                idField: 'id',
                textField: 'value',
                pagination: true,
                required: true,
                pageList: window.CONSTANTS.PAGELIST,
                pageSize: window.CONSTANTS.PAGESIZE,
            };
            var options = $.extend({}, defaults, settings);
            $(self).combogrid(options);
        },
        Combotree: function(settings) {
            var self = this;
            var defaults = {
                editable: false,
                lines: true,
                animate: true,
                required: true,
                panelHeight: 'auto',
                loadFilter: function(data) {
                    return data;
                },
            };
            var options = $.extend({}, defaults, settings);
            $(self).combotree(options);
        },
    });





    /**
     * validatebox规则扩展
     */
    $.extend($.fn.validatebox.defaults.rules, {
        equals: {
            validator: function(value, param) {
                return value == $(param[0]).val();
            },
            message: '数据不一致'
        },
        minLength: {
            validator: function(value, param) {
                return value.length >= param[0];
            },
            message: '请最少输入{0}个字符'
        },
        maxLength: {
            validator: function(value, param) {
                return value.length <= param[0];
            },
            message: '请最多输入{0}个字符'
        },
        equalLength: {
            validator: function(value, param) {
                return value.length == param[0];
            },
            message: '请输入{0}个字符'
        },
        isPassword: {
            validator: function(value, param) {
                return value.length >= 4 && value.length <= 20 && false !== value.indexOf(' ');
            },
            message: '密码在4-20位之间，且不能包含空格'
        },
        isSimplePassword: {
            validator: function(value, param) {
                return true;
            },
            message: '密码不能过于简单'
        },
        isUsername: {
            validator: function(value, param) {
                return /[a-z0-9]{2,20}/i.test(value);
            },
            message: '用户名在2-20位之间，由字母或者数字组成'
        },
        isBirthday: {
            validator: function(value, param) {
                return /\d{4}-\d{2}-\d{2}/.test(value)
            },
            message: '生日填写无效。填写格式为1990-05-11'
        }
    });
})(jQuery);



window.CONSTANTS = {
    PAGELIST: [10,20,50],
    PAGESIZE: 20,
};


// 按ESC键dialog响应关闭事件
$(document).bind('keydown', function(e) {
    var $dialog = $('.panel.window').find('.panel-body.panel-body-noborder.window-body');
    var $messager = $('.panel.window.messager-window');
    if ($messager[0]) {
        if (e.keyCode === 27) {
            $('.messager-button .l-btn:eq(-1)', $messager).trigger('click');
        }
        if (e.keyCode === 13) {
            $('.messager-button .l-btn:eq(-2)', $messager).trigger('click');
        }
    } else if ($dialog[0]) {
        if (e.keyCode === 27) {
            $dialog.Destroy_Dialog();
        }
        if (e.keyCode === 13) {
            $('.dialog-button > .l-btn:eq(-2)', $dialog).trigger('click');
        }
    }
});