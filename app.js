const productNameInput =document.getElementById('productNameInput');
const productCategoryInput =document.getElementById('productCategoryInput');
const productPriceInput =document.getElementById('productPriceInput');
const productTaxesInput =document.getElementById('productTaxesInput');
const productAdsInput =document.getElementById('productAdsInput');
const productDiscountInput =document.getElementById('productDiscountInput');
const productQuantityInput =document.getElementById('productQuantityInput');
const productDescriptionInput =document.getElementById('productDescriptionInput')
const totalPrice = document.getElementById("total")
const countInput = document.getElementById("count")
const addProductBtn = document.getElementById('addProductBtn');
const updateProductBtn = document.getElementById('updateProductBtn');
const searchInput =document.getElementById('searchInput');
let arr = []; // put data in array to control it ...

// local storage data ...
if(localStorage.getItem("productData")) {
  arr = JSON.parse(localStorage.getItem("productData"))
  displayProduct()
}

// get total ...
function getTotal() {
  if(productPriceInput.value != "") {
    let result = (+productPriceInput.value + +productTaxesInput.value + +productAdsInput.value)
     - +productDiscountInput.value ;
     totalPrice.innerHTML = result
     totalPrice.style.background = "#040"
  }else {
    totalPrice.innerHTML = '';
    totalPrice.style.background = "#dc3545"
  }
}
// add my product ...
addProductBtn.addEventListener("click", addProduct);

function addProduct() {
  const Product = {
    name : productNameInput.value.toLowerCase(),
    category : productCategoryInput.value.toLowerCase(),
    price : productPriceInput.value,
    taxes : productTaxesInput.value,
    ads : productAdsInput.value,
    discount : productDiscountInput.value,
    quantity : productQuantityInput.value,
    desc : productDescriptionInput.value,
    total : totalPrice.innerHTML,
  }
  // validation ...
  if(productNameInput.value != '' && productCategoryInput.value != '' &&
   productPriceInput.value != '' && Product.quantity < 100) {
    if(Product.quantity > 1) {
      for (let i = 0; i < Product.quantity; i++) {
        arr.push(Product);
      }
    }else {
      arr.push(Product);
    }
    clearInputs()
  }
  // save all product in local storage ...
  localStorage.setItem("productData", JSON.stringify(arr))
  displayProduct()
  getTotal();
}

// display product ...
function displayProduct() {

  let cart = "";
  for (let i = 0; i < arr.length; i++) {
    cart +=  `
      <tr>
        <td>${i+1}</td>
        <td>${arr[i].name}</td>
        <td>${arr[i].category}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].taxes}</td>
        <td>${arr[i].ads}</td>
        <td>${arr[i].discount}</td>
        <td>${arr[i].desc}</td>
        <td>${arr[i].total}</td>
        <td><button onClick="setForm(${i})" class="fas fa-pen-to-square btn btn-success"></button></td>
        <td><button onClick="deleteProduct(${i})" class="fas fa-xmark btn btn-danger"></button></td>
      </tr>
    `
  }
  document.getElementById("showData").innerHTML = cart;
  let deleteAllProducts = document.getElementById("delete-all")
  if(arr.length > 0) {
    deleteAllProducts.innerHTML = `
    <button onClick="deleteAll()" class="btn btn-danger w-100 mt-3">Delete All (${arr.length})</button>
    `
  }else {
    deleteAllProducts.innerHTML = ''
  }
}

// Delete Product ...
function deleteProduct(index) {
  arr.splice(index, 1);
  localStorage.setItem("productData", JSON.stringify(arr))
  displayProduct();
}

// delete all product ...
function deleteAll() {
  localStorage.clear()
  arr.splice(0)
  displayProduct()
}

// clear inputs ...
function clearInputs() {
 productNameInput.value = ''
 productCategoryInput.value = ''
 productPriceInput.value = ''
 productTaxesInput.value = ''
 productAdsInput.value = ''
 productDiscountInput.value = ''
 productQuantityInput.value = ''
 productDescriptionInput.value = ''
 totalPrice.innerHTML = ''
}

//  search products ...
let searchMood = 'title'

function getSearchMood(id) {
  if(id == "search-title") {
    searchMood = 'title'
  }else {
    searchMood = 'category'
  }
  searchInput.placeholder = 'Search By '+ searchMood;
  searchInput.focus()
  searchInput.value = ''
  displayProduct()
}

function searchData(value) {
  let cart = '';
  for (let i = 0; i < arr.length; i++) {
    if(searchMood == 'title') {
        if(arr[i].name.includes(value.toLowerCase())) {
          cart +=  `
          <tr>
            <td>${i}</td>
            <td>${arr[i].name}</td>
            <td>${arr[i].category}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].taxes}</td>
            <td>${arr[i].ads}</td>
            <td>${arr[i].discount}</td>
            <td>${arr[i].desc}</td>
            <td>${arr[i].total}</td>
            <td><button onClick="setForm(${i})" class="fas fa-pen-to-square btn btn-success"></button></td>
            <td><button onClick="deleteProduct(${i})" class="fas fa-xmark btn btn-danger"></button></td>
          </tr>
        `
      }
    }else {
        if(arr[i].category.includes(value.toLowerCase())) {
          cart +=  `
          <tr>
            <td>${i}</td>
            <td>${arr[i].name}</td>
            <td>${arr[i].category}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].taxes}</td>
            <td>${arr[i].ads}</td>
            <td>${arr[i].discount}</td>
            <td>${arr[i].desc}</td>
            <td>${arr[i].total}</td>
            <td><button onClick="setForm(${i})" class="fas fa-pen-to-square btn btn-success"></button></td>
            <td><button onClick="deleteProduct(${i})" class="fas fa-xmark btn btn-danger"></button></td>
          </tr>
        `
        }
    }
  }
  document.getElementById("showData").innerHTML = cart;
}

// set data in inputs ...
let x = 0;

function setForm(index) {
  x = index;
  productNameInput.value = arr[index].name
   productCategoryInput.value = arr[index].category
   productPriceInput.value = arr[index].price
   productTaxesInput.value = arr[index].taxes
   productAdsInput.value = arr[index].ads
   productDiscountInput.value = arr[index].discount
   getTotal()
   countInput.style.display = 'none'
   productDescriptionInput.value = arr[index].desc
   addProductBtn.classList.add("d-none")
   updateProductBtn.classList.remove("d-none")
   scroll({
    top: 0,
    behavior: 'smooth'
   })
}

// update my product ...
updateProductBtn.addEventListener("click", updateProduct)

function updateProduct() {
  arr[x].name = productNameInput.value
  arr[x].category = productCategoryInput.value
  arr[x].price = productPriceInput.value
  arr[x].taxes = productTaxesInput.value
  arr[x].ads = productAdsInput.value
  arr[x].discount = productDiscountInput.value
  arr[x].desc = productDescriptionInput.value
  arr[x].total = totalPrice.innerHTML 
  addProductBtn.classList.remove("d-none")
  updateProductBtn.classList.add("d-none")
  localStorage.setItem("productData", JSON.stringify(arr))
  displayProduct()
  clearInputs()
  countInput.style.display = 'block'
  getTotal()
}

// get total 
// add product 
// save all product in local storage
// delete product
// delete all product
// clear inputs after add product and update product
// clean data
// search in products

