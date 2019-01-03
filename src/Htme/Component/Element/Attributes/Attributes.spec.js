
QUnit.test( "Htme.Component.Element.Attributes.Attributes construct", function( assert ) {

    let dom = $('<div class="class1 class2" id="id1 id2"></div>');
    let attribute = new Htme.Component.Element.Attributes.Attributes(dom);


    assert.equal(attribute.get('class'), 'class1 class2', "Passed!");
    assert.equal(attribute.get('id'), 'id1 id2', "Passed!");
    assert.equal(attribute.toString(), 'class="class1 class2" id="id1 id2"', "Passed!");
});

QUnit.test( "Htme.Component.Element.Attributes.Attributes set", function( assert ) {

    let dom = $('<div ></div>');
    let attribute = new Htme.Component.Element.Attributes.Attributes(dom);


    attribute.set('class', 'class1 class2');
    assert.equal(attribute.get('class'), 'class1 class2', "Passed!");

    attribute.set('id', 'id1 id2');
    assert.equal(attribute.get('id'), 'id1 id2', "Passed!");

    assert.equal(attribute.toString(), 'class="class1 class2" id="id1 id2"', "Passed!");
});
