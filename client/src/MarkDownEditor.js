const { marked } = require("marked")

let toggle = false

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
	let posCaretStart = document.getElementById("textBox").selectionStart
	let posCaretEnd = document.getElementById("textBox").selectionEnd
	console.log(posCaretStart, posCaretEnd)
	return posCaretEnd, posCaretStart
}

function bold() {
	// Add ** to the start and end of word in the array called arra
	let textBox = document.getElementById("textBox")
	let arra = textBox.value.split("")
	console.log(arra)
}

window.parseMarked = parseMarked
window.getCaret = getCaret
window.bold = bold
