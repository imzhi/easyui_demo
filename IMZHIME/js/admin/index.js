var INDEX = {
    LEFT_NAV_TREE_ID: '#left_nav_tree',
    TABS_ID: '#index_tabs'
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
            if (!$(INDEX.LEFT_NAV_TREE_ID).tree('isLeaf', node.target)) {
                $(INDEX.LEFT_NAV_TREE_ID).tree('toggle', node.target);
            } else if (node.attributes) {
                if (node.attributes.type === 'tab') {
                    $index_tabs = $(INDEX.TABS_ID);
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
                } else if (node.attributes.type === 'dialog') {
                }
                else if (node.attributes.type === 'iframe') {
                }
            }
        }
    });
});