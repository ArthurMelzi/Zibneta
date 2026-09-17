import React, { useState, useEffect } from 'react';
import {
  Thermometer,
  Globe,
  Activity,
  Flame,
  Snowflake,
  AlertTriangle,
  Heart,
  ShieldAlert,
  Edit3,
  CheckCircle,
  Zap,
  Award,
  Sparkles,
  RefreshCw,
  Sliders,
  ChevronRight,
  Info,
  X,
  FileText,
  Sun,
  Moon,
  Eye,
  Send,
  Bookmark,
  Users,
  Radio,
  TrendingUp,
  Droplet,
  Compass,
  Check,
  Building2,
  Share2
} from 'lucide-react';

const DEFAULT_CONFIG = {
  planetName: "Zubineta",
  mascotName: "Zibinômetro",
  scientists: "Sofia, Lucas e Gabriel",
  schoolYear: "Iniciação Científica Infantil",
  institution: "Feira de Ciências Interplanetária"
};

const INITIAL_PROBLEMS = [
  {
    id: 1,
    title: "Aquecimento dos Oceanos",
    desc: "A água mais quente acelera o metabolismo de criaturas e estressa o ecossistema marinho.",
    solutions: ["Reduzir emissões de gases estufa", "Proteger recifes e áreas marinhas"]
  },
  {
    id: 2,
    title: "Microplásticos e Resíduos no Ar/Água",
    desc: "Microplásticos e poluentes grudam na pele dos organismos que respiram pela pele, sufocando-os.",
    solutions: ["Substituir plásticos de uso único", "Filtragem industrial rigorosa"]
  },
  {
    id: 3,
    title: "Desiquilíbrio Térmico nos Ninhos de Tartaruga",
    desc: "Temperaturas acima de 33°C fazem nascer apenas fêmeas ou causam má-formação em embriões.",
    solutions: ["Revegetação de praias para sombra", "Monitoramento com termômetros científicos"]
  }
];

export default function App() {
  const [isAlive, setIsAlive] = useState(true);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [activeStation, setActiveStation] = useState('station1');

  // Station 2 states
  const [mascotTemp, setMascotTemp] = useState(25);
  const [celsiusInput, setCelsiusInput] = useState(25);
  const [bridgeTemp, setBridgeTemp] = useState(20);
  const [hasGap, setHasGap] = useState(true);
  const [nestTemp, setNestTemp] = useState(29);

  // Station 3 state
  const [activeObservation, setActiveObservation] = useState(0);
  const [selectedPillar, setSelectedPillar] = useState('materiais');

  // Station 4 state
  const [solutions, setSolutions] = useState(INITIAL_PROBLEMS);
  const [newSolutionText, setNewSolutionText] = useState('');
  const [selectedProblemId, setSelectedProblemId] = useState(1);
  const [authorName, setAuthorName] = useState('');
  const [pledgeCount, setPledgeCount] = useState(148);
  const [hasPledged, setHasPledged] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showThermometerBookmark, setShowThermometerBookmark] = useState(false);

  // Audio / Visual Alert Simulation
  const [alertActive, setAlertActive] = useState(false);

  useEffect(() => {
    if (!isAlive) {
      setAlertActive(true);
    } else {
      setAlertActive(false);
    }
  }, [isAlive]);

  // Scale Conversions
  const celsius = parseFloat(celsiusInput) || 0;
  const fahrenheit = (celsius * 1.8 + 32).toFixed(1);
  const kelvin = (celsius + 273.15).toFixed(1);

  // Mascot calculation logic
  const getMascotStatus = (temp, alive) => {
    if (!alive) {
      return {
        color: "#4A5568",
        statusText: "CRÍTICO - Infecção por Microplásticos",
        skinAspect: "Sujeira tóxica, células danificadas e contração dolorosa",
        metabolism: "Lento/Degradado (Estresse Extremo)",
        cellState: "Células necrosando devido à poluição",
        chromatophores: "Desregulados / Desbotados",
        stressLevel: "100% (Risco Crítico)",
        bgColor: "bg-red-950/40 border-red-800"
      };
    }

    if (temp <= 10) {
      return {
        color: "#3B82F6", // Cold blue
        statusText: "AMBENTE FRIO - Torpor / Hibernação",
        skinAspect: "Pele clara e pálida, pigmentos recolhidos",
        metabolism: "Muito Lento e Calmo (Metabolismo reduzido)",
        cellState: "Células preparadas para o Frio expostas",
        chromatophores: "Altamente Contraídos (Pontos pequenos)",
        stressLevel: "Baixo (Estado de Conservação)",
        bgColor: "bg-blue-100 border-blue-400"
      };
    } else if (temp <= 28) {
      return {
        color: "#8B5CF6", // Vibrant purple
        statusText: "FAIXA ÓTIMA - Equilíbrio Térmico",
        skinAspect: "Coloração roxo-violeta brilhante e natural",
        metabolism: "Metabolismo Normal e Harmônico",
        cellState: "Células em equilíbrio fisiológico",
        chromatophores: "Dilatação Moderada / Comunicação ativa",
        stressLevel: "Mínimo (Saudável)",
        bgColor: "bg-purple-100 border-purple-400"
      };
    } else if (temp <= 38) {
      return {
        color: "#EC4899", // Warm magenta
        statusText: "ALERTA TÉRMICO - Agitação Metabolica",
        skinAspect: "Tons avermelhados intensos",
        metabolism: "Acelerado (Consumo alto de energia)",
        cellState: "Células preparadas para o Calor ativadas",
        chromatophores: "Dilatados (Expandidos para liberar calor)",
        stressLevel: "Moderado / Elevado",
        bgColor: "bg-amber-100 border-amber-400"
      };
    } else {
      return {
        color: "#EF4444", // Dangerous red
        statusText: "EMERGÊNCIA - Hipertermia",
        skinAspect: "Vermelho vivo palpitante, sinais de desidratação",
        metabolism: "Extremamente Acelerado / Colapso Próximo",
        cellState: "Estresse Térmico / Proteínas de choque ativas",
        chromatophores: "Máxima Dilatação (Dilatação extrema)",
        stressLevel: "CRÍTICO (>90%)",
        bgColor: "bg-red-100 border-red-500"
      };
    }
  };

  const mascotData = getMascotStatus(mascotTemp, isAlive);

  // Turtle sex ratio logic
  const getTurtleRatio = (temp) => {
    if (temp < 25) {
      return { female: 5, male: 95, status: "Predominância de Machos (<25°C)", risk: temp < 20 ? "Perigo: Retardo grave / Má-formação" : "Incubação Lenta" };
    } else if (temp <= 33) {
      const f = Math.round(((temp - 25) / (33 - 25)) * 90) + 5;
      return { female: f, male: 100 - f, status: "Proporção Equilibrada (25°C - 33°C)", risk: "Faixa Ótima de Incubação" };
    } else {
      return { female: 95, male: 5, status: "Predominância de Fêmeas (>33°C)", risk: temp > 36 ? "Mortalidade Embriogênica Elevada" : "Incubação Muito Acelerada" };
    }
  };

  const turtleRatio = getTurtleRatio(nestTemp);

  // Handle adding new solution from visitors
  const handleAddSolution = (e) => {
    e.preventDefault();
    if (!newSolutionText.trim()) return;

    setSolutions(prev => prev.map(p => {
      if (p.id === Number(selectedProblemId)) {
        return {
          ...p,
          solutions: [...p.solutions, `${newSolutionText.trim()} ${authorName ? `(por ${authorName})` : ''}`]
        };
      }
      return p;
    }));

    setNewSolutionText('');
  };

  const handlePledge = () => {
    if (!hasPledged) {
      setPledgeCount(prev => prev + 1);
      setHasPledged(true);
    }
    setShowCertificate(true);
  };

  // Theme dynamic styles (Swiss Modernist Neobrutalism)
  const bgStyle = isAlive ? 'bg-[#FAF8F5] text-slate-900' : 'bg-[#0F0F12] text-zinc-100';
  const cardBorder = isAlive ? 'border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]' : 'border-2 border-zinc-700 shadow-[4px_4px_0px_0px_#ef4444] bg-zinc-900/90';
  const headerBg = isAlive ? 'bg-purple-200 border-b-2 border-slate-900' : 'bg-zinc-900 border-b-2 border-red-800 text-red-200';
  const badgeClass = isAlive ? 'bg-amber-300 text-slate-900 border border-slate-900 font-mono text-xs font-bold px-2 py-0.5 rounded-none' : 'bg-red-950 text-red-300 border border-red-700 font-mono text-xs font-bold px-2 py-0.5 rounded-none';

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${bgStyle} pb-16`}>
      
      {}
      <header className={`sticky top-0 z-40 ${headerBg} transition-all`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            
            {/* Branding & Mission Metadata */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 border-2 ${isAlive ? 'border-slate-900 bg-white' : 'border-red-600 bg-zinc-950'} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                  <Globe className={`w-6 h-6 ${isAlive ? 'text-purple-700 animate-spin-slow' : 'text-red-500 animate-pulse'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={badgeClass}>INICIAÇÃO CIENTÍFICA INFANTIL</span>
                    <span className="font-mono text-xs opacity-75">{config.institution}</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-mono">
                    PLANETA <span className={isAlive ? 'text-purple-700 underline decoration-wavy' : 'text-red-500'}>{config.planetName}</span>
                  </h1>
                </div>
              </div>

              {/* Mobile Quick Config */}
              <button 
                onClick={() => setIsConfigOpen(true)}
                className="md:hidden p-2 bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-100 shadow-[2px_2px_0px_0px_#0f172a]"
                title="Configurar Dados da Apresentação"
              >
                <Edit3 className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Toggle & Scientist Badge */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              
              {/* EDIT CONFIG BUTTON */}
              <button
                onClick={() => setIsConfigOpen(true)}
                className={`hidden md:flex items-center gap-2 px-3 py-1.5 font-mono text-xs font-bold border-2 ${
                  isAlive ? 'border-slate-900 bg-white hover:bg-yellow-200 text-slate-900' : 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-100'
                } shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all`}
              >
                <Users className="w-4 h-4 text-purple-600" />
                <span>CIENTISTAS: <strong className="underline">{config.scientists}</strong></span>
                <Edit3 className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* PLANET LIVE / DEAD MODE TOGGLE */}
              <button
                onClick={() => setIsAlive(!isAlive)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-black uppercase tracking-wider border-2 ${
                  isAlive 
                    ? 'bg-emerald-400 text-slate-900 border-slate-900 hover:bg-emerald-300 shadow-[3px_3px_0px_0px_#0f172a]' 
                    : 'bg-red-600 text-white border-red-900 hover:bg-red-500 shadow-[3px_3px_0px_0px_#ef4444]'
                } transition-all transform active:translate-y-0.5`}
              >
                {isAlive ? (
                  <>
                    <Sun className="w-4 h-4 animate-spin-slow" />
                    <span>MODO PLANETA VIVO 🌿</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4 animate-bounce" />
                    <span>MODO PLANETA MORTO ☣️</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Navigation Bar - 4 Stations */}
          <nav className="mt-4 pt-2 border-t border-slate-900/20 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'station1', num: '01', title: 'BOAS-VINDAS & LEIS', icon: Globe },
              { id: 'station2', num: '02', title: 'TERMOLOGIA & MASCOTE', icon: Thermometer },
              { id: 'station3', num: '03', title: 'SISTEMA EM RISCO', icon: Activity },
              { id: 'station4', num: '04', title: 'ODS 13 & FUTURO', icon: Heart },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeStation === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveStation(tab.id)}
                  className={`flex items-center justify-between px-3 py-2 text-xs font-mono font-bold border-2 transition-all ${
                    isActive
                      ? isAlive
                        ? 'bg-purple-600 text-white border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]'
                        : 'bg-red-700 text-white border-red-400 shadow-[3px_3px_0px_0px_#ef4444]'
                      : isAlive
                        ? 'bg-white hover:bg-purple-100 text-slate-800 border-slate-900'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <span className="opacity-70">{tab.num}.</span>
                    <span className="truncate">{tab.title}</span>
                  </div>
                  <Icon className="w-4 h-4 shrink-0" />
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Emergency Status Banner when Planet is Dead */}
      {!isAlive && (
        <div className="bg-red-950 border-b-2 border-red-600 text-red-200 px-4 py-2 font-mono text-xs text-center flex items-center justify-center gap-2 animate-pulse">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <span>ALERTA DE DESEQUILÍBRIO GLOBAL ATIVO: O PLANETA {config.planetName.toUpperCase()} PERDEU SUA BIODIVERSIDADE! BICHINHO {config.mascotName.toUpperCase()} EM RISCO.</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">

        {}
        {activeStation === 'station1' && (
          <div className="space-y-6">
            
            {/* Hero Welcome Banner */}
            <div className={`${cardBorder} p-6 ${isAlive ? 'bg-purple-100' : 'bg-zinc-900'}`}>
              <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className={badgeClass}>1ª ESTAÇÃO DA APRESENTAÇÃO</span>
                    <span className="font-mono text-xs opacity-75">SINAL INTERPLANETÁRIO CONECTADO</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                    "BEM-VINDOS AO NOSSO PLANETA {config.planetName}!"
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed font-medium">
                    Somos os cientistas <strong className="underline decoration-purple-500">{config.scientists}</strong>. Há uma dúvida urgente que está nos preocupando: 
                    <em className="bg-yellow-200 text-slate-900 px-1 font-semibold"> O que acontece quando um planeta perde o seu equilíbrio térmico?</em>
                  </p>
                </div>

                <div className={`p-4 border-2 ${isAlive ? 'border-slate-900 bg-white' : 'border-zinc-700 bg-zinc-950'} flex flex-col items-center justify-center min-w-[220px]`}>
                  <Radio className={`w-8 h-8 ${isAlive ? 'text-purple-600 animate-pulse' : 'text-red-500'}`} />
                  <span className="font-mono text-xs font-bold mt-2">STATUS DA CONEXÃO</span>
                  <span className={`text-sm font-black font-mono mt-1 ${isAlive ? 'text-emerald-600' : 'text-red-500'}`}>
                    {isAlive ? 'ESTÁVEL (ZUBINETA ↔ TERRA)' : 'CRÍTICA / RUÍDO ALTO'}
                  </span>
                  <div className="w-full bg-slate-200 h-2 mt-3 rounded-none overflow-hidden border border-slate-900">
                    <div className={`h-full ${isAlive ? 'bg-emerald-500 w-full' : 'bg-red-600 w-1/4 animate-ping'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scientific Dispatch & Universal Laws Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Interactive Speech Letter */}
              <div className={`${cardBorder} p-5 flex flex-col justify-between ${isAlive ? 'bg-white' : 'bg-zinc-900'}`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-slate-900/20 pb-2">
                    <div className="flex items-center gap-2 font-mono font-bold text-xs">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span>DISCURSO DOS CIENTISTAS</span>
                    </div>
                    <span className="font-mono text-xs bg-slate-200 text-slate-800 px-2 py-0.5 border border-slate-900">PAINEL AUXILIAR</span>
                  </div>

                  <blockquote className="italic text-sm sm:text-base border-l-4 border-purple-600 pl-4 py-1 leading-relaxed">
                    "Nós fizemos este painel interativo para explicar como interpretamos a Termologia no nosso mundo.
                    Percebemos que as <strong className="not-italic font-bold underline">leis naturais são iguais em todo o universo</strong>! 
                    Para uma mesma ação física, teremos sempre uma mesma consequência."
                  </blockquote>

                  <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                    Se nossas atitudes forem iguais em relação ao meio ambiente e ao clima, os resultados serão exatamente iguais. 
                    Por isso, viemos trocar conhecimento direto com vocês, humanos da Terra.
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-900/10 flex items-center justify-between text-xs font-mono">
                  <span>Mascote Monitorado: <strong>{config.mascotName}</strong></span>
                  <span className="text-purple-600 font-bold">Iniciação Científica Infantil</span>
                </div>
              </div>

              {/* Universal Laws Card */}
              <div className={`${cardBorder} p-5 ${isAlive ? 'bg-blue-50' : 'bg-zinc-900'}`}>
                <div className="flex items-center justify-between border-b-2 border-slate-900/20 pb-2 mb-4">
                  <div className="flex items-center gap-2 font-mono font-bold text-xs">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>LEIS DA TERMOLOGIA NO UNIVERSO</span>
                  </div>
                  <span className="font-mono text-xs bg-amber-200 text-slate-900 px-2 py-0.5 border border-slate-900">PRINCÍPIO FÍSICO</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className={`p-3 border-2 ${isAlive ? 'border-slate-900 bg-white' : 'border-zinc-700 bg-zinc-950'} flex items-start gap-3`}>
                    <div className="p-1.5 bg-purple-300 border border-slate-900 text-slate-900 font-bold">1</div>
                    <div>
                      <h4 className="font-bold text-sm uppercase">Energia Térmica & Agitação</h4>
                      <p className="font-sans text-xs mt-1 opacity-80">A temperatura mede o grau de agitação das moléculas. Quanto mais calor, maior o movimento!</p>
                    </div>
                  </div>

                  <div className={`p-3 border-2 ${isAlive ? 'border-slate-900 bg-white' : 'border-zinc-700 bg-zinc-950'} flex items-start gap-3`}>
                    <div className="p-1.5 bg-blue-300 border border-slate-900 text-slate-900 font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-sm uppercase">Causa e Efeito Térmico</h4>
                      <p className="font-sans text-xs mt-1 opacity-80">Se a temperatura muda, os materiais se dilatam, o metabolismo dos organismos responde e a água muda de estado.</p>
                    </div>
                  </div>

                  <div className={`p-3 border-2 ${isAlive ? 'border-slate-900 bg-white' : 'border-zinc-700 bg-zinc-950'} flex items-start gap-3`}>
                    <div className="p-1.5 bg-emerald-300 border border-slate-900 text-slate-900 font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-sm uppercase">Equilíbrio do Sistema</h4>
                      <p className="font-sans text-xs mt-1 opacity-80">Nenhum organismo vive isolado. A perda do equilíbrio térmico afeta toda a teia viva do planeta.</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {}
        {activeStation === 'station2' && (
          <div className="space-y-8">
            
            {/* Header Station 2 */}
            <div className={`${cardBorder} p-4 ${isAlive ? 'bg-blue-100' : 'bg-zinc-900'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className={badgeClass}>2ª ESTAÇÃO DA APRESENTAÇÃO</span>
                  <h2 className="text-xl sm:text-3xl font-black uppercase mt-1">
                    NOSSO PLANETA ESTÁ MUDANDO: TERMOLOGIA & {config.mascotName.toUpperCase()}
                  </h2>
                </div>
                <div className="font-mono text-xs bg-white text-slate-900 p-2 border-2 border-slate-900">
                  <span>ESPÉCIE CIENTÍFICA: </span>
                  <strong className="underline italic">Octopus vulgaris</strong>
                </div>
              </div>
            </div>

            {/* SIMULATOR: ZIBINÔMETRO OCTOPUS */}
            <div className={`${cardBorder} p-6 ${mascotData.bgColor} transition-all`}>
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                
                {/* Visual SVG Octopus Mascot Graphic */}
                <div className="w-full lg:w-1/2 flex flex-col items-center">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 border-4 border-slate-900 bg-white p-4 shadow-[6px_6px_0px_0px_#0f172a] flex items-center justify-center overflow-hidden">
                    
                    {/* Background Temperature Gradient Glow */}
                    <div 
                      className="absolute inset-0 opacity-30 transition-all duration-700"
                      style={{
                        backgroundColor: mascotData.color,
                        filter: mascotTemp > 35 ? 'blur(20px)' : 'none'
                      }}
                    />

                    {/* SVG Octopus Mascot */}
                    <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 transition-transform duration-500">
                      
                      {/* Tentacles */}
                      <g className="transition-all duration-500">
                        <path d="M 50 140 Q 20 180 40 190 Q 60 180 70 150" fill={mascotData.color} stroke="#0f172a" strokeWidth="4" />
                        <path d="M 70 150 Q 50 190 75 195 Q 95 185 85 150" fill={mascotData.color} stroke="#0f172a" strokeWidth="4" />
                        <path d="M 85 150 Q 95 195 115 195 Q 125 180 115 150" fill={mascotData.color} stroke="#0f172a" strokeWidth="4" />
                        <path d="M 115 150 Q 130 190 150 185 Q 160 170 135 140" fill={mascotData.color} stroke="#0f172a" strokeWidth="4" />
                        <path d="M 135 140 Q 170 160 180 140 Q 160 120 145 130" fill={mascotData.color} stroke="#0f172a" strokeWidth="4" />
                        <path d="M 50 140 Q 20 130 15 110 Q 30 100 55 120" fill={mascotData.color} stroke="#0f172a" strokeWidth="4" />
                      </g>

                      {/* Head Body Bulb */}
                      <ellipse cx="100" cy="90" rx="55" ry="50" fill={mascotData.color} stroke="#0f172a" strokeWidth="5" />

                      {/* Chromatophores (Color spots on skin expanding/contracting) */}
                      <g fill="#0f172a" opacity={mascotTemp > 25 ? "0.6" : "0.3"}>
                        <circle cx="70" cy="70" r={mascotTemp / 6 + 2} />
                        <circle cx="130" cy="70" r={mascotTemp / 6 + 2} />
                        <circle cx="100" cy="55" r={mascotTemp / 5 + 2} />
                        <circle cx="80" cy="110" r={mascotTemp / 7 + 2} />
                        <circle cx="120" cy="110" r={mascotTemp / 7 + 2} />
                      </g>

                      {/* Microplastics & Grime overlay in Dead Planet Mode */}
                      {!isAlive && (
                        <g fill="#27272A" opacity="0.85">
                          <rect x="65" y="60" width="12" height="12" rx="2" transform="rotate(15 65 60)" />
                          <rect x="115" y="85" width="15" height="8" rx="1" transform="rotate(-20 115 85)" />
                          <circle cx="90" cy="120" r="6" fill="#18181B" />
                          <path d="M 40 100 L 160 100" stroke="#71717A" strokeWidth="3" strokeDasharray="4" />
                        </g>
                      )}

                      {/* Eyes */}
                      <circle cx="80" cy="90" r="14" fill="white" stroke="#0f172a" strokeWidth="4" />
                      <circle cx="120" cy="90" r="14" fill="white" stroke="#0f172a" strokeWidth="4" />
                      
                      {/* Pupils - change shape depending on temperature and health */}
                      {mascotTemp > 38 || !isAlive ? (
                        <>
                          {/* Alarmed pupils */}
                          <line x1="74" y1="84" x2="86" y2="96" stroke="#0f172a" strokeWidth="4" />
                          <line x1="86" y1="84" x2="74" y2="96" stroke="#0f172a" strokeWidth="4" />
                          <line x1="114" y1="84" x2="126" y2="96" stroke="#0f172a" strokeWidth="4" />
                          <line x1="126" y1="84" x2="114" y2="96" stroke="#0f172a" strokeWidth="4" />
                        </>
                      ) : mascotTemp < 12 ? (
                        <>
                          {/* Sleepy pupils */}
                          <line x1="72" y1="90" x2="88" y2="90" stroke="#0f172a" strokeWidth="4" />
                          <line x1="112" y1="90" x2="128" y2="90" stroke="#0f172a" strokeWidth="4" />
                        </>
                      ) : (
                        <>
                          {/* Normal happy pupils */}
                          <circle cx="80" cy="90" r="6" fill="#0f172a" />
                          <circle cx="120" cy="90" r="6" fill="#0f172a" />
                        </>
                      )}

                      {/* Mouth Expression */}
                      {!isAlive ? (
                        <path d="M 85 125 Q 100 110 115 125" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
                      ) : mascotTemp > 35 ? (
                        <ellipse cx="100" cy="120" rx="10" ry="6" fill="#0f172a" />
                      ) : (
                        <path d="M 85 115 Q 100 130 115 115" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
                      )}
                    </svg>

                    {/* Live Temperature Indicator Overlay */}
                    <div className="absolute top-2 right-2 bg-slate-900 text-yellow-300 font-mono text-xs font-black px-2 py-1 border border-black">
                      {mascotTemp}°C
                    </div>
                  </div>

                  {/* Mascot Name Badge */}
                  <div className="mt-3 text-center">
                    <h3 className="text-xl font-black uppercase font-mono">{config.mascotName}</h3>
                    <p className="text-xs font-mono opacity-80">Termômetro Biológico de Zubineta</p>
                  </div>
                </div>

                {/* Simulator Interactive Controls & Physiological Data */}
                <div className="w-full lg:w-1/2 space-y-4">
                  <div className="border-b-2 border-slate-900/20 pb-2 flex justify-between items-center">
                    <h4 className="font-mono font-bold uppercase text-sm flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-purple-600" />
                      CONTROLE DA TEMPERATURA DA ÁGUA
                    </h4>
                    <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2 py-0.5">
                      {mascotTemp}°C
                    </span>
                  </div>

                  {/* Slider Control */}
                  <div className="space-y-2">
                    <input 
                      type="range" 
                      min="-5" 
                      max="50" 
                      value={mascotTemp}
                      onChange={(e) => setMascotTemp(Number(e.target.value))}
                      className="w-full h-3 bg-slate-200 rounded-none border-2 border-slate-900 accent-purple-600 cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[10px] opacity-75 font-bold">
                      <span>-5°C (Congelante)</span>
                      <span>25°C (Ideal)</span>
                      <span>50°C (Extremo)</span>
                    </div>
                  </div>

                  {/* Dynamic Metrics Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3 border-2 border-slate-900 bg-white">
                      <span className="text-[10px] opacity-70 block font-bold">STATUS FISIOLÓGICO</span>
                      <strong className="text-sm font-black block mt-0.5">{mascotData.statusText}</strong>
                    </div>

                    <div className="p-3 border-2 border-slate-900 bg-white">
                      <span className="text-[10px] opacity-70 block font-bold">METABOLISMO</span>
                      <strong className="text-sm font-black block mt-0.5">{mascotData.metabolism}</strong>
                    </div>

                    <div className="p-3 border-2 border-slate-900 bg-white">
                      <span className="text-[10px] opacity-70 block font-bold">CROMATÓFOROS DA PELE</span>
                      <p className="font-sans text-xs mt-0.5">{mascotData.chromatophores}</p>
                    </div>

                    <div className="p-3 border-2 border-slate-900 bg-white">
                      <span className="text-[10px] opacity-70 block font-bold">CÉLULAS PIGMENTARES</span>
                      <p className="font-sans text-xs mt-0.5">{mascotData.cellState}</p>
                    </div>
                  </div>

                  {/* Respiração Cutânea & Microplásticos Alert */}
                  <div className={`p-3 border-2 ${!isAlive ? 'border-red-600 bg-red-900 text-white' : 'border-slate-900 bg-amber-50'} text-xs leading-relaxed`}>
                    <strong className="font-mono uppercase block mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      VULNERABILIDADE: RESPIRAÇÃO CUTÂNEA
                    </strong>
                    O {config.mascotName} respira diretamente pela pele. Microplásticos, resíduos no ar e toxinas destroem suas células pigmentares, causando uma morte lenta e dolorosa com aspecto sujo e opaco.
                  </div>

                </div>

              </div>
            </div>

            {/* CONVERSOR DE ESCALAS TERMOMÉTRICAS & INSTRUMENTOS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Thermometric Scales Converter Calculator */}
              <div className={`${cardBorder} p-5 ${isAlive ? 'bg-white' : 'bg-zinc-900'}`}>
                <div className="flex items-center justify-between border-b-2 border-slate-900/20 pb-2 mb-4">
                  <div className="flex items-center gap-2 font-mono font-bold text-xs">
                    <Thermometer className="w-4 h-4 text-purple-600" />
                    <span>CONVERSOR DE ESCALAS TERMOMÉTRICAS</span>
                  </div>
                  <span className="font-mono text-xs bg-purple-200 text-slate-900 px-2 py-0.5 border border-slate-900">CÁLCULO EXATO</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs font-bold mb-1">
                      DIGITE A TEMPERATURA EM CELSIUS (°C):
                    </label>
                    <input 
                      type="number" 
                      value={celsiusInput} 
                      onChange={(e) => setCelsiusInput(e.target.value)}
                      className="w-full p-2 font-mono text-lg font-black border-2 border-slate-900 bg-slate-50 focus:bg-yellow-100 text-slate-900"
                    />
                  </div>

                  {/* Conversion Display Cards */}
                  <div className="grid grid-cols-3 gap-2 font-mono text-center">
                    <div className="p-3 border-2 border-slate-900 bg-purple-100 text-slate-900">
                      <span className="text-[10px] block font-bold">CELSIUS</span>
                      <strong className="text-xl font-black">{celsius}°C</strong>
                      <span className="text-[9px] block opacity-75 mt-1">Padrão Brasil</span>
                    </div>

                    <div className="p-3 border-2 border-slate-900 bg-blue-100 text-slate-900">
                      <span className="text-[10px] block font-bold">FAHRENHEIT</span>
                      <strong className="text-xl font-black">{fahrenheit}°F</strong>
                      <span className="text-[9px] block opacity-75 mt-1">(°C × 1.8) + 32</span>
                    </div>

                    <div className="p-3 border-2 border-slate-900 bg-emerald-100 text-slate-900">
                      <span className="text-[10px] block font-bold">KELVIN</span>
                      <strong className="text-xl font-black">{kelvin} K</strong>
                      <span className="text-[9px] block opacity-75 mt-1">°C + 273.15</span>
                    </div>
                  </div>

                  {/* Reference Benchmarks Grid */}
                  <div className="border-t-2 border-slate-900/10 pt-3 space-y-2 text-xs font-mono">
                    <span className="font-bold block uppercase">MARCOS HISTÓRICOS DAS ESCALAS:</span>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 border border-slate-900 bg-slate-50 text-slate-900">
                        <strong>Gelo Derretendo:</strong> 0°C | 32°F | 273 K
                      </div>
                      <div className="p-2 border border-slate-900 bg-slate-50 text-slate-900">
                        <strong>Água Fervendo:</strong> 100°C | 212°F | 373 K
                      </div>
                      <div className="p-2 border border-slate-900 bg-slate-50 text-slate-900">
                        <strong>Corpo Humano:</strong> ~36.6°C | 97.8°F
                      </div>
                      <div className="p-2 border border-slate-900 bg-slate-50 text-slate-900">
                        <strong>Zero Absoluto:</strong> -273°C | 0 K
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* SIMULADOR DE DILATAÇÃO TÉRMICA NAS PONTES */}
              <div className={`${cardBorder} p-5 ${isAlive ? 'bg-amber-50' : 'bg-zinc-900'}`}>
                <div className="flex items-center justify-between border-b-2 border-slate-900/20 pb-2 mb-4">
                  <div className="flex items-center gap-2 font-mono font-bold text-xs">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <span>DILATAÇÃO TÉRMICA & JUNTA DA PONTE</span>
                  </div>
                  <span className="font-mono text-xs bg-amber-300 text-slate-900 px-2 py-0.5 border border-slate-900">ENGENHARIA & FÍSICA</span>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-sans leading-relaxed">
                    No calor, os materiais da ponte (concreto e ferro) crescem porque suas moléculas se agitam e se afastam. Os vãos (juntas de dilatação) evitam que a ponte rache ou desabe!
                  </p>

                  {/* Controls for Bridge Simulator */}
                  <div className="flex items-center justify-between gap-4 font-mono text-xs">
                    <div className="flex-1">
                      <label className="block font-bold mb-1">TEMPERATURA DO AMBIENTE: {bridgeTemp}°C</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="50" 
                        value={bridgeTemp} 
                        onChange={(e) => setBridgeTemp(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 border border-slate-900 accent-amber-600"
                      />
                    </div>

                    <button
                      onClick={() => setHasGap(!hasGap)}
                      className={`px-3 py-2 font-bold border-2 border-slate-900 ${
                        hasGap ? 'bg-emerald-300 text-slate-900' : 'bg-red-400 text-slate-900'
                      }`}
                    >
                      {hasGap ? 'VÃO PRESENTE (COM SEGURANÇA)' : 'SEM VÃO (RISCO DE CRACK)'}
                    </button>
                  </div>

                  {/* Visual Bridge Gap Animation Canvas */}
                  <div className="relative h-28 border-2 border-slate-900 bg-slate-200 overflow-hidden flex items-center justify-center p-2">
                    
                    {/* Left Deck */}
                    <div 
                      className="h-16 bg-slate-700 border-2 border-slate-900 transition-all duration-300 relative flex items-center justify-center text-white font-mono text-[10px] font-bold"
                      style={{
                        width: `${40 + (bridgeTemp / 50) * 8}%`
                      }}
                    >
                      CONCRETO & FERRO
                    </div>

                    {/* Gap Space */}
                    <div className="h-full flex flex-col items-center justify-center transition-all duration-300 mx-1">
                      {hasGap ? (
                        <div 
                          className="bg-amber-300/80 border-x-2 border-dashed border-slate-900 h-16 flex items-center justify-center text-[9px] font-mono font-bold px-1 text-center"
                          style={{
                            width: `${Math.max(2, 35 - (bridgeTemp / 50) * 30)}px`
                          }}
                        >
                          VÃO
                        </div>
                      ) : (
                        <div className="h-16 w-0 border-r-4 border-red-600 flex items-center justify-center">
                          {bridgeTemp > 30 && (
                            <div className="absolute bg-red-600 text-white font-mono text-[10px] font-black px-2 py-1 animate-bounce border border-slate-900">
                              💥 RACHADURA / ESTRUTURA ESTUFADA!
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right Deck */}
                    <div 
                      className="h-16 bg-slate-700 border-2 border-slate-900 transition-all duration-300 relative flex items-center justify-center text-white font-mono text-[10px] font-bold"
                      style={{
                        width: `${40 + (bridgeTemp / 50) * 8}%`
                      }}
                    >
                      CONCRETO & FERRO
                    </div>

                  </div>

                  <div className="text-[11px] font-mono bg-white p-2 border border-slate-900">
                    STATUS ESTRUTURAL: {bridgeTemp > 35 && !hasGap ? (
                      <span className="text-red-600 font-bold">PERIGO EXTREMO: Dilatação sem espaço causa estufamento e colapso!</span>
                    ) : (
                      <span className="text-emerald-700 font-bold">ESTÁVEL: Os vãos absorvem a expansão térmica no calor.</span>
                    )}
                  </div>

                </div>
              </div>

            </div>

            {/* SIMULADOR: DETERMINAÇÃO SEXUAL DAS TARTARUGAS PELA TEMPERATURA */}
            <div className={`${cardBorder} p-6 ${isAlive ? 'bg-emerald-50' : 'bg-zinc-900'}`}>
              <div className="flex items-center justify-between border-b-2 border-slate-900/20 pb-2 mb-4">
                <div>
                  <span className={badgeClass}>DETERMINAÇÃO SEXUAL DEPENDENTE DA TEMPERATURA</span>
                  <h3 className="text-xl font-black uppercase font-mono mt-1">EFEITO DO CALOR NOS NINHOS DE TARTARUGAS</h3>
                </div>
                <div className="font-mono text-xs bg-emerald-200 text-slate-900 px-3 py-1 border border-slate-900 font-bold">
                  NINHO EM MONITORAMENTO
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                
                {/* Control Slider */}
                <div className="space-y-3 font-mono text-xs">
                  <label className="block font-bold">
                    TEMPERATURA DO NINHO: <span className="text-base text-purple-700 font-black">{nestTemp}°C</span>
                  </label>
                  <input 
                    type="range" 
                    min="18" 
                    max="38" 
                    value={nestTemp}
                    onChange={(e) => setNestTemp(Number(e.target.value))}
                    className="w-full h-3 bg-slate-200 border-2 border-slate-900 accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold">
                    <span>&lt;25°C (Mais Machos)</span>
                    <span>29°C (Pivotal)</span>
                    <span>&gt;33°C (Mais Fêmeas)</span>
                  </div>

                  <div className="p-3 bg-white border-2 border-slate-900 space-y-1">
                    <span className="text-[10px] font-bold block opacity-75">STATUS DO DESENVOLVIMENTO:</span>
                    <p className="font-sans text-xs">{turtleRatio.status}</p>
                    <p className="font-mono text-xs font-bold text-amber-700">{turtleRatio.risk}</p>
                  </div>
                </div>

                {/* Visual Ratio Bar Chart */}
                <div className="lg:col-span-2 space-y-3">
                  <div className="flex justify-between font-mono text-xs font-bold">
                    <span className="text-blue-600">MACHOS (AZUL): {turtleRatio.male}%</span>
                    <span className="text-pink-600">FÊMEAS (ROSA): {turtleRatio.female}%</span>
                  </div>

                  {/* Ratio bar */}
                  <div className="h-10 border-2 border-slate-900 flex overflow-hidden shadow-[3px_3px_0px_0px_#0f172a]">
                    <div 
                      className="bg-blue-500 text-white font-mono font-black text-xs flex items-center justify-center transition-all duration-500"
                      style={{ width: `${turtleRatio.male}%` }}
                    >
                      {turtleRatio.male > 10 && `${turtleRatio.male}% ♂`}
                    </div>
                    <div 
                      className="bg-pink-500 text-white font-mono font-black text-xs flex items-center justify-center transition-all duration-500"
                      style={{ width: `${turtleRatio.female}%` }}
                    >
                      {turtleRatio.female > 10 && `${turtleRatio.female}% ♀`}
                    </div>
                  </div>

                  <p className="text-xs font-sans opacity-90 leading-relaxed">
                    Temperaturas extremas (&lt;18°C ou &gt;36°C) causam morte ou má-formação dos filhotes. O calor acelera a incubação enquanto o frio a atrasa. O aquecimento global desequilibra a proporção de nascimentos em todo o litoral.
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

        {}
        {activeStation === 'station3' && (
          <div className="space-y-8">
            
            {/* Header Station 3 */}
            <div className={`${cardBorder} p-4 ${isAlive ? 'bg-amber-100' : 'bg-zinc-900'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className={badgeClass}>3ª ESTAÇÃO DA APRESENTAÇÃO</span>
                  <h2 className="text-xl sm:text-3xl font-black uppercase mt-1">
                    O QUE SIGNIFICA PERDER O EQUILÍBRIO?
                  </h2>
                </div>
                <div className="font-mono text-xs bg-amber-300 text-slate-900 p-2 border-2 border-slate-900 font-bold">
                  SISTEMA INTERCONECTADO
                </div>
              </div>
            </div>

            {/* Scientific Log Timeline (Cards Interativos) */}
            <div className="space-y-4">
              <h3 className="text-lg font-black font-mono uppercase flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                REGISTRO DA LINHA DO TEMPO DOS CIENTISTAS DE ZUBINETA
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    step: "01",
                    title: "FASE NORMAL",
                    desc: "Mudanças de cor do Zibinômetro pareciam apenas uma característica curiosa de camuflagem.",
                    tag: "EQUILÍBRIO",
                    bg: "bg-emerald-100"
                  },
                  {
                    step: "02",
                    title: "MUDANÇA DE COR",
                    desc: "Registros apontaram alterações permanentes nos cromatóforos fora das variações normais da estação.",
                    tag: "REGISTRO",
                    bg: "bg-blue-100"
                  },
                  {
                    step: "03",
                    title: "MUDANÇA MAIOR",
                    desc: "Comparações entre dados históricos confirmaram que as condições térmicas do planeta estavam subindo.",
                    tag: "ALERTA TÉRMICO",
                    bg: "bg-amber-100"
                  },
                  {
                    step: "04",
                    title: "ALERTA GLOBAL",
                    desc: "Entendimento de que o planeta é um sistema: alterar a temperatura desequilibra toda a biodiversidade.",
                    tag: "CRÍTICO",
                    bg: "bg-red-100"
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveObservation(idx)}
                    className={`cursor-pointer transition-all p-4 border-2 ${
                      activeObservation === idx 
                        ? 'border-purple-600 ring-4 ring-purple-300 scale-[1.02] bg-white' 
                        : 'border-slate-900 bg-slate-50 opacity-90'
                    } ${cardBorder}`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs mb-2">
                      <span className="font-black text-lg bg-slate-900 text-white px-2">{item.step}</span>
                      <span className="font-bold border border-slate-900 px-1 text-[10px]">{item.tag}</span>
                    </div>
                    <h4 className="font-mono font-black text-sm uppercase">{item.title}</h4>
                    <p className="font-sans text-xs mt-2 opacity-80 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Matriz de Impacto Sistêmico */}
            <div className={`${cardBorder} p-6 ${isAlive ? 'bg-white' : 'bg-zinc-900'}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-slate-900/20 pb-4 mb-6 gap-3">
                <div>
                  <h3 className="text-xl font-black font-mono uppercase">MATRIZ DE RESPOSTA SISTÊMICA AO AUMENTO TÉRMICO</h3>
                  <p className="text-xs font-sans opacity-80">Clique nos pilares para investigar como a mudança de temperatura afeta cada componente:</p>
                </div>

                {/* Pillar Switcher Buttons */}
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {[
                    { id: 'materiais', label: 'MATERIAIS' },
                    { id: 'organismos', label: 'ORGANISMOS' },
                    { id: 'agua', label: 'ESTADOS DA ÁGUA' },
                    { id: 'equilibrio', label: 'EQUILÍBRIO TÉRMICO' },
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPillar(p.id)}
                      className={`px-3 py-1.5 font-bold border-2 transition-all ${
                        selectedPillar === p.id
                          ? 'bg-purple-600 text-white border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-slate-100 text-slate-800 border-slate-900 hover:bg-slate-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Content for Pillars */}
              <div className="p-4 border-2 border-slate-900 bg-slate-50 font-sans text-sm leading-relaxed">
                {selectedPillar === 'materiais' && (
                  <div className="space-y-2">
                    <h4 className="font-mono font-black text-purple-700 uppercase">RESPOSTA DOS MATERIAIS</h4>
                    <p>
                      Todos os materiais sólidos (metais, concreto, asfalto) se expandem com a agitação molecular do calor. Sem vãos de dilatação adequados em infraestruturas como pontes e trilhos, a expansão gera tensão mecânica destrutiva, causando deformações, rachaduras e riscos de desabamento.
                    </p>
                  </div>
                )}

                {selectedPillar === 'organismos' && (
                  <div className="space-y-2">
                    <h4 className="font-mono font-black text-purple-700 uppercase">RESPOSTA DOS ORGANISMOS</h4>
                    <p>
                      A temperatura dita a velocidade do metabolismo. Espécies psicrófilas, mesófilas e termófilas necessitam de faixas térmicas ótimas. Fora dessa faixa, ocorre torpor, perda de imunidade, alteração no sexo de répteis (tartarugas) e quebra do ciclo de vida de animais marinhos como o {config.mascotName}.
                    </p>
                  </div>
                )}

                {selectedPillar === 'agua' && (
                  <div className="space-y-2">
                    <h4 className="font-mono font-black text-purple-700 uppercase">MUDANÇAS DE ESTADO FÍSICO DA ÁGUA</h4>
                    <p>
                      O ganho de energia térmica acelera a fusão de geleiras e a evaporação dos oceanos, aumentando vapor de água na atmosfera, acidificando os ecossistemas aquáticos e desregulando o ciclo das chuvas em escala planetária.
                    </p>
                  </div>
                )}

                {selectedPillar === 'equilibrio' && (
                  <div className="space-y-2">
                    <h4 className="font-mono font-black text-purple-700 uppercase">QUEBRA DO EQUILÍBRIO TÉRMICO GLOBAL</h4>
                    <p>
                      Um sistema em equilíbrio redistribui calor de forma estável. Quando uma variável sofre alteração drástica (como gases estufa aprisionando calor), ocorre um efeito em cadeia que desorganiza a regulação climática de todo o planeta.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* VISÃO DO TELESCÓPIO INTERTEMPORAL (ZUBINETA ↔ TERRA) */}
            <div className={`${cardBorder} p-6 ${isAlive ? 'bg-blue-900 text-white' : 'bg-zinc-950 text-red-200'}`}>
              <div className="flex items-center justify-between border-b-2 border-white/20 pb-3 mb-4">
                <div className="flex items-center gap-2 font-mono font-bold text-xs">
                  <Eye className="w-5 h-5 text-amber-300 animate-pulse" />
                  <span>TELESCÓPIO INTERTEMPORAL: OBSERVAÇÃO DO PLANETA TERRA</span>
                </div>
                <span className="font-mono text-xs bg-amber-300 text-slate-900 px-2 py-0.5 border border-black font-bold">
                  SINAL TRANSMITIDO
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3 text-sm leading-relaxed">
                  <p>
                    Ao tentar entender o nosso próprio planeta, os cientistas de {config.planetName} miraram seus telescópios para o espaço e encontraram vocês, seres humanos da Terra!
                  </p>
                  <blockquote className="italic border-l-4 border-amber-300 pl-3 py-1 font-mono text-xs bg-white/10">
                    "Vimos que vocês também enfrentam ondas de calor, derretimento de calotas polares e ameaças à fauna marinha. Não precisamos procurar mais longe: podemos unir forças para salvar os dois mundos!"
                  </blockquote>
                </div>

                <div className="p-4 border-2 border-white/40 bg-black/50 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-amber-300 font-bold border-b border-white/20 pb-1">
                    <span>ALERTA TELESCÓPICO TERRESTRE</span>
                    <span className="animate-ping text-red-400">● AO VIVO</span>
                  </div>
                  <ul className="space-y-1.5 opacity-90 text-[11px]">
                    <li>• Temperatura média dos oceanos em alta histórica</li>
                    <li>• Ninhos de tartarugas marinhas com proporção crítica de sexos</li>
                    <li>• Acúmulo de microplásticos afetando criaturas sensíveis</li>
                    <li>• ODS 13 criado pela ONU para combater mudanças climáticas</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        )}

        {}
        {activeStation === 'station4' && (
          <div className="space-y-8">
            
            {/* Header Station 4 */}
            <div className={`${cardBorder} p-4 ${isAlive ? 'bg-emerald-100' : 'bg-zinc-900'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className={badgeClass}>4ª ESTAÇÃO DA APRESENTAÇÃO</span>
                  <h2 className="text-xl sm:text-3xl font-black uppercase mt-1">
                    ODS 13 & SOLUÇÕES PARA O FUTURO
                  </h2>
                </div>
                <div className="font-mono text-xs bg-emerald-300 text-slate-900 p-2 border-2 border-slate-900 font-bold">
                  AÇÃO CLIMÁTICA GLOBAL
                </div>
              </div>
            </div>

            {/* ODS 13 Panel */}
            <div className={`${cardBorder} p-6 ${isAlive ? 'bg-white' : 'bg-zinc-900'} space-y-4`}>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-400 text-slate-900 border-2 border-slate-900 font-mono font-black text-xl">
                  ODS 13
                </div>
                <div>
                  <h3 className="text-lg font-black font-mono uppercase">OBJETIVO DE DESENVOLVIMENTO SUSTENTÁVEL 13: AÇÃO CONTRA A MUDANÇA GLOBAL DO CLIMA</h3>
                  <p className="text-xs font-sans opacity-80">Proposta global criada na Terra que adotamos oficialmente em {config.planetName}.</p>
                </div>
              </div>

              <blockquote className="p-4 bg-emerald-50 border-l-4 border-emerald-600 font-sans text-sm leading-relaxed text-slate-800">
                "Nós aprendemos que <strong>ouvir os cientistas não significa aceitar tudo sem questionar</strong>. Significa ouvir as evidências, fazer perguntas e tomar decisões baseadas no conhecimento que temos!"
              </blockquote>
            </div>

            {/* MURAL DE SOLUÇÕES INTERATIVAS (Atividade com os Visitantes) */}
            <div className={`${cardBorder} p-6 ${isAlive ? 'bg-amber-50' : 'bg-zinc-900'}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-slate-900/20 pb-4 mb-6 gap-3">
                <div>
                  <span className={badgeClass}>ATIVIDADE INTERATIVA COM VISITANTES</span>
                  <h3 className="text-xl font-black font-mono uppercase mt-1">MURAL DE SOLUÇÕES PARA OS DOIS PLANETAS</h3>
                  <p className="text-xs font-sans opacity-80">Escolha um problema e digite a sua sugestão para ajudar os cientistas de Zubineta e da Terra!</p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs bg-white p-2 border-2 border-slate-900">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>VISITANTES ATIVOS NA FEIRA</span>
                </div>
              </div>

              {/* Form to submit visitor solution */}
              <form onSubmit={handleAddSolution} className="mb-6 p-4 bg-white border-2 border-slate-900 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-xs font-bold mb-1">QUAL PROBLEMA VOCÊ QUER RESOLVER?</label>
                    <select
                      value={selectedProblemId}
                      onChange={(e) => setSelectedProblemId(Number(e.target.value))}
                      className="w-full p-2 font-mono text-xs border-2 border-slate-900 bg-slate-50 text-slate-900"
                    >
                      {solutions.map(p => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold mb-1">SEU NOME OU ESCOLA (OPCIONAL):</label>
                    <input
                      type="text"
                      placeholder="Ex: Visitante Pedro / Turma 5º Ano"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full p-2 font-mono text-xs border-2 border-slate-900 bg-slate-50 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold mb-1">SUA DICA OU SOLUÇÃO ECOLÓGICA:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ex: Economizar água, reciclar plástico, plantar árvores..."
                      value={newSolutionText}
                      onChange={(e) => setNewSolutionText(e.target.value)}
                      className="flex-1 p-2 font-mono text-xs border-2 border-slate-900 bg-slate-50 text-slate-900"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 font-mono text-xs font-black uppercase bg-purple-600 hover:bg-purple-500 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] flex items-center gap-1 shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      ENVIAR DICA
                    </button>
                  </div>
                </div>
              </form>

              {/* Grid of problem cards with solutions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {solutions.map(prob => (
                  <div key={prob.id} className="p-4 bg-white border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[10px] bg-purple-200 text-slate-900 px-1.5 py-0.5 border border-slate-900 font-bold block w-max mb-2">
                        CARTÃO DE DESAFIO CLIMÁTICO
                      </span>
                      <h4 className="font-mono font-black text-sm uppercase text-slate-900">{prob.title}</h4>
                      <p className="font-sans text-xs text-slate-700 mt-1 mb-3 leading-relaxed">{prob.desc}</p>
                      
                      <div className="border-t border-slate-900/20 pt-2 space-y-1">
                        <span className="font-mono text-[11px] font-bold block text-purple-700">SOLUÇÕES DOS VISITANTES ({prob.solutions.length}):</span>
                        <ul className="space-y-1 max-h-40 overflow-y-auto pr-1">
                          {prob.solutions.map((sol, sIdx) => (
                            <li key={sIdx} className="text-xs font-mono bg-slate-100 p-1.5 border border-slate-300 flex items-start gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-tight">{sol}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* CARTAZ FINAL & COMPROMISSO ECOLÓGICO */}
            <div className={`${cardBorder} p-8 ${isAlive ? 'bg-purple-900 text-white' : 'bg-red-950 text-white'} text-center space-y-6 relative overflow-hidden`}>
              
              <div className="max-w-2xl mx-auto space-y-4 relative z-10">
                <span className="font-mono text-xs bg-yellow-300 text-slate-900 font-black px-3 py-1 border-2 border-black inline-block uppercase">
                  MENSAGEM FINAL DA APRESENTAÇÃO
                </span>

                <h2 className="text-2xl sm:text-4xl font-black font-mono uppercase tracking-tight">
                  "VOCÊ FARIA ISSO PELO SEU PLANETA?"
                </h2>

                <p className="text-sm sm:text-base font-medium opacity-90 leading-relaxed font-sans">
                  <em>"O que acontece se um planeta perder o seu equilíbrio?"</em> <br />
                  A verdade é que nós não queremos descobrir a resposta dessa pergunta. <strong>Nós nos manteremos em equilíbrio!</strong>
                </p>

                {/* Eco Pledge Counter & Trigger Button */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handlePledge}
                    className="px-6 py-3 font-mono text-sm font-black uppercase bg-yellow-400 hover:bg-yellow-300 text-slate-900 border-2 border-black shadow-[4px_4px_0px_0px_#000000] flex items-center gap-2 transform active:translate-y-0.5 transition-all"
                  >
                    <Award className="w-5 h-5" />
                    {hasPledged ? 'COMPROMISSO ASSINADO! 🌿' : 'ASSINAR COMPROMISSO ECOLÓGICO'}
                  </button>

                  <button
                    onClick={() => setShowThermometerBookmark(true)}
                    className="px-4 py-3 font-mono text-xs font-bold uppercase bg-white hover:bg-slate-100 text-slate-900 border-2 border-black shadow-[4px_4px_0px_0px_#000000] flex items-center gap-1.5"
                  >
                    <Bookmark className="w-4 h-4 text-purple-600" />
                    VER MARCADOR / TERMÔMETRO VIRTUAL
                  </button>
                </div>

                <div className="font-mono text-xs opacity-80 pt-2">
                  <span>TOTAL DE PROMESSAS INTERPLANETÁRIAS ASSINADAS: </span>
                  <strong className="text-yellow-300 text-base">{pledgeCount}</strong>
                </div>

                <div className="pt-4 border-t border-white/20 text-xs font-mono opacity-75">
                  Saudações dos cientistas de Zubineta e do mascote <strong>{config.mascotName}</strong>!
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {}
      {isConfigOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] max-w-lg w-full p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <div className="flex items-center gap-2 font-mono font-black text-sm">
                <Edit3 className="w-5 h-5 text-purple-600" />
                <span>PAINEL DE CONFIGURAÇÃO DA APRESENTAÇÃO</span>
              </div>
              <button 
                onClick={() => setIsConfigOpen(false)}
                className="p-1 border-2 border-slate-900 bg-slate-100 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs font-sans text-slate-600">
              Edite os nomes abaixo para personalizar a apresentação em tempo real em todas as estações e no discurso dos alunos.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="block font-bold mb-1">NOME DO PLANETA:</label>
                <input
                  type="text"
                  value={config.planetName}
                  onChange={(e) => setConfig({ ...config, planetName: e.target.value })}
                  className="w-full p-2 border-2 border-slate-900 bg-slate-50 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">NOME DO MASCOTE / BICHINHO TERMÔMETRO:</label>
                <input
                  type="text"
                  value={config.mascotName}
                  onChange={(e) => setConfig({ ...config, mascotName: e.target.value })}
                  className="w-full p-2 border-2 border-slate-900 bg-slate-50 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">NOME DOS ALUNOS / CIENTISTAS:</label>
                <input
                  type="text"
                  value={config.scientists}
                  onChange={(e) => setConfig({ ...config, scientists: e.target.value })}
                  className="w-full p-2 border-2 border-slate-900 bg-slate-50 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">INSTITUIÇÃO / FEIRA DE CIÊNCIAS:</label>
                <input
                  type="text"
                  value={config.institution}
                  onChange={(e) => setConfig({ ...config, institution: e.target.value })}
                  className="w-full p-2 border-2 border-slate-900 bg-slate-50 font-bold text-sm"
                />
              </div>
            </div>

            <div className="pt-3 border-t-2 border-slate-900 flex justify-end">
              <button
                onClick={() => setIsConfigOpen(false)}
                className="px-5 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-mono font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-xs uppercase"
              >
                SALVAR E ATUALIZAR PAINEL
              </button>
            </div>

          </div>
        </div>
      )}

      {}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-amber-50 text-slate-900 border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] max-w-xl w-full p-6 space-y-4 relative text-center">
            
            <button 
              onClick={() => setShowCertificate(false)}
              className="absolute top-3 right-3 p-1 border-2 border-slate-900 bg-white hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-2 border-slate-900 p-6 bg-white space-y-4">
              <div className="inline-block p-3 bg-purple-200 border-2 border-slate-900">
                <Award className="w-10 h-10 text-purple-700" />
              </div>

              <span className="font-mono text-xs font-bold bg-amber-300 text-slate-900 px-2 py-0.5 border border-slate-900 block w-max mx-auto uppercase">
                CERTIFICADO DE GUARDIÃO INTERPLANETÁRIO
              </span>

              <h3 className="text-2xl font-black font-mono uppercase">COMPROMISSO PELO EQUILÍBRIO TÉRMICO</h3>

              <p className="font-sans text-sm leading-relaxed text-slate-700">
                Certificamos que o visitante da Feira de Ciências comprometeu-se oficialmente a proteger o clima do planeta <strong>Terra</strong> e do planeta <strong>{config.planetName}</strong>, ouvindo as evidências científicas e praticando o consumo consciente.
              </p>

              <div className="pt-4 border-t-2 border-slate-900/20 flex justify-between items-center text-xs font-mono">
                <span>Cientistas: <strong>{config.scientists}</strong></span>
                <span>Mascote: <strong>{config.mascotName}</strong></span>
              </div>
            </div>

            <button
              onClick={() => setShowCertificate(false)}
              className="px-6 py-2 bg-purple-600 text-white font-mono font-bold text-xs border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] uppercase"
            >
              CONCLUIR E FECHAR
            </button>

          </div>
        </div>
      )}

      {}
      {showThermometerBookmark && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] max-w-sm w-full p-5 space-y-4 relative text-center font-mono">
            
            <button 
              onClick={() => setShowThermometerBookmark(false)}
              className="absolute top-3 right-3 p-1 border-2 border-slate-900 bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold bg-purple-200 px-2 py-0.5 border border-slate-900 inline-block">
              REMBRANÇA DA APRESENTAÇÃO
            </span>

            <h3 className="text-base font-black uppercase">MARCADOR DE PÁGINA TERMOMÉTRICO</h3>

            {/* Virtual Bookmark Graphic */}
            <div className="w-32 mx-auto bg-amber-100 border-2 border-slate-900 p-3 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col items-center gap-2">
              <Thermometer className="w-8 h-8 text-purple-700" />
              <div className="text-[10px] font-bold border-b border-slate-900 pb-1 w-full text-center">
                PLANETA {config.planetName.toUpperCase()}
              </div>

              {/* Ruler markings */}
              <div className="w-full space-y-1 text-[9px] text-left">
                <div className="flex justify-between border-b border-slate-300">
                  <span>100°C</span>
                  <span>Fervura</span>
                </div>
                <div className="flex justify-between border-b border-slate-300">
                  <span>37°C</span>
                  <span>Corpo</span>
                </div>
                <div className="flex justify-between border-b border-slate-300">
                  <span>25°C</span>
                  <span>{config.mascotName} Ótimo</span>
                </div>
                <div className="flex justify-between">
                  <span>0°C</span>
                  <span>Gelo</span>
                </div>
              </div>

              <div className="text-[8px] bg-slate-900 text-white p-1 w-full mt-2">
                "Mantenha o equilíbrio!"
              </div>
            </div>

            <p className="text-[11px] font-sans opacity-80">
              Ofereça este modelo impresso ou virtual aos visitantes da banca como lembrança educativa da termologia.
            </p>

            <button
              onClick={() => setShowThermometerBookmark(false)}
              className="w-full py-2 bg-emerald-400 text-slate-900 font-bold border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-xs uppercase"
            >
              FECHAR LEMBRETE
            </button>

          </div>
        </div>
      )}

      {}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 pt-6 border-t-2 border-slate-900/20 text-center font-mono text-xs opacity-75">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>PAINEL AUXILIAR DE APRESENTAÇÃO DE INICIAÇÃO CIENTÍFICA INFANTIL</span>
          <span>PLANETA {config.planetName.toUpperCase()} • CIENTISTAS: {config.scientists.toUpperCase()}</span>
        </div>
      </footer>

    </div>
  );
}