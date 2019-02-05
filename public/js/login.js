$("#login").on("click", function(){
    var user = {
        email: $("#email").val().trim(),
        password: $("#password").val().trim()
    };
     
    if (user.email == "" || user.password == "") {return false}

    $.ajax("api/login", {
        type:"POST",
        data: user
    }).then(
        function() {
        }
    )

})

$("#register").on("click", function(){
    var newUser = {
        first_name: $("#first-name").val().trim(),
        last_name: $("#last-name").val().trim(),
        email: $("#email").val().trim(),
        password: $("#password").val().trim(),
    };
     
    if (newUser.first_name == "" || newUser.last_name == "" || newUser.email == "" || newUser.password == "") {return false}

    $.ajax( {
        headers: {
            "Content-Type": "application/json"
          },
        type:"POST",
        data:JSON.stringify(newUser),
        url: "api/register" 
    }).then(
        function() {
            console.log(newUser);
        }
    )
})



        // connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
        //     if (error) {
        //         // console.log("error ocurred",error);
        //         res.send({
        //             "code": 400,
        //             "failed": "error ocurred"
        //         })
        //     } else {
        //         // console.log('The solution is: ', results);
        //         if (results.length > 0) {
        //             if (results[0].password == password) {
        //                 res.send({
        //                     "code": 200,
        //                     "success": "login sucessfull"
        //                 });
        //             }
        //             else {
        //                 res.send({
        //                     "code": 204,
        //                     "success": "Email and password does not match"
        //                 });
        //             }
        //         }
        //         else {
        //             res.send({
        //                 "code": 204,
        //                 "success": "Email does not exits"
        //             });
        //         }
        //     }
        // });
        
        
        
        
        // var today = new Date();
        // var users = {
        //     "first_name": req.body.first_name,
        //     "last_name": req.body.last_name,
        //     "email": req.body.email,
        //     "password": req.body.password,
        //     "created": today,
        //     "modified": today
        // }
        // connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        //     if (error) {
        //         console.log("error ocurred", error);
        //         res.send({
        //             "code": 400,
        //             "failed": "error ocurred"
        //         })
        //     } else {
        //         console.log('The solution is: ', results);
        //         res.send({
        //             "code": 200,
        //             "success": "user registered sucessfully"
        //         });
        //     }
        // });
