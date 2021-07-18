$(document).ready(function() {
  let j = false, y = false, a = false;
  let t, k, w, q;
  document.getElementById("reset").hidden=true;
  document.getElementById("line").hidden=true;
  function forAppellation() {
    let appellation = responseObject.name;
    let h1 = document.createElement('h1');
    h1.append(appellation);
    document.getElementById('appellation').append(h1);
  };
  function forFields() {
      for (let i = 0; i < responseObject.fields.length; i++) {
        let b = i + 1;
        let div = document.createElement('div');
        let Fields1 = document.createElement('label');
        if (responseObject.fields[i].label) {
          Fields1.setAttribute('for', b);
          Fields1.innerHTML = responseObject.fields[i].label;
          div.append(Fields1);
          // document.getElementById('fields').append(Fields1);
        }
        let Fields2 = document.createElement('input');
        if ((responseObject.fields[i].input.type == "number") && (responseObject.fields[i].input.mask)) {
          t = "tel"
        } else t = responseObject.fields[i].input.type
        Fields2.setAttribute('id', b);
        Fields2.setAttribute('type', t);
        if (responseObject.fields[i].input.required == true) { 
          Fields2.setAttribute('required', '');
        }
        if (responseObject.fields[i].input.placeholder) {
          Fields2.setAttribute('placeholder', responseObject.fields[i].input.placeholder);
        }
        if (responseObject.fields[i].input.checked == "true") { 
          Fields2.setAttribute('checked', '');
        }
        if (responseObject.fields[i].input.technologies) {
          k = i;
          j = true;
        } 
        if (responseObject.fields[i].input.mask)  {
          Fields2.setAttribute('class', i);
        }
        if (responseObject.fields[i].input.filetype) {
          Fields2.setAttribute('class', 'filetype');
          Fields2.setAttribute('accept', '');
          w = i;
          a = true;
        }
        if (responseObject.fields[i].input.colors) {
          q = i;
          y = true;
        }
        div.append(Fields2);
        document.getElementById('fields').append(div);
        // document.getElementById('fields').append(Fields2);
      }
      if (j) {
        let options = '';
        for (let i = 0; i < responseObject.fields[k].input.technologies.length; i++) { 
          options += '<option>' + responseObject.fields[k].input.technologies[i] + '</option>'
        }
        $('input[type="technology"]').replaceWith('<select multiple size="5">' + options + '</select>')
      }
      for (let l = 0; l < responseObject.fields.length; l++) {
          if (responseObject.fields[l].input.mask) {
            $("." + l).mask(responseObject.fields[l].input.mask);
          }
      }
      if (a) {
        let character = '';
        let kind;
          for (let i = 0; i < responseObject.fields[w].input.filetype.length; i++) { 
            if(responseObject.fields[w].input.filetype[i] != "pdf") {
              kind = "image"
            } else kind = "application";
            character += kind + '/' + responseObject.fields[w].input.filetype[i]
            if (i + 1 < responseObject.fields[w].input.filetype.length) {
              character += ','
            }
          } 
          $(".filetype").attr('accept', character); 
      }
      if (y) {
        let colors = ''; 
          for (let i = 0; i < responseObject.fields[q].input.colors.length; i++) { 
            colors += '<option value="' + responseObject.fields[q].input.colors[i] + '" >'
          }  
          $('input[type="color"]').replaceWith('<input type="color" list="color" value="' + responseObject.fields[q].input.colors[0] + '" ><datalist id="color">' + colors + '</datalist>')
      }
  };
  function forReferences() {
    if (responseObject.references) { 
      for (let i = 0; i < responseObject.references.length; i++) {
        if (responseObject.references[i].input) {
          let References1 = document.createElement('input')
          References1.setAttribute('type', responseObject.references[i].input.type)
          if (responseObject.references[i].input.required) {
            References1.setAttribute('required', '')
          }
          if (responseObject.references[i].input.checked == 'true') {
            References1.setAttribute('checked', '')
          }
          document.getElementById('references').append(References1);
        } 
        if (responseObject.references[i]['text without ref']) {
          let References2 = document.createElement('p');
          References2.innerHTML = responseObject.references[i]['text without ref']; 
          document.getElementById('references').append(References2);
        }
        if (responseObject.references[i].ref) {
          let References3 = document.createElement('a');
          References3.setAttribute('href', responseObject.references[i].ref);
          References3.innerHTML = responseObject.references[i].text
          document.getElementById('references').append(References3);
        }
      }
    }
  }
  function forButtons() {
    if (responseObject.buttons) {
      for (let i = 0; i < responseObject.buttons.length; i++) {
        let Buttons1 = document.createElement('button');
        Buttons1.innerHTML = responseObject.buttons[i].text;
        document.getElementById('buttons').append(Buttons1);
      }
    }
  }
  parse.onclick = function() {  
    document.getElementById("parse").hidden=true;
    document.getElementById("parsefile").hidden=true;   
    document.getElementById("reset").hidden=false;
    document.getElementById("line").hidden=false;
    const addedFiles = document.getElementById("parsefile");
    let file = addedFiles.files[0]
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function() {  
      responseObject = JSON.parse(reader.result);  
      forAppellation();
      forFields();
      forReferences();
      forButtons();
    };
  };
  reset.onclick = function () {
    document.getElementById("reset").hidden=true;
    document.getElementById("line").hidden=true;
    document.getElementById("parse").hidden=false;
    document.getElementById("parsefile").hidden=false;   
    document.getElementById('appellation').innerHTML = '';
    document.getElementById('fields').innerHTML = '';
    document.getElementById('references').innerHTML = '';
    document.getElementById('buttons').innerHTML = '';
    j = false; y = false; a = false;
    t = undefined; k = undefined; w = undefined; q = undefined;
  }
});