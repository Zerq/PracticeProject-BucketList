import { BaseEvent } from "./BaseEvent.js";

export class BucketListItemCheck extends BaseEvent {
    CheckState;
    Id;
    /**
     * @param {string} eventId
     * @param {string} batchId
     * @param {string} checkState
     * @param {string} id
     */
    constructor(eventId, batchId, id, checkState ) {
        super(eventId, batchId, BucketListItemCheck.name, new Date());
        this.CheckState = checkState;
        this.Id = id;
    }
}
