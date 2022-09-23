const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

//-----------timer--------------------------------

// num_min
let num_min = document.querySelector("#num_min");
// num_seg
let num_seg = document.querySelector("#num_seg");

var minutes;
var seconds;

function studyBreak(x){
    minutes = x;
    seconds = 00;

    var interval = setInterval(
        function(){
            var el = document.getElementById("num_min")
            var elseg = document.getElementById("num_seg")
            var taimermins =  document.getElementById("mins_contain")
            var taimerseg =  document.getElementById("seg_contain")
            if(seconds == 0 && minutes ==0){
                clearInterval(interval)
                document.title = "TIEMPO"
                el.innerHTML = "00:"
                elseg.innerHTML = "00"
                taimermins.style.backgroundColor = "#ff6969"
                taimerseg.style.backgroundColor = "#ff6969"
            }
            else if(seconds==0){
                minutes = minutes -1;
                seconds = 59
                el.innerHTML = minutes
                elseg.innerHTML = seconds
                document.title = minutes + ":" + seconds
            }else if(seconds > 0){
                seconds = seconds - 1;
                el.innerHTML = minutes
                elseg.innerHTML =seconds
                document.title = minutes + ":" + seconds
            }
        },
        1000
    )
}
//-----------end timer------------------------------

//----------- buttons color-----------------------
function changeStyle(){
    var element = document.getElementById("colorbuttons");
    element.style.backgroundColor = "#ff6969";
    element.style.color = "#fff";
}
//------------ends of button colors--------------

var dt = new Date();
document.getElementById('date-time').innerHTML=dt.toLocaleDateString();

//show sidebar
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
})

//close sidebar
closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none'
})

//change theme
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})

function changeImageTop(){
    let displayImage = document.getElementById('images')
    if(displayImage.src.match('plenarylogo.png')){
        displayImage.src = 'plenarylogodark.png'
    }else{
        displayImage.src = 'plenarylogo.png'
    }
}

//task list

const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");
let editId,
isEditTask = false,
todos = JSON.parse(localStorage.getItem("todo-list"));
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});
function showTodo(filter) {
    let liTag = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");
function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}
function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}
function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}
clearAll.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
});
taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
        if(!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});

//recordatorio examenes

const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}
    

function createNoteElement(id, content) {
  const element = document.createElement("div");
  element.id = "app";

  element2 = element.appendChild(document.createElement("div"));
  element2.classList.add("note");

  element3 = element2.appendChild(document.createElement("div"));
  element3.classList.add("icon");

  elementspan = element3.appendChild(document.createElement("span"));
  elementspan.classList.add("material-icons");
  elementspan = elementspan.appendChild(document.createTextNode("event"))

  elementinfo = element2.appendChild(document.createElement("div"));
  elementinfo.classList.add("infotext");

  elementdate = elementinfo.appendChild(document.createElement("input"));
  elementdate.classList.add("date-reminder");
  elementdate.type = "date"

  elementema = elementinfo.appendChild(document.createElement("textarea"));
  elementema.classList.add("tema-remind");
  elementema.placeholder = "Tema"
  

  elementmateria = elementinfo.appendChild(document.createElement("textarea"));
  elementmateria.classList.add("remind");
  elementmateria.placeholder = "Materia"


  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this sticky note?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}

