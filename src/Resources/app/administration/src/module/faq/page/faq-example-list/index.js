Shopware.Component.register('faq-example-list', {
    template: `
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
    `,

    inject: ['repositoryFactory'],

    data() {
        return {
            categoryName: '',
            categoryImage: null,
            categories: [],
            categoryNameError: null,
        };
    },

    computed: {
        faqCategoryRepository() {
            return this.repositoryFactory.create('faq_category');
        },

        isFormValid() {
            return this.categoryName && !this.categoryNameError;
        },
    },

    created() {
        this.loadCategories();
    },

    methods: {
        async validateCategoryName(value) {
            this.categoryName = value;

            if (!value) {
                this.categoryNameError = {
                    code: 'REQUIRED',
                    message: 'Category name is required.',
                };
                return;
            }

            const isUnique = await this.checkCategoryUnique(value);
            if (!isUnique) {
                this.categoryNameError = {
                    code: 'DUPLICATE',
                    message: 'Category name already exists.',
                };
            } else {
                this.categoryNameError = null;
            }
        },

        async checkCategoryUnique(name) {
            const criteria = new Shopware.Data.Criteria();
            criteria.addFilter(
                Shopware.Data.Criteria.equals('name', name)
            );

            const result = await this.faqCategoryRepository.search(criteria);
            return result.total === 0;
        },

        handleImageUpload(file) {
            this.categoryImage = file;
        },

        async saveCategory() {
            if (!this.isFormValid) return;

            const category = this.faqCategoryRepository.create();
            category.name = this.categoryName;

            if (this.categoryImage) {
                const mediaService = Shopware.Service('mediaService');
                const media = await mediaService.uploadMediaFromFile(this.categoryImage);
                category.image = media.url;
            }

            await this.faqCategoryRepository.save(category);
            this.categories.push({
                id: category.id,
                name: category.name,
                image: category.image,
            });

            this.resetForm();
            this.showNotification('Category saved successfully!');
        },

        async loadCategories() {
            const criteria = new Shopware.Data.Criteria();
            const result = await this.faqCategoryRepository.search(criteria);
            this.categories = result.map(category => ({
                id: category.id,
                name: category.name,
                image: category.image,
            }));
        },

        async deleteCategory(categoryId) {
            await this.faqCategoryRepository.delete(categoryId);
            this.categories = this.categories.filter(cat => cat.id !== categoryId);
            this.showNotification('Category deleted successfully!');
        },

        resetForm() {
            this.categoryName = '';
            this.categoryImage = null;
            this.categoryNameError = null;
        },

        showNotification(message) {
            Shopware.Service('notificationService').createNotification({
                message,
                variant: 'success',
            });
        },
    },
});

// CSS styles for the component
const styles = `
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
`;

// Register styles
Shopware.Module.register('faq-example-list-styles', {
    type: 'stylesheet',
    src: styles,
});