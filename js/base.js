
var Profile = Backbone.Model.extend();

var ProfileList = Backbone.Collection.extend({
    model: Profile,
    url: 'jsonSample.json'
});

var ProfileView = Backbone.View.extend({
    el: "#profiles",
    initialize: function(){
        this.listenTo(this.collection,"add", this.renderItem);          
        this.template = _.template($('#profileTemplate').html());
    },
    render: function () {
        this.collection.each(function(model){
             var profileTemplate = this.template(model.toJSON());
             this.$el.append(profileTemplate);
        }, this);        
        return this;
    },
    renderItem: function(profile) {
         var profileTemplate = this.template(profile.toJSON());
         this.$el.append(profileTemplate);        
    }
});

var profileList = new ProfileList(startData);
var profilesView = new ProfileView({ collection: profileList });
profilesView.render();
profileList.add(addData);
