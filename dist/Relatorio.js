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
        this.conteudoGerado = "";
        this.aeronaveRelacionada = null;
    }
    // Agora o método exige o cliente e a data de entrega, conforme o PDF
    gerarRelatorio(aeronave, cliente, dataEntrega) {
        this.aeronaveRelacionada = aeronave;
        let texto = `========================================\n`;
        texto += `      RELATÓRIO FINAL DE ENTREGA\n`;
        texto += `========================================\n`;
        texto += `Data de Emissão: ${new Date().toLocaleDateString('pt-BR')}\n`;
        texto += `Cliente Destino: ${cliente}\n`;
        texto += `Data de Entrega: ${dataEntrega}\n\n`;
        texto += `[AERONAVE]\n`;
        texto += `Código: ${aeronave.codigo}\n`;
        texto += `Modelo: ${aeronave.modelo}\n`;
        texto += `Tipo: ${aeronave.tipo}\n`;
        texto += `Capacidade: ${aeronave.capacidade} pax | Alcance: ${aeronave.alcance} km\n\n`;
        texto += `[RESUMO DE PEÇAS] (${aeronave.pecas.length} total)\n`;
        aeronave.pecas.forEach(p => texto += `- ${p.nome} (${p.tipo}) - Status: ${p.status}\n`);
        texto += `\n[PROGRESSO DAS ETAPAS]\n`;
        aeronave.etapas.forEach(e => texto += `- ${e.nome} (Prazo original: ${e.prazo}) - Status: ${e.status}\n`);
        texto += `\n[RESULTADOS DE TESTES]\n`;
        aeronave.testes.forEach(t => texto += `- Teste ${t.tipo}: ${t.resultado}\n`);
        texto += `========================================\n`;
        this.conteudoGerado = texto;
        console.log(`[Sistema] Relatório gerado em memória para a aeronave ${aeronave.codigo}.`);
    }
    salvarEmArquivo() {
        if (!this.aeronaveRelacionada || this.conteudoGerado === "") {
            console.log(`[Erro] Nenhum relatório foi gerado. Chame 'gerarRelatorio()' primeiro.`);
            return;
        }
        const nomeArquivo = `relatorio_${this.aeronaveRelacionada.codigo}.txt`;
        fs.writeFileSync(nomeArquivo, this.conteudoGerado);
        console.log(`[Sucesso] Relatório salvo com sucesso no arquivo: '${nomeArquivo}'`);
    }
}
exports.Relatorio = Relatorio;
