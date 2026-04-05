import { TipoAeronave } from "./enums";
import { Peca } from "./Peca";
import { Etapa } from "./Etapa";
import { Teste } from "./Teste";
import * as fs from "fs";

export class Aeronave {
    codigo: string;
    modelo: string;
    tipo: TipoAeronave;
    capacidade: number;
    alcance: number;
    pecas: Array<Peca>;
    etapas: Array<Etapa>;
    testes: Array<Teste>;

    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
        this.pecas = [];
        this.etapas = [];
        this.testes = [];
    }

    detalhes(): void {
        console.log(`\n========================================`);
        console.log(`   DETALHES DA AERONAVE: ${this.codigo}`);
        console.log(`========================================`);
        console.log(`Modelo.....: ${this.modelo}`);
        console.log(`Tipo.......: ${this.tipo}`);
        console.log(`Capacidade.: ${this.capacidade} passageiros`);
        console.log(`Alcance....: ${this.alcance} km`);
        console.log(`Peças......: ${this.pecas.length} cadastradas`);
        console.log(`Etapas.....: ${this.etapas.length} registradas`);
        console.log(`Testes.....: ${this.testes.length} realizados`);
        console.log(`========================================\n`);
    }

    salvar(): void {
        const dados = JSON.stringify(this, null, 4);
        const nomeArquivo = `aeronave_${this.codigo}.json`;
        fs.writeFileSync(nomeArquivo, dados);
        console.log(`[Sistema] Dados da aeronave ${this.codigo} salvos em '${nomeArquivo}'.`);
    }

    carregar(): void {
        console.log(`[Sistema] Funcionalidade de carregamento da aeronave ${this.codigo} acionada.`);
    }
}