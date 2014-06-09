var INDEX = {
    LEFT_NAV_TREE_ID: '#left_nav_tree'
};

$(function() {
    $(INDEX.LEFT_NAV_TREE_ID).tree({
        animate: true,
        lines: true,
        url: '/index.php/Api/Menu/get_tree_menus',
        loadFilter: function(data) {
            return data;
        },
        onClick: function(node) {
            if (node.attributes) {
                if (node.attributes.type === 'tab') {
                    $index_tabs = $('#index_tabs');
                    if ($index_tabs.tabs('exists', node.text)) {
                        $index_tabs.tabs('select', node.text);
                    } else {
                        $index_tabs.tabs('add', {
                            title: node.text,
                            iconCls: 'icon-help',
                            href: node.attributes.url,
                            closable: true,
                        });
                    }
                }
            }
        }
    });
});