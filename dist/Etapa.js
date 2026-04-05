"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Etapa = void 0;
const enums_1 = require("./enums");
const fs = __importStar(require("fs"));
class Etapa {
    constructor(nome, prazo, status = enums_1.StatusEtapa.PENDENTE) {
        this.nome = nome;
        this.prazo = prazo;
        this.status = status;
        this.funcionarios = [];
    }
    iniciar() {
        if (this.status === enums_1.StatusEtapa.PENDENTE) {
            this.status = enums_1.StatusEtapa.ANDAMENTO;
            console.log(`[Sistema] A etapa '${this.nome}' foi INICIADA.`);
        }
        else {
            console.log(`[Erro] A etapa '${this.nome}' não está PENDENTE.`);
        }
    }
    finalizar() {
        if (this.status === enums_1.StatusEtapa.ANDAMENTO) {
            this.status = enums_1.StatusEtapa.CONCLUIDA;
            console.log(`[Sistema] A etapa '${this.nome}' foi CONCLUÍDA com sucesso.`);
        }
        else {
            console.log(`[Erro] Não é possível finalizar. A etapa precisa estar em ANDAMENTO.`);
        }
    }
    associarFuncionario(f) {
        // Evita duplicidade de funcionário na mesma etapa
        const jaExiste = this.funcionarios.some(func => func.id === f.id);
        if (!jaExiste) {
            this.funcionarios.push(f);
            console.log(`[Sistema] Funcionário '${f.nome}' associado à etapa '${this.nome}'.`);
        }
        else {
            console.log(`[Aviso] O funcionário '${f.nome}' já está nesta etapa.`);
        }
    }
    listarFuncionarios() {
        console.log(`\n--- Funcionários na Etapa: ${this.nome} ---`);
        this.funcionarios.forEach(f => {
            console.log(`- [${f.id}] ${f.nome} (${f.nivelPermissao})`);
        });
        return this.funcionarios;
    }
    // Método extra para garantir persistência
    salvar() {
        const dados = JSON.stringify(this);
        fs.appendFileSync("dados_etapas.txt", dados + "\n");
    }
}
exports.Etapa = Etapa;
