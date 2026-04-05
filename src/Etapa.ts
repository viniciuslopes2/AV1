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
            console.log(`[Sistema] A etapa '${this.nome}' foi INICIADA.`);
        } else {
            console.log(`[Erro] A etapa '${this.nome}' não está PENDENTE.`);
        }
    }

    finalizar(): void {
        if (this.status === StatusEtapa.ANDAMENTO) {
            this.status = StatusEtapa.CONCLUIDA;
            console.log(`[Sistema] A etapa '${this.nome}' foi CONCLUÍDA com sucesso.`);
        } else {
            console.log(`[Erro] Não é possível finalizar. A etapa precisa estar em ANDAMENTO.`);
        }
    }

    associarFuncionario(f: Funcionario): void {
        const jaExiste = this.funcionarios.some(func => func.id === f.id);
        if (!jaExiste) {
            this.funcionarios.push(f);
            console.log(`[Sistema] Funcionário '${f.nome}' associado à etapa '${this.nome}'.`);
        } else {
            console.log(`[Aviso] O funcionário '${f.nome}' já está nesta etapa.`);
        }
    }

    listarFuncionarios(): Array<Funcionario> {
        console.log(`\n--- Funcionários na Etapa: ${this.nome} ---`);
        this.funcionarios.forEach(f => {
            console.log(`- [${f.id}] ${f.nome} (${f.nivelPermissao})`);
        });
        return this.funcionarios;
    }
    
    salvar(): void {
        const dados = JSON.stringify(this);
        fs.appendFileSync("dados_etapas.txt", dados + "\n");
    }
}