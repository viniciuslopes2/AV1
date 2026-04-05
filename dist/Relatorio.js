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
exports.Relatorio = void 0;
const fs = __importStar(require("fs"));
class Relatorio {
    constructor() {
        this.textoRelatorio = "";
        this.aviaoSelecionado = null;
    }
    gerarRelatorio(aeronave, cliente, dataEntrega) {
        this.aviaoSelecionado = aeronave;
        let relatorio = `========================================\n`;
        relatorio += `      RELATÓRIO FINAL DE ENTREGA\n`;
        relatorio += `========================================\n`;
        relatorio += `Data de Emissão: ${new Date().toLocaleDateString('pt-BR')}\n`;
        relatorio += `Cliente Destino: ${cliente}\n`;
        relatorio += `Data de Entrega: ${dataEntrega}\n\n`;
        relatorio += `[AERONAVE]\n`;
        relatorio += `Código: ${aeronave.codigo}\n`;
        relatorio += `Modelo: ${aeronave.modelo}\n`;
        relatorio += `Tipo: ${aeronave.tipo}\n`;
        relatorio += `Capacidade: ${aeronave.capacidade} pax | Alcance: ${aeronave.alcance} km\n\n`;
        relatorio += `[RESUMO DE PEÇAS] (${aeronave.pecas.length} total)\n`;
        aeronave.pecas.forEach(p => relatorio += `- ${p.nome} (${p.tipo}) - Status: ${p.status}\n`);
        relatorio += `\n[PROGRESSO DAS ETAPAS]\n`;
        aeronave.etapas.forEach(e => relatorio += `- ${e.nome} (Prazo original: ${e.prazo}) - Status: ${e.status}\n`);
        relatorio += `\n[RESULTADOS DE TESTES]\n`;
        aeronave.testes.forEach(t => relatorio += `- Teste ${t.tipo}: ${t.resultado}\n`);
        relatorio += `========================================\n`;
        this.textoRelatorio = relatorio;
        console.log(`-> Relatorio criado para o aviao ${aeronave.codigo}.`);
    }
    salvarEmArquivo() {
        if (!this.aviaoSelecionado || this.textoRelatorio === "") {
            console.log(`Erro: Gere o relatorio primeiro antes de salvar.`);
            return;
        }
        const nomeArq = `relatorio_${this.aviaoSelecionado.codigo}.txt`;
        fs.writeFileSync(nomeArq, this.textoRelatorio);
        console.log(`-> Relatorio final salvo no arquivo ${nomeArq}`);
    }
}
exports.Relatorio = Relatorio;
