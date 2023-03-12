var currentList = {};

function createShoppingList() {
    if ($("#listName").val() != "") { //Checks that text box is not empty
        currentList.name = $("#listName").val(); //Sets name of currentList to the contents of the text box
        currentList.items = new Array(); //Creates an array for storing items of the list

        showShoppingList();
        console.log("New list " + currentList.name + " created");
    }
    
}

function showShoppingList() {
    $("#listTitleText").html(currentList.name); //Set header of list to the title of the current list object
    $("#shoppingListItems").empty(); //Empty out the shopping list
    $("#createListDiv").hide(); //Hide the "create list" menu
    $("#listViewDiv").show(); //Show the listView, allowing the list to be visible and editable

    $("#newItemName").focus(); //Places cursor inside the text box by default
    $("#newItemName").keypress(function (event) { //If enter pressed, creates the list. No need to hit button
        if (event.keyCode == 13) {
            addItem();

        }
    })
}

function addItem() {
    if ($("#newItemName").val() != "") { //Checks that the box is not empty
        var newItem = {}; //Declare a new item for the list
        newItem.name = $("#newItemName").val(); //Sets the name of the new item to the contents of the newItemName field
        currentList.items.push(newItem); //Adds the new item to the list of items
        console.info(newItem.name + " added to list");

        drawItems();
        $("#newItemName").val("");
    }
    
}

function drawItems() {
    var $list = $("#shoppingListItems").empty(); //Create the list

    for (var i = 0; i < currentList.items.length; i++) { //Loop through array of items
        var currentItem = currentList.items[i];
        var $li = $("<li>").html(currentItem.name).attr("id", "item_" + i); //Add a list item to the list, with specified name
        var $deleteBtn = $("<button onclick='deleteItem(" + i + ")'>&#x1F5D1</button>").appendTo($li); //Add delete button
        var $checkBtn = $("<button onclick='checkItem(" + i + ")'>&#x2713</button>").appendTo($li); //Add check button

        $li.appendTo($list); //Append the list item to the list
    }
}

function deleteItem(index) {
    console.info(currentList.items[index].name + " was removed");
    currentList.items.splice(index, 1); //Removes item from list
    
    drawItems();
}

function checkItem(index) {
    if ($("#item_" + index).hasClass("checked")) { //If item is already checked, unchecks it
        $("#item_" + index).removeClass("checked");
        console.info(currentList.items[index].name + " was unchecked");
    }
    else { //Otherwise, adds "checked" class which crosses out the item
        $("#item_" + index).addClass("checked"); 
        console.info(currentList.items[index].name + " was checked");
    }
    
}

function getListById(Id) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "api/<ShoppingListController>/" + Id,
        success: function (result) {
            currentList = result;
            showShoppingList();
            drawItems();
        }

    });
}

var cakeIngredients = {}; //Custom preset cake ingredients list
cakeIngredients.name = "Cake Ingredients List";
cakeIngredients.items = [
    { name: "Milk" },
    { name: "Eggs" },
    { name: "Flour" },
    { name: "Butter" },
    { name: "Baking Soda" },
    { name: "Sugar" },
    { name: "Salt" }
];

var tacoTuesday = {}; //Custom preset taco ingredients list
tacoTuesday.name = "Taco Tuesday List";
tacoTuesday.items = [
    { name: "Tortillas" },
    { name: "Ground Beef" },
    { name: "Lettuce" },
    { name: "Salsa" },
    { name: "Taco Seasoning" }
]

var premadeLists = new Map([
    ["1234", cakeIngredients],
    ["2222", tacoTuesday]
])

$(document).ready(function () {
    console.info("Webpage loaded!"); //Prints to console once webpage loads
    var pageUrl = window.location.href;
    var idIndex = pageUrl.indexOf("?id="); //Checks for custom list ID in URL
    if (idIndex != -1) { //If user has inputted an ID, they are trying to access a premade list
        getListById(pageUrl.substring(idIndex + 4)); //Call getListById and pass in the ID string from URL
    }

    $("#listName").focus(); //Places cursor inside the text box by default
    $("#listName").keypress(function (event) { //If enter pressed, creates the list. No need to hit button
        if (event.keyCode == 13) {
            createShoppingList();
        }
    })
});