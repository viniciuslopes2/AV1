# **Aerocode**
Avaliação AV1 \- Professor Gerson da Penha

Material: Técnicas de Programação I

Nome: Vinícius Silva Lopes

Este é o sistema da Aerocode, desenvolvido em TypeScript com ambiente Node.js. Ele opera via Interface de Linha de Comando (CLI) para gerenciar todas as etapas de produção de aeronaves.

## **Árvore do projeto**
Essa é árvore de projeto de como deveria ficar o seu programa para poder funcionar antes de começar a seguir passo a passo abaixo. Por favor, confira aqui se está corretamente encaixado no seu devido lugar antes de executar para não encontrar erros inesperados.

```
aerocode/
├── src/                     # pasta principal source ou src
│   ├── Aeronave.ts
│   ├── enums.ts
│   ├── Etapa.ts
│   ├── Funcionario.ts
│   ├── index.ts
│   ├── Peca.ts
│   ├── Relatorio.ts
│   └── teste.ts
├── .gitignore               # o .gitignore que esconde o arquivo node_modules
├── dados_funcionarios.txt   # arquivo em que tem os dados de login de usuário (criado automaticamente após iniciar o programa)  
├── package.json             # configurações do projeto e atalhos para execução como o npm run dev
├── package-lock.json        # árvore de dependências
├── tsconfig.json            # regras para compilação do programa TypeScript (no caso estamos usando o Node16)
└── README.md                # documentação
```

## **Pré-requisitos**

Para garantir que o sistema rode sem falhas, você precisa ter instalado na sua máquina:

* **Node.js** (Versão 18 ou superior \- [Baixe aqui](https://nodejs.org/))  
* Sistema Operacional: Windows 10/11, Ubuntu 24.04 ou derivados.

## **Instalação (Passo à Passo)**

Siga os passos abaixo **exatamente nesta ordem** para evitar qualquer erro de "módulo não encontrado" (Cannot find module), então de ocorrer o erro do módulo nativo não encontrar o "fs" ou usuário não encontrado no terminal:

### **Passo 1: Preparando a pasta**

1. Crie uma pasta chamada aerocode no seu computador.  
2. Abra o terminal (PowerShell, CMD ou Terminal do Linux) **DENTRO** dessa pasta.

### **Passo 2: Inicializando o projeto e instalando dependências**

No terminal, execute os comandos abaixo, aguardando o término de cada um:
```
npm init -y  
npm install readline-sync  
npm install --save-dev typescript @types/node @types/readline-sync
```
### **Passo 3: Configuração do TypeScript (tsconfig.json)**

Crie um arquivo chamado tsconfig.json na raiz da pasta aerocode com o seguinte conteúdo exato:
* **Observação:** utilizei o Node16 no "module" e no "moduleResolution" por conta de ser uma ferramenta moderna e fácil de ser aplicada com garantia de compatibilidade à todos computadores (evitando erros como linting no VS Code).
```
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "Node16",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node16",
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}

```
### **Passo 4: Configuração dos Scripts (package.json)**

Abra o arquivo package.json gerado no Passo 2 e substitua a sessão "scripts" por esta: 
``` 
  "scripts": {  
    "build": "tsc",  
    "start": "node dist/index.js",  
    "dev": "tsc && node dist/index.js"  
  },
```

**Exemplo do arquivo package.json**
```
{
  "name": "aerocode",
  "version": "1.0.0",
  "description": "Sistema de Gestão de Produção de Aeronaves (CLI)",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsc && node dist/index.js"
  },
  "dependencies": {
    "readline-sync": "^1.4.10"
  },
  "devDependencies": {
    "@types/node": "^25.0.0",
    "@types/readline-sync": "^1.4.8",
    "typescript": "^5.0.0"
  }
}
```

*(Certifique-se também de que o "main" esteja apontando para "dist/index.js").*

### **Passo 5: Estrutura de Arquivos**

Crie uma pasta chamada src na raiz do projeto. **Todos** os arquivos .ts de código (como index.ts, Aeronave.ts, enums.ts, etc.) devem ser colocados estritamente dentro desta pasta src.

Outra coisa a ser comentada, existe um arquivo chamado ```dados_funcionarios.txt```, **SE** não for criado na raiz do programa, eu recomendo que siga esses passos abaixo: 
* crie um arquivo ```dados_funcionarios.txt``` na **raiz da pasta** aerocode para já garantir que exista um funcionário que seja administrador que possua acesso ao programa inteiro, após ser criado, insira esses dados dentro do arquivo ```dados_funcionarios.txt```:
```
{"id":"0","nome":"Admin","telefone":"00000","endereco":"SJC","usuario":"admin","senha":"admin123","nivelPermissao":"ADMINISTRADOR"}
```

## **Como Executar o Sistema**

Sempre que quiser rodar o programa e testar suas alterações, use o comando seguro de desenvolvimento. No terminal, dentro da pasta raiz aerocode, digite:
```
npm run dev
```
Este comando fará duas coisas automaticamente:

1. tsc: Compilará todo o seu código TypeScript (.ts) para JavaScript (.js) na pasta dist.  
2. node dist/index.js: Executará o sistema imediatamente após a compilação.

**AVISO:** o programa tem sistema de Login, então para não ficar perdido e ter acesso ao Admin, faça a seguinte coisa:
```
Usuário: admin
Senha: admin123
```

## **Onde os dados são salvos?**

Os dados estão sendo implementada utilizando o módulo nativo fs (File System) do Node.js.  
Esses dados de aeronaves, peças, funcionários, etapas e relatórios serão salvos automaticamente em arquivos de texto (.json ou .txt) na própria raiz do projeto, permitindo fácil consulta e backup.

## **Possíveis erros e o seu Troubleshooting**

Nessa secção abaixo, vou lhe mostrar possíveis erros tanto para Linux quanto pro Windows 10/11. **Por favor**, seguir estritamente os passos caso um dos erros aconteça. Vou deixar todo o texto formatado para uma leitura fácil aqui por que ninguém é de ferro.

* Erro "Cannot find module 'index.js'"
    * Solução: Isso ocorre se você tentar rodar o Node diretamente sem compilar. Rode o atalho ```npm run dev``` (que compila e roda automaticamente) ou rode ```npx tsc``` manualmente antes de node dist/index.js.

* Erro de import (Cannot find module './Funcionario') no Editor
    * Solução: Trata-se de um delay do VS Code. Pressione ```Ctrl+Shift+P```, digite ```TypeScript: Restart TS Server``` e pressione ```Enter```.

* Comando 'tsc' não encontrado
    * Solução: O TypeScript não está instalado globalmente. Rode ```npm install --save-dev typescript``` na pasta do projeto e utilize ```npx tsc``` em vez de apenas ```tsc```.

* Caracteres estranhos (Encoding) no Terminal
    * Solução: O código-fonte já possui uma trava ```chcp 65001``` nativa que força o UTF-8 no Windows. No Linux, os terminais (como GNOME Terminal) rodam nativamente em UTF-8, portanto não haverá quebra de acentos (ç, ã, á).

* (LINUX) Erro de Permissão (EACCES) ao rodar npm install
    * Solução: Evite rodar ```sudo npm install```. Se o erro persistir, garanta que seu usuário tem permissão na pasta rodando: ```sudo chown -R $USER:$USER ./aerocode```.

* (LINUX) Comando 'node' não reconhecido
    * Solução: Em distribuições antigas derivadas do Debian/Ubuntu, o binário pode estar nomeado como nodejs. Certifique-se de instalar uma versão LTS recente do Node.js utilizando o NVM (Node Version Manager) ou o repositório oficial NodeSource.
