import "./main.scss"
import SimpleMDE from "simplemde/dist/simplemde.min"
import "../node_modules/simplemde/dist/simplemde.min.css"
import "./MarkDownEditor"
import { getText } from "./MarkDownEditor"
import "./notes";
import { Note, Workspace } from "./notes"

let workspace: Workspace;

if (localStorage.getItem("workspace")) {
    workspace = JSON.parse(localStorage.getItem("workspace"))
} else {
    workspace = new Workspace();
    workspace.notes.push(new Note(""));
}


setInterval(() => {
    let textBox = document.getElementById("textBox") as HTMLTextAreaElement;
    workspace.notes[0].text = textBox.value;
    localStorage.setItem("workspace", JSON.stringify(workspace));
}, 1000);
