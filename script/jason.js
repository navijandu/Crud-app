$(document).ready(function () {

    // Parse any JSON previously stored in allEntries
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntries == null) {

    } else {
        var showTable = existingEntries.length;

        for (i = 0; i < showTable; i++) {
            /*Appending data to table */
            $("tbody").append("<tr><td>" + i + "</td><td>" + existingEntries[i].title + "</td><td>" + existingEntries[i].text + "</td><td>" + existingEntries[i].Age + "</td><td>" + existingEntries[i].gender + "</td><td id=" + i + "><Button id='dltButton' onClick='delet(this)' class='btn btn-warning'>DELETE</button> <Button class='btn btn-primary' data-toggle='modal' data-target='#editModal' id='editButton' onClick='edit(this)'>EDIT INFO</button></td></tr>")

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
   var settings = {
  "url": "https://ser91.herokuapp.com/j1",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  },
  "data": JSON.stringify(entry),
};

$.ajax(settings).done(function (response) {
	console.log(response)
  if(response == "failed"){
	  alert("please fill required feilds ")
  }else{
	  // Save allEntries back to local storage
        existingEntries.push(response);
       localStorage.setItem("allEntries", JSON.stringify(existingEntries));

       location.reload(); 
  }
});

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

    /*Edit funcation*/
    $("#submit-m").click(function () {
        var d = $(this).attr("editid")
        var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
        existingEntries[d].title = $("#fname-m").val()
        existingEntries[d].text = $("#lname-m").val()
        existingEntries[d].Age = $("#Age-m").val()
        existingEntries[d].gender = $("input:radio[name=gender-m]:checked").val()
        localStorage.setItem("allEntries", JSON.stringify(existingEntries));
        location.reload();
    });
    /*Edit funcation end */


}); //Document .ready closing 

/*delet the item on delt button click */
function delet(e) {
    alert("Are You Sure you want to DELETE item ?")
    var existingEntries = JSON.parse(localStorage.getItem("allEntries")); //get data 
    var place = $(e).parent().parent().attr("id"); // getting index of item 
    existingEntries.splice(place, 1); //removing using splice 
    localStorage.setItem("allEntries", JSON.stringify(existingEntries)); //storing back to local storage 
    location.reload(); // reload page 

};
/*Edit funcation start on click of edit button*/
function edit(w) {
    $("#editModal")
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    var place = $(w).parent().parent().attr("id");
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
/*Edit funcation*/
