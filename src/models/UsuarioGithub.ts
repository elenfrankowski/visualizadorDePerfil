export class UsuarioGithub {
  constructor(
    public id: number,
    public login: string,
    public name: string,
    public avatar_url?: string, // O "?" torna o campo opcional
    public html_url?: string    // O "?" torna o campo opcional
  ) {}
}