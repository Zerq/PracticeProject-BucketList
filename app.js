import { Elm } from "./elm.js";
import { BaseEvent } from "./events/BaseEvent.js";
import { BaseCommand } from "./commands/BaseCommand.js";

import { CategorySelected } from "./events/CategorySelected.js";
import { BucketListItemAdded } from "./events/BucketListItemAdded.js";
import { BucketListItemDeleted } from "./events/BucketListItemDeleted.js";
import { BucketListItemCheck } from "./events/BucketListItemCheck.js";
import { BucketListSorted } from "./events/BucketListSorted.js";


import { SelectCategory } from "./commands/SelectCategory.js";
import { AddBucketListItem } from "./commands/AddBucketListItem.js";
import { DeleteBucketListItem } from "./commands/DeleteBucketListItem.js";
import { CheckBucketListItem } from "./commands/CheckBucketListItem.js";
import { SortBucketList } from "./commands/SortBucketList.js";


/* sadly jsdoc lack a good way to export typedef data... */
/**
 * @typedef {{selectedCategory: string, list:Map<string, {id: string, activityDescription: string, category:string}>, sortingDirection: "asc"|"desc" , sorting: "activity"|"category"|"checked"}}} ModelType
 */


export class app {
    #appbody;

    /**
       * @type {Array<string>}
       */
    #categories;
    /**
     * @type {ModelType}
     */
    #model;

    /**
     * @type {Array<BaseEvent>}
     */
    #events;

    /**
     * @type (number)
     */
    #sequenceNr;




    /**
     * @param {HTMLElement} appBody 
     */
    constructor(appBody) {

        this.#sequenceNr = 0;
        this.#appbody = appBody;
        this.#categories = ["Resor", "Äventyr", "Lärande", "Hobby"];
        this.#events = [];

        let saved = JSON.parse(window.localStorage.getItem("bucketlist"));
        saved?.forEach(n => {
            n.Created = new Date(n.Created);
        });


        if (saved) {
            this.#events = saved;
        }

        this.#initializeModel();
        if (saved) {
            this.#replay();
        }
    }

    #initializeModel() {
        this.#model = {
            selectedCategory: "Resor",
            list: new Map(),
            sorting: "activity"
        };
    }


    /**
     * @param {BaseCommand} command 
     */
    #executeCommand(command) {
        let events = command.execute(this.#model);
        events.forEach(evt => {
            evt.SequenceNr = this.#sequenceNr;
            this.#reciveEvent(evt);
            this.sequenceNr++;
        });
    }

    /**
     * @param {BaseEvent} evt 
     */
    #reciveEvent(evt) {
        this.#events.push(evt);
        let json = JSON.stringify(this.#events);
        window.localStorage.setItem("bucketlist", json);

        this.#processEvent(evt);
        this.Render();
    }


    #replay() {
        this.#events.forEach(n => {
            this.#processEvent(n);
        })
        this.Render();
    }


    /**
     * @param {BaseEvent} evt 
     */
    #processEvent(evt) {
        switch (evt.EventName) {
            case CategorySelected.name:
                this.#model.selectedCategory = evt.Selection;
                console.log(evt);
                break;

            case BucketListItemAdded.name:
                this.#model.list.set(evt.Id, { id: evt.Id, activityDescription: evt.Text, category: evt.Category });
                console.log(evt);
                break;

            case BucketListItemCheck.name:
                let item = this.#model.list.get(evt.Id);
                item.checked = evt.CheckState;
                console.log(evt);
                break;

            case BucketListItemDeleted.name:
                this.#model.list.delete(evt.ItemId);
                console.log(evt);
                break;

            case BucketListSorted.name:
                this.#model.sorting = evt.SortingType;
                this.#model.sortingDirection = evt.Direction;
                console.log(evt);
                break;

        }
    }

    /**
     * @param {SubmitEvent} e 
     */
    #submit(e) {
        e.preventDefault();

        let text = e.target[0].value;
        let category = e.target[1].value;

        this.#executeCommand(new AddBucketListItem(category, text, crypto.randomUUID()));

    }

    /**
     * @param {Event} e 
     */
    #deleteItem(e) {
        this.#executeCommand(new DeleteBucketListItem(e));

    }

    /**
     * @param {Event} e 
     */
    #selectFromList(e) {
        this.#executeCommand(new SelectCategory(e.target.value));

    }

    #checkItem(id, e) {
        let checked = e.target.checked;
        this.#executeCommand(new CheckBucketListItem(id, checked));
    }

    /**
     * @param {"activity"|"category"|"checked"} sorting 
     * @param {"asc"|"desc"} direction 
     */
    #sortBy(sorting, direction) {
        this.#executeCommand(new SortBucketList(sorting, direction));
    }

    /**
     * @param {Map<string, BaseEvent>} map 
     * @param {"activity"|"category"|"checked"} sorting
     * @param {(n:BaseEvent)=> HTMLElement} mapfunc 
     */
    #mapidyMap(map, sorting, mapfunc) {
        let result = [];

        /**
         * @type {Array<{id: string, activityDescription: string, category:string}>}
         */
        let ary = Array.from(this.#model.list.values());

        switch (sorting) {
            case "category":
                ary = ary.sort((a, b) => a.category.localeCompare(b.category));
                break;
            case "activity":
                ary = ary.sort((a, b) => a.activityDescription.localeCompare(b.activityDescription));
                break;
            case "checked":
                ary = ary.sort((a, b) => {
                    let a2 = this.#model.list.get(a.id).checked ? 1 : 0;
                    let b2 = this.#model.list.get(b.id).checked ? 1 : 0;

                    return a2 - b2;
                });
                break;
        }

        if (this.#model.sortingDirection === "asc") {
            ary = ary.reverse();
        }


        return ary.map(mapfunc);
    }



    #ctrlZTimeout;
    async Render() {
        this.#appbody.innerHTML = "";
        this.#appbody.appendChild(Elm("form", { id: "bucketForm", onsubmit: (e) => this.#submit(e) },
            Elm("input", { type: "text", id: "activityName", placeholder: "Vad vill du göra?", required: "" }),
            Elm("select", { id: "activityCategory", onchange: (e) => this.#selectFromList(e) },
                ...this.#categories.map((n) => {
                    let result = Elm("option", { value: n }, n);
                    if (n === this.#model.selectedCategory) {
                        result.setAttribute("selected", "");
                    }
                    return result;
                })
            ),
            Elm("button", { type: "submit" }, "lägg till")
        ));

        this.#appbody.appendChild(
            Elm("section", { id: "bucketLists" },
                Elm("table", {},
                    Elm("thead", {},
                        Elm("tr", {},
                            Elm("td", {},
                                "Aktivitet",
                                Elm("button", { onclick: e => this.#sortBy("activity", "asc") }, "\u2BC5"),
                                Elm("button", { onclick: e => this.#sortBy("activity", "desc") }, "\u2BC6")
                            ),
                            Elm("td", {}, "Kategori",
                                Elm("button", { onclick: e => this.#sortBy("category", "asc") }, "\u2BC5"),
                                Elm("button", { onclick: e => this.#sortBy("category", "desc") }, "\u2BC6")
                            ),
                            Elm("td", {}, "Avklarat",
                                Elm("button", { onclick: e => this.#sortBy("checked", "asc") }, "\u2BC5"),
                                Elm("button", { onclick: e => this.#sortBy("checked", "desc") }, "\u2BC6")
                            )
                        )
                    ),
                    ...this.#mapidyMap(this.#model.list, this.#model.sorting, n => {

                        let attrs = { oninput: (e) => this.#checkItem(n.id, e), type: "checkbox" };

                        if (n.checked) {
                            attrs["checked"] = "";
                        }

                        return Elm("tr", {},
                            Elm("td", {},
                                Elm("H2", {}, n.category),
                            ),

                            Elm("td", {},
                                Elm("p", {}, n.activityDescription)
                            ),

                            Elm("td", {},
                                Elm("button", { onclick: () => this.#deleteItem(n.id) }, "ta bort"),
                                " avklarat:",
                                Elm("input", attrs)
                            )
                        );
                    })
                )
            )
        );

        document.body.addEventListener("keydown", e => {
            if (e.key === "z" && e.ctrlKey === true) {


                if (this.#ctrlZTimeout === undefined)
                    this.#ctrlZTimeout = setTimeout(async () => {
                        this.#events.pop();
                        let json = JSON.stringify(this.#events);
                        window.localStorage.setItem("bucketlist", json);

                        this.#initializeModel()
                        await this.#replay();
                        await this.Render();
                        this.#ctrlZTimeout = undefined;
                    }, 300);
            }   
        });
}

}