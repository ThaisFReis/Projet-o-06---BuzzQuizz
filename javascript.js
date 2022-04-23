let lista;
let i = 0;
let blocoDasRespostas = "";
let elementoParente;
let selecionaAResposta;
let elementoSelecionado;

// API
const pegarTodosOsQuizzes = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
pegarTodosOsQuizzes.then(renderizarTodosOsQuizzes);
pegarTodosOsQuizzes.catch(function (){ window.location.reload})
console.log(pegarTodosOsQuizzes)

function renderizarTodosOsQuizzes(resposta) {
    lista = resposta.data;
    console.log(lista)

    let selecionado = document.querySelector(".tela01").querySelector(".todosOsQuizzes")
    for(let i = 0; i < lista.length; i++) {
        selecionado.innerHTML += 
        `
        <div class="imagen" onclick="abrindoQuizz(this)">
            <img src="${lista[i].image}" alt="">
            <p>${lista[i].title}</p>
        </div>
        `
    }

    return lista
}

function abrindoQuizz(acessarQuizz){
    let acessar = null;
    acessar = acessarQuizz.id;

    console.log(acessarQuizz)

    const buscar = axios.get(`${pegarTodosOsQuizzes}/${acessar}`) //mesma lógica da parte do whatsapp do DrivenEats
    buscar.then(pagina2)

    headerDoQuizz()
    renderizarPerguntas()
    document.querySelector("#titulo-quiz").scrollIntoView();
}

function pagina2(resposta){
    lista = resposta.data

    document.querySelector(".tela01").classList.add("displaynone")
    document.querySelector(".tela02").classList.remove("displaynone")
}

function headerDoQuizz(){
    const headerQuizz = document.querySelector("#titulo-quizz")

    headerQuizz.innerHTML = `
    <div id="titulo-quizz"> 
        <img src="${lista.image}">
        <p> ${lista.title} </p> 
    </div>
    `
    /*document.getElementById("titulo-quizz").style.backgroundImage = URL(lista.image)*/
}

function renderizarPerguntas(){
    const perguntas = lista.questions;
    const blocoDasPerguntas = document.querySelector(".bloco");

    perguntas.forEach(pergunta => {
        let cor = pergunta.color;
        
        blocoDasPerguntas.innerHTML += `
        <section class="bloco">
            <div class="pergunta" id="${i}"> 
                <p>${pergunta.title}</p> 
            </div>

            <div class="respostas">${renderizarRespostar()}</div>
        </section>
        `
        document.getElementById(`${i}`).style.backgroundColor = cor
        i++
    });

}

function renderizarRespostar(pergunta){
    const respostas = pergunta.answers
    const embaralharRespostas = respostas.sort(() => Math.random() - 0.5)
    console.log(respostas)
    console.log(embaralharRespostas)

    embaralharRespostas.forEach(resposta => {
        blocoDasRespostas += `
        <div class="resposta ${resposta.isCorrectAnswer}" onclick="escolherResposta(this)"> 
            <img src="${embaralharRespostas.image}">
            <p>${embaralharRespostas.text}</p> 
        </div>
        `
    })
    
    return blocoDasRespostas
}

function escolherResposta(elemento){
    console.log(elemento)
    elemento.classList.add("selecionada")
    elementoParente = elemento.parentNode
    selecionaAResposta = elementoParente.querySelectorAll(".resposta")

    selecionaAResposta.forEach(resposta => {
        elementoSelecionado = resposta.classList.contains("selecionada")
        if (elementoSelecionado == false){
            resposta.classList.add("naoSelecionado")
            resposta.setAttribute("onclick", "")
        }

        else{
            resposta.setAttribute("onclick", "")
        }
    })
    escolherResposta(elemento)
    
    //Ir para próxima pergunta
    /*setTimeout(() => {

    })*/
}


// Botões

function reiniciar(){
    const elemento = document.querySelector(".tela02")
    elemento.scrollIntoView()
}

function voltar(){
    window.location.reload()
}
