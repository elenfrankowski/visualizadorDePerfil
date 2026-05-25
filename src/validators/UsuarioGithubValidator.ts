import { UsuarioGithub } from "../models/UsuarioGithub.js";

export class UsuarioGithubValidator {
  static validate(value: unknown): UsuarioGithub {
    
    // 1. Verifica se o dado recebido é um objeto válido e não é nulo
    if (!value || typeof value !== "object") {
      throw new Error("Resposta inválida da API: Os dados não são um objeto.");
    }

    // Força o TypeScript a entender 'value' como um dicionário de propriedades para poder checar as chaves
    const dados = value as Record<string, any>;

    // 2. Validação com Regex: Para garantir que o 'login' do GitHub seja válido
    // Regra do GitHub: Apenas letras, números e hifens, máximo de 39 caracteres.
    const regexLoginValido = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

    if (!dados.login || !regexLoginValido.test(dados.login)) {
      throw new Error("O username do GitHub possui um formato inválido.");
    }

    // 3. Validação de consistência do Nome
    if (dados.name !== undefined && typeof dados.name !== "string") {
      throw new Error("O campo 'name' precisa ser uma string de texto.");
    }

    // 4. Se passou por tudo, retorna a instância limpa e segura
    return new UsuarioGithub(
      dados.id,
      dados.login,
      dados.name || "Não informado",
      dados.avatar_url,
      dados.html_url
    );
  }
}