// Remove Notification Automatically

let removeStep1, removeStep2, alertMsgs = document.querySelectorAll('.alert-dismissable');

// Check if user interacts with alerts msg
if (alertMsgs.length > 0) {
    remAlertMsgs();
    alertMsgs.forEach(alertMsg => {
        alertMsg.addEventListener(("mouseover"), () => {
            hold_remAlertMsgs();
        });
        alertMsg.addEventListener("mouseout", () => {
            remAlertMsgs();
        });
    });
    alertMsgs.forEach(alertMsg => {
        alertMsg.addEventListener(("touchstart"), () => {
            hold_remAlertMsgs();
        });
        alertMsg.addEventListener("touchend", () => {
            remAlertMsgs();
        });
    });
}

// Remove alerts after some time automatically
function remAlertMsgs() {
    let hideTime = 93000;
    alertMsgs.forEach(alertMsg => {
        if (alertMsg.style.display != "none") {
            removeStep1 = window.setTimeout(() => { alertMsg.style.opacity = "0"; }, hideTime);
            removeStep2 = window.setTimeout(() => { alertMsg.remove(); }, hideTime + 750);
        }
    });
}
// Check for Device Width
function deviceWidthCheck() {
    let windowWidth = window.innerWidth;
    const navbarMenuList = document.getElementById('navbarMenuList');
    const navMenuBtn = document.getElementById('navMenuBtn');

    if (windowWidth <= 991) {
        classEdit(navbarMenuList, "add", "hidden");
        classEdit(navbarMenuList, "remove", "show");
        classEdit(navMenuBtn, "remove", "lni-close");
        classEdit(navMenuBtn, "add", "lni-menu");
    }
    else {
        classEdit(navbarMenuList, "add", "show");
        classEdit(navbarMenuList, "remove", "hidden");
    }
}
// This Will Clear Your Trash Bin.
function showConfirmDialog(action = '/', headMsg = 'Confirmation Pop-Up', bodyMsg = 'Wanna Proceed Anyway !?', passNeeded = 'false', proceedBtnTxt = 'Proceed', cancelBtnTxt = 'Cancel', method = 'POST') {
    const dialogBox = document.getElementById('confirmationPopUp');
    const popUpForm = dialogBox.querySelector('#confirmationPopUpForm');
    const popUpConfirmPassArea = dialogBox.querySelector('#popUpConfirmPassArea');
    const popUpConfirmPass = dialogBox.querySelector('#popUpConfirmPass');
    const headMsgTxt = dialogBox.querySelector('#popUpHeadMsgTxt');
    const bodyMsgTxt = dialogBox.querySelector('#popUpBodyMsgTxt');
    const proceedBtn = dialogBox.querySelector('#popUpMsgProceedBtn');
    const cancelBtn = dialogBox.querySelector('#popUpMsgCancelBtn');


    popUpForm.action = action;
    popUpForm.method = method;
    headMsgTxt.innerText = headMsg;
    (bodyMsg) ? (bodyMsgTxt.innerText = bodyMsg) : bodyMsgTxt.style.display = 'none';
    proceedBtn.innerText = proceedBtnTxt;
    cancelBtn.innerText = cancelBtnTxt;

    (passNeeded == 'true') ? (popUpConfirmPassArea.style.display = 'flex') : (popUpConfirmPassArea.style.display = 'none');

    dialogBox.show();
}

// Hide a pop-up if it looses focus

let popUpList;
function popUpBlurCheck(event) {
    popUpList = document.querySelectorAll(".pop-up");

    if (!event.target.closest(".show-pop-up-btn")) {
        let popUp = event.target.closest(".pop-up");

        if (popUp != null) {
            if (event.target.closest(".hide-pop-up-btn")) { remPopUp(popUp); }
        }
        else if (popUp == null && popUpList.length > 0) {
            popUpList.forEach(elem => {
                remPopUp(elem);
            });
        }
    }
}

// Hold alerts removing proccess
function hold_remAlertMsgs() {
    window.clearTimeout(removeStep1);
    window.clearTimeout(removeStep2);
}

// Hide/Remove Pop-Up
function remPopUp(pop_up) {
    if (pop_up.tagName == "DIALOG") {
        pop_up.close();
    }
    else if (pop_up.className.includes("show")) {
        classEdit(pop_up, 'remove', 'show')
        classEdit(pop_up, 'add', 'hidden')
        pop_up.style.display = "none";
    }
    else {
        pop_up.remove();
    }
}

// Show page changing buttons
function pagesToLoad(maxPages, currPage) {
    const pageSelectionAreas = document.querySelectorAll(".pageSelectionArea");
    pageSelectionAreas.forEach((pageSelectionArea, area) => {
        pageSelectionArea.innerHTML = "";

        for (let i = 0; i < maxPages; i++) {
            pageSelectionArea.innerHTML += `<button type="button" id ="Area-${area + 1}-PageBtn-${i + 1}" class="pageBtn pageBtn_${i + 1} p-box text-center no-shadow button btn m-1" onclick="loadPageData(${i + 1}), jumpTo(this)">${i + 1}</button>`
        }
        if (pageSelectionArea.childElementCount > 5) {
            limitPageBtns(pageSelectionArea, currPage);
        }
    });

    pageBtnHighlight(currPage);
}

// Change local Todo Sorting
function sortElems(checkOnly = true) {
    const btn = document.getElementById('todoSortBtn'), container = document.getElementById('todoList');
    const valOne = '1-9', valTwo = '9-1', storage_key = 'local_todo_sorting';
    const classOne = 'fa-arrow-down-1-9', classTwo = 'fa-arrow-down-9-1';
    let elemsArr = [...todoArr], curr_key_val = window.localStorage.getItem(storage_key);

    if (!curr_key_val) {
        curr_key_val = valOne;
    }

    if (checkOnly == false) {
        (curr_key_val == valOne) ? (curr_key_val = valTwo) : (curr_key_val = valOne);
    }

    if (curr_key_val == valOne) {
        classEdit(btn, 'add', classOne);
        classEdit(btn, 'remove', classTwo);
    }
    else if (curr_key_val == valTwo) {
        elemsArr = elemsArr.reverse();
        classEdit(btn, 'add', classTwo);
        classEdit(btn, 'remove', classOne);
    }

    elemsArr.forEach((elem) => {
        container.appendChild(elem);
    });

    window.localStorage.setItem(storage_key, curr_key_val);
    loadPageData(1, true);
}



// Change local Todo View
function changeTodoView(checkOnly = true) {
    const btn = document.getElementById('todoChangeView');
    const valOne = 'min', valTwo = 'max', storage_key = 'local_todo_view';
    const classOne = 'lni-page-break', classTwo = 'lni-layout';
    let fBasis, curr_key_val = window.localStorage.getItem(storage_key);

    if (!curr_key_val) {
        curr_key_val = valOne;
    }

    if (checkOnly == false) {
        (curr_key_val == valOne) ? (curr_key_val = valTwo) : (curr_key_val = valOne);
    }

    if (curr_key_val == valOne) {
        fBasis = "1 1 0%";
        classEdit(btn, 'add', classOne);
        classEdit(btn, 'remove', classTwo);
    }
    else if (curr_key_val == valTwo) {
        fBasis = "1 1 100%";
        classEdit(btn, 'add', classTwo);
        classEdit(btn, 'remove', classOne);
    }

    todoElems.forEach((elem) => {
        elem.style.flex = fBasis;
    });

    window.localStorage.setItem(storage_key, curr_key_val);
}


// Make All Todos Visible
function allTodoDisplay(show_hide) {
    todoArr.forEach((todo) => {
        if (show_hide == "show") { todo.style.display = "flex"; }
        if (show_hide == "hide") { todo.style.display = "none"; }
    });
}

// Check If Element is visible to Human Eyes
function checkElemVisibility(elem) { return elem.checkVisibility(); }

// Check If Todo is Has visible Todo-Properties
function checkShowingTodos(todo) {
    if (todo.dataset.betweenDates) { return (todo.dataset.betweenDates == "true" && todo.dataset.srchMatch == "true"); }
}

function todoEmptyCheck(todoCount) {
    let todoEmpty = document.querySelector('.todoEmpty');
    if (todoCount == 0) { todoEmpty.style.display = "flex"; }
    else { todoEmpty.style.display = "none"; }
}

// Limit page buttons
function limitPageBtns(parent, currPage) {
    let btnsArr = Array.from(parent.children);
    let firstBtn = 0;
    let lastBtn = btnsArr.length - 1;
    let currBtn = currPage - 1;
    if (lastBtn >= 5) {
        btnsArr.forEach((el, index) => {
            if ((index != firstBtn && index != (lastBtn))) {
                if (index != currBtn && index != currBtn + 1 && index != currBtn - 1) {
                    el.style.display = "none"
                }
            }
        });
        if (currBtn == (firstBtn)) {
            btnsArr[lastBtn - 1].style.display = "inline-block";
            btnsArr[lastBtn - 2].style.display = "inline-block";
        }
        else if (currBtn == (firstBtn + 1)) {
            btnsArr[lastBtn - 1].style.display = "inline-block";
        }
        else if (currBtn == (lastBtn)) {
            btnsArr[firstBtn + 1].style.display = "inline-block";
            btnsArr[firstBtn + 2].style.display = "inline-block";
        }
        else if (currBtn == (lastBtn - 1)) {
            btnsArr[firstBtn + 1].style.display = "inline-block";
        }

        // Add "..." where Page One or More Buttons are Missing

        let visibleBtns = btnsArr.filter(checkElemVisibility);

        for (let i = 0; i < visibleBtns.length; i++) {
            if (visibleBtns[i + 1] && visibleBtns[i + 1] != "null" && visibleBtns[i + 1] != "undefined") {
                if (Math.floor(visibleBtns[i + 1].innerText) != Math.floor(visibleBtns[i].innerText) + 1) {
                    addDots(visibleBtns[i], "after");
                }
            }
        }
    }
}

// Highlight Current Page Buttons
function pageBtnHighlight(currPage) {
    let currPageBtn = document.querySelectorAll(`.pageBtn_${currPage}`);
    currPageBtn.forEach((btn) => {
        btn.style.color = "var(--main-app-secondary-color)";
        btn.style.borderColor = "var(--main-app-color-2)";
    });
}

// Add "..." instead of extra buttons
function addDots(elem, where = "after") {
    if (where == "before") { elem.insertAdjacentText("beforeBegin", "..."); }
    else if (where == "after") { elem.insertAdjacentText("afterEnd", "..."); }
}

// Scroll To Given element
function jumpTo(elem) {
    let Elem = document.getElementById(elem.id);
    let position = { top: Elem.offsetTop, left: Elem.offsetLeft, }
    setTimeout(scrollNow, 300);

    function scrollNow() {
        winScroll(x = position.left, y = position.top);
    }
}

// Change Input field type
function fieldType(elem, type) {
    elem.type = type;
}

// Returns '01-09' instead of '1-9'
function getFullLength(val) {
    if (val < 10) return 0 + "" + val;
    else return val;
}

// Show modal
function showDialog(elem_id) {
    let dialog = document.getElementById(elem_id);
    dialog.show();
    isModalOpen = true;
}

// Show Modal
function ShowModal(elem_id) {
    let modal = document.getElementById(elem_id);
    modal.showModal();
}

// Hide Modal/Dialog
function hideDialog(elem_id) {
    let dialog = document.getElementById(elem_id);
    dialog.close();
}

// Scroll to (x,y) axis in window
function winScroll(x = 0, y = 0) {
    window.scrollTo(x, y);
}

// Hide Element when Window Y-axis scroll is greater than given value
function checkWinScoll(elem, val, disAs='block') {
    if (window.scrollY > val && elem.style.visibility == "hidden") {
        elem.style.display = disAs;
        elem.style.visibility = "visible";
        elem.style.opacity = "1";
    }
    if (window.scrollY <= val && elem.style.visibility != "hidden") {
        elem.style.visibility = "hidden";
        elem.style.opacity = "0";

        // let hideMe = setTimeout(()=>{
            elem.style.display = 'hidden';
        // }, 0);
    }
}
// Hide Element when Clicked
function hideOnClick(event) {
    event.target.style.display = 'none';
    console.log(event.target);
}

// Replace Classes with Given Classes
function changeClasses(elem_id, classSet_1, classSet_2) {

    const iconBtn = document.getElementById(elem_id);
    let newClassArr_1 = classSet_1.split(" "),
        newClassArr_2 = classSet_2.split(" ");

    if (newClassArr_1[0] && newClassArr_2[0]) {
        newClassArr_2.forEach((_class) => {
            iconBtn.classList.toggle(_class);
        });

        newClassArr_1.forEach((_class) => {
            iconBtn.classList.toggle(_class);
        });
    }

}

// Shortand const Adding/Removing classes in element 
function classEdit(elem, methode_ = "add", classes = '') {
    if (methode_ == "add") {
        classes.split(' ').forEach((_class) => { elem.classList.add(_class) });
    }
    if (methode_ == "remove") {
        classes.split(' ').forEach((_class) => { elem.classList.remove(_class) });
    }
}
