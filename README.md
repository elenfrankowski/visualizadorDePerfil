# Visualizador de Perfil do GitHub

Um aplicativo de linha de comando (CLI) desenvolvido em Node.js com **TypeScript** que consome a API pública do GitHub para buscar informações de desenvolvedores e gerenciar uma equipe local. O projeto foi estruturado utilizando o padrão arquitetural **MVC (Model-View-Controller)** para garantir uma divisão clara de responsabilidades.

---

## Tecnologias Utilizadas

* **Runtime:** Node.js (v24+)
* **Linguagem:** TypeScript
* **Executor de TypeScript:** `tsx` (para execução rápida sem necessidade de build manual)
* **Persistência de Dados:** File System do Node (`node:fs/promises`) com arquivo JSON local
* **Interface:** API nativa `node:readline/promises` para interação no terminal

---

## Estrutura do Projeto

A organização das pastas segue o padrão MVC adaptado para linha de comando:

* **`src/controllers/`**: Contém o `AppController.ts`, responsável por orquestrar o fluxo do menu e a lógica de decisão.
* **`src/services/`**: Contém os serviços que lidam com dados externos (`GitHubApiService.ts`) e armazenamento local (`StorageService.ts`).
* **`src/views/`**: Contém o `ConsoleView.ts`, responsável puramente por formatar e exibir os dados textuais no terminal.
* **`main.ts`**: O ponto de entrada principal que inicializa a aplicação, agora localizado na raiz do projeto.
* **`tsconfig.json`**: Arquivo de configuração do compilador TypeScript (`NodeNext`).

---

## Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter o Node.js instalado em sua máquina.

### Passo a Passo

1. **Clone este repositório para a sua máquina local:**
   ```bash
   git clone [https://github.com/elenfrankowski/visualizadorDePerfil.git](https://github.com/elenfrankowski/visualizadorDePerfil.git)
