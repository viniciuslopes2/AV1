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
const fs = __importStar(require("fs"));
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
let usuarios = [];
if (fs.existsSync("dados_funcionarios.txt")) {
    const linhas = fs.readFileSync("dados_funcionarios.txt", "utf-8").split("\n");
    for (let linha of linhas) {
        if (linha.trim() !== "") {
            const obj = JSON.parse(linha);
            usuarios.push(new Funcionario_1.Funcionario(obj.id, obj.nome, obj.telefone, obj.endereco, obj.usuario, obj.senha, obj.nivelPermissao));
        }
    }
}
if (usuarios.length === 0) {
    const adminPadrao = new Funcionario_1.Funcionario("0", "Admin", "00000", "SJC", "admin", "admin123", enums_1.NivelPermissao.ADMINISTRADOR);
    usuarios.push(adminPadrao);
    adminPadrao.salvar();
}
console.clear();
console.log("-----------------------------------------");
console.log("         AEROCODE - TELA DE LOGIN        ");
console.log("-----------------------------------------");
let logado = false;
let usuarioAtual = null;
while (!logado) {
    const inputUser = readlineSync.question("Usuario: ");
    const inputSenha = readlineSync.question("Senha: ");
    for (let u of usuarios) {
        if (u.autenticar(inputUser, inputSenha)) {
            logado = true;
            usuarioAtual = u;
            break;
        }
    }
    if (!logado) {
        console.log("Acesso negado. Tente de novo.\n");
    }
}
let aviaoAtual = null;
console.clear();
console.log(`Bem-vindo(a), ${usuarioAtual?.nome}! Nivel: ${usuarioAtual?.nivelPermissao}`);
console.log("-----------------------------------------");
console.log(" Aerocode - Gestao de Producao ");
console.log("-----------------------------------------");
let menuAtivo = true;
const validaTexto = /.+/;
const erroMsg = "Erro: preencha o campo.";
while (menuAtivo) {
    console.log("\nMENU PRINCIPAL:");
    console.log("1. Cadastrar aeronave");
    console.log("2. Adicionar peca");
    console.log("3. Avancar etapa");
    console.log("4. Associar funcionario na etapa");
    console.log("5. Registrar teste");
    console.log("6. Ver detalhes");
    console.log("7. Gerar relatorio");
    console.log("8. Salvar tudo");
    console.log("9. Carregar aeronave salva");
    console.log("10. Novo funcionario do sistema");
    console.log("11. Listar todos funcionários");
    console.log("0. Sair");
    const escolha = readlineSync.question("\nSua escolha: ");
    switch (escolha) {
        case "1":
            console.log("\n-- Nova Aeronave --");
            const codigoAviao = readlineSync.question("Codigo: ", { limit: validaTexto, limitMessage: erroMsg });
            if (fs.existsSync(`aeronave_${codigoAviao}.json`)) {
                console.log("Erro: Esse codigo ja existe. O codigo precisa ser unico.");
                break;
            }
            const nomeModelo = readlineSync.question("Modelo: ", { limit: validaTexto, limitMessage: erroMsg });
            const tiposPossiveis = ["COMERCIAL", "MILITAR"];
            const escolhaTipo = readlineSync.keyInSelect(tiposPossiveis, "Tipo: ", { cancel: "Cancelar" });
            if (escolhaTipo === -1)
                break;
            const tipoFinal = escolhaTipo === 0 ? enums_1.TipoAeronave.COMERCIAL : enums_1.TipoAeronave.MILITAR;
            let numCapacidade = 0;
            while (numCapacidade <= 0) {
                numCapacidade = readlineSync.questionInt("Capacidade: ", { limitMessage: "Invalido." });
                if (numCapacidade <= 0)
                    console.log("A capacidade tem que ser maior que zero.");
            }
            let numAlcance = 0;
            while (numAlcance <= 0) {
                numAlcance = readlineSync.questionInt("Alcance km: ", { limitMessage: "Invalido." });
                if (numAlcance <= 0)
                    console.log("O alcance tem que ser maior que zero.");
            }
            aviaoAtual = new Aeronave_1.Aeronave(codigoAviao, nomeModelo, tipoFinal, numCapacidade, numAlcance);
            console.log("-> Aeronave criada!");
            break;
        case "2":
            if (!aviaoAtual) {
                console.log("Cadastre a aeronave antes.");
                break;
            }
            const pecaNome = readlineSync.question("Nome da peca: ", { limit: validaTexto, limitMessage: erroMsg });
            const fornecedorPeca = readlineSync.question("Fornecedor: ", { limit: validaTexto, limitMessage: erroMsg });
            const tiposPeca = ["NACIONAL", "IMPORTADA"];
            const indexTipoPeca = readlineSync.keyInSelect(tiposPeca, "Origem da peca: ");
            if (indexTipoPeca === -1)
                break;
            const tipoPecaFinal = indexTipoPeca === 0 ? enums_1.TipoPeca.NACIONAL : enums_1.TipoPeca.IMPORTADA;
            const novaPeca = new Peca_1.Peca(pecaNome, tipoPecaFinal, fornecedorPeca, enums_1.StatusPeca.PRONTA);
            aviaoAtual.pecas.push(novaPeca);
            console.log(`-> Peca ${pecaNome} adicionada.`);
            break;
        case "3":
            if (!aviaoAtual) {
                console.log("Cadastre a aeronave antes.");
                break;
            }
            const nomeDaEtapa = readlineSync.question("Nome da etapa: ", { limit: validaTexto, limitMessage: erroMsg });
            const dataPrazo = readlineSync.question("Prazo (DD/MM/AAAA): ", { limit: validaTexto, limitMessage: erroMsg });
            const novaEtapa = new Etapa_1.Etapa(nomeDaEtapa, dataPrazo, enums_1.StatusEtapa.PENDENTE);
            novaEtapa.iniciar();
            novaEtapa.finalizar();
            aviaoAtual.etapas.push(novaEtapa);
            break;
        case "4":
            if (!aviaoAtual) {
                console.log("Cadastre a aeronave antes.");
                break;
            }
            if (usuarioAtual?.nivelPermissao === enums_1.NivelPermissao.OPERADOR) {
                console.log("Erro: Operadores nao podem associar funcionarios.");
                break;
            }
            if (aviaoAtual.etapas.length === 0) {
                console.log("Crie uma etapa primeiro.");
                break;
            }
            console.log("\nSelecione um funcionario cadastrado no sistema:");
            const nomesUsuarios = usuarios.map(u => `${u.nome} (${u.nivelPermissao})`);
            const indexUser = readlineSync.keyInSelect(nomesUsuarios, "Funcionario: ");
            if (indexUser !== -1) {
                const funcEscolhido = usuarios[indexUser];
                aviaoAtual.etapas[aviaoAtual.etapas.length - 1].associarFuncionario(funcEscolhido);
            }
            break;
        case "5":
            if (!aviaoAtual) {
                console.log("Cadastre a aeronave antes.");
                break;
            }
            const tiposTeste = ["ELETRICO", "HIDRAULICO", "AERODINAMICO"];
            const indexTeste = readlineSync.keyInSelect(tiposTeste, "Tipo de Teste: ");
            if (indexTeste === -1)
                break;
            let tipoTesteFinal = enums_1.TipoTeste.ELETRICO;
            if (indexTeste === 1)
                tipoTesteFinal = enums_1.TipoTeste.HIDRAULICO;
            if (indexTeste === 2)
                tipoTesteFinal = enums_1.TipoTeste.AERODINAMICO;
            const resultados = ["APROVADO", "REPROVADO"];
            const indexResultado = readlineSync.keyInSelect(resultados, "Resultado: ");
            if (indexResultado === -1)
                break;
            const resultFinal = indexResultado === 0 ? enums_1.ResultadoTeste.APROVADO : enums_1.ResultadoTeste.REPROVADO;
            const novoTeste = new Teste_1.Teste(tipoTesteFinal, resultFinal);
            aviaoAtual.testes.push(novoTeste);
            console.log(`-> Teste ${tipoTesteFinal} registrado como ${resultFinal}.`);
            break;
        case "6":
            if (!aviaoAtual) {
                console.log("Cadastre a aeronave antes.");
                break;
            }
            aviaoAtual.detalhes();
            break;
        case "7":
            if (!aviaoAtual) {
                console.log("Cadastre a aeronave antes.");
                break;
            }
            const nomeCliente = readlineSync.question("Cliente: ", { limit: validaTexto, limitMessage: erroMsg });
            const dataFinal = readlineSync.question("Data de entrega: ", { limit: validaTexto, limitMessage: erroMsg });
            const docRelatorio = new Relatorio_1.Relatorio();
            docRelatorio.gerarRelatorio(aviaoAtual, nomeCliente, dataFinal);
            docRelatorio.salvarEmArquivo();
            break;
        case "8":
            if (!aviaoAtual) {
                console.log("Cadastre a aeronave antes.");
                break;
            }
            aviaoAtual.salvar();
            console.log("-> Tudo salvo na pasta.");
            break;
        case "9":
            const codBusca = readlineSync.question("Digite o codigo da aeronave: ", { limit: validaTexto, limitMessage: erroMsg });
            const aviaoCarregado = Aeronave_1.Aeronave.carregar(codBusca);
            if (aviaoCarregado) {
                aviaoAtual = aviaoCarregado;
                console.log(`-> Aeronave ${codBusca} carregada na memoria!`);
            }
            else {
                console.log("Erro: Arquivo nao encontrado.");
            }
            break;
        case "10":
            if (usuarioAtual?.nivelPermissao !== enums_1.NivelPermissao.ADMINISTRADOR) {
                console.log("Erro: Apenas administradores podem criar novos usuarios.");
                break;
            }
            console.log("\n-- Cadastro de Usuario --");
            const idNovo = readlineSync.question("ID: ", { limit: validaTexto, limitMessage: erroMsg });
            const idJaExiste = usuarios.some(u => u.id === idNovo);
            if (idJaExiste) {
                console.log("Erro: Ja existe um funcionario cadastrado com este ID.");
                break;
            }
            const nNovo = readlineSync.question("Nome: ", { limit: validaTexto, limitMessage: erroMsg });
            const loginNovo = readlineSync.question("Login: ", { limit: validaTexto, limitMessage: erroMsg });
            const senhaNova = readlineSync.question("Senha: ", { limit: validaTexto, limitMessage: erroMsg });
            const perms = ["ADMINISTRADOR", "ENGENHEIRO", "OPERADOR"];
            const pEscolhida = readlineSync.keyInSelect(perms, "Permissao: ");
            if (pEscolhida === -1)
                break;
            let pFinal = enums_1.NivelPermissao.OPERADOR;
            if (pEscolhida === 0)
                pFinal = enums_1.NivelPermissao.ADMINISTRADOR;
            if (pEscolhida === 1)
                pFinal = enums_1.NivelPermissao.ENGENHEIRO;
            const funcCriado = new Funcionario_1.Funcionario(idNovo, nNovo, "0", "0", loginNovo, senhaNova, pFinal);
            usuarios.push(funcCriado);
            funcCriado.salvar();
            console.log("-> Usuario criado e salvo na base de dados.");
            break;
        case "11":
            console.log("\n--- Todos os funcionarios ---");
            console.log(`Total de funcionarios registrados: ${usuarios.length}`);
            usuarios.forEach(u => {
                console.log(`[ID: ${u.id}] Nome: ${u.nome} - Cargo: ${u.nivelPermissao}`);
            });
            break;
        case "0":
            menuAtivo = false;
            console.log("\nSaindo do sistema...");
            break;
        default:
            console.log("\nOpcao invalida.");
            break;
    }
}
