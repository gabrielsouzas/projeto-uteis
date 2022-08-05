let ShowNoteBtn = document.querySelector('.add-note-btn');
let EditNoteContainer = document.querySelector('.edit-note');
let note_title_input = document.querySelector('.note-title-input');
let note_desc_input = document.querySelector('.note-body-input');
let noteBox = document.querySelector('.note-box');
let closeIcon = document.querySelector('.fa-arrow-left');

let months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

// Pega as anotações salvas no Local Storage do navegador
const allNotes = JSON.parse(localStorage.getItem("allNotes") || "[]");
let isUpdate = false, updateId;

note_title_input.addEventListener('keyup', function (e) {
    this.style.height = '45px';
    let height = e.target.scrollHeight;
    note_title_input.style.height = `${height}px`;
});

closeIcon.addEventListener('click', () => {
    EditNoteContainer.style.left = '-100%';
});

ShowNoteBtn.addEventListener('click', () => {
    EditNoteContainer.style.left = '50%';
    note_title_input.value = '';
    note_desc_input.value = '';
});

// Mostra as anotações na tela, se existirem
function showNotes() {
    let NoteAdd = '';
    document.querySelectorAll('.note').forEach(note => note.remove());
    allNotes.forEach((note, index) => {
        let filtDesc = note.description.replaceAll("\n", '<br/>');
        NoteAdd += `<div class="note">
                        <h3 class="note-title">${note.title}</h3>
                        <p class="note-body">${note.description}</p>
                        <hr>
                        <p class="date">${note.date}</p>
                        <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                        <div class="settings">
                            <div class="menu">
                                <span class="edit-btn" onclick="editNote(${index}, '${note.title}', '${filtDesc}')"><i class="fa-solid fa-pen"></i> Editar</span>
                                <span class="delete-btn" onclick="deleteNote(${index})"><i class="fa-solid fa-trash-can"></i> Deletar</span>
                            </div>
                        </div>
                    </div>`;
    });
    noteBox.innerHTML = NoteAdd || `<span class="fa-solid fa-note-sticky"></i></span>
                                    <span class="no-notes-message">Ainda não existem Anotações</span>`;
}

// Chamada do médoto para mostrar as anotações na tela
showNotes();

// Função para deletar a anotação
function deleteNote(Noteid) {
    allNotes.splice(Noteid, 1); // Deleta a anotação do array
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
    showNotes();
}

// Função para editar a anotação
function editNote(Noteid, title, filtDesc) {
    let desc = filtDesc.replaceAll('<br/>', '\r\n');
    updateId = Noteid;
    isUpdate = true;
    ShowNoteBtn.click();
    note_title_input.value = title;
    note_desc_input.value = desc;
};

// Clique
closeIcon.addEventListener('click', e => {
    e.preventDefault();
    let noteTitle = note_title_input.value;
    let noteDesc = note_desc_input.value;

    if (noteTitle || noteDesc) {
        let date = new Date(),
        month = months[date.getMonth()],
        day = date.getDate(),
        year = date.getFullYear();

        // Todas as informações das anotações
        let noteInfo = {
            title:noteTitle,
            description:noteDesc,
            date: `${month} ${day}, ${year}`
        }
        if (!isUpdate) {
            allNotes.push(noteInfo);
        } else {
            isUpdate = false;
            allNotes[updateId] = noteInfo;
        }

        // Salvando no Local Storage
        localStorage.setItem("allNotes", JSON.stringify(allNotes));
        showNotes();
    }
});