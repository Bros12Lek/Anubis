let qnt = document.querySelector('#qnt');
let btnAdd = document.querySelector('.btnAdd');
let btnDel = document.querySelector('.btnDel');

qnt.value = 0

btnAdd.addEventListener('click' , () =>{
    qnt.value++
})

btnDel.addEventListener('click', () =>{
    if(qnt.value == 0){
        throw new Error("Você já estipulou a contagem mínima")
    }else{
        qnt.value--
    }
})