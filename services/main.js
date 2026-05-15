import { stdin, stdout } from "process"; //standardIn E standardOut -> entrada padrão e saída padrão
import { createInterface } from "node:readline/promises";
import { writeFile, readFile } from "node:fs/promises"; // file-system

//---Função de Busca---
async function buscarUsuario(username) {
  const urlBase = "https://api.github.com/users/";

  try {
    //Faz a requisição HTTP para API do Github
    const response = await fetch(`${urlBase}${username}`);

    //Se a resposta NÃO for bem-sucedida (status fora do range 200-299)
    if (!response.ok) {
      if (response.status === 404) {
        //Erro específico para quando o username digitado não existe
        throw new Error("Usuário não encontrado no Github");
      }
      //Outros erros (problemas no servidor, queda de conexão...)
      throw new Error("Falha na requisição da busca");
    }

    //Se deu certo, transforma o corpo da resposta em um objeto JavaScript
    const body = await response.json();
    return body; //Retorna os dados do usuário

  } catch (error) {
    console.error(`Erro: ${error.message}`);
    return null; //Retorna null para indicar que a busca falhou
  }
}

//---Leitura do Arquivo---
async function lerArquivo() {
  try {
    //Tenta ler o arquivo de texto bruto
    const usuariosText = await readFile("./database.json", {
      encoding: "utf-8",
    });
    //Converte JSON para array de objetos
    return JSON.parse(usuariosText);
  } catch (error) {
    // Se o arquivo não existir ou estiver corrompido, retorna um array vazio
    // Isso evita que o programa trave no primeiro uso
    return [];
  }
}

//---Função de Salvamento---
async function salvarArquivo(usuario) {
  // Se por algum motivo a função for chamada sem um usuário válido, para na hora
  if (!usuario) return;

  //Busca a lista atual de usuários já salvos
  const usuarios = await lerArquivo();

  // Procura na lista se já existe alguém com o mesmo ID
  // Adicionamos 'u &&' para garantir que o programa pule itens nulos ou inválidos no JSON
  const usuarioJaExiste = usuarios.find((u) => u && u.id === usuario.id);

  //Se encontrou (não undefined), entra no bloco
  if (usuarioJaExiste) {
    console.log("Esse usuário já está salvo na base de dados");
    return; // Early Return: encerra a função aqui e impede a duplicidade
  }

  //Se passou pelo teste acima, adiciona o usuário ao array existente
  usuarios.push(usuario);

  // Grava a lista atualizada no arquivo.
  await writeFile(`./database.json`, JSON.stringify(usuarios, null, 2), { //O 'null, 2' serve para formatar o JSON com espaços, deixando-o legível
    encoding: "utf-8",
  });

  console.log("Usuário salvo com sucesso!");
}

//---Listar Usuários---
async function listarUsuariosSalvos() {
  // Lê o arquivo para obter o array de usuários atualizado
  const usuarios = await lerArquivo();

  // Se o array estiver vazio, para aqui
  if (usuarios.length === 0) {
    console.log("\nNenhum usuário salvo ainda");
    return;
  }

  console.log("\n=== USUÁRIOS SALVOS ===");

  // O .forEach percorre cada usuário do array. 
  // 'u' representa o usuário atual e 'index' é a posição dele no array
  usuarios.forEach((u, index) => {
    // SE o usuário 'u' for nulo ou inválido, o 'if' pula ele e não deixa o código quebrar
    if (!u) return;

    // Exibe o número (index + 1 para não começar do zero), o login e o nome
    console.log(`${index + 1}. ${u.login} - (${u.name || "Sem nome"})`);
  });

  console.log("=======================");
}

//---Função Principal---
async function main() {
    const interfaceConsole = createInterface(stdin, stdout);
    let continuar = true; // Variável de controle do laço de repetição

    while (continuar) {
        console.log("\n=========================");
        console.log("          MENU           ");
        console.log("=========================");
        console.log(" 1. Buscar Usuário no GitHub");
        console.log(" 2. Listar Usuários Salvos");
        console.log(" 3. Sair");
        console.log("=========================");

        // Espera o usuário digitar o número da opção desejada
        const opcao = await interfaceConsole.question("Escolha uma opção: ");

        // --- OPÇÃO 1: BUSCAR E SALVAR ---
        if (opcao === "1") {
          const usernameInput = await interfaceConsole.question("\nDigite o username do GitHub: ");
          const usuario = await buscarUsuario(usernameInput);

          // Se o usuário não foi encontrado, o 'continue' faz o programa voltar ao menu
          if (!usuario) continue; 

          // Se encontrou, exibe as informações na tela
          console.log("\n--- Usuário Encontrado ---");
          console.log(`Nome: ${usuario.name || "Não informado"}`);
          console.log(`Username: ${usuario.login}`);
          console.log("--------------------------\n");

          // Pergunta se deseja salvar
          const desejaSalvar = await interfaceConsole.question("Deseja salvar este usuário? (s/n): ");

          if (desejaSalvar.toLowerCase() !== "s") {
            console.log("\nOperação de salvamento cancelada.");
            continue; // Corta o fluxo aqui e volta para o início do while
          }
          
          await salvarArquivo(usuario);

          continue; // Concluiu a Opção 1, volta para o menu inicial
        }

        //---Opção 2 - Listar
        if (opcao === "2") {
          await listarUsuariosSalvos(); 
          continue; 
        }

        //Opção 3 - Sair
        if (opcao === "3") {
            console.log("\nEncerrando o programa");
            continuar = false; // Altera para false para que o 'while' não execute novamente
            continue; // Volta para o topo e encerra o laço
        }

        console.log("\nOpção inválida. Digite 1, 2 ou 3");
    }
    interfaceConsole.close();
  }

main().catch((err) => console.log("Erro inesperado:", err));