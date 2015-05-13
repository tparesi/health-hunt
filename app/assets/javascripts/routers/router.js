HealthHunt.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.products = new HealthHunt.Collections.Products();
    this.products.fetch();
    this.collections = new HealthHunt.Collections.Collections();
    this.collections.fetch();
  },

  routes: {
    "": "index",
    "products/new": "new",
    "products/:id": "show",
    "products/:id/edit": "edit",
    "collections": "collectionsIndex",
    "collections/:id": "collectionShow"
  },

  index: function () {
    var indexView = new HealthHunt.Views.ProductsIndex({
      collection: this.products
    });
    this._swapView(indexView);
  },

  new: function () {
    var product = new HealthHunt.Models.Product();
    var formView = new HealthHunt.Views.ProductForm({
      collection: this.products,
      model: product
    });
    this._swapView(formView);
  },

  show: function (id) {
    var product = this.products.getOrFetch(id);
    var showView = new HealthHunt.Views.ProductShow({
      model: product
    });
    this._swapView(showView);
  },

  edit: function (id) {
    var product = this.products.getOrFetch(id);
    var formView = new HealthHunt.Views.ProductForm({
      collection: this.products,
      model: product
    });
    this._swapView(formView);
  },

  collectionsIndex: function () {
    var collectionsIndexView = new HealthHunt.Views.CollectionsIndex({
      collection: this.collections
    });
    this._swapView(collectionsIndexView);
  },

  collectionShow: function (id) {
    var collection = this.collections.getOrFetch(id);
    var collectionShowView = new HealthHunt.Views.CollectionShow({
      model: collection
    });
    this._swapView(collectionShowView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
