let webhook = 'https://lucasalbuquerque.app.n8n.cloud/webhook/animacao-css'

async function CliqueiNoBotao() {
    let textInput = document.querySelector(".input-animacao").value
    let codigo = document.querySelector(".area-codigo")
    let areaResultado = document.querySelector(".area-resultado")

    let butao = document.querySelector(".button-magic")
    butao.disabled = true;
    butao.textContent = 'Criando...'
    butao.style.background = '#888888'

    let resposta = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: textInput })
    })

    let resultado = await resposta.json()

    let info = JSON.parse(resultado.Resposta)

    codigo.innerHTML = info.code
    areaResultado.innerHTML = info.preview

    document.head.insertAdjacentHTML('beforeend', "<style>" + info.style + "</style>")

    butao.disabled = false;
    butao.textContent = "Criar Mágica"
    butao.style.background = '#37e359'

}