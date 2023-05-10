import { marked } from "marked";
// @ts-ignore
import myStyle from "./MarkDownEditor.css";

export class MarkDownEditor extends HTMLElement {
	textarea: HTMLTextAreaElement;
	container: HTMLDivElement;
	output: HTMLDivElement;
	noteTitleHeader: HTMLHeadingElement;
	toggle: boolean;
	buttons: HTMLDivElement;
	posCaretStart: number;
	posCaretEnd: number;
	noteid: string;
	noteTitle: string;

	constructor() {
		super();

		this.toggle = false;
		this.setAttribute("toggle", "false");

		this.addEventListener("notechange", this.notechange);

		this.container = document.createElement("div");
		this.container.id = "container";

		this.noteTitleHeader = document.createElement("h1");
		this.noteTitleHeader.id = "note_title_header";
		this.noteTitleHeader.textContent = this.noteid;
		this.noteTitleHeader.setAttribute("contenteditable", "true");

		this.textarea = document.createElement("textarea");
		this.container.append(this.textarea);

		this.output = document.createElement("div");
		this.output.id = "previewcontent";
		this.container.append(this.output);

		let template = document.querySelector("#buttons_template") as HTMLTemplateElement;
		console.log(template);
		let fragment = template.content.cloneNode(true) as DocumentFragment;
		this.buttons = fragment.querySelector("#button_container") as HTMLDivElement;

		let children = this.buttons.children;
		for (let elem of children) {
			if (elem.tagName == "BUTTON") {
				elem.addEventListener("click", (e) => {
					e.preventDefault();
					this[elem.id]();
				});
			} else if (elem.tagName == "FORM") {
				console.log(elem.firstElementChild);
				elem.firstElementChild.addEventListener("change", (e) => {
					e.preventDefault();
					this[elem.firstElementChild.id](elem.firstElementChild);
				});
			} else if (elem.tagName == "INPUT") {
				elem.addEventListener("input", (e) => {
					this.updateInputSize(elem);
				});
				elem.addEventListener("focusout", (e) => {
					this.setFontSize(elem);
				});
			}
		}
	}

	connectedCallback() {
		const shadow = this.attachShadow({ mode: "open" });

		const style = document.createElement("style");
		console.log(myStyle);
		style.innerHTML = myStyle;

		shadow.append(this.buttons, this.noteTitleHeader, this.container, style);
	}

	attributeChangedCallback(name, oldValue: string, newValue: string) {
		if (name == "toggle" && this.isConnected) {
			this.toggle = !(newValue == "true");
			this.preview();
		} else if (name == "noteid") {
			this.noteid = newValue;
		} else if (name == "title") {
			this.noteTitle = newValue;
			this.noteTitleHeader.textContent = this.noteTitle;
		}
	}

	static get observedAttributes() {
		return ["toggle", "noteid", "title"];
	}

	notechange(e: CustomEvent<NoteChange>) {
		console.log(`The name ${e.detail.noteid}`);
	}

	preview() {
		this.toggle = !this.toggle;
		console.log(`toggle: ${this.toggle}`);
		if (this.toggle) {
			this.output.innerHTML += "Preview Mode";
			// Parse text into markdow
			let rawText = this.textarea.value;
			let markdown = marked.parse(rawText, { breaks: true });
			this.output.innerHTML += markdown;
			this.textarea.readOnly = true;
			this.textarea.style.display = "none";
		} else {
			this.textarea.readOnly = false;
			this.textarea.style.display = "block";
			this.output.innerHTML = null;
		}
	}

	updateCaret() {
		this.posCaretStart = this.textarea.selectionStart;
		this.posCaretEnd = this.textarea.selectionEnd;
	}

	bold() {
		let textContent = this.textarea.value;
		this.updateCaret();

		let startString = textContent.substring(0, this.posCaretStart);
		let endString = textContent.substring(this.posCaretEnd);
		let substring = textContent.substring(this.posCaretStart, this.posCaretEnd);
		this.textarea.value = `${startString}**${substring}**${endString}`;
	}

	italics() {
		let textContent = this.textarea.value;
		this.updateCaret();

		let startString = textContent.substring(0, this.posCaretStart);
		let endString = textContent.substring(this.posCaretEnd);
		let substring = textContent.substring(this.posCaretStart, this.posCaretEnd);
		this.textarea.value = `${startString}*${substring}*${endString}`;
	}

	link() {
		let textContent = this.textarea.value;
		this.updateCaret();

		let startString = textContent.substring(0, this.posCaretStart);
		let endString = textContent.substring(this.posCaretEnd);
		let substring = textContent.substring(this.posCaretStart, this.posCaretEnd);
		this.textarea.value = `${startString}[${substring}](Insert-Link-Here)${endString}`;
	}

	heading(elem) {
		let textContent = this.textarea.value;
		this.updateCaret();
		let id = elem[elem.selectedIndex].id;
		console.log(elem);

		let startString = textContent.substring(0, this.posCaretStart);
		let endString = textContent.substring(this.posCaretEnd);
		let substring = textContent.substring(this.posCaretStart, this.posCaretEnd);
		console.log(id);
		this.textarea.value = `${startString}\n${"#".repeat(id)} ${substring} \n${endString}`;
	}

	unList() {
		let textContent = this.textarea.value;
		this.updateCaret();

		let startString = textContent.substring(0, this.posCaretStart);
		let endString = textContent.substring(this.posCaretEnd);
		let substring = textContent.substring(this.posCaretStart, this.posCaretEnd);

		let lines = substring.split("\n");
		let newLines = [];
		for (let i = 0; i < lines.length; i++) {
			if (i >= 0 && i <= this.posCaretEnd - this.posCaretStart) {
				newLines.push("- " + lines[i]);
			} else {
				newLines.push(lines[i]);
			}
		}
		substring = newLines.join("\n");
		this.textarea.value = `${startString}${substring}${endString}`;
	}

	orList() {
		let textContent = this.textarea.value;
		this.updateCaret();

		let startString = textContent.substring(0, this.posCaretStart);
		let endString = textContent.substring(this.posCaretEnd);
		let substring = textContent.substring(this.posCaretStart, this.posCaretEnd);

		let lines = substring.split("\n");
		let newLines = [];
		for (let i = 0; i < lines.length; i++) {
			if (i >= 0 && i <= this.posCaretEnd - this.posCaretStart) {
				newLines.push(`${i + 1}. ` + lines[i]);
			} else {
				newLines.push(lines[i]);
			}
		}
		substring = newLines.join("\n");
		this.textarea.value = `${startString}${substring}${endString}`;
	}
	setFont(elem) {
		let root = document.documentElement;
		let id = elem[elem.selectedIndex].id;

		console.log(id);
		root.style.setProperty("--font", id);
	}

	setFontSize(elem) {
		let root = document.documentElement;
		console.log(elem);
		const numInput = Number(elem.value);

		root.style.setProperty("--fontSize", numInput + "px");
	}

	updateInputSize(elem) {
		const root = document.documentElement;

		root.style.setProperty("--inputSize", elem.value.length + 1 + "ch");
	}
}
customElements.define("markdown-editor", MarkDownEditor);
