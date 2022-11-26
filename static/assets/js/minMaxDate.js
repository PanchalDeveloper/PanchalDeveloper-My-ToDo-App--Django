let d = new Date();
let curDate = d.toISOString().substring(0, 10);
let minDateBox = document.getElementById('minDateBox');
let maxDateBox = document.getElementById('maxDateBox');
try {
    minDateBox.min = maxDateBox.min = "2022-01-01";
    minDateBox.max = maxDateBox.max = curDate;
}
catch {
    // console.log("Script Not for this page.")
}


function FilterData() {

    if (maxDateBox.value == "") {
        maxDateBox.value = curDate;
    }

    if (minDateBox.value == "" || minDateBox.value > maxDateBox.value) {
        minDateBox.value = maxDateBox.value;
    }

    let minDate = new Date(minDateBox.value);
    let maxDate = new Date(maxDateBox.value);

    todoArr.forEach((todo) => {
        let todoDate = new Date(todo.dataset.createdDate);

        if ((todoDate >= minDate) && (todoDate <= maxDate)) {
            todo.dataset.betweenDates = "true";
        }
        else {
            todo.dataset.betweenDates = "false";
        }
    });
    loadPageData();
}

function clearDataFilter() {
    let minDateBox = document.getElementById('minDateBox');
    let maxDateBox = document.getElementById('maxDateBox');

    minDateBox.value = maxDateBox.value = "";

    //  To Clear Searchbox filter with this Button, Un-Comment the Two Commented Lines Below i this function.
    // let srchBox = document.querySelector("#searchBoxMain");
    // srchBox.value = "" 

    todoArr.forEach((todo) => {
        todo.dataset.betweenDates = "true";
    });

    loadPageData();

}
