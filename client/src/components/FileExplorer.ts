// @ts-ignore
import myStyle from "./FileExplorer.css";
import { Note, WorkspaceData } from "../notes";

export class FileExplorer extends HTMLElement {

    workspaceData: WorkspaceData;
    selectedNote: string;

    container: HTMLDivElement;
    fileList: HTMLUListElement;
    deleteNoteButton: HTMLButtonElement;
    newNoteButton: HTMLButtonElement;


	constructor() {
		super();

        this.workspaceData = new WorkspaceData();

        // Dynamically create elements

        this.container = document.createElement("div");

        this.deleteNoteButton = document.createElement("button");
        this.deleteNoteButton.id = "delete_note";
        this.deleteNoteButton.textContent = "Delete";
        this.deleteNoteButton.addEventListener("click", (e) => {
            // Don't let the user remove all notes
            if (this.workspaceData.notes.length <= 1) return;
            
            for (let i = 0; i < this.workspaceData.notes.length; i++) {
                const note = this.workspaceData.notes[i];
                
                // On deleted note, go back to the first note
                if (note.id == this.selectedNote) {
                    this.workspaceData.notes.splice(i, 1);
                    this.setAttribute("data", JSON.stringify(this.workspaceData));
                    localStorage.setItem("workspace", JSON.stringify(this.workspaceData));
                    this.noteChange(this.workspaceData.notes[0]);
                    break;
                }
            }
        });
        this.container.appendChild(this.deleteNoteButton);

        this.newNoteButton = document.createElement("button");
        this.newNoteButton.id = "new_note";
        this.newNoteButton.textContent = "New";
        this.newNoteButton.addEventListener("click", (e) => {
            // Creates a blank new note and appends it to the note list
            let newNote = new Note("");
            this.workspaceData.notes.push(newNote);
            this.setAttribute("data", JSON.stringify(this.workspaceData));
            localStorage.setItem("workspace", JSON.stringify(this.workspaceData));
            this.noteChange(newNote);
        });
        this.container.appendChild(this.newNoteButton);


        this.fileList = document.createElement("ul");
        this.container.appendChild(this.fileList);
	}

	connectedCallback() {
		const shadow = this.attachShadow({ mode: "open" });

		const style = document.createElement("style");
		style.innerHTML = myStyle;

		shadow.append(this.container, style);
	}

	attributeChangedCallback(name, oldValue: string, newValue: string) {
        // Update data when attribute is changed
        if (name == "data") {
            this.workspaceData = JSON.parse(newValue);
            this.updateFileList();
        }
	}

	static get observedAttributes() {
		return ["data"];
	}

    // Send an event that the selected note has changed, for other components to use
    noteChange(note?: Note) {
        this.dispatchEvent(new CustomEvent<NoteChange>("notechange", {
            detail: {noteid: note.id},
            bubbles: true
        }));
        this.selectedNote = note.id;
    }

    // Creates list elements based on the workspace data
    updateFileList() {
        this.fileList.innerHTML = "";
        for (const note of this.workspaceData.notes) {
            let listElem = document.createElement("li");
            listElem.textContent = note.title;
            listElem.addEventListener("click", (e: MouseEvent) => {
                this.noteChange(note);
                console.log("updating...");
            });

            this.fileList.appendChild(listElem);
        }
    }
}
customElements.define("file-explorer", FileExplorer);
