const vSenha = document.querySelector("#senha");
        let senhaAtual = parseInt(localStorage.getItem('senhaAtual')) || 0;
        let ultSenha = localStorage.getItem('ultSenha') || 0;
        const audio = new Audio('audio/AudioSenha.mp3');
        let contadorAudio = 0;
        let sequenciaTemporaria = '';
        let tempoPressionado = 0;
        let enterPressionado = false;
        let maisPressionado = false;
        let menosPressionado = false;
        let asteriscoPressionado = false;
        let pontoPressionado = false;

        mostrarSenha();

        audio.addEventListener('ended', function() {
            if (contadorAudio < 1) {
                contadorAudio++;
                audio.play();
            }
        });

        window.addEventListener('keydown', function(e) {
            const teclaPressionada = e.key;
            console.log('Tecla pressionada:', teclaPressionada);
            console.log('Sequência temporária:', sequenciaTemporaria);
        
            switch (teclaPressionada) {
                case 'Enter':
                    handleEnter();
                    break;
                case '-':
                case '+':
                    handleOperation(teclaPressionada === '+' ? 1 : -1);
                    break;
                case '*':
                    handleAsterisk();
                    break;
                case ',':
                    handleDot();
                    break;
                case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
                    handleNumeric(parseInt(teclaPressionada));
                    break;
                case '.':
                    handleDot();
                    break;
            }
        
            localStorage.setItem('senhaAtual', senhaAtual);
            localStorage.setItem('ultSenha', ultSenha);
            mostrarSenha();
        });
        
        window.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                enterPressionado = false; // Libera a tecla Enter após o tempo de espera
                sequenciaTemporaria = ''; // Limpa a sequência temporária
            } else if (e.key === '*') {
                asteriscoPressionado = false;
            }
        });
        
        function handleEnter() {
            if (!enterPressionado) {
                enterPressionado = true;
                senhaAtual = sequenciaTemporaria ? parseInt(sequenciaTemporaria) : senhaAtual < 999 ? senhaAtual + 1 : 1;
                ultSenha = 'P';
        
                audio.play();
                alterarCorSenha('yellow');
        
                setTimeout(function() {
                    alterarCorSenha('white');
                    mostrarSenha();
                }, 1000);
            }
        }
        
        function handleOperation(operacao) {
            if (senhaAtual > 0 && !asteriscoPressionado) {
                ultSenha = operacao > 0 ? 'P' : 'O';
                senhaAtual = operacao > 0 ? senhaAtual < 999 ? senhaAtual + operacao : 1 : senhaAtual + operacao;
                audio.play();
                alterarCorSenha('yellow');
        
                setTimeout(function () {
                    alterarCorSenha('white');
                    mostrarSenha();
                }, 1000);
            }
        }
        
        function handleAsterisk() {
            if (!asteriscoPressionado) {
                asteriscoPressionado = true;
                const tempoInicial = Date.now();
        
                const intervalo = setInterval(function() {
                    const tempoAtual = Date.now();
                    const tempoPressionado = tempoAtual - tempoInicial;
        
                    if (!asteriscoPressionado || tempoPressionado >= 1000) {
                        clearInterval(intervalo);
        
                        if (tempoPressionado >= 1000) {
                            senhaAtual = 0;
                            ultSenha = 'O';
                            audio.play();
                            alterarCorSenha('yellow');
        
                            setTimeout(function() {
                                alterarCorSenha('white');
                                mostrarSenha();
                            }, 1000);
                        }
                    }
                }, 100);
            }
        }
        
        function handleDot() {
            if (!pontoPressionado) {
                pontoPressionado = true;
        
                contadorAudio = 0;
                audio.play();
                alterarCorSenha('yellow');
        
                setTimeout(function() {
                    alterarCorSenha('white');
                    pontoPressionado = false;
                }, 1000);
            }
        }
        
        function handleNumeric(digit) {
            if (sequenciaTemporaria.length < 3) {
                sequenciaTemporaria += digit;
            } else {
                sequenciaTemporaria = senhaAtual.toString().padStart(3, '0');
            }
        }
        
        function mostrarSenha() {
            vSenha.innerHTML = 'Senha: ' + senhaAtual.toLocaleString('pt-BR', {minimumIntegerDigits: 3});
        }
        
        function alterarCorSenha(cor) {
            document.getElementById('senha').style.color = cor;
        }
                
                // IMPEDIR ABERTURA DE MENU DE CONTEXTO COM CLIQUE DE BOTAO DIREITO DO MOUSE
                document.addEventListener('contextmenu', function (event) {
                 event.preventDefault();
                 });
                

                //IMPEDIR QUE AS TECLAS + E - AFETEM O ZOOM DA PAGINA
                window.addEventListener('keydown', function(event){
                    if(event.keyCode === 107 || event.keyCode === 109 || event.key === '8' || event.key === '9'){
                        event.preventDefault();
                    }
                });