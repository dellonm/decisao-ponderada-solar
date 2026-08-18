// Catálogo de produtos — Decisão Ponderada
// Categorias: kits, inversores, baterias, estruturas, acessorios
const PRODUCTS = [
  {
    id: "kit-s2-20kwh",
    cat: "kits",
    catLabel: "Kits Solares",
    name: "Kit Solar Lítio Deye S2 — 20 kWh/dia",
    brand: "Deye",
    price: 3034.52,
    tag: "Mais vendido",
    specs: ["20 kWh/dia de produção", "Bateria de lítio 5.12 kWh, 90% DOD", "Inversor híbrido incluído", "Instalação monofásica"],
    desc: "Kit completo para autoconsumo residencial com armazenamento em bateria de lítio. Ideal para casas com consumo médio que querem reduzir a fatura e ter energia de reserva."
  },
  {
    id: "kit-s3-20kwh-2bat",
    cat: "kits",
    catLabel: "Kits Solares",
    name: "Kit Solar S3 — 20 kWh/dia, 2 baterias",
    brand: "Deye",
    price: 3972.00,
    specs: ["20 kWh/dia de produção", "2x baterias de lítio SE-G5.1 Pro-B (5.12 kWh cada)", "10.24 kWh de capacidade total", "Expansível"],
    desc: "Kit com capacidade de armazenamento reforçada — duas baterias de lítio para maior autonomia em dias sem sol."
  },
  {
    id: "kit-d20-12kwh",
    cat: "kits",
    catLabel: "Kits Solares",
    name: "Kit Solar Lítio D20 — 12 kWh/dia",
    brand: "Deye / Pylontech",
    price: 3758.22,
    specs: ["12 kWh/dia de produção", "Bateria Pylontech 4.8 kWh", "Compacto, ideal para apartamentos e T2/T3", "Monitorização via app"],
    desc: "Solução de entrada para quem quer começar a poupar com painéis solares sem grande investimento inicial."
  },
  {
    id: "kit-s4-30kwh",
    cat: "kits",
    catLabel: "Kits Solares",
    name: "Kit Solar Lítio Deye S4 — 30 kWh/dia",
    brand: "Deye",
    price: 5095.32,
    specs: ["30 kWh/dia de produção", "Bateria de lítio 10.24 kWh, 90% DOD", "Para consumos elevados", "Inversor híbrido WiFi"],
    desc: "Para moradias com consumo elevado — climatização, carregamento de veículo elétrico e uso intensivo de eletrodomésticos."
  },
  {
    id: "kit-d21-20kwh",
    cat: "kits",
    catLabel: "Kits Solares",
    name: "Kit Solar Lítio D21 — 20 kWh/dia",
    brand: "Deye / Pylontech",
    price: 5612.81,
    specs: ["20 kWh/dia de produção", "Bateria Pylontech 9.6 kWh, 90% DOD", "Alta densidade energética", "Design modular"],
    desc: "Armazenamento Pylontech de referência com excelente relação capacidade/espaço ocupado."
  },
  {
    id: "kit-s5-30kwh",
    cat: "kits",
    catLabel: "Kits Solares",
    name: "Kit Solar Lítio Deye S5 — 30 kWh/dia",
    brand: "Deye",
    price: 6032.80,
    tag: "Recomendado",
    specs: ["30 kWh/dia de produção", "Bateria de lítio 15.36 kWh, 90% DOD", "Máxima autonomia residencial", "Garantia alargada"],
    desc: "O nosso kit residencial mais completo — máxima produção e armazenamento para independência quase total da rede."
  },
  {
    id: "kit-d9-30kwh-trifasico",
    cat: "kits",
    catLabel: "Kits Solares",
    name: "Kit Lítio Trifásico D9 — 30 kWh/dia",
    brand: "Deye / WeCo",
    price: 6820.32,
    specs: ["30 kWh/dia, ligação trifásica", "Bateria WeCo 16.3 kWh, 98% DOD", "Ideal para moradias grandes", "Suporta cargas trifásicas"],
    desc: "Sistema trifásico para casas com quadro elétrico trifásico ou consumos mais exigentes."
  },
  {
    id: "kit-d7-30kwh",
    cat: "kits",
    catLabel: "Kits Solares",
    name: "Kit Lítio Deye D7 — 30 kWh/dia",
    brand: "Deye / WeCo",
    price: 7504.12,
    specs: ["30 kWh/dia de produção", "Bateria WeCo 15.66 kWh", "Elevada autonomia diária", "Compatível com expansão futura"],
    desc: "Equilíbrio entre produção elevada e capacidade de armazenamento robusta."
  },
  {
    id: "kit-d8-30kwh",
    cat: "kits",
    catLabel: "Kits Solares",
    name: "Kit Lítio Deye D8 — 30 kWh/dia",
    brand: "Deye / WeCo",
    price: 9147.92,
    specs: ["30 kWh/dia de produção", "Bateria WeCo 20.88 kWh", "Máxima capacidade de armazenamento", "Para independência energética total"],
    desc: "O topo de gama para quem quer o máximo de autonomia possível face à rede elétrica."
  },
  {
    id: "kit-d10-30kwh-trifasico",
    cat: "kits",
    catLabel: "Kits Solares",
    name: "Kit Trifásico D10 — 30 kWh/dia",
    brand: "Deye / WeCo",
    price: 9885.76,
    tag: "Topo de gama",
    specs: ["30 kWh/dia, trifásico", "Bateria WeCo 10.6 kWh", "Para moradias e pequenos negócios", "Elevada fiabilidade"],
    desc: "Solução trifásica premium pensada para consumos comerciais ou moradias de grande dimensão."
  },
  {
    id: "inv-deye-3kw",
    cat: "inversores",
    catLabel: "Inversores",
    name: "Inversor Híbrido Deye Sun 3kW Monofásico",
    brand: "Deye",
    price: 877.72,
    specs: ["3 kW de potência", "Monofásico", "Compatível com bateria de lítio", "Modelo 3K-SG04LP1-EU-SM1"],
    desc: "Inversor híbrido de entrada, robusto e eficiente, para sistemas residenciais de menor dimensão."
  },
  {
    id: "inv-deye-3kw-500v",
    cat: "inversores",
    catLabel: "Inversores",
    name: "Inversor Híbrido Deye Sun 3000W 500V/24V MPPT WiFi",
    brand: "Deye",
    price: 1000.15,
    specs: ["3000W, monofásico", "500V / 24V, MPPT duplo", "WiFi integrado", "Monitorização remota via app"],
    desc: "Controlo total do sistema a partir do telemóvel, com dois MPPT para maior eficiência de captação."
  },
  {
    id: "inv-deye-5kw",
    cat: "inversores",
    catLabel: "Inversores",
    name: "Inversor Híbrido Deye Sun 5000W 2 MPPT WiFi",
    brand: "Deye",
    price: 1163.35,
    tag: "Mais vendido",
    specs: ["5000W de potência", "2 MPPT, WiFi, paralelizável", "Modelo SG03LP1-EU", "Ideal para expansão futura"],
    desc: "O inversor mais versátil da gama — paralelizável para quem prevê aumentar a potência instalada no futuro."
  },
  {
    id: "bat-pylontech-rack-6",
    cat: "baterias",
    catLabel: "Baterias & Acessórios",
    name: "Rack PowerCube H2 6+1 para Baterias Pylontech",
    brand: "PowerCube",
    price: 366.00,
    specs: ["Configuração 6+1 módulos", "Compatível com baterias Pylontech", "Estrutura reforçada"],
    desc: "Suporte robusto para organizar e proteger o seu banco de baterias Pylontech."
  },
  {
    id: "bat-pylontech-rack-12",
    cat: "baterias",
    catLabel: "Baterias & Acessórios",
    name: "Rack PowerCube H2 12+1 para Baterias Pylontech",
    brand: "PowerCube",
    price: 475.65,
    specs: ["Configuração 12+1 módulos", "Compatível com baterias Pylontech", "Para instalações de maior capacidade"],
    desc: "Versão de maior capacidade do rack PowerCube, para bancos de baterias expandidos."
  },
  {
    id: "bat-armario-u16",
    cat: "baterias",
    catLabel: "Baterias & Acessórios",
    name: "Armário de Baterias Pylontech U16",
    brand: "Pylontech",
    price: 303.70,
    specs: ["Armário de armazenamento dedicado", "Proteção e organização das baterias", "Fácil instalação"],
    desc: "Armário fechado para instalação segura e esteticamente cuidada do banco de baterias."
  },
  {
    id: "bat-armario-12u",
    cat: "baterias",
    catLabel: "Baterias & Acessórios",
    name: "Armário 12U para 4 Módulos Pylontech US3000C",
    brand: "Pylontech",
    price: 276.02,
    specs: ["Formato 12U", "Capacidade para 4 módulos US3000C", "Ventilação otimizada"],
    desc: "Compatível com os módulos US3000C, com espaço otimizado para instalação em garagem ou arrecadação."
  },
  {
    id: "acc-conectores-weco-5k3",
    cat: "acessorios",
    catLabel: "Acessórios",
    name: "Conjunto de Conectores WeCo 5k3 (360A) — 2 unidades",
    brand: "WeCo",
    price: 57.84,
    specs: ["Corrente nominal 360A", "Pack com 2 unidades", "Ligação segura entre baterias"],
    desc: "Conectores de alta corrente para ligação entre módulos de bateria WeCo."
  },
  {
    id: "acc-conectores-weco-4k4",
    cat: "acessorios",
    catLabel: "Acessórios",
    name: "Conjunto de Conectores WeCo 4k4 LT (360A) — 2 unidades",
    brand: "WeCo",
    price: 57.84,
    specs: ["Corrente nominal 360A", "Pack com 2 unidades", "Compatível com série 4k4 LT"],
    desc: "Solução de ligação fiável para expansão de bancos de baterias WeCo série 4k4."
  },
  {
    id: "est-estrutura-telhado",
    cat: "estruturas",
    catLabel: "Estruturas",
    name: "Estrutura de Fixação para Telhado Inclinado",
    brand: "Decisão Ponderada",
    price: 189.00,
    specs: ["Alumínio anodizado resistente à corrosão", "Compatível com telha cerâmica e chapa", "Kit por painel"],
    desc: "Estrutura de montagem certificada para instalação segura de painéis em telhados inclinados."
  },
  {
    id: "est-estrutura-plana",
    cat: "estruturas",
    catLabel: "Estruturas",
    name: "Estrutura de Fixação para Cobertura Plana",
    brand: "Decisão Ponderada",
    price: 219.00,
    specs: ["Ângulo ajustável 10°–30°", "Ideal para terraços e coberturas planas", "Lastro em betão opcional"],
    desc: "Sistema de suporte com inclinação ajustável para maximizar a produção em coberturas planas."
  },
  {
    id: "ev-wallbox-7kw",
    cat: "carregadores",
    catLabel: "Carregadores EV",
    name: "Carregador Wallbox 7.4 kW Monofásico",
    brand: "Wallbox",
    price: 549.00,
    tag: "Mais vendido",
    specs: ["7.4 kW, monofásico", "Cabo Tipo 2, 5 metros", "Ideal para carregamento noturno", "Compatível com autoconsumo solar"],
    desc: "Entrada acessível para quem quer carregar o carro elétrico em casa, aproveitando a energia produzida durante o dia."
  },
  {
    id: "ev-wallbox-11kw",
    cat: "carregadores",
    catLabel: "Carregadores EV",
    name: "Carregador Wallbox 11 kW Trifásico",
    brand: "Wallbox",
    price: 799.00,
    specs: ["11 kW, trifásico", "Carregamento até 3x mais rápido que o monofásico", "App de monitorização", "Instalação em garagem ou exterior"],
    desc: "Para quem precisa de carregar mais rápido — ideal para veículos com maior autonomia de bateria."
  },
  {
    id: "ev-wallbox-22kw-app",
    cat: "carregadores",
    catLabel: "Carregadores EV",
    name: "Carregador Wallbox 22 kW Trifásico com App",
    brand: "Wallbox",
    price: 1199.00,
    tag: "Topo de gama",
    specs: ["22 kW, trifásico", "Gestão inteligente de carga via app", "Integração com sistema solar (carrega o excedente)", "Controlo remoto e agendamento"],
    desc: "O carregador mais rápido e mais inteligente da gama — prioriza a energia solar disponível antes de puxar da rede."
  }
];
