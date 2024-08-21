let fileSelection = document.getElementsByClassName('fileSelection');
let hiddenBackground = document.getElementsByClassName("hiddenBackground");

function toggleFileSelection() {
    for (let i = 0; i < fileSelection.length; i++) {
        fileSelection.item(i).classList.toggle("fileSelectionOpen");
    }

    for (let i = 0; i < hiddenBackground.length; i++) {
        hiddenBackground.item(i).classList.toggle("visible");
    }
}


function saveTextAsFile() {
    let textToWrite = document.getElementById("content").value;
    let fileNameToSaveAs = document.getElementById("fileName").value;
    fileNameToSaveAs = fileNameToSaveAs != "" ? fileNameToSaveAs : "Unnamed";

    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}






function readSingleFile(e) {
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    let reader = new FileReader();
    reader.onload = function(e) {
      let contents = e.target.result;
      displayContents(contents);
    };
    reader.readAsText(file);
  }
  
  function displayContents(contents) {
    let element = document.getElementById('content');
    element.textContent = contents;
  }
  
document.getElementById('fileInput').addEventListener('change', readSingleFile, false);