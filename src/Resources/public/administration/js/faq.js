!function(){var e={360:function(){Shopware.Component.register("faq-example-list",{template:`
        <sw-page class="faq-list">
            <template #smart-bar-header>
                <h2 class="sw-page__smart-bar-title">FAQ</h2>
            </template>

            <template #content>
                <sw-container>
                    <sw-card title="Create FAQ Category" class="faq-list__card">
                        <sw-text-field
                            v-model="categoryName"
                            label="Category Name"
                            :error="categoryNameError"
                            required
                            @input="validateCategoryName"
                            placeholder="Enter category name"
                        ></sw-text-field>

                        <sw-upload
                            v-model="categoryImage"
                            label="Category Image (Optional)"
                            accept="image/*"
                            @input="handleImageUpload"
                        ></sw-upload>

                        <sw-button
                            variant="primary"
                            :disabled="!isFormValid"
                            @click="saveCategory"
                        >
                            Save Category
                        </sw-button>
                    </sw-card>

                    <sw-card title="FAQ Categories" class="faq-list__card">
                        <sw-container v-if="categories.length">
                            <div
                                v-for="category in categories"
                                :key="category.id"
                                class="faq-list__category-item"
                            >
                                <img
                                    v-if="category.image"
                                    :src="category.image"
                                    class="faq-list__category-image"
                                    alt="Category Image"
                                />
                                <span>{{ category.name }}</span>
                                <sw-button
                                    variant="danger"
                                    size="small"
                                    @click="deleteCategory(category.id)"
                                >
                                    Delete
                                </sw-button>
                            </div>
                        </sw-container>
                        <p v-else>No categories available.</p>
                    </sw-card>
                </sw-container>
            </template>
        </sw-page>
    `,inject:["repositoryFactory"],data(){return{categoryName:"",categoryImage:null,categories:[],categoryNameError:null}},computed:{faqCategoryRepository(){return this.repositoryFactory.create("faq_category")},isFormValid(){return this.categoryName&&!this.categoryNameError}},created(){this.loadCategories()},methods:{async validateCategoryName(e){if(this.categoryName=e,!e){this.categoryNameError={code:"REQUIRED",message:"Category name is required."};return}await this.checkCategoryUnique(e)?this.categoryNameError=null:this.categoryNameError={code:"DUPLICATE",message:"Category name already exists."}},async checkCategoryUnique(e){let a=new Shopware.Data.Criteria;return a.addFilter(Shopware.Data.Criteria.equals("name",e)),0===(await this.faqCategoryRepository.search(a)).total},handleImageUpload(e){this.categoryImage=e},async saveCategory(){if(!this.isFormValid)return;let e=this.faqCategoryRepository.create();if(e.name=this.categoryName,this.categoryImage){let a=Shopware.Service("mediaService"),t=await a.uploadMediaFromFile(this.categoryImage);e.image=t.url}await this.faqCategoryRepository.save(e),this.categories.push({id:e.id,name:e.name,image:e.image}),this.resetForm(),this.showNotification("Category saved successfully!")},async loadCategories(){let e=new Shopware.Data.Criteria,a=await this.faqCategoryRepository.search(e);this.categories=a.map(e=>({id:e.id,name:e.name,image:e.image}))},async deleteCategory(e){await this.faqCategoryRepository.delete(e),this.categories=this.categories.filter(a=>a.id!==e),this.showNotification("Category deleted successfully!")},resetForm(){this.categoryName="",this.categoryImage=null,this.categoryNameError=null},showNotification(e){Shopware.Service("notificationService").createNotification({message:e,variant:"success"})}}});let e=`
.faq-list__card {
    margin-bottom: 20px;
}

.faq-list__category-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px;
    border-bottom: 1px solid #e5e5e5;
}

.faq-list__category-image {
    max-width: 50px;
    max-height: 50px;
    object-fit: cover;
}
`;Shopware.Module.register("faq-example-list-styles",{type:"stylesheet",src:e})}},a={};function t(r){var i=a[r];if(void 0!==i)return i.exports;var o=a[r]={exports:{}};return e[r](o,o.exports,t),o.exports}t.p="bundles/faq/",window?.__sw__?.assetPath&&(t.p=window.__sw__.assetPath+"/bundles/faq/"),t(360),Shopware.Module.register("faq-example",{type:"core",name:"Faq",title:"Faq title",description:"Faq description",color:"#ff3d58",icon:"regular-shopping-bag",routes:{list:{component:"faq-example-list",path:"list"}},navigation:[{label:"Faq title",color:"#ff3d58",parent:"sw-content",path:"faq.example.list",icon:"regular-shopping-bag",position:100}]})}();