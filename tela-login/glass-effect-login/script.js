/* Botão mostrar senha */
const pass_field = document.querySelector(".pass-key");
const showBtn = document.querySelector(".show");
showBtn.addEventListener("click", function () {
    if (pass_field.type === "password") {
        pass_field.type = "text";
        showBtn.textContent = "ESCONDER";
        showBtn.style.right = "42px";
        showBtn.style.color = "#3498db";
    } else {
        pass_field.type = "password";
        showBtn.textContent = "EXIBIR";
        showBtn.style.right = "13px";
        showBtn.style.color = "#222";
    }
})