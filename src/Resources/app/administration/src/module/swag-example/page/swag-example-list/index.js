Shopware.Component.register('swag-example-list', {
    template: `
        <sw-page class="swag-example-list">
            <template #smart-bar-header>
                <h2 class="sw-page__smart-bar-title">
                    Faq
                </h2>
            </template>

            <template #content>
                <sw-container>
                    <sw-card title="FAQ Overview" class="swag-example-list__card">
                        <p>List of FAQs will appear here.</p>
                    </sw-card>
                </sw-container>
            </template>
        </sw-page>
    `
});
