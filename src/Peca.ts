import { TipoPeca, StatusPeca } from "./enums";
import * as fs from "fs";

export class Peca {
    nome: string;
    tipo: TipoPeca;
    fornecedor: string;
    status: StatusPeca;

    constructor(nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca = StatusPeca.EM_PRODUCAO) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = status;
    }

    atualizarStatus(novoStatus: StatusPeca): void {
        this.status = novoStatus;
        console.log(`Status da peça ${this.nome} mudou para: ${this.status}`);
    }

    salvar(): void {
        const dadosTexto = JSON.stringify(this);
        fs.appendFileSync("dados_pecas.txt", dadosTexto + "\n");
        console.log(`-> Peça ${this.nome} salva no arquivo.`);
    }

    carregar(): void {
         console.log(`Carregando peça...`);
    }
}