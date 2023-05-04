import { MarkDownEditor } from "./components/MarkDownEditor";


export class Note {
    public text: string;

    constructor (text: string) {
        this.text = text;
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


    constructor (parent: HTMLElement) {

        this.data = new WorkspaceData();

        this.textEditor = new MarkDownEditor();
        this.textEditor.addEventListener("input", (e) => this.inputHandler(e, this));

        this.data.notes = [new Note("")];

        // Will overwrite data.notes if stuff is saved, else keep the empty note
        this.loadWorkspace();

        parent.appendChild(this.textEditor);        
    }

    inputHandler(e: Event, workspace: Workspace) {
        e.preventDefault();
        workspace.notes[0].text = workspace.textEditor.textarea.value;
        localStorage.setItem("workspace", JSON.stringify(workspace.data));
    }

    loadWorkspace() {
        const workspaceString = localStorage.getItem("workspace");
        if (workspaceString) {
            let workspaceData = JSON.parse(workspaceString) as WorkspaceData;
            this.data = workspaceData;
            this.textEditor.textarea.value = this.data.notes[0].text;
        }
    }

    get notes() {
        return this.data.notes;
    }

    set notes(value) {
        this.data.notes = value;
    }

}


