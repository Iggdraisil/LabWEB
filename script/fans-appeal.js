document.getElementById("appeal-body").addEventListener("change", function() {
    let appeal_text = document.getElementById("appeal-body").value;
    if (appeal_text.length> 10)
        document.getElementById("appeal-body").style.color = "black";
});

function submit() {
    let appeal_text = document.getElementById("appeal-body").value;
    let list = document.getElementById("list");

    if (appeal_text.length< 10) {
        document.getElementById("appeal-body").style.color = "red";
        alert("Неформат! Відгук надто короткий.");
    } else {
        let new_appeal = document.createElement("li");
        new_appeal.setAttribute("class", "list-group-item");
        let user = document.createElement("article");
        user.setAttribute("class", "fan-name");
        let date = new Date();
        let user_text = "Amazhad Kuli " + "\n" + date.getHours() + ":" + date.getMinutes() + "\n" +date.getDay()
                + "." + date.getMonth() + "." + date.getFullYear();
        user.appendChild(document.createTextNode(user_text));
        new_appeal.appendChild(user);
        let appeal_body =  document.createElement("article");
        appeal_body.setAttribute("class", "appeal-body");
        appeal_body.appendChild(document.createTextNode(appeal_text));
        new_appeal.appendChild(appeal_body);
        let a = list.appendChild(new_appeal);
        document.getElementById("appeal-body").value = "";
        alert("Відгук завантажено успішно!");
    }
}