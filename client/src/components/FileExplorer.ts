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
    // buttonCallback: (this: HTMLLIElement, noteid: string) => any;


	constructor() {
		super();

        this.workspaceData = new WorkspaceData();

        this.container = document.createElement("div");

        this.deleteNoteButton = document.createElement("button");
        this.deleteNoteButton.id = "delete_note";
        this.deleteNoteButton.textContent = "Delete";
        this.deleteNoteButton.addEventListener("click", (e) => {
            // Don't let the user remove all notes
            if (this.workspaceData.notes.length <= 1) return;

            this.workspaceData.notes.splice(0, 1);
            this.setAttribute("data", JSON.stringify(this.workspaceData));
            localStorage.setItem("workspace", JSON.stringify(this.workspaceData));
            this.noteChange(this.workspaceData.notes[0]);

        });
        this.container.appendChild(this.deleteNoteButton);

        this.newNoteButton = document.createElement("button");
        this.newNoteButton.id = "new_note";
        this.newNoteButton.textContent = "New";
        this.newNoteButton.addEventListener("click", (e) => {
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
        if (name == "data") {
            this.workspaceData = JSON.parse(newValue);
            this.updateFileList();
        }
	}

	static get observedAttributes() {
		return ["data"];
	}

    noteChange(note?: Note) {
        this.dispatchEvent(new CustomEvent<NoteChange>("notechange", {
            detail: {noteid: note.id},
            bubbles: true
        }));
        this.selectedNote = note.id;
    }

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
