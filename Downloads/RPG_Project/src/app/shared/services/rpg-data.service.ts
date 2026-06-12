import { Injectable } from '@angular/core';
import { Category, BestiaryCreature, Treasure, Region, Deity } from '../models/rpg.models';

export interface ClassDetail {
  id: string;
  name: string;
  icon: string;
  colorKey: string;
  tagline: string;
  description: string;
  attributes: string[];
  abilities: { name: string; icon: string; description: string }[];
  playstyle: string;
  lore: string;
}

@Injectable({ providedIn: 'root' })
export class RpgDataService {

  private categories: Category[] = [
    { id: 'dragoes',    name: 'Dragões',      description: 'Os antigos senhores dos céus e guardiões de tesouros lendários.', imageUrl: 'assets/images/rpg/cat_dragoes.jpg', type: 'criatura' },
    { id: 'elfos',      name: 'Elfos',         description: 'Seres graciosos com conexão profunda com a natureza e a magia.', imageUrl: 'assets/images/rpg/cat_elfos.jpg', type: 'criatura' },
    { id: 'orcs',       name: 'Orcs',          description: 'Guerreiros brutais forjados na guerra e honrados em combate.', imageUrl: 'assets/images/rpg/cat_orcs.jpg', type: 'criatura' },
    { id: 'fadas',      name: 'Fadas',         description: 'Criaturas caprichosas do reino feérico, perigosamente belas.', imageUrl: 'assets/images/rpg/cat_fadas.jpg', type: 'criatura' },
    { id: 'vampiros',   name: 'Vampiros',      description: 'Imortais aristocráticos que habitam as sombras da noite.', imageUrl: 'assets/images/rpg/cat_vampiros.jpg', type: 'criatura' },
    { id: 'lobisomens', name: 'Lobisomens',    description: 'Amaldiçoados pela lua cheia, oscilam entre homem e besta.', imageUrl: 'assets/images/rpg/cat_lobisomens.jpg', type: 'criatura' },
    { id: 'trolls',     name: 'Trolls',        description: 'Criaturas regenerativas que habitam pontes e cavernas.', imageUrl: 'assets/images/rpg/cat_trolls.jpg', type: 'criatura' },
    { id: 'ogros',      name: 'Ogros',         description: 'Colossais e destrutivos, conhecidos por sua força bruta.', imageUrl: 'assets/images/rpg/cat_ogros.jpg', type: 'criatura' },
    { id: 'goblins',    name: 'Goblins',       description: 'Pequenos e astutos, perigosos em grupos numerosos.', imageUrl: 'assets/images/rpg/cat_goblins.jpg', type: 'criatura' },
    { id: 'necromantes',name: 'Necromantes',   description: 'Mestres da morte que dobram a vontade dos mortos.',imageUrl: 'assets/images/rpg/cat_necromantes.jpg', type: 'classe', tag: 'Classe Arcana' },
    { id: 'magos',      name: 'Magos',         description: 'Estudiosos do arcano que moldaram civilizações inteiras.', imageUrl: 'assets/images/rpg/cat_magos.jpg', type: 'classe' },
    { id: 'reinos',     name: 'Reinos',        description: 'Grandes impérios e nações espalhados pelo mundo.', imageUrl: 'assets/images/rpg/cat_reinos.jpg', type: 'reino' },
    { id: 'classes',    name: 'Classes RPG',   description: 'Arquiteturas de personagem que definem seu papel na aventura.', imageUrl: 'assets/images/rpg/cat_classes.jpg', type: 'classe' },
    { id: 'armas',      name: 'Armas Mágicas', description: 'Relíquias e artefatos encantados de poder incomensurável.', imageUrl: 'assets/images/rpg/cat_armas.jpg', type: 'arma' },
    { id: 'mitologias', name: 'Mitologias',    description: 'Panteões divinos e lendas que moldaram o cosmos.', imageUrl: 'assets/images/rpg/cat_mitologias.jpg', type: 'magia' },
    // Classes individuais (acessadas pela página Classes)
    { id: 'guerreiro',  name: 'Guerreiro',     description: 'Mestre do combate corpo a corpo, linha de frente impenetrável.', imageUrl: 'assets/images/rpg/classe_guerreiro.jpg', type: 'classe' },
    { id: 'mago',       name: 'Mago',          description: 'Dobra a realidade com magia arcana aprendida ao longo de décadas.', imageUrl: 'assets/images/rpg/classe_mago.jpg', type: 'classe' },
    { id: 'ladino',     name: 'Ladino',        description: 'As sombras são sua armadura e o silêncio, sua maior arma.', imageUrl: 'assets/images/rpg/classe_ladino.jpg', type: 'classe' },
    { id: 'clerigo',    name: 'Clérigo',       description: 'Porta-voz dos deuses no mundo mortal, canal de poder divino.', imageUrl: 'assets/images/rpg/classe_clerigo.jpg', type: 'classe' },
    { id: 'ranger',     name: 'Ranger',        description: 'Caçador das terras selvagens, guardião das fronteiras do mundo.', imageUrl: 'assets/images/rpg/classe_ranger.jpg', type: 'classe' },
    { id: 'bardo',      name: 'Bardo',         description: 'Magia canalizada através da arte, da música e do carisma.', imageUrl: 'assets/images/rpg/classe_bardo.jpg', type: 'classe' },
    { id: 'necromante', name: 'Necromante',    description: 'Senhor dos mortos e das sombras que existem além da vida.', imageUrl: 'assets/images/rpg/classe_necromante.jpg', type: 'classe', tag: 'Classe Arcana' },
    { id: 'paladino',   name: 'Paladino',      description: 'Guerreiro sagrado que carrega a ordem divina como escudo.', imageUrl: 'assets/images/rpg/classe_paladino.jpg', type: 'classe' },
  ];

  private categoryDetails: Record<string, {
    lore: string;
    powers: { icon: string; name: string; description: string }[];
    figures: { icon: string; name: string; lore: string }[];
  }> = {
    dragoes: {
      lore: 'Antes mesmo dos impérios surgirem, os dragões já sobrevoavam o mundo. Criaturas de inteligência primordial, cada um é uma força da natureza com séculos de sabedoria e rancor. Alguns são guardiões; outros, destruidores.',
      powers: [
        { icon: 'mode_heat',    name: 'Sopro Elemental', description: 'Liberam fogo, ácido, gelo ou relâmpago dependendo da linhagem.' },
        { icon: 'shield',       name: 'Escamas Arcanas',  description: 'Pele equivalente a armadura lendária, resistente a magia.' },
        { icon: 'psychology',   name: 'Mente Colossal',   description: 'Inteligência superior à de qualquer mortal. Nunca subestime.' },
        { icon: 'flight',       name: 'Voo Supremo',      description: 'Capazes de alcançar altitudes inacessíveis em segundos.' },
      ],
      figures: [
        { icon: 'mode_heat',    name: 'Ignaroth, o Cinzento',   lore: 'Dragão vermelho ancião que dorme sobre montanhas de ouro há mil anos.' },
        { icon: 'dark_mode',    name: 'Vethara das Sombras',     lore: 'Dragão negro que governa o Pântano Eterno com ácido e terror.' },
        { icon: 'auto_fix_high',name: 'Lyrindel, o Sábio',      lore: 'Dragão prateado que ensina magia a mortais escolhidos.' },
      ],
    },
    elfos: {
      lore: 'Nascidos nos albores do mundo, os elfos carregam a memória viva dos séculos. Sua conexão com a magia da natureza é instintiva, não aprendida. Vivem séculos, mas raramente se misturam aos mortais de vida curta.',
      powers: [
        { icon: 'visibility',   name: 'Visão Arcana',     description: 'Enxergam no escuro e detectam magia a olho nu.' },
        { icon: 'forest',       name: 'Vínculo Natural',   description: 'Comunicam-se com animais e plantas em florestas antigas.' },
        { icon: 'auto_fix_high',name: 'Magia Inata',       description: 'Lançam cantrips sem estudo. A magia flui no sangue.' },
        { icon: 'sprint',       name: 'Graciosidade',      description: 'Movem-se sem deixar rastros e nunca tropeçam em terrenos difíceis.' },
      ],
      figures: [
        { icon: 'forest',       name: 'Aerindyl, a Anciã',       lore: 'Rainha das Florestas de Prata, viva há três mil anos.' },
        { icon: 'light_mode',   name: 'Caladwen, o Arqueiro',    lore: 'Nunca errou um alvo em dois séculos de serviço.' },
        { icon: 'auto_fix_high',name: 'Thirandor, o Renegado',   lore: 'Elfo que abandonou a floresta para estudar magia sombria.' },
      ],
    },
    orcs: {
      lore: 'Forjados em batalha, os orcs constroem civilizações baseadas em força, honra e conquista. Sua brutalidade é calculada — um orc que sobrevive dez batalhas é mais estrategista do que qualquer general humano.',
      powers: [
        { icon: 'fitness_center', name: 'Força Colossal',  description: 'Carregam armaduras pesadas sem penalidade de movimento.' },
        { icon: 'psychology',     name: 'Fúria de Batalha',description: 'Em combate, ignoram dor e continuam lutando mesmo feridos.' },
        { icon: 'military_tech',  name: 'Disciplina Tribal',description: 'Clãs coordenados superam exércitos maiores em táticas.' },
        { icon: 'swords',         name: 'Artesãos de Ferro', description: 'Forjam armas rúnicas primitivas de eficiência letal.' },
      ],
      figures: [
        { icon: 'fitness_center', name: 'Grommash Carne-de-Ferro', lore: 'Conquistou doze reinos antes dos 40 anos. Nunca perdeu uma batalha.' },
        { icon: 'skull',          name: 'Kharak, o Ceifador',      lore: 'Líder de culto que mistura religião com guerra total.' },
        { icon: 'military_tech',  name: 'Urdra, a Xamã',           lore: 'Uniu os clãs dispersos através de visões proféticas.' },
      ],
    },
    fadas: {
      lore: 'Do Reino Feérico, as fadas trazem consigo regras que não fazem sentido para os mortais. Seu poder é real e letal, mas embrulhado em alegria e capricho. Um favor de fada nunca é gratuito.',
      powers: [
        { icon: 'auto_fix_high', name: 'Ilusão Perfeita',   description: 'Criam realidades falsas indistinguíveis das verdadeiras.' },
        { icon: 'shuffle',       name: 'Elo Feérico',        description: 'Podem puxar mortais para o Reino Feérico sem aviso.' },
        { icon: 'star',          name: 'Encantamento',       description: 'Um sorriso de fada pode criar lealdade cega e eterna.' },
        { icon: 'pets',          name: 'Polimorfia',         description: 'Transformam criaturas em animais como punição ou brincadeira.' },
      ],
      figures: [
        { icon: 'star',          name: 'Titânia, a Rainha',   lore: 'Soberana do Reino Feérico. Sua beleza esconde séculos de crueldade.' },
        { icon: 'auto_fix_high', name: 'Puck, o Embusteiro',  lore: 'Fada trickster que transforma a vida dos mortais em teatro.' },
        { icon: 'pets',          name: 'Silvana das Névoas',  lore: 'Guarda o portal entre o mundo mortal e o feérico.' },
      ],
    },
    vampiros: {
      lore: 'A maldição vampírica é antiga como os próprios deuses. Imortais aristocráticos que constroem impérios nas sombras, os vampiros operam nas altas esferas da política e do poder enquanto se alimentam na escuridão.',
      powers: [
        { icon: 'dark_mode',     name: 'Imortalidade',      description: 'Não envelhecem e regeneram de quase qualquer ferimento.' },
        { icon: 'psychology',    name: 'Hipnose',            description: 'Contato visual pode subjugar mentes fracas em segundos.' },
        { icon: 'flight',        name: 'Forma de Névoa',     description: 'Dissolvem o corpo em névoa para passar por frestas.' },
        { icon: 'fitness_center',name: 'Força Sobrenatural', description: 'Dez vezes mais fortes que o mais poderoso mortal.' },
      ],
      figures: [
        { icon: 'dark_mode',     name: 'Conde Alistair Voss', lore: 'Governa uma cidade inteira sem que os humanos saibam que são rebanho.' },
        { icon: 'auto_fix_high', name: 'Seraphine das Cinzas',lore: 'Vampira arquimaga que usa magia e presas como armas iguais.' },
        { icon: 'skull',         name: 'Valdris, o Primeiro', lore: 'O vampiro original. Criou todos os outros. Dorme há séculos.' },
      ],
    },
    lobisomens: {
      lore: 'A maldição do lobisomem não é apenas uma transformação física — é uma guerra interna entre o homem e a besta. Sob a lua cheia, a besta sempre vence. O resto do mês é uma tentativa desesperada de controle.',
      powers: [
        { icon: 'pets',          name: 'Transformação',     description: 'Força, velocidade e garras que rasgam aço na forma bestial.' },
        { icon: 'favorite',      name: 'Regeneração',        description: 'Curam ferimentos em minutos. Só prata os mata permanentemente.' },
        { icon: 'dark_mode',     name: 'Faro Aguçado',       description: 'Rastreiam qualquer pessoa pelo cheiro por quilômetros.' },
        { icon: 'psychology',    name: 'Instinto Animal',    description: 'Percebem ameaças antes mesmo de percebê-las conscientemente.' },
      ],
      figures: [
        { icon: 'pets',          name: 'Gareth, o Lobo Cinzento', lore: 'Líder de matilha que tenta manter a humanidade do clã.' },
        { icon: 'skull',         name: 'A Fera Sem Nome',         lore: 'Lobisomem que perdeu completamente a consciência humana.' },
        { icon: 'favorite',      name: 'Mira, a Curandeira',      lore: 'Estuda a cura da maldição há décadas sem sucesso.' },
      ],
    },
    trolls: {
      lore: 'Guardiões primitivos de pontes, cavernas e territórios ancestrais, os trolls são mais inteligentes do que aparentam. Sua regeneração os torna quase imorredouros — exceto para o fogo e o ácido.',
      powers: [
        { icon: 'healing',       name: 'Regeneração',       description: 'Membros arrancados crescem de volta em minutos.' },
        { icon: 'fitness_center',name: 'Força Bruta',        description: 'Derrubam árvores e quebram rochas com as mãos.' },
        { icon: 'psychology',    name: 'Olfato Predatório',  description: 'Farejam presa a quilômetros de distância.' },
        { icon: 'pets',          name: 'Pele Dura',          description: 'Resistentes a cortes e perfurações comuns.' },
      ],
      figures: [
        { icon: 'fitness_center',name: 'Gruumsh-Pedra',      lore: 'Troll ancião que guarda a única ponte para o norte há 200 anos.' },
        { icon: 'healing',       name: 'A Mãe dos Trolls',   lore: 'Lendária criatura que dizem ter regenerado de cinzas.' },
        { icon: 'skull',         name: 'Reskoth, o Sábio',   lore: 'Troll que aprendeu a ler e guarda biblioteca de vítimas antigas.' },
      ],
    },
    ogros: {
      lore: 'Destruidores por natureza, os ogros são recrutados como armas de guerra por generais sem escrúpulos. Sua inteligência é subestimada — alguns ogros são estrategistas brutalmente eficazes.',
      powers: [
        { icon: 'fitness_center',name: 'Devastação Física',  description: 'Um golpe de ogro pode destruir uma porta reforçada.' },
        { icon: 'shield',        name: 'Pele Couraçada',     description: 'Naturalmente resistentes a danos físicos e alguns mágicos.' },
        { icon: 'swords',        name: 'Armas Improvisadas', description: 'Usam troncos e pedras como armas com destreza surpreendente.' },
        { icon: 'psychology',    name: 'Grito de Guerra',    description: 'Sua voz pode causar medo em criaturas menos poderosas.' },
      ],
      figures: [
        { icon: 'fitness_center',name: 'Gorak, o Demolidor',  lore: 'Destruiu um castelo inteiro em três dias para uma facção pagante.' },
        { icon: 'military_tech', name: 'Draga, a Rainha',     lore: 'Ogra que comanda um exército de cem ogros com disciplina militar.' },
        { icon: 'skull',         name: 'Um-Olho',             lore: 'Lendário ogro que sobreviveu a dez tentativas de assassinato.' },
      ],
    },
    goblins: {
      lore: 'Individualmente fracos, os goblins em grupo são uma praga calculada. Sua inventividade é assustadora — trapas, armadilhas e táticas de guerrilha que envergonhariam generais experientes.',
      powers: [
        { icon: 'sprint',        name: 'Agilidade',          description: 'Rápidos e difíceis de acertar, especialmente em grupos.' },
        { icon: 'psychology',    name: 'Visão Noturna',      description: 'Enxergam perfeitamente no escuro mais absoluto.' },
        { icon: 'gavel',         name: 'Armadilhas',         description: 'Mestres em construir armadilhas com recursos mínimos.' },
        { icon: 'groups',        name: 'Força em Bando',     description: 'Coordenam ataques em ondas que esgotam qualquer defensor.' },
      ],
      figures: [
        { icon: 'psychology',    name: 'Rixx, o Engenheiro', lore: 'Goblin que projeta armadilhas capazes de matar dragões.' },
        { icon: 'groups',        name: 'Zog, o Rei da Horda',lore: 'Governa uma cidade subterrânea de 10.000 goblins.' },
        { icon: 'gavel',         name: 'Nibble, a Assassina',lore: 'A goblin mais perigosa do mundo. Ninguém sabe como ela parece.' },
      ],
    },
    necromantes: {
      lore: 'A necromancia não é apenas proibida — é incompreendida. Os necromantes estudam a fronteira entre a vida e a morte com rigor científico. Para eles, a morte é apenas outra forma de energia a ser manipulada.',
      powers: [
        { icon: 'skull',         name: 'Animar Mortos',      description: 'Reanimam corpos como servos permanentes ou temporários.' },
        { icon: 'dark_mode',     name: 'Drenar Vida',        description: 'Absorvem a força vital de criaturas para regenerar-se.' },
        { icon: 'auto_fix_high', name: 'Magia Sombria',      description: 'Acesso a feitiços banidos das academias convencionais.' },
        { icon: 'psychology',    name: 'Falar com Mortos',   description: 'Interrogam almas recentemente falecidas por informação.' },
      ],
      figures: [
        { icon: 'skull',         name: 'Malachar, o Eterno', lore: 'Transformou-se num Lich após décadas de pesquisa proibida.' },
        { icon: 'auto_fix_high', name: 'Seraphine Escura',   lore: 'Necromante que usa exércitos de mortos para proteger inocentes.' },
        { icon: 'dark_mode',     name: 'O Sem Rosto',        lore: 'Identidade apagada pelos deuses como punição por heresia.' },
      ],
    },
    magos: {
      lore: 'Os magos passam décadas estudando a natureza fundamental da realidade. Para eles, o mundo é composto de energias que podem ser reescritas por quem conhece a linguagem correta.',
      powers: [
        { icon: 'auto_fix_high', name: 'Feitiçaria Arcana',  description: 'Dobram as leis da física com fórmulas e gestos precisos.' },
        { icon: 'menu_book',     name: 'Grimório',            description: 'Livro de feitiços com décadas de conhecimento acumulado.' },
        { icon: 'psychology',    name: 'Mente Afiada',       description: 'Resistência natural a ilusões, encantamentos e compulsões.' },
        { icon: 'bolt',          name: 'Poder Ilimitado',    description: 'Quanto mais feitiços lançados, mais poderosos se tornam.' },
      ],
      figures: [
        { icon: 'auto_fix_high', name: 'Valdren, o Arquimago', lore: 'Mago mais poderoso vivo. Transformou uma cidade em cristal por acidente.' },
        { icon: 'menu_book',     name: 'Isadora, a Bibliotecária', lore: 'Guarda o saber de mil magos mortos em sua memória perfeita.' },
        { icon: 'bolt',          name: 'Kyren, o Impetuoso', lore: 'Mais poderoso que Valdren, mas sem controle. Uma catástrofe andando.' },
      ],
    },
    reinos: {
      lore: 'Os grandes reinos do mundo foram moldados por séculos de guerra, comércio e magia. Cada um tem sua cultura, seus deuses e suas ambições. As fronteiras mudam, mas as rivalidades são eternas.',
      powers: [
        { icon: 'castle',        name: 'Fortalezas Antigas', description: 'Construções que resistiram a séculos de cercos e magia.' },
        { icon: 'military_tech', name: 'Exércitos Disciplinados', description: 'Tropas treinadas há gerações em táticas específicas.' },
        { icon: 'swords',        name: 'Artefatos de Guerra', description: 'Cada reino possui relíquias capazes de mudar batalhas.' },
        { icon: 'public',        name: 'Alianças Políticas', description: 'Redes de tratados e segredos que conectam nações.' },
      ],
      figures: [
        { icon: 'castle',        name: 'O Imperador de Cinzas', lore: 'Governa o maior reino com punho de ferro e dragão pessoal.' },
        { icon: 'star',          name: 'Rainha Elariel',        lore: 'Elfas que mantém a paz entre humanos e elfos há 200 anos.' },
        { icon: 'military_tech', name: 'General Kross',         lore: 'Humano que conquistou três reinos em uma única campanha.' },
      ],
    },
    classes: {
      lore: 'As classes definem mais do que habilidades — definem como um herói vê o mundo. Um guerreiro resolve problemas com força; um ladino, com astúcia; um clérigo, com fé. A classe é a lente pela qual a aventura é vivida.',
      powers: [
        { icon: 'shield',        name: 'Especialização',    description: 'Cada classe domina uma área específica de combate ou habilidade.' },
        { icon: 'star',          name: 'Progressão',         description: 'Com experiência, habilidades exclusivas são desbloqueadas.' },
        { icon: 'groups',        name: 'Papel no Grupo',     description: 'Cada classe preenche uma função essencial em uma aventura.' },
        { icon: 'auto_fix_high', name: 'Multiclasse',       description: 'Combinações de classes criam personagens únicos e poderosos.' },
      ],
      figures: [
        { icon: 'shield',        name: 'Doran, o Inquebrável', lore: 'Guerreiro que sobreviveu a trinta batalhas sem nunca recuar.' },
        { icon: 'auto_fix_high', name: 'Lyren, a Arcana',     lore: 'Multiclasse que domina magia e espada com igual maestria.' },
        { icon: 'music_note',    name: 'Tavish, o Bardo',     lore: 'Sua canção motivou um exército derrotado a vencer o impossível.' },
      ],
    },
    armas: {
      lore: 'As armas mágicas não são apenas ferramentas — são legados. Cada uma tem uma história, uma vontade e às vezes um propósito que supera o de seu portador. Portá-las é assumir um destino.',
      powers: [
        { icon: 'swords',        name: 'Encantamentos',      description: 'Propriedades mágicas que vão além do dano físico normal.' },
        { icon: 'bolt',          name: 'Poder Acumulado',    description: 'Quanto mais usadas, mais poderosas algumas armas se tornam.' },
        { icon: 'psychology',    name: 'Vínculo com o Portador', description: 'Algumas armas escolhem seu dono e recusam outros.' },
        { icon: 'star',          name: 'Herança Lendária',   description: 'Cada arma lendária muda o destino de quem a empunha.' },
      ],
      figures: [
        { icon: 'swords',        name: 'Lâmina do Alvorecer', lore: 'Forjada pelos anjos caídos. Brilha diante de qualquer escuridão.' },
        { icon: 'auto_fix_high', name: 'Cajado do Arquimago', lore: 'Amplifica magia além dos limites do possível.' },
        { icon: 'menu_book',     name: 'Grimório do Lich',    lore: 'Contém segredos que deveriam ter morrido com seu autor.' },
      ],
    },
    mitologias: {
      lore: 'Os deuses moldaram o mundo e depois se retiraram — ou assim dizem os mortais. A verdade é que o panteão continua ativo, lutando guerras divinas cujos estilhaços caem sobre o mundo mortal como catástrofes.',
      powers: [
        { icon: 'flare',         name: 'Intervenção Divina', description: 'Em momentos críticos, deuses interferem diretamente.' },
        { icon: 'auto_fix_high', name: 'Bênçãos e Maldições', description: 'O favor ou ira divina muda o curso de vidas inteiras.' },
        { icon: 'psychology',    name: 'Profecias',          description: 'Visões do futuro que nunca são o que parecem.' },
        { icon: 'star',          name: 'Relíquias Sagradas', description: 'Objetos tocados por deuses carregam poder imenso.' },
      ],
      figures: [
        { icon: 'light_mode',    name: 'Aethon, o Iluminado', lore: 'Deus do sol e da justiça. Seu olho nunca fecha.' },
        { icon: 'skull',         name: 'Morrigan, a Ceifadora', lore: 'Não maligna. Apenas inevitável. Guia almas com gentileza.' },
        { icon: 'whatshot',      name: 'Valdris, o Caído',   lore: 'Deus exilado cujos seguidores anseiam pelo fim de tudo.' },
      ],
    },
    // Classes individuais
    guerreiro: {
      lore: 'O guerreiro é a pedra angular de qualquer grupo de aventureiros. Treinado desde a infância em combate corpo a corpo, ele é a linha entre a vida e a morte dos companheiros.',
      powers: [
        { icon: 'shield',        name: 'Postura de Combate', description: 'Reduz dano recebido em 2 quando em postura defensiva.' },
        { icon: 'swords',        name: 'Ataque Extra',       description: 'A partir do nível 5, ataca duas vezes por turno.' },
        { icon: 'fitness_center',name: 'Surge de Ação',      description: 'Uma vez por descanso: ação extra completa no turno.' },
        { icon: 'military_tech', name: 'Segundo Fôlego',     description: 'Recupera 1d10 + nível de pontos de vida como bônus.' },
      ],
      figures: [
        { icon: 'shield',        name: 'Doran Pedra-de-Ferro', lore: 'Guerreiro lendário que segurou um portão sozinho por três horas.' },
        { icon: 'swords',        name: 'Kira, a Lâmina Dupla', lore: 'Mestre de duas espadas que nunca perdeu um duelo.' },
        { icon: 'military_tech', name: 'Capitão Valdus',       lore: 'Veterano de cinquenta batalhas que treina os guardas reais.' },
      ],
    },
    mago: {
      lore: 'O mago dedica décadas à compreensão da teia mágica que sustenta o mundo. Ao contrário dos feiticeiros, seu poder é conquistado com disciplina, não herdado. É o mais poderoso e o mais frágil da aventura.',
      powers: [
        { icon: 'auto_fix_high', name: 'Escola Arcana',      description: 'Especialização em uma escola (Evocação, Ilusão, etc.).' },
        { icon: 'menu_book',     name: 'Grimório',            description: 'Livro de feitiços expansível ao longo da carreira.' },
        { icon: 'psychology',    name: 'Recuperação Arcana',  description: 'Recupera espaços de feitiço durante um descanso curto.' },
        { icon: 'bolt',          name: 'Maestria em Feitiços',description: 'Alguns feitiços podem ser usados sem gastar espaços.' },
      ],
      figures: [
        { icon: 'auto_fix_high', name: 'Valdren, o Arquimago', lore: 'O mago vivo mais poderoso. Vive numa torre que desafia a física.' },
        { icon: 'bolt',          name: 'Isadora, Mestra das Runas', lore: 'Inventou três novos feitiços que entram nos grimórios hoje.' },
        { icon: 'menu_book',     name: 'Kyren Caos-Vivo',    lore: 'Não sabe controlar seu poder. Cada feitiço é uma roleta.' },
      ],
    },
    ladino: {
      lore: 'O ladino entende que o mundo real funciona na penumbra dos acordos e segredos. Não é desonesto — é realista. Sabe que a sombra certa no momento certo vale mais que qualquer exército.',
      powers: [
        { icon: 'gavel',         name: 'Ataque Furtivo',     description: '+2d6 dano quando tem vantagem ou aliado adjacente ao alvo.' },
        { icon: 'sprint',        name: 'Ação Ardilosa',      description: 'Esgueirar, Desengajar ou Correr como ação bônus.' },
        { icon: 'visibility',    name: 'Sentidos Aguçados',   description: 'Vantagem em testes de Percepção e detecção de armadilhas.' },
        { icon: 'psychology',    name: 'Evasão',              description: 'Metade do dano em falhas; zero em sucesso em reflexos.' },
      ],
      figures: [
        { icon: 'gavel',         name: 'Shade, a Sem-Rosto',  lore: 'Assassina que nunca foi vista. Nem mesmo por suas vítimas.' },
        { icon: 'sprint',        name: 'Cael, o Malabarista', lore: 'Ladrão que rouba nobres e distribui para os miseráveis.' },
        { icon: 'visibility',    name: 'Mira das Sombras',    lore: 'Ex-guarda real que usa seus conhecimentos para infiltração.' },
      ],
    },
    clerigo: {
      lore: 'O clérigo não pede poder aos deuses — estabelece um canal direto com forças divinas. Seu deus fala através dele em batalha, em cura e em julgamento. É tanto guerreiro quanto profeta.',
      powers: [
        { icon: 'favorite',      name: 'Cura Divina',         description: 'Restaura pontos de vida através de imposição de mãos.' },
        { icon: 'light_mode',    name: 'Expulsar Mortos-Vivos',description: 'Mortos-vivos de CR baixo fogem ou são destruídos.' },
        { icon: 'flare',         name: 'Domínio Divino',      description: 'Habilidades especiais baseadas no domínio do seu deus.' },
        { icon: 'shield',        name: 'Armadura Divina',     description: 'Pode usar armadura pesada sem penalidade arcana.' },
      ],
      figures: [
        { icon: 'light_mode',    name: 'Sumo Sacerdote Eldar', lore: 'Curou uma cidade inteira de praga com um único ritual.' },
        { icon: 'flare',         name: 'Irmã Lyren de Aethon', lore: 'Paladina-clérigo que carrega a luz do sol em campo de batalha.' },
        { icon: 'skull',         name: 'Padre Malachar',       lore: 'Clérigo de Morrigan que serve tanto os vivos quanto os mortos.' },
      ],
    },
    ranger: {
      lore: 'O ranger é os olhos e ouvidos do grupo além dos muros da civilização. Conhece cada trilha, cada odor de perigo e cada sinal de passagem de criatura. Nos ermos, ele é a lei.',
      powers: [
        { icon: 'forest',        name: 'Inimigo Favorito',    description: 'Vantagem em rastrear e combater um tipo de criatura.' },
        { icon: 'pets',          name: 'Companheiro Animal',  description: 'Vínculo com uma criatura que age como parceiro.' },
        { icon: 'sprint',        name: 'Terreno Natural',     description: 'Ignoram terreno difícil em ambientes naturais.' },
        { icon: 'visibility',    name: 'Sentinela Primária',  description: 'Nunca surpreendidos se conscientes. Percepção passiva +5.' },
      ],
      figures: [
        { icon: 'forest',        name: 'Aelindra, Guardiã da Floresta', lore: 'Protege as Florestas de Prata há um século com seu lobo.' },
        { icon: 'pets',          name: 'Torven, o Caçador',   lore: 'Especialista em dragões. Matou três ancioões sozinho.' },
        { icon: 'visibility',    name: 'Serai, a Rastejante', lore: 'Ranger urbana que caça criminosos nas cidades como na floresta.' },
      ],
    },
    bardo: {
      lore: 'Para o bardo, a arte não é entretenimento — é magia real. Sua música move exércitos, cura feridas e quebra maldições. O universo foi criado por uma canção, e o bardo sabe partes da melodia original.',
      powers: [
        { icon: 'music_note',    name: 'Inspiração de Bardo', description: 'Adiciona 1d6 a qualquer teste aliado como reação.' },
        { icon: 'psychology',    name: 'Jack de Todos os Ofícios', description: 'Proficiência em qualquer habilidade mesmo sem treinamento.' },
        { icon: 'auto_fix_high', name: 'Magia de Bardo',      description: 'Listas de feitiços das outras classes acessíveis.' },
        { icon: 'groups',        name: 'Presença Magnética',  description: 'Vantagem em todos os testes de Persuasão e Enganação.' },
      ],
      figures: [
        { icon: 'music_note',    name: 'Tavish, o Eterno',    lore: 'Sua última canção ainda ecoa em ruínas onde não há mais ninguém.' },
        { icon: 'psychology',    name: 'Lirien, a Falsária',  lore: 'Barda que assumiu a identidade de uma duquesa por três anos.' },
        { icon: 'auto_fix_high', name: 'Corin das Cordas',    lore: 'Seu alaúde é feito de madeira da Floresta de Prata. Tem vontade própria.' },
      ],
    },
    necromante: {
      lore: 'O necromante não tem medo da morte — tem curiosidade. Sua arte é incompreendida e temida, mas nas mãos certas, pode devolver um herói caído ou destruir um exército sem uma única morte nova.',
      powers: [
        { icon: 'skull',         name: 'Animar Mortos',      description: 'Cria esquelets e zumbis que obedecem ordens permanentemente.' },
        { icon: 'dark_mode',     name: 'Falsa Vida',         description: 'Constrói reserva de pontos de vida temporários com ossos.' },
        { icon: 'auto_fix_high', name: 'Canalizar Magia Sombria', description: 'Feitiços de necromancia ignoram resistência a dano.' },
        { icon: 'psychology',    name: 'Dominar Morto-Vivo', description: 'Assume controle de mortos-vivos criados por outros.' },
      ],
      figures: [
        { icon: 'skull',         name: 'Malachar Lich-Ancião', lore: 'O mais poderoso necromante vivo — ou não-vivo.' },
        { icon: 'dark_mode',     name: 'Seraphine das Cinzas', lore: 'Usa seus exércitos mortos para proteger aldeias dos vivos.' },
        { icon: 'auto_fix_high', name: 'Drak, o Estudante',   lore: 'Jovem necromante que ressuscitou seu cão por acidente e nunca mais parou.' },
      ],
    },
    paladino: {
      lore: 'O paladino não apenas serve um deus — ele é a manifestação física do juramento feito. Esse juramento é mais poderoso que qualquer feitiço: romper um juramento destroça um paladino por dentro.',
      powers: [
        { icon: 'light_mode',    name: 'Smite Divino',       description: '+2d8 dano radiante ao gastar um espaço de feitiço no golpe.' },
        { icon: 'favorite',      name: 'Imposição de Mãos',  description: 'Pool de cura de 5×nível que pode ser distribuída livremente.' },
        { icon: 'shield',        name: 'Aura de Proteção',   description: '+carisma em todos os saving throws de aliados adjacentes.' },
        { icon: 'flare',         name: 'Juramento Sagrado',  description: 'Poderes exclusivos do juramento escolhido no nível 3.' },
      ],
      figures: [
        { icon: 'light_mode',    name: 'Varian, Campeão de Aethon', lore: 'Derrotou um Lich sozinho empunhando apenas sua fé.' },
        { icon: 'shield',        name: 'Bruna, a Inquebrável',      lore: 'Paladina que protegeu uma cidade por 30 anos sem descanso.' },
        { icon: 'skull',         name: 'Malachar o Caído',          lore: 'Paladino que quebrou seu juramento e tornou-se antipaladino.' },
      ],
    },
  };

  private creatures: BestiaryCreature[] = [
    { id: 'skeleton',    name: 'Esqueleto Guerreiro',   level: 'comum',    imageUrl: 'assets/images/rpg/criatura_skeleton.jpg', description: 'Restos animados de guerreiros caídos em batalhas esquecidas. Obedecem apenas à vontade de seu criador necromante.', weaknesses: ['Fogo sagrado', 'Magia Divina', 'Impacto físico forte'], tactics: ['Atacam em grupo', 'Não sentem dor', 'Não sentem medo', 'Estratégia de cerco'], xp: 50 },
    { id: 'wraith',      name: 'Fantasma Sombrio',      level: 'raro',     imageUrl: 'assets/images/rpg/criatura_wraith.jpg', description: 'Espíritos atormentados presos entre o mundo dos vivos e dos mortos. Nutrem ódio eterno pelos que ainda vivem.', weaknesses: ['Prata abençoada', 'Luz sagrada', 'Exorcismo divino'], tactics: ['Atravessam paredes', 'Drenam força vital', 'Invisíveis na escuridão'], xp: 350 },
    { id: 'zombie',      name: 'Zumbi Devastador',      level: 'comum',    imageUrl: 'assets/images/rpg/criatura_zombie.jpg', description: 'Cadáveres reanimados por magia sombria. Lentos porém incansáveis, buscam carne viva sem cessar.', weaknesses: ['Fogo', 'Decapitação', 'Magia da Luz'], tactics: ['Atacam em hordas', 'Resistentes a danos', 'Propagam maldição'], xp: 100 },
    { id: 'lich',        name: 'Lich Ancestral',        level: 'lendário', imageUrl: 'assets/images/rpg/criatura_lich.jpg', description: 'Feiticeiro que transcendeu a morte através de rituais proibidos. Seu phylactery guarda sua essência imortal.', weaknesses: ['Destruir o Phylactery', 'Magia Divina de alto nível'], tactics: ['Controla exércitos de mortos-vivos', 'Lança feitiços de 9ª ordem', 'Imortal até o phylactery ser destruído'], xp: 10000 },
    { id: 'dragon-black',name: 'Dragão Negro Ancião',   level: 'lendário', imageUrl: 'assets/images/rpg/criatura_dragon_black.jpg', description: 'O mais traiçoeiro dos dragões cromáticos. Habita pântanos e ruínas, cuspindo ácido que dissolve qualquer metal.', weaknesses: ['Magia arcana de alto nível', 'Armas lendárias rúnicas'], tactics: ['Ataque de ácido em área', 'Voo rasante', 'Emboscadas nas sombras', 'Paralisia com terror'], xp: 15000 },
    { id: 'minotaur',    name: 'Minotauro do Labirinto',level: 'épico',    imageUrl: 'assets/images/rpg/criatura_minotaur.jpg', description: 'Guardião eterno de labirintos esquecidos. Metade homem, metade touro — completamente aterrorizante.', weaknesses: ['Fogo', 'Armadilhas', 'Arqueiros com posição elevada'], tactics: ['Carga devastadora', 'Memória perfeita do labirinto', 'Resistência sobre-humana'], xp: 2500 },
    { id: 'banshee',     name: 'Banshee das Ruínas',    level: 'raro',     imageUrl: 'assets/images/rpg/criatura_banshee.jpg', description: 'Espírito de uma nobre trágica, seu grito pode paralisar os mais bravos guerreiros com terror puro.', weaknesses: ['Prata', 'Luz do Sol', 'Canto de bardo sagrado'], tactics: ['Grito da morte', 'Invulnerável a armas normais', 'Drena força de vontade'], xp: 750 },
    { id: 'golem-iron',  name: 'Golem de Ferro',        level: 'épico',    imageUrl: 'assets/images/rpg/criatura_golem_iron.jpg', description: 'Construto mágico forjado por mestres ferreiros e animado por runas ancestrais. Implacável executor de ordens.', weaknesses: ['Relâmpago (interfere nas runas)', 'Ácido', 'Magia antimagia'], tactics: ['Imune a feitiços de baixo nível', 'Força colossal', 'Não cansa, não sente dor'], xp: 3000 },
    { id: 'vampire-lord',name: 'Senhor Vampiro',        level: 'épico',    imageUrl: 'assets/images/rpg/criatura_vampire_lord.jpg', description: 'Vampiro ancião que governa cidades inteiras sem que seus habitantes saibam que são gado. Político e predador em igual medida.', weaknesses: ['Luz do sol', 'Prata abençoada', 'Estaca no coração', 'Água benta'], tactics: ['Hipnose em massa', 'Exército de lacaios', 'Foge antes de ser destruído', 'Negocia antes de atacar'], xp: 5000 },
    { id: 'werewolf',    name: 'Lobisomem Alfa',        level: 'raro',     imageUrl: 'assets/images/rpg/criatura_werewolf.jpg', description: 'Líder de matilha que controla a transformação com esforço. Em lua cheia, a besta vence sempre. Sua mordida cria novos lobisomens.', weaknesses: ['Prata', 'Fogo', 'Magia da Lua (irônico)'], tactics: ['Transforma aliados em lobisomens', 'Ataca à noite', 'Foge ferido para regenerar'], xp: 1800 },
    { id: 'goblin-king', name: 'Rei Goblin',            level: 'incomum',  imageUrl: 'assets/images/rpg/criatura_goblin_king.jpg', description: 'Goblin que sobreviveu o suficiente para acumular inteligência e recursos. Governa hordas com armadilhas e terror.', weaknesses: ['Destruir seus subordinados', 'Fogo (destrói armadilhas)', 'Magia de encantamento'], tactics: ['Nunca luta sozinho', 'Usa armadilhas elaboradas', 'Foge e reorganiza'], xp: 450 },
    { id: 'troll-frost', name: 'Troll das Neves',       level: 'incomum',  imageUrl: 'assets/images/rpg/criatura_troll_frost.jpg', description: 'Variante de troll adaptada ao frio extremo. Sua regeneração é ainda mais rápida em temperaturas negativas.', weaknesses: ['Fogo', 'Ácido', 'Calor extremo (desacelera a regeneração)'], tactics: ['Embosca em nevascas', 'Regenera em combate', 'Ataca infraestrutura antes de pessoas'], xp: 600 },
  ];

  private treasures: Treasure[] = [
    { id: 'dawn-blade',        name: 'Lâmina do Alvorecer',   rarity: 'lendário', imageUrl: 'assets/images/rpg/tesouro_dawn_blade.jpg', description: 'Espada sagrada forjada pelos anjos caídos no fogo primordial. Brilha intensamente diante da escuridão e males sobrenaturais.', power: '+3d6 dano radiante contra mortos-vivos e demônios; emite luz de 20m', origin: 'Templo dos Anjos Caídos — Montanhas Sagradas' },
    { id: 'amuleto-protecao',  name: 'Amuleto de Proteção',   rarity: 'raro',     imageUrl: 'assets/images/rpg/tesouro_amuleto_protecao.jpg', description: 'Medalhão de obsidiana gravado com runas antigas pelos anões das Montanhas Sombrias. Absorve maldições antes de atingir o portador.', power: '+2 CA, resistência a venenos e maldições; negação de crítico 1x/dia', origin: 'Forjas Subterrâneas dos Anões' },
    { id: 'staff-arcane',      name: 'Cajado do Arquimago',   rarity: 'épico',    imageUrl: 'assets/images/rpg/tesouro_staff_arcane.jpg', description: 'Cajado de madeira de Yggdrasil, imbuído com a essência de três arcanos primordiais. Cada uso deixa marcas rúnicas permanentes no portador.', power: '+4 ao modificador de magia; um feitiço extra por dia de nível 5 ou inferior', origin: 'Torre do Arquimago Valdren — Pico da Tempestade' },
    { id: 'ring-shadows',      name: 'Anel das Sombras',      rarity: 'incomum',  imageUrl: 'assets/images/rpg/tesouro_ring_shadows.jpg', description: 'Anel de ônix que tece sombras ao redor do portador, tornando-o quase invisível na escuridão absoluta.', power: 'Vantagem em Furtividade no escuro; +1d4 dano furtivo; invisibilidade em escuridão total 1x/dia', origin: 'Guildas de Assassinos das Cidades Sombrias' },
    { id: 'boots-speed',       name: 'Botas da Velocidade',   rarity: 'incomum',  imageUrl: 'assets/images/rpg/tesouro_boots_speed.jpg', description: 'Botas de couro élfico encantadas com magia de deslocamento pelos Elfos Lunares das Florestas de Prata.', power: '+10 pés de movimento; Dash como ação bônus; não deixa rastros em terreno natural', origin: 'Ateliês Élficos das Florestas de Prata' },
    { id: 'grimoire-lich',     name: 'Grimório do Lich',      rarity: 'lendário', imageUrl: 'assets/images/rpg/tesouro_grimoire_lich.jpg', description: 'Tomo encadernado em pele de demônio contendo segredos que deveriam permanecer esquecidos para sempre. Corrompe vagarosamente seu portador.', power: 'Acesso a feitiços de 9ª ordem; rituais proibidos; +5 a verificações de Arcano', origin: 'Tumba do Lich Malachar — Catacumbas do Fim' },
    { id: 'crown-ancients',    name: 'Coroa dos Anciãos',     rarity: 'lendário', imageUrl: 'assets/images/rpg/tesouro_crown_ancients.jpg', description: 'Coroa forjada antes dos impérios. Quem a porta comanda lealdade instintiva de todos os humanoides no raio de 30m.', power: 'Charme em área; +6 Carisma; imunidade a medo e encantamento; fala todos os idiomas', origin: 'Trono do Primeiro Rei — Ruínas do Império Primordial' },
    { id: 'shield-titan',      name: 'Escudo do Titã',        rarity: 'épico',    imageUrl: 'assets/images/rpg/tesouro_shield_titan.jpg', description: 'Escudo colossal forjado com metal de meteoro. Sua runas brilham quando detectam ataques vindouros.', power: '+3 CA; reduz dano de área pela metade; 1x/dia: negação total de um ataque; bash stun em CC', origin: 'Forjas Vulcânicas do Império de Cinzas' },
    { id: 'bow-starfall',      name: 'Arco da Queda Estelar', rarity: 'raro',     imageUrl: 'assets/images/rpg/tesouro_bow_starfall.jpg', description: 'Arco de madeira de Yggdrasil com corda de cabelo de elfa lunar. Suas flechas criam rastros de luz e sempre encontram fraquezas.', power: '+2 ataque e dano; ignora cobertura; flechas mágicas não precisam ser especiais; guia flechas 30°', origin: 'Arqueiros Lunares das Florestas de Prata' },
    { id: 'potion-dragon',     name: 'Poção do Sangue do Dragão', rarity: 'raro', imageUrl: 'assets/images/rpg/tesouro_potion_dragon.jpg', description: 'Elaborada com uma gota de sangue de dragão vermelho e ervas mágicas raras. Quem bebe sente fogo percorrer as veias por horas.', power: 'Resistência a fogo; +4 Força; +2d6 dano em corpo a corpo; duração 1 hora', origin: 'Alquimistas do Império de Cinzas' },
  ];

  private regions: Region[] = [
    { id: 'imperio-cinzas', name: 'O Império de Cinzas',    type: 'Vulcânico', imageUrl: 'assets/images/rpg/regiao_imperio_cinzas.jpg', description: 'Reino forjado em lava e aço, governado por um imperador que domou um dragão vermelho. As forjas jamais se apagam e o céu raramente está limpo de fumaça.', inhabitants: ['Orcs de Sangue', 'Salamandras Forjadoras', 'Draconatos', 'Mercenários do Sul'] },
    { id: 'florestas-prata', name: 'As Florestas de Prata',  type: 'Místico',   imageUrl: 'assets/images/rpg/regiao_florestas_prata.jpg', description: 'Domínio élfico onde o tempo flui como mercúrio e as árvores cantam memórias dos séculos. Estranhos perdem-se facilmente — não apenas no espaço, mas no tempo.', inhabitants: ['Elfos Lunares', 'Dríades', 'Fadas Antigas', 'Unicórnios'] },
    { id: 'pantano-eterno',  name: 'O Pântano Eterno',       type: 'Sombrio',   imageUrl: 'assets/images/rpg/regiao_pantano_eterno.jpg', description: 'Terras alagadas e envenenadas onde o sol nunca brilha completamente. O ar é pesado com podridão e magia das trevas. Apenas o desesperado ou o poderoso vive aqui.', inhabitants: ['Dragões Negros', 'Liches Exilados', 'Cobras Venenosas Gigantes', 'Cultistas das Trevas'] },
    { id: 'cidade-livre',    name: 'Thalaris, a Cidade Livre',type: 'Urbano',   imageUrl: 'assets/images/rpg/regiao_cidade_livre.jpg', description: 'Metrópole sem leis rígidas onde aventureiros, mercadores e criminosos coexistem num equilíbrio precário. A única lei real é o ouro.', inhabitants: ['Humanos', 'Meio-Elfos', 'Guildas de Ladrões', 'Mercadores de todo o mundo'] },
  ];

  private deities: Deity[] = [
    { id: 'kael',     name: 'Kael, o Forjador',       domain: 'Guerra & Ferro',       imageUrl: 'assets/images/rpg/deidade_kael.jpg', description: 'Deus da forja e da guerra justa. Seus seguidores são guerreiros e ferreiros que buscam perfeição no aço. Abomina covardia mas respeita inimigos honrados.', alignment: 'Neutro' },
    { id: 'sylvara',  name: 'Sylvara, a Sussurrante',  domain: 'Natureza & Lua',       imageUrl: 'assets/images/rpg/deidade_sylvara.jpg', description: 'Deusa da lua e da natureza selvagem. Protetora dos elfos e de todas as criaturas da floresta. Seu favor é inconstante como a lua — ora cheia, ora ausente.', alignment: 'Bondoso' },
    { id: 'morrigan', name: 'Morrigan, a Ceifadora',   domain: 'Morte & Destino',      imageUrl: 'assets/images/rpg/deidade_morrigan.jpg', description: 'Senhora da morte e do destino. Não maligna, apenas inevitável — ela guia as almas para o além com gentileza que os vivos raramente entendem.', alignment: 'Neutro' },
    { id: 'valdris',  name: 'Valdris, o Caído',        domain: 'Caos & Destruição',    imageUrl: 'assets/images/rpg/deidade_valdris.jpg', description: 'Deus exilado que desafiou o panteão e foi corrompido pelo vazio entre os planos. Seus seguidores anseiam pelo fim de todas as coisas como forma de novo começo.', alignment: 'Caótico Maligno' },
    { id: 'aethon',   name: 'Aethon, o Iluminado',     domain: 'Luz & Justiça',        imageUrl: 'assets/images/rpg/deidade_aethon.jpg', description: 'Deus do sol e da ordem divina. Paladinos e clérigos juramentados carregam sua luz como escudo contra as trevas. Seu olho nunca fecha — vê tudo.', alignment: 'Leal Bondoso' },
  ];

  getCategories()           { return this.categories; }
  getCategoryById(id: string) { return this.categories.find(c => c.id === id); }
  getCategoryDetail(id: string) { return this.categoryDetails[id]; }

  getBestiaryCreatures()    { return this.creatures; }
  getCreatureById(id: string) { return this.creatures.find(c => c.id === id); }

  getTreasures()            { return this.treasures; }
  getTreasureById(id: string) { return this.treasures.find(t => t.id === id); }

  getRegions()              { return this.regions; }
  getRegionById(id: string) { return this.regions.find(r => r.id === id); }

  getDeities()              { return this.deities; }
  getDeityById(id: string)  { return this.deities.find(d => d.id === id); }
}
