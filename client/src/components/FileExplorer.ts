import { marked } from "marked";
// @ts-ignore
import myStyle from "./MarkDownEditor.css";
import { WorkspaceData } from "../notes";

export class FileExplorer extends HTMLElement {

    workspaceData: WorkspaceData;
    container: HTMLDivElement;
    fileList: HTMLUListElement;


	constructor() {
		super();

        this.workspaceData = new WorkspaceData();

        this.container = document.createElement("div");

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
            console.log(this.workspaceData);
            this.updateFileList();
        }
	}

	static get observedAttributes() {
		return ["data"];
	}

    updateFileList() {
        this.fileList.innerHTML = "";
        for (const note of this.workspaceData.notes) {
            let listElem = document.createElement("li");
            listElem.textContent = note.id.toString();
            this.fileList.appendChild(listElem);
        }
    }
}
customElements.define("file-explorer", FileExplorer);
