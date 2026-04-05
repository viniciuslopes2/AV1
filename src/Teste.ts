import { TipoTeste, ResultadoTeste } from "./enums";
import * as fs from "fs";

export class Teste {
    tipo: TipoTeste;
    resultado: ResultadoTeste;

    constructor(tipo: TipoTeste, resultado: ResultadoTeste) {
        this.tipo = tipo;
        this.resultado = resultado;
    }

    salvar(): void {
        const dadosTexto = JSON.stringify(this);
        fs.appendFileSync("dados_testes.txt", dadosTexto + "\n");
        console.log(`-> Teste ${this.tipo} salvo com sucesso.`);
    }

    carregar(): void {
        console.log(`Carregando o teste...`);
    }
}