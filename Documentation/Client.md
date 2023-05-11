# *In development*

*This will be the parent page for the sections in the client side  
might not look like this precisely, just for structuring*


- src/components
    - fileExplorer.css
    - fileExplorer.ts
    - MarkDownEditor.css
    - MarkDownEditor.js
- index.html
- index.js
- main.scss
- notes.ts

## Note.ts
`notes.ts` contains most of the logic for the application. It intialises the HTML components dynamically and is used for communication between the components and the main workspace object, through a mixture of events and attribute callbacks.

### Workspace
The workspace is the main object for the app and is what instanciates the custom HTML components. Event listeners are used for both the user input as well as some communication between the components, mostly the `NoteChange` event which is fired when the selected note is changed, usually through clicky an entry from the FileExplorer

### Note
This is the basic representation of a Note, it contains just the title, id and the text of a note.

### WorkspaceData
To allow the state of the application to be easily seralised a seperate object is used for all relevent data todo with the workspace. Currently this just stores a list of the notes in the workspace but can be expanded to contain more data with minimal changes needed to account for the change.

### API Functions
2 asynchronous functions are also present to fetch and update user data. By having these as functions rather than classes it makes them more modular and can be used anywhere in the codebase as their functionality is very simple.

## Components
The component system for the app makes use of vanilla JS custom components. All components are stored in the components folder and have a `.ts` and `.css` file associated with them. 

### MarkDownEditor
This is the editor as well as the buttons for interacting with some of the markdown styling. It uses a template in the `index.html` to load the buttons and assigns them onclick events based on their id. It does not have any reference to the workspace's notes but does have a title and current noteid stored as attributes

### FileExplorer
File explorer sends a `NoteChange` event when a note item is selected. Currently WorkspaceData is given as an attribute `data` so that the component is aware of all the notes, however this will change in future iterations removing the text data and instead only having the title and note id.