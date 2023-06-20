//const { create } = require("domain");

const numero_moedas = 15;
const tempo_inicial = 10;
let pontos = 0;
let tempo = 0;
let timer = null;

function criarElemento(n, p){
  let saida = document.getElementById('table-body');
  let tr = document.createElement('tr');
  let nome = document.createElement('td');
  let pontos = document.createElement('td');

  nome.textContent = n;
  pontos.textContent = p;

  saida.appendChild(tr);
  tr.appendChild(nome);
  tr.appendChild(pontos);
}


function relogio() { tempo = tempo_inicial }


let presidentes = [
  "abraham.png",
  "eisenhower.png",
  "obama.png",
  "trump.png",
  "biden.png"
];
let aleatorio = Math.floor(Math.random() * presidentes.length);
let aryJ = [];
let ary = [];

function iniciaJogo() {
  pontos = 0;
  tempo = tempo_inicial;
  let tela = document.getElementById("tela");
  tela.innerHTML = "";

  for (let i = 0; i < numero_moedas; ++i) {
    let moeda = document.createElement("img");
    moeda.src = "george.png";
    moeda.classList.add('no-drag');
    moeda.id = "j" + i;
    aryJ.push(moeda.id);
    moeda.onclick = function() {
      pegaMoeda(this);
    }
    tela.appendChild(moeda);
  }
  timer = setInterval(contaTempo, 1000);

  fetch('http://localhost:5050/score')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição'); 
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    const pokemonList = data
    pokemonList.forEach(elem => {
    criarElemento(elem.nome, elem.pontos)
    });
  })
  .catch(error => {
    console.log(error);
  });
}

for (i = 0; i < numero_moedas; ++i) ary.push("j" + i);

let contadorPontos = document.getElementById("pontos");
function pegaMoeda(moeda) {
  let audio = new Audio('Audio/audio-moeda.mp3');
  let erroAudio = new Audio('Audio/erro.mp3');


  moeda.src = presidentes[aleatorio];
  let find = aryJ.indexOf(moeda.id);
  if (aryJ.includes(moeda.id)) {
    audio.play();
    animarMoeda();
    aryJ.splice(find, 1);
    ++pontos;
  } else {
    moeda.id = "soco";
    erroAudio.play();
  }

  contadorPontos.innerText = pontos;

}


function contaTempo() {
  if (tempo > 0) {
    --tempo;
    let contadorTempo = document.getElementById("tempo");
    contadorTempo.innerText = tempo + "s";
    return contaTempo = null;
  }
  else if (tempo <= 0) {
    clearInterval(timer);
    let nome = prompt('Você fez ' + pontos + " pontos! \n Insira seu nome:");
    let pontuacao = {
      name: nome,
      pontos: pontos
    }  
    fetch('http://localhost:5050/score', {
      method: "POST",
      body: JSON.stringify(pontuacao),
      headers: {"Content-type":"application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error))

    console.log(nome, pontos);

    
    criarElemento(nome,pontos);
    return ;
  }
}



function animarMoeda() {
  var moeda = document.getElementById("moeda");
  moeda.style.display = "block";
  setTimeout(function() {
    moeda.style.display = "none";
  }, 400);
}


