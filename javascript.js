let lista;
let i = 0;
let blocoDasRespostas = "";
let elementoParente;
let selecionaAResposta;
let elementoSelecionado;


//TELA 01
/*
const pegarTodosOsQuizzes = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
pegarTodosOsQuizzes.then(renderizarTodosOsQuizzes);
console.log(pegarTodosOsQuizzes);

function renderizarTodosOsQuizzes(resposta) {
    let lista = resposta.data;
    console.log(lista);

    let selecionado = document.querySelector(".tela01").querySelector(".todosOsQuizzes")
    for(let i = 0; i < 6; i++) {
        selecionado.innerHTML += 
        `
        <div class="imagen" onclick="quizEscolhido(this)">
            <img src="${lista[i].image}" alt="">
            <p>${lista[i].title}</p>
        </div>
        `
    }
}
function quizEscolhido() {
    document.querySelector(".tela01").classList.add("displaynone");
    document.querySelector(".tela02").classList.remove("displaynone");
}
*/








// TELA 02
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
        <div class="imagen" onclick="abrindoQuizz(${lista[i].id})">
            <img src="${lista[i].image}" alt="">
            <p>${lista[i].title}</p>
        </div>
        `
    }

    return lista
}

function abrindoQuizz(acessarId){
   

    
    let acessarIdString = acessarId.toString()
    console.log(typeof acessarIdString)
    const buscar = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${acessarIdString}`) //mesma lógica da parte do whatsapp do DrivenEats
    buscar.then(pagina2)

    
   
    document.querySelector("#titulo-quiz").scrollIntoView();
}

function pagina2(resposta){
    lista = resposta.data
    console.log(resposta.data)

    document.querySelector(".tela01").classList.add("displaynone")
    document.querySelector(".tela02").classList.remove("displaynone")
    headerDoQuizz()
    renderizarPerguntas()
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

            <div class="respostas">${renderizarRespostar(pergunta)}</div>
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


//TELA 03


function criarQuizz() {
    document.querySelector(".tela01").classList.add("displaynone");

    let selecionado = document.querySelector(".tela03Comeco");
    selecionado.classList.remove("displaynone");
}


function criarPerguntas() {

    let tituloTela03Comeco = document.querySelector(".tela03").querySelector(".inputs :nth-child(1)").value;
    let urlImagemTela03Comeco = document.querySelector(".tela03").querySelector(".inputs :nth-child(2)").value;
    let qtdPerguntasTela03Comeco = document.querySelector(".tela03").querySelector(".inputs :nth-child(3)").value;
    let qtdNiveisTela03Comeco = document.querySelector(".tela03").querySelector(".inputs :nth-child(4)").value;
    qtdPerguntasTela03Comeco = parseInt(qtdPerguntasTela03Comeco);
    qtdNiveisTela03Comeco = parseInt(qtdNiveisTela03Comeco);

    let dados = {
        title: `${tituloTela03Comeco}`,
        image: `${urlImagemTela03Comeco}`,
        qtdPerg: `${qtdPerguntasTela03Comeco}`,
        qtdNiv: `${qtdNiveisTela03Comeco}`,
    }

 
    console.log(dados)
    console.log(tituloTela03Comeco.length)


let validacao = (tituloTela03Comeco == "" || tituloTela03Comeco.length < 20 || tituloTela03Comeco.length > 65 || urlImagemTela03Comeco == "" || qtdPerguntasTela03Comeco == "" || qtdPerguntasTela03Comeco < 3 || qtdNiveisTela03Comeco == "" || qtdNiveisTela03Comeco < 2);

    if(validacao) {
        document.querySelector(".tela03").querySelector(".inputs :nth-child(1)").value = "";
        document.querySelector(".tela03").querySelector(".inputs :nth-child(2)").value = "";
        document.querySelector(".tela03").querySelector(".inputs :nth-child(3)").value = "";
        document.querySelector(".tela03").querySelector(".inputs :nth-child(4)").value = "";
        alert("Dados Invalidos, tente novamente.\nOBS:\n(1)Titulo entre 20 a 65 caracteres.\n(2)No minimo  3 perguntas.\n(3)No minimo 2 niveis.")



    }
    else {
       
        document.querySelector(".tela03Comeco").classList.add("displaynone");
        document.querySelector(".tela03Perguntas").classList.remove("displaynone");

        let selecionado = document.querySelector(".tela03Perguntas").querySelector(".perguntasDinamica");
        
    
        for(let i = 0; i < qtdPerguntasTela03Comeco; i++) {
        selecionado.innerHTML += `
            <div class="conteudo">
                <p>Pergunta ${i + 1}</p>
                <input type="text" placeholder="Texto da pergunta">
                <input type="color" name="" id="" placeholder="Cor de fundo da pergunta">

                <p>Resposta correta</p>
                <input type="text" placeholder="Resposta correta">
                <input type="url" name="" id="" placeholder="URL da imagem">

                <p>Respostas incorretas</p>
                <input type="text" placeholder="Resposta incorreta 1">
                <input type="url" name="" id="" placeholder="URL da imagem 1">

                <div class="espaco"></div>

                <input type="text" placeholder="Resposta incorreta 2">
                <input type="url" name="" id="" placeholder="URL da imagem 2">

                <div class="espaco"></div>

                <input type="text" placeholder="Resposta incorreta 3">
                <input type="url" name="" id="" placeholder="URL da imagem 3">

            
            </div>
        `
       }
       selecionado.innerHTML += `
       <button onclick="criarNiveis()">Prosseguir para criar níveis</button>
       <div class="espaco"></div>
       `
    }

}

function criarNiveis() {
    document.querySelector(".tela03Perguntas").classList.add("displaynone")
    document.querySelector(".tela03Niveis").querySelector.remove("displaynone")
    

}

function finalizarQuizz() {
    document.querySelector("tela03Niveis").classList.add("displaynone");
    
}