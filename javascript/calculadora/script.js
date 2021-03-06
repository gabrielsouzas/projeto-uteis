const tela = document.querySelector('.tela-baixo');
const telaCima = document.querySelector('.tela-cima');

var val1 = '';
var op = '';
var clicouIgual = false;
var deletou = false;
var segundoPonto = false;
var calc = '';
var primDados = true;
var opAnt = '';
telaCima.innerHTML = '';

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
        telaCima.innerHTML = '';
    } else if (target.value === 'DEL') {
        var charApagado = tela.innerHTML.substring(tela.innerHTML.length-1, tela.innerHTML.length);
        if (testarCharApagado(charApagado)) {
            tela.innerHTML = tela.innerHTML.substring(0, tela.innerHTML.length - 1);
            if (isNaN(tela.innerHTML)) {
                val1 = tela.innerHTML.split(op)[0];
            } else {  
                telaCima.innerHTML = '';
                primDados = true;
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
                    if (telaCima.innerHTML.length > 0) {
                        opAnt = telaCima.innerHTML.substring(telaCima.innerHTML.length-1, telaCima.innerHTML.length);
                        telaCima.innerHTML += calc.split(opAnt)[1] + target.value;
                    }
                } else {
                    calc = tela.innerHTML;
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
                        if (primDados) {
                            telaCima.innerHTML += calc  + target.value;
                            primDados = false;
                        } else {
                            console.log('Calc: ' + calc)
                            console.log('telaCima: ' + telaCima.innerHTML)
                            if (telaCima.innerHTML.length > 0) {
                                opAnt = telaCima.innerHTML.substring(telaCima.innerHTML.length-1, telaCima.innerHTML.length);
                                telaCima.innerHTML += calc.split(opAnt)[1] + target.value;
                            }
                        }
                    } else {
                        clicouIgual = true;
                        console.log('telaCima: ' + telaCima.innerHTML.length);
                        //var opAnt = '';
                        if (telaCima.innerHTML.length > 0) {
                            opAnt = telaCima.innerHTML.substring(telaCima.innerHTML.length-1, telaCima.innerHTML.length);
                            telaCima.innerHTML += calc.split(opAnt)[1];
                        }
                    }
                }
            }
        /*} else {
            tela.innerHTML += target.value;
            clicouPonto = true;
        }*/

    }
}

const testarCharApagado = (char) => {
    if (char != '/' && char != 'X' && char != '-' && char != '+' && char != '%' && char != '+/-' && char != '=') {
        return true;
    } else {
        return false;
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