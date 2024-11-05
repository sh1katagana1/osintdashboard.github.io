const variables = {
     PDI: 'PDI-000-XXX-112233',     //PeopleDataLabs
     EveryoneAPI_Username: 'User-EAPI000-XXX-000',
     EveryoneAPI_Token: 'Token-EAPI000-XXX-000',
     OpenCNAM_SID: 'API-SID000-XXX-000',
     OpenCNAM_Token: 'API-Token-000-XXX-000',
     BulkCNAM: 'API-BLK000-XXX-000',
     CIDu: 'API-CIDuK000-XXX-000',  //CallerIDServices
     CIDk: 'API-CIDk000-XXX-000',   //CallerIDServices
     ServiceObjects: 'License-KEY-000-XXX-000'
};




//------------display in html where the id="variables"--------------------
function setVariables() {
    let output = '</br><h2>Variables</h2>'
     output += '<p class="alert alert-danger"><i>Edit these under your local files under <b>variables.js</b></i></p>'
   
    for (const property in variables) { //print all variables 
    output += `
      <ul>
        <li><b>${property}:</b> ${variables[property]}</li>
      </ul>
    `
    }
    document.querySelector("#variables").innerHTML = output;
  }