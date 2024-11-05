//----------Populate First and Last Name or combined field of First+Last Name-------------
function popAll(Field1, Field2, Field3) {
  for (j = 1; j <= 100; j++) {
    if (j < 10) {
      j = "0" + j.toString();
    }
    else {
      j = j.toString();
    }

    firstField = document.getElementById("Search" + j + "a");
    secondField = document.getElementById("Search" + j + "b");
    firstLastToPop = document.getElementById("Search" + j);
    thirdField = document.getElementById("Search" + j + "c"); //in case of phone number being the 3 fields
    allNumbers = document.getElementById("all" + j);

    if (firstField != null) //allows one field to be blank (search for 1st name only)
    {
      firstField.value = Field1;
    }
    if (secondField != null) //allows one field to be blank (search for last name only)
    {
      secondField.value = Field2;
    }
    if (firstLastToPop != null) //single and 2 fields on the same page
    {
      firstLastToPop.value = Field1 + " " + Field2;
    }
    if (firstLastToPop != null && secondField == null) //single value only
    {
      firstLastToPop.value = Field1;
    }
    if (firstField != null && secondField != null && thirdField != null) { // phone number fields
      firstField.value = Field1;
      secondField.value = Field2;
      thirdField.value = Field3;
    }
    if (allNumbers != null) { // field with all numbers
      allNumbers.value = Field1+Field2+Field3;
    }

  } //end for
} //end function

//------------- Telephone script for 3 fields ------------

function telPopAll(First3, Mid3, Last4) {
  for (j = 1; j <= 100; j++){
    if (j < 10){
      j = "0" + j.toString();
    }
    else {
      j = j.toString();
    }
    first3ToPop = document.getElementById("Search" + j + "a");
    mid3ToPop = document.getElementById("Search" + j + "b");
    thirdField = document.getElementById("Search" + j + "c");
    if (first3ToPop != null && mid3ToPop != null && thirdField != null){
      first3ToPop.value = First3;
      mid3ToPop.value = Mid3;
      thirdField.value = Last4;
    }
  }
}

/* Retreive Github usernames and emails for git commit logs */
function getGit(url){
    var xhr = new XMLHttpRequest();
var curl = "https://api.github.com/repos/" + url + "/commits";
    xhr.open("GET", curl, true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
          var parsed = JSON.parse(xhr.responseText);
         text = "";
          // loop through all the objects in the JSON output
              for (var i in parsed) {
                if (parsed[i] instanceof Object) {
                  text += parsed[i]["commit"]["author"].name + " " + parsed[i]["commit"]["author"].email;
                  text += "<br>";
                } else {
                  document.write(obj[i] + "<br>");
                }
              }
        }
      else {
        text = "<em><sub>Nothing Found (check repo URL)</sub></em>"
      }
      document.querySelector("#output").innerHTML = text;
    } //sub-function
xhr.send();
} //end-function


