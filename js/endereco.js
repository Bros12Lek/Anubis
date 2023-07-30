//parte lógica do endereço
let cep = document.querySelector('.cep');
let rua = document.querySelector('.rua');
let compl = document.querySelector('.complemento');
let cidade = document.querySelector('.cidade');
let estado = document.querySelector('.estado');

 function buscaEndereco(end){
  fetch(`https://viacep.com.br/ws/${end}/json/`)
  .then((Response) =>{
    return Response.json()
  })
  .then((Response) =>{
    let {logradouro} = Response
    let {complemento} = Response
    let {uf} = Response
    let {localidade} = Response
   
    rua.value = logradouro;
    compl.value = complemento;
    cidade.value = localidade;
    estado.value = uf;
  })
}

function formatacep(){
  let cepRegex = /([0-9]{5})([0-9]{3})/gm
  let testcep = cepRegex.test(cep.value)
  if(testcep){
    cepFormatado = String(cep.value).replace(cepRegex,'$1-$2');
    cep.value = cepFormatado;
  }
}
  
cep.addEventListener('blur', (e) =>{

  if(cep.value.length > 8 || cep.value.length < 8){
    console.log("Se fudeu KKKKK")
  }else{
    buscaEndereco(cep.value);
    formatacep();
  }
})