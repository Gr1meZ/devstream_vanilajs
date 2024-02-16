const renderImageToCanvas = async (imageUrl) => {
    await timeout(500);
    const image = new Image();
    image.src = imageUrl;
    image.crossOrigin = "anonymous";

    return new Promise((resolve, reject) => {
        image.onload = () => {
            const canvasObj = createCanvas();

            drawImage(image, canvasObj.canvas, canvasObj.ctx);

            const card = createCard(canvasObj.canvas, imageUrl);
            renderColumn(card);
            resolve();
        };
        image.onerror = () => {
            console.log('failed load image')
            reject();
        };
    })
}

const showImageCollection = async (images) => {
    for (let imageUrl of images) {
        console.log(images)
        await renderImageToCanvas(`${baseApi}${imageUrl.image_url}`);
    }
}

const drawImage = (img, canvas, ctx) => {
    const MAX_WIDTH = 300;
    const MAX_HEIGHT = 300;

    let width = img.width;
    let height = img.height;

    if (width > height && width > MAX_WIDTH) {
        height = height * (MAX_WIDTH / width);
        width = MAX_WIDTH;
    } else if (height > MAX_HEIGHT) {
        width = width * (MAX_HEIGHT / height);
        height = MAX_HEIGHT;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
}

const renderColumn = (card) => {
    const column = document.createElement("div");
    column.classList.add("col", "container-canvas");
    column.appendChild(card);

    const imageContainer = document.getElementById("imagesContainer");
    imageContainer.appendChild(column);
}

const createCard = (canvas, imageUrl) => {
    canvas.classList.add("card-img-top");

    const divBody = document.createElement("div");
    divBody.classList = "card-body";

    const divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.style.width = "18rem";
    divCard.appendChild(canvas);
    divCard.appendChild(divBody);

    fetch(imageUrl).then(function (response) {
        return response.blob();
    }).then(function (myBlob) {
        const downloadLink = document.createElement("a");
        downloadLink.classList.add("btn", "btn-success");

        downloadLink.href = URL.createObjectURL(myBlob);
        downloadLink.download = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        downloadLink.text = "Download";

        divBody.appendChild(downloadLink);
    });

    return divCard;
}

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const createCanvas = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.id = "CursorLayer";
    canvas.style.zIndex = 8;
    canvas.style.position = "static";

    canvas.width = 500;
    canvas.height = 500;

    return {canvas, ctx};
}