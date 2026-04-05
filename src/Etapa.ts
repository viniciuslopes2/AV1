import { StatusEtapa } from "./enums";
import { Funcionario } from "./Funcionario";
import * as fs from "fs";

export class Etapa {
    nome: string;
    prazo: string;
    status: StatusEtapa;
    funcionarios: Array<Funcionario>;

    constructor(nome: string, prazo: string, status: StatusEtapa = StatusEtapa.PENDENTE) {
        this.nome = nome;
        this.prazo = prazo;
        this.status = status;
        this.funcionarios = [];
    }

    iniciar(): void {
        if (this.status === StatusEtapa.PENDENTE) {
            this.status = StatusEtapa.ANDAMENTO;
            console.log(`-> Etapa ${this.nome} iniciada.`);
        } else {
            console.log(`Erro: a etapa ${this.nome} nao esta pendente para iniciar.`);
        }
    }

    finalizar(): void {
        if (this.status === StatusEtapa.ANDAMENTO) {
            this.status = StatusEtapa.CONCLUIDA;
            console.log(`-> Etapa ${this.nome} concluida.`);
        } else {
            console.log(`Erro: a etapa precisa estar em andamento pra finalizar.`);
        }
    }

    associarFuncionario(f: Funcionario): void {
        const jaEstaNaEquipe = this.funcionarios.some(func => func.id === f.id);
        if (!jaEstaNaEquipe) {
            this.funcionarios.push(f);
            console.log(`-> Funcionario ${f.nome} adicionado na etapa ${this.nome}.`);
        } else {
            console.log(`Aviso: ${f.nome} ja ta nessa etapa.`);
        }
    }

    listarFuncionarios(): Array<Funcionario> {
        console.log(`\nEquipe da Etapa: ${this.nome}`);
        this.funcionarios.forEach(f => {
            console.log(`- ${f.nome} Cargo: ${f.nivelPermissao}`);
        });
        return this.funcionarios;
    }
    
    salvar(): void {
        const dados = JSON.stringify(this);
        fs.appendFileSync("dados_etapas.txt", dados + "\n");
    }
}