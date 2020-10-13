const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = []

function deleteToDo(event) {
    //console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    console.log(li.id);
    toDoList.removeChild(li)

    const cleanToDos = toDos.filter(function (toDo) {
        //console.log(toDo.id, parseInt(li.id));
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);
    li.id = newId;
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}


function loadToDos() {
    const lodedToDos = localStorage.getItem(TODOS_LS);
    if (lodedToDos !== null) {
        const parsedToDos = JSON.parse(lodedToDos);
        parsedToDos.forEach(function (toDo) {
            //console.log(toDo.text);
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();