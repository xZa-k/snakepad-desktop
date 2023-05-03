import "./main.scss";
import SimpleMDE from "simplemde/dist/simplemde.min";
import "../node_modules/simplemde/dist/simplemde.min.css";
// import "./MarkDownEditor"
import "./components/MarkDownEditor";
import { Note, Workspace } from "notes";

let workspace: Workspace;

if (localStorage.getItem("workspace")) {
    workspace = JSON.parse(localStorage.getItem("workspace"));
    let textBox = document.getElementById("textBox") as HTMLTextAreaElement;
    textBox.value = workspace.notes[0].text;
    
} else {
    console.log("no notes found");
    workspace = new Workspace();
    workspace.notes.push(new Note(""));
}

    let textBox = document.getElementById("textBox") as HTMLTextAreaElement;


addEventListener("input", (event) => {
    let textBox = document.getElementById("textBox") as HTMLTextAreaElement;
    workspace.notes[0].text = textBox.value;
    localStorage.setItem("workspace", JSON.stringify(workspace));
});
