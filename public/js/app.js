console.log('Javascript no front-end')
const symbol = 'PETR4.SA'

const cotacoesForm = document.querySelector('form')
const mainMesage = document.getElementById('symbol')
const p0 = document.getElementById('description')
const p1 = document.getElementById('price')
const p2 = document.getElementById('price_open')
const p3 = document.getElementById('day_high')
const p4 = document.getElementById('day_low')
p0.hidden = true
p1.hidden = true
p2.hidden = true
p3.hidden = true
p4.hidden = true

cotacoesForm.addEventListener('submit',(e)=>{
    e.stopPropagation();
    e.preventDefault();
    mainMesage.innerText = 'buscando...'
    p0.hidden = true
    p1.hidden = true
    p2.hidden = true
    p3.hidden = true
    p4.hidden = true
    
    const ativo = document.querySelector('input').value
    
    if(!ativo){
        mainMesage.innerHTML =`<span class="error_validity">O ativo deve ser informado!</span>`
        return;    
    }

    fetch(`/cotacao?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                mainMesage.innerHTML =`<span class="error_validity">${data.error.message}</span>`
                p0.innerHTML = `Código: ${data.error.code}`
                console.log(`Alguma coisa deu errada: ${data.error.message}.\nCódigo: ${data.error.code}`)
            }else{
                mainMesage.innerHTML = `Ativo: ${data.symbol}`
                p0.hidden = false
                p1.hidden = false
                p2.hidden = false
                p3.hidden = false
                p4.hidden = false
                p0.title = `Descrição: ${data.description}`
                p1.title = `Preço: ${data.price}`
                p2.title = `Preço de abertura: ${data.price_open}`
                p3.title = `Maior alta do dia: ${data.day_high}`
                p4.title = `Maior baixa do dia: ${data.day_low}`
                p0.innerHTML = `${data.description}`
                p1.innerHTML = `${data.price}`
                p2.innerHTML = `${data.price_open}`
                p3.innerHTML = `${data.day_high}`
                p4.innerHTML = `${data.day_low}`
                console.log(data)
            }
        })
    })
})