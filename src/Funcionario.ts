import { NivelPermissao } from "./enums";
import * as fs from "fs";

export class Funcionario {
    id: string;
    nome: string;
    telefone: string;
    endereco: string;
    usuario: string;
    senha: string;
    nivelPermissao: NivelPermissao;

    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelPermissao: NivelPermissao) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha = senha;
        this.nivelPermissao = nivelPermissao;
    }

    autenticar(usuarioTentativa: string, senhaTentativa: string): boolean {
        const sucesso = (this.usuario === usuarioTentativa && this.senha === senhaTentativa);
        return sucesso;
    }

    salvar(): void {
        const dados = JSON.stringify(this);
        fs.appendFileSync("dados_funcionarios.txt", dados + "\n");
        console.log(`[Sistema] Funcionário '${this.nome}' salvo com sucesso.`);
    }

    carregar(): void {
        console.log(`[Sistema] Funcionalidade de carregamento individual de funcionário acionada.`);
    }
}