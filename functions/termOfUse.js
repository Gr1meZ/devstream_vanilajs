async function acceptTermsOfUse(termsOfUse) {
    const myModal = new bootstrap.Modal(document.getElementById("modal"), {});

    const modalContentDiv = document.createElement("div");

    termsOfUse.paragraphs.sort((a, b) => a.index - b.index);

    for (let paragraph of termsOfUse.paragraphs) {
        let title = document.createElement("h3");
        title.innerText = paragraph.title;

        let content = document.createElement("p");
        content.innerText = paragraph.content;


        modalContentDiv.appendChild(title);
        modalContentDiv.appendChild(content);
    }

    const checkbox = document.getElementById("agreeCheckBox");
    const acceptBtn = document.getElementById("acceptBtn");
    const clsBtn = document.getElementById("clsBtn");

    checkbox.addEventListener("change", (event) => {
        acceptBtn.disabled = !event.currentTarget.checked;
    });

    const modalBody = document.getElementById("modalBody");
    modalBody.appendChild(modalContentDiv);
    myModal.show();

    return new Promise((resolve, reject) => {
        acceptBtn.addEventListener("click", function () {
            resolve();
            myModal.hide();

        });
        clsBtn.addEventListener("click", function () {
            reject();
        });
    });

}

