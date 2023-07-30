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