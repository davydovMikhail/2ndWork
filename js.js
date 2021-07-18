$(document).ready(function() {
  let j = false;
  let y = false;
  let a = false;
  let g = false;
  let t;
  let k;
  let w;
  let q;
  document.getElementById("reset").hidden=true;
  function forAppellation() {
    let appellation = responseObject.name;
    document.getElementById('appellation').innerHTML = '<h1>' + appellation + '</h1>';
  };
  function forFields() {
    let fields = '';
      for (let i = 0; i < responseObject.fields.length; i++) {
        let b = i + 1;
        if (responseObject.fields[i].label) {
          fields += '<label for="' + b + '">' + responseObject.fields[i].label + '</label><br>'
        }
        if ((responseObject.fields[i].input.type == "number") && (responseObject.fields[i].input.mask)) {
          t = "tel"
        } else t = responseObject.fields[i].input.type
        fields += '<input id="' + b + '" ' + 'type="' + t + '" '
        if (responseObject.fields[i].input.required == true) { 
          fields += 'required '
        }
        if (responseObject.fields[i].input.placeholder) {
          fields += 'placeholder="' + responseObject.fields[i].input.placeholder + '" '
        }
        if (responseObject.fields[i].input.checked == "true") { 
          fields += 'checked'
        }
        if (responseObject.fields[i].input.technologies) {
          k = i;
          j = true;
        } 
        if (responseObject.fields[i].input.mask)  {
          fields += 'class="' + i  + '"'
        }
        if (responseObject.fields[i].input.filetype) {
          fields += 'class="filetype" accept=""'
          w = i;
          a = true;
        }
        if (responseObject.fields[i].input.colors) {
          q = i;
          y = true;
        }
        fields += '><br>'
      }
      document.getElementById('fields').innerHTML = fields;
      if (j) {
        let options = '';
        for (let i = 0; i < responseObject.fields[k].input.technologies.length; i++) { 
          options += '<option>' + responseObject.fields[k].input.technologies[i] + '</option>'
        }
        $('input[type="technology"]').replaceWith('<select multiple size="3">' + options + '</select>')
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
      let references = ''
      for (let i = 0; i < responseObject.references.length; i++) {
        if (responseObject.references[i].input) {
          g = true;
          references += '<input type="' + responseObject.references[i].input.type +'" '
        } else g = false;
        if (g) { 
          if (responseObject.references[i].input.required) {
            references += 'required '
          }
          if (responseObject.references[i].input.checked == 'true') {
            references += 'checked '
          }
        }
        if (responseObject.references[i].input) {
          references += ' >'
        }
        if (responseObject.references[i]['text without ref']) {
          references += '<p>' + responseObject.references[i]['text without ref'] + '</p><br>'
        }
        if (responseObject.references[i].ref) {
          references += '<a href="' + responseObject.references[i].ref + '" >'
        }
        if (responseObject.references[i].text) {
          references += responseObject.references[i].text + '</a><br>'
        }
      }
      document.getElementById('references').innerHTML = references;
    }
  }
  function forButtons() {
    if (responseObject.buttons) {
      let buttons = ''
      for (let i = 0; i < responseObject.buttons.length; i++) {
        buttons += '<button>' + responseObject.buttons[i].text + '</button>'
      }
      document.getElementById('buttons').innerHTML = buttons;
    }
  }
  parse.onclick = function() {  
    document.getElementById("parse").hidden=true;
    document.getElementById("parsefile").hidden=true;   
    document.getElementById("reset").hidden=false;
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
    document.getElementById("parse").hidden=false;
    document.getElementById("parsefile").hidden=false;   
    document.getElementById('appellation').innerHTML = '';
    document.getElementById('fields').innerHTML = '';
    document.getElementById('references').innerHTML = '';
    document.getElementById('buttons').innerHTML = '';
    j = false;
    y = false;
    a = false;
    g = false;
    t = undefined;
    k = undefined;
    w = undefined;
    q = undefined;
  }
});