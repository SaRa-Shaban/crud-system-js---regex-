

var nameInput = document.getElementById('ProductName');
var categoryInput = document.getElementById('ProductCategory');
var priceInput = document.getElementById('ProductPrice');
var descriptionInput = document.getElementById('ProductDescription');
var searchInput = document.getElementById('productSearch');

let divNameProductAlert = document.getElementById('divNameProductAlert');
let divAllDataAlert = document.getElementById('divAllAlert');

var productsList = []; // datatabase

if(localStorage.getItem('productData') != null){
    productsList = JSON.parse(localStorage.getItem('productData'));
    showData();
}


function createAndUpdate() {

    if (document.getElementById('addProduct').innerHTML == 'add product') {
        createProduct();
    } else if (document.getElementById('addProduct').innerHTML == 'update product') {
        changeProduct();
    }

}


function createProduct() {

    if (validateProductName() && categoryInput.value != ' ' && priceInput.value != ' '  && descriptionInput.value != ' ') {


        var product = {

            pName: nameInput.value,
            price: priceInput.value,
            category: categoryInput.value,
            description: descriptionInput.value
        };

        productsList.push(product);
        // console.log(productsList);

        var x = JSON.stringify(productsList);
        // console.log(x);
        localStorage.setItem('productData', JSON.stringify(productsList));

        // console.log(product);

        showData();

        clearPeoduct();
    }
    else {
        divAllDataAlert.classList.remove('d-none');
    }

}

//declaration function  >>>  hoisting
function clearPeoduct() {
    nameInput.value = ' ';
    priceInput.value = ' ';
    categoryInput.value = ' ';
    descriptionInput.value = ' ';

}

// retrive (display data)
function showData() {

    var trs = ' ';
    for (i = 0; i < productsList.length; i++) {

        trs +=
            `
        <tr>
        <td> ${i+1} </td>
        <td>${productsList[i].pName}</td>
        <td>${productsList[i].price}</td>
        <td>${productsList[i].category}</td>
        <td>${productsList[i].description}</td>
        <td>

            <button class="btn btn-outline-warning"  onclick='update(${i})'  >
                <i class="fa-solid fa-pen"></i>
            </button>

        </td>
        <td>
            <button class="btn btn-outline-danger" onclick='deleteProduct(${i})'>
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </td>
    </tr>     
        `

    }


    //  console.log(trs);

    document.getElementById('tBody').innerHTML = trs;
}

//delete product
function deleteProduct(index) {

    productsList.splice(index, 1);
    console.log(productsList);
    localStorage.setItem('productData', JSON.stringify(productsList));
    showData();

}

//update product
var sameIndex;

function update(index) {
    sameIndex = index;
    document.getElementById('addProduct').innerHTML = 'update product';
    console.log(productsList[index].pName);
    nameInput.value = productsList[index].pName;
    categoryInput.value = productsList[index].category;
    priceInput.value = productsList[index].price;
    descriptionInput.value = productsList[index].description;
}


function changeProduct() {

    var product = {

        pName: nameInput.value,
        price: priceInput.value,
        category: categoryInput.value,
        description: descriptionInput.value
    };

    // var arr = [ 0, 1, 2 ,3, 4  ];

    // arr.splice(2 , 1 , 3);

    // console.log(arr)   o/p   0, 1, 3, 3, 4

    productsList.splice(sameIndex, 1, product);
    console.log(productsList);
    // console.log(product);
    localStorage.setItem('productData', JSON.stringify(productsList));

    showData();

    document.getElementById('addProduct').innerHTML = 'add product';

    clearPeoduct();

}

//search product

// function search2(term){
//     var trs = ''; 
//     for( var i = 0 ; i<productsList.length ; i++){

//     if(productsList[i].name.toLowerCase().includes(term.toLowerCase()) == true){
  
//             trs += `
//             <tr>
//             <td>${i}</td>
//             <td>${productsList[i].name}</td>
//             <td>${productsList[i].category}</td>
//             <td>${productsList[i].price}</td>
//             <td>${productsList[i].description}</td>
//             <td>
//                 <button class="btn btn-outline-warning">
//                     <i class="fa-solid fa-pen"></i>
//                 </button>
//             </td>
//             <td>
//                 <button class="btn btn-outline-danger" onclick="deleteproudact(${i})">
//                     <i class="fa-solid fa-trash-can"></i>
//                 </button>
//             </td>
//         </tr>
//             `
//           }
        
//         tbody.innerHTML = trs;
//     }
    
// }


function search() {
    var trs = '';
    for (var i = 0; i < productsList.length; i++) {

        if (productsList[i].pName.toLowerCase().includes(searchInput.value.toLowerCase()) == true) {

            trs += `
            <tr>
            <td>${i}</td>
            <td>${productsList[i].pName}</td>
            <td>${productsList[i].price}</td>
            <td>${productsList[i].category}</td>
            <td>${productsList[i].description}</td>
            <td>
                <button class="btn btn-outline-warning">
                    <i class="fa-solid fa-pen"></i>
                </button>
            </td>
            <td>
                <button class="btn btn-outline-danger" onclick="deleteproudact(${i})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>
            `
        }

        document.getElementById('tBody').innerHTML = trs;
    }

}




// validation (regular expression) (regex)

function validateProductName() {
    var productNameRegex = /^[A-Z][a-z]{3,10}[0-9]{0,4}$/;
    var producName = nameInput.value;

    if (productNameRegex.test(producName)) {
        nameInput.classList.add('is-valid');
        nameInput.classList.remove('is-invalid');
        divNameProductAlert.classList.add('d-none');
        divAllDataAlert.classList.add('d-none');

        return true;
    }
    else {
        divNameProductAlert.classList.remove('d-none');
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid');

        return false;
    }

}

nameInput.addEventListener('blur', validateProductName);



