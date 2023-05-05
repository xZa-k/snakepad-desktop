import { FileExplorer } from "./components/FileExplorer";
import { MarkDownEditor } from "./components/MarkDownEditor";


export class Note {
    public text: string;
    public id: string;

    constructor (text: string) {
        this.text = text;
        this.id = Math.floor(Math.random() * 100000).toString();
    }
}


export class WorkspaceData {
    public notes: Note[];

    constructor(){
        this.notes = [];
    }
}

export class Workspace{
    public textEditor: MarkDownEditor;
    public data: WorkspaceData;
    public fileExplorer: FileExplorer;
    public _selectedNote: string;


    constructor (parent: HTMLElement) {

        this.data = new WorkspaceData();
        this.notes = [new Note("")];


        this.textEditor = new MarkDownEditor();
        this.textEditor.setAttribute("noteid", this._selectedNote);
        this.textEditor.addEventListener("input", (e) => this.inputHandler(e, this));

        // Will overwrite data.notes if stuff is saved, else keep the empty note
        this.loadWorkspace();
        this.selectedNote = this.notes[0].id;


        this.fileExplorer = new FileExplorer();
        this.fileExplorer.setAttribute("data", JSON.stringify(this.data));
        this.fileExplorer.addEventListener("notechange", (e: CustomEvent<NoteChange>) => this.loadNoteCallback(e, this));

        parent.appendChild(this.fileExplorer);
        parent.appendChild(this.textEditor);
    }

    loadNoteCallback(e: CustomEvent<NoteChange>, workspace: Workspace) {
        let noteid = e.detail.noteid;
        for (const note of workspace.notes) {
            if (note.id == noteid) {
                workspace.selectedNote = noteid;
                workspace.textEditor.textarea.value = note.text;
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
        this._selectedNote = value;
    }

}


