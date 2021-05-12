(function ($) {
    $(".clickable-row").click(function() {
        let href = $(this).find("a").attr("href");
        if (href) {
            window.location = href;
        }
    });
});

// for name or state filter
function fName(id, col) {
    let input, filter, table, row, i, txtValue;
    input = document.getElementById(id);
    filter = input.value.toUpperCase();
    rows = document.getElementsByClassName("clickable-row");
    let count = 0;

    for (i = 0; i < rows.length; i++) {
        row = rows[i]; // traverse sites
        txtValue = row.cell[col].innerHTML;
        if (txtValue.toUpperCase().indexOf(filter) > -1) { //returns -1 if cannot find filter in any position of txtValue
            row.style.display = "";
            count += 1;
        } else {
            row.style.display = "none";
        }
    }

    table = document.getElementsByClassName("m-5")[1];
    no_table = document.getElementById("no-result");

    if (count == 0) {
        table.hidden = true;
        no_table.hidden = false;
    } else {
        table.hidden = false;
        no_table.hidden = true;
    }
}

// for rating filter
function fNum(id, col, compareFn = (a, b) => a >= b) { // rating above
    let input, filter, table, row, i, txtValue;
    input = document.getElementById(id);
    filter = parseFloat(input.value);
    rows = document.getElementsByClassName("clickable-row");
    let count = 0;
    for (i = 0; i < rows.length; i++) {
        row = rows[i];
        txtValue = parseFloat(row.cell[col].innerHTML);
        if (compareFn(txtValue, filter)) {
            row.style.display = "";
            count += 1;
        } else {
            row.style.display = "none";
        }
    }

    table = document.getElementsByClassName("m-5")[1];
    no_table= document.getElementById("no-result");

    if (count == 0) {
        table.hidden = true;
        no_table.hidden = false;
    } else {
        table.hidden = false;
        no_table.hidden = true;
    }

}

var rate = document.getElementById("rate");
var rating = document.getElementById("rating");
rate.innerHTML = rating.value;
rating.oninput = function() {
    rate.innerHTML = this.value;
}