import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'faq-listing',
    label: 'sw-cms.blocks.faqListing.label',
    category: 'text',
    component: 'sw-cms-block-faq-listing',
    previewComponent: 'sw-cms-preview-faq-listing',
    defaultConfig: {
        marginBottom: '0',
        marginTop: '0',
        marginLeft: '0',
        marginRight: '0',
        sizingMode: 'boxed',
    },
    slots: {
        faq: {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                            <h2>FAQ</h2>
                        `.trim()
                    }
                }
            }
        },
    },
});
