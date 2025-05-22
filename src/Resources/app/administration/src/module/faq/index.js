import './page/faq-example-list';
Shopware.Module.register('faq-example', {
    type: 'core',
    name: 'Faq',
    title: 'Faq title',
    description: 'Faq description',
    color: '#ff3d58',
    icon: 'regular-shopping-bag',
    routes: {
        list: {
            component: 'faq-example-list',
            path: 'list'
        }
    },
    navigation: [{
        label: 'Faq title',
        color: '#ff3d58',
        parent: 'sw-content',
        path: 'faq.example.list',
        icon: 'regular-shopping-bag',
        position: 100
    }]
});