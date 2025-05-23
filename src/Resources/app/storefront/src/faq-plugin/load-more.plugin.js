import Plugin from 'src/plugin-system/plugin.class';

export default class LoadMorePlugin extends Plugin {
    init() {
        window.addEventListener('click', this.faqShows.bind(this));
    }

    faqShows() {
        document.querySelectorAll('.faq-card').forEach(item => item.classList.remove('d-none'));
        this.el.classList.add('d-none');
    }
}
