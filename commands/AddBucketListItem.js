import { BaseCommand } from "./BaseCommand.js"; 
import { BucketListItemAdded } from "../events/BucketListItemAdded.js";

export class AddBucketListItem extends BaseCommand {
    #category;
    #text;
    #id;

    get Category() {
        return this.#category;
    }
    get Text() {
        return this.#text;
    }
    get Id() {
        return this.#id;
    }

    /**
     * @param {string} category
     * @param {string} text
     * @param {string} id
     */
    constructor(category, text, id) {
        super(crypto.randomUUID());
        this.#category = category;
        this.#text = text;
        this.#id = id;
    }
    execute(model) {
        return [new BucketListItemAdded(crypto.randomUUID(), this.CommandId, this.#category, this.#text, this.#id)];
    }
}
