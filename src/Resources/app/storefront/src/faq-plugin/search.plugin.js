import Plugin from 'src/plugin-system/plugin.class';

export default class SearchPlugin extends Plugin {
    init() {
        this.el.addEventListener('input', this.faqSearch.bind(this));
    }

    faqSearch() {
        const searchInput = document.getElementById('faq-search');
        const faqCards = document.querySelectorAll('.faq-card');
        const query = searchInput.value.trim().toLowerCase();

        faqCards.forEach(card => {
            const title = card.querySelector('.faq-title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.faq-card-description')?.textContent.toLowerCase() || '';

            const match = query.length >= 5 && (title.includes(query) || description.includes(query));

            if(query.length === 0) {
                document.querySelector('.faq-all').click();
            }

            if (match) {
                //if using filter we need remove show more buttons and mobile-hide class
                document.querySelector('.faq-load-wrapper').classList.add('d-none');

                card.classList.remove('d-none');
            } else {
                card.classList.add('d-none');
            }
        });

        // Show all if search is cleared or less than 5 characters
        if (query.length < 5) {
            faqCards.forEach(card => card.classList.remove('d-none'));
        }
    }
}
