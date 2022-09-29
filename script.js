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
        contexto.fillRect(0, 0, canvas.width, canvas.height)

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

/* Get Ready */
const mensagemGetReady = {
    spritex: 134,
    spritey: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites, /* Imagem */
            mensagemGetReady.spritex, mensagemGetReady.spritey, /* Sprite X, Sprite Y */
            mensagemGetReady.largura, mensagemGetReady.altura, /* Tamanho do recorte na sprite */
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.largura, mensagemGetReady.altura,
        );
    }
}

/* Telas */
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
}

const telas = {
    inicio: {
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(telas.jogo);
        },
        atualiza() {

        }
    }
};

telas.jogo = {
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        flappyBird.desenha();
    },
    atualiza() {
        flappyBird.atualiza();

    }
};

function loop() {

    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if (telaAtiva.click) {
        telaAtiva.click();
    };
});

mudaParaTela(telas.inicio);
loop();