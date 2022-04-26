/* -------------------Variáveis--------------------------*/
let click = 0;
let ponto = 0;
let dadosPerguntas;
let lista;


/* -------------------API--------------------------*/
const pegarTodosOsQuizzes = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
pegarTodosOsQuizzes.then(renderizarTodosOsQuizzes);
pegarTodosOsQuizzes.catch(function (){ window.location.reload})
console.log(pegarTodosOsQuizzes)


/* -------------------Tela 1--------------------------*/
function renderizarTodosOsQuizzes(resposta) {
    lista = resposta.data;
    console.log(lista)

    let selecionado = document.querySelector(".todosOsQuizzes")
    for(let i = 0; i < lista.length; i++) {
        selecionado.innerHTML += 
        `
        <div class="imagen" onclick="abrindoQuizz(${lista[i].id})">
            <img src="${lista[i].image}" alt="">
            <div class="gradiente">
            <p>${lista[i].title}</p>
        </div>
        `
    }

}

/* ---------------------Tela 1 - Quizzes do User --------------------------*/

function renderizarMeusQuizzes(resposta) {
    const header = document.querySelector("topoMeusQuizzes")
    
    if (resposta.length <= []) {
        localStorage.removeItem('meusquizzes')
        return header.innerHTML =`
            <div class="criarQuizz" >
                <p>Você não criou nenhum <br/>quizz ainda :(</p>
                <button onclick="criarQuizz()">Criar Quizz</button>
            </div>
        `
    } else {
        return header.innerHTML =`
        <div class="userQuizz displaynone">
            <div class="topo-userQuizz">  
            <p>Seus Quizzes</p>
            <button class="adicionarMais" onclick="criarQuizz()"><ion-icon name="add-circle"></ion-icon></button>
            </div>
            <div class="seusQuizzesRenderizados">${renderMeusQuizzes(resposta, 1)}</div>
        </div>  
             </div>
        `
    }
}

function renderMeusQuizzes(lista,) {
    let meusQuizzesRenderizados = "";
    lista.map(lista => {
        const {
            image,
            title,
            id,
        } = lista;

        meusQuizzesRenderizados += `

        <div class="imagen" onclick="abrindoQuizz(${lista[i].id})">
            <img src="${lista[i].image}" alt="">
            <div class="gradiente">
            <p>${lista[i].title}</p>
        </div>
        `
    });
    return meusQuizzesRenderizados;
}

function criarQuizz() {
    const tela1 = document.querySelector(".tela01")
    tela1.classList.add("displaynone");

    let selecionado = document.querySelector(".tela03Comeco");
    selecionado.classList.remove("displaynone");

    setTimeout(() => {window.scrollTo({top: 0, behavior: "smooth",})});
}

/*---------------------------------------------------------------*/

function abrindoQuizz(acessarId){

    let acessarIdString = acessarId.toString()
    console.log(typeof acessarIdString)
    const buscar = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${acessarIdString}`) //mesma lógica da parte do whatsapp do DrivenEats
    buscar.then(pagina2)
    
}

function pagina2(resposta){
    lista = resposta.data
    console.log(resposta.data)

    document.querySelector(".tela01").classList.add("displaynone")
    document.querySelector(".tela02").classList.remove("displaynone")

    setTimeout(() => {window.scrollTo({top: 0, behavior: "smooth",})});
    headerDoQuizz()
    renderizarPerguntas()
}



/* -------------------Tela 2--------------------------*/

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
    let i = 0;

    const perguntas = lista.questions;
    const blocoDasPerguntas = document.querySelector(".bloco");

    perguntas.forEach(pergunta => {
        let cor = pergunta.color
        blocoDasPerguntas.innerHTML += `
        <div class="blocoDeCadaPergunta">
            <div class="pergunta" id="${i}" > 
                <p>${pergunta.title}</p> 
            </div>

            <div class="respostas">${renderizarRespostar(pergunta)}</div>
        </div>
        `

        document.getElementById(`${i}`).style.backgroundColor = cor
        i++
    });

}

function renderizarRespostar(pergunta){
    let blocoDasRespostas = "";
    const respostas = pergunta.answers
    const embaralharRespostas = respostas.sort(() => Math.random() - 0.5)
    console.log(respostas)
    console.log(embaralharRespostas)

    respostas.forEach(resposta => {
        blocoDasRespostas += `
        <div class="resposta ${resposta.isCorrectAnswer}" onclick="escolherResposta(this)"> 
            <img src="${resposta.image}">
            <p>${resposta.text}</p> 
        </div>
        `
    })
    
    return blocoDasRespostas
}

function escolherResposta(elemento){

    let elementoParente = elemento.parentNode;
    let selecionarResposta = elementoParente.querySelectorAll(".resposta");
    let elementoSelecionado;
    let quizResultado = document.querySelector(".resultadoFinal");

    if(!elemento.classList.contains("selecionada")){
        click++

        if(elemento.classList.contains("true")){
            ponto++
        }
        elemento.classList.add("selecionada")
            selecionarResposta.forEach(resposta => {
                elementoSelecionado = resposta.classList.contains("selecionada")
                if (elementoSelecionado == false){
                    resposta.classList.add("naoSelecionada")
                    resposta.setAttribute("onclick", "")
                }
            })

            let parente = elemento.parentNode;
        
            let verdadeiro = parente.querySelector(".true p");
            verdadeiro.style.color="green";
        
            let falso = parente.querySelectorAll(".false p"); 
            falso.forEach(pergunta => {
                pergunta.style.color="red";
            });
    }

    let tamanho = lista.questions
    let numeroDePerguntas = tamanho.length;
    console.log(numeroDePerguntas)
    console.log(click)
    if(click == numeroDePerguntas){
        let pontos = Math.round((ponto / numeroDePerguntas) * 100);
        console.log(pontos)
        let niveis = lista.levels;
        console.log(niveis)

        niveis.forEach(lista => {
            if(pontos >= lista.minValue){
                quizResultado.innerHTML = `
                <div class="topo-resultado">
                    <p> ${pontos}% de acerto: ${lista.title}</p>
                </div>
                
                <div class="bloco-resultado">
                    <img src="${lista.image}">
                    <p>${lista.text}</p>
                </div>
            `
            }
        })
        quizResultado.classList.remove("displaynone")
        setTimeout(() => {
            window.scrollTo({top: document.body.scrollHeight, behavior: "smooth",
            });
          }, 300);
    }
    else {
        setTimeout(() => {
            window.scrollBy({top: elemento.parentElement.parentElement.offsetHeight + 30, behavior: "smooth",
            })
          }, 300)
    }

    if (!quizResultado.classList.contains("displaynone")){
        click = 0
        ponto = 0
        pontos = 0
    }
} 
    


/* -------------------Botões--------------------------*/

function reiniciar(resposta){
    setTimeout(() => {
        window.scrollTo({top: 0, behavior: "smooth",
        });
      }, 200);


    let tirarCor = document.querySelectorAll(".respostas p")
    tirarCor.forEach(p => {
        p.style.color = "black"
    })

    let resetarImagens = document.querySelectorAll(".resposta")
    resetarImagens.forEach(  resposta => {
        resposta.classList.remove("naoSelecionada")
        resposta.classList.remove("selecionada")
        resposta.removeAttribute("onclick", "")
        resposta.setAttribute("onclick", "escolherResposta(this)")
    })

    let resetarResultado = document.querySelector(".resultadoFinal")
    resetarResultado.classList.add("displaynone")

}

function voltar(){
    window.location.reload()
}




/* -------------------Tela 3--------------------------*/
let tituloTela03Comeco;
let urlImagemTela03Comeco
let qtdPerguntasTela03Comeco;
let qtdNiveisTela03Comeco;

let dados;

////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        
    //transformar/diminuir pergunta02
        for(let i = 0; i < qtdPerguntasTela03Comeco; i++) {
            if (i == 0) {


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
            else {

                selecionado.innerHTML += `
                <div class="conteudo pergunta${i + 1}">

                    <div class="ioniconsP">
                        <p>Pergunta ${i + 1}</p>
                        <ion-icon onclick="transformar()" name="create-outline"></ion-icon>
                    </div>

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

       }
       selecionado.innerHTML += `
       <button onclick="criarNiveis()">Prosseguir para criar níveis</button>
       <div class="espaco2"></div>
       `
    
//array dados
       dados = [{
        title: `${tituloTela03Comeco}`,
        image: `${urlImagemTela03Comeco}`,
        questions: []
        }]
        
        
        dadosPerguntas = {
            title: `${tituloTela03Comeco}`,
            image: `${urlImagemTela03Comeco}`,
            questions: [
        
            ],
            levels: [
        
            ],
        };
        
    
    
    
    }

}


/*
dadosPerguntas = {
    title: `${tituloTela03Comeco}`,
    image: `${urlImagemTela03Comeco}`,
    questions: [

    ],
    levels: [

    ],
};
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////

function criarNiveis() {
    

    let selecionado = document.querySelector(".tela03Niveis")
    for(let i = 0; i < qtdNiveisTela03Comeco; i++) {

        if(i == 0) {

        selecionado.innerHTML += `
        <div class="conteudo niveis${i + 1}">
            <p>Nível ${i + 1}</p>
            <input class="inputNiveisTitulo" type="text" placeholder="Título do nível">
            <input class="inputNiveisAcertoMinimo" type="number" name="" id="" placeholder="% de acerto mínimo">
            <input class="inputNiveisUrlImagem" type="url" name="" id="" placeholder="URL da imagem do nível">
            <input class="inputNiveisDescricao" type="text" placeholder="Descrição do nivel">
        </div>
    `

        }
        else {

        selecionado.innerHTML += `
        <div class="conteudo niveis${i + 1}">

            <div class="ioniconsP">
                <p>Nível ${i + 1}</p>
                <ion-icon onclick="transformar()" name="create-outline"></ion-icon>
            </div>

            <input class="inputNiveisTitulo" type="text" placeholder="Título do nível">
            <input class="inputNiveisAcertoMinimo" type="number" name="" id="" placeholder="% de acerto mínimo">
            <input class="inputNiveisUrlImagem" type="url" name="" id="" placeholder="URL da imagem do nível">
            <input class="inputNiveisDescricao" type="text" placeholder="Descrição do nivel">
        </div>
    `

        }
    }
    selecionado.innerHTML += `
        <button onclick="finalizarQuizz()">Finalizar Quizz</button>
    `
    //////validação
    let contadorEspacoVazio = 0
    let contadorValidacaoPerguntas = 0
    for(let i = 0; i < qtdPerguntasTela03Comeco; i++) {
        let textoDaPergunta = document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".inputTextoPergunta").value;
        let corDeFundoDaPergunta = document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".inputCorPergunta").value;

        let respostaCorreta = document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaCorreta").value;
        let urlDaImagemCorreta = document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaCorreta").value;

        let respostaIncorreta = document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaIncorreta01").value;
        let urlDaImagemIncorreta = document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaIncorreta01").value;

        let validacao123 = ( textoDaPergunta.length < 20 || respostaCorreta == "" || urlDaImagemCorreta == "" ||  !urlDaImagemCorreta.includes("https://") || respostaIncorreta == "" ||  urlDaImagemIncorreta == "" );

        if(validacao123) {
            contadorValidacaoPerguntas++;
        }
        /*
        for (let j = 0; j < 2; j++) {
            let respostaIncorretaOutro2e3 = document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(`.respostaIncorreta0${j + 2}`).value;
            let urlImagemIncorretaOutro2e3 = document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(`.urlImagemRespostaIncorreta0${j + 2}`).value;

            if(respostaIncorretaOutro2e3  == "" || urlImagemIncorretaOutro2e3 == "") {
                contadorEspacoVazio++
            }

        }
        */
       
        
    }

    if(contadorValidacaoPerguntas > 0) {

        for(let i = 0; i < qtdPerguntasTela03Comeco; i++) {
            document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".inputTextoPergunta").value = "";
            document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".inputCorPergunta").value = "";

            document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaCorreta").value = "";
            document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaCorreta").value = "";

            document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaIncorreta01").value = "";
            document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaIncorreta01").value = "";
            document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaIncorreta02").value = "";
            document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaIncorreta02").value = "";
            document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaIncorreta03").value = "";
            document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaIncorreta03").value = "";
        }
        alert("Dados Invalidos, tente novamente.\nOBS:\n(1)Texto da pergunta: no mínimo 20 caracteres.\n(2)Textos das respostas: não pode estar vazio.\n(3)URL das imagens de resposta: deve ter formato de URL\n(4)É obrigatória a inserção da resposta correta e de pelo menos 1 resposta errada. Portanto, é permitido existirem perguntas com só 2 ou 3 respostas em vez de 4.")
    }
    else {
        // pode passar pra proxima pag, validaçao concluitda

        for (let i = 0; i < qtdPerguntasTela03Comeco; i++) {

            let objtemporario = {}
     
             objtemporario.title = document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".inputTextoPergunta").value 
             objtemporario.color = document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".inputCorPergunta").value
             console.log(objtemporario)
     
             objtemporario.answers = []
     
             objtemporario.answers.push({
                 text: document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaCorreta").value,
                 image: document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaCorreta").value,
                 isCorrectAnswer: true,
             })
     
             objtemporario.answers.push({
                 text: document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaIncorreta01").value,
                 image: document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaIncorreta01").value,
                 isCorrectAnswer: false,
             })
     
             objtemporario.answers.push({
                 text: document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaIncorreta02").value,
                 image: document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaIncorreta02").value,
                 isCorrectAnswer: false,
             })
             objtemporario.answers.push({
                 text: document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaIncorreta03").value,
                 image: document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaIncorreta03").value,
                 isCorrectAnswer: false,
             })
     
             dadosPerguntas.questions.push(objtemporario)
         }
     
         console.log("----dadosPerguntas1----")
         console.log(dadosPerguntas)
         console.log("----dadosPerguntas1----")
     
     
         document.querySelector(".tela03Perguntas").classList.add("displaynone")
         document.querySelector(".tela03Niveis").classList.remove("displaynone")

    }



    /*


    for (let i = 0; i < qtdPerguntasTela03Comeco; i++) {

       let objtemporario = {}

        objtemporario.title = document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".inputTextoPergunta").value 
        objtemporario.color = document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".inputCorPergunta").value
        console.log(objtemporario)

        objtemporario.answers = []

        objtemporario.answers.push({
            text: document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaCorreta").value,
            image: document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaCorreta").value,
            isCorrectAnswer: true,
        })

        objtemporario.answers.push({
            text: document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaIncorreta01").value,
            image: document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaIncorreta01").value,
            isCorrectAnswer: false,
        })

        objtemporario.answers.push({
            text: document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaIncorreta02").value,
            image: document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaIncorreta02").value,
            isCorrectAnswer: false,
        })
        objtemporario.answers.push({
            text: document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".respostaIncorreta03").value,
            image: document.querySelector(".tela03Perguntas").querySelector(`.pergunta${i + 1}`).querySelector(".urlImagemRespostaIncorreta03").value,
            isCorrectAnswer: false,
        })

        dadosPerguntas.questions.push(objtemporario)
    }

    console.log("----dadosPerguntas1----")
    console.log(dadosPerguntas)
    console.log("----dadosPerguntas1----")


    document.querySelector(".tela03Perguntas").classList.add("displaynone")
    document.querySelector(".tela03Niveis").classList.remove("displaynone")

    */

}
/*
if (localStorage.getItem("quizzes") == "" || localStorage.getItem("quizzes") == null)  {
    let meusQuizzes = []
}
else {
    let meusQuizzes = localStorage.getItem("quizzes")
}
*/

let meusQuizzes = JSON.parse(localStorage.getItem("quizzes"));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function finalizarQuizz() {

    let contadorValidacaoNiveisAcertosMinimos = 0
    let contadorValidacaoNiveis = 0;
    for(let i = 0; i < qtdNiveisTela03Comeco; i++) {

        let tituloTela03Niveis = document.querySelector(".tela03Niveis").querySelector(`.niveis${i + 1}`).querySelector(".inputNiveisTitulo").value;
        let acertosMinimoTela03Niveis = document.querySelector(".tela03Niveis").querySelector(`.niveis${i + 1}`).querySelector(".inputNiveisAcertoMinimo").value;
        let urlImagemTela03Niveis = document.querySelector(".tela03Niveis").querySelector(`.niveis${i + 1}`).querySelector(".inputNiveisUrlImagem").value;
        let descricaoTela03Niveis = document.querySelector(".tela03Niveis").querySelector(`.niveis${i + 1}`).querySelector(".inputNiveisDescricao").value;
        acertosMinimoTela03Niveis = parseInt(acertosMinimoTela03Niveis);

       
        let tamanhotituloTela03Niveis = tituloTela03Niveis.length;
        let validacaoNiveis = (tituloTela03Niveis == "" || tamanhotituloTela03Niveis < 10 || acertosMinimoTela03Niveis < 0 || acertosMinimoTela03Niveis > 100 || urlImagemTela03Niveis == "" || !urlImagemTela03Niveis.includes("https://") || descricaoTela03Niveis.length < 30);
        
        if(acertosMinimoTela03Niveis == 0) {
            contadorValidacaoNiveisAcertosMinimos++
        }
        if(validacaoNiveis || contadorValidacaoNiveisAcertosMinimos == 0) {
            contadorValidacaoNiveis++
        }
    }

    

    if(contadorValidacaoNiveis > 0) {

        for(let i = 0; i < qtdNiveisTela03Comeco; i++) {

            document.querySelector(".tela03Niveis").querySelector(`.niveis${i + 1}`).querySelector(".inputNiveisTitulo").value = "";
            document.querySelector(".tela03Niveis").querySelector(`.niveis${i + 1}`).querySelector(".inputNiveisAcertoMinimo").value = "";
            document.querySelector(".tela03Niveis").querySelector(`.niveis${i + 1}`).querySelector(".inputNiveisUrlImagem").value = "";
            document.querySelector(".tela03Niveis").querySelector(`.niveis${i + 1}`).querySelector(".inputNiveisDescricao").value = "";
        }
        alert("Dados Invalidos, tente novamente.\nOBS:\n(1)Título do nível: mínimo de 10 caracteres.\n(2)% de acerto mínima: um número entre 0 e 100.\n(3)Descrição do nível: mínimo de 30 caracteres.\n(4)É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%.")
    }
    else {

        for(let i = 0; i < qtdNiveisTela03Comeco; i++) {

            let objtemporario = {}

            objtemporario.title = document.querySelector(".tela03Niveis").querySelector(`.niveis${i + 1}`).querySelector(".inputNiveisTitulo").value;
            objtemporario.image = document.querySelector(".tela03Niveis").querySelector(`.niveis${i + 1}`).querySelector(".inputNiveisUrlImagem").value;
            objtemporario.text = document.querySelector(".tela03Niveis").querySelector(`.niveis${i + 1}`).querySelector(".inputNiveisDescricao").value;
            objtemporario.minValue = document.querySelector(".tela03Niveis").querySelector(`.niveis${i + 1}`).querySelector(".inputNiveisAcertoMinimo").value;
            
            dadosPerguntas.levels.push(objtemporario)
            /*
            let objtemporario = {}
    
            objtemporario.push({
    
                title: document.querySelector(".tela03Niveis").querySelector(`.niveis${i + 1}`).querySelector(".inputNiveisTitulo").value,
                image: document.querySelector(".tela03Niveis").querySelector(`.niveis${i + 1}`).querySelector(".inputNiveisAcertoMinimo").value,
                text: document.querySelector(".tela03Niveis").querySelector(`.niveis${i + 1}`).querySelector(".inputNiveisUrlImagem").value,
                minValue: document.querySelector(".tela03Niveis").querySelector(`.niveis${i + 1}`).querySelector(".inputNiveisDescricao").value,
    
            })
            dadosPerguntas.levels.push(objtemporario)
            */
        }


        const enviarDados = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes",dadosPerguntas);
        enviarDados.then((resposta) => {
            console.log(resposta);

            meusQuizzes.push({id: resposta.data.id });
            localStorage.setItem("quizzes", JSON.stringify(meusQuizzes))
            let getaaa = localStorage.getItem("quizzes")

            getaaa = JSON.parse(getaaa)
            
            console.log(localStorage.getItem("quizzes"))
            console.log(getaaa)
            console.log(meusQuizzes)

        })



        enviarDados.catch(erro);
        function erro() {
            alert("deu pau")
        }

        let selecionadoPronto = document.querySelector(".tela03Pronto").querySelector(".prontoDinamico");
        selecionadoPronto = `
            <div class="imagen">
                <img src="${dadosPerguntas.image}" alt="">
            </div>
        
        `






        document.querySelector(".tela03Niveis").classList.add("displaynone");
        document.querySelector(".tela03Pronto").classList.remove("displaynone");

        console.log("----dadosPerguntas2----")
        console.log(dadosPerguntas)
        console.log("----dadosPerguntas2----")
    } 
    
}


function voltarHome() {
    document.querySelector(".tela03Pronto").classList.add("displaynone");
    document.querySelector(".tela01").classList.remove("displaynone");
}



////////////////////////////////////////////////////////////////////////////


