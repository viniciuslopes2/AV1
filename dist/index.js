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
const readlineSync = __importStar(require("readline-sync"));
const child_process_1 = require("child_process");
const Aeronave_1 = require("./Aeronave");
const Peca_1 = require("./Peca");
const Etapa_1 = require("./Etapa");
const Funcionario_1 = require("./Funcionario");
const Teste_1 = require("./Teste");
const Relatorio_1 = require("./Relatorio");
const enums_1 = require("./enums");
// Força o terminal do Windows a usar UTF-8 para corrigir bugs de acentuação (ç, ã, á, etc)
if (process.platform === "win32") {
    try {
        (0, child_process_1.execSync)("chcp 65001", { stdio: "ignore" });
    }
    catch (e) { }
}
let aeronaveAtual = null;
console.clear();
console.log("=================================================");
console.log("  Aerocode v1.0 - Gestão de Produção de Aeronaves");
console.log("=================================================");
let rodando = true;
const regexNaoVazio = /.+/;
const msgErroVazio = "[Erro] Este campo é obrigatório e não pode ser vazio. Tente novamente.";
while (rodando) {
    console.log("\n--- MENU PRINCIPAL ---");
    console.log("1 - Cadastrar Aeronave");
    console.log("2 - Adicionar Peça");
    console.log("3 - Avançar Etapa");
    console.log("4 - Associar Funcionário à Aeronave");
    console.log("5 - Registrar Teste");
    console.log("6 - Exibir Detalhes da Aeronave");
    console.log("7 - Gerar e Salvar Relatório Final");
    console.log("8 - Salvar Todos os Dados");
    console.log("0 - Sair");
    const opcao = readlineSync.question("\nEscolha uma opcao: ");
    switch (opcao) {
        case "1":
            console.log("\n-- Cadastro de Aeronave --");
            const codigo = readlineSync.question("Codigo (Ex: EMB-101): ", { limit: regexNaoVazio, limitMessage: msgErroVazio });
            const modelo = readlineSync.question("Modelo (Ex: Bandeirante): ", { limit: regexNaoVazio, limitMessage: msgErroVazio });
            const opcoesTipo = ["COMERCIAL", "MILITAR"];
            const indiceTipo = readlineSync.keyInSelect(opcoesTipo, "Tipo da Aeronave: ", { cancel: "Cancelar Operação" });
            if (indiceTipo === -1) {
                console.log("\n[Aviso] Cadastro cancelado.");
                break;
            }
            const tipo = indiceTipo === 0 ? enums_1.TipoAeronave.COMERCIAL : enums_1.TipoAeronave.MILITAR;
            let capacidade = 0;
            while (capacidade <= 0) {
                capacidade = readlineSync.questionInt("Capacidade de Passageiros (Ex: 150): ", { limitMessage: "[Erro] Digite um numero valido." });
                if (capacidade <= 0)
                    console.log("[Erro] A capacidade deve ser maior que zero.");
            }
            let alcance = 0;
            while (alcance <= 0) {
                alcance = readlineSync.questionInt("Alcance em km (Ex: 3000): ", { limitMessage: "[Erro] Digite um numero valido." });
                if (alcance <= 0)
                    console.log("[Erro] O alcance deve ser maior que zero.");
            }
            aeronaveAtual = new Aeronave_1.Aeronave(codigo, modelo, tipo, capacidade, alcance);
            console.log("\n[Sucesso] Aeronave cadastrada com sucesso!");
            break;
        case "2":
            if (!aeronaveAtual) {
                console.log("[Aviso] Cadastre uma aeronave primeiro (Opcao 1).");
                break;
            }
            console.log("\n-- Adicionar Peca --");
            const nomePeca = readlineSync.question("Nome da Peca: ", { limit: regexNaoVazio, limitMessage: msgErroVazio });
            const fornecedor = readlineSync.question("Fornecedor: ", { limit: regexNaoVazio, limitMessage: msgErroVazio });
            const peca = new Peca_1.Peca(nomePeca, enums_1.TipoPeca.NACIONAL, fornecedor, enums_1.StatusPeca.PRONTA);
            aeronaveAtual.pecas.push(peca);
            console.log(`[Sucesso] Peca '${nomePeca}' adicionada.`);
            break;
        case "3":
            if (!aeronaveAtual) {
                console.log("[Aviso] Cadastre uma aeronave primeiro.");
                break;
            }
            console.log("\n-- Avancar Etapa --");
            const nomeEtapa = readlineSync.question("Nome da Nova Etapa: ", { limit: regexNaoVazio, limitMessage: msgErroVazio });
            const prazoEtapa = readlineSync.question("Prazo (DD/MM/AAAA): ", { limit: regexNaoVazio, limitMessage: msgErroVazio });
            const etapa = new Etapa_1.Etapa(nomeEtapa, prazoEtapa, enums_1.StatusEtapa.PENDENTE);
            etapa.iniciar();
            etapa.finalizar();
            aeronaveAtual.etapas.push(etapa);
            break;
        case "4":
            if (!aeronaveAtual) {
                console.log("[Aviso] Cadastre uma aeronave primeiro.");
                break;
            }
            console.log("\n-- Cadastrar Funcionario Rapido --");
            const nomeFunc = readlineSync.question("Nome do Funcionario: ", { limit: regexNaoVazio, limitMessage: msgErroVazio });
            const func = new Funcionario_1.Funcionario("F001", nomeFunc, "00000-0000", "SJC", "user", "123", enums_1.NivelPermissao.ENGENHEIRO);
            if (aeronaveAtual.etapas.length > 0) {
                aeronaveAtual.etapas[0].associarFuncionario(func);
            }
            else {
                console.log("[Aviso] Crie ao menos uma etapa primeiro (Opcao 3).");
            }
            break;
        case "5":
            if (!aeronaveAtual) {
                console.log("[Aviso] Cadastre uma aeronave primeiro.");
                break;
            }
            const teste = new Teste_1.Teste(enums_1.TipoTeste.AERODINAMICO, enums_1.ResultadoTeste.APROVADO);
            aeronaveAtual.testes.push(teste);
            console.log("[Sucesso] Teste AERODINAMICO aprovado e registrado.");
            break;
        case "6":
            if (!aeronaveAtual) {
                console.log("[Aviso] Cadastre uma aeronave primeiro.");
                break;
            }
            aeronaveAtual.detalhes();
            break;
        case "7":
            if (!aeronaveAtual) {
                console.log("[Aviso] Cadastre uma aeronave primeiro.");
                break;
            }
            console.log("\n-- Gerar Relatorio de Entrega --");
            const cliente = readlineSync.question("Nome do Cliente: ", { limit: regexNaoVazio, limitMessage: msgErroVazio });
            const dataEntrega = readlineSync.question("Data de Entrega (DD/MM/AAAA): ", { limit: regexNaoVazio, limitMessage: msgErroVazio });
            const relatorio = new Relatorio_1.Relatorio();
            relatorio.gerarRelatorio(aeronaveAtual, cliente, dataEntrega);
            relatorio.salvarEmArquivo();
            break;
        case "8":
            if (!aeronaveAtual) {
                console.log("[Aviso] Cadastre uma aeronave primeiro.");
                break;
            }
            aeronaveAtual.salvar();
            console.log("[Sucesso] Progresso salvo no diretorio raiz do projeto.");
            break;
        case "0":
            rodando = false;
            console.log("\nSistema Encerrado. Ate logo!");
            break;
        default:
            console.log("\n[Erro] Opcao invalida. Escolha um numero de 0 a 8.");
            break;
    }
}
