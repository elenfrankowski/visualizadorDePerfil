import type { Interface } from "node:readline/promises";
import { buscarUsuario } from "../services/GitHubApiService.js";
import { listarUsuariosSalvos } from "../views/ConsoleView.js";
import { salvarUsuario } from "../services/StorageService.js";
import { UsuarioGithubValidator } from "../validators/UsuarioGithubValidator.js"; // Importação do novo validador estático

export async function menuController(interfaceConsole: Interface): Promise<boolean> {
  console.log("\n=========================");
  console.log("          MENU           ");
  console.log("=========================");
  console.log(" 1. Buscar Usuário no GitHub");
  console.log(" 2. Listar Usuários Salvos");
  console.log(" 3. Sair");
  console.log("=========================");

  const opcao = await interfaceConsole.question("Escolha uma opção: ");

  // --- OPÇÃO 1: BUSCAR, VALIDAR E SALVAR ---
  if (opcao === "1") {
    const usernameInput = await interfaceConsole.question("\nDigite o username do GitHub: ");
    
    // 1. Buscamos os dados brutos (unknown/any) vindos da API externa
    const dadosBrutos = await buscarUsuario(usernameInput);

    if (!dadosBrutos) return true; // Se a API não retornar nada, volta pro menu

    try {
      // 2. O validador estático intercepta, limpa os dados com Regex e tipa o objeto
      const usuario = UsuarioGithubValidator.validate(dadosBrutos);

      // 3. Exibição segura dos dados validados
      console.log("\n--- Usuário Encontrado ---");
      console.log(`Nome: ${usuario.name}`);
      console.log(`Username: ${usuario.login}`);
      console.log("--------------------------\n");

      const desejaSalvar = await interfaceConsole.question("Deseja salvar este usuário? (s/n): ");

      if (desejaSalvar.toLowerCase() !== "s") {
        console.log("\nOperação de salvamento cancelada.");
        return true;
      }

      // 4. Salvando o objeto já higienizado pelo validador
      await salvarUsuario(usuario);
      
    } catch (error: any) {
      // Se o Regex ou o Type Guard capturarem algo errado, o erro é tratado aqui
      console.log(`\n Erro de Validação: ${error.message}`);
    }

    return true;
  }

  // --- OPÇÃO 2: LISTAR ---
  if (opcao === "2") {
    await listarUsuariosSalvos();
    return true;
  }

  // --- OPÇÃO 3: SAIR ---
  if (opcao === "3") {
    console.log("\nEncerrando o programa");
    return false; // Retorna false para o main saber que deve fechar
  }

  console.log("\nOpção inválida. Digite 1, 2 ou 3");
  return true;
}