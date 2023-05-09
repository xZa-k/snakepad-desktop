import "./main.scss";
// import "./MarkDownEditor"
import "./components/MarkDownEditor";
import "./components/FileExplorer";
import { Note, Workspace } from "./notes";

let workspace: Workspace;
workspace = new Workspace(document.getElementById("main"), document.getElementsByClassName("leftstyle")[0] as HTMLElement);

if (workspace.notes.length < 2)
    workspace.data.notes.push(new Note("You will never find me."));


// if (localStorage.getItem("workspace")) {
//     workspace = JSON.parse(localStorage.getItem("workspace"));
//     let textBox = document.getElementById("textBox") as HTMLTextAreaElement;
//     textBox.value = workspace.notes[0].text;

// } else {
//     console.log("no notes found");
//     workspace = new Workspace();
//     workspace.notes.push(new Note(""));
// }

//     let textBox = document.getElementById("textBox") as HTMLTextAreaElement;


// addEventListener("input", (event) => {
//     let textBox = document.getElementById("textBox") as HTMLTextAreaElement;
//     workspace.notes[0].text = textBox.value;
//     localStorage.setItem("workspace", JSON.stringify(workspace));
// });
