"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
document.getElementById("carImage").addEventListener("click", carImageClick);
document.getElementById("truckImage").addEventListener("click", truckImageClick);
document.getElementById("bikeImage").addEventListener("click", bikeImageClick);
document.getElementById("btnWishList").addEventListener("click", addVehicleToList);
document.getElementById("btnDisplay").addEventListener("click", display);
var selection = "";
var wishlist = [];
//I had wanted to put this in the addEventListener or make these a more generic function by 
//passing in the calling element ID, but couldn't get it to work
//Pass in e: Event, then use e.target
//Need to also hide any truck or bike fields
function carImageClick() {
    var cars = document.getElementsByClassName("car");
    var labels = document.getElementsByClassName("carLabel");
    for (var i = 0; i < cars.length; i++) {
        cars[i].className = "form-control car";
    }
    for (var j = 0; j < labels.length; j++) {
        labels[j].className = "carLabel";
    }
    selection = "car";
}
function truckImageClick() {
    var trucks = document.getElementsByClassName("truck");
    var labels = document.getElementsByClassName("truckLabel");
    for (var i = 0; i < trucks.length; i++) {
        trucks[i].className = "form-control truck";
    }
    for (var j = 0; j < labels.length; j++) {
        labels[j].className = "truckLabel";
    }
    //also unhide the car fields
    //Note that this actually results in both truck & car being passed in as selection
    carImageClick();
    selection = "truck";
}
function bikeImageClick() {
    var bikes = document.getElementsByClassName("bike");
    var labels = document.getElementsByClassName("bikeLabel");
    for (var i = 0; i < bikes.length; i++) {
        bikes[i].className = "form-control bike";
    }
    for (var j = 0; j < labels.length; j++) {
        labels[j].className = "bikeLabel";
    }
    //also unhide the car fields
    carImageClick();
    selection = "bike";
}
var Vehicle = (function () {
    function Vehicle(year, make, model) {
        this.year = year;
        this.make = make;
        this.model = model;
    }
    return Vehicle;
})();
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(year, make, model, type, color) {
        _super.call(this, year, make, model);
        this.year = year;
        this.make = make;
        this.model = model;
        this.type = type;
        this.color = color;
    }
    return Car;
})(Vehicle);
var Truck = (function (_super) {
    __extends(Truck, _super);
    function Truck(year, make, model, type, color, towing) {
        _super.call(this, year, make, model, type, color);
        this.year = year;
        this.make = make;
        this.model = model;
        this.type = type;
        this.color = color;
        this.towing = towing;
    }
    return Truck;
})(Car);
var Bike = (function (_super) {
    __extends(Bike, _super);
    function Bike(year, make, model, type, color, topSpeed) {
        _super.call(this, year, make, model, type, color);
        this.year = year;
        this.make = make;
        this.model = model;
        this.type = type;
        this.color = color;
        this.topSpeed = topSpeed;
    }
    return Bike;
})(Car);
function addVehicleToList() {
    var formElements = document.getElementsByClassName("form-control");
    var vehicle = selection;
    switch (vehicle) {
        case "car":
            newCar(formElements);
            break;
        case "truck":
            newTruck(formElements);
        case "bike":
            newBike(formElements);
    }
    resetFields();
}
//Can refactor the three new"X" functions down to one function and do switch in here
function newCar(userCustomizations) {
    var userEntries = [];
    var carProperties = [];
    var propertyList = "";
    for (var property in userCustomizations) {
        userEntries[property] = userCustomizations[property];
    }
    for (var i = 0; i < userEntries.length; i++) {
        carProperties[i] = userEntries[i].value;
    }
    //Should be able to refactor to one function if the below goes into a switch case
    var year = carProperties[0];
    var make = carProperties[1];
    var model = carProperties[2];
    var type = carProperties[3];
    var color = carProperties[4];
    var myCar = new Car(year, make, model, type, color);
    addToArray(myCar);
}
function newTruck(userCustomizations) {
    var userEntries = [];
    var truckProperties = [];
    var propertyList = "";
    for (var property in userCustomizations) {
        userEntries[property] = userCustomizations[property];
    }
    for (var i = 0; i < userEntries.length; i++) {
        truckProperties[i] = userEntries[i].value;
    }
    console.log(propertyList);
    var year = truckProperties[0];
    var make = truckProperties[1];
    var model = truckProperties[2];
    var type = truckProperties[3];
    var color = truckProperties[4];
    var towing = truckProperties[5];
    var myTruck = new Truck(year, make, model, type, color, towing);
    addToArray(myTruck);
}
function newBike(userCustomizations) {
    var userEntries = [];
    var bikeProperties = [];
    var propertyList = "";
    for (var property in userCustomizations) {
        userEntries[property] = userCustomizations[property];
    }
    for (var i = 0; i < userEntries.length; i++) {
        bikeProperties[i] = userEntries[i].value;
    }
    console.log(propertyList);
    var year = bikeProperties[0];
    var make = bikeProperties[1];
    var model = bikeProperties[2];
    var type = bikeProperties[3];
    var color = bikeProperties[4];
    var topSpeed = bikeProperties[5];
    var myBike = new Bike(year, make, model, type, color, topSpeed);
    addToArray(myBike);
}
function addToArray(item) {
    wishlist.push(item);
    console.log(wishlist);
}
function display() {
    //Need to fix this - currently just shows all "Object"
    //Have to pull properties from each object
    var table = "";
    table += "<table class='table table-striped'";
    table += "<tr><th>Year</th><th>Make</th><th>Model</th><th>Type</th><th>Color</th><th>Towing</th><th>Top Speed</th><tr>";
    for (var i = 0; i < wishlist.length; i++) {
        table += "<tr>";
        table += "<td>" + wishlist[i] + "</td>";
        table += "<td>" + wishlist[i] + "</td>";
        table += "<td>" + wishlist[i] + "</td>";
        table += "<td>" + wishlist[i] + "</td>";
        table += "<td>" + wishlist[i] + "</td>";
        table += "<td>" + wishlist[i] + "</td>";
        table += "<td>" + wishlist[i] + "</td>";
        table += "</tr>";
    }
    table += "</table>";
    //document.getElementById("display").innerHTML = h;
    $("#displayTable").html(table);
}
//Need to clear out the fields also
function resetFields() {
    var cars = document.getElementsByClassName("car");
    var carlabels = document.getElementsByClassName("carLabel");
    for (var i = 0; i < cars.length; i++) {
        cars[i].className = "form-control car hidden";
    }
    for (var j = 0; j < carlabels.length; j++) {
        carlabels[j].className = "carLabel hidden";
    }
    var trucks = document.getElementsByClassName("truck");
    var trucklabels = document.getElementsByClassName("truckLabel");
    for (var i = 0; i < trucks.length; i++) {
        trucks[i].className = "form-control truck hidden";
    }
    for (var j = 0; j < trucklabels.length; j++) {
        trucklabels[j].className = "truckLabel hidden";
    }
    var bikes = document.getElementsByClassName("bike");
    var bikelabels = document.getElementsByClassName("bikeLabel");
    for (var i = 0; i < bikes.length; i++) {
        bikes[i].className = "form-control bike hidden";
    }
    for (var j = 0; j < bikelabels.length; j++) {
        bikelabels[j].className = "bikeLabel hidden";
    }
}
//# sourceMappingURL=vehicle.js.map