let lista;
let acessar;

const pegarTodosOsQuizzes = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
pegarTodosOsQuizzes.then(renderizarTodosOsQuizzes);
console.log(pegarTodosOsQuizzes)

function renderizarTodosOsQuizzes(resposta) {
    lista = resposta.data;
    console.log(lista)

    let selecionado = document.querySelector(".tela01").querySelector(".todosOsQuizzes")
    for(let i = 0; i < 5; i++) {
        selecionado.innerHTML += 
        `
        <div class="imagen" onclick="">
            <img src="${lista[i].image}" alt="">
            <p>${lista[i].title}</p>
        </div>
        `
    }
}

function pagina2(resposta){
    lista = resposta.data

    document.querySelector(".tela01").classList.add("displaynone")
    document.querySelector(".tela02").classList.remove("displaynone")
}

function abrindoQuizz(acessarQuizz){
    acessar = acessarQuizz.id;
    console.log(acessar)
    console.log(acessarQuizz)

    const buscar = axios.get(`${pegarTodosOsQuizzes}/${acessar}`)
    buscar.then(pagina2)
}
