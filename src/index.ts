import * as readlineSync from "readline-sync";
import { execSync } from "child_process";
import { Aeronave } from "./Aeronave";
import { Peca } from "./Peca";
import { Etapa } from "./Etapa";
import { Funcionario } from "./Funcionario";
import { Teste } from "./Teste";
import { Relatorio } from "./Relatorio";
import { TipoAeronave, TipoPeca, StatusPeca, StatusEtapa, NivelPermissao, TipoTeste, ResultadoTeste } from "./enums";

if (process.platform === "win32") {
    try {
        execSync("chcp 65001", { stdio: "ignore" });
    } catch (e) {}
}

let aviaoAtual: Aeronave | null = null;

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
            const tipoFinal = escolhaTipo === 0 ? TipoAeronave.COMERCIAL : TipoAeronave.MILITAR;
            
            let numCapacidade = 0;
            while (numCapacidade <= 0) {
                numCapacidade = readlineSync.questionInt("Capacidade: ", { limitMessage: "Digite um numero valido." });
                if (numCapacidade <= 0) console.log("A capacidade tem que ser maior que zero.");
            }

            let numAlcance = 0;
            while (numAlcance <= 0) {
                numAlcance = readlineSync.questionInt("Alcance km: ", { limitMessage: "Digite um numero valido." });
                if (numAlcance <= 0) console.log("O alcance tem que ser maior que zero.");
            }
            
            aviaoAtual = new Aeronave(codigoAviao, nomeModelo, tipoFinal, numCapacidade, numAlcance);
            console.log("\n-> Aeronave criada!");
            break;

        case "2":
            if (!aviaoAtual) { console.log("Aviso: cadastre a aeronave antes."); break; }
            
            console.log("\n-- Nova Peca --");
            const pecaNome = readlineSync.question("Nome da peca: ", { limit: validaTexto, limitMessage: erroMsg });
            const fornecedorPeca = readlineSync.question("Fornecedor: ", { limit: validaTexto, limitMessage: erroMsg });
            
            const novaPeca = new Peca(pecaNome, TipoPeca.NACIONAL, fornecedorPeca, StatusPeca.PRONTA);
            aviaoAtual.pecas.push(novaPeca);
            console.log(`-> Peca ${pecaNome} adicionada.`);
            break;

        case "3":
            if (!aviaoAtual) { console.log("Aviso: cadastre a aeronave antes."); break; }
            
            console.log("\n-- Nova Etapa --");
            const nomeDaEtapa = readlineSync.question("Nome da etapa: ", { limit: validaTexto, limitMessage: erroMsg });
            const dataPrazo = readlineSync.question("Prazo (DD/MM/AAAA): ", { limit: validaTexto, limitMessage: erroMsg });
            const novaEtapa = new Etapa(nomeDaEtapa, dataPrazo, StatusEtapa.PENDENTE);
            
            novaEtapa.iniciar();
            novaEtapa.finalizar();
            aviaoAtual.etapas.push(novaEtapa);
            break;

        case "4":
            if (!aviaoAtual) { console.log("Aviso: cadastre a aeronave antes."); break; }
            
            console.log("\n-- Funcionario --");
            const funcNome = readlineSync.question("Nome: ", { limit: validaTexto, limitMessage: erroMsg });
            const novoFunc = new Funcionario("F001", funcNome, "1199999999", "SP", "user1", "123", NivelPermissao.ENGENHEIRO);
            
            if (aviaoAtual.etapas.length > 0) {
                aviaoAtual.etapas[0].associarFuncionario(novoFunc);
            } else {
                console.log("Crie uma etapa primeiro na opcao 3.");
            }
            break;

        case "5":
            if (!aviaoAtual) { console.log("Aviso: cadastre a aeronave antes."); break; }
            
            const novoTeste = new Teste(TipoTeste.AERODINAMICO, ResultadoTeste.APROVADO);
            aviaoAtual.testes.push(novoTeste);
            console.log("-> Teste aerodinamico aprovado.");
            break;

        case "6":
            if (!aviaoAtual) { console.log("Aviso: cadastre a aeronave antes."); break; }
            aviaoAtual.detalhes();
            break;

        case "7":
            if (!aviaoAtual) { console.log("Aviso: cadastre a aeronave antes."); break; }
            
            console.log("\n-- Relatorio --");
            const nomeCliente = readlineSync.question("Cliente: ", { limit: validaTexto, limitMessage: erroMsg });
            const dataFinal = readlineSync.question("Data de entrega: ", { limit: validaTexto, limitMessage: erroMsg });

            const docRelatorio = new Relatorio();
            docRelatorio.gerarRelatorio(aviaoAtual, nomeCliente, dataFinal);
            docRelatorio.salvarEmArquivo();
            break;

        case "8":
            if (!aviaoAtual) { console.log("Aviso: cadastre a aeronave antes."); break; }
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