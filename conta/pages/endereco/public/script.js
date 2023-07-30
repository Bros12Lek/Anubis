// URL base da API do IBGE
const baseUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/';

// Função para carregar os estados na lista de seleção
function carregarEstados() {
    const estadoSelect = document.getElementById('estado');
    axios.get(baseUrl + 'estados')
        .then(response => {
            response.data.forEach(estado => {
                const option = document.createElement('option');
                option.value = estado.id;
                option.textContent = estado.nome;
                estadoSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar estados: ', error);
        });
}

// Função para carregar as cidades do estado selecionado
function carregarCidades() {
    const estadoSelect = document.getElementById('estado');
    const cidadeSelect = document.getElementById('cidade');
    const estadoId = estadoSelect.value;

    // Limpa as opções de cidades
    cidadeSelect.innerHTML = '<option value="">Carregando...</option>';

    if (estadoId !== '') {
        axios.get(baseUrl + `estados/${estadoId}/municipios`)
            .then(response => {
                cidadeSelect.innerHTML = '<option value="">Selecione uma Cidade</option>';
                response.data.forEach(cidade => {
                    const option = document.createElement('option');
                    option.value = cidade.id;
                    option.textContent = cidade.nome;
                    cidadeSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar cidades: ', error);
            });
    }
}

// Carregar os estados ao carregar a página
carregarEstados();