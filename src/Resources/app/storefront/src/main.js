import LoadMorePlugin from "./faq-plugin/load-more.plugin";
import FiltersPlugin from "./faq-plugin/filters.plugin";

const PluginManager = window.PluginManager;

PluginManager.register('LoadMorePlugin', LoadMorePlugin, '[data-load-more-plugin]');
PluginManager.register('FiltersPlugin', FiltersPlugin, '[data-filters-plugin]');
