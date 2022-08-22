const rates ={}
let resultValue = ''

const elementUSDBuy = document.querySelector('[data-value="USD-buy"]')
const elementUSDSale = document.querySelector('[data-value="USD-sale"]')
const elementEURBuy = document.querySelector('[data-value="EUR-buy"]')
const elementEURSale = document.querySelector('[data-value="EUR-sale"]')

const input = document.querySelector('#input')
const result = document.querySelector('#result')
const selectTo =document.querySelector('#selectTo')
const selectFrom =document.querySelector('#selectFrom')
const chageButton =document.querySelector('#chageButton')



getCurrencies ()

async function getCurrencies () {
    const response = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    const data = await response.json()
    const result = await data

    rates.USD = result[0]
    rates.EUR = result[1]

    elementEURBuy.textContent = Number(rates.EUR.buy).toFixed(2)
    elementUSDBuy.textContent = Number(rates.USD.buy).toFixed(2)
    elementEURSale.textContent = Number(rates.EUR.sale).toFixed(2)
    elementUSDSale.textContent = Number(rates.USD.sale).toFixed(2)
}


input.oninput = convertValue

selectTo.oninput = convertValue

selectFrom.oninput = convertValue







function convertValue (){
    if (selectFrom.value === selectTo.value){
        result.value = input.value
    } else {
        if (selectFrom.value === 'UAH'){
    result.value = Number(parseFloat(input.value) / rates[selectTo.value].sale).toFixed(2)
    } else{
        if (selectFrom.value != 'UAH' && selectTo.value != 'UAH')
        {result.value = Number(parseFloat(input.value) * (rates[selectTo.value].sale / rates[selectFrom.value].sale )).toFixed(2)
    }else {
        result.value = Number(parseFloat(input.value) * rates[selectFrom.value].sale).toFixed(2)
    }
    }
    }
}

chageButton.onclick = function chageButton (){
    input.value =  result.value
    result.value = 0

}


