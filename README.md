# 📚 Planejador de Estudos Personalizado

Este é um projeto web desenvolvido com **Flask** que ajuda os usuários a organizar seus estudos de forma eficiente, com base no tempo disponível, tópicos, prioridades e dificuldades. Além disso, oferece recomendações de vídeos do YouTube para aprofundar os estudos em cada tópico.

## 🚀 Funcionalidades

- **Entrada Personalizada de Dados:**
  - Insira o tempo disponível para estudar (em minutos ou horas).
  - Adicione tópicos de estudo com prioridade (Alta, Média, Baixa) e dificuldade (Fácil, Médio, Difícil).
- **Plano de Estudos Automatizado:**
  - Geração de um plano de estudos diário/semanal com alocação proporcional de tempo entre os tópicos.
- **Recomendações de Vídeos:**
  - Sugestões automáticas de vídeos do YouTube relacionados a cada tópico.
- **Interface Dinâmica:**
  - Adicione tópicos de forma dinâmica com uma interface amigável e interativa.

---

## 🛠️ Tecnologias Utilizadas

- **Back-End:** Flask
- **Front-End:** HTML, CSS, JavaScript
- **Bibliotecas de Python:**
  - `Flask`: Para gerenciar rotas e lógica do servidor.
  - `pytube`: Para buscar vídeos no YouTube.
- **Template Engine:** Jinja2 (incluso no Flask)

---

## 📂 Estrutura do Projeto

```plaintext
.
├── app.py                # Código principal do Flask
├── templates/
│   ├── index.html        # Página inicial com o formulário
│   └── study_plan.html   # Página que exibe o plano de estudos gerado
├── static/
│   ├── style.css         # Arquivo de estilos CSS
│   └── script.js         # Scripts para funcionalidades dinâmicas
└── README.md             # Documentação do projeto
