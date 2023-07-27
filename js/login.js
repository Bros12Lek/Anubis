let btn = document.querySelector('.btnLogin');
let form = document.querySelector('form');
let inputEmail = document.querySelector('#email')

form.addEventListener('invalid', (e) =>{
    e.preventDefault()
    console.log(e);
})