

interface NoteChange {
    noteid: string;
}


interface NoteData {
    id: string;
    title: string;
    text: string;
}

interface User {
    id: number,
    username: string,
    noteData: NoteData[]
}