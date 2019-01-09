///<reference path="Menu/Standard.ts"/>
///<reference path="../../Element/Panel.ts"/>
namespace Htme.Component.Structure.Panel {

   // import Compound = Htme.Component.Element.Compound;
    import String = Htme.Component.Element.String;
    import Structure = Htme.Component.Structure.Structure;
    import Menu = Htme.Component.Structure.Panel.Menu.Menu;
    import MenuStandard = Htme.Component.Structure.Panel.Menu.Standard;
    import MapElement = Htme.Component.Element.MapElement;
    import PanelElement = Htme.Component.Element.Panel;
    import SetAttribute = Htme.Component.Set_.AttributeValue;

    // export function defaultFactory (element : JQuery|string|null = null) : Menu | null {
    //
    //     return new Standard(element);
    // }

    export class Standard extends PanelElement<Menu> implements Panel {

        // private $name : String;
        private $structure : Structure;

        constructor(
            structure : Structure,
            element : JQuery|string|null = null,
            name : string = '{panel name}',
           // factory : (element : JQuery|string|null) => Menu | null = defaultFactory
        ) {
            super(element/*, factory*/, name);
            this.structure = structure;

           // this.attributes.get('class').add(IDENTIFIER);


            let set = new SetAttribute(this.attributes, 'class');
            set.add(IDENTIFIER);

            // this.attributes.edit('class', function (attribute : string) : string {
            //
            //     let set = new SetAttribute(attribute);
            //     set.add(IDENTIFIER);
            //     return set.toString();
            //
            // });

            // this.$name = new Htme.Component.Element.PanelName(name);
            //
            // this.element.prepend(this.$name.element);
            //this.attachName();
        }

        get structure() : Structure {

            return this.$structure;
        }

        set structure(structure : Structure)  {

            this.$structure = structure;

            for(let [k, value] of this) {

                value.structure  = structure;
            }
        }

        set(key: string, element: Menu): this {

            element.structure = this.structure;
            super.set(key, element);

            return this;
        }


        get(key: string): Menu {

            let menu = super.get(key);

            if(!menu) {

                menu = new MenuStandard(this.structure, null, key);
                this.set(key, menu)
            }

            return menu;
        }
        //
        // get name() : string
        // {
        //     return this.$name.content;
        // }
        //
        // set name(name : string)
        // {
        //     this.$name.content = name;
        // }
    }
    
}