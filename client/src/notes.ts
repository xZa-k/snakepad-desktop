import { FileExplorer } from "./components/FileExplorer";
import { MarkDownEditor } from "./components/MarkDownEditor";


export class Note {
    public text: string;
    public id: string;
    public title: string;

    constructor (text: string) {
        this.text = text;
        this.id = Math.floor(Math.random() * 100000).toString();
        this.title = this.id;
    }
}


export class WorkspaceData {
    public notes: Note[];

    constructor(){
        this.notes = [];
    }
}

export async function getUserByUsername(username: string): Promise<User> {
    let resp = await fetch(`/api/getUserByName/${username}`, {
        method: "GET",
    });
    let user: User = await resp.json();
    return user;
}

export async function updateUserByUsername(username: string, userData: NoteData[]) {
    let resp = await fetch(`/api/updateUserByName/${username}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
    console.log(resp);
}

export class Workspace{
    public textEditor: MarkDownEditor;
    public data: WorkspaceData;
    public fileExplorer: FileExplorer;
    public _selectedNote: string;


    constructor (parent: HTMLElement) {

        this.data = new WorkspaceData();
        this.notes = [new Note("")];

        getUserByUsername("Z_akk_").then((user) => {
            console.log(user);
            // updateUserByUsername("Z_akk_", this.notes);
        })


        this.textEditor = new MarkDownEditor();

        // console.log(this.selectedNote);
        // this.textEditor.setAttribute("noteid", this.selectedNote);
        // this.textEditor.setAttribute("title", this)
        


        this.textEditor.addEventListener("input", (e) => this.inputHandler(e, this));
        this.textEditor.noteTitleHeader.addEventListener("focusout", (e) => {
            let newTitle = this.textEditor.noteTitleHeader.textContent;
            this.textEditor.setAttribute("title", newTitle);
            this.getNoteById(this.selectedNote).title = newTitle;
        });

        // Will overwrite data.notes if stuff is saved, else keep the empty note
        this.loadWorkspace();
        this.selectedNote = this.notes[0].id;

        this.textEditor.setAttribute("title", this.getNoteById(this.selectedNote).title);


        this.fileExplorer = new FileExplorer();
        this.fileExplorer.setAttribute("data", JSON.stringify(this.data));
        this.fileExplorer.addEventListener("notechange", (e: CustomEvent<NoteChange>) => this.saveNoteCallback(e, this));
        
        setInterval(() => {

        }, 30000) // 30 seconds

        parent.appendChild(this.fileExplorer);
        parent.appendChild(this.textEditor);
    }

    saveNoteCallback(e: CustomEvent<NoteChange>, workspace: Workspace) {
        let noteid = e.detail.noteid;
        for (const note of workspace.notes) {
            if (note.id == noteid) {
                workspace.selectedNote = noteid;
                workspace.textEditor.textarea.value = note.text;
                // workspace.textEditor.noteTitle.textContent = note.title;
            }
        }
    }

    inputHandler(e: Event, workspace: Workspace) {
        e.preventDefault();

        let note = this.getNoteById(workspace.selectedNote);

        note.text = workspace.textEditor.textarea.value;
        localStorage.setItem("workspace", JSON.stringify(workspace.data));
        this.fileExplorer.setAttribute("data", JSON.stringify(this.data));
    }

    loadWorkspace() {
        const workspaceString = localStorage.getItem("workspace");
        if (workspaceString) {
            let workspaceData = JSON.parse(workspaceString) as WorkspaceData;
            this.data = workspaceData;
            this.textEditor.textarea.value = this.data.notes[0].text;
        }
    }

    getNoteById(noteid: string): Note {
        for (const note of this.notes) {
            if (note.id == noteid) {
                return note;
            }
        }
    }

    get notes() {
        return this.data.notes;
    }

    set notes(value) {
        this.data.notes = value;
    }

    get selectedNote() {
        return this._selectedNote;
    }

    set selectedNote(value) {
        this.textEditor.setAttribute("noteid", value);
        this.textEditor.setAttribute("title", this.getNoteById(value).title);
        this._selectedNote = value;
    }

}


