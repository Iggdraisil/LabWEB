document.getElementById("title").addEventListener("change", onchange);
document.getElementById("body").addEventListener("change", onchange);
let input = document.getElementById("button-add-image");
let image = document.getElementById("image-to-post");
const source = image.src;
let image_changed = false;
const use_local_storage = false;
let database_opened = false;

input.addEventListener("change", function () {
    image.src = URL.createObjectURL(input.files[0]);
    console.log(image);
    if (image.src != source) {
        image_changed = true
    }
});


function submit() {
    let correct = true;
    let title = document.getElementById("title").value;
    let body = document.getElementById("body").value;

    if (body.length < 30) {
        correct = false;
        document.getElementById("body").style.color = "red"
    }

    if (title.length < 10) {
        correct = false;
        document.getElementById("title").style.color = "red"
    }

    if (image_changed) {
        if (correct) {
            alert("Новина завантажена успішно!");
            submit_to_backend(body, title);
            document.getElementById("title").value = "";
            document.getElementById("body").value = "";
            image.src = source;
            input.value = null

        } else {
            alert("Неформат! Назва чи текст новини надто короткий.")
        }
    } else {
        alert("Please choose image")
    }
}

function submit_to_backend(body, title) {
    let image_link = getBase64Image(image);
    let news_to_post = {
        title: title,
        body: body,
        image: image_link
    };
    if (window.navigator.onLine) {
    } else {
        if (use_local_storage) {
            let last_index = parseInt(localStorage.getItem("last-index-admin"));
            if (isNaN(last_index)) {
                last_index = -1;
            }
            let current_index = last_index + 1;
            localStorage.setItem("news-text" + current_index, body);
            localStorage.setItem("news-title" + current_index, title);
            localStorage.setItem("news-image" + current_index, image_link);
            localStorage.setItem("last-index-admin", current_index)
        } else {
            openDataBase(news_to_post, "news")
        }
    }
}


function onchange() {
    let title = document.getElementById("title").value;
    let body = document.getElementById("body").value;

    if (body.length > 30)
        document.getElementById("body").style.color = "black";
    if (title.length > 10)
        document.getElementById("title").style.color = "black";
}

function getBase64Image(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    return canvas.toDataURL("image/png");
}