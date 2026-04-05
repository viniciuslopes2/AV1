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
exports.Peca = void 0;
const enums_1 = require("./enums");
const fs = __importStar(require("fs"));
class Peca {
    constructor(nome, tipo, fornecedor, status = enums_1.StatusPeca.EM_PRODUCAO) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = status;
    }
    // Atualiza o status da peça na linha de montagem
    atualizarStatus(novoStatus) {
        this.status = novoStatus;
        console.log(`[Sistema] O status da peça '${this.nome}' foi atualizado para: ${this.status}`);
    }
    // Salva a peça na base de dados (arquivo de texto)
    salvar() {
        const dados = JSON.stringify(this);
        fs.appendFileSync("dados_pecas.txt", dados + "\n");
        console.log(`[Sistema] Peça '${this.nome}' salva com sucesso.`);
    }
    carregar() {
        console.log(`[Sistema] Funcionalidade de carregamento individual de peça acionada.`);
    }
}
exports.Peca = Peca;
