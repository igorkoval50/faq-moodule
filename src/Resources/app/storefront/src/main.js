import LoadMorePlugin from "./faq-plugin/load-more.plugin";
import FiltersPlugin from "./faq-plugin/filters.plugin";
import SearchPlugin from "./faq-plugin/search.plugin";

const PluginManager = window.PluginManager;

PluginManager.register('LoadMorePlugin', LoadMorePlugin, '[data-load-more-plugin]');
PluginManager.register('FiltersPlugin', FiltersPlugin, '[data-filters-plugin]');
PluginManager.register('SearchPlugin', SearchPlugin, '[data-search-plugin]');
