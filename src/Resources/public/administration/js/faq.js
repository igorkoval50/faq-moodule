!function(){var e={360:function(){Shopware.Component.register("faq-example-list",{template:`
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
    `})}},t={};function a(s){var r=t[s];if(void 0!==r)return r.exports;var i=t[s]={exports:{}};return e[s](i,i.exports,a),i.exports}a.p="bundles/faq/",window?.__sw__?.assetPath&&(a.p=window.__sw__.assetPath+"/bundles/faq/"),a(360),Shopware.Module.register("faq-example",{type:"core",name:"Faq",title:"Faq title",description:"Faq description",color:"#ff3d58",icon:"regular-shopping-bag",routes:{list:{component:"faq-example-list",path:"list"}},navigation:[{label:"Faq title",color:"#ff3d58",parent:"sw-content",path:"faq.example.list",icon:"regular-shopping-bag",position:100}]})}();