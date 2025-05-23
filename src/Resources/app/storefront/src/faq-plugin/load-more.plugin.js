import Plugin from 'src/plugin-system/plugin.class';

export default class LoadMorePlugin extends Plugin {
    init() {
        window.addEventListener('click', this.onClick.bind(this));
    }

    onClick() {
        console.log(222);
    }
}
