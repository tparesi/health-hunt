HealthHunt.Views.ProductsIndexItem = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  tagName: "li",
  className: "product group",
  template: JST["products/index_item"],
  events: {
    "click .upvote": "toggleVote"
  },

  render: function () {
    var content = this.template({
      product: this.model
    });
    this.$el.html(content);
    return this;
  },

  toggleVote: function (event) {
    event.preventDefault();

    $.ajax({
      url: "api/products/vote",
      type: "POST",
      data: {
        product_id: this.model.id
      }, success: function (attrs) {
        this.model.set(this.model.parse(attrs));
        this.collection.add(this.model, { merge: true });
      }.bind(this)
    });
  }
});
