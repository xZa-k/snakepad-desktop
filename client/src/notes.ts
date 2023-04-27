

export class Note {
    public text: String;

    constructor (text: String) {
        this.text = text;
    }
}

export class Workspace {
    public notes: Note[];

    constructor () {
        this.notes = [];
    }

}


