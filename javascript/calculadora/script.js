const tela = document.querySelector('.tela');

var val1 = '';
var op = '';
var clicouIgual = false;
var deletou = false;
var segundoPonto = false;

const criarEventos = () => {
    for (let index = 0; index < 20; index++) {
        const tecla = document.getElementsByClassName('tecla')[index];
        tecla.value = tecla.innerHTML;
        tecla.addEventListener('click', calcular);
    }
}

const calcular = ({ target }) => {
    if (target.value === 'C') {
        tela.innerHTML = '';
        val1 = '';
        op = '';
        segundoPonto = false;
        clicouIgual = false;
    } else if (target.value === 'DEL') {
        var charApagado = tela.innerHTML.substring(tela.innerHTML.length-1, tela.innerHTML.length);
        tela.innerHTML = tela.innerHTML.substring(0, tela.innerHTML.length - 1);
        if (isNaN(tela.innerHTML)) {
            val1 = tela.innerHTML.split(op)[0];
        } else {
            console.log(charApagado)
            if (isNaN(charApagado)) {
                val1 = '';
            } else {
                val1 = tela.innerHTML;
            }
        }
        if ((Number(tela.innerHTML) % 1 === 0)) {
            segundoPonto = false;
        } else {
            segundoPonto = true;
        }
        //deletou = true;
    } else if (target.value === '+/-') {
        
    } else if (target.value === '=') {
        execOpe(target);
    } else {
        //!isNaN(target.value)
        if (tela.innerHTML.length === 0) {
            tela.innerHTML = target.value;
        } else {
            if (isNaN(tela.innerHTML.substr(-1))) {
                if (!isNaN(target.value)) {
                    execOpe(target);
                }
            } else {
                execOpe(target);
            }
            
        }
    }
}

function execOpe(target) {
    if (!isNaN(target.value) || target.value === '.' || target.value === 'DEL') {
        if (target.value === '.') {
            if (!segundoPonto) {
                tela.innerHTML += target.value;
                segundoPonto = true;
            }
        } else {
            tela.innerHTML += target.value;
        }
    } else {
        segundoPonto = false;
        //if (target.value != '.') {
            if (val1.length === 0) {
                if (target.value != '=') {
                    val1 = tela.innerHTML;
                    op = target.value;
                    tela.innerHTML += target.value;
                }
            } else {
                //deletou = false;
                //clicouPonto = false;
                if (clicouIgual) {
                    val1 = tela.innerHTML;
                    op = target.value;
                    tela.innerHTML += target.value;
                    clicouIgual = false;
                } else {
                    var res = detecOperacao(val1, tela.innerHTML.split(op)[1], op);
                    console.log(res);
                    if (!(res % 1 === 0)) {
                        res = res.toFixed(2);
                        segundoPonto = true;
                    } else {
                        segundoPonto = false;
                    }
                    tela.innerHTML = res;
                    val1 = tela.innerHTML;
                    op = target.value;
                    if (target.value != '=') {
                        tela.innerHTML += target.value;
                        clicouIgual = false;
                    } else {
                        clicouIgual = true;
                    }
                }
            }
        /*} else {
            tela.innerHTML += target.value;
            clicouPonto = true;
        }*/

    }
}

function detecOperacao(valor1, valor2, operador) {
    console.log(valor1 + operador + valor2)
    if (operador === '/') {
        return Number(valor1) / Number(valor2);
    } else if (operador === 'X') {
        return Number(valor1) * Number(valor2);
    } else if (operador === '-') {
        return Number(valor1) - Number(valor2);
    } else if (operador === '+') {
        return Number(valor1) + Number(valor2);
    } else if (operador === '%') {
        return (Number(valor2) * Number(valor1))/100;
    }
}

criarEventos();