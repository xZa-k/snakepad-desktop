## This project is still in development so some parts may be incomplete

# SnakePad 🐍

## Snake + Notes, what a wonderful creation.

This project is a snake themed note taking web app.

# Usage

_not set up yet but it would be along the lines of this_

- Go to the website

  ![login-page](/Documentation/Images/login%20page.png)

- Login or sign up  
   _no sign up yet_
- Put in your details  
  ![loging-in](/Documentation/Images/details%20loging%20in.png)

- Open or create a note
  ![loging-in](/Documentation/Images/Note%20taking%20page.png)
- Start writing

## Features

- When using these features make sure that the word you are styling or words does not have a space betwen the starting letter or end letter and the symbol e.g. This: **Test** not: ** Test** or **Test **. This rules is not nessasary for styling that doesnt surround the words e.g. Heading: # Test but these need to be on a new line or they may not function as intended.

- Buttons for markdown actions
  - Bold
  - Italics
  - Heading Types
  - Numbered and bullet lists
  - _link doesn't work to other notes but for websites it does it needs 'https://'_   
- Change font Size
- Toggle preview button
- Auto File saving
- File name changing
- _user accounts_

# Development
## Documentation
- Here is the link to the [Client](/Documentation/Client.md) side of the documentation  
- Here is the link to the [Server](/Documentation/Server.md) side of the documentation

## Dependancies:

- deno
  - install deno make sure it's in your path environment variable
- npm
  - _works on node 12 - 16 (not 17)_
  - webpack
  - express

## Set Up
1. Open the terminal
2. Run `npm i`
3. Run `npm start`
4. Go to http://localhost:8080/ on your browser

### Testing:

Install python (recommended 3.7) and use pip to install helim
`pip install helium` ideally in a venv.
Firefox is the default browser it uses to test. Either make sure FireFox is installed or change the first line in `all.py` to `start_chrome()`.

Run `test/all.py` with python i.e. `python3 all.py`

It will give 3 test results outputted in the terminal.

#### The tests are:
- Testing if using hashtags for headers creates a h1 tag in the preview
- Testing if when random text is written and you switch between notes the text is still there
- Testing if creating a new note works (deletes the newly created note after)

CTRL + c in the terminal to stop running.

# Contributors

- Mark Chittenden - https://github.com/mark-chit
- Benjamin Kile - https://github.com/BenjaminKile
- Manoj Chandar - https://github.com/ManojC0
- Stuart Dann - https://github.com/Stuart-Dann
- Zak Body - https://github.com/xZa-k
- Pablo Bejar - https://github.com/PabloBeJ