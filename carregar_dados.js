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




// Ajuste a URL caso sua porta do FastAPI/Flask seja diferente
const API_URL = "https://gerenciador-de-atividades.onrender.com/tarefas";

// 1. CARREGAR DADOS (LocalStorage -> Backend)
async function carregarTarefas() {
    const container = document.getElementById('lista-tarefas-container');
    
    // Passo A: Tenta carregar imediatamente o cache salvo no navegador
    const cacheLocal = localStorage.getItem('lista_tarefas');
    if (cacheLocal) {
        renderizarTela(JSON.parse(cacheLocal));
    } else {
        container.innerHTML = `<p style="color: #6b7280; text-align: center;">Carregando...</p>`;
    }

    // Passo B: Sincroniza buscando os dados em tempo real da sua API Python
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) throw new Error("Erro na requisição");
        
        const tarefasDoPython = await resposta.json();
        
        // Atualiza o localStorage com os dados mais recentes do servidor
        localStorage.setItem('lista_tarefas', JSON.stringify(tarefasDoPython));
        renderizarTela(tarefasDoPython);
    } catch (erro) {
        console.warn("Servidor Python offline. Exibindo dados locais do localStorage.");
    }
}

// 2. RENDERIZAR NA TELA (Injeta o HTML dinamicamente)
function renderizarTela(tarefas) {
    const container = document.getElementById('lista-tarefas-container');
    container.innerHTML = ""; // Limpa a lista antes de desenhar

    if (tarefas.length === 0) {
        container.innerHTML = `<p style="color: #6b7280; text-align: center;">Nenhuma tarefa encontrada.</p>`;
        return;
    }

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        if (tarefa.status === "CONCLUIDO") {
            li.classList.add('concluida');
        }

        // Cria o HTML interno de cada item
        // Localize esse bloco dentro da função renderizarTela:
    li.innerHTML = `
        <span class="tarefa-texto">${tarefa.texto}</span>
        <div style="display: flex; gap: 8px; align-items: center;">
            ${tarefa.status === "PENDENTE" 
                ? `<button class="btn-concluir" onclick="concluirTarefaNoSistema(${tarefa.id})">Concluir</button>` 
                : '✅'
            }
            <!-- NOVO BOTÃO DE REMOVER -->
            <button class="btn-remover" onclick="removerTarefaNoSistema(${tarefa.id})" style="background-color: #ef4444; padding: 6px 12px; font-size: 14px;">Excluir</button>
        </div>
    `;
        container.appendChild(li);
    });
}

// 3. ENVIAR NOVA TAREFA PARA O PYTHON
async function adicionarTarefaDoInput() {
    const input = document.getElementById('nova-tarefa-input');
    const texto = input.value.trim();

    if (!texto) {
        alert("Por favor, digite alguma tarefa!");
        return;
    }

    try {
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texto: texto })
        });

        if (resposta.ok) {
            input.value = ""; // Limpa o campo
            await carregarTarefas(); // Atualiza a tela e o localStorage
        } else {
            const erroData = await resposta.json();
            alert(erroData.detail || "Erro ao adicionar tarefa.");
        }
    } catch (erro) {
        alert("Não foi possível conectar ao servidor Python.");
    }
}

// 4. ATUALIZAR STATUS NO PYTHON
async function concluirTarefaNoSistema(id) {
    try {
        const resposta = await fetch(`${API_URL}/${id}/concluir`, {
            method: 'PUT'
        });

        if (resposta.ok) {
            await carregarTarefas(); // Recarrega os dados atualizados
        } else {
            alert("Erro ao concluir a tarefa.");
        }
    } catch (erro) {
        alert("Não foi possível conectar ao servidor Python.");
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

// Inicializa o app assim que a página abre no navegador
window.onload = carregarTarefas;

