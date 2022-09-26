var productNameInput = document.getElementById("productName");
var productLastInput = document.getElementById("productLast");
var productEmailInput = document.getElementById("productEmail");
var productPriceInput = document.getElementById("productPrice");
var productDescInput = document.getElementById("productDesc");
var productCategoryInput = document.getElementById("productCategory");


var productsContainer;
if (localStorage.getItem("productsList") == null)
{
    productsContainer = [];
}
else {
    productsContainer = JSON.parse(localStorage.getItem('productsList'));
    displayProducts();
}
function addProduct() {

    var product = {

        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
        Last: productLastInput.value,
        Email: productEmailInput.value,
    }
    productsContainer.push(product);
    localStorage.setItem("productsList", JSON.stringify(productsContainer));
    clearForm();
    displayProducts();

}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
    productLastInput.value = "";
    productEmailInput.value = "";
}

function displayProducts() {

    var cartoona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        cartoona += `<tr>
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].Last}</td>
        <td>${productsContainer[i].Email}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td> <button onclick="prepUpdate(${i}) " class="btn btn-primary">Update</button></td>
        <td> <button onclick="deleteProducts(${i})" class="btn btn-danger">Delete</button></td>
        <td> <button  onclick="updateProducts(${i})" class = "btn btn-success">Confirm</td>
        
    </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}

function searchProducts(term) {
    var cartoona = ``;
    for (var i = 0; i < productsContainer.length; i++) {

        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            cartoona += `<tr>
            <td>${i}</td>
            <td>${productsContainer[i].name}</td>
            <td>${productsContainer[i].Last}</td>
            <td>${productsContainer[i].Email}</td>
            <td>${productsContainer[i].price}</td>
            <td>${productsContainer[i].category}</td>
            <td>${productsContainer[i].desc}</td>
            <td> <button onclick="prepUpdate(${i})" class="btn btn-primary">Update</button></td>
            <td> <button  onclick="deleteProducts(${i})" class="btn btn-danger">Delete</button></td>
            <td> <button  onclick="updateProducts(${i})" class = "btn btn-success">Confirm</td>
        </tr>`;
        }
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}

function deleteProducts(index) {
    productsContainer.splice(index, 1);
    displayProducts();
    localStorage.setItem("productsList", JSON.stringify(productsContainer));
}

function updateProducts(index) {
    if (productNameInput.value != "" && productPriceInput.value != "" 
    && productCategoryInput.value != "" && productDescInput.value != ""
     &&  productsContainer[index].value != "" && productLastInput.value !=""
    && productsContainer[index].value != "" && productEmailInput.value !="")
    
    
    {
        productsContainer[index].name = productNameInput.value;
        productsContainer[index].Last = productLastInput.value;
        productsContainer[index].Email = productEmailInput.value;
        productsContainer[index].price = productPriceInput.value;
        productsContainer[index].category = productCategoryInput.value;
        productsContainer[index].desc = productDescInput.value;
        localStorage.setItem("productsList", JSON.stringify(productsContainer));
        displayProducts()
        clearForm()
    }
    else {
        window.alert("Press the update button first")
    }
}

function prepUpdate(index) {
    productNameInput.value = productsContainer[index].name;
    productPriceInput.value = productsContainer[index].price;
    productCategoryInput.value = productsContainer[index].category;
    productDescInput.value = productsContainer[index].desc;
    productLastInput.value = productsContainer[index].Last;
    productEmailInput.value = productsContainer[index].Email;
}


///////////////////////Download csv files///////////////////

function tableToCSV() {
 
    // Variable to store the final csv data
    var csv_data = [];

    // Get each row data
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {

        
        // Get each column data
        var cols = rows[i].querySelectorAll('td,th');

        // Stores each csv row data
        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {

            // Get the text data of each cell
            // of a row and push it to csvrow
            csvrow.push(cols[j].innerHTML);
        }

        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }

    // collect each row data with new line character
    csv_data = csv_data.join('\n');

    // Call this function to download csv file 
    downloadCSVFile(csv_data);

}

function downloadCSVFile(csv_data) {

    // Create CSV file object and feed
    // our csv_data into it
    CSVFile = new Blob([csv_data], {
        type: "text/csv"
    });

    // Create to temporary link to initiate
    // download process
    var temp_link = document.createElement('a');

    // Download csv file
    temp_link.download = "info.csv";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to
    // trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
}



