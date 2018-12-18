namespace Htme.DataStructure {

    /**
     *
     */
    export class MapImplement<K, V> implements Map<K, V> {

        constructor(private map: Map<K, V> = new Map<K, V>())
        {
        }

        get [Symbol.toStringTag](): string {
            return this.map[Symbol.toStringTag];
        }

        get size(): number
        {
            return this.map.size;
        }

        has(key: K): boolean
        {
            return this.map.has(key);
        }

        [Symbol.iterator](): IterableIterator<[K, V]> {
            return this.map[Symbol.iterator]();
        }

        clear(): void {
            this.map.clear();
        }

        delete(key: K): boolean {
            return this.map.delete(key);
        }

        entries(): IterableIterator<[K, V]> {
            return this.map.entries();
        }

        forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {

            return this.map.forEach(callbackfn, thisArg);
        }

        get(key: K): V | undefined {
            return this.map.get(key);
        }

        keys(): IterableIterator<K> {
            return this.map.keys();
        }

        set(key: K, value: V): this {
            this.map.set(key, value);
            return this;
        }

        values(): IterableIterator<V> {
            return this.map.values();
        }
    }

    /**
     *
     */
    export class SetImplement<T> implements Set<T> {

        constructor(private $set: Set<T> = new Set<T>())
        {
        }

        [Symbol.iterator](): IterableIterator<T>
        {
            return this.$set[Symbol.iterator]();
        }

        entries(): IterableIterator<[T, T]>
        {
            return this.$set.entries();
        }

        keys(): IterableIterator<T>
        {
            return this.$set.keys();
        }

        forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void
        {
            this.$set.forEach(callbackfn, thisArg);
        }

        values(): IterableIterator<T>
        {
            return this.$set.values();
        }

        add(value: T) : this
        {
            this.$set.add(value);
            return this;
        }

        clear(): void
        {
            this.$set.clear();
        }

        delete(value: T): any
        {
            this.$set.delete(value);
        }

        get [Symbol.toStringTag](): string
        {
            return this.$set[Symbol.toStringTag];
        }

        get size(): number
        {
            return this.$set.size;
        }

        has(value: T): boolean
        {
            return this.$set.has(value);
        }
    }
}

namespace Htme.Component.Element {

    import SetImplement = Htme.DataStructure.SetImplement;
    import MapImplement = Htme.DataStructure.MapImplement;

    interface Element {

        attributes() : Attributes;
        // parent();
        detach();
        //parent(jquery : JQuery|null);
        attach();
        //content : Content ;
        readonly element : JQuery ;
        toString() : string;
    }

    export class Attribute extends SetImplement<string> {

        constructor(
            readonly name: string,
            private jquery: JQuery
        ) {

            super();

            let attribute = this.get();

            if (attribute) {

                for (let val of attribute.split(' ')) {

                    super.add(val);
                }
            }
        }

        add(value: string): this
        {
            for (let val of value.split(' ')) {

                super.add(val);
            }

            let attribute = this.get();

            if (attribute !== undefined) {

                value = `${attribute} ${value}`;
            }

            this.set(value);

            return this;
        }

        set(value: string): void
        {
            this.clear();
            this.jquery.attr(this.name, value);
        }

        get(): string | undefined {

            return this.jquery.attr(this.name);
        };

        toString(): string {

            let attribute = this.get();

            if (attribute === undefined) {

                return '';
            }

            return attribute;
        }

        clear(keep: boolean = false): void {

            if (keep) {

                this.jquery.attr(this.name, '');

            } else {

                this.jquery.removeAttr(this.name);
            }

            super.clear();
        }

        delete(value: string, keep: boolean = false): any {

            for (let v of value.split(' ')) {

                super.delete(v);
            }

            let attribute = Array.from(this).join(' ').trim();

            if (attribute === '') {

                this.clear(keep);

            } else {

                this.jquery.attr(this.name, attribute);
            }
        }
    }


    // export class Events {
    //
    //     constructor(
    //         private events : {[key:string]:(...args)=> any} = {}
    //     ) {
    //
    //     }
    //
    //     call(...args) {
    //
    //         for(let i in this.events) {
    //
    //             this.events[i](...args);
    //         }
    //     }
    // }


    export class Attributes extends MapImplement<string, Attribute> {

        constructor(public jquery : JQuery)
        {
            super();

            let $this = this;

            jquery.each(function() {

                $.each(this.attributes, function() {
                    // this.attributes is not a plain object, but an array
                    // of attribute nodes, which contain both the name and value
                    if(this.specified) {

                        let name = this.name.toLowerCase();

                        $this.set(name, new Attribute(name, jquery));
                    }
                });
            });
        }

        toString() : string
        {
            let buffer : string[] = [];

            for(let [name, attribute] of this) {


                buffer.push(`${name}="${attribute}"`);
            }

            return buffer.join(' ');

        }

        get(attribute : string) : Attribute
        {
            if(!this.has(attribute)) {

                this.set(attribute, new Attribute(attribute, this.jquery));
            }

            return super.get(attribute);
        }
    }




// export interface Jqueriable {
//
//     jquery() : JQuery ;
// }

// export class Item extends Map {
//
//
//
// }

// export class Menu extends Map<string, Item> {
//
//
//
// }

// export class Panel extends Compound {
//
//     private name : Elements;
//
//     constructor(jquery : JQuery|null = null, name : string) {
//
//         super(jquery);
//         this.name = new Elements($(`<div class="HtmePanelName">${name}</div>`));
//         this.attributes.get('class').add('HtmePanel');
//
//         this.name = name;
//     }
//
//     set name (name : string) {
//
//         this.name.html(name);
//
//         this.prepend(this.name);
//     }
//
//     get name () : string {
//
//         return this.name.content();
//     }
// }


// export class Container {
//
//     constructor(
//         private block : Elements,
//         private panel : Elements = new Elements($('<div></div>')),
//         readonly events : Events = new Events()
//     ) {
//
//     }
//
// }



    abstract class AbstractBlock implements Element {

        private $attributes : Attributes;
        private $element : JQuery;

        constructor(element : JQuery|string) {

            if(typeof element === "string") {

                element = $(element);
            }

            this.$element = element;
            this.$attributes = new Attributes(element);
        }

        abstract detach();
        abstract attach();

        get element() : JQuery {

            return this.$element;
        }

        attributes(): Attributes {

            return this.$attributes;
        }

        // attributes(): Attributes {
        //
        //     return this.$attributes;
        // }

        toString() : string {

            let string = this.element.wrap('<div></div>').parent().html();
            this.element.unwrap();

            return string;
        }
    }


    export class String extends AbstractBlock {

        private $content : string | null;

        constructor(element : JQuery|string) {

            super(element);
            this.content = this.element.html();
        }
        // private $parent : JQuery|null;

        // constructor(
        //     private $content : string,
        //     parent : JQuery|null = null
        // ) {
        //
        //     this.parent(parent);
        // }

        // parent(jquery : JQuery|null) {
        //
        //     this.detach();
        //     this.$parent = jquery;
        //     this.attach();
        // }

        attach() {

            if(this.$content) {

                this.element.html(this.content);

            } else {

                this.element.empty();
            }
        }

        detach() {

            this.element.empty();
        }

        get content() : string|null {

            return this.$content;
        }

        set content(content : string|null) {

            this.$content = content;
            this.attach();
        }
    }

    export class Block extends AbstractBlock {

        private $content : Element|null = null;

        constructor(
            element : JQuery|string
        ) {

            super(element);

            let content = this.element.html();

            if(content.length > 0) {

                this.content = new Block(content);
            }
        }

        get content() : Element|null {

            return this.$content;
        }

        set content(content : Element|null) {

            this.$content = content;
            this.attach();
        }

        attach() {

            this.detach();

            if(this.$content) {

                this.element.append(this.content.element);

            }
        }

        detach() {

            this.element.empty();
        }
    }

    export class Compound extends AbstractBlock {

        private children : {[key:string] : Element} = {};

        constructor(
            element : JQuery|string
        ) {

            super(element);
        }

        all() : {[key:string] : Element} {

            return Object.assign<{}, {}>({}, this.children);
        }

        clear() {

            this.element.empty();
        }

        attach() {

            for(let k in this.children) {

                this.element.append(this.children[k].element);
            }
        }

        detach() {

            for(let k in this.children) {

                this.children[k].element.detach();
            }
        }

        protected ensureKey(key : string|null) : string {

            if(key === null) {

                for(let i = 0; this.children.hasOwnProperty(key = '_' + i); i++);

            }

            this.remove(key);

            return key;
        }

        remove(key) {

            if(this.has(key)) {

                this.children[key].element.detach();
                delete this.children[key];
            }
        }

        prepend(block: Element, key : string|null = null) : string {

            key = this.ensureKey( key);

            let buffer = {};
            buffer[key] = block;

            this.children = Object.assign(buffer, this.children);

            this.attach();

            return key;
        }

        append(block: Element , key : string|null = null): string {

            key = this.ensureKey( key);

            this.element.append(block.element);
            this.children[key] = block;

            return key;
        }

        get(key) : Element | undefined {

            return this.children[key];
        }

        has(key) : boolean {

            return this.children.hasOwnProperty(key);
        }
    }
}




namespace Htme.Component.Structure {

    export class Item  {


    }

    export class Menu  {


    }

    export class Panel  {


    }

    export class Base {


    }

    // export class Container extends Compound {
    //
    //     static create () {
    //
    //     }
    // }
    /* */
}

namespace Htme.Component.Engine {

    import Compound = Htme.Component.Element.Compound;

    export function deserializer(compound : Compound, handler : Map<string, ($:JQuery) => boolean>)  {

        // jquery.children().each(function(key, value){
        //
        // });

    }

}





namespace Htme { export namespace App {

    export function init(selector: string, ...plugin) {


    }

}}