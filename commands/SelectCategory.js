import { BaseCommand } from "./BaseCommand.js"; 
import { CategorySelected } from "../events/CategorySelected.js";


export class SelectCategory extends BaseCommand {
    #selection;
    /**
     * @param {string} selection
     */
    constructor(selection) {
        super(crypto.randomUUID());
        this.#selection = selection;
    }
    execute(model) {
        return [new CategorySelected(crypto.randomUUID(), this.CommandId, this.#selection)];
    }
}
