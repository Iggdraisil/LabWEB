let storageSize = parseInt(window.localStorage.getItem("last-index-admin"));
getLocalStorage();
var table_row;

function getLocalStorage() {
    if (isNaN(storageSize))
        return;
    for (let i= 0; i <= storageSize; i++) {
        let text = localStorage.getItem("news-text" + i);
        let title = localStorage.getItem("news-title" + i);
        let image = localStorage.getItem("news-image" + i);
        if (text == null)
            continue;
        append_news(text, title, image, i);
    }
}
function append_news(text, title, image, current_index) {
    let table = document.getElementById("table");
    const template =  `<td class="col-lg-4 col-md-6 col-sm-12">
    <img class="table-img" src="${image}" alt="tour picture">
    <a href="" class="text-container news-title">${title}</a>
<p class="text-container">${text}</p></td>`;
    let row = current_index%3;
    if (row == undefined || row === 0) {
        table_row = document.createElement("tr");
        table_row.setAttribute("class", "row");
        table_row.setAttribute("id", Math.floor(current_index/3).toString());
        table_row.innerHTML = template;
        table.appendChild(table_row);
    } else {
        table_row.innerHTML += template;
    }
}