Shopware.Component.register('faq-example-list', {
    template: `
        <sw-page class="faq-list">
            <template #smart-bar-header>
                <h2 class="sw-page__smart-bar-title">
                    Faq
                </h2>
            </template>

            <template #content>
                <sw-container>
                    <sw-card title="FAQ Overview" class="faq-list__card">
                        <p>List of FAQs will appear here.</p>
                    </sw-card>
                </sw-container>
            </template>
        </sw-page>
    `
});
