let use_localstorage = false;

document.getElementById("appeal-body").addEventListener("change", function () {
    let appeal_text = document.getElementById("appeal-body").value;
    if (appeal_text.length > 10)
        document.getElementById("appeal-body").style.color = "black";
});
localStorage = window.localStorage;

if (use_localstorage)
    getLocalStorage();
else
    openDataBase(null, "appeals", function (appeal) {
        apennd_appeals(appeal.text, appeal.time, appeal.date)
    });

function submit() {
    let appeal_text = document.getElementById("appeal-body").value;
    if (appeal_text.length < 10) {
        document.getElementById("appeal-body").style.color = "red";
        alert("Неформат! Відгук надто короткий.");
    } else {
        let date = new Date();
        var appeal_time;
        if (date.getMinutes() < 10) {
            appeal_time = date.getHours() + ": 0" + date.getMinutes();
        } else {
            appeal_time = date.getHours() + ":" + date.getMinutes();
        }
        let appeal_date = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
        submit_to_backend(appeal_text, appeal_time, appeal_date);
        document.getElementById("appeal-body").value = "";
        alert("Відгук завантажено успішно!");
    }
}

function apennd_appeals(text, time, date) {
    let list = document.getElementById("list");
    let new_appeal = document.createElement("li");
    new_appeal.setAttribute("class", "list-group-item");
    list.appendChild(new_appeal).innerHTML = `
        <article class="fan-name">Amadzhad Kuli <br/>${time}<br/>${date}</article>
        <article class="appeal-body">${text}</article>`;
}

function submit_to_backend(text, time, date) {

    if (window.navigator.onLine) {

    } else {
        if (use_localstorage) {
            let lastIndex = parseInt(localStorage.getItem("lastIndex"));
            if (isNaN(lastIndex)) {
                lastIndex = -1;
            }
            let current_index = lastIndex + 1;
            localStorage.setItem("appeal-text" + current_index, text);
            localStorage.setItem("appeal-time" + current_index, time);
            localStorage.setItem("appeal-date" + current_index, date);
            localStorage.setItem("lastIndex", current_index)
        } else {
            openDataBase({
                text: text,
                time: time,
                date: date
            }, "appeals", null)
        }
    }
}

function getLocalStorage() {
    let storageSize = parseInt(window.localStorage.getItem("lastIndex"));
    if (isNaN(storageSize))
        return;

    for (let i = 0; i <= storageSize; i++) {
        let appeal_text = localStorage.getItem("appeal-text" + i);
        let appeal_time = localStorage.getItem("appeal-time" + i);
        let appeal_date = localStorage.getItem("appeal-date" + i);
        if (appeal_text == null) {
            continue
        }
        apennd_appeals(appeal_text, appeal_time, appeal_date);
    }
}



