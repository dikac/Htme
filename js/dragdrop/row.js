


const DDRow = function() {

    let panel = Object.assign(new DDElement(), new DDPanel());
    return Object.assign(new DDElement(), new DDContainer(new DDAttribute, panel));

}();

DDRow.content.content = new DDItems({
    menu:DDMenu(DD.menu.new),
    show:DD.menu.show
});

DDRow.attribute.named('class')['bootstrap-row'] = 'row';


DD.boot.handlers['row'] = function(selector) {

    DDRow.setTo(selector);
    DD.update.trigger();

};

DD.menu.new['container'] = function () {

    let attribute = new DDAttribute();
    let click = new DDClick('DDNewContainer', null, attribute);


    attribute.list('class').push();
   // attribute.named('data-dismiss')['modal'] = 'modal';

    click.setHandler(function(e) {

        var click = $(e.target);
        var container = DDContainer.fromInner(click);
        container.append(DDRow.toString());
        DD.update.trigger();

    });

    return Object.assign(new DDElement('<div>Container</div>'), click);
}();

// DD.new.list['container'] = function () {
//
//     let attribute = new DDAttribute();
//     let click = new DDClick('DDNewContainer', null, attribute);
//
//     attribute.list('class').push('btn btn-default btn-xl col-md-1 glyphicon glyphicon-unchecked');
//     attribute.named('data-dismiss')['modal'] = 'modal';
//
//     click.setHandler(function(e) {
//
//         var click = $(DD.new.event.target);
//         var container = DDContainer.fromInner(click);
//         container.append(DDRow.toString());
//         DD.update.trigger();
//
//     });
//
//     return Object.assign(new DDElement('<div>Container</div>'), click);
// }();





//DDRow.content.content.content




//DDRow.content.content.content['add'] =



// DDRow.content.content.content['add'] = function () {
//
//     let attribute = new DDAttribute();
//     let modal = new DDModal('DDNew');
//
//     modal.header = 'new Item';
//     modal.content = new DDItems(DD.new.list);
//
//     attribute.list('class').push(
//         'glyphicon glyphicon-plus btn btn-default btn-xs pull-left'
//     );
//
//     let click = new DDClick('DDAdd', null, attribute);
//
//     click.setHandler(function(e) {
//
//         DD.new.event = e;
//         modal.show();
//     });
//
//     return Object.assign(new DDElement(), click);
//
// }();





