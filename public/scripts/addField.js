//procurar o botao
document.querySelector("#add-time")
//quando clicar 
.addEventListener('click', cloneField)
//executar uma acao
function cloneField() {
    //duplicar os campos
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) //boolean
    //limpar os campos, que campos?
    const fields = newFieldContainer.querySelectorAll('input') 
    //para cada campo limpar
    fields.forEach(function(field){
        //pegar o field do momento e limpa ele
        field.value = ""
    })
    //colocar na pagina
    document.querySelector('#schedule-items').appendChild(newFieldContainer)
}



