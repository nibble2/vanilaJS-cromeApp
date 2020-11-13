const body = document.querySelector("body");

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function makeRandomNumber() {
    const number = Math.floor(Math.random() * 5);
    return number
}

function init() {
    //랜덤 함수 생성
    const randomNumber = makeRandomNumber()
    //배경화면 변경
    paintImage(randomNumber);
}

init();