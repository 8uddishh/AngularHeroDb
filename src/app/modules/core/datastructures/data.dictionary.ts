import * as _ from 'lodash';

// another not needed utility ... just playing around with typescript :D ....
export class BSTNode<T> {

    left:BSTNode<T> = null;
    right:BSTNode<T> = null;

    constructor(public curr:T) {

    }
}

export class KeyValuePair<tKey, tValue> {
    constructor(public key:tKey, public value:tValue) {
    }
}

export class Dictionary<tKey,tValue> {

    root:BSTNode<KeyValuePair<tKey, tValue>> = null;

    entrySelector: (item:KeyValuePair<tKey, tValue>) => any = (item) => {
        return item.key;
    };

    constructor () {
    }

    private insert(node:BSTNode<KeyValuePair<tKey, tValue>>, entry: KeyValuePair<tKey, tValue>):BSTNode<KeyValuePair<tKey, tValue>> {
        if(!node) {
            node = new BSTNode(entry);
            return node;
        }

        if(this.entrySelector(entry) < this.entrySelector(node.curr)){
            node.left = this.insert(node.left, entry);
            return node;
        }
            
        if(this.entrySelector(entry) > this.entrySelector(node.curr)) {
            node.right = this.insert(node.right, entry);
            return node;
        }

        throw "Duplicate entries not allowed";
    }

    add(key:tKey, value:tValue):void {
        this.addEntry({ key: key, value: value });
    }

    addEntry(entry:KeyValuePair<tKey, tValue>): void {
        this.root = this.insert(this.root, entry);
    }

    addRange(entries:KeyValuePair<tKey, tValue> []) {
        _.each(entries, entry => this.addEntry(entry));
    }

    private search(node:BSTNode<KeyValuePair<tKey, tValue>>, entry:any): KeyValuePair<tKey, tValue> {
        if(!node)
            return null;

        if(entry == this.entrySelector(node.curr))
            return _.clone(node.curr);
        
        if(entry < this.entrySelector(node.curr))
            return this.search(node.left, entry);
        
        if(entry > this.entrySelector(node.curr))
            return this.search(node.right, entry);

        return null;
    }

    find(entry:any): KeyValuePair<tKey, tValue>  {
        return this.search(this.root, entry);
    }
}