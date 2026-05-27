import { UsuarioGithub } from "../models/UsuarioGithub.js";

export class UsuarioGithubValidator {
    static validate(value: unknown): UsuarioGithub {
        // 1. Valida se é um objeto válido e não nulo
        if (!this.isObject(value)) {
            throw new Error("Erro de Tipo: Os dados recebidos não são um objeto válido.");
        }

        const dados = value as Record<string, any>;

        // 2. Verifica se as propriedades obrigatórias existem
        if (!("login" in dados) || !("id" in dados)) {
            throw new Error("Erro de Tipo: Propriedades obrigatórias (id ou login) estão ausentes.");
        }

        // 3. Validação do ID (Number)
        if (typeof dados.id !== "number") {
            throw new Error("Erro de Tipo: O campo 'id' deve ser um número.");
        }

        // 4. Validação do LOGIN (String + Regex)
        if (!this.isString(dados.login)) {
            throw new Error("Erro de Tipo: O campo 'login' deve ser uma string.");
        }

        const usuarioRegex = /^(?!.*--)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
        if (!usuarioRegex.test(dados.login)) {
            throw new Error("Formato inválido: O username (login) do GitHub possui caracteres não permitidos.");
        }

        // 5. Validação e Higienização do NAME
        let nomeFinal = "Não informado";
        if ("name" in dados && dados.name !== null) {
            if (!this.isString(dados.name)) {
                throw new Error("Erro de Tipo: O campo 'name' deve ser uma string ou nulo.");
            }
            if (dados.name.trim() !== "") { //trim() -> remove todos os espaços em branco do início e do fim de uma string
                nomeFinal = dados.name.trim();
            }
        }

        return new UsuarioGithub(dados.id, dados.login, nomeFinal);
    }

    private static isObject(value: unknown): value is object {
        return typeof value === "object" && value !== null;
    }

    private static isString(value: unknown): value is string {
        return typeof value === "string";
    }
}