
export class BaseEvent {
    /**
     *
     * @param {string} eventId
     * @param {string} batchId
     * @param {string} eventName
     * @param (date) created
     */
    constructor(eventId, batchId, eventName, created) {
        this.EventId = eventId;
        this.BatchId = batchId;
        this.EventName = eventName;
        this.Created = created;
    }

    EventId;
    BatchId;
    EventName;
    SequenceNr;
    Created;
}
