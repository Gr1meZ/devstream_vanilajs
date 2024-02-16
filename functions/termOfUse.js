async function acceptTermsOfUse(termsOfUse) {
    var myModal = new bootstrap.Modal(document.getElementById("modal"), {});

    let modalContentDiv = document.createElement("div");

    termsOfUse.paragraphs.sort((a, b) => a.index - b.index);

    for (let paragraph of termsOfUse.paragraphs) {
        let title = document.createElement("h3");
        title.innerText = paragraph.title;

        let content = document.createElement("p");
        content.innerText = paragraph.content;


        modalContentDiv.appendChild(title);
        modalContentDiv.appendChild(content);
    }
    var checkbox = document.getElementById("agreeCheckBox");
    var acceptBtn = document.getElementById("acceptBtn");
    var clsBtn = document.getElementById("clsBtn");

    checkbox.addEventListener("change", (event) => {
        acceptBtn.disabled = !event.currentTarget.checked;
    });

    var modalBody = document.getElementById("modalBody");
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

