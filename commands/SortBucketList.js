import { BaseCommand } from "./BaseCommand.js"; 
import { BucketListSorted } from "../events/BucketListSorted.js";


export class SortBucketList extends BaseCommand {
    #sortingType;
    #direction;
    /**
     * @param {"activity"|"category"|"checked"} sortingType
     * @param {"asc"|"desc"}  direction
     */
    constructor(sortingType, direction) {
        super(crypto.randomUUID());
        this.#sortingType = sortingType;
        this.#direction = direction;
    }

    execute(model) {
        return [new BucketListSorted(crypto.randomUUID(), this.CommandId, this.#sortingType, this.#direction )];
    }
}
