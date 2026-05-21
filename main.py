from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Minha API de Tarefas")

app = FastAPI()

# Libera o seu frontend para acessar a API Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em produção, mude para a URL do seu site
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Nosso banco de dados em memória (o mesmo que você criou)
lista_de_tarefas = [
    {"id": 1, "texto": "ESTUDAR PYTHON", "status": "PENDENTE"},
    {"id": 2, "texto": "ACADEMIA", "status": "PENDENTE"}
]

# Definimos a estrutura que o usuário deve enviar (Validação de dados)
class NovaTarefa(BaseModel):
    texto: str

@app.get("/tarefas")
def listar_tarefas():
    """Rota para o navegador buscar todas as tarefas"""
    return lista_de_tarefas

@app.post("/tarefas")
def adicionar_tarefa(tarefa: NovaTarefa):
    """Rota para adicionar uma nova tarefa"""
    texto_formatado = tarefa.texto.strip().upper()
    
    if not texto_formatado:
        raise HTTPException(status_code=400, detail="A descrição não pode ser vazia.")
        
    nova_tarefa = {
        "id": len(lista_de_tarefas) + 1,
        "texto": texto_formatado,
        "status": "PENDENTE"
    }
    lista_de_tarefas.append(nova_tarefa)
    return {"mensagem": "Tarefa adicionada com sucesso!", "tarefa": nova_tarefa}

@app.put("/tarefas/{tarefa_id}/concluir")
def concluir_tarefa(tarefa_id: int):
    """Rota para marcar uma tarefa como concluída"""
    for tarefa in lista_de_tarefas:
        if tarefa["id"] == tarefa_id:
            tarefa["status"] = "CONCLUIDO"
            return {"mensagem": f"Tarefa {tarefa_id} concluída!"}
            
    raise HTTPException(status_code=404, detail="Tarefa não encontrada.")

@app.delete("/tarefas/{tarefa_id}")
def deletar_tarefa(tarefa_id: int):
    """Rota para deletar uma tarefa"""
    for tarefa in lista_de_tarefas:
        if tarefa["id"] == tarefa_id:
            lista_de_tarefas.remove(tarefa)
            return {"mensagem": f"Tarefa {tarefa_id} deletada!"}
            
    raise HTTPException(status_code=404, detail="Tarefa não encontrada.")