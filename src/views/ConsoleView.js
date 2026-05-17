import { lerArquivo } from "../services/StorageService.js";

export async function listarUsuariosSalvos() {
  const usuarios = await lerArquivo();

  if (usuarios.length === 0) {
    console.log("\nNenhum usuário salvo ainda");
    return;
  }

  console.log("\n=== USUÁRIOS SALVOS ===");

  usuarios.forEach((u, index) => {
    if (!u) return; // Pula se houver item nulo
    console.log(`${index + 1}. ${u.login} - (${u.name || "Sem nome"})`);
  });

  console.log("=======================");
}