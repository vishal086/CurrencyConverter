const BASE_URL = ('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies')




const fromCurr = document.querySelector('.from select')
const toCurr = document.querySelector('.to select')
const btn = document.querySelector('.btn')

const result = document.querySelector('.result')
btn.addEventListener('click',async (event)=>{
    event.preventDefault()

    let amount = document.querySelector('.amount input')
    let amtVal = amount.value;
    console.log(amtVal)

    if(amtVal.value === "" || amtVal < 1)
    {
        amtVal.value = 1;
        amount.value = "1"
    }

   
    console.log(fromCurr.value,toCurr.value)
  
   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`

   let response = await fetch(URL);
   let data = await response.json();

   let rate = data[toCurr.value.toLowerCase()]
   console.log(rate)


   let finalAmount = amtVal * rate;
   result.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`


})


const dropdowns = document.querySelectorAll('.dropdown select')
for(let select of dropdowns)
{
    for(x in  countryList)
    {
        let newOption = document.createElement('option')
        newOption.innerText = x;
        newOption.value = x;
        
        if(select.name === 'from' && x === 'USD')
        {
            newOption.selected = "selected"
        }
        else if(select.name === 'to' && x === 'INR')
        {
            newOption.selected = "selected"
        }
        select.append(newOption)
    }


    select.addEventListener('change',(event) =>{
        updateFlag(event.target)
    })
}

const updateFlag = (element) =>{
    let currCode = element.value
    console.log(currCode)
    let countryCode = countryList[currCode]
    newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector('img')
    img.src = newSrc;

}