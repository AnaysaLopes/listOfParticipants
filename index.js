let participantes = [
  {
    nome: "Larissa Costa",
    email: "larissa.costa@example.com",
    dataInscricao: new Date(2023, 10, 1, 14, 30),
    dataCheckIn: new Date(2024, 3, 1, 18, 20)
  },
  {
    nome: "Rafael Oliveira",
    email: "rafael.oliveira@example.com",
    dataInscricao: new Date(2024, 1, 28, 09, 13),
    dataCheckIn: new Date(2024, 3, 1, 07, 07)
  },
  {
    nome: "Mariana Santos",
    email: "mariana.santos@example.com",
    dataInscricao: new Date(2024, 0, 08, 10, 10),
    dataCheckIn: null
  },
  {
    nome: "Gustavo Pereira",
    email: "gustavo.pereira@example.com",
    dataInscricao: new Date(2023, 11, 28, 19, 23),
    dataCheckIn: new Date(2024, 1, 1, 20, 20)
  },
  {
    nome: "Carolina Rodrigues",
    email: "carolina.rodrigues@example.com",
    dataInscricao: new Date(2023, 10, 5, 05, 33),
    dataCheckIn: new Date(2024, 0, 7, 06, 10)
  },
  {
    nome: "Fernando Almeida",
    email: "fernando.almeida@example.com",
    dataInscricao: new Date(2023, 10, 28, 08, 22),
    dataCheckIn: null
  },
  {
    nome: "Natália Silva",
    email: "natalia.silva@example.com",
    dataInscricao: new Date(2023, 9, 10, 19, 25),
    dataCheckIn: new Date(2024, 1, 8, 16, 20)
  },
  {
    nome: "Vinícius Lima",
    email: "vinicius.lima@example.com",
    dataInscricao: new Date(2023, 6, 2, 21, 21),
    dataCheckIn: new Date(2023, 11, 14, 20, 20)
  },
  {
    nome: "Renata Gonçalves",
    email: "renata.goncalves@example.com",
    dataInscricao: new Date(2023, 7, 20, 15, 15),
    dataCheckIn: null
  },
  {
    nome: "Bruno Ferreira",
    email: "bruno.ferreira@example.com",
    dataInscricao: new Date(2024, 03, 01, 19, 23),
    dataCheckIn: null
  }
];



const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)
  
  //condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null  
  }

  // verificar se o particpante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?' 

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email  
  )
  
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}