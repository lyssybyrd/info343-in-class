//put interpreter into strict mode
"use strict";

console.log(numeral(BABYNAMES.length).format("0,0"));

function compareSex(sex) {
    return function(record) {
        return sex == record.sex;
    }
}
// Sorting & comparing
function compareByCount(rec1, rec2) {
    return rec1.count-rec2.count;
}
function descending(comparator) {
    return function(rec1, rec2) {
        return -(comparator(rec1,rec2));
    }
}

var females = BABYNAMES.filter(compareSex("F"));
females.sort(descending(compareByCount));

console.log(females.length);

var males = BABYNAMES.filter(compareSex("M"));
console.log(males.length);

var currentSet = BABYNAMES;
var tbody = document.querySelector("tbody");

function render (records) {
        // clears hmtl
    tbody.innerHTML = "";
    
    records.forEach(function(record) {
        var tr = document.createElement("tr");
        tr.classList.add("sex-" + record.sex.toLowerCase());

        var td = document.createElement("td");
        td.textContent= record.name;
        tr.appendChild(td);

        td = document.createElement("td");
        td.textContent= record.sex;
        tr.appendChild(td);

        td = document.createElement("td");
        td.textContent= record.count;
        tr.appendChild(td);   

        tbody.appendChild(tr); 
    });
}
// render(BABYNAMES);
//gets the top 100 female names 
// render(females.slice(0,100));

// takes input from the input box
var searchInput = document.getElementById("name-search-input");
searchInput.addEventListener("input", function() {
    // console.log("input event");
    var query = searchInput.value.toLowerCase();
    if (query.length <2) {
        render(BABYNAMES);
        return;
    }
    var matches = BABYNAMES.filter(function(record) {
        return record.name.toLowerCase().indexOf(query) >= 0;
    });
    render(matches);
});
//makes the count column clickable. sorts it by count
var countColHeading = document.getElementById("count-col-header");
countColHeading.addEventListener("click", function() {
    // console.log("clicked col header!");
    BABYNAMES.sort(descending(compareByCount));
    render(BABYNAMES);
});