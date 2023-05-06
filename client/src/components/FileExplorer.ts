// @ts-ignore
import myStyle from "./FileExplorer.css";
import { WorkspaceData } from "../notes";

export class FileExplorer extends HTMLElement {

    workspaceData: WorkspaceData;
    container: HTMLDivElement;
    fileList: HTMLUListElement;
    // buttonCallback: (this: HTMLLIElement, noteid: string) => any;


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
            listElem.textContent = note.id;
            listElem.addEventListener("click", (e: MouseEvent) => {
                this.dispatchEvent(new CustomEvent<NoteChange>("notechange", {
                    detail: {noteid: note.id},
                    bubbles: true
                }));
            });

            this.fileList.appendChild(listElem);
        }
    }
}
customElements.define("file-explorer", FileExplorer);
