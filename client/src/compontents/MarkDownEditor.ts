import { marked } from "marked";
// @ts-ignore
import myStyle from "./MarkDownEditor.css";



export class MarkDownEditor extends HTMLElement {
  textarea: HTMLTextAreaElement;
  container: HTMLDivElement;
  output: HTMLDivElement;
  toggle: boolean;
  buttons: DocumentFragment;
  

  constructor() {
    super();
    this.toggle = false;

    this.container = document.createElement("div");
    this.container.id = "container";

    this.textarea = document.createElement("textarea");
    this.container.append(this.textarea);

    this.output = document.createElement("div");
    this.output.id = "preview";
    this.container.append(this.output);

    let template = document.querySelector("#buttons_template") as HTMLTemplateElement;
    console.log(template);
    this.buttons = template.content.cloneNode(true) as DocumentFragment;

    let children = this.buttons.children;

    for (let button of children) {
      button.addEventListener("click", () => this.preview());
    }
    
  }

  connectedCallback() {
    const shadow = this.attachShadow({ "mode": "open" });

    const style = document.createElement("style");
    console.log(myStyle);
    style.innerHTML = myStyle;

    shadow.append(this.container, this.buttons, style);
  }

  attributeChangedCallback(name, oldValue: string, newValue: string) {
    if (name == "toggle") {
      console.log("AYO");
      this.toggle = !(newValue == "true");
      this.preview();
    }
  }

  static get observedAttributes() {
    return ["toggle"];
  }

  preview() {
    this.toggle = !this.toggle;
    console.log(`toggle: ${this.toggle}`);
    if (this.toggle) {
      // Parse text into markdow
      let rawText = this.textarea.value;
      let markdown = marked.parse(rawText);

      this.output.innerHTML = markdown;
      this.textarea.style.display = "none";
    } else {
      this.textarea.style.display = "block";
      this.output.innerHTML = null;
    }
  }
}

customElements.define("markdown-editor", MarkDownEditor);
