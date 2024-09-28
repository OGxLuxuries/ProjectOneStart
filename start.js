
//draw init data SOM, then call function so error doesnt throw
function $(id) {
    return document.getElementById(id)
  }

function $$(ele, index) {
    return document.getElementsByTagName(ele)[index];
}
function $ce(ele) {
    return document.createElement(ele)
}
function $cet(ele, txt) {
    let temp = document.createElement(ele)
    temp.appendChild($ctn(txt))
    return temp;
}

  function $ctn(string) {
      return document.createTextNode(string);
  }


let data = {
    init: ['Select?', '', 'A', 'B'],
    A: [' A Select?', '', 'AA', 'AB'],
    B: ['B Select?', '', 'B', 'A'],
    AB: ['AB Select?', '', 'ABA', 'ABB', 'ABC']
  }

  let data2 = {
    init: ['Select?', '', 'A', 'B'],
    A: [' A Select?', 'AA', 'AB'],
    B: ['B Select?', 'B', 'A'],
    AB: ['AB Select?', 'ABA', 'ABB', 'ABC']
  }

function createMofo(field) {
    let mofo = $ce('div')
    mofo.setAttribute("class", "mofo")
    mofo.style.backgroundColor = "lightblue";
    if (field) {
        let h = $cet("h1", field[0]);
        mofo.appendChild(h)
        let x = $ce('select', '');
        x.onchange = newSelection;
        for (let i = 1; i < field.length; i++) {          
            let y = $cet('option', field[i])
            x.appendChild(y)
        }
        mofo.appendChild(x)  
    }
    $$('body', 0).appendChild(mofo)
    return mofo;
}

function newSelection() {
    console.log("new selection:", this.parentNode.firstChild.firstChild, this.value)
    if (this.parentNode.nextSibling) {
        deleteMofos(this)
    }
    
    createMofo(data[this.value])
    // createMofo(this.value, this.parentNode)
    
}
function deleteMofos(node) {
        
        let nextMofo = node.parentNode.nextSibling; 
        while (nextMofo) {
            // body removes any mofo divs created by previous options and stops at current mofo
            if(node.parentNode == $$('body', 0).lastChild) {
                break;
            }
            $$('body', 0).removeChild(nextMofo)
            console.log(node.parentNode.parentNode)
            deleteMofos(node)
        }
        
}
function init() {
    createMofo(data.init);
}
