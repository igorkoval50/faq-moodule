!function(){var e={411:function(){Shopware.Component.register("swag-example-list",{template:`
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
    `})}},a={};function t(s){var r=a[s];if(void 0!==r)return r.exports;var p=a[s]={exports:{}};return e[s](p,p.exports,t),p.exports}t.p="bundles/faq/",window?.__sw__?.assetPath&&(t.p=window.__sw__.assetPath+"/bundles/faq/"),t(411),Shopware.Module.register("swag-example",{type:"core",name:"Faq",title:"Faq title",description:"Faq description",color:"#ff3d58",icon:"regular-shopping-bag",routes:{list:{component:"swag-example-list",path:"list"}},navigation:[{label:"Faq title",color:"#ff3d58",parent:"sw-content",path:"swag.example.list",icon:"regular-shopping-bag",position:100}]})}();