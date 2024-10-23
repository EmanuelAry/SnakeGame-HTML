var direction = 1;
var iPonto;
var bStop = false;
var tabela;
var cobra;
var aposcabeca;
var grid;
var loop;
var play = 0;
var pontos;
function iniciar() {
  play++;
  document.getElementById("pausar").style.visibility = "visible";
  iPonto = 0;
  pontos = document.getElementById("tbpontos");
  let ponto = document.createElement("tr");
  let num = document.createElement("td");
  let numponto = document.createElement("td");
  ponto.appendChild(num);
  num.innerHTML = play;
  ponto.appendChild(numponto);
  pontos.appendChild(ponto);
  document.getElementById("iniciar").disabled = true;
  grid = document.getElementById("grid");
  for(var i = 0; i < 100; i++){
    let celula = document.createElement("div");
    grid.appendChild(celula);
  }
  // Inicializa os componentes do jogo
  tabela = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  aposcabeca = [4,4];
  // Cria a Cobra
  cobra = Array([4,4]);
  // Gera a comida
  gerarComida(tabela);
  
  // Inicia o loop do jogo
  loop = 
    setInterval(function() {
      // Atualiza a posição da tabela
      atualizarTabela(tabela,cobra,aposcabeca);
      
      // Desenha a cobra e a comida
      desenhar();
    }, 500);
}

function pausar(){
  document.getElementById("pausar").style.visibility = "hidden";
  document.getElementById("continuar").style.visibility = "visible";
  clearInterval(loop);

}

function continuar(){
  document.getElementById("continuar").style.visibility = "hidden";
  document.getElementById("pausar").style.visibility = "visible";
  loop = 
    setInterval(function() {
      // Atualiza a posição da tabela
      atualizarTabela(tabela,cobra,aposcabeca);
      
      // Desenha a cobra e a comida
      desenhar();
    }, 500);
}

function atualizarTabela(tabela,cobra,aposcabeca) {
  // Move a cabeça da cobra
  switch(direction){
    case 1:
      //baixo
      aposcabeca[0] += 1;
      break;
    case 2:
      //direita
      aposcabeca[1] += 1;
      break;
    case 3:
      //cima 
      aposcabeca[0] -= 1;
      break;
    case 4:
      aposcabeca[1] -= 1; 
    default:
      break;
  }
  if(aposcabeca[0] < 0 || aposcabeca[0] > 9 || aposcabeca[1] < 0 || aposcabeca[1] > 9){
    //a cobra saiu do grid
    paraJogo();
  }
  if(tabela[aposcabeca[0]][aposcabeca[1]] == 1){
    //a cobra colidiu com o próprio corpo
    paraJogo();
  }
  for(var i = 0; i < 10; i++){
    for(var j = 0; j < 10; j++){
      indice = String(i) + String(j);
      if(tabela[i][j] == 1){
        tabela[i][j] = 0;
      }
    }
  }
  if(tabela[aposcabeca[0]][aposcabeca[1]] == 2){
    //comeu comida
    var aControle = [aposcabeca[0], aposcabeca[1]];
    cobra.push(aControle);
    for(var i = 0; i <= cobra.length - 1; i++){
      tabela[cobra[i][0]][cobra[i][1]] = 1;
    }
    iPonto++;
    pontos.lastElementChild.lastElementChild.innerHTML = iPonto;
    gerarComida(tabela);
  }else{
    
    //cobra só se move
    var aControle = [aposcabeca[0], aposcabeca[1]];
    cobra.push(aControle);
    cobra.shift();
    for(var i = 0; i <= cobra.length - 1; i++){
      tabela[cobra[i][0]][cobra[i][1]] = 1;
    }
  }
}

function gerarComida(tabela) {
  
  // Gera um ponto aleatório no grid que não esteja ocupado pela tabela
  var x = parseInt(Math.floor(Math.random() * 10));
  var y = parseInt(Math.floor(Math.random() * 10));

  while(parseInt(tabela[x][y]) == 1) {
    x = parseInt(Math.floor(Math.random() * 10));
    y = parseInt(Math.floor(Math.random() * 10));
  }
  tabela[x][y] = 2;
}

function setDirection(keycode){
  // 40 - seta baixo  
  // 83 - S
  // 39 - seta direita
  // 68 - D
  // 38 - seta cima
  // 87 - W
  // 37 - seta esquerda
  // 65 - A
  if(keycode == 40 || keycode == 83){
    if(direction !== 3){
      //baixo
      direction  = 1;
    }
  }else if(keycode == 39 || keycode == 68){
    if(direction !== 4){
      //direita
      direction  = 2;
    }
  }else if(keycode == 38 || keycode == 87){
    if(direction !== 1){
      //cima
      direction  = 3;
    }
  }else if(keycode == 37 || keycode == 65){
    if(direction !== 2){
      //esquerda
      direction  = 4;
    }
  }else{
    if(keycode == 32){
      //Clica espaço para pausar ou continuar o jogo 
      if(document.getElementById("pausar").style.visibility == "visible"){
        pausar();
      }else if(document.getElementById("continuar").style.visibility == "visible"){
        continuar();
      }
    }
  }
}
//SETA AS CORES DOS QUADRADOS;
function desenhar(){
  for(var i = 0; i < 10; i++){
      for(var j = 0; j < 10; j++){
        indice = String(i) + String(j);
        if(tabela[i][j] == 0){
          grid.children[parseInt(indice)].style.backgroundColor = document.getElementById("campo").value;
        }else if(tabela[i][j] == 1){
          grid.children[parseInt(indice)].style.backgroundColor = document.getElementById("cobra").value;
        }else if(tabela[i][j] == 2){
          grid.children[parseInt(indice)].style.backgroundColor = document.getElementById("comida").value;
        }
      }
  }
}

function paraJogo(){
  while (grid.lastElementChild) {
    grid.removeChild(grid.lastElementChild);
  }
  document.getElementById("continuar").style.visibility = "hidden";
  document.getElementById("pausar").style.visibility = "hidden";
  document.getElementById("iniciar").disabled = false;
  clearInterval(loop);
  alert('Vc perdeu');
}
