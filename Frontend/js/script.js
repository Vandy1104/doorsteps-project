console.log("front-end");
console.log("JS Working");
console.log("doorsteps connected");

let url;

// form variables
let firstName = '';
let lastName = '';
let email = '';
let phone = '';
let radioInput;
let test;

function clearFields(){
	//  contact fields
	document.getElementById('firstName').value = '';
	document.getElementById('lastName').value = '';
	document.getElementById('email').value = '';
	document.getElementById('phone').value = '';
}

//get url and port from config.json

$.ajax({
  url :'js/config.json',
  type :'GET',
  dataType :'json',
  success : function(configData){
  console.log(configData);
  url = `http://${configData.SERVER_URL}:${configData.SERVER_PORT}`;
},  //success
  error:function(){
    console.log('oops');
  }  //error

});   //Ajax



$(document).ready(function(){

//jquery testing
  // $('h1').click(function(){
  //   console.log("Jquery Working");
  //      $(this).css('background', 'black');
  //   });

  // $('#submit').click(function(){
  //   alert("Thank you!")
  // })

// $('#submit').click(function(){
//     var radios = document.getElementsByName('contact');
//     for (var radio of radios)
//     {
//         if (radio.checked) {
//             alert(radio.value);
//         }
//     }
// })

//email validation starts
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validate = () => {
  const $result = $('#result');
  const email = $('#email').val();
  $result.text('');

  if (validateEmail(email)) {
    $result.text(email + ' is valid :)');
    $result.css('color', 'white');
  } else {
    $result.text(email + ' is not valid :(');
    $result.css('color', 'white');
  }
  return false;
}

$('#email').on('input', validate);
//email validation ends

//Grabs radio button value
$('.help').change(function () {

    var test = $('.help:checked').val();
    alert(test);
});

//Function for targetting thankyou.html
function myFunction(){
    window.location.href="./thankyou.html";
  }

//Adding user's details
  $('#submit').click(function(){
		event.preventDefault();
    // let radioInput = document.getElementsByClassName('help').value;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
		let email = document.getElementById('email').value;
		let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;



    let user = JSON.stringify({
      radioInput: test,
      firstName : firstName,
      lastName : lastName,
      email    : email,
      phone : phone
    });

    console.log(user);

			if((firstName === '') || (lastName === '') || (address === '') || (email === '') || (phone === '') ){
				alert('Please enter all details');
			} else{
				$.ajax({
					url :`${url}/addUser`,
					type :'POST',
					dataType : 'json',
          contentType: "application/json; charset=utf-8",
					data : JSON.stringify({
            radioInput: radioInput,
            firstName : firstName,
            lastName : lastName,
						email    : email,
						phone : phone,
            address:address
					}),
					success : function(addUser){
						console.log(addUser);
            console.log("success achieved");
            console.log(radioInput, firstName, lastName, address, email, phone);
            myFunction();
					},
					// success
					error : function(){
						console.log('Sorry data not sent, Please try again!');
					} // error
				});

			};
    clearFields();
	});     //Register ends


//Reset button
	    $('#resetBtn').click(function(){
				clearFields();
			});

	//view report
	    $('#reportBtn').click(function(){
	      console.log('reportBtn clicked');//checking if button click responds
	      $.ajax({
	      url :`${url}/property-report`,
	      type :'GET',
	      dataType :'json',
	      success : function(userReport){
	        console.log(userReport);
	        document.getElementById('reportCard').innerHTML = "";
	        for(let i=0; i<userReport.length; i++){
	          document.getElementById('reportCard').innerHTML +=
						`<div class="col col-sm-12 col-md-12 col-lg-5 jumbotron border mx-3 mb-5 p-3">
			         <h5 class="mt-3">${userReport[i].firstName} ${userReport[i].lastName}</h5>
			         <span class="">Address :${userReport[i].address}</span></br>
			         <h6 class="">Email : ${userReport[i].email}</h6></br>
							 <h6 class="">Phone :${userReport[i].phone}</h6></br>
						</div>`;
	        }

	        },//success
	        error:function(){
	          console.log('error: cannot call api');
	        }//error

	      });//ajax
	    });// report button


});  //Document ready
