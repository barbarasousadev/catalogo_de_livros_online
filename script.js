const titulo = document.querySelector("#titulo")
const autor = document.querySelector("#autor")
const genero = document.querySelector("#genero")
const anoDePublicacao = document.querySelector("#anoDePublicacao")

const formulario = document.querySelector("#formulario")
const busca = document.querySelector("#busca") 
const todosOsLivros = document.querySelector("#todosOsLivros")

const listaDeLivros = JSON.parse(localStorage.getItem("biblioteca")) || []

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault()

  const livroEscolhido = {
    titulo: titulo.value,
    autor: autor.value,
    genero: genero.value,
    anoDePublicacao: Number(anoDePublicacao.value),
  }

  listaDeLivros.push(livroEscolhido)

  localStorage.setItem("biblioteca", JSON.stringify(listaDeLivros))

  formulario.reset()
  titulo.focus()

  livroNaTela()
})

// Função de busca
busca.addEventListener("input", () => {
  const termoDeBusca = busca.value.toLowerCase()
  const livrosFiltrados = listaDeLivros.filter(livro => 
    livro.titulo.toLowerCase().includes(termoDeBusca) ||
    livro.autor.toLowerCase().includes(termoDeBusca) ||
    livro.genero.toLowerCase().includes(termoDeBusca)
  )
  livroNaTela(livrosFiltrados)
})

function livroNaTela(livros = listaDeLivros) {
  todosOsLivros.innerHTML = ""

  livros.forEach((livroDaVez) => {
    const novo_card = document.createElement("div")
    novo_card.className = "card"
  
    const novoTitulo = document.createElement("h2")
    novoTitulo.textContent = livroDaVez.titulo
  
    const novoAutor = document.createElement("p")
    novoAutor.textContent = livroDaVez.autor
  
    const novoGenero = document.createElement("p")
    novoGenero.textContent = livroDaVez.genero
    
    const novoAnoDePublicacao = document.createElement("p")
    novoAnoDePublicacao.textContent = livroDaVez.anoDePublicacao
  
    novo_card.append(novoTitulo, novoAutor, novoGenero, novoAnoDePublicacao)
    todosOsLivros.appendChild(novo_card)
  })
}

livroNaTela()
