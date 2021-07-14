let canvas, ctx, ALTURA, LARGURA, frames=0, 
gravity = 0.1, 
catx = caty = hyp = 0,
chao ={
        y: 550,
        altura: 50,
        cor: "#ffdf70",
        desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(0, this.y, LARGURA, this.altura);
}
},
bloco ={
        vx: 0,
        vy: 0,
        x: 50,
        y: 0,
        altura: 30,
        largura: 30,
        cor: "#ff4e4e",
        held: false,
        desenha: function(){
         ctx.fillStyle = this.cor;
         ctx.fillRect(this.x, this.y, this.largura, this.altura);
        }
};
nuvem ={
        vx: 0,
        vy: 0,
        x: 40,
        y: 69,
        altura: 60,
        largura: 260,
        cor: "#FFFFFF",
        held: false,
        desenha: function(){
         ctx.fillStyle = this.cor;
         ctx.fillRect(this.x, this.y, this.largura, this.altura);
        }
};

    function clique(_event){  
        catx = bloco.x - _event.offsetX;
        caty = bloco.y - _event.offsetY;
        hyp = Math.sqrt(catx * catx + caty * caty);
        if(hyp < bloco.altura || hyp > bloco.altura && bloco.held){
         bloco.held = true;
        }
    }
    function solte(_event){  
        if(bloco.held){
         bloco.held = false;
         bloco.vx = math.floor(math.random()*10)+1;
        }
    }
    function mexa(_event){ 
       if(bloco.held){
        bloco.x = _event.offsetX;
        bloco.y = _event.offsetY;
       }
    }    
    function roda(){
    // atualizando e desenhando o jogo
        atualiza();
        desenha();       
        window.requestAnimationFrame(roda);
    }
    function atualiza(){
        if(!nuvem.held){
            nuvem.vx += gravity;
            nuvem.x += nuvem.vx;
        }
        if(!bloco.held){
            bloco.vy += gravity;
            bloco.y += bloco.vy;
            bloco.x += bloco.vx;
        }else{
            bloco.vy = 0;
            bloco.vx = 0;
        }
        if(bloco.y + bloco.altura > chao.y){
           bloco.y = chao.y - bloco.altura;
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
    function desenha(){
    // desenha personagens e cenário
        ctx.fillStyle = "#50beff";
        ctx.fillRect(0,0,LARGURA,ALTURA);
        chao.desenha();
        nuvem.desenha();
        bloco.desenha();
    }
    function main (){         
    // inicializa o jogo
        ALTURA = window.innerHeight;
        LARGURA = window.innerWidth;
        if(LARGURA >= 500){
            LARGURA=1200;
            ALTURA=600;
        }
        canvas = document.createElement("canvas");
        canvas.width=LARGURA;
        canvas.height=ALTURA;
        canvas.style.border= "8px solid #000";
        ctx= canvas.getContext("2d");
        document.body.appendChild(canvas);
        document.addEventListener("mousedown", clique);
        document.addEventListener("mouseup", solte);
        document.addEventListener("mousemove", mexa);
        roda();           
    }
    main();