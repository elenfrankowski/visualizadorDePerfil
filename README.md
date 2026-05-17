# Visualizador de Perfil do GitHub 

Um aplicativo de linha de comando (CLI) desenvolvido em Node.js que consome a API pública do GitHub para buscar informações de desenvolvedores e gerenciar uma equipe local. O projeto foi estruturado utilizando o padrão arquitetural **MVC (Model-View-Controller)** para garantir a divisão clara de responsabilidades.

---

## Tecnologias Utilizadas

* **Runtime:** Node.js (v24+)
* **Linguagem:** JavaScript (ES Modules)
* **Persistência de Dados:** File System do Node (`node:fs/promises`) com arquivo JSON local
* **Interface:** API nativa `node:readline/promises` para interação no terminal

---

## Estrutura do Projeto

A organização das pastas segue o padrão MVC adaptado para terminal:

* **`src/controllers/`**: Contém o `AppController.js`, responsável por gerenciar o fluxo do menu e a lógica de decisão.
* **`src/services/`**: Contém os serviços que lidam com dados externos (`GitHubApiService.js`) e armazenamento local (`StorageService.js`).
* **`src/views/`**: Contém o `ConsoleView.js`, responsável puramente por formatar e exibir os dados textuais no terminal.
* **`src/main.js`**: O ponto de entrada que inicializa a aplicação.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter o **Node.js** instalado em sua máquina.

### Passo a Passo

1. Clone este repositório para a sua máquina local:
   ```bash
   git clone [https://github.com/seu-usuario/visualizador_de_perfil.git](https://github.com/seu-usuario/visualizador_de_perfil.git)
