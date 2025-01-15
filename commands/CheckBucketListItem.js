import { BaseCommand } from "./BaseCommand.js"; 
import { BucketListItemCheck } from "../events/BucketListItemCheck.js";


export class CheckBucketListItem extends BaseCommand {
    #id;
    #checkState;

    /**
     * @param {string} id
     * @param {boolean} checkState
     */
    constructor(id, checkState) {
        super(crypto.randomUUID());
        this.#id = id;
        this.#checkState = checkState;
        
    }
    execute(model) {
        return [new BucketListItemCheck(crypto.randomUUID(), this.CommandId, this.#id, this.#checkState)];
    }
}
