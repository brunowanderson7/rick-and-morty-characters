const link = {
  previw: null,
  current: "https://rickandmortyapi.com/api/character",
  next: "https://rickandmortyapi.com/api/character/?page=2"
}
const linkSearch = {
  link: null,
  amount: null,
  id: 0
}


async function renderizaCards(linkApi) {
  const lista = document.querySelector('#cardList')

  lista.innerHTML = ""

  const listaDeDados = await fetch(linkApi, {
    method: "GET"
  })
  .then(function(resposta) {
    return resposta.json()
  })

  link.previw = listaDeDados.info.prev
  link.current = linkApi
  link.next = listaDeDados.info.next


  for(let indice = 0; indice < listaDeDados.results.length; indice++) {
    const elemento = listaDeDados.results[indice]

    const li = document.createElement("li")
    const divFrente = document.createElement('div')
    const divVerso = document.createElement('div')
    const divNomeFrente = document.createElement('div')
    const divNomeVerso = document.createElement('div')
    const listaDados = document.createElement('ul')
    const especie = document.createElement('li')
    const status = document.createElement('li')
    const gender = document.createElement('li')
    const origin = document.createElement('li')
    const imagem = document.createElement('img')

    li.classList.add('card', 'listCard')
    divFrente.classList.add("face")
    divFrente.classList.add("front")

    divNomeFrente.classList.add("titleCard")
    divNomeFrente.innerText = elemento.name

    divNomeVerso.classList.add("titleCard")
    divNomeVerso.innerText = elemento.name

    listaDados.classList.add("cardData")

    especie.innerText = 'Espécie: ' + elemento.species
    status.innerText = 'Status: ' + elemento.status
    gender.innerText = 'Gender: ' + elemento.gender
    origin.innerText = 'Origin: ' + elemento.origin.name


    divVerso.classList.add('face', 'back')

    imagem.src = elemento.image
    imagem.alt = elemento.name

    listaDados.append(especie, gender, origin, status)
    divFrente.append(divNomeFrente, listaDados)
    divVerso.append(divNomeVerso, imagem)
    li.append(divFrente, divVerso)
    lista.append(li)
  }
  viraCard()
}

function viraCard() {
  const cards = document.querySelectorAll('.listCard')

  for(let indice = 0; indice < cards.length; indice++) {
    const card = cards[indice]

    card.addEventListener('click', function() {
      card.classList.toggle('flip')
    })
  }
}

async function cardSearch(linkSearch) {
  const lista = document.querySelector('#cardSearch')

  lista.innerHTML = ""

  const listaDeDados = await fetch(linkSearch.link, {
    method: "GET"
  })
  .then(function(resposta) {
    return resposta.json()
  })

  linkSearch.amount = listaDeDados.info.count
  linkSearch.pages = listaDeDados.info.pages
  const elemento = listaDeDados.results[linkSearch.id]

  const li = document.createElement("li")
  const divFrente = document.createElement('div')
  const divVerso = document.createElement('div')
  const divNomeFrente = document.createElement('div')
  const divNomeVerso = document.createElement('div')
  const listaDados = document.createElement('ul')
  const especie = document.createElement('li')
  const status = document.createElement('li')
  const gender = document.createElement('li')
  const origin = document.createElement('li')
  const imagem = document.createElement('img')

  li.classList.add('card', 'listCard')
  divFrente.classList.add("face");
  divFrente.classList.add("front");

  divNomeFrente.classList.add("titleCard")
  divNomeFrente.innerText = elemento.name

  divNomeVerso.classList.add("titleCard")
  divNomeVerso.innerText = elemento.name

  listaDados.classList.add("cardData")

  especie.innerText = 'Specie: ' + elemento.species
  status.innerText = 'Status: ' + elemento.status
  gender.innerText = 'Gender: ' + elemento.gender
  origin.innerText = 'Origin: ' + elemento.origin.name


  divVerso.classList.add('face', 'back')

  imagem.src = elemento.image
  imagem.alt = elemento.name

  listaDados.append(especie, gender, origin, status)
  divFrente.append(divNomeFrente, listaDados)
  divVerso.append(divNomeVerso, imagem)
  li.append(divFrente, divVerso)
  lista.append(li)

  viraCard()
}

function clickButton(linkSearch) {
  const buttonNext = document.querySelector('#btnNext')
  const buttonPrev = document.querySelector('#btnPrev')
  const buttonPrevSearch = document.querySelector('#btnPrevSearch')
  const buttonNextSearch = document.querySelector('#btnNextSearch')
  const inputSearch = document.querySelector('#btnInputSearch')


  buttonNext.addEventListener('click', function() {
    renderizaCards(link.next)
  })

  buttonPrev.addEventListener('click', function() {
    if (link.previw != null) {
      renderizaCards(link.previw)
    }
  })

  inputSearch.addEventListener('click', function() {
    const input = document.querySelector('#inputName').value
    linkSearch.link = `https://rickandmortyapi.com/api/character/?name=${input}`
    linkSearch.id = 0
    cardSearch(linkSearch)
  })

  buttonNextSearch.addEventListener('click', function() {
    if (linkSearch.id < linkSearch.amount-1 && linkSearch.id < 19) {
      linkSearch.id++
      cardSearch(linkSearch)
    }
  })

  buttonPrevSearch.addEventListener('click', function() {
    if (linkSearch.id > 0) {
      linkSearch.id--
      cardSearch(linkSearch)
    }
  })
}


renderizaCards(link.current)
clickButton(linkSearch)