import random
from time import sleep
from helium import *
from selenium.webdriver.common.by import By

driver = start_firefox("localhost:8080")

def expand_shadow_element(element):
    # return a list of elements
    shadowRoot = driver.execute_script('return arguments[0].shadowRoot.children', element)
    return shadowRoot
# mydriver.execute_script("alert('yoyoyoyoy')")
# mydriver.cssSelector("#shadow_content > ")
# click(S("#delete_button"))
# sleep(3)
mde = expand_shadow_element(S("markdown-editor").web_element)
# S()
# print(S("markdown-editor").web_element)


textarea = None
header = None
previewButton = None
previewContent = None
for e in mde:
    # print(e.tag_name)
    if e.get_attribute("id") == "container":
        # print(e)
        # click(e.find_element(By.TAG_NAME, "textarea"))
        textarea = e.find_element(By.TAG_NAME, "textarea")
        previewContent = e.find_element(By.ID, "previewcontent")
    elif e.get_attribute("id") == "button_container":
        previewButton = e.find_element(By.ID, "preview")

    elif e.tag_name == "h1":
        header = e
        
fileExplorer = expand_shadow_element(S("file-explorer").web_element)[0]
files = fileExplorer.find_element(By.TAG_NAME, "ul").find_elements(By.TAG_NAME, "li")
newButton = fileExplorer.find_element(By.ID, "new_note")
deleteButton = fileExplorer.find_element(By.ID, "delete_note")


# for e in fileExplorer:
#     if e.tag_name == "ul":
#         print(e)
#         for button in e:    
#             print(button.get_attribute("text_content"))

    
def test_header_preview():
    write("# Header test", into=textarea)
    click(previewButton)
    try: 
        previewContent.find_element(By.TAG_NAME, "h1")
        print("Header preview formatting succeeded")
    except e: 
        print(e)
        print("Header preview formatting failed")

def updateFiles():
    files = fileExplorer.find_element(By.TAG_NAME, "ul").find_elements(By.TAG_NAME, "li")
    return files

def test_note_saving():
    randomText = "".join(random.choice("abcdefg12354") for i in range(20))
    files = updateFiles()
    click(files[2])

    write(randomText, into=textarea)
    files = updateFiles()
    click(files[0])
    click(files[2])
    
    if textarea.get_attribute("value") == randomText:
        print("Note saving succeeded")
    else:
        print("Note saving failed")
    
def test_new_note():
    files = updateFiles()
    fileCount = len(files)
    click(newButton)
    files = updateFiles()
    newFileCount = len(files)
    if newFileCount > fileCount:
        print("New note succeeded")
    else:
        print("New note failed")
    click(deleteButton)
    


test_note_saving()
test_header_preview()
test_new_note()
kill_browser()