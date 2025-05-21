import './page/swag-example-list';
Shopware.Module.register('swag-example', {
    type: 'core',
    name: 'Faq',
    title: 'Faq title',
    description: 'Faq description',
    color: '#ff3d58',
    icon: 'regular-shopping-bag',
    routes: {
        list: {
            component: 'swag-example-list',
            path: 'list'
        }
    },
    navigation: [{
        label: 'Faq title',
        color: '#ff3d58',
        parent: 'sw-content',
        path: 'swag.example.list',
        icon: 'regular-shopping-bag',
        position: 100
    }]
});