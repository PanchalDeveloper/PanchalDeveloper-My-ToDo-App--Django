const srchBox = document.querySelector("#searchBoxMain");
try {
    srchBox.addEventListener("input", searchStrInData);
}
catch {
//     console.log("Search Not Possible.")
}

function searchStrInData() {
    let srchText = srchBox.value.toLowerCase().trim().replace(/\s+/g, ' '),
        srchTextArr = srchText.split(' '),
        srchStrArr = [srchText, ...srchTextArr,],
        srchBodyElems = todoArr,
        srchTxtElems,
        srch_field_txt,
        srch_txt,
        visibleFields;

    searchNow();

    function searchNow() {

        srchBodyElems.forEach((srchBodyElem) => {
            let wordsCount = 0;

            srchTxtElems = srchBodyElem.querySelectorAll(".searchable");

            srchTxtElems.forEach((srchTxtElem) => {
                srch_field_txt = srchTxtElem.innerText.toLowerCase();

                for (i in srchStrArr) {
                    srch_txt = srchStrArr[i];

                    if (srch_field_txt.includes(srch_txt)) {
                        wordsCount++;
                        srchTxtElem.dataset.srchWordFound = true;
                    }
                    else {
                        if (wordsCount == 0) {
                            srchTxtElem.dataset.srchWordFound = false;
                        }
                    }
                }

            });

            (wordsCount > 0) ? (srchBodyElem.dataset.srchMatch = true) : (srchBodyElem.dataset.srchMatch = false);

        });
    }


    loadPageData();

    // matchingFields = todoArr.filter((e) => { return e.dataset.srchMatch == "true" });
    // if (matchingFields.length > 0) {
    //     console.log('srchStrArr ', srchStrArr);
    //     srchStrArr = [srchText, ...srchTextArr,];
    //     searchNow()
    // }
}
