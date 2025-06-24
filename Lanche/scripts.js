const list = document.querySelector('ul')
const buttonShowAll = document.querySelector('.show-all')
const buttonMapAll = document.querySelector('.map-all')
const sumAll = document.querySelector('.sum-all')
const buttonFilterAll = document.querySelector('.filter-all')

function formatCurrency(value) {
const newValue = value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
})
return newValue
}

function showAll(productsArray) {
    let myLi = ``

    productsArray.forEach(product => {
        myLi += `
        <li>
            <img src=${product.src} alt="Bacon-Egg">
            <p>${product.name}</p>
            <p class="item-price">${formatCurrency(product.price)}</p>
        </li>
`
    })
    list.innerHTML = myLi
}

function mapAll() {
    const newPrices = menuOptions.map((product) => ({
        ...product,
        price: product.price * 0.9
    }))
    showAll(newPrices)
}

function sumAllItens() {
    const totalValue = menuOptions.reduce((acc, curr) => acc + curr.price, 0)

    list.innerHTML = `
    
    <li>
    <p>O valor total dos produtos do cardapio é de: R$ ${totalValue},00</p>
    </li>
    `

    console.log(totalValue)
}

function filterAll() {
    const filterJustVegan = menuOptions.filter ( (product) => product.vegan )

    showAll (filterJustVegan)
}

buttonShowAll.addEventListener('click', () => showAll(menuOptions))
buttonMapAll.addEventListener('click', mapAll)
sumAll.addEventListener('click', sumAllItens)
buttonFilterAll.addEventListener('click', filterAll)