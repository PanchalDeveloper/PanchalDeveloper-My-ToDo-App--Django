let todoArr = Array.from(document.querySelectorAll('.todoBody'));
const todoElems = document.querySelectorAll('.todoBody'),
    gotoTopBtn = document.getElementById('gotoTopBtn'),
    skipToMainBtn = document.getElementById('skipNavigation');

try {
    changeTodoView();
    sortElems()
}
catch {
    // console.log("Script Not for this page.")
}

let winSizeCheck = window.addEventListener("load", deviceWidthCheck);
let winResizeCheck = window.addEventListener("resize", deviceWidthCheck);
let closePopUpOnBlur = document.addEventListener("click", popUpBlurCheck);

// GoTo Top Button
let winScrollCheck = window.addEventListener("scroll", () => { checkWinScoll(gotoTopBtn, 630) });
let gotoTopHide = gotoTopBtn.addEventListener("click", hideOnClick);

// User Login Time Area
const usrTimeArea = document.getElementById('footerUserTime');

(usrTimeArea.textContent)?(usrTimeArea.parentElement.style.display = 'flex'):(usrTimeArea.parentElement.style.display = 'none');

// Change Todo Pages
function loadPageData(toPage = 1, checkLocal = false) {

    storage_key_page_no = 'last_visited_todo_page';
    key_val_page_no = window.localStorage.getItem(storage_key_page_no);

    let currPageNum = toPage, maxTodosInPage = 10;
    let todoArr = Array.from(document.querySelectorAll('.todoBody')), showingTodos = todoArr.filter(checkShowingTodos);

    if (key_val_page_no && checkLocal) {
        currPageNum = key_val_page_no;
    }

    let maxPages = Math.ceil(showingTodos.length / maxTodosInPage); // Here '10' is showing that there are '10 todos' in a single page.
    if (maxPages == 0) { maxPages = 1; }

    if (currPageNum > maxPages) {
        return;
    }

    window.localStorage.setItem(storage_key_page_no, currPageNum);

    let firstTodoOfPage = (currPageNum * maxTodosInPage - maxTodosInPage);
    let lastTodoOfPage = 0;

    allTodoDisplay("hide");
    for (let i = 0; i < showingTodos.length; i++) {

        if ((i >= firstTodoOfPage && lastTodoOfPage < 10) && checkShowingTodos(showingTodos[i])) {
            showingTodos[i].style.display = "flex";

            lastTodoOfPage++;

        }
    }

    // if todo list is empty show "There isn't any todos."
    todoEmptyCheck(lastTodoOfPage);

    // load page changing buttons by calculating pages 
    pagesToLoad(maxPages, currPageNum);
}


const timeZoneInfoForm = document.getElementById('timeZoneForm');
const currTimeZone = timeZoneInfoForm.querySelector('#currTimeZone');
const timeZoneChanged = timeZoneInfoForm.querySelector('#timeZoneChanged');

currTimeZone.addEventListener('change', () => { timeZoneChanged.value = 'True'; timeZoneInfoForm.submit(); });