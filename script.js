// Garante que o script rode após o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    // Atualiza a hora na tela assim que a página carrega
    atualizarDataHora();
    // Define um intervalo para atualizar a hora a cada segundo
    setInterval(atualizarDataHora, 1000);

    // Permite adicionar tarefa apertando "Enter" no input
    document.getElementById('inputTarefa').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            adicionarTarefa();
        }
    });
});

function adicionarTarefa() {
    const inputTarefa = document.getElementById("inputTarefa");
    const tarefaTexto = inputTarefa.value;

    // Validação para não adicionar tarefas em branco
    if (tarefaTexto.trim() === "") {
        alert("Por favor, digite uma tarefa.");
        return; // Para a execução da função se o campo estiver vazio
    }

    const listaTarefas = document.getElementById("listaTarefas");
    const novaTarefa = document.createElement("li");

    // Cria um elemento span para o texto da tarefa
    const textoTarefa = document.createElement("span");
    textoTarefa.textContent = tarefaTexto;
    novaTarefa.appendChild(textoTarefa);

    // Cria o ícone da lixeira
    const iconeLixeira = document.createElement("i");
    iconeLixeira.className = "fas fa-trash"; // Classes do Font Awesome para o ícone

    // Adiciona a função de remover a tarefa ao clicar na lixeira
    iconeLixeira.onclick = function() {
        // Adiciona uma animação de "fade out" antes de remover
        novaTarefa.style.transition = 'opacity 0.5s';
        novaTarefa.style.opacity = '0';
        setTimeout(() => {
            listaTarefas.removeChild(novaTarefa);
        }, 500); // Remove o elemento após a animação
    };

    novaTarefa.appendChild(iconeLixeira);
    listaTarefas.appendChild(novaTarefa);

    // Exibe mensagem de sucesso e a faz desaparecer
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = "Tarefa adicionada com sucesso!";
    setTimeout(function() {
        mensagem.textContent = "";
    }, 3000);

    // Limpa o campo do input após adicionar a tarefa
    inputTarefa.value = "";
    inputTarefa.focus(); // Coloca o cursor de volta no input
}

function atualizarDataHora() {
    const elementoDataHora = document.getElementById("dataHora");
    const agora = new Date();

    // Formata a data para o padrão brasileiro
    const opcoesData = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dataFormatada = agora.toLocaleDateString('pt-BR', opcoesData);

    // Formata a hora
    const horaFormatada = agora.toLocaleTimeString('pt-BR');

    // Exibe no HTML
    elementoDataHora.innerHTML = `${dataFormatada} | ${horaFormatada}`;
}
