$(document).ready(function () {

    // Parse any JSON previously stored in allEntries
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntries == null) {

    } else {
        var showTable = existingEntries.length;

        for (i = 0; i < showTable; i++) {
            $("#sNo").append("<tr><td>" + i + "</td></tr>");
            $("#resultF").append("<tr><td>" + existingEntries[i].title + "</td></tr>");
            $("#resultL").append("<tr><td>" + existingEntries[i].text + "</td></tr>");
            $("#age").append("<tr><td>" + existingEntries[i].Age + "</td></tr>");
            $("#gender").append("<tr><td>" + existingEntries[i].gender + "</td></tr>");

            $("#dlt").append("<tr id=" + i + "><td><Button id='dltButton' onClick='delet(this)' class='btn btn-primary'>Delet</button> <Button class='btn btn-primary' data-toggle='modal' data-target='#editModal' id='editButton' onClick='edit(this)'>Edit</button></td></tr>");
            //$("#resultF").append("<tr><td>" + existingEntries[i].title + "</td><td>" + existingEntries[i].text + "</td><td>" + age + "</td></tr>");
        }
    }
    // click button to push the new entry to database
    $("#submit").click(function () {

        if (existingEntries == null) existingEntries = [];
        var fname = $("#fname").val()
        var lname = $("#lname").val()
        var age = $("#Age").val()
        var sex = $("input:radio[name=gender]:checked").val()

        var entry = {
            "title": fname,
            "text": lname,
            "Age": age,
            "gender": sex
        };

        //localStorage.setItem("entry", JSON.stringify(entry));
        // Save allEntries back to local storage
        existingEntries.push(entry);
        localStorage.setItem("allEntries", JSON.stringify(existingEntries));
        /* appending to table */
        //    $("#resultF").append("<tr><td>'+ sNo +'</td><td>" + fname + "</td><td>" + lname + "</td><td>" + age + "</td></tr>");
        location.reload();

    });



    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml3');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({
            loop: true
        })
        .add({
            targets: '.ml3 .letter',
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 2250,
            delay: (el, i) => 150 * (i + 1)
        }).add({
            targets: '.ml3',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });



});

function delet(e) {
    var existingEntries = JSON.parse(localStorage.getItem("allEntries")); //get data 
    var place = $(e).parent().parent().attr("id"); // getting index of item 
    existingEntries.splice(place, 1); //removing using splice 
    localStorage.setItem("allEntries", JSON.stringify(existingEntries)); //storing back to local storage 
    location.reload(); // reload page 

};

function edit(w) {
    $("#editModal")
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    var place = $(w).parent().parent().attr("id");
    console.log(place)
    $("#submit-m").addClass("edit")
    $("#submit-m").attr("editid", place)
    for (i = 0; i < existingEntries.length; i++) {
        if (place == i) {
            var fname = $("#fname-m").val(existingEntries[i].title)
            var lname = $("#lname-m").val(existingEntries[i].text)
            var age = $("#Age-m").val(existingEntries[i].Age)
            var sex = $("input:radio[name=gender-m]:checked").val(existingEntries[i].gender)
        }
    }
}
$("#submit-m").click(function () {
    var d = $(this).attr("editid")
    console.log(d)
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    existingEntries[d].title = $("#fname-m").val()
    existingEntries[d].text = $("#lname-m").val()
    existingEntries[d].Age = $("#Age-m").val()
    existingEntries[d].gender = $("input:radio[name=gender-m]:checked").val()
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
    location.reload();


})
