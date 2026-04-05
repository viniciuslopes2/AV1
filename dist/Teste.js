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
exports.Teste = void 0;
const fs = __importStar(require("fs"));
class Teste {
    constructor(tipo, resultado) {
        this.tipo = tipo;
        this.resultado = resultado;
    }
    // Persiste os dados deste teste em um arquivo local
    salvar() {
        const dados = JSON.stringify(this);
        // Usa appendFileSync para adicionar uma nova linha sem apagar o arquivo existente
        fs.appendFileSync("dados_testes.txt", dados + "\n");
        console.log(`[Sistema] Teste ${this.tipo} salvo com sucesso.`);
    }
    // O método carregar no UML é um void de instância. 
    // Para simplificar, este método simula um recarregamento básico.
    carregar() {
        console.log(`[Sistema] Funcionalidade de carregamento individual de teste acionada.`);
    }
}
exports.Teste = Teste;
