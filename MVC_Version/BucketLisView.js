function sort(model){
    let list = [...model.List.values()];
    if (model.Sorting === "activity" && model.SortingDirection === "desc"){
         document.querySelector("#activitySortingButtons button:first-child").className = "active";  
        return list.sort((a, b) => a.activityDescription.localeCompare(b.activityDescription)).reverse();
    }

    if (model.Sorting === "activity" && model.SortingDirection === "asc"){
        document.querySelector("#activitySortingButtons button:last-child").className = "active";
        return list.sort((a, b) => a.activityDescription.localeCompare(b.activityDescription));
    }

    if (model.Sorting === "category" && model.SortingDirection === "desc"){
        document.querySelector("#categorySortingButtons button:first-child").className = "active";  
        return list.sort((a, b) => a.category.localeCompare(b.category)).reverse();
    }

    if (model.Sorting === "category" && model.SortingDirection === "asc"){
        document.querySelector("#categorySortingButtons button:last-child").className = "active";
        return list.sort((a, b) => a.category.localeCompare(b.category));
    }

    if (model.Sorting === "checked" && model.SortingDirection === "desc"){
        document.querySelector("#completedSortingButtons button:first-child").className = "active";  
        return list.sort((a, b) => {
            let a2 = model.List.get(a.id).checked ? 1 : 0;
            let b2 = model.List.get(b.id).checked ? 1 : 0;
            return a2 - b2;
        }).reverse();
    }

    if (model.Sorting === "checked" && model.SortingDirection === "asc"){
        document.querySelector("#completedSortingButtons button:last-child").className = "active";
        return list.sort((a, b) => {
            let a2 = model.List.get(a.id).checked ? 1 : 0;
            let b2 = model.List.get(b.id).checked ? 1 : 0;
            return a2 - b2;
        });
    }   
    throw new Error("no conditions met for sorting!");
}



/**
 * @param {import("./BucketListModel").BucketListModel} model
 * @param {import("./BucketListController").BucketListController} controller
 */
export function BucketLisView(model, controller) {
    const main = document.querySelector("main");
    main.innerHTML = "";
    const mainFormTemplate = document.getElementById("mainFormTemplate");

    main.appendChild(mainFormTemplate.content.children[0].cloneNode(true));
    main.appendChild(mainFormTemplate.content.children[1].cloneNode(true));

    document.querySelector("#activitySortingButtons button:first-child").addEventListener("click", () => controller.sortDescendingActivity());
    document.querySelector("#activitySortingButtons button:last-child").addEventListener("click", () => controller.sortAscendingActivity());
    document.querySelector("#categorySortingButtons button:first-child").addEventListener("click", () => controller.sortDescendingCategory());
    document.querySelector("#categorySortingButtons button:last-child").addEventListener("click", () => controller.sortAscendingCategory());
    document.querySelector("#completedSortingButtons button:first-child").addEventListener("click", () => controller.sortDescendingCompleted());
    document.querySelector("#completedSortingButtons button:last-child").addEventListener("click", () => controller.sortAscendingCompleted());

    document.getElementById("bucketForm").addEventListener("submit", e=> { 
        controller.submit(e, model);
    });

    //this is just my lazy way of handling no maches..
    document.querySelectorAll(`#activityCategory option[value=${model.SelectedCategory}]`).forEach(n => n.selected = true);

    document.getElementById("activityCategory").addEventListener("change", e =>  controller.select(e));

    const table = document.querySelector("#bucketLists table");

    let list = sort(model);


 


    list.forEach(n => {
        const tr = document.createElement("tr");

        const tdCategory = document.createElement("td");
        tdCategory.innerText = n.category;
        tr.appendChild(tdCategory);

        const tdActivity = document.createElement("td");
        tdActivity.innerText = n.activityDescription;
        tr.appendChild(tdActivity);

        const tdOption = document.createElement("td");

        const button = document.createElement("button");
        button.innerText = "ta bort";
        button.id = n.id;
        button.addEventListener("click", (e) => controller.delete(n.id));
        tdOption.appendChild(button);

        const label = document.createElement("label");
        label.setAttribute("for", "checkBox_" + n.id);
        label.innerText = "avklarat:";
        tdOption.appendChild(label);

        const checkbox = document.createElement("input");
        checkbox.id = "checkBox_" + n.id;
        checkbox.setAttribute("type", "checkbox");

        if (n.checked){
            checkbox.checked = true;
        }


        checkbox.addEventListener("input", (e) => controller.check(e, n.id));
        tdOption.appendChild(checkbox);
        tr.appendChild(tdOption);

        table.appendChild(tr);
    });
}