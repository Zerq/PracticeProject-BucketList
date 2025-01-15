import { BaseEvent } from "./BaseEvent.js";

export class BucketListItemDeleted extends BaseEvent {
    ItemId;

    /**
     * @param {string} eventId
     * @param {string} commadId
     * @param {string} selection
     */
    constructor(eventId, batchId, itemId) {
        super(eventId, batchId, BucketListItemDeleted.name, new Date());
        this.ItemId = itemId;
    }
}
