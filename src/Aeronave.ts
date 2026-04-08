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

    static carregar(codigoBusca: string): Aeronave | null {
        const nomeArq = `aeronave_${codigoBusca}.json`;
        if (fs.existsSync(nomeArq)) {
            const dadosLidos = fs.readFileSync(nomeArq, "utf-8");
            const obj = JSON.parse(dadosLidos);
            const aviaoSalvo = new Aeronave(obj.codigo, obj.modelo, obj.tipo, obj.capacidade, obj.alcance);
            aviaoSalvo.pecas = obj.pecas || [];
            aviaoSalvo.etapas = obj.etapas || [];
            aviaoSalvo.testes = obj.testes || [];
            return aviaoSalvo;
        }
        return null;
    }
}