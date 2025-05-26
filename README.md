# 📸 Face Recognition Dashboard

Sistema de monitoramento e análise de fluxo de pessoas através de reconhecimento facial em tempo real.

## 🎯 Sobre o Projeto

Esta aplicação foi desenvolvida como parte de um teste técnico, implementando uma solução completa de monitoramento facial com:

- **Interface** para visualização em tempo real
- **Detecção facial** com cálculo de distância aproximada
- **Sistema anti-duplicação** baseado em vetores faciais

## 🔗 Links de Demonstração

- [Aplicação Final](https://v0-modern-dashboard-design-beta-self.vercel.app/)

- [Mockup inicial (v0.dev)](https://face-recognition-dashboard-git-feat-95a131-thunderjrs-projects.vercel.app)

- [Branch da implementação inicial](https://github.com/thunderjr/face-recognition-dashboard/tree/feat/initial-v0-implementation)

---

## 🔧 Instalação

### Pré-requisitos
- Node.js
- Conta no [Google Firebase](https://console.firebase.google.com)
- Conta na [Turso (hospedagem SQLite)](https://turso.tech) (opcional)

### 1. Clone o repositório
```bash
git clone https://github.com/thunderjr/face-recognition-dashboard.git
cd face-recognition-dashboard
```

### 2. Instale as dependências
```bash
pnpm install
```

### 3. Configure o Firebase
1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Atualize as credenciais no arquivo `.env`

### 4. Configuração Turso
##### (opcional - hospedagem do banco de dados SQLite)
1. Crie um banco de dados na plataforma [Turso](https://turso.tech)
2. Adicione a URL e credenciais no arquivo `.env`

##### (Utilize `file:[DB_NAME].db` para desenvolvimento local)

## ⚙️ Configuração

### Calibração de Distância
1. Posicione-se a uma distância conhecida da câmera (ex: 1.5m)
2. Acesse as configurações na interface
3. Informe a distância real e clique em "Calibrar"
4. O sistema calculará automaticamente a constante de calibração

### Parâmetros Ajustáveis
- **Qualidade de Detecção**: Score mínimo para considerar uma detecção válida
- **Threshold de Similaridade**: Sensibilidade para detectar faces similares
- **Intervalo Temporal**: Tempo mínimo entre registros da mesma pessoa
