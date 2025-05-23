import Plugin from 'src/plugin-system/plugin.class';

export default class LoadMorePlugin extends Plugin {
    init() {
        this.el.addEventListener('click', this.faqShows.bind(this));
    }

    faqShows() {
        //show all cards after the click
        document.querySelectorAll('.faq-card').forEach(item => item.classList.remove('d-none'));

        //remove mobile hidden class from cards
        document.querySelectorAll('.mobile-hide').forEach(el => {
            el.classList.remove('mobile-hide');
        });

        this.el.classList.add('d-none');
    }
}
