import { Aeronave } from "./Aeronave";
import * as fs from "fs";

export class Relatorio {
    private textoRelatorio: string = "";
    private aviaoSelecionado: Aeronave | null = null;

    gerarRelatorio(aeronave: Aeronave, cliente: string, dataEntrega: string): void {
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

    salvarEmArquivo(): void {
        if (!this.aviaoSelecionado || this.textoRelatorio === "") {
            console.log(`Erro: Gere o relatorio primeiro antes de salvar.`);
            return;
        }

        const nomeArq = `relatorio_${this.aviaoSelecionado.codigo}.txt`;
        fs.writeFileSync(nomeArq, this.textoRelatorio);
        console.log(`-> Relatorio final salvo no arquivo ${nomeArq}`);
    }
}