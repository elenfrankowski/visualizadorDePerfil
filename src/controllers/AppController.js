import { buscarUsuario } from "../services/GitHubApiService.js";
import { listarUsuariosSalvos } from "../views/ConsoleView.js";
import { salvarUsuario } from "../services/StorageService.js";

export async function menuController(interfaceConsole) {
  console.log("\n=========================");
  console.log("          MENU           ");
  console.log("=========================");
  console.log(" 1. Buscar Usuário no GitHub");
  console.log(" 2. Listar Usuários Salvos");
  console.log(" 3. Sair");
  console.log("=========================");

  const opcao = await interfaceConsole.question("Escolha uma opção: ");

  // --- OPÇÃO 1: BUSCAR E SALVAR ---
  if (opcao === "1") {
    const usernameInput = await interfaceConsole.question("\nDigite o username do GitHub: ");
    const usuario = await buscarUsuario(usernameInput);

    if (!usuario) return true; // Se não achou, volta pro menu

    console.log("\n--- Usuário Encontrado ---");
    console.log(`Nome: ${usuario.name || "Não informado"}`);
    console.log(`Username: ${usuario.login}`);
    console.log("--------------------------\n");

    const desejaSalvar = await interfaceConsole.question("Deseja salvar este usuário? (s/n): ");

    if (desejaSalvar.toLowerCase() !== "s") {
      console.log("\nOperação de salvamento cancelada.");
      return true;
    }

    await salvarUsuario(usuario);
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