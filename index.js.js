var password = "1234";

function passcheck() {

if(document.getElementById('pass1').value != password) {
alert('Wrong Password, Try again!');
return false;
}

if (document.getElementById('pass1').value == password) {
alert('Correct Password.Click OK to enter admin page.');
}
}