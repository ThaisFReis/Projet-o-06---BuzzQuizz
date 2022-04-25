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
    for(let i = 0; i < 6; i++) {
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

let tituloTela03Comeco;
let urlImagemTela03Comeco
let qtdPerguntasTela03Comeco;
let qtdNiveisTela03Comeco;

let dados;

function criarPerguntas() {

    tituloTela03Comeco = document.querySelector(".tela03").querySelector(".inputs :nth-child(1)").value;
    urlImagemTela03Comeco = document.querySelector(".tela03").querySelector(".inputs :nth-child(2)").value;
    qtdPerguntasTela03Comeco = document.querySelector(".tela03").querySelector(".inputs :nth-child(3)").value;
    qtdNiveisTela03Comeco = document.querySelector(".tela03").querySelector(".inputs :nth-child(4)").value;

    qtdPerguntasTela03Comeco = parseInt(qtdPerguntasTela03Comeco);
    qtdNiveisTela03Comeco = parseInt(qtdNiveisTela03Comeco);

 

 
   


let validacaoComeco = (tituloTela03Comeco == "" || tituloTela03Comeco.length < 20 || tituloTela03Comeco.length > 65 || urlImagemTela03Comeco == "" || !urlImagemTela03Comeco.includes("https://") || qtdPerguntasTela03Comeco == "" || qtdPerguntasTela03Comeco < 3 || qtdNiveisTela03Comeco == "" || qtdNiveisTela03Comeco < 2);

    if(validacaoComeco) {
        document.querySelector(".tela03").querySelector(".inputs :nth-child(1)").value = "";
        document.querySelector(".tela03").querySelector(".inputs :nth-child(2)").value = "";
        document.querySelector(".tela03").querySelector(".inputs :nth-child(3)").value = "";
        document.querySelector(".tela03").querySelector(".inputs :nth-child(4)").value = "";
        alert("Dados Invalidos, tente novamente.\nOBS:\n(1)Título do quizz: deve ter no mínimo 20 e no máximo 65 caracteres.\n(2)URL da Imagem: deve ter formato de URL.\n(3)Quantidade de perguntas: no mínimo 3 perguntas.\n(4)Quantidade de níveis: no mínimo 2 níveis.")



    }
    else {
       
        document.querySelector(".tela03Comeco").classList.add("displaynone");
        document.querySelector(".tela03Perguntas").classList.remove("displaynone");

        let selecionado = document.querySelector(".tela03Perguntas").querySelector(".perguntasDinamica");
        
    
        for(let i = 0; i < qtdPerguntasTela03Comeco; i++) {
        selecionado.innerHTML += `
            <div class="conteudo pergunta${i + 1}">
                <p>Pergunta ${i + 1}</p>
                <input class="inputTextoPergunta" type="text" placeholder="Texto da pergunta">
                <input class="inputCorPergunta" type="color" name="" id="" placeholder="Cor de fundo da pergunta">

                <p>Resposta correta</p>
                <input class="respostaCorreta" type="text" placeholder="Resposta correta">
                <input class="urlImagemRespostaCorreta" type="url" name="" id="" placeholder="URL da imagem">

                <p>Respostas incorretas</p>
                <input class="respostaIncorreta01" type="text" placeholder="Resposta incorreta 1">
                <input class="urlImagemRespostaIncorreta01" type="url" name="" id="" placeholder="URL da imagem 1">

                <div class="espaco"></div>

                <input class="respostaIncorreta02" type="text" placeholder="Resposta incorreta 2">
                <input class="urlImagemRespostaIncorreta02" type="url" name="" id="" placeholder="URL da imagem 2">

                <div class="espaco"></div>

                <input class="respostaIncorreta03" type="text" placeholder="Resposta incorreta 3">
                <input class="urlImagemRespostaIncorreta03" type="url" name="" id="" placeholder="URL da imagem 3">

            
            </div>
        `
       }
       selecionado.innerHTML += `
       <button onclick="criarNiveis()">Prosseguir para criar níveis</button>
       <div class="espaco"></div>
       `
    
//array dados
       dados = [{
        title: `${tituloTela03Comeco}`,
        image: `${urlImagemTela03Comeco}`,
        questions: []
        }]
    
    
    
    
    
    }

}


//texte/lixo
let dadosteste = 
    {
        title: "",
        image: "",
        questions: [
            {
                title: "",
                color: "",
                answers: [
                    {
                        text: "",
                        image: "",
                        isCorrectAnswer: true
                    },
                    {
                        text: "",
                        image: "",
                        isCorrectAnswer: false

                    }
                ]
            }
        ]
    } 



console.log(dadosteste)


let dadosPerguntas =[{
    questions: [{
        answers: [{

        }]

    }]
}];

function criarNiveis() {
    

    let selecionado = document.querySelector(".tela03Niveis")
    for(let i = 0; i < qtdNiveisTela03Comeco; i++) {
        selecionado.innerHTML += `
            <div class="conteudo ">
                <p>Nível ${i + 1}</p>
                <input type="text" placeholder="Título do nível">
                <input type="number" name="" id="" placeholder="% de acerto mínimo">
                <input type="url" name="" id="" placeholder="URL da imagem do nível">
                <input type="text" placeholder="Descrição do nivel">
            </div>
        `

    }
    selecionado.innerHTML += `
        <button onclick="finalizarQuizz()">Finalizar Quizz</button>
    `
    
    for (let i = 0; i < qtdPerguntasTela03Comeco; i++) {
        
        console.log(document.querySelector(".tela03Perguntas"))
       // console.log(document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".inputpergunta01").value)

        dadosPerguntas.questions.push(document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".inputTextoPergunta").value) 
        dadosPerguntas.questions.push(document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".inputCorPergunta").value)

        dadosPerguntas.questions.answers.push(document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaCorreta").value)
        dadosPerguntas.questions.answers.push(document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaCorreta").value)

        dadosPerguntas.questions.answers.push(document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaIncorreta01").value)
        dadosPerguntas.questions.answers.push(document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaIncorreta01").value)

        dadosPerguntas.questions.answers.push(document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaIncorreta02").value)
        dadosPerguntas.questions.answers.push(document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaIncorreta02").value)

        dadosPerguntas.questions.answers.push(document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaIncorreta03").value)
        dadosPerguntas.questions.answers.push(document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaIncorreta03").value)

        /*
        let pergunta =  document.querySelector("tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector("input :nth-child(1)").value;
        let cor = document.querySelector("tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector("input :nth-child(2)").value;
    */
    
    }

    console.log("validaão pergunta1")
    console.log(dadosPerguntas)
    console.log("validaão pergunta2")


    document.querySelector(".tela03Perguntas").classList.add("displaynone")
    document.querySelector(".tela03Niveis").classList.remove("displaynone")

}


function finalizarQuizz() {
    console.log("finalizar quizz")
    let tituloTela03Niveis = document.querySelector(".tela03Niveis").querySelector(".conteudo :nth-child(2)").value;
    let acertosMinimoTela03Niveis = document.querySelector(".tela03Niveis").querySelector(".conteudo :nth-child(3)").value;
    let urlImagemTela03Niveis = document.querySelector(".tela03Niveis").querySelector(".conteudo :nth-child(4)").value;
    let descricaoTela03Niveis = document.querySelector(".tela03Niveis").querySelector(".conteudo :nth-child(5)").value;
    acertosMinimoTela03Niveis = parseInt(acertosMinimoTela03Niveis);
    
    let validacaoNiveis = (tituloTela03Niveis == "" || tituloTela03Niveis.length < 10 || acertosMinimoTela03Niveis < 0 || acertosMinimoTela03Niveis > 100 || urlImagemTela03Niveis == "" || !urlImagemTela03Niveis.includes("https://") || descricaoTela03Niveis.length < 30);

    if(validacaoNiveis) {
        document.querySelector(".tela03Niveis").querySelector(".conteudo :nth-child(2)").value = "";
        document.querySelector(".tela03Niveis").querySelector(".conteudo :nth-child(3)").value = "";
        document.querySelector(".tela03Niveis").querySelector(".conteudo :nth-child(4)").value = "";
        document.querySelector(".tela03Niveis").querySelector(".conteudo :nth-child(5)").value = "";
        alert("Dados Invalidos, tente novamente.\nOBS:\n(1)Título do nível: mínimo de 10 caracteres.\n(2)% de acerto mínima: um número entre 0 e 100.\n(3)Descrição do nível: mínimo de 30 caracteres.\n(4)É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%.")
    }
    else {
        document.querySelector(".tela03Niveis").classList.add("displaynone");
        document.querySelector(".tela03Pronto").classList.remove("displaynone")
    }

    
    
}
function voltarHome() {
    document.querySelector(".tela03Pronto").classList.add("displaynone");
    document.querySelector(".tela01").classList.remove("displaynone");
}
