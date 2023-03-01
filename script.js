let carts = document.querySelectorAll('#plus-cart');

let products = [
    {
        name: 'Air Jordan 1 Retro High Satin Black',
        tag: 'j1d',
        price:3500,
        inCart:0
    }, 
    {
        name: 'Jordan IV Black White',
        tag: 'j4c',
        price:4500,
        inCart:0
    }, 
    {
        name: 'White Yeezy 900 Inertia',
        tag: 'yeezy3',
        price:2000,
        inCart:0
    }, 
    {
        name: 'White Laced AirForce',
        tag: 'air3',
        price:2500,
        inCart:0
    }, 
]

for(let i=0; i< carts.length; i++){
    carts[i].addEventListener('click', () => {
        event.preventDefault();
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNUmbers(){
    let productNumbers = localStorage.getItem("cartNumbers");
    
    if (productNumbers) {
        document.querySelector('#cart-count-info').textContent = productNumbers;
    }

}

function cartNumbers(product){
    let productNumbers = localStorage.getItem("cartNumbers");

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers +1);
        document.querySelector('#cart-count-info').textContent = productNumbers + 1;
    }else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('#cart-count-info').textContent = 1;
    } 
    
    setItems(product);
}

function setItems(product) {
   let cartItems = localStorage.getItem('productsInCart');
   cartItems = JSON.parse(cartItems);

   if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
          } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
       }

   }

   localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
   
    let cartCost = localStorage.getItem("totalCost");

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
        
    } else {
        localStorage.setItem("totalCost", product.price);   
    }
}

function displayCart() {
  
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let cartCost = localStorage.getItem("totalCost");

    let productNumbers = localStorage.getItem("cartNumbers");
    if (productNumbers) {
        document.querySelector('#cart-count-info').textContent = productNumbers;
    }

    let productContainer = document.querySelector(".body_container1");

    if( cartItems && productContainer){
        productContainer.innerHTML = `
            <header class="row_one">
            <h2>CART (${productNumbers}) </h2>
            </header`;
        Object.values(cartItems).map(items =>{
            productContainer.innerHTML += `

            <div id="columnA">
                <button class="button" id="box6"><i class="fa-solid fa-trash"></i></button>
                <img src="/img/SHOES/${items.tag}.jpg" class="box" id="box1">
                <h5 class="box" id="box2">${items.name}</h5>
                <h5 class="box" id="box3">Ksh. ${items.price}</h5>
                    <div class="boxbtn" id="boxbtn">
                            <button class="button"><i class="fa-solid fa-square-plus"></i></button>
                            <!-- <h5 id="box33">1</h5> -->
                            <div class="h5">${items.inCart}</div>
                            <button class="button"><i class="fa-solid fa-square-minus"></i></i></button>
                    </div>
                <h5 class="box" id="box3">Ksh. ${items.price *items.inCart}</h5>
            </div>
            
            `  
        });

    deletebuttons = document.querySelectorAll(".fa-trash");
    
    deletebuttons.forEach(function(deletebutton) {
    deletebutton.addEventListener('click', deleteItem);
     });
        }

    let productContainer2 = document.querySelector(".body_container2");
    if (cartItems && productContainer2) {
        productContainer2.innerHTML = ``;
    
        Object.values(cartItems).map(items =>{
            productContainer2.innerHTML = `

                <header class="row_one">
                    <h2 class=""> CART SUMMARY</h2>
                </header>
                <div class="subTotal">
                    <h2>Subtotal</h2>
                    <h2>Ksh. ${cartCost}</h2>
                </div>
                <button class="checkout" id="btn1">Proceed to Pay</button>
            `
        })
    }
}

function deleteItem() {
    
    var parentElem = this.parentNode.parentNode;
    parentElem.remove();
    var tag = parentElem.querySelector("#box1").getAttribute("src").split("/").pop().split(".")[0];

    var cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    var cartCost = parseInt(localStorage.getItem("totalCost"));
    // var ItemsInCart = 


    if (cartItems[tag]) {
        cartCost -= cartItems[tag].price * cartItems[tag].inCart;
        var incartItems = cartItems[tag].inCart;
        incartItems = incartItems -1;
        console.log(incartItems);
        delete cartItems[tag];
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        localStorage.setItem("totalCost", cartCost);

        
        let productNumbers = localStorage.getItem("cartNumbers");
        productNumbers = (parseInt(productNumbers));
        productNumbers = 0; 

        localStorage.setItem("cartNumbers", productNumbers);
        document.querySelector('#cart-count-info').textContent = productNumbers;
        
    }
}

onLoadCartNUmbers();
displayCart();