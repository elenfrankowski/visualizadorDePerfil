export async function buscarUsuario(username) {
  const urlBase = "https://api.github.com/users/";

  try {
    const response = await fetch(`${urlBase}${username}`, {
      headers: { "User-Agent": "Node-CLI-App" }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Usuário não encontrado no GitHub.");
      }
      throw new Error("Falha na requisição da busca.");
    }

    return await response.json();
  } catch (error) {
    console.error(`\nErro: ${error.message}`);
    return null;
  }
}