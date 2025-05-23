import Plugin from 'src/plugin-system/plugin.class';

export default class FiltersPlugin extends Plugin {
    init() {
        this.filters = document.querySelectorAll('.faq-filter');
        this.cards = document.querySelectorAll('.faq-card');

        this.filters.forEach(el => {
            el.addEventListener('click', this.showCards.bind(this))
        });
    }

    showCards(event) {
        const clickedFilter = event.currentTarget;
        const selectedFilter = clickedFilter.getAttribute('data-filter');

        event.preventDefault();

        //if using filter we need remove show more buttons and mobile-hide class
        document.querySelector('.faq-load-wrapper').classList.add('d-none');
        document.querySelectorAll('.mobile-hide').forEach(el => {
            el.classList.add('mobile-hide');
        })

        // Remove "active" class from all filters
        this.filters.forEach(el => el.classList.remove('active'));

        // Add "active" class to the clicked filter
        clickedFilter.classList.add('active');

        // Show only cards with matching data-filter
        this.cards.forEach(card => {
            const cardFilter = card.getAttribute('data-filter');

            if(selectedFilter === "all") {
                card.classList.remove('d-none');
            } else {
                if (cardFilter === selectedFilter) {
                    card.classList.remove('d-none');
                } else {
                    card.classList.add('d-none');
                }
            }
        });
    }
}
