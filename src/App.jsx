import React, { useState, useMemo } from 'react';
import { 
  Search, Leaf, Moon, Zap, Activity, Heart, Wind, 
  Droplets, Info, X, ChevronRight, Instagram, 
  MessageCircle, Droplet, AlertCircle, Sparkles, BookOpen, Microscope, Thermometer
} from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedHerb, setSelectedHerb] = useState(null);

  const logoUrl = "/logo.png";
  const bgUrl = "/bg.jpg";

  const categories = [
    { name: 'Todas', icon: <Leaf size={16} /> },
    { name: 'Relaxamento', icon: <Moon size={16} /> },
    { name: 'Digestão', icon: <Activity size={16} /> },
    { name: 'Articulações', icon: <Heart size={16} /> },
    { name: 'Energia', icon: <Zap size={16} /> },
    { name: 'Respiratório', icon: <Wind size={16} /> },
    { name: 'Limpeza', icon: <Droplets size={16} /> }
  ];

  const herbsData = [
    { name: 'Lavanda', scientific: 'Lavandula angustifolia', cat: 'Relaxamento', energy: 'Aterra pensamentos acelerados e acalma o espírito agitado.', action: 'Sedativo leve e relaxante muscular.', indications: 'Ansiedade, insônia e tensões.', usage: 'Uso noturno ou em momentos de pico de estresse.', research: 'Linalol e acetato de linalila atuam no sistema nervoso central.', highlights: 'Macerada a frio para preservar óleos essenciais.', cautions: 'Geralmente segura.' },
    { name: 'Alecrim', scientific: 'Salvia rosmarinus', cat: 'Energia', energy: 'Erva da alegria; limpa a aura e traz vitalidade solar.', action: 'Estimulante circulatório e cerebral.', indications: 'Cansaço mental e falta de foco.', usage: 'Ingerir pela manhã.', research: 'Ácido rosmarínico melhora o desempenho cognitivo.', highlights: 'Processamento ultra-rápido para manter o frescor.', cautions: 'Evitar em hipertensos.' },
    { name: 'Manjericão', scientific: 'Ocimum basilicum', cat: 'Relaxamento', energy: 'Harmoniza o campo vibracional e traz paz espiritual.', action: 'Antiespasmódico e equilibrador nervoso.', indications: 'Estresse e espasmos digestivos.', usage: 'Uso diário para equilíbrio.', research: 'Rico em linalol e eugenol.', highlights: 'Folhas colhidas no auge da vitalidade.', cautions: 'Uso moderado.' },
    { name: 'Erva Doce', scientific: 'Pimpinella anisum', cat: 'Digestão', energy: 'Promove a leveza e a doçura nas relações.', action: 'Carminativo e redutor de gases.', indications: 'Inchaço e cólicas.', usage: 'Pós-refeições.', research: 'Anetol facilita o esvaziamento gástrico.', highlights: 'Sementes selecionadas com alto teor de óleos.', cautions: 'Segura para a maioria.' },
    { name: 'Cidreira', scientific: 'Melissa officinalis', cat: 'Relaxamento', energy: 'Restaura a paz interior e a alegria de viver.', action: 'Sedativo suave e antiviral.', indications: 'Ansiedade leve e herpes.', usage: 'Tarde ou noite.', research: 'Ácido rosmarínico possui propriedades ansiolíticas comprovadas.', highlights: 'Folhas colhidas ao amanhecer.', cautions: 'Hipotireoidismo.' },
    { name: 'Valeriana', scientific: 'Valeriana officinalis', cat: 'Relaxamento', energy: 'Equilíbrio emocional profundo e centramento. Acalma o pensamento acelerado.', action: 'Auxilia como relaxante corporal e indutor do sono, considerada uma erva potente para o relaxamento físico muscular.', indications: 'Insônia severa, ansiedade e pânico. Dificuldades para dormir. Dores e tensão muscular', usage: '30 a 60 minutos antes de dormir, evitar o consumo em momentos que demandam atenção e reflexos.', research: 'Interage com receptores GABA-A.', highlights: 'Extração da raiz madura.', cautions: 'Pode causar sonolência residual pela manhã. Evitar o uso com álcool ou outros sedativos químicos. Evitar o uso antes de atividades que demandam atenção e reflexos, como dirigir ou operar maquinário.' },
    { name: 'Uxi Amarelo', scientific: 'Endopleura uchi', cat: 'Limpeza', energy: 'Limpeza de memórias ancestrais uterinas.', action: 'Anti-inflamatório uterino.', indications: 'Miomas e cistos.', usage: 'Protocolos de saúde feminina.', research: 'Bergenina possui ação anti-inflamatória pélvica.', highlights: 'Casca extraída de forma sustentável.', cautions: 'Evitar na gestação.' },
    { name: 'Aranto', scientific: 'Kalanchoe daigremontiana', cat: 'Limpeza', energy: 'Transmutação de padrões densos e renascimento.', action: 'Regenerador celular.', indications: 'Inflamações severas.', usage: 'Uso pontual.', research: 'Bufadienoldeos em estudo para oncologia.', highlights: 'Cultivo biológico próprio.', cautions: 'Respeitar dose rigorosa.' },
    { name: 'Gengibre', scientific: 'Zingiber officinale', cat: 'Energia', energy: 'Desperta o fogo interior e a coragem.', action: 'Termogênico e anti-inflamatório.', indications: 'Náuseas e dores musculares.', usage: 'Manhã ou pré-treino.', research: 'Gingeróis bloqueiam prostaglandinas inflamatórias.', highlights: 'Rizomas orgânicos macerados frescos.', cautions: 'Gastrite aguda.' },
    { name: 'Louro', scientific: 'Laurus nobilis', cat: 'Digestão', energy: 'Vibração de vitória e proteção.', action: 'Estimulante digestivo.', indications: 'Gases e digestão lenta.', usage: 'Almoço.', research: 'Cineol auxilia na quebra de gorduras.', highlights: 'Folhas selecionadas manualmente.', cautions: 'Gestantes moderar.' },
    { name: 'Artemísia', scientific: 'Artemisia vulgaris', cat: 'Limpeza', energy: 'Conexão com a força feminina e intuição.', action: 'Reguladora menstrual.', indications: 'Cólicas e amenorreia.', usage: 'Fase pré-menstrual.', research: 'Lactonas sesquiterpênicas atuam no útero.', highlights: 'Colheita sob influência lunar.', cautions: 'PROIBIDO na gestação.' },
    { name: 'Nó de Cachorro', scientific: 'Heteropterys aphrodisiaca', cat: 'Energia', energy: 'Resiliência e força de sustentação.', action: 'Tônico neuromuscular.', indications: 'Fraqueza física.', usage: 'Período diurno.', research: 'Ação adaptógena em estudo.', highlights: 'Raiz do cerrado de alta pureza.', cautions: 'Evitar à noite.' },
    { name: 'Canela', scientific: 'Cinnamomum zeylanicum', cat: 'Energia', energy: 'Aquece a alma e atrai prosperidade.', action: 'Termogênico e circulatório.', indications: 'Controle glicêmico.', usage: 'Dia.', research: 'Melhora a sensibilidade à insulina.', highlights: 'Cascas de manejo sustentável.', cautions: 'Gestantes evitar.' },
    { name: 'Cravo', scientific: 'Syzygium aromaticum', cat: 'Energia', energy: 'Limpeza de miasmas e proteção espiritual.', action: 'Antisséptico e analgésico.', indications: 'Dores leves.', usage: 'Limpeza energética.', research: 'Eugenol é um potente antimicrobiano.', highlights: 'Alta carga de ativos preservada.', cautions: 'Uso diluído.' },
    { name: 'Cavalinha', scientific: 'Equisetum arvense', cat: 'Articulações', energy: 'Estrutura, foco e integridade.', action: 'Remineralizante e diurético.', indications: 'Retenção e saúde óssea.', usage: 'Manhã.', research: 'Riquíssima em sílica biodisponível.', highlights: 'Extração focada em minerais.', cautions: 'Fazer pausas no uso.' },
    { name: 'Anis Estrelado', scientific: 'Illicium verum', cat: 'Digestão', energy: 'Escudo de proteção e clareza.', action: 'Combate a fermentação intestinal.', indications: 'Inchaço.', usage: 'Pós-refeição.', research: 'Ácido chiquímico presente.', highlights: 'Estrela botânica equilibrada.', cautions: 'Geralmente segura.' },
    { name: 'Hortelã', scientific: 'Mentha piperita', cat: 'Digestão', energy: 'Limpeza mental e renovação.', action: 'Relaxante gastrointestinal.', indications: 'Gases e náuseas.', usage: 'Tarde.', research: 'Mentol relaxa músculo liso.', highlights: 'Folhas frescas preservadas.', cautions: 'Lactantes moderar.' },
    { name: 'Boldo', scientific: 'Peumus boldus', cat: 'Digestão', energy: 'Limpeza de resíduos energéticos estagnados.', action: 'Hepatoprotetor e colagogo.', indications: 'Má digestão.', usage: 'Jejum.', research: 'Boldina estimula secreção biliar.', highlights: 'Maceração de 28 dias.', cautions: 'Cálculos biliares.' },
    { name: 'Folha de Café', scientific: 'Coffea arabica', cat: 'Energia', energy: 'Prontidão e foco no presente.', action: 'Antioxidante leve.', indications: 'Fadiga.', usage: 'Manhã.', research: 'Ácidos clorogênicos presentes.', highlights: 'Equilíbrio cafeico sutil.', cautions: 'Sensibilidade à cafeína.' },
    { name: 'Folha Laranja', scientific: 'Citrus sinensis', cat: 'Relaxamento', energy: 'Alegria e doçura solar.', action: 'Calmante suave.', indications: 'Ansiedade.', usage: 'Dia.', research: 'Flavonoides cítricos relaxantes.', highlights: 'Sinergia com óleos da casca.', cautions: 'Geralmente segura.' },
    { name: 'Flor Laranja', scientific: 'Citrus aurantium', cat: 'Relaxamento', energy: 'Pureza para descanso tranquilo.', action: 'Sedativo suave.', indications: 'Insônia leve.', usage: 'Noite.', research: 'Linalol aromático.', highlights: 'Colheita manual de pétalas.', cautions: 'Uso infantil seguro.' },
    { name: 'Erva Baleeira', scientific: 'Cordia curassavica', cat: 'Articulações', energy: 'Regeneração e resistência física.', action: 'Anti-inflamatório articular.', indications: 'Tendinites e dores.', usage: 'Sistêmico.', research: 'Alfa-humuleno comprovado.', highlights: 'Extração potente em álcool.', cautions: 'Segura.' },
    { name: 'Sálvia', scientific: 'Salvia officinalis', cat: 'Limpeza', energy: 'Sabedoria ancestral e purificação.', action: 'Regulador hormonal.', indications: 'Menopausa e aftas.', usage: 'Climatério.', research: 'Efeito estrogênico leve.', highlights: 'Colheita no auge botânico.', cautions: 'Seca o leite.' },
    { name: 'Folha Goiaba', scientific: 'Psidium guajava', cat: 'Limpeza', energy: 'Cura de feridas emocionais antigas.', action: 'Adstringente e antisséptica.', indications: 'Saúde íntima.', usage: 'Uso externo ou interno.', research: 'Rica em taninos.', highlights: 'Folhas jovens selecionadas.', cautions: 'Constipação.' },
    { name: 'Canela de Velho', scientific: 'Miconia albicans', cat: 'Articulações', energy: 'Flexibilidade e resiliência.', action: 'Analgésico articular.', indications: 'Artrose e artrite.', usage: 'Uso contínuo.', research: 'Flavonoides bloqueiam dor.', highlights: 'Erva símbolo da Mieró.', cautions: 'Segura.' },
    { name: 'Ginseng', scientific: 'Panax ginseng', cat: 'Energia', energy: 'Vitalidade e renovação vital.', action: 'Adaptógeno.', indications: 'Esgotamento.', usage: 'Manhã.', research: 'Ginsenosídeos equilibram stress.', highlights: 'Raízes maduras.', cautions: 'Monitorar pressão.' },
    { name: 'Flor Jasmim', scientific: 'Jasminum officinale', cat: 'Relaxamento', energy: 'Amor próprio e beleza interior.', action: 'Antidepressivo leve.', indications: 'Tristeza.', usage: 'Tarde.', research: 'Ação olfativa e sistêmica.', highlights: 'Aroma e energia preservados.', cautions: 'Relaxante.' },
    { name: 'Casca Limão', scientific: 'Citrus limon', cat: 'Digestão', energy: 'Clareza solar e purificação.', action: 'Alcalinizante.', indications: 'Azia.', usage: 'Manhã.', research: 'Limoneno desintoxicante.', highlights: 'Apenas a parte ativa da casca.', cautions: 'Não sair ao sol.' },
    { name: 'Casca Laranja', scientific: 'Citrus sinensis', cat: 'Digestão', energy: 'Expansão da alegria vital.', action: 'Carminativo.', indications: 'Digestão lenta.', usage: 'Pós-almoço.', research: 'Óleos voláteis digestivos.', highlights: 'Desintoxicação suave.', cautions: 'Segura.' },
    { name: 'Catuaba', scientific: 'Anemopaegma arvense', cat: 'Energia', energy: 'Coragem e vigor instintivo.', action: 'Tônico do sistema nervoso.', indications: 'Baixa libido.', usage: 'Dia.', research: 'Alcaloides estimulantes.', highlights: 'Extração da casca verdadeira.', cautions: 'Ansiedade.' },
    { name: 'Pulmonária', scientific: 'Pulmonaria officinalis', cat: 'Respiratório', energy: 'Respiro vital e liberdade.', action: 'Mucolítico.', indications: 'Rouquidão.', usage: 'Episódico.', research: 'Saponinas suavizantes.', highlights: 'Aliada dos profissionais da voz.', cautions: 'Curto prazo.' },
    { name: 'Folha Pitanga', scientific: 'Eugenia uniflora', cat: 'Limpeza', energy: 'Renovação e alegria.', action: 'Hipotensor suave.', indications: 'Pressão leve.', usage: 'Dia.', research: 'Flavonoides diuréticos.', highlights: 'Brilho fitoquímico.', cautions: 'Monitorar pressão.' },
    { name: 'Picão Preto', scientific: 'Bidens pilosa', cat: 'Respiratório', energy: 'Limpeza de miasmas externos.', action: 'Modulador imune.', indications: 'Alergias.', usage: 'Sazonal.', research: 'Ação anti-histamínica natural.', highlights: 'Silvestre e potente.', cautions: 'Segura.' },
    { name: 'Guaco', scientific: 'Mikania glomerata', cat: 'Respiratório', energy: 'Liberação de mágoas guardadas.', action: 'Expectorante.', indications: 'Tosse.', usage: 'A demanda.', research: 'Cumarina relaxa brônquios.', highlights: 'Folhas frescas maceradas.', cautions: 'Anticoagulantes.' },
    { name: 'Marmelo', scientific: 'Cydonia oblonga', cat: 'Digestão', energy: 'Contenção e foco.', action: 'Protetor intestinal.', indications: 'Fluxo irregular.', usage: 'Digestivo.', research: 'Pectinas reguladoras.', highlights: 'Extração artesanal.', cautions: 'Constipação.' },
    { name: 'Losna', scientific: 'Artemisia absinthium', cat: 'Digestão', energy: 'Enfrentar verdades necessárias.', action: 'Estimulante amargo.', indications: 'Parasitas.', usage: 'Curto prazo.', research: 'Absintina estimula bílis.', highlights: 'A "Mãe das Ervas".', cautions: 'Uso breve.' },
    { name: 'Mulungu', scientific: 'Erythrina mulungu', cat: 'Relaxamento', energy: 'Acolhimento da Mãe Terra.', action: 'Calmante central.', indications: 'Agitação severa.', usage: 'Noite.', research: 'Eritravina relaxante.', highlights: 'Casca colhida com respeito.', cautions: 'Evitar dirigir.' },
    { name: 'Pata de Vaca', scientific: 'Bauhinia forficata', cat: 'Limpeza', energy: 'Equilíbrio entre dar e receber.', action: 'Hipoglicemiante.', indications: 'Glicose alta.', usage: 'Dia.', research: 'Kaempferitrina equilibrante.', highlights: 'Folha "pé" de caminhar.', cautions: 'Diabéticos monitorar.' },
    { name: 'Chapéu de Couro', scientific: 'Echinodorus macrophyllus', cat: 'Articulações', energy: 'Estrutura e autodefesa.', action: 'Depurativo úrico.', indications: 'Gota e rins.', usage: 'Diário.', research: 'Limpador renal potente.', highlights: 'Erva de limpeza profunda.', cautions: 'Beber água.' },
    { name: 'Dente de Leão', scientific: 'Taraxacum officinale', cat: 'Limpeza', energy: 'Adaptação e persistência.', action: 'Detox hepático.', indications: 'Saúde da pele.', usage: 'Jejum.', research: 'Taraxacina depurativa.', highlights: 'Planta integral usada.', cautions: 'Cálculos biliar.' },
    { name: 'Ginkgo Biloba', scientific: 'Ginkgo biloba', cat: 'Energia', energy: 'Sabedoria do tempo e memória espiritual.', action: 'Neuroprotetor.', indications: 'Zumbido e foco.', usage: 'Manhã.', research: 'Melhora oxigenação cerebral.', highlights: 'Fóssil vivo em gotas.', cautions: 'Anticoagulantes.' },
    { name: 'Espinheira Santa', scientific: 'Maytenus ilicifolia', cat: 'Digestão', energy: 'Proteção contra energias corrosivas.', action: 'Cicatrizante gástrico.', indications: 'Gastrite.', usage: 'Pré-refeição.', research: 'Polifenóis protetores.', highlights: 'Aliada do estômago.', cautions: 'Lactantes.' }
  ];

  const filteredHerbs = useMemo(() => {
    return herbsData.filter(herb => {
      const matchesSearch = 
        herb.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        herb.scientific.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todas' || herb.cat === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div 
      className="min-h-screen pb-24 font-inter text-[#132501] bg-cover bg-fixed bg-center" 
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      {/* Overlay de legibilidade */}
      <div className="fixed inset-0 bg-[#DFD5BD]/40 pointer-events-none"></div>

      {/* Header com Logo */}
      <header className="relative bg-[#132501]/95 backdrop-blur-md text-[#DFD5BD] p-10 text-center shadow-2xl flex flex-col items-center">
        <div className="w-full max-w-[180px] mb-4">
          <img src={logoUrl} alt="Mieró Logomarca" className="w-full h-auto" />
        </div>
        <p className="text-[9px] font-bold uppercase tracking-[0.5em] opacity-50">Saber Ancestral • Ciência Botânica</p>
      </header>

      <main className="relative max-w-5xl mx-auto px-6 -mt-8">
        
        {/* Intro Card */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-[3rem] p-12 shadow-2xl border border-[#2C4001]/10 mb-12 text-center">
          <p className="text-[#2C4001] text-xl font-light italic leading-relaxed max-w-2xl mx-auto">
            "Exploramos a conexão entre o saber das ervas e o campo sutil, fundamentando nossa alquimia em estudos científicos e resultados físicos."
          </p>
        </div>

        {/* Busca e Filtros */}
        <div className="sticky top-6 z-40 space-y-4 mb-16">
          <div className="relative shadow-2xl rounded-[1.8rem] overflow-hidden group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#2C4001]/40 transition-colors" size={22} />
            <input 
              type="text" 
              placeholder="Pesquisar por erva ou benefício..."
              className="w-full pl-16 pr-8 py-7 bg-white/95 backdrop-blur-md border-none focus:ring-0 transition-all text-[#132501] text-xl placeholder:text-[#132501]/30 font-light"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex overflow-x-auto gap-3 no-scrollbar py-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-8 py-4 rounded-[1.2rem] whitespace-nowrap transition-all text-xs font-black tracking-widest shadow-sm ${
                  selectedCategory === cat.name 
                  ? 'bg-[#132501] text-[#DFD5BD] scale-105 shadow-xl' 
                  : 'bg-white/80 text-[#132501] hover:bg-white border border-[#132501]/5'
                }`}
              >
                {cat.icon}
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Ervas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredHerbs.map((herb, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedHerb(herb)}
              className="group bg-white/60 backdrop-blur-lg p-10 rounded-[2.5rem] shadow-sm border border-transparent hover:border-[#3F5902]/30 cursor-pointer transition-all active:scale-[0.98] flex flex-col justify-between hover:bg-white"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-3xl font-black text-[#132501] tracking-tight">{herb.name}</h3>
                  <div className="w-10 h-10 rounded-full bg-[#DFD5BD]/30 flex items-center justify-center text-[#2C4001] group-hover:bg-[#132501] group-hover:text-[#DFD5BD] transition-all">
                    <ChevronRight size={20} />
                  </div>
                </div>
                <p className="text-[10px] italic text-[#2C4001]/50 font-black mb-6 uppercase tracking-[0.25em]">{herb.scientific}</p>
                <p className="text-[#132501]/80 text-sm leading-relaxed line-clamp-2">
                  <strong className="text-[9px] uppercase tracking-widest opacity-40 block mb-1">Ação Principal:</strong>
                  {herb.action}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#3F5902] bg-[#3F5902]/10 px-4 py-2 rounded-full">
                  {herb.cat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Botões Flutuantes */}
      <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-50">
        <a href="https://www.instagram.com/miero.fitoterapicos?igsh=NHJvNmdrczl1MXdo" className="w-16 h-16 bg-white text-[#132501] rounded-[1.5rem] shadow-2xl flex items-center justify-center hover:scale-110 transition-all border border-[#DFD5BD] hover:bg-[#132501] hover:text-[#DFD5BD]">
          <Instagram size={28} />
        </a>
        <a href="#" className="w-16 h-16 bg-[#25D366] text-white rounded-[1.5rem] shadow-2xl flex items-center justify-center hover:scale-110 transition-all">
          <MessageCircle size={28} />
        </a>
      </div>

      {/* Modal Detalhado (Vibracional + Técnico) */}
      {selectedHerb && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-8 bg-[#132501]/85 backdrop-blur-xl transition-all duration-500 overflow-hidden">
          <div className="bg-[#DFD5BD] w-full max-w-4xl rounded-t-[4rem] sm:rounded-[3.5rem] overflow-y-auto max-h-[95vh] shadow-[0_50px_100px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom no-scrollbar relative">
            
            {/* Header Modal */}
            <div className="bg-[#132501] p-16 relative text-center">
              <button 
                onClick={() => setSelectedHerb(null)}
                className="absolute right-8 top-8 text-[#DFD5BD]/30 hover:text-[#DFD5BD] p-4 bg-white/5 rounded-full transition-all"
              >
                <X size={24} />
              </button>
              <h2 className="text-5xl font-black text-[#DFD5BD] mb-4 tracking-tight uppercase">{selectedHerb.name}</h2>
              <p className="text-[#DFD5BD]/40 italic font-light tracking-[0.3em] uppercase text-[10px]">{selectedHerb.scientific}</p>
            </div>
            
            <div className="p-12 sm:p-16 space-y-16">
              
              {/* 1. FITOENERGÉTICA (PRIORIDADE) */}
              <div className="p-12 bg-[#132501] rounded-[3rem] text-[#DFD5BD] relative overflow-hidden">
                <Sparkles className="absolute -right-10 -bottom-10 opacity-10" size={200} />
                <h4 className="text-[9px] uppercase font-black tracking-[0.3em] mb-5 flex items-center gap-2 opacity-50">
                  <Zap size={14} /> Energia Viva (Fitoenergética)
                </h4>
                <p className="text-3xl font-light leading-snug relative z-10 italic">"{selectedHerb.energy}"</p>
              </div>

              {/* 2. BENEFÍCIOS FÍSICOS E UTILIZAÇÃO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <section>
                  <h4 className="text-[9px] uppercase font-black text-[#3F5902] tracking-[0.3em] mb-5 flex items-center gap-2">
                    <Activity size={14} /> Benefícios para o Corpo
                  </h4>
                  <p className="text-[#132501] text-xl font-light leading-relaxed">{selectedHerb.action}</p>
                  <p className="text-[#132501]/70 text-lg mt-4 font-light italic">{selectedHerb.indications}</p>
                </section>
                <section>
                  <h4 className="text-[9px] uppercase font-black text-[#3F5902] tracking-[0.3em] mb-5 flex items-center gap-2">
                    <Thermometer size={14} /> Utilização Sugerida
                  </h4>
                  <p className="text-[#132501] text-xl font-light leading-relaxed">{selectedHerb.usage}</p>
                </section>
              </div>

              {/* 3. CIÊNCIA E PESQUISA */}
              <div className="bg-white/40 rounded-[3rem] p-12 border border-[#132501]/5 shadow-inner">
                <h4 className="text-[9px] uppercase font-black text-[#132501] tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Microscope size={16} /> Estudos e Evidências
                </h4>
                <p className="text-[#132501] text-xl font-light leading-relaxed italic">
                  {selectedHerb.research}
                </p>
              </div>

              {/* 4. DESTAQUE MIERÓ E CUIDADO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#DFD5BD]/50 border border-[#132501]/10 p-10 rounded-[2.5rem]">
                  <h4 className="text-[8px] uppercase font-black tracking-[0.3em] mb-4 opacity-40">Destaque Mieró</h4>
                  <p className="text-sm font-medium leading-relaxed">{selectedHerb.highlights}</p>
                </div>
                <div className="bg-red-50 p-10 rounded-[2.5rem] border border-red-100">
                  <h4 className="text-[8px] uppercase font-black text-red-900 tracking-[0.3em] mb-4">Notas de Cuidado</h4>
                  <p className="text-red-900/70 text-sm font-bold leading-relaxed">{selectedHerb.cautions}</p>
                </div>
              </div>

              {/* Ritual Final de Dosagem */}
              <div className="pt-16 border-t border-[#132501]/10 text-center">
                <h4 className="text-[9px] uppercase font-black text-[#132501] tracking-[0.4em] mb-10">Ritual de Preparo Tintura de Ervas Mieró</h4>
                <div className="flex flex-wrap justify-center gap-8">
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm min-w-[140px]">
                    <span className="block text-5xl font-black text-[#132501]">30</span>
                    <span className="text-[8px] uppercase font-bold opacity-30 tracking-[0.2em]">Gotas</span>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm min-w-[140px]">
                    <span className="block text-5xl font-black text-[#132501]">2x</span>
                    <span className="text-[8px] uppercase font-bold opacity-30 tracking-[0.2em]">Ao Dia</span>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm min-w-[140px]">
                    <span className="block text-5xl font-black text-[#132501]">50ml</span>
                    <span className="text-[8px] uppercase font-bold opacity-30 tracking-[0.2em]">Em Água</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedHerb(null)}
                className="w-full py-10 bg-[#132501] text-[#DFD5BD] rounded-[2.5rem] font-black uppercase tracking-[0.4em] hover:bg-[#3F5902] transition-all shadow-2xl active:scale-[0.98]"
              >
                Concluir Consulta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative text-center p-24 opacity-40">
        <div className="w-16 h-[1px] bg-[#132501] mx-auto mb-10"></div>
        <p className="text-[8px] uppercase tracking-[0.5em] font-black leading-loose max-w-sm mx-auto">
          Mieró • Energia viva das ervas em movimento <br /> Extração Artesanal • Não-me-Toque - RS
        </p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700;900&display=swap');
        
        body { font-family: 'Inter', sans-serif !important; background-color: #DFD5BD; margin: 0; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: slideUp 0.7s cubic-bezier(0.19, 1, 0.22, 1); }
      `}</style>
    </div>
  );
};

export default App;