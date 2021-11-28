function random(min, max) {
  return Math.random() * (max - min) + min;
}
let canvas,
  ctx,
  ALTURA,
  LARGURA,
  frames = 0,
  gravity = 0.1,
  particulas = [],
  catx = (caty = hyp = 0),
  chao = {
    y: 550,
    altura: 50,
    cor: "#ffdf70",
    desenha: function () {
      ctx.fillStyle = this.cor;
      ctx.fillRect(0, this.y, LARGURA, this.altura);
    },
  },
  cam = {
    x: 0,
    y: 0,
    largura: LARGURA / 3,
    altura: ALTURA / 3,
    leftEdge: function () {
      return this.x + this.largura * 0.25;
    },
    rightEdge: function () {
      return this.x + this.largura * 0.75;
    },
    upEdge: function () {
      return this.x + this.altura * 0.25;
    },
    downEdge: function () {
      return this.x + this.altura * 0.75;
    },
  },
  predio = {
    x: 520,
    y: 190,
    altura: 360,
    largura: 50,
    cor: "#ACA0A0",
    desenha: function () {
      ctx.fillStyle = this.cor;
      ctx.fillRect(this.x, this.y, this.largura, this.altura);
    },
  },
  bloco = {
    vx: 0,
    vy: 0,
    x: 40,
    y: 0,
    altura: 10,
    largura: 10,
    cor: "#ff4e4e",
    held: false,
    desenha: function () {
      ctx.fillStyle = this.cor;
      ctx.fillRect(this.x, this.y, this.largura, this.altura);
    },
  },
  nuvens = geraNuvens();
nuvens2 = geraNuvens2();
function clique(_event) {
  catx = bloco.x - _event.offsetX;
  caty = bloco.y - _event.offsetY;
  hyp = Math.sqrt(catx * catx + caty * caty);
  if (hyp < bloco.altura || (hyp > bloco.altura && bloco.held)) {
    bloco.held = true;
  }
}
function solte(_event) {
  if (bloco.held) {
    bloco.held = false;
  }
}
function mexa(_event) {
  if (bloco.held) {
    bloco.x = _event.offsetX;
    bloco.y = _event.offsetY;
  }
}
function roda() {
  // atualizando e desenhando o jogo
  atualiza();
  desenha();

  window.requestAnimationFrame(roda);
}

function geranuvem() {
  const nuvem = {
    vx: 0,
    vy: 0,
    x: Math.random() * (1200 - 0) + 0,
    velocidade: Math.random() * (1.5 - 0) + 0,
    y: Math.random() * (1000 - 0) + 0,
    altura: Math.random() * (83 - 46) + 46,
    largura: Math.random() * (240 - 110) + 110,
    cor: "#FFFFFF",
    held: false,
    desenha: function () {
      ctx.fillStyle = this.cor;
      ctx.fillRect(this.x, this.y, this.largura, this.altura);
    },
    atualiza: function () {
      if (!this.held) {
        this.vx += this.vx;
        this.x += this.velocidade;
      }
      if (this.x < -240) {
        this.x = 1190;
      }
      if (this.x > 1200) {
        this.x = -240;
      }
    },
  };
  return nuvem;
}
function geranuvem2() {
  const nuvem2 = {
    vx: 0,
    vy: 0,
    x: Math.random() * (1200 - 0) + 0,
    velocidade: Math.random() * (-1.5 - 0) + 0,
    y: Math.random() * (1000 - 0) + 0,
    altura: Math.random() * (83 - 46) + 46,
    largura: Math.random() * (240 - 110) + 110,
    cor: "#FCFBFB",
    held: false,
    desenha: function () {
      ctx.fillStyle = this.cor;
      ctx.fillRect(this.x, this.y, this.largura, this.altura);
    },
    atualiza: function () {
      if (!this.held) {
        this.vx += this.vx;
        this.x += this.velocidade;
      }
      if (this.x < -240) {
        this.x = 1190;
      }
      if (this.x > 1200) {
        this.x = -240;
      }
    },
  };
  return nuvem2;
}
function geraNuvens2() {
  let nubia2 = [];
  0;
  for (let i = 0; i < 25; i++) {
    let x = Math.random() * (1200 - 0) + 0;
    let y = Math.random() * (225 - 0) + 0;
    const newNuvem2 = geranuvem2();
    newNuvem2.x = x;
    newNuvem2.y = y;
    nubia2.push(newNuvem2);
  }
  return nubia2;
}
function geraNuvens() {
  let nubia = [];
  0;
  for (let i = 0; i < 25; i++) {
    let x = Math.random() * (1200 - 0) + 0;
    let y = Math.random() * (225 - 0) + 0;
    const newNuvem = geranuvem();
    newNuvem.x = x;
    newNuvem.y = y;
    nubia.push(newNuvem);
  }
  return nubia;
}

function atualiza() {
  nuvens.forEach((v) => v.atualiza());
  nuvens2.forEach((v) => v.atualiza());

  if (!bloco.held) {
    bloco.vy += gravity;
    bloco.y += bloco.vy;
    bloco.x += bloco.vx;
  } else {
    bloco.vy = 0;
    bloco.vx = 0;
  }

  if (bloco.y + bloco.altura > chao.y) {
    bloco.y = chao.y - bloco.altura;
  }
  if (bloco.x - bloco.largura < 0 || bloco.x + bloco.largura > canvas.width) {
    bloco.x =
      bloco.x - bloco.largura < 0
        ? bloco.largura
        : canvas.width - bloco.largura;
  }
  /*
                codigo perfeito para uma estrela cadente
                if(!bloco.held){
                    bloco.largura += gravity;
                    bloco.y += bloco.largura;
                    bloco.x += bloco.altura;
                }
                */
  // atualizar status do personagem
  frames++;
}
function desenha() {
  ctx.save();
  ctx.translate(-cam.x, -cam.y);
  // desenha personagens e cenário
  ctx.fillStyle = "#50beff";
  ctx.fillRect(0, 0, LARGURA, ALTURA);
  chao.desenha();
  nuvens2.forEach((v) => v.desenha());
  predio.desenha();
  bloco.desenha();
  nuvens.forEach((v) => v.desenha());
  ctx.restore();
}
function main() {
  // inicializa o jogo
  ALTURA = window.innerHeight;
  LARGURA = window.innerWidth;
  if (LARGURA >= 500) {
    LARGURA = 1200;
    ALTURA = 600;
  }
  canvas = document.createElement("canvas");
  canvas.width = LARGURA;
  canvas.height = ALTURA;
  canvas.style.border = "8px solid #000";
  ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);
  document.addEventListener("mousedown", clique);
  document.addEventListener("mouseup", solte);
  document.addEventListener("mousemove", mexa);
  roda();
}
main();
