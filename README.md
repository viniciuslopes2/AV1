# **Aerocode \- Sistema de Gestão de Produção de Aeronaves (CLI)**
Avaliação AV1 \- Professor Gerson da Penha
Material: Técnicas de Programação I
Nome aluno: Vinícius Silva Lopes

Este é o sistema da Aerocode, desenvolvido em TypeScript com ambiente Node.js. Ele opera via Interface de Linha de Comando (CLI) para gerenciar todas as etapas de produção de aeronaves.

## **Pré-requisitos**

Para garantir que o sistema rode sem falhas, você precisa ter instalado na sua máquina:

* **Node.js** (Versão 18 ou superior \- [Baixe aqui](https://nodejs.org/))  
* Sistema Operacional: Windows 10/11, Ubuntu 24.04 ou derivados.

## **Instalação (Passo à Passo)**

Siga os passos abaixo **exatamente nesta ordem** para evitar qualquer erro de "módulo não encontrado" (Cannot find module) ou então de ocorrer o erro do módulo nativo não encontrar o "fs":

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
*(Certifique-se também de que o "main" esteja apontando para "dist/index.js").*

### **Passo 5: Estrutura de Arquivos**

Crie uma pasta chamada src na raiz do projeto. **Todos** os arquivos .ts de código (como index.ts, Aeronave.ts, enums.ts, etc.) devem ser colocados estritamente dentro desta pasta src.

## **Como Executar o Sistema**

Sempre que quiser rodar o programa e testar suas alterações, use o comando seguro de desenvolvimento. No terminal, dentro da pasta raiz aerocode, digite:
```
npm run dev
```
Este comando fará duas coisas automaticamente:

1. tsc: Compilará todo o seu código TypeScript (.ts) para JavaScript (.js) na pasta dist.  
2. node dist/index.js: Executará o sistema imediatamente após a compilação.

## **Onde os dados são salvos?**

A persistência de dados foi implementada utilizando o módulo nativo fs (File System) do Node.js.  
Os dados de aeronaves, peças, funcionários, etapas e relatórios serão salvos automaticamente em arquivos de texto (.json ou .txt) na própria raiz do projeto, permitindo fácil consulta e backup.