export class BucketListController {
    #model;
    #view;

/**
 * @param {import("./BucketListModel").BucketListModel} model
 * @param {import("./BucketLisView").BucketLisView} view
 */

    constructor(model, view) {
        this.#model = model;
        this.#view = view;

        let saved = JSON.parse(localStorage.getItem("mvcBucketList"));
        if (saved){
            saved.List = new Map();

            saved.ary.forEach(n=> {
                n.Created = new Date(n.Created);
                saved.List.set(n.id, n);
            });
            
            delete saved.ary;

            this.#model = saved;
        }
        this.#view(this.#model, this);
    }

    #update(){ 
        let data = { 
            ary: [...this.#model.List.values()],
            SelectedCategory: this.#model.SelectedCategory,
            Sorting: this.#model.Sorting,
            SortingDirection: this.#model.SortingDirection
        };

        localStorage.setItem("mvcBucketList", JSON.stringify(data));        
        this.#view(this.#model, this);
    }

 
    dialogSubmit(e){
        e.preventDefault();
        const text = e.target[0].value;
        const category = e.target[1].value;
        const id = this.#model.editing;
        const item = this.#model.List.get(this.#model.editing);
        this.#model.editing = undefined; 

        item.activityDescription = text;
        item.category = category;
        this.#update();
    }

    sortDescendingActivity() {
        this.#model.Sorting = "activity";
        this.#model.SortingDirection = "desc";
        this.#update();
    }
    sortAscendingActivity() {
        this.#model.Sorting = "activity";
        this.#model.SortingDirection = "asc";
        this.#update();
    }

    sortDescendingCategory() {
        this.#model.Sorting = "category";
        this.#model.SortingDirection = "desc";
        this.#update();
    }
    sortAscendingCategory() {
        this.#model.Sorting = "category";
        this.#model.SortingDirection = "asc";
        this.#update();
    }

    sortDescendingCompleted() {
        this.#model.Sorting = "checked";
        this.#model.SortingDirection = "desc";
        this.#update();
    }
    sortAscendingCompleted() {
        this.#model.Sorting = "checked";
        this.#model.SortingDirection = "asc";
        this.#update();
    }

    submit(e) {
        e.preventDefault();
        let text = e.target[0].value;
        let category = e.target[1].value;
        let id = crypto.randomUUID();
        this.#model.List.set(id, { id: id, activityDescription: text,category: category, checked: false  });
        this.#update();
    }
    
 
    edit(id){
        this.#model.editing = id;
        this.#update();
    }

    delete(e){
        this.#model.List.delete(e);
        this.#update();
    }

    select(e) {
        this.#model.SelectedCategory =  e.target.value;
        this.#update();
    }

    check(e, id) {
        const item = this.#model.List.get(id);
        if (e.target.checked){
            item.checked = e.target.checked;
            this.#update();
        }        
    }
}