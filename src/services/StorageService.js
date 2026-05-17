import { writeFile, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url"; // Importação nova para resolver caminhos do Windows

// Converte a URL do módulo atual para um caminho de arquivo nativo e limpo do sistema
const __filename = fileURLToPath(import.meta.url);
// Pega o caminho da pasta onde este arquivo está (src/services/)
const __dirname = join(__filename, "..");

// Sobe duas pastas para achar o database.json na raiz do projeto de forma 100% segura
const caminhoBanco = join(__dirname, "../../database.json");

export async function lerArquivo() {
  try {
    const usuariosText = await readFile(caminhoBanco, { encoding: "utf-8" });
    return JSON.parse(usuariosText);
  } catch (error) {
    return []; // Se não existir ou falhar, retorna array vazio
  }
}

export async function salvarUsuario(usuario) {
  if (!usuario) return;

  const usuarios = await lerArquivo();
  const usuarioJaExiste = usuarios.find((u) => u && u.id === usuario.id);

  if (usuarioJaExiste) {
    console.log("\nEsse desenvolvedor já está salvo na base de dados.");
    return;
  }

  usuarios.push(usuario);

  await writeFile(caminhoBanco, JSON.stringify(usuarios, null, 2), { encoding: "utf-8" });
  console.log("\nUsuário salvo com sucesso!");
}