const form = document.querySelector(".formulario-fale-conosco")
const mascara = document.querySelector(".mascara-formulario")

const masc = document.querySelector(".mascara-formulario")

const header = document.querySelector(".header")

function cliqueiNoBotao() {
    form.style.left = "39%"
    form.style.transform = "translateX (-50%)"
    mascara.style.visibility = "visible"
}

function mascaraClique() {
    mascara.style.visibility = "hidden"
    form.style.left = "-299px"
    form.style.top = "30%"
}

function Header() {
    form.style.left = "37%"
    form.style.transform = "translateX (-50%)"
    mascara.style.visibility = "visible"
}