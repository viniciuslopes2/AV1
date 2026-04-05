import { Aeronave } from "./Aeronave";
import * as fs from "fs";

export class Relatorio {
    private conteudoGerado: string = "";
    private aeronaveRelacionada: Aeronave | null = null;

    gerarRelatorio(aeronave: Aeronave, cliente: string, dataEntrega: string): void {
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

    salvarEmArquivo(): void {
        if (!this.aeronaveRelacionada || this.conteudoGerado === "") {
            console.log(`[Erro] Nenhum relatório foi gerado. Chame 'gerarRelatorio()' primeiro.`);
            return;
        }

        const nomeArquivo = `relatorio_${this.aeronaveRelacionada.codigo}.txt`;
        fs.writeFileSync(nomeArquivo, this.conteudoGerado);
        console.log(`[Sucesso] Relatório salvo com sucesso no arquivo: '${nomeArquivo}'`);
    }
}