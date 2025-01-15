/**
 * @typedef {{selectedCategory: string, list:Map<string, {id: string, activityDescription: string, category:string}>, sortingDirection: "asc"|"desc", sorting: "activity"|"category"|"checked"}} ModelType
 */


export class BaseCommand {
    /**
     * @param {string} commandId
     */
    constructor(commandId) {
        this.#commandId = commandId;
    }

    #commandId;
    get CommandId() {
        return this.#commandId;
    }

    /**
     * @param {ModelType} model
     * @returns (array<BaseEvent>)
     */
    execute(model) {
        throw new Error("Cannot instantiate abstract class");
    }
}
