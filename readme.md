# 📝 Minha Lista de Tarefas (To-Do List)

Uma aplicação full-stack de gerenciamento de tarefas diárias, desenvolvida com foco em performance, persistência de dados local/remota e design responsivo otimizado para dispositivos móveis (Mobile-First).

## 🚀 Links do Projeto
*   **Frontend (Live Demo):** [Insira o link da Vercel aqui]
*   **Backend (API URL):** [Insira o link do Render aqui]

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
*   **HTML5 & CSS3:** Estrutura e estilização limpa, utilizando variáveis CSS e conceitos de flexbox/media queries para responsividade.
*   **JavaScript (Vanilla):** Manipulação assíncrona do DOM usando `Fetch API` para comunicação com o servidor e integração com a `Web Storage API`.

### **Backend**
*   **Python:** Linguagem base para a construção das regras de negócio.
*   **FastAPI:** Framework web moderno e de alta performance para a construção da API.
*   **Uvicorn:** Servidor ASGI para rodar a aplicação Python.
*   **Pydantic:** Validação de dados e tipagem estruturada.

---

## 📦 Arquitetura e Fluxo de Dados

A aplicação utiliza uma estratégia híbrida para garantir a melhor experiência do usuário:
1.  **Cache com LocalStorage:** Ao abrir a página, o JavaScript carrega instantaneamente as tarefas salvas no navegador. Isso evita telas de carregamento em conexões lentas.
2.  **Sincronização com Backend:** Logo após exibir os dados locais, o frontend faz uma requisição assíncrona para a API em Python, atualizando a tela com o estado mais recente do servidor e atualizando o cache local.
3.  **Operações Completas (CRUD):** É possível adicionar novas tarefas, marcar tarefas como concluídas e removê-las permanentemente tanto da interface quanto do servidor.

---

## 📂 Estrutura do Repositório

```text
├── index.html          # Interface web e lógica de comunicação (JS)
├── style.css           # Estilização responsiva (Mobile-First)
├── main.py             # Backend Python com as rotas da API (FastAPI)
├── requirements.txt    # Dependências do Python para o deploy
└── render.yaml         # Configuração automatizada de infraestrutura no Render

```
🔧 Como Executar o Projeto Localmente
1. Configurando o Backend (Python)
Certifique-se de ter o Python instalado em sua máquina.


# Clone o repositório
git clone [https://github.com/seu-usuario/seu-repositorio.git]

# Acesse a pasta do projeto
cd seu-repositorio

# Instale as dependências necessárias
pip install -r requirements.txt

# Inicie o servidor local ouvindo todas as interfaces de rede (importante para testes mobile)
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
A documentação interativa da API estará disponível automaticamente em: http://localhost:8000/docs

2. Configurando o Frontend
Abra o arquivo index.html.

Altere a variável API_URL para apontar para o seu servidor local:

JavaScript
const API_URL = "http://localhost:8000/tarefas";

3. Abra o arquivo `index.html` diretamente no seu navegador ou utilize a extensão *Live Server* do VS Code.

---

## ☁️ Deploy na Nuvem

*   **Backend:** Hospedado gratuitamente no **Render**. *(Nota: Por estar no plano Free, o servidor entra em hibernação após 15 minutos de inatividade. O primeiro acesso após esse período pode levar cerca de 30 segundos para carregar enquanto a instância inicializa).*
*   **Frontend:** Hospedado na **Vercel**, conectado diretamente ao repositório para deploys automáticos a cada `git push`.

---
Desenvolvido por Samyr Melo - Sinta-se à vontade para contribuir! 🚀