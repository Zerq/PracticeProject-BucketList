

export class BucketListModel {
    constructor(){
           this.SelectedCategory ="Resor";
           this.List = new Map();
           this.Sorting = "category";
           this.SortingDirection = "desc";
    }

    /**
     * @type {"Resor"|"Äventyr"|"Lärande"|"Hobby"}
     */
    SelectedCategory;

    /**
     * @type {Map<string, {id:string, activityDescription: string, category: "Resor"|"Äventyr"|"Lärande"|"Hobby",checked: boolean>}
     */
    List;


    /**
     * @type {"category"|"activity"|"checked"},
     */
    Sorting;

    /**
     * @type {"asc"|"desc"}
     */
    SortingDirection;

}
