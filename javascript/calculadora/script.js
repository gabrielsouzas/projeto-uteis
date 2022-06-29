const tela = document.querySelector('.tela');

var val1 = '';
var op = '';

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
    } else if (target.value === 'DEL') {
        tela.innerHTML = tela.innerHTML.substring(0, tela.innerHTML.length - 1);
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
    if (!isNaN(target.value)) {
        tela.innerHTML += target.value;
    } else {
        if (val1.length === 0) {
            val1 = tela.innerHTML;
            op = target.value;
            tela.innerHTML += target.value;
        } else {
            tela.innerHTML = detecOperacao(val1, tela.innerHTML.split(op)[1], op);
            val1 = tela.innerHTML;
            op = target.value;
            if(!target.value === '='){ 
                tela.innerHTML += target.value;
            }
        }

    }
}

function detecOperacao(valor1, valor2, operador) {
    if (operador === '/') {
        return Number(valor1) / Number(valor2);
    } else if (operador === 'X') {
        return Number(valor1) * Number(valor2);
    } else if (operador === '-') {
        return Number(valor1) - Number(valor2);
    } else if (operador === '+') {
        return Number(valor1) + Number(valor2);
    } else if (operador === '%') {
        return Number(valor1) % Number(valor2);
    }
}

criarEventos();