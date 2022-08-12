const btnCadastrar = document.querySelector('#signUp')
const btnEntrar = document.querySelector('#signIn')
const container = document.querySelector('#container')

// Evento clique do botão cadastrar que ativa o painel da direita
btnCadastrar.addEventListener('click', () => {
    container.classList.add("right-panel-active")
})

// Evento clique do botão entrar que desativa o painel da direita
btnEntrar.addEventListener('click', () => {
    container.classList.remove("right-panel-active")
})