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
if (process.platform === "win32") {
    try {
        (0, child_process_1.execSync)("chcp 65001", { stdio: "ignore" });
    }
    catch (e) { }
}
let aviaoAtual = null;
console.clear();
console.log("-----------------------------------------");
console.log(" Aerocode - Gestao de Producao ");
console.log("-----------------------------------------");
let menuAtivo = true;
const validaTexto = /.+/;
const erroMsg = "Erro: o campo nao pode ficar vazio.";
while (menuAtivo) {
    console.log("\nMENU PRINCIPAL:");
    console.log("1. Cadastrar Aeronave");
    console.log("2. Adicionar Peca");
    console.log("3. Avancar Etapa");
    console.log("4. Associar Funcionario");
    console.log("5. Registrar Teste");
    console.log("6. Ver Detalhes");
    console.log("7. Gerar Relatorio");
    console.log("8. Salvar Tudo");
    console.log("0. Sair");
    const escolha = readlineSync.question("\nDigite a opcao: ");
    switch (escolha) {
        case "1":
            console.log("\n-- Nova Aeronave --");
            const codigoAviao = readlineSync.question("Codigo (ex: EMB-101): ", { limit: validaTexto, limitMessage: erroMsg });
            const nomeModelo = readlineSync.question("Modelo: ", { limit: validaTexto, limitMessage: erroMsg });
            const tiposPossiveis = ["COMERCIAL", "MILITAR"];
            const escolhaTipo = readlineSync.keyInSelect(tiposPossiveis, "Tipo: ", { cancel: "Cancelar" });
            if (escolhaTipo === -1) {
                console.log("\nCancelado.");
                break;
            }
            const tipoFinal = escolhaTipo === 0 ? enums_1.TipoAeronave.COMERCIAL : enums_1.TipoAeronave.MILITAR;
            let numCapacidade = 0;
            while (numCapacidade <= 0) {
                numCapacidade = readlineSync.questionInt("Capacidade: ", { limitMessage: "Digite um numero valido." });
                if (numCapacidade <= 0)
                    console.log("A capacidade tem que ser maior que zero.");
            }
            let numAlcance = 0;
            while (numAlcance <= 0) {
                numAlcance = readlineSync.questionInt("Alcance km: ", { limitMessage: "Digite um numero valido." });
                if (numAlcance <= 0)
                    console.log("O alcance tem que ser maior que zero.");
            }
            aviaoAtual = new Aeronave_1.Aeronave(codigoAviao, nomeModelo, tipoFinal, numCapacidade, numAlcance);
            console.log("\n-> Aeronave criada!");
            break;
        case "2":
            if (!aviaoAtual) {
                console.log("Aviso: cadastre a aeronave antes.");
                break;
            }
            console.log("\n-- Nova Peca --");
            const pecaNome = readlineSync.question("Nome da peca: ", { limit: validaTexto, limitMessage: erroMsg });
            const fornecedorPeca = readlineSync.question("Fornecedor: ", { limit: validaTexto, limitMessage: erroMsg });
            const novaPeca = new Peca_1.Peca(pecaNome, enums_1.TipoPeca.NACIONAL, fornecedorPeca, enums_1.StatusPeca.PRONTA);
            aviaoAtual.pecas.push(novaPeca);
            console.log(`-> Peca ${pecaNome} adicionada.`);
            break;
        case "3":
            if (!aviaoAtual) {
                console.log("Aviso: cadastre a aeronave antes.");
                break;
            }
            console.log("\n-- Nova Etapa --");
            const nomeDaEtapa = readlineSync.question("Nome da etapa: ", { limit: validaTexto, limitMessage: erroMsg });
            const dataPrazo = readlineSync.question("Prazo (DD/MM/AAAA): ", { limit: validaTexto, limitMessage: erroMsg });
            const novaEtapa = new Etapa_1.Etapa(nomeDaEtapa, dataPrazo, enums_1.StatusEtapa.PENDENTE);
            novaEtapa.iniciar();
            novaEtapa.finalizar();
            aviaoAtual.etapas.push(novaEtapa);
            break;
        case "4":
            if (!aviaoAtual) {
                console.log("Aviso: cadastre a aeronave antes.");
                break;
            }
            console.log("\n-- Funcionario --");
            const funcNome = readlineSync.question("Nome: ", { limit: validaTexto, limitMessage: erroMsg });
            const novoFunc = new Funcionario_1.Funcionario("F001", funcNome, "1199999999", "SP", "user1", "123", enums_1.NivelPermissao.ENGENHEIRO);
            if (aviaoAtual.etapas.length > 0) {
                aviaoAtual.etapas[0].associarFuncionario(novoFunc);
            }
            else {
                console.log("Crie uma etapa primeiro na opcao 3.");
            }
            break;
        case "5":
            if (!aviaoAtual) {
                console.log("Aviso: cadastre a aeronave antes.");
                break;
            }
            const novoTeste = new Teste_1.Teste(enums_1.TipoTeste.AERODINAMICO, enums_1.ResultadoTeste.APROVADO);
            aviaoAtual.testes.push(novoTeste);
            console.log("-> Teste aerodinamico aprovado.");
            break;
        case "6":
            if (!aviaoAtual) {
                console.log("Aviso: cadastre a aeronave antes.");
                break;
            }
            aviaoAtual.detalhes();
            break;
        case "7":
            if (!aviaoAtual) {
                console.log("Aviso: cadastre a aeronave antes.");
                break;
            }
            console.log("\n-- Relatorio --");
            const nomeCliente = readlineSync.question("Cliente: ", { limit: validaTexto, limitMessage: erroMsg });
            const dataFinal = readlineSync.question("Data de entrega: ", { limit: validaTexto, limitMessage: erroMsg });
            const docRelatorio = new Relatorio_1.Relatorio();
            docRelatorio.gerarRelatorio(aviaoAtual, nomeCliente, dataFinal);
            docRelatorio.salvarEmArquivo();
            break;
        case "8":
            if (!aviaoAtual) {
                console.log("Aviso: cadastre a aeronave antes.");
                break;
            }
            aviaoAtual.salvar();
            console.log("-> Tudo salvo na pasta.");
            break;
        case "0":
            menuAtivo = false;
            console.log("\nSaindo...");
            break;
        default:
            console.log("\nOpcao invalida, tente de novo.");
            break;
    }
}
