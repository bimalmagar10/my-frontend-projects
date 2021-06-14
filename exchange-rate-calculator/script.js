window.onload = () => {
const currencyOne =document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');
console.log(currencyOne,currencyTwo,amountOne,amountTwo);

const calculate = () => {
     const currency_one = currencyOne.value;
     const currency_two = currencyTwo.value;

     fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
     						.then(response => response.json())
     						.then(data => {
     							console.log(data);
     							const dataRate = data.rates[currency_two];
     							rate.innerText = `1${currency_one} = ${dataRate.toFixed(3)}${currency_two}` 
     							amountTwo.value = dataRate.toFixed(3);
     						});
}
currencyOne.addEventListener('change',calculate);
amountOne.addEventListener('change',calculate);
currencyTwo.addEventListener('change',calculate);
amountTwo.addEventListener('change',calculate);
swap.addEventListener('click',() => {
	const temp = currencyOne.value;
	currencyOne.value = currencyTwo.value;
	currencyTwo.value = temp;
	calculate();
});
calculate();

const values=() => {fetch(`https://api.ratesapi.io/api/latest/?base=USD`)
                                                      .then(response => response.json())
                                                      .then(data => console.log(data)) ;}
values();


console.log(typeOf(this));


}