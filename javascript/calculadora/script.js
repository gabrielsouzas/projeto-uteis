
const criarEventos = () => {
    for (let index = 0; index < 20; index++) {
        const tecla = document.getElementsByClassName('tecla')[index];
        tecla.addEventListener('click', calcular())
    }
}

const calcular = () => {
    
}

criarEventos();