import { BaseEvent } from "./BaseEvent.js";
export class BucketListSorted extends BaseEvent {
    SortingType;
    Direction;
    /**
     * @param {string} eventId
     * @param {string} batchId
     * @param {string} category
     * @param {"activity"|"category"|"checked"} sortingType
     * @param {"asc"|"desc"} direction
     */
    constructor(eventId, batchId, sortingType, direction) {
        super(eventId, batchId, BucketListSorted.name, new Date());
        this.SortingType = sortingType;
        this.Direction = direction;  
    }
}