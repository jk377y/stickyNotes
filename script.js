// start by declaring the needed elements from the html file
const startTitleInput = document.getElementById('startTitle');
const startTextInput = document.getElementById('startText');
const addNoteBtn = document.querySelector('.addNoteBtn');
const container = document.querySelector('.container');

// when the page loads i want to load any existing notes from local storage and display them on the page
window.addEventListener('load', () => {
	// "getting" any notes stored in local storage and mapping the notes to the container using the createNoteElement function
	const notes = JSON.parse(localStorage.getItem('notes')) || [];
	notes.map((noteData) => {
		const note = createNoteElement(noteData.title, noteData.text); // this function returns the note element
		container.appendChild(note); // adds the note to the container
	});
});

addNoteBtn.addEventListener('click', () => {
	// need to get the values of the input fields
	const title = startTitleInput.value;
	const text = startTextInput.value;
	if (title || text) {
		// if either of the fields are filled out it allows the note to be created
		const note = createNoteElement(title, text);
		container.appendChild(note); // adds the new note to the container
		saveNoteToLocalStorage(title, text); // uses the saveNoteToLocalStorage function to save the note to local storage
		startTitleInput.value = ''; // resets the input fields to blank after the note is created
		startTextInput.value = '';
	}
});

// this function creates the note element
const createNoteElement = (title, text) => {
	// creates the div with a class of note and adds the title and text to it from the input fields declared above using template literals
	const note = document.createElement('div');
	note.classList.add('note');
	note.innerHTML = `<h2>${title}</h2><p>${text}</p>`;
	// creates the delete button and adds a class to it for styling purposes and adds text to it
	const deleteNoteBtn = document.createElement('button');
	deleteNoteBtn.classList.add('deleteNoteBtn');
	deleteNoteBtn.textContent = 'Delete Note';
	// adds an event listener to the delete button that removes the note from the container and local storage
	deleteNoteBtn.addEventListener('click', () => {
		container.removeChild(note);
		removeNoteFromLocalStorage(title, text);
	});
	note.appendChild(deleteNoteBtn);
	return note;
};

const saveNoteToLocalStorage = (title, text) => {
	const notes = JSON.parse(localStorage.getItem('notes')) || []; // gets any notes from local storage
	notes.push({ title, text }); // pushes the new note to the notes array
	localStorage.setItem('notes', JSON.stringify(notes)); // stores the newly updated notes array to local storage
};

const removeNoteFromLocalStorage = (title, text) => {
	const notes = JSON.parse(localStorage.getItem('notes')) || []; // gets any notes from local storage
	const updatedNotes = notes.filter((note) => note.title !== title || note.text !== text); // gets all notes that do not match the note that was deleted
	localStorage.setItem('notes', JSON.stringify(updatedNotes)); // stores the newly updated notes array to local storage
};
