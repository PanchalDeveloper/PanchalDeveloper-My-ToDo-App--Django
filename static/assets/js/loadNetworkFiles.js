// Load StyleScheet

const loadFile = async (url, type, rel, extraAttr) => {
    return new Promise((resolve, reject) => {
        const head = document.querySelector('head');
        let linkFile;

        if (type.toLowerCase() == 'style') {
            linkFile = document.createElement('LINK');
            linkFile.rel = rel;
            if (extraAttr.length > 0) {
                linkFile.setAttribute(extraAttr[0], extraAttr[1]);
            }
            linkFile.href = url;
        }
        else if (type.toLowerCase() == 'script') {
            linkFile = document.createElement('SCRIPT');
            linkFile.src = url;
        }
        document.head.append(linkFile);

        linkFile.onload = () => { resolve(`file ('${url}') has been loaded successfully.`) }
        linkFile.onerror = () => { reject(`file ('${url}') can't be loaded.`) }

    });
}

// Add File To Document

const addFile = async (url = '', type = 'style', rel = 'stylesheet', extraAttr = []) => {
    try {
        const addNewFile = await loadFile(url, type, rel, extraAttr);
        console.log(addNewFile);
    } catch (error) {
        // console.log(`File Load Error:\t${error}`)
    }
}



// Loading Style and Script Files
try {
    addFile('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css');
    addFile('https://fonts.googleapis.com', 'style', 'preconnect');
    addFile('https://fonts.gstatic.com', 'style', 'preconnect');
    addFile('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=Fasthand&family=Inter&family=Open+Sans&family=Quicksand&family=Raleway&family=Roboto+Mono&family=Signika+Negative:wght@400;700&family=Source+Sans+Pro&display=swap');
    // addFile('https://cdn.lineicons.com/3.0/lineicons.css');
}
catch {
    // console.log('Files Loading Failed.')
}