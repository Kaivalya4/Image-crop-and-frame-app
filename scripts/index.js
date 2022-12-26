//modal work related elements
let cropperContainer = document.querySelector(".crop-container");
let upload = document.querySelector(".upload");
let done = document.querySelector(".done");
let modalBody = document.querySelector(".modal-body");
let imgform = document.querySelector("#img-form");

let imgpush = document.createElement("img");
let buttonConfirm = document.createElement("button");

let alreadyclicked = false;
let cropper = "";

//frame selection related elements
let finalDone = document.querySelector(".final-done");
let prefinalDisplay = document.querySelector(".pre-final-display");
let preFinalFrame = document.querySelector(".pre-final-frame");
let framesNone = document.querySelector(".frames-none");
let frames = document.querySelectorAll(".frames");

//final display
let finalFrame = document.querySelector(".final-frame");

//-----
let imgurl = "";
let classToAdd = "";

//--------

//modal-working
upload.addEventListener("change", (e) => {
    if (e.target.files.length) {
        if (alreadyclicked === true) {
            console.log(true);
            cropperContainer.removeChild(imgpush);
            modalBody.removeChild(buttonConfirm);
            cropper.destroy();
        }
        alreadyclicked = true;
        imgpush.src = URL.createObjectURL(e.target.files[0]);
        imgpush.style.width = "300px";
        imgpush.style.height = "300px";
        cropperContainer.innerHTML = "";
        cropperContainer.appendChild(imgpush);

        buttonConfirm.style.left = "10px";
        buttonConfirm.style.top = "10px";
        buttonConfirm.style.zIndex = 9999;
        buttonConfirm.style.marginTop = "2rem";
        buttonConfirm.textContent = "Confirm";
        buttonConfirm.classList.add("btn");
        buttonConfirm.classList.add("btn-primary");
        buttonConfirm.classList.add("button-confirm");
        modalBody.appendChild(buttonConfirm);

        cropper = new Cropper(imgpush, { aspectRatio: 1 });

        buttonConfirm.addEventListener("click", (event) => {
            let canvas = cropper.getCroppedCanvas({
                width: 256,
                height: 256,
            });

            canvas.toBlob(function (blob) {
                console.log(URL.createObjectURL(blob));
                imgurl = URL.createObjectURL(blob);
            });

            cropperContainer.removeChild(imgpush);
            modalBody.removeChild(buttonConfirm);
            cropperContainer.innerHTML = "Click on upload to proceed !";
            alreadyclicked = false;
            cropper.destroy();
        });
    }
});

//frame-related
done.addEventListener("click", (event) => {
    if (imgurl.length) {
        prefinalDisplay.style.display = "block";
        let prefinalimg = document.querySelector(".pre-final-img");
        prefinalimg.innerHTML = "";
        prefinalimg.src = imgurl;
        imgform.reset();
    }
});

framesNone.addEventListener("click", (event) => {
    preFinalFrame.className = "pre-final-frame";
    classToAdd = "";
});

for (let frame of frames) {
    console.log(frame);
    frame.addEventListener("click", (e) => {
        let idname = e.srcElement.id;

        switch (idname) {
            case "heart":
                preFinalFrame.className = "heart";
                // finalDisplay.className = "heart";
                classToAdd = "heart";
                break;

            case "square":
                preFinalFrame.className = "square";
                // finalDisplay.className = "square";
                classToAdd = "square";
                break;

            case "circle":
                preFinalFrame.className = "circle";
                // finalDisplay.className = "circle";
                classToAdd = "circle";
                break;

            case "rect":
                preFinalFrame.className = "rectangle";
                // finalDisplay.className = "rectangle";
                classToAdd = "rectangle";
                break;
        }
    });
}

//final display
finalDone.addEventListener("click", (event) => {
    if (imgurl.length) {
        prefinalDisplay.style.display = "none";
        finalFrame.innerHTML = "";
        let imgtoshow = document.createElement("img");
        imgtoshow.src = imgurl;
        finalFrame.appendChild(imgtoshow);
        finalFrame.className = classToAdd;
    }
});
