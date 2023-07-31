//parte lógica do cartao
const venc = document.querySelector('#vencimento');

venc.addEventListener('blur',(event) =>{
  const vencRegex = /([0-9]{2})([0-9]{2})/;
  let vencValue = venc.value;
  const vencTest = vencRegex.test(vencValue);
  if(vencTest){
    let Vencformatado = String(vencValue).replace(vencRegex, "$1/$2");
    venc.value = Vencformatado;
    console.log(venc.value);
  }else{
    throw new Error("Campo Invalido!")
  }
})

const cpf = document.querySelector('#cpf');

cpf.addEventListener('blur', (event) =>{
   if(validaCpf(cpf.value)){
    formataCpf()
  }else{
    console.log("se fodeu KKKKK")
  }
})



var acceptedCreditCards = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
  elo: '/^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/',
  hipercard : '/^(606282\d{10}(\d{3})?)|(3841\d{15})$/',
};

function validaCartao(value) {
  var value = value.replace(/\D/g, '');
  var sum = 0;
  var shouldDouble = false;
  for (var i = value.length - 1; i >= 0; i--) {
    var digit = parseInt(value.charAt(i));

    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  var valid = (sum % 10) == 0;
  var accepted = false;
  
  Object.keys(acceptedCreditCards).forEach(function(key) {
    let regex = acceptedCreditCards[key];
    if (regex) {
      accepted = true;
    }
  });
  return valid && accepted;
}

const select = document.getElementById('bandeira')
const cartaoNumber = document.getElementById('nmcar');

select.addEventListener('change', function(){
  if(validaCartao(cartaoNumber.value)){
    console.log("prossiga")
  }else{
    "Não deu certo"
  }
});

function validaCpf(cpf){
  cpf = cpf.replace(/\D/g, '');
  if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let result = true;
  [9,10].forEach(function(j){
      var soma = 0, r;
      cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
          soma += parseInt(e) * ((j+2)-(i+1));
      });
      r = soma % 11;
      r = (r <2)?0:11-r;
      if(r != cpf.substring(j, j+1)) result = false;
  });
  return result;
}

function formataCpf(){
  let cpfRegex = /([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/gm
  let cpfTestado = cpfRegex.test(cpf.value)
  if(cpfTestado){
    cpfFormatado = String(cpf.value).replace(cpfRegex, '$1.$2.$3-$4');
    cpf.value = cpfFormatado;
  }
}

function formatarCPF() {
    let inputCPF = document.querySelector("#cpf");
    let value = inputCPF.value.replace(/\D/g, '');
    
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
  
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  
    inputCPF.value = value;
  
    if(inputCPF.value.length < 14){
      document.querySelector(".cadastro").onsubmit = null;
    }
  };