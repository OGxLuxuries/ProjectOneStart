
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

let dataset = {};

let dataBakery = {
    css: "bakery.css",
    init: ['Select Item', '', 'Bread', 'Pastries', 'Cakes', 'Cupcakes'],
    
    // Bread category is now only two selections deep
    Bread: ['Bread Type', '', 'Sourdough', 'Baguette'],
    Sourdough: ['Size', '', 'Loaf', 'Slice'],
    Baguette: ['Size', '', 'Loaf', 'Slice'],
    
    // Pastries category
    Pastries: ['Pastry Type', '', 'Croissant', 'Danish', 'Muffin'],
    Croissant: ['Filling', '', 'Plain', 'Chocolate', 'Almond'],
    Danish: ['Flavor', '', 'Apple', 'Cherry', 'Cream Cheese'],
    Muffin: ['Flavor', '', 'Blueberry', 'Chocolate Chip', 'Banana Nut'],
    
    // Cakes category
    Cakes: ['Cake Type', '', 'Chocolate Cake', 'Vanilla Cake', 'Red Velvet Cake'],
    'Chocolate Cake': ['Size', '', '6-inch', '8-inch', '10-inch'],
    'Vanilla Cake': ['Size', '', '6-inch', '8-inch', '10-inch'],
    'Red Velvet Cake': ['Size', '', '6-inch', '8-inch', '10-inch'],
    
    // New Cupcakes category with four selections deep
    Cupcakes: ['Select Cupcake Type', '', 'Chocolate Cupcake', 'Vanilla Cupcake', 'Red Velvet Cupcake'],
    'Chocolate Cupcake': ['Frosting', '', 'Chocolate Frosting', 'Vanilla Frosting'],
    'Chocolate Frosting': ['Topping', '', 'Sprinkles', 'Nuts'],
    'Vanilla Frosting': ['Topping', '', 'Sprinkles', 'Fruit'],
    
    'Vanilla Cupcake': ['Frosting', '', 'Chocolate Frosting', 'Vanilla Frosting'],
    'Red Velvet Cupcake': ['Frosting', '', 'Cream Cheese Frosting'],
    'Cream Cheese Frosting': ['Topping', '', 'Crushed Pecans', 'Coconut Shavings']
};



let dataFootball = {
init: ['Select?', '', 'A', 'B'],
A: [' A Select?', 'AA', 'AB'],
B: ['B Select?', 'B', 'A'],
AB: ['AB Select?', 'ABA', 'ABB', 'ABC']
}

function createCSS(path) {
    let sheet = $ce('link')
    sheet.setAttribute('rel', 'stylesheet')
    sheet.setAttribute('href', path)
    $$('head', 0).appendChild(sheet)
}

function createMofo(field) {
    let mofo = $ce('div')
    mofo.setAttribute("class", "mofo")
    mofo.style.position = 'relative';
    mofo.style.left = 0 + 'px';
    mofo.style.top = -100 + 'px';
    mofo.style.opacity = 0;
    mofo.onload = requestAnimationFrame(
        function () {
            dropInMofo(mofo);
        }
    )
        
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

function dropInMofo(m) {
    let pos = parseInt(m.style.top)
    let opac = parseFloat(m.style.opacity)
    if (pos < 0) {
      m.style.top = pos + 1 + 'px';
      if (opac < 1) {
        m.style.opacity = (opac + 0.01).toString();
      }
      
      requestAnimationFrame(() => dropInMofo(m)) 
    }
    
}

// function disappearMofo(m) {
    
//     let opac = parseFloat(m.style.opacity)
    
//     if (opac > 0) {
//     m.style.opacity = (opac - 0.01).toString();
//     }
    
//     requestAnimationFrame(() => disappearMofo(m)) 
//     }
    

function newSelection() {
    console.log("new selection:", this.parentNode.firstChild.firstChild, this.value)
    if (this.parentNode.nextSibling) {
        deleteMofos(this)
    }
    
    createMofo(dataset[this.value])
    // createMofo(this.value, this.parentNode)
    
}
function deleteMofos(node) {
        
        let nextMofo = node.parentNode.nextSibling; 
        while (nextMofo) {
            // body removes any mofo divs created by previous options and stops at current mofo
            if(node.parentNode == $$('body', 0).lastChild) {
                break;
            }
            disappearMofo(nextMofo)
            $$('body', 0).removeChild(nextMofo)
            console.log(node.parentNode.parentNode)
            deleteMofos(node)
        }
        
}

function init() {
    dataset = dataFootball;
    createMofo(dataset.init);
    createCSS(dataset.css);
}
