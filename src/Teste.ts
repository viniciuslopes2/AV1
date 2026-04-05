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
        const dados = JSON.stringify(this);
        fs.appendFileSync("dados_testes.txt", dados + "\n");
        console.log(`[Sistema] Teste ${this.tipo} salvo com sucesso.`);
    }

    carregar(): void {
        console.log(`[Sistema] Funcionalidade de carregamento individual de teste acionada.`);
    }
}