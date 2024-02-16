async function renderImageToCanvas(imageUrl) {
    await timeout(500);
    const image = new Image();
    image.src = imageUrl;
    image.crossOrigin = "anonymous";
    image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.id = "CursorLayer";
        canvas.style.zIndex = 8;
        canvas.style.position = "static";

        canvas.width = 500;
        canvas.height = 500;

        drawImage(image, canvas, ctx);
        const card = createCard(canvas, imageUrl);
        createColumn(card);
    };

    image.onerror = () => {
        console.log('failed load image')
    };
}

async function showImageCollection(images) {
    for (let imageUrl of images) {
        console.log(images)
        await renderImageToCanvas(`${baseApi}${imageUrl.image_url}`);
    }
}

function drawImage(img, canvas, ctx){
    var MAX_WIDTH = 300;
    var MAX_HEIGHT = 300;

    var width = img.width;
    var height = img.height;

    if (width > height) {
        if (width > MAX_WIDTH) {
            height = height * (MAX_WIDTH / width);
            width = MAX_WIDTH;
        }
    } else {
        if (height > MAX_HEIGHT) {
            width = width * (MAX_HEIGHT / height);
            height = MAX_HEIGHT;
        }
    }
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
}

function createColumn(card){
    const column = document.createElement("div");
    column.classList.add("col", "container-canvas");
    const imageContainer = document.getElementById("imagesContainer");
    column.appendChild(card);
    imageContainer.appendChild(column);
}
function createCard(canvas, imageUrl){
    canvas.classList.add("card-img-top");
    var divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.style.width = "18rem";
    divCard.appendChild(canvas);
    var divBody = document.createElement("div");
    divBody.classList = "card-body";
    divCard.appendChild(divBody);

    var downloadLink = document.createElement("a");
    downloadLink.classList.add("btn", "btn-success");

    fetch(imageUrl).then(function(response) {
        return response.blob();
    }).then(function(myBlob) {
        var objectURL = URL.createObjectURL(myBlob);
        downloadLink.href = objectURL;
        downloadLink.download = imageUrl.substring(imageUrl.lastIndexOf('/')+1);
        downloadLink.text = "Download";
        divBody.appendChild(downloadLink);
    });

    return divCard;
}

function download(text, name, type) {
    var a = document.getElementById("a");

}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}