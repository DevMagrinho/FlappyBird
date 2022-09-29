console.log('[DevMagrinho] Flappy Bird')

const sprites = new Image();
sprites.src = './img/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

/* Plano de Fundo */
const planoDeFundo = {
    spritex: 390,
    spritey: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites, /* Imagem */
            planoDeFundo.spritex, planoDeFundo.spritey, /* Sprite X, Sprite Y */
            planoDeFundo.largura, planoDeFundo.altura, /* Tamanho do recorte na sprite */ 
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        )

        contexto.drawImage(
            sprites, /* Imagem */
            planoDeFundo.spritex, planoDeFundo.spritey, /* Sprite X, Sprite Y */
            planoDeFundo.largura, planoDeFundo.altura, /* Tamanho do recorte na sprite */ 
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        )
    }
}

/* Chão */
const chao = {
    spritex: 0,
    spritey: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites, /* Imagem */
            chao.spritex, chao.spritey, /* Sprite X, Sprite Y */
            chao.largura, chao.altura, /* Tamanho do recorte na sprite */ 
            chao.x, chao.y,
            chao.largura, chao.altura,
        )

        contexto.drawImage(
            sprites, /* Imagem */
            chao.spritex, chao.spritey, /* Sprite X, Sprite Y */
            chao.largura, chao.altura, /* Tamanho do recorte na sprite */ 
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura,
        )
    }
}

/* Flappy Bird */
const flappyBird = {
    spritex: 0,
    spritey: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,

    atualiza() {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
        console.log(flappyBird.y);
    },

    desenha() {
        contexto.drawImage(
            sprites, /* Imagem */
            flappyBird.spritex, flappyBird.spritey, /* Sprite x, Sprite y */
            flappyBird.largura, flappyBird.altura, /* Tamanho do recorte na sprite */ 
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        );
    }
}

function loop() {
    flappyBird.atualiza();

    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.desenha();
    
    requestAnimationFrame(loop);
}

loop();