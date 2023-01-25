const input = document.querySelector(".input-tarefa")
const btn = document.querySelector(".btn-add-tarefa")
const tarefas = document.querySelector(".tarefas")

function criaLi() {
    const li = document.createElement("li");
    return li;
}

input.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if(!input.value) return;
        criarTarefa(input.value)
    }
})

function limpaInput() {
    input.value = '';
    input.focus();
}


function criaBotaonApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(botaoApagar);
}

function criarTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaonApagar(li);
    salvarTarefas();
}

btn.addEventListener('click', function() {
    if(!input.value) return;
    criarTarefa(input.value)
});

document.addEventListener('click', function(e) {
    const el = e.target;

    if(el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas() {
    const liTarefas = salvarTarefas.querySelectorAll('li')
    const listaTarefas = [];

    for (let tarefa of liTarefas) {
    let tarefaText = tarefa.innerText;
    tarefaText = tarefaText.replace('Apagar', '')
    listaTarefas.push(tarefaText)
    }
    const tarefasJSON = JSON.stringify(listaTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

function adicionarTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas')
    const listadeTarefas = JSON.parse(tarefas)

    for(let tarefa of listadeTarefas) {
        criarTarefa(tarefa)
    }
}
adicionarTarefasSalvas();