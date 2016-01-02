"use strict";

document.getElementById("carImage").addEventListener("click", carImageClick);
document.getElementById("truckImage").addEventListener("click", truckImageClick);
document.getElementById("bikeImage").addEventListener("click", bikeImageClick);
document.getElementById("btnWishList").addEventListener("click", addVehicleToList);
document.getElementById("btnDisplay").addEventListener("click", display);

let selection: string = "";
let wishlist = [];

//I had wanted to put this in the addEventListener or make these a more generic function by 
//passing in the calling element ID, but couldn't get it to work
//Pass in e: Event, then use e.target
//Need to also hide any truck or bike fields
function carImageClick() {

    let cars = document.getElementsByClassName("car");
    let labels = document.getElementsByClassName("carLabel");

    for (let i = 0; i < cars.length; i++) {
        cars[i].className = "form-control car";
    }
    for (let j = 0; j < labels.length; j++) {
        labels[j].className = "carLabel";
    }
    selection = "car";
}
function truckImageClick() {
    let trucks = document.getElementsByClassName("truck");
    let labels = document.getElementsByClassName("truckLabel");

    for (let i = 0; i < trucks.length; i++) {
        trucks[i].className = "form-control truck";
    }
    for (let j = 0; j < labels.length; j++) {
        labels[j].className = "truckLabel";
    }
    //also unhide the car fields
    //Note that this actually results in both truck & car being passed in as selection
    carImageClick();
    selection = "truck";
}
function bikeImageClick() {
    let bikes = document.getElementsByClassName("bike");
    let labels = document.getElementsByClassName("bikeLabel");

    for (let i = 0; i < bikes.length; i++) {
        bikes[i].className = "form-control bike";
    }
    for (let j = 0; j < labels.length; j++) {
        labels[j].className = "bikeLabel";
    }
    //also unhide the car fields
    carImageClick();
    selection = "bike";
}
abstract class Vehicle {
    constructor(public year: number, public make: string, public model: string) {}
}

class Car extends Vehicle {
    constructor(public year: number, public make: string, public model: string, public type: string,
    public color: string) {
        super(year, make, model);
    }
}

class Truck extends Car {
    constructor(public year: number, public make: string, public model: string, public type: string,
        public color: string, public towing: string) {
        super(year, make, model, type, color);
    }
}

class Bike extends Car {
    constructor(public year: number, public make: string, public model: string, public type: string,
        public color: string, public topSpeed: string) {
        super(year, make, model, type, color);
    }
}

function addVehicleToList() {
    let formElements = document.getElementsByClassName("form-control");
    let vehicle = selection;

    switch (vehicle)
    {
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

    let userEntries = [];
    let carProperties = [];
    let propertyList = "";

    for (let property in userCustomizations) {
        userEntries[property] = userCustomizations[property];
    }

    for (var i = 0; i < userEntries.length; i++) {
        
        carProperties[i] = <HTMLInputElement>userEntries[i].value;
    }
    //Should be able to refactor to one function if the below goes into a switch case
    let year = carProperties[0];
    let make = carProperties[1];
    let model = carProperties[2];
    let type = carProperties[3];
    let color = carProperties[4];
    
    let myCar = new Car(year, make, model, type, color);

    addToArray(myCar);
}

function newTruck(userCustomizations) {
    let userEntries = [];
    let truckProperties = [];
    let propertyList = "";

    for (let property in userCustomizations) {
        userEntries[property] = userCustomizations[property];
    }

    for (var i = 0; i < userEntries.length; i++) {

        truckProperties[i] = <HTMLInputElement>userEntries[i].value;
    }
    console.log(propertyList);
    let year = truckProperties[0];
    let make = truckProperties[1];
    let model = truckProperties[2];
    let type = truckProperties[3];
    let color = truckProperties[4];
    let towing = truckProperties[5];

    let myTruck = new Truck(year, make, model, type, color, towing);

    addToArray(myTruck);
}

function newBike(userCustomizations) {
    let userEntries = [];
    let bikeProperties = [];
    let propertyList = "";

    for (let property in userCustomizations) {
        userEntries[property] = userCustomizations[property];
    }

    for (var i = 0; i < userEntries.length; i++) {

        bikeProperties[i] = <HTMLInputElement>userEntries[i].value;
    }
    console.log(propertyList);
    let year = bikeProperties[0];
    let make = bikeProperties[1];
    let model = bikeProperties[2];
    let type = bikeProperties[3];
    let color = bikeProperties[4];
    let topSpeed = bikeProperties[5];

    let myBike = new Bike(year, make, model, type, color, topSpeed);

    addToArray(myBike);
}

function addToArray(item) {
    wishlist.push(item);
    console.log(wishlist);
}

function display() {
    //Need to fix this - currently just shows all "Object"
    //Have to pull properties from each object
    let table = "";

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
    let cars = document.getElementsByClassName("car");
    let carlabels = document.getElementsByClassName("carLabel");

    for (let i = 0; i < cars.length; i++) {
        cars[i].className = "form-control car hidden";
    }
    for (let j = 0; j < carlabels.length; j++) {
        carlabels[j].className = "carLabel hidden";
    }
    let trucks = document.getElementsByClassName("truck");
    let trucklabels = document.getElementsByClassName("truckLabel");

    for (let i = 0; i < trucks.length; i++) {
        trucks[i].className = "form-control truck hidden";
    }
    for (let j = 0; j < trucklabels.length; j++) {
        trucklabels[j].className = "truckLabel hidden";
    }
    let bikes = document.getElementsByClassName("bike");
    let bikelabels = document.getElementsByClassName("bikeLabel");

    for (let i = 0; i < bikes.length; i++) {
        bikes[i].className = "form-control bike hidden";
    }
    for (let j = 0; j < bikelabels.length; j++) {
        bikelabels[j].className = "bikeLabel hidden";
    }


}