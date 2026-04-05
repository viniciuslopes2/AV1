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

    autenticar(userDigitado: string, senhaDigitada: string): boolean {
        const logou = (this.usuario === userDigitado && this.senha === senhaDigitada);
        return logou;
    }

    salvar(): void {
        const dados = JSON.stringify(this);
        fs.appendFileSync("dados_funcionarios.txt", dados + "\n");
        console.log(`-> Funcionario ${this.nome} salvo na base.`);
    }

    carregar(): void {
        console.log(`Carregando dados do funcionario...`);
    }
}