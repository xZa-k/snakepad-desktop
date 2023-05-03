

export class Note {
    public text: string;

    constructor (text: string) {
        this.text = text;
    }
}

export class Workspace {
    public notes: Note[];

    constructor () {
        this.notes = [];
    }

}


