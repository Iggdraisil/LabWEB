document.getElementById("title").addEventListener("change", onchange);
document.getElementById("body").addEventListener("change", onchange);
let input = document.getElementById("button-add-image");
let image = document.getElementById("image-to-post");
const source = image.src;
let image_changed = false;

input.addEventListener("change", function() {
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

    if (body.length< 30) {
        correct = false;
        document.getElementById("body").style.color = "red"
    }

    if (title.length < 10) {
        correct = false;
        document.getElementById("title").style.color = "red"
    }

    if (image_changed) {
        if (correct ) {
            alert("Новина завантажена успішно!");
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

function onchange() {
    let title = document.getElementById("title").value;
    let body = document.getElementById("body").value;

    if (body.length> 30)
        document.getElementById("body").style.color = "black";
    if (title.length> 10)
        document.getElementById("title").style.color = "black";
}