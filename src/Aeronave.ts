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
        console.log(`\n--- Dados da Aeronave ${this.codigo} ---`);
        console.log(`Modelo: ${this.modelo}`);
        console.log(`Tipo: ${this.tipo}`);
        console.log(`Passageiros: ${this.capacidade}`);
        console.log(`Alcance: ${this.alcance} km`);
        console.log(`Pecas cadastradas: ${this.pecas.length}`);
        console.log(`Etapas registradas: ${this.etapas.length}`);
        console.log(`Testes feitos: ${this.testes.length}`);
        console.log(`----------------------------------\n`);
    }

    salvar(): void {
        const dadosAeronave = JSON.stringify(this, null, 4);
        const nomeArq = `aeronave_${this.codigo}.json`;
        fs.writeFileSync(nomeArq, dadosAeronave);
        console.log(`-> Aeronave salva em ${nomeArq}`);
    }

    carregar(): void {
        console.log(`Carregando aeronave ${this.codigo}...`);
    }
}