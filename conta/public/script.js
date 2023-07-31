  // Function to render the Cartões salvos table
  function renderCartoesTable(cartoes) {
    const cartoesTable = document.getElementById('cartoesTable');
    const table = document.createElement('table');

    // Create table header
    const headerRow = table.insertRow();
    headerRow.insertCell().textContent = 'Número';
    headerRow.insertCell().textContent = 'Bandeira';
    headerRow.insertCell().textContent = 'Nome no Cartão';
    // Add more headers as needed

    // Create table rows with data from the cartoes array
    cartoes.forEach((cartao) => {
      const row = table.insertRow();
      row.insertCell().textContent = cartao.numero;
      row.insertCell().textContent = cartao.bandeira;
      row.insertCell().textContent = cartao.nome_cartao;
      // Add more cells with other data as needed
    });

    cartoesTable.appendChild(table);
  }

  // Function to render the Endereços salvos table
  function renderEnderecosTable(enderecos) {
    const enderecosTable = document.getElementById('enderecosTable');
    const table = document.createElement('table');

    // Create table header
    const headerRow = table.insertRow();
    headerRow.insertCell().textContent = 'CEP';
    headerRow.insertCell().textContent = 'Bairro';
    headerRow.insertCell().textContent = 'Rua';
    // Add more headers as needed

    // Create table rows with data from the enderecos array
    enderecos.forEach((endereco) => {
      const row = table.insertRow();
      row.insertCell().textContent = endereco.cep;
      row.insertCell().textContent = endereco.bairro;
      row.insertCell().textContent = endereco.rua;
      // Add more cells with other data as needed
    });

    enderecosTable.appendChild(table);
  }

  // Fetch data from the server and render tables when the page is loaded
  window.addEventListener('DOMContentLoaded', () => {
    fetch('/conta/data')
      .then((response) => response.json())
      .then((data) => {
        renderCartoesTable(data.cartoes);
        renderEnderecosTable(data.enderecos);
      })
      .catch((error) => console.error('Error fetching data:', error));
  });