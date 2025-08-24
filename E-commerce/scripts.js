let textoPesquisa = ""
let categoriaAtual = "all"
let containerProdutos = document.querySelector(".products-container");
let input = document.querySelector(".search-input");
let todosBotoes = document.querySelectorAll(".category-btn")

function mostrarProdutos() {
    let htmlProdutos = "";

    let produtosFiltrados = produtos.filter(produto => {

        let passouCategoria = (categoriaAtual === "all" || produto.categoria === categoriaAtual)

        let passouPesquisa = produto.nome.toLowerCase().includes(textoPesquisa.toLowerCase())
        // includes = verifica se um valor existe dentro do Outro

        return passouCategoria && passouPesquisa;

    })

    produtosFiltrados.forEach(produto => {

        htmlProdutos = htmlProdutos + `
            <div class="product-card">
                <img class="product-img" src="${produto.imagem}" alt="${produto.nome}">
                <div class="product-info">
                    <h3 class="product-name">${produto.nome}</h3>
                    <p class="product-description">${produto.descricao}</p>
                    <p class="product-discont">${produto.desconto}% Off</p>
                    <p class="product-full-price">De: R$ ${produto.precoOriginal}</p>
                    <p class="product-price">Por: R$ ${produto.preco}</p>
                    <button class="product-button">Ver Detalhes</button>
                </div>
            </div>
        `;
    });

    containerProdutos.innerHTML = htmlProdutos;
}

function pesquisar() {
    textoPesquisa = input.value

    mostrarProdutos()
}

function trocarCategoria(categoria) {

    categoriaAtual = categoria

    todosBotoes.forEach(botao => {
        botao.classList.remove('active')

        if (botao.getAttribute("data-category") === categoria) {
            botao.classList.add('active')
        }
    })

    mostrarProdutos();

}

window.addEventListener('DOMContentLoaded', () => {

    mostrarProdutos()

    input.addEventListener('input', pesquisar)

    todosBotoes.forEach(botao => {

        botao.addEventListener('click', () => {

            let categoria = botao.getAttribute("data-category");

            trocarCategoria(categoria);

        });
    })
})