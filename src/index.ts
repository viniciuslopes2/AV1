import * as readlineSync from "readline-sync";
import { execSync } from "child_process";
import * as fs from "fs";
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

let usuarios: Funcionario[] = [];

if (fs.existsSync("dados_funcionarios.txt")) {
    const linhas = fs.readFileSync("dados_funcionarios.txt", "utf-8").split("\n");
    for (let linha of linhas) {
        if (linha.trim() !== "") {
            const obj = JSON.parse(linha);
            usuarios.push(new Funcionario(obj.id, obj.nome, obj.telefone, obj.endereco, obj.usuario, obj.senha, obj.nivelPermissao));
        }
    }
}

if (usuarios.length === 0) {
    const adminPadrao = new Funcionario("0", "Admin", "00000", "SJC", "admin", "admin123", NivelPermissao.ADMINISTRADOR);
    usuarios.push(adminPadrao);
    adminPadrao.salvar();
}

console.clear();
console.log("-----------------------------------------");
console.log("         AEROCODE - TELA DE LOGIN        ");
console.log("-----------------------------------------");

let logado = false;
let usuarioAtual: Funcionario | null = null;

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

let aviaoAtual: Aeronave | null = null;

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
            
            if (escolhaTipo === -1) break;
            const tipoFinal = escolhaTipo === 0 ? TipoAeronave.COMERCIAL : TipoAeronave.MILITAR;
            
            let numCapacidade = 0;
            while (numCapacidade <= 0) {
                numCapacidade = readlineSync.questionInt("Capacidade: ", { limitMessage: "Invalido." });
                if (numCapacidade <= 0) console.log("A capacidade tem que ser maior que zero.");
            }

            let numAlcance = 0;
            while (numAlcance <= 0) {
                numAlcance = readlineSync.questionInt("Alcance km: ", { limitMessage: "Invalido." });
                if (numAlcance <= 0) console.log("O alcance tem que ser maior que zero.");
            }
            
            aviaoAtual = new Aeronave(codigoAviao, nomeModelo, tipoFinal, numCapacidade, numAlcance);
            console.log("-> Aeronave criada!");
            break;

        case "2":
            if (!aviaoAtual) { console.log("Cadastre a aeronave antes."); break; }
            
            const pecaNome = readlineSync.question("Nome da peca: ", { limit: validaTexto, limitMessage: erroMsg });
            const fornecedorPeca = readlineSync.question("Fornecedor: ", { limit: validaTexto, limitMessage: erroMsg });
            
            const tiposPeca = ["NACIONAL", "IMPORTADA"];
            const indexTipoPeca = readlineSync.keyInSelect(tiposPeca, "Origem da peca: ");
            if (indexTipoPeca === -1) break;
            const tipoPecaFinal = indexTipoPeca === 0 ? TipoPeca.NACIONAL : TipoPeca.IMPORTADA;

            const novaPeca = new Peca(pecaNome, tipoPecaFinal, fornecedorPeca, StatusPeca.PRONTA);
            aviaoAtual.pecas.push(novaPeca);
            console.log(`-> Peca ${pecaNome} adicionada.`);
            break;

        case "3":
            if (!aviaoAtual) { console.log("Cadastre a aeronave antes."); break; }
            const nomeDaEtapa = readlineSync.question("Nome da etapa: ", { limit: validaTexto, limitMessage: erroMsg });
            const dataPrazo = readlineSync.question("Prazo (DD/MM/AAAA): ", { limit: validaTexto, limitMessage: erroMsg });
            const novaEtapa = new Etapa(nomeDaEtapa, dataPrazo, StatusEtapa.PENDENTE);
            novaEtapa.iniciar();
            novaEtapa.finalizar();
            aviaoAtual.etapas.push(novaEtapa);
            break;

        case "4":
            if (!aviaoAtual) { console.log("Cadastre a aeronave antes."); break; }
            if (usuarioAtual?.nivelPermissao === NivelPermissao.OPERADOR) {
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
            if (!aviaoAtual) { console.log("Cadastre a aeronave antes."); break; }
            
            const tiposTeste = ["ELETRICO", "HIDRAULICO", "AERODINAMICO"];
            const indexTeste = readlineSync.keyInSelect(tiposTeste, "Tipo de Teste: ");
            if (indexTeste === -1) break;
            
            let tipoTesteFinal = TipoTeste.ELETRICO;
            if (indexTeste === 1) tipoTesteFinal = TipoTeste.HIDRAULICO;
            if (indexTeste === 2) tipoTesteFinal = TipoTeste.AERODINAMICO;

            const resultados = ["APROVADO", "REPROVADO"];
            const indexResultado = readlineSync.keyInSelect(resultados, "Resultado: ");
            if (indexResultado === -1) break;
            const resultFinal = indexResultado === 0 ? ResultadoTeste.APROVADO : ResultadoTeste.REPROVADO;

            const novoTeste = new Teste(tipoTesteFinal, resultFinal);
            aviaoAtual.testes.push(novoTeste);
            console.log(`-> Teste ${tipoTesteFinal} registrado como ${resultFinal}.`);
            break;

        case "6":
            if (!aviaoAtual) { console.log("Cadastre a aeronave antes."); break; }
            aviaoAtual.detalhes();
            break;

        case "7":
            if (!aviaoAtual) { console.log("Cadastre a aeronave antes."); break; }
            const nomeCliente = readlineSync.question("Cliente: ", { limit: validaTexto, limitMessage: erroMsg });
            const dataFinal = readlineSync.question("Data de entrega: ", { limit: validaTexto, limitMessage: erroMsg });
            const docRelatorio = new Relatorio();
            docRelatorio.gerarRelatorio(aviaoAtual, nomeCliente, dataFinal);
            docRelatorio.salvarEmArquivo();
            break;

        case "8":
            if (!aviaoAtual) { console.log("Cadastre a aeronave antes."); break; }
            aviaoAtual.salvar();
            console.log("-> Tudo salvo na pasta.");
            break;

        case "9":
            const codBusca = readlineSync.question("Digite o codigo da aeronave: ", { limit: validaTexto, limitMessage: erroMsg });
            const aviaoCarregado = Aeronave.carregar(codBusca);
            if (aviaoCarregado) {
                aviaoAtual = aviaoCarregado;
                console.log(`-> Aeronave ${codBusca} carregada na memoria!`);
            } else {
                console.log("Erro: Arquivo nao encontrado.");
            }
            break;

        case "10":
            if (usuarioAtual?.nivelPermissao !== NivelPermissao.ADMINISTRADOR) {
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
            if (pEscolhida === -1) break;
            
            let pFinal = NivelPermissao.OPERADOR;
            if (pEscolhida === 0) pFinal = NivelPermissao.ADMINISTRADOR;
            if (pEscolhida === 1) pFinal = NivelPermissao.ENGENHEIRO;

            const funcCriado = new Funcionario(idNovo, nNovo, "0", "0", loginNovo, senhaNova, pFinal);
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