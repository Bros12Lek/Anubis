//Senha
function formatarSenha() {
  let inputSenha = document.querySelector("#senha").value;

  let hasLowerCase = inputSenha.match(/[a-z]/) !== null;
  let hasUpperCase = inputSenha.match(/[A-Z]/) !== null;
  let hasNumber = inputSenha.match(/[0-9]/) !== null;

  let senhaAlert = document.querySelector("#senha-alert");
  if (hasLowerCase && hasUpperCase && hasNumber) {
    // Senha válida: permita o envio do formulário ou execute outras ações
    senhaAlert.textContent = "";
    document.querySelector(".cadastro").removeAttribute("onsubmit");
  } else {

    // Senha inválida: impeça o envio do formulário e exiba alerta
    if(!hasLowerCase && !hasUpperCase && !hasNumber){
      senhaAlert.textContent = "⚠️ A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula e um número.";
    }

    if(!hasLowerCase && !hasUpperCase && hasNumber){
      senhaAlert.textContent = "⚠️ A senha deve conter pelo menos uma letra minúscula e uma letra maiúscula";
    }else if(!hasLowerCase && !hasNumber && hasUpperCase){
      senhaAlert.textContent = "⚠️ A senha deve conter pelo menos uma letra minúscula e um número.";
    }else if(!hasUpperCase && !hasNumber && hasLowerCase){
      senhaAlert.textContent = "⚠️ A senha deve conter pelo menos uma letra maiúscula e um número";
    }

    if(!hasLowerCase && hasUpperCase && hasNumber){
      senhaAlert.textContent = "⚠️ A senha deve conter pelo menos uma letra minúscula";
    }else if(!hasUpperCase && hasLowerCase && hasNumber){
      senhaAlert.textContent = "⚠️ A senha deve conter pelo menos uma letra maiúscula";
    }else if(!hasNumber && hasLowerCase && hasUpperCase){
      senhaAlert.textContent = "⚠️ A senha deve conter pelo menos um número";
    }

    document.querySelector(".cadastro").setAttribute("onsubmit", "return false;");
  }
};

function mostrarSenha() {
  let senhaInput = document.querySelector("#senha");
  let senhaTipo = senhaInput.getAttribute("type");

  if (senhaTipo === "password") {
    senhaInput.setAttribute("type", "text");
  } else {
    senhaInput.setAttribute("type", "password");
  }
}

//Celular
function formatarCelular() {
  let inputCelular = document.querySelector("#celular");
  let value = inputCelular.value.replace(/\D/g, '');

  if(value.length > 11){
    value = value.slice(0, 11);
  }

  value = value.replace(/(\d{1})(\d)/, '($1$2)');
  value = value.replace(/(\d{5})(\d)/, '$1-$2')

  inputCelular.value = value;

  if(inputCelular.value.length < 14){
    document.querySelector(".cadastro").setAttribute("onsubmit", "return false;");
  }
}

//CPF
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
