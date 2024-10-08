
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
let currentChoices = []; 

let dataBakery = {
    css: "bakery.css",
    init: ['Carb Category', '', 'Bread', 'Pastries', 'Cakes', 'Cupcakes'],
    title: "Oliver's Bakery",
    
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



let dataTechStore = {
    css: "techstore.css",
    init: ['Product Category', '', 'Laptops', 'Smartphones', 'Tablets', 'Accessories'],
    title: "Oliver's Tech Store",
    
    // Laptops category
    Laptops: ['Laptop Brand', '', 'Apple', 'Dell', 'HP'],
    Apple: ['Model', '', 'MacBook Air', 'MacBook Pro'],
    Dell: ['Model', '', 'XPS 13', 'XPS 15', 'Inspiron 15'],
    HP: ['Model', '', 'Pavilion', 'Spectre', 'Envy'],
    
    // Smartphones category
    Smartphones: ['Smartphone Brand', '', 'Apple', 'Samsung', 'Google'],
    'Apple': ['Model', '', 'iPhone 12', 'iPhone 13', 'iPhone 14'],
    'Samsung': ['Model', '', 'Galaxy S21', 'Galaxy Note 20', 'Galaxy Z Fold'],
    'Google': ['Model', '', 'Pixel 6', 'Pixel 5', 'Pixel 4a'],
    
    // Tablets category
    Tablets: ['Tablet Brand', '', 'Apple', 'Samsung', 'Microsoft'],
    'Apple': ['Model', '', 'iPad', 'iPad Pro', 'iPad Air'],
    'Samsung': ['Model', '', 'Galaxy Tab S7', 'Galaxy Tab A7'],
    'Microsoft': ['Model', '', 'Surface Pro 7', 'Surface Go 2'],
    
    // Accessories category
    Accessories: ['Accessory Type', '', 'Headphones', 'Chargers', 'Cases'],
    Headphones: ['Brand', '', 'Sony', 'Bose', 'Apple'],
    Chargers: ['Type', '', 'USB-C', 'Lightning', 'Wireless'],
    Cases: ['Device', '', 'Laptop Case', 'Phone Case', 'Tablet Case'],
};


function createCSS(path) {
    let sheet = $ce('link')
    sheet.setAttribute('rel', 'stylesheet')
    sheet.setAttribute('href', path)
    $$('head', 0).appendChild(sheet)
}

function createLayout() {
    let hflex = $ce('section')
    hflex.setAttribute('id', 'hflex')
    let vflex = $ce('section')
    vflex.setAttribute('id', 'vflex')
    hflex.appendChild(vflex)
    $$('body', 0).appendChild(hflex)
}

function createMofo(field, isAnimated = true) {
    let mofo = $ce('div')
    mofo.setAttribute("class", "mofo")
    mofo.style.position = 'relative';
      
        
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
    $('vflex').appendChild(mofo)

    if (isAnimated) {
        mofo.style.left = -375 + 'px';
        mofo.style.opacity = 0.1;
           
        requestAnimationFrame(() => {
            slideInMofo(mofo);
        });
    }
    
    
    return mofo;
}
// animation
function slideInMofo(m) {
    let pos = parseInt(m.style.left)
    let opac = parseFloat(m.style.opacity)
    if (pos < 0) {
      m.style.left = pos + 2 + 'px';
      if (opac < 1) {
        m.style.opacity = (opac + 0.02).toString();
      }      
      requestAnimationFrame(() => slideInMofo(m)) 
    }
    
}

// animation
function disappearMofo(m) {
    let opac = parseFloat(m.style.opacity);
    let pos = parseInt(m.style.top)
    
    if (pos < 400 ) {
        m.style.top = pos + 10 + 'px';
        if (opac > 0) {
            m.style.opacity = (opac - 0.05).toString();
        }
    
    requestAnimationFrame(() => disappearMofo(m));
    } else {
        m.parentNode.removeChild(m);
    }
    
}
    

function newSelection() {
    if ($('form')) {
        $('hflex').removeChild($('form'))
    } 

    if (this.parentNode.nextSibling) {
        deleteMofos(this)
    }
    let label = this.parentNode.firstChild.textContent;
    localStorage.setItem(label, this.value)
    currentChoices.push(this.parentNode.firstChild.firstChild)
    console.log("currentChoices:" + currentChoices)

    createMofo(dataset[this.value])   

    if (!dataset[this.value]) {
        createForm()
    }
}


function deleteMofos(node) {
    let nextMofo = node.parentNode.nextSibling;
    while (nextMofo) {
        let mofoToRemove = nextMofo;  
        nextMofo = nextMofo.nextSibling;  
        try {localStorage.removeItem(mofoToRemove.firstChild.textContent)}
        catch (err) {console.log(err)}
        disappearMofo(mofoToRemove); 
    }
}

function createHeader(title) {
    let header = $cet('h1', title)
    header.setAttribute('class', 'header')
    $$('body', 0).appendChild(header)
}

function createForm() {
    let form = $ce('form'); 
    let formHeader = $cet('h1', 'Your Order')
    
    let nameLabel = $cet('label', 'Sign Here: ');
    nameLabel.setAttribute('for', 'nameInput');

    let nameInput = $ce('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('id', 'nameInput');
    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('placeholder', 'Enter your name');
    
    
    let emailLabel = $cet('label', 'Email: ');
    emailLabel.setAttribute('for', 'emailInput');

    let emailInput = $ce('input');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('id', 'emailInput');
    emailInput.setAttribute('name', 'email');
    emailInput.setAttribute('placeholder', 'Enter your email');

    
    let submitButton = $ce('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Submit';

    form.appendChild(formHeader)

    // for loop with localStorage
    for (let i = 0; i < localStorage.length; i++) {
        let name = localStorage.key(i); 
        let value = localStorage.getItem(name);        
        let choice = $cet('p', name + ": " + value);
        form.appendChild(choice);
    }
    
    

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(document.createElement('br')); 
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(document.createElement('br')); 
    form.appendChild(submitButton);

    form.setAttribute('id', 'form')
    
    $('hflex').appendChild(form);
}

function init() {
    dataset = dataTechStore;
    createHeader(dataset.title);
    createLayout()
    
    createMofo(dataset.init, false);
    createCSS(dataset.css);
}
