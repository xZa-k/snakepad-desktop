const { marked } = require("marked")

let toggle = false
let posCaretStart = 0
let posCaretEnd = 0

function parseMarked() {
	toggle = !toggle
	console.log(toggle)
	if (toggle) {
		// Parse text into markdow
		let textBox = document.getElementById("textBox")
		let rawText = textBox.value
		let markdown = marked.parse(rawText)

		let result = document.getElementById("result")
		result.innerHTML = markdown
		textBox.style.display = "none"
	} else {
		textBox.style.display = "block"
		result.innerHTML = null
	}
}

function getCaret() {
	posCaretStart = document.getElementById("textBox").selectionStart
	posCaretEnd = document.getElementById("textBox").selectionEnd
	console.log(posCaretStart, posCaretEnd)
	return posCaretEnd, posCaretStart
}

function bold() {
	let textBox = document.getElementById("textBox")
	let startString = textBox.value.substr(0, posCaretStart)
	let endString = textBox.value.substring(posCaretEnd)
	let substring = textBox.value.substring(posCaretStart, posCaretEnd)
	textBox.value = startString + "**" + substring + "**" + endString
	console.log(substring)
	console.log(textBox.setSelectionRange(posCaretStart, posCaretEnd))
}
function italics() {
	let textBox = document.getElementById("textBox")
	let startString = textBox.value.substr(0, posCaretStart)
	let endString = textBox.value.substring(posCaretEnd)
	let substring = textBox.value.substring(posCaretStart, posCaretEnd)
	textBox.value = startString + "*" + substring + "*" + endString
	console.log(substring)
	console.log(textBox.setSelectionRange(posCaretStart, posCaretEnd))
}
function link() {
	let textBox = document.getElementById("textBox")
	let startString = textBox.value.substr(0, posCaretStart)
	let endString = textBox.value.substring(posCaretEnd)
	let substring = textBox.value.substring(posCaretStart, posCaretEnd)
	textBox.value = startString + "[" + substring + "](Insert-Link-Here)" + endString
	console.log(substring)
	console.log(textBox.setSelectionRange(posCaretStart, posCaretEnd))
}
function heading_1() {
	let textBox = document.getElementById("textBox")
	let startString = textBox.value.substr(0, posCaretStart)
	let endString = textBox.value.substring(posCaretEnd)
	let substring = textBox.value.substring(posCaretStart, posCaretEnd)
	textBox.value = startString + "# " + substring + endString
	console.log(substring)
	console.log(textBox.setSelectionRange(posCaretStart, posCaretEnd))
}

window.parseMarked = parseMarked
window.getCaret = getCaret
window.bold = bold
window.italics = italics
window.link = link
window.heading_1 = heading_1
