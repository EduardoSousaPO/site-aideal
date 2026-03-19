export const SITE_NAME = "A Ideal Soluções Anticorrosivas";
export const SITE_DESCRIPTION =
  "Especialistas em pintura industrial, revestimentos anticorrosivos e soluções técnicas para ambientes industriais em todo o Brasil.";
export const SITE_URL = "https://aideal.com.br";

export const BRAND = {
  red: "#E80000",
  blue: "#005596",
  green: "#5cb85c",
  navy: "#02264A",
  light: "#edf2f8",
};

export const WHATSAPP_URL =
  "https://wa.me/556293089724?text=Tenho%20interesse%20em%20receber%20um%20orcamento";

export const CONTACT_INFO = {
  phone: "(62) 3442-1958",
  phoneHref: "tel:+556234421958",
  whatsapp: "(62) 9308-9724",
  email: "contato@aideal.com.br",
  emailHref: "mailto:contato@aideal.com.br",
  address:
    "Rua Apucarana, S/N, QD-66-A, Jardim Marista, Trindade - GO, CEP 75383-372",
  mapEmbed:
    "https://maps.google.com/maps?q=Rua%20Apucarana%20S%2FN%2C%20Trindade%2C%20GO&t=&z=13&ie=UTF8&iwloc=&output=embed",
  instagram: "https://www.instagram.com/aidealengenharia/",
  linkedin: "https://www.linkedin.com/company/a-ideal-engenharia/",
};

export const SERVICE_DROPDOWN = [
  { label: "Acesso por Cordas", href: "/acesso-por-cordas" },
  { label: "Hidrojateamento", href: "/hidrojateamento" },
  { label: "Jateamento Abrasivo", href: "/jateamento-abrasivo" },
  {
    label: "Pintura Industrial Anticorrosiva",
    href: "/pintura-industrial-anticorrosiva",
  },
  { label: "Piso Industrial Uretano", href: "/piso-industrial-uretano" },
  { label: "Piso Industrial MMA", href: "/piso-industrial-mma" },
  {
    label: "Revestimento de Borracha líquida",
    href: "/revestimento-de-borracha-liquida",
  },
];

export const MAIN_NAV = [
  { label: "Home", href: "/" },
  { label: "Sobre nós", href: "/sobre-nos" },
  { label: "Serviços", href: "#servicos", isDropdown: true },
  { label: "Atestado Técnico", href: "/atestado-tecnico" },
  { label: "Clientes", href: "/#clientes" },
  { label: "Contato", href: "/#contato" },
];

export const MOBILE_EXTRA_LINKS: Array<{ label: string; href: string }> = [];

export const SERVICE_SLUGS = [
  "acesso-por-cordas",
  "hidrojateamento",
  "jateamento-abrasivo",
  "pintura-industrial-anticorrosiva",
  "piso-industrial-uretano",
  "piso-industrial-mma",
  "revestimento-de-borracha-liquida",
  "isolamento-termico",
  "montagem-andaime-tobo-roll",
  "montagem-de-quick-deck",
  "piso-industrial-epoxy",
  "atestado-tecnico",
] as const;

export const PDF_PAGE_MAP: Record<string, string> = {};

export const DEFAULT_FAQ_BY_SLUG: Record<
  string,
  Array<{ question: string; answer: string }>
> = {
  "acesso-por-cordas": [
    {
      question: "O que é o serviço de acesso por cordas e quando ele é indicado?",
      answer:
        "É uma técnica de trabalho em altura para inspeções, manutenções, limpezas e instalações em locais de difícil acesso, com segurança e agilidade.",
    },
    {
      question:
        "Quais são as vantagens do acesso por cordas em relação a andaimes e plataformas?",
      answer:
        "Reduz custos com estruturas temporárias, aumenta a velocidade de execução e reduz interferências nas operações industriais.",
    },
    {
      question: "Os profissionais são certificados e seguem normas de segurança?",
      answer:
        "Sim. A operação segue protocolos de NR-35 e boas práticas de certificação técnica para atividades em altura.",
    },
    {
      question: "Quais estruturas podem receber serviços por acesso por cordas?",
      answer:
        "Torres, fachadas, silos, pontes, reservatórios, parques eólicos, estruturas offshore e áreas industriais com acesso complexo.",
    },
  ],
  hidrojateamento: [
    {
      question: "O que é hidrojateamento e para que ele é utilizado?",
      answer:
        "É a limpeza com água em alta pressão para remoção de incrustações, ferrugem, resíduos e contaminantes sem agressão excessiva ao substrato.",
    },
    {
      question: "O hidrojateamento substitui o jateamento abrasivo?",
      answer:
        "Cada técnica tem aplicação específica. O hidrojateamento é excelente para limpeza e preparo em cenários que exigem menor geração de resíduos sólidos.",
    },
    {
      question: "Quais ganhos operacionais esse método oferece?",
      answer:
        "Melhora produtividade, reduz tempo de parada e aumenta aderência de sistemas de proteção quando aplicado com o padrão técnico adequado.",
    },
    {
      question: "Quais segmentos industriais atendem com hidrojateamento?",
      answer:
        "Energia, mineração, óleo e gás, alimentos, papel e celulose, cimento e infraestrutura pesada.",
    },
  ],
};

export const REVIEW_CARDS = [
  {
    name: "Rafael Almeida",
    date: "há 3 meses",
    text: "Empresa extremamente profissional. Atendimento rápido e execução técnica impecável.",
  },
  {
    name: "Juliana Costa",
    date: "há 5 meses",
    text: "Equipe comprometida, organizada e com ótimo padrão de segurança em campo.",
  },
  {
    name: "Carlos Nascimento",
    date: "há 8 meses",
    text: "Serviço entregue dentro do prazo e com qualidade acima do esperado.",
  },
];

export const ABOUT_VALUE_ITEMS = [
  "Responsabilidade Social",
  "Valorização Humana",
  "Transparência",
  "Ética",
  "Qualidade",
  "Pontualidade",
];
