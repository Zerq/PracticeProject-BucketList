import { BaseCommand } from "./BaseCommand.js"; 

import { BucketListItemDeleted } from "../events/BucketListItemDeleted.js";

export class DeleteBucketListItem extends BaseCommand {
    #selection;
    /**
     * @param {string} selection
     */
    constructor(selection) {
        super(crypto.randomUUID());
        this.#selection = selection;
    }
    execute(model) {
        return [new BucketListItemDeleted(crypto.randomUUID(), this.CommandId, this.#selection)];
    }
}
