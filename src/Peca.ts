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
        console.log(`[Sistema] O status da peça '${this.nome}' foi atualizado para: ${this.status}`);
    }

    salvar(): void {
        const dados = JSON.stringify(this);
        fs.appendFileSync("dados_pecas.txt", dados + "\n");
        console.log(`[Sistema] Peça '${this.nome}' salva com sucesso.`);
    }

    carregar(): void {
         console.log(`[Sistema] Funcionalidade de carregamento individual de peça acionada.`);
    }
}