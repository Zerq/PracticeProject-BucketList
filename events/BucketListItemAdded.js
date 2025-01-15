import { BaseEvent } from "./BaseEvent.js";

export class BucketListItemAdded extends BaseEvent {
    Category;
    Text;
    Id;
    /**
     * @param {string} eventId
     * @param {string} batchId
     * @param {string} category
     * @param {string} text
     * @param {string} id
     */
    constructor(eventId, batchId, category, text, id) {
        super(eventId, batchId, BucketListItemAdded.name, new Date());
        this.Category = category;
        this.Text = text;
        this.Id = id;
    }
}
