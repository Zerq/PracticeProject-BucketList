import { BaseEvent } from "./BaseEvent.js";

export class CategorySelected extends BaseEvent {
    Selection;

    /**
     * @param {string} eventId
     * @param {string} commadId
     * @param {string} selection
     */
    constructor(eventId, batchId, selection) {
        super(eventId, batchId, CategorySelected.name, new Date());
        this.Selection = selection;
    }
}
