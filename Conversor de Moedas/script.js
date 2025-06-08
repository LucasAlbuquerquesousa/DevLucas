const ConvertButton = document.querySelector(".convert-button")
const CurrencySelect = document.querySelector(".currency-select")

function ConvertValues() {
    const InputCurrencyValue = document.querySelector(".input-currency").value
    const CurrencyValueToCovert = document.querySelector(".currency-value-to-convert")
    const CurrencyValueConverted = document.querySelector(".currency-value")

    console.log(CurrencySelect.value)

    const ConvertedValue = InputCurrencyValue

    const DolarToday = 5.25
    const EuroToday = 6.35
    const LibraToday = 6.6
    const BitcoinToday = 350000

    if (CurrencySelect.value == "Dolar") {
        CurrencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(ConvertedValue / DolarToday)
    }

    if (CurrencySelect.value == "Euro") {
        CurrencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(ConvertedValue / EuroToday)
    }


    if (CurrencySelect.value == "Libra") {
        CurrencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(ConvertedValue / LibraToday)
    }

    if (CurrencySelect.value == "Bitcoin") {
        CurrencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "BTC"
        }).format(ConvertedValue / BitcoinToday)
    }


    CurrencyValueToCovert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(InputCurrencyValue)



    console.log(ConvertedValue)
}

function ChangeCurrency() {
    const CurrencyName = document.getElementById("currency-name")
    const CurrencyImg = document.querySelector(".currency-img")

    if (CurrencySelect.value == "Dolar") {
        CurrencyName.innerHTML = "Dólar americano"
        CurrencyImg.src = "./assets/estados-unidos (1) 1.png"
    }

    if (CurrencySelect.value == "Euro") {
        CurrencyName.innerHTML = "Euro"
        CurrencyImg.src = "./assets/Euro.png"
    }

    if (CurrencySelect.value == "Libra") {
        CurrencyName.innerHTML = "Libra Esterlina"
        CurrencyImg.src = "./assets/libra 1.png"
    }

    if (CurrencySelect.value == "Bitcoin") {
        CurrencyName.innerHTML = "Bitcoin"
        CurrencyImg.src = "./assets/bitcoin 1.png"
    }

    ConvertValues()
}

CurrencySelect.addEventListener("change", ChangeCurrency)
ConvertButton.addEventListener("click", ConvertValues)