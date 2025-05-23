import LoadMorePlugin from "./faq-plugin/load-more.plugin";

const PluginManager = window.PluginManager;

PluginManager.register('LoadMorePlugin', LoadMorePlugin, '[data-load-more-plugin]');
