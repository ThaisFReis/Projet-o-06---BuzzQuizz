const pegarTodosOsQuizzes = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
pegarTodosOsQuizzes.then(renderizarTodosOsQuizzes);
console.log(pegarTodosOsQuizzes)

function renderizarTodosOsQuizzes(resposta) {
    let lista = resposta.data;
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