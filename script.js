console.log('[DevMagrinho] Flappy Bird')

let frames = 0;
const som_HIT = new Audio();
som_HIT.src = './efeitos/efeitos_hit.wav';

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
function criaChao() {
    const chao = {
        spritex: 0,
        spritey: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,

        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;

            // console.log('[chao.x]', chao.x);
            // console.log('[repeteEm]',repeteEm);
            // console.log('[movimentacao]', movimentacao % repeteEm);

            chao.x = movimentacao % repeteEm;
        },
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
    return chao;
}


/* Flappy Bird */
function fazColisao(flappyBird, chao) {
    const flappyBirdy = flappyBird.y + flappyBird.altura;
    const chaoy = chao.y;

    if (flappyBirdy >= chaoy) {
        return true;
    }

    return false;
}

function criaFlappyBird() {
    const flappyBird = {
        spritex: 0,
        spritey: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 3.6,

        pula() {
            // console.log('devo pular')
            // console.log('antes', flappyBird.velocidade);
            flappyBird.velocidade = - flappyBird.pulo;
            // console.log('depois', flappyBird.velocidade);
        },

        gravidade: 0.25,
        velocidade: 0,

        atualiza() {
            if (fazColisao(flappyBird, globais.chao)) {
                // console.log('Fez colisão');
                som_HIT.play();

                mudaParaTela(Telas.GAME_OVER);
                return;
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimentos: [
            { spritex: 0, spritey: 0, }, // asa pra cima
            { spritex: 0, spritey: 26, }, // asa no meio
            { spritex: 0, spritey: 52, }, // asa pra baixo
            { spritex: 0, spritey: 26, }, // asa no meio
        ],
        frameAtual: 0,
        atualizaOFrameatual() {
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if (passouOIntervalo) {
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;
            }
        },
        desenha() {
            flappyBird.atualizaOFrameatual();
            const { spritex, spritey } = flappyBird.movimentos[flappyBird.frameAtual]

            contexto.drawImage(
                sprites, /* Imagem */
                spritex, spritey, /* Sprite x, Sprite y */
                flappyBird.largura, flappyBird.altura, /* Tamanho do recorte na sprite */
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
        }
    }
    return flappyBird;
}

const flappyBird = {
    spritex: 0,
    spritey: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 3.6,

    pula() {
        // console.log('devo pular')
        // console.log('antes', flappyBird.velocidade);
        flappyBird.velocidade = - flappyBird.pulo;
        // console.log('depois', flappyBird.velocidade);
    },

    gravidade: 0.25,
    velocidade: 0,

    atualiza() {
        if (fazColisao(flappyBird, chao)) {
            // console.log('Fez colisão');

            mudaParaTela(Telas.INICIO);
            return;
        }
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
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

// Mensagem Get Ready
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

// Mensagem Games Over
const mensagemGameOver = {
    spritex: 134,
    spritey: 153,
    largura: 226,
    altura: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites, /* Imagem */
            mensagemGameOver.spritex, mensagemGameOver.spritey, /* Sprite X, Sprite Y */
            mensagemGameOver.largura, mensagemGameOver.altura, /* Tamanho do recorte na sprite */
            mensagemGameOver.x, mensagemGameOver.y,
            mensagemGameOver.largura, mensagemGameOver.altura,
        );
    }
}

// [Canos]
function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
            canos.pares.forEach(function (par) {
                const yRandom = par.y;
                const espacamentoEntreCanos = 90;

                const canoCeuX = par.x;
                const canoCeuY = yRandom;

                // [Cano do Céu]
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )

                // [Cano do Chão]
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }
            })
        },
        temColisaoComOFlappyBird(par) {
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            if ((globais.flappyBird.x + globais.flappyBird.largura) >= par.x) {
                if (cabecaDoFlappy <= par.canoCeu.y) {
                    return true;
                }

                if (peDoFlappy >= par.canoChao.y) {
                    return true;
                }
            }
            return false;
        },
        pares: [],
        atualiza() {
            const passou100Frames = frames % 100 === 0;
            if (passou100Frames) {
                console.log('Passou 100 frames');
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                });
            }



            canos.pares.forEach(function(par) {
                par.x = par.x - 2;

                if (canos.temColisaoComOFlappyBird(par)) {
                    console.log('Você perdeu!')
                    som_HIT.play();
                    mudaParaTela(Telas.GAME_OVER);
                }

                if (par.x + canos.largura <= 0) {
                    canos.pares.shift();
                }
            });

        }
    }

    return canos;
}

function criaPlacar() {
    const placar = {
        pontuacao: 0,
        desenha() {
            contexto.font = '35px "VT323"';
            contexto.textAlign = 'right'
            contexto.fillStyle = 'white';
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);
        },
        atualiza() {
            const intervaloDeFrames = 20;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if (passouOIntervalo) {
                placar.pontuacao = placar.pontuacao + 1;
            }
        }
    }
    return placar;
}

// Telas
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
        }
    }
};

Telas.JOGO = {
    inicializa() {
        globais.placar = criaPlacar();
    },

    desenha() {
        planoDeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha();

    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza();
        globais.placar.atualiza();
    }
};

Telas.GAME_OVER = {
    desenha() {
        mensagemGameOver.desenha();
    },
    atualiza() {

    },
    click() {
        mudaParaTela(Telas.INICIO)
    }
}

function loop() {

    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    };
});

mudaParaTela(Telas.INICIO);
loop();