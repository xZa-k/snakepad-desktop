const { marked } = require("marked");

let toggle = false;
let posCaretStart = 0;
let posCaretEnd = 0;
let result = document.getElementById("result");
let textBox = document.getElementById("textBox");
let editor = document.getElementById("editor");
let myList = document.getElementById("myList");

function parseMarked() {
	toggle = !toggle;
	console.log(toggle);
	if (toggle) {
		// Parse text into markdow
		let rawText = textBox.value;
		let markdown = marked.parse(rawText);

		result.innerHTML = markdown;
		editor.style.display = "none";
	} else {
		editor.style.display = "block";
		result.innerHTML = null;
	}
}

function getCaret() {
	posCaretStart = document.getElementById("textBox").selectionStart;
	posCaretEnd = document.getElementById("textBox").selectionEnd;
	console.log(posCaretStart, posCaretEnd);
	return posCaretEnd, posCaretStart;
}

function bold() {
	let textBox = document.getElementById("textBox");
	let startString = textBox.value.substr(0, posCaretStart);
	let endString = textBox.value.substring(posCaretEnd);
	let substring = textBox.value.substring(posCaretStart, posCaretEnd);
	textBox.value = `${startString} **${substring}** ${endString}`;
	console.log(substring);
	console.log(textBox.setSelectionRange(posCaretStart, posCaretEnd));
}
function italics() {
	let startString = textBox.value.substr(0, posCaretStart);
	let endString = textBox.value.substring(posCaretEnd);
	let substring = textBox.value.substring(posCaretStart, posCaretEnd);
	textBox.value = `${startString} *${substring}* ${endString}`;
	console.log(substring);
	console.log(textBox.setSelectionRange(posCaretStart, posCaretEnd));
}

// for links between notes
function link() {
	let startString = textBox.value.substr(0, posCaretStart);
	let endString = textBox.value.substring(posCaretEnd);
	let substring = textBox.value.substring(posCaretStart, posCaretEnd);
	textBox.value = `${startString} [${substring}](Insert-Link-Here) ${endString}`;
	console.log(substring);
	console.log(textBox.setSelectionRange(posCaretStart, posCaretEnd));
}
function heading(event) {
	let id = event[event.selectedIndex].id;
	let startString = textBox.value.substr(0, posCaretStart);
	let endString = textBox.value.substring(posCaretEnd);
	let substring = textBox.value.substring(posCaretStart, posCaretEnd);
	console.log(id);
	textBox.value = `${startString} \n${"#".repeat(id)} ${substring} \n${endString}`;
	console.log(substring);
	console.log(textBox.setSelectionRange(posCaretStart, posCaretEnd));
}

function unList() {
	let startString = textBox.value.substr(0, posCaretStart);
	let endString = textBox.value.substring(posCaretEnd);
	let substring = textBox.value.substring(posCaretStart, posCaretEnd);

	const lines = substring.split("\n");
	let newLines = [];
	for (let i = 0; i < lines.length; i++) {
		if (i >= posCaretStart && i <= posCaretEnd) {
			newLines.push("- " + lines[i]);
		} else {
			newLines.push(lines[i]);
		}
	}
	substring = newLines.join("\n");
	textBox.value = `${startString}${substring}${endString}`;
}

function orList() {
	let startString = textBox.value.substr(0, posCaretStart);
	let endString = textBox.value.substring(posCaretEnd);
	let substring = textBox.value.substring(posCaretStart, posCaretEnd);

	const lines = substring.split("\n");
	let newLines = [];
	for (let i = 0; i < lines.length; i++) {
		if (i >= posCaretStart && i <= posCaretEnd) {
			newLines.push(`${i + 1}. ` + lines[i]);
		} else {
			newLines.push(lines[i]);
		}
	}
	substring = newLines.join("\n");
	textBox.value = `${startString}${substring}${endString}`;
}
//function toggle()

window.parseMarked = parseMarked;
window.getCaret = getCaret;
window.bold = bold;
window.italics = italics;
window.link = link;
window.heading = heading;
window.unList = unList;
window.orList = orList;
