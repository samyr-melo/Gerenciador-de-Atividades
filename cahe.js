// Endereço do seu servidor Python (ex: FastAPI rodando na porta 8000)
const API_URL = "https://gerenciador-de-atividades.onrender.com/tarefas";

// 1. CARREGAR: Tenta buscar do localStorage primeiro para a tela abrir instantaneamente.
// Depois, busca do Python para atualizar se houver novidades.
async function carregarTarefas() {
    const locais = localStorage.getItem('lista_tarefas');
    if (locais) {
        renderizarTela(JSON.parse(locais));
    }

    try {
        // Busca os dados atualizados do seu backend Python
        const resposta = await fetch(API_URL);
        const tarefasDoPython = await resposta.json();
        
        // Sincroniza o localStorage com o que veio do Python
        localStorage.setItem('lista_tarefas', JSON.stringify(tarefasDoPython));
        renderizarTela(tarefasDoPython);
    } catch (erro) {
        console.error("Não conseguiu conectar ao backend Python, usando dados locais.", erro);
    }
}

// 2. ADICIONAR: Salva no Python e atualiza o localStorage em seguida
async function adicionarTarefaNoSistema(textoTarefa) {
    try {
        // Envia para o seu backend Python (@app.post("/tarefas"))
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texto: textoTarefa })
        });
        
        if (resposta.ok) {
            // Se o Python aceitou, recarrega a lista para atualizar o localStorage
            carregarTarefas();
        }
    } catch (erro) {
        alert("Erro ao salvar a tarefa no servidor Python.");
    }
}

async function removerTarefaNoSistema(id) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (resposta.ok) {
            carregarTarefas();
        } else {
            alert("Erro ao remover a tarefa.");
        }
    } catch (erro) {
        alert("Não foi possível conectar ao servidor Python.");
    }
}