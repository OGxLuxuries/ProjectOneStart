
//shortcut function
function $(id) {
    return document.getElementById(id)
  }

//shortcut function
function $$(ele, index) {
    return document.getElementsByTagName(ele)[index];
}
//shortcut function
function $ce(ele) {
    return document.createElement(ele)
}
//shortcut function
function $cet(ele, txt) {
    let temp = document.createElement(ele)
    temp.appendChild($ctn(txt))
    return temp;
}

//shortcut function
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

// create CSS taliored to dataset
function createCSS(path) {
    let sheet = $ce('link')
    sheet.setAttribute('rel', 'stylesheet')
    sheet.setAttribute('href', path)
    $$('head', 0).appendChild(sheet)
}

// simple flexbox layouts for organization
function createLayout() {
    let hflex = $ce('section')
    hflex.setAttribute('id', 'hflex')
    let vflex = $ce('section')
    vflex.setAttribute('id', 'vflex')
    hflex.appendChild(vflex)
    $$('body', 0).appendChild(hflex)
}

// div constructor with dynamic element creation
function createMofo(field, isAnimated = true) {
    let mofo = $ce('div')
    mofo.setAttribute("class", "mofo")
    mofo.style.position = 'relative';
      
        
    if (field) {
        let h = $cet("h1", field[0]);
        mofo.appendChild(h)
        let x = $ce('select', '');
        x.onchange = newSelection;
        // x.setAttribute('onchange', newSelection)
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
    
// anytime a select onchange fires
function newSelection() {
    if ($('form')) {
        $('hflex').removeChild($('form'))
    } 

    if (this.parentNode.nextSibling) {
        deleteMofos(this)
    }
    let label = this.parentNode.firstChild.firstChild.nodeValue;
    localStorage.setItem(label, this.value)
    currentChoices.push(label.toString());
    console.log("currentChoices:" + currentChoices)

    createMofo(dataset[this.value])   

    if (!dataset[this.value]) {
        createForm()
    }
}

// delete Mofos
function deleteMofos(node) {
    let nextMofo = node.parentNode.nextSibling;
    while (nextMofo) {
        let mofoToRemove = nextMofo;  
        nextMofo = nextMofo.nextSibling;  
        try {localStorage.removeItem(mofoToRemove.firstChild.firstChild.nodeValue)}
        catch (err) {console.log(err)}
        disappearMofo(mofoToRemove); 
    }
}
// creates header based on data set
function createHeader(title) {
    if ($$('h1', 0)) {
        $$('body', 0).removeChild($$('h1', 0))
    }
    let header = $cet('h1', title)
    header.setAttribute('class', 'header')
    
    let butt = $cet('button', 'switch data')
    butt.onclick = () => {
        dataset = dataTechStore
        init(dataTechStore)

    }
    header.appendChild(butt)
    
    $$('body', 0).insertBefore(header, $$('body', 0).firstChild);

}
// dynamic form creation with select option listed 
function createForm() {
    let form = $ce('form'); 
    form.setAttribute('id', 'form')
    
    let formHeader = $cet('h1', 'Your Order')
    
    let nameLabel = $cet('label', 'Sign Here: ');
    nameLabel.setAttribute('for', 'nameInput');

    let nameInput = $ce('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('id', 'nameInput');
    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('placeholder', 'Enter your name');
    if (GetCookie('name')) {
        nameInput.value = GetCookie('name')
    }
    
    
    let emailLabel = $cet('label', 'Email: ');
    emailLabel.setAttribute('for', 'emailInput');

    let emailInput = $ce('input');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('id', 'emailInput');
    emailInput.setAttribute('name', 'email');
    emailInput.setAttribute('placeholder', 'Enter your email');
    if (GetCookie('email')) {
        emailInput.value = GetCookie('email')
    }

    
    let submitButton = $cet('button', "Submit & Refresh");
    submitButton.setAttribute('type', 'submit');

   

    form.appendChild(formHeader)

    // for loop with localStorage to get choices 
    for (let i = 0; i < localStorage.length; i++) {
        let name = localStorage.key(i); 
        let value = localStorage.getItem(name);        
        let choice = $cet('p', name + ": " + value);
        form.appendChild(choice);
    }
    form.onsubmit = (event) => {
        event.preventDefault();
        
        SetCookie("email", emailInput.value, 604800); // 7 days in seconds
        SetCookie("name", nameInput.value, 604800); // 7 days in seconds
        localStorage.clear();
        
        return validate();
    };
    
    

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(document.createElement('br')); 
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(document.createElement('br')); 
    form.appendChild(submitButton);

    
    
    $('hflex').appendChild(form);
}

// javascript form validation 
function validate() {
    
    const inputs = form.getElementsByTagName('input');
    let isValid = true;

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === '') {
            inputs[i].style.border = '2px solid red';
            isValid = false; 
        } else {
            inputs[i].style.border = '';
            
        }
    }
    if (isValid) {
        location.reload()
    }
    return isValid;
}

// starts up with databakery set in index
function init(x) {
    dataset = x
    
    localStorage.clear()
    createCSS(dataset.css);
    createHeader(dataset.title);
    createLayout()
    if ($('vflex').firstChild) {
        $('vflex').removeChild($('vflex').firstChild)
    }    
    createMofo(dataset.init, false);
    
}
