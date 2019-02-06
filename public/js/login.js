$("#login").on("click", function () {
    var user = {
        email: $("#email").val().trim(),
        password: $("#password").val().trim()
    };

    if (user.email == "" || user.password == "") { return false }

    $.ajax("api/login", {
        type: "POST",
        data: user
    }).then(
        function () {
        }
    )
})

$("#register").on("click", function (event) {

    var newUser = {
        first_name: $("#first-name").val().trim(),
        last_name: $("#last-name").val().trim(),
        email: $("#email").val().trim(),
        password: $("#password").val().trim(),
    };

    if (newUser.first_name == "" || newUser.last_name == "" || newUser.email == "" || newUser.password == "") {
        event.preventDefault();
        alert("Please fill out all fields");
        return
    }

    $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        type: "POST",
        data: JSON.stringify(newUser),
        url: "api/register"
    }).then(
        function () {
            console.log(newUser);
        }
    )
})