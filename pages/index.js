import { useState } from "react";
import Head from "next/head";

const C = {
  navy:"#16314F", navyDk:"#0E2238", navyLt:"#EEF3F8",
  cream:"#FBF7EF", paper:"#FFFFFF", ink:"#2B2A28",
  muted:"#6F6457", gold:"#C99A3F", goldLt:"#FDF3DC",
  teal:"#2F6E78", tealLt:"#E0F0F2",
  olive:"#5E7B3A", oliveLt:"#EAF2E2",
  terra:"#B5532A", terraLt:"#F5EDE8",
  line:"#E4DCCB",
};
const AC  = [C.teal, C.olive, C.terra];
const ACL = [C.tealLt, C.oliveLt, C.terraLt];

const LANGS = [
  { id:"tempo",    icon:"⏱️", label:"Tempo de qualidade",    desc:"Conversas sem interrupções, atenção total" },
  { id:"toque",    icon:"🤝", label:"Toque físico",          desc:"Abraços e carinhos intencionais" },
  { id:"presente", icon:"🎁", label:"Receber presentes",     desc:"Lembranças inesperadas, «pensei em você»" },
  { id:"servico",  icon:"💼", label:"Atos de serviço",       desc:"Ajudar nas tarefas sem ser pedido" },
  { id:"palavra",  icon:"💬", label:"Palavras de afirmação", desc:"Elogios sinceros e encorajamento" },
];
const PRACTICES = [
  "Peço perdão espontaneamente",
  "Sirvo sem esperar reconhecimento",
  "Domino meu temperamento",
  "Sou pacificador(a) no lar",
  "Dedico tempo de qualidade ao cônjuge",
];
const TEMPESTADES = [
  { id:"c", icon:"⚡", label:"Climática",        desc:"Crises repentinas e imprevisíveis" },
  { id:"t", icon:"⏳", label:"Cronológica",       desc:"Erosão gradual, distanciamento acumulado" },
  { id:"a", icon:"🌧️", label:"Ambas igualmente", desc:"Vivemos os dois tipos" },
];
const RESPONSES = [
  { id:"r", label:"Recuo / Me distancio" },
  { id:"c", label:"Conflito / Explodo" },
  { id:"e", label:"Busco apoio externo" },
  { id:"a", label:"Me aproximo do cônjuge" },
  { id:"j", label:"Resistência alegre" },
];
const ANAMES   = ["Ouvir com Sensibilidade","Praticar as Bases Diárias","As Provas do Tempo"];
const AKICKERS = ["Alicerce 1 · Ouvir","Alicerce 2 · Praticar","Alicerce 3 · Resistir"];
const emptyP   = () => ({ lang:null, listenScore:0, scores:[0,0,0,0,0], tempestade:null, response:null, commits:["","",""] });

// ── GERADOR LOCAL DE INSIGHTS (sem API) ──────────────────────────────────────
function gerarInsights(na, nb, data) {
  const langA = LANGS.find(l => l.id === data.a.lang);
  const langB = LANGS.find(l => l.id === data.b.lang);
  const tempA = TEMPESTADES.find(t => t.id === data.a.tempestade);
  const tempB = TEMPESTADES.find(t => t.id === data.b.tempestade);
  const respA = RESPONSES.find(r => r.id === data.a.response);
  const respB = RESPONSES.find(r => r.id === data.b.response);

  const sameLang = data.a.lang === data.b.lang;
  const avgScores = PRACTICES.map((_, i) => (data.a.scores[i] + data.b.scores[i]) / 2);
  const bestIdx  = avgScores.indexOf(Math.max(...avgScores));
  const worstIdx = avgScores.indexOf(Math.min(...avgScores));
  const sameTemp = data.a.tempestade === data.b.tempestade;
  const escutaMedia = (data.a.listenScore + data.b.listenScore) / 2;
  const praticaMedia = avgScores.reduce((a,b)=>a+b,0) / avgScores.length;

  // respostas resilientes (aproximar / resistência alegre) contam pontos
  const respScore = (id) => (id === "j" ? 5 : id === "a" ? 4 : id === "e" ? 3 : id === "c" ? 2 : 1);
  const resilienciaMedia = (respScore(data.a.response) + respScore(data.b.response)) / 2;

  // ── Alicerce 1
  const a1_titulo = sameLang
    ? "Uma linguagem em comum — um presente a cultivar"
    : "Duas linguagens, uma oportunidade de conexão";
  const a1_corpo = sameLang
    ? `${na} e ${nb} compartilham a mesma linguagem de amor: ${langA?.label}. Vocês já falam a língua um do outro. O desafio agora é exercê-la com intencionalidade nos dias de rotina e cansaço, não apenas nos momentos especiais.`
    : `${na} se sente amado(a) através de ${langA?.label?.toLowerCase()}, enquanto ${nb} se sente amado(a) através de ${langB?.label?.toLowerCase()}. O que é amor para um pode passar despercebido pelo outro. Agora que vocês sabem, podem amar de uma forma que o outro realmente recebe.`;
  const a1_rocha = escutaMedia >= 4
    ? `Casais que ouvem de verdade constroem sobre a rocha do diálogo. ${na} e ${nb} já demonstram essa escuta — é o primeiro alicerce sendo cavado fundo. Ouvir a Deus pela Palavra e ouvir um ao outro com atenção genuína é o que sustenta o lar quando as palavras ficam difíceis.`
    : `A escuta é o primeiro alicerce — e ainda há terreno a cavar aqui. Quem constrói na rocha ouve para compreender, não para vencer a discussão (Tiago 1:19). Quando ${na} e ${nb} desacelerarem para ouvir a dor por trás das palavras, esse fundamento ganhará firmeza.`;

  // ── Alicerce 2
  const bestPractice  = PRACTICES[bestIdx];
  const worstPractice = PRACTICES[worstIdx];
  const a2_titulo = `Força em "${bestPractice.toLowerCase()}"`;
  const a2_corpo  = `O ponto mais forte do casal é "${bestPractice.toLowerCase()}" — uma base sólida. A área que mais pede atenção é "${worstPractice.toLowerCase()}". Trabalhar essa prática juntos, com pequenos gestos diários, pode transformar o clima do lar ao longo do tempo.`;
  const a2_rocha = praticaMedia >= 4
    ? `Cavar fundo é o trabalho invisível que ninguém vê, mas que sustenta tudo o que aparece. ${na} e ${nb} já praticam isso com constância — humildade, misericórdia e pacificação são as marcas de quem edifica na rocha, e não na areia da conveniência.`
    : `A casa na rocha não se sustenta pela beleza da fachada, mas pelo esforço diário e escondido. Cada vez que ${na} e ${nb} escolherem perdoar, servir e pacificar — especialmente em "${worstPractice.toLowerCase()}" — estarão removendo a areia e firmando o concreto sobre a Rocha.`;

  // ── Alicerce 3
  const a3_titulo = sameTemp
    ? "Ambos reconhecem o mesmo tipo de desafio"
    : "Percepções diferentes — força complementar";
  const a3_corpo = sameTemp
    ? `${na} e ${nb} identificam as mesmas tempestades: ${tempA?.label?.toLowerCase()}. O casal que nomeia seus desafios junto já está construindo sobre a rocha. A questão não é se a chuva virá, mas se o alicerce estará firme.`
    : `${na} sente mais os desafios ${tempA?.label?.toLowerCase()} e ${nb} os ${tempB?.label?.toLowerCase()}. Essa diferença pode se tornar uma força — cada um alerta o outro para o que talvez não veja chegar. Juntos, o campo de visão é maior.`;
  const a3_rocha = resilienciaMedia >= 4
    ? `A mesma chuva cai sobre as duas casas — a diferença está no alicerce. ${na} e ${nb} já reagem às crises se voltando um para o outro, e essa é a marca da casa firmada na Rocha. A tempestade testa, mas não derruba quem permanece em Cristo.`
    : `Jesus não promete um lar sem tempestades, mas um lar que não desmorona quando elas vêm. Quando o instinto de ${na} e ${nb} for recuar ou explodir, lembrar de se aproximar — e clamar à Rocha Eterna — transformará cada crise em oportunidade de firmar ainda mais o fundamento.`;

  // ── Ação da semana baseada na prática mais fraca
  const acoes = [
    `Esta semana, quando errar com o(a) cônjuge, seja o(a) primeiro(a) a pedir perdão — sem esperar que o outro venha primeiro.`,
    `Esta semana, faça algo pelo lar ou pelo(a) cônjuge sem ser pedido e sem mencionar depois. O ato invisível é o que constrói.`,
    `Esta semana, combinem uma palavra de sinal para quando um dos dois estiver no limite — e o outro se compromete a abaixar o tom naquele momento.`,
    `Esta semana, quando surgir uma discussão, um dos dois deve dizer primeiro: "Não quero brigar com você. Quero resolver isso juntos."`,
    `Esta semana, reservem 20 minutos sem telas, sem agenda, sem resolver problemas — só para estar junto e conversar.`,
  ];
  const acao_semana = acoes[worstIdx] || acoes[4];

  // ── Fechamento
  const fechamentos = {
    r: `${na} e ${nb}, recuar é natural — mas a Rocha não se move. Que vocês encontrem em Cristo a coragem de permanecer um perto do outro mesmo quando o instinto é se distanciar.`,
    c: `${na} e ${nb}, a intensidade que aparece nos conflitos é a mesma que pode mover montanhas quando direcionada para o mesmo lado. Que Cristo os ajude a transformar essa força em construção.`,
    e: `${na} e ${nb}, buscar apoio é sabedoria — e a maior fonte de apoio é a Rocha Eterna. Que vocês encontrem em Cristo e um no outro o suporte que o lar precisa para permanecer de pé.`,
    a: `${na} e ${nb}, o instinto de se aproximar nas tempestades é exatamente o que a Rocha pede. Continuem se voltando um para o outro — e para Cristo — quando o vento soprar forte.`,
    j: `${na} e ${nb}, a resistência alegre que vocês demonstram é o sinal de um alicerce que já está sendo construído na Rocha. «...ela não cairá, pois foi construída sobre rocha firme.» — Mateus 7:25`,
  };
  const respId = data.a.response === data.b.response ? data.a.response : (data.a.response || data.b.response);
  const fechamento = fechamentos[respId] || `${na} e ${nb}, que Cristo, a Rocha Eterna, seja o fundamento de cada decisão do lar de vocês. Ele sustenta o que o vento mais forte não consegue derrubar. — Mateus 7:25`;

  // ── DIAGNÓSTICO GERAL (consolidado)
  const solidez = Math.round(((escutaMedia + praticaMedia + resilienciaMedia) / 15) * 100);
  let nivel, nivelDesc, nivelCor;
  if (solidez >= 80) {
    nivel = "Casa firmada na Rocha";
    nivelCor = C.olive;
    nivelDesc = `${na} e ${nb}, o lar de vocês demonstra um alicerce sólido nos três fundamentos. Vocês ouvem, praticam e resistem juntos. Continuem cavando fundo — a casa que vocês constroem resistirá às tempestades porque está sobre a Rocha que é Cristo.`;
  } else if (solidez >= 55) {
    nivel = "Alicerce em formação";
    nivelCor = C.gold;
    nivelDesc = `${na} e ${nb}, vocês já lançaram bons fundamentos, mas há áreas onde a areia ainda precisa dar lugar à rocha. O trabalho diário e intencional nos pontos mais frágeis transformará esse alicerce em algo inabalável. Vocês estão no caminho certo.`;
  } else {
    nivel = "Terreno a firmar";
    nivelCor = C.terra;
    nivelDesc = `${na} e ${nb}, este é um convite — não uma condenação. Toda casa firme começou com terreno a cavar. Há áreas importantes para fortalecer nos três alicerces, e o simples fato de estarem fazendo isso juntos já é o primeiro passo para sair da areia rumo à Rocha.`;
  }

  return {
    a1_titulo, a1_corpo, a1_rocha,
    a2_titulo, a2_corpo, a2_rocha,
    a3_titulo, a3_corpo, a3_rocha,
    acao_semana, fechamento,
    solidez, nivel, nivelDesc, nivelCor,
    escutaMedia, praticaMedia, resilienciaMedia,
  };
}

// ── UI ATOMS ─────────────────────────────────────────────────────────────────
function AlicerceTag({ idx }) {
  return <span style={{ display:"inline-block", padding:"3px 10px", borderRadius:20, background:ACL[idx], color:AC[idx], fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase" }}>{AKICKERS[idx]}</span>;
}
function RochaBox({ idx, texto }) {
  return (
    <Card style={{ background:ACL[idx], borderColor:AC[idx], marginTop:10 }}>
      <p style={{ fontWeight:700, fontSize:13, color:AC[idx], margin:"0 0 6px", display:"flex", alignItems:"center", gap:6 }}>
        <span>⛰️</span> Como isso firma a casa na Rocha
      </p>
      <p style={{ fontSize:13, color:C.ink, margin:0, lineHeight:1.5 }}>{texto}</p>
    </Card>
  );
}
function ScoreDots({ value, onChange, color }) {
  return (
    <div style={{ display:"flex", gap:8, justifyContent:"center", padding:"6px 0" }}>
      {[1,2,3,4,5].map(n=>(
        <button key={n} onClick={()=>onChange(n)} style={{ width:40, height:40, borderRadius:"50%", border:"2px solid", borderColor:n<=value?color:C.line, background:n<=value?color:"transparent", cursor:"pointer", color:n<=value?"#fff":C.muted, fontSize:14, fontWeight:700 }}>{n}</button>
      ))}
    </div>
  );
}
function LangCard({ item, selected, onSelect }) {
  return (
    <button onClick={()=>onSelect(item.id)} style={{ display:"flex", alignItems:"center", gap:12, width:"100%", background:selected?C.navyLt:C.paper, border:`2px solid ${selected?C.navy:C.line}`, borderRadius:12, padding:"12px 14px", cursor:"pointer", textAlign:"left" }}>
      <span style={{ fontSize:22, flexShrink:0 }}>{item.icon}</span>
      <div style={{ flex:1 }}>
        <div style={{ fontWeight:700, fontSize:14, color:selected?C.navy:C.ink }}>{item.label}</div>
        <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>{item.desc}</div>
      </div>
      {selected && <span style={{ color:C.navy, fontWeight:700 }}>✓</span>}
    </button>
  );
}
function OptionPill({ label, selected, onSelect, color }) {
  return <button onClick={onSelect} style={{ width:"100%", padding:"13px 16px", borderRadius:10, border:`2px solid ${selected?color:C.line}`, background:selected?color:C.paper, color:selected?"#fff":C.ink, fontWeight:selected?700:400, fontSize:14, cursor:"pointer", textAlign:"left" }}>{label}</button>;
}
function Btn({ children, onClick, disabled, color }) {
  return <button onClick={onClick} disabled={disabled} style={{ width:"100%", padding:"16px 20px", borderRadius:12, background:disabled?C.line:(color||C.navy), border:"none", color:disabled?C.muted:"#fff", fontSize:15, fontWeight:700, cursor:disabled?"default":"pointer" }}>{children}</button>;
}
function Card({ children, style={} }) {
  return <div style={{ background:C.paper, borderRadius:16, border:`1px solid ${C.line}`, padding:"18px 16px", ...style }}>{children}</div>;
}
function ProgressBar({ step, total }) {
  const pct = Math.round((step/(total-1))*100);
  return (
    <div className="no-print" style={{ padding:"10px 20px 0" }}>
      <div style={{ height:4, borderRadius:2, background:C.line, overflow:"hidden" }}>
        <div style={{ height:"100%", borderRadius:2, background:C.gold, width:`${pct}%`, transition:"width .4s" }}/>
      </div>
      <div style={{ fontSize:11, color:C.muted, marginTop:3, textAlign:"right" }}>{pct}%</div>
    </div>
  );
}
function Header() {
  return (
    <div style={{ background:C.navy, padding:"14px 20px 10px" }}>
      <div style={{ fontSize:10, letterSpacing:".18em", color:"#7FA0BC", textTransform:"uppercase", marginBottom:3 }}>Palestra para Casais</div>
      <div style={{ color:"#fff", fontWeight:800, fontSize:17 }}>Família Inabalável</div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [step,     setStep]     = useState(0);
  const [pass,     setPass]     = useState(null);
  const [names,    setNames]    = useState({ a:"", b:"" });
  const [data,     setData]     = useState({ a:emptyP(), b:emptyP() });
  const [insights, setInsights] = useState(null);

  const na = names.a || "Cônjuge A";
  const nb = names.b || "Cônjuge B";
  const TOTAL = 12;

  const setP      = (person,field,val) => setData(d=>({...d,[person]:{...d[person],[field]:val}}));
  const setScore  = (person,idx,val)   => setData(d=>({...d,[person]:{...d[person],scores:d[person].scores.map((s,i)=>i===idx?val:s)}}));
  const setCommit = (idx,val)          => setData(d=>({...d,a:{...d.a,commits:d.a.commits.map((c,i)=>i===idx?val:c)}}));

  const goNext = (pc) => { if(pc){setPass(pc);return;} setStep(s=>s+1); };
  const confirmPass = () => { setPass(null); setStep(s=>s+1); };

  function concluirAlicerce3() {
    setInsights(gerarInsights(na, nb, data));
    setStep(9);
  }

  const printStyles = `
    @media print {
      .no-print { display: none !important; }
      body { background: #fff !important; }
      .print-area { max-width: 100% !important; }
      @page { margin: 1.5cm; }
    }
  `;

  if (pass) return (
    <div style={{ minHeight:"100vh", background:pass.color, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, fontFamily:"system-ui,sans-serif" }}>
      <div style={{ width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:40, marginBottom:24 }}>📱</div>
      <div style={{ color:"rgba(255,255,255,.6)", fontSize:12, letterSpacing:".15em", textTransform:"uppercase", marginBottom:10 }}>Passe o celular para</div>
      <div style={{ color:"#fff", fontSize:36, fontWeight:800, marginBottom:12 }}>{pass.to}</div>
      {pass.sub && <div style={{ color:"rgba(255,255,255,.75)", fontSize:14, textAlign:"center", maxWidth:270, lineHeight:1.5, marginBottom:34 }}>{pass.sub}</div>}
      <button onClick={confirmPass} style={{ background:"#fff", color:pass.color, border:"none", borderRadius:12, padding:"14px 40px", fontSize:15, fontWeight:700, cursor:"pointer" }}>Estou pronto(a) ✓</button>
    </div>
  );

  const wrap = (children, noP) => (
    <>
      <Head><title>Família Inabalável · IEQ Templo Gospel</title><meta name="viewport" content="width=device-width,initial-scale=1"/></Head>
      <style>{printStyles}</style>
      <div className="print-area" style={{ maxWidth:460, margin:"0 auto", fontFamily:"system-ui,sans-serif", minHeight:"100vh", background:C.cream }}>
        <Header/>
        {!noP && <ProgressBar step={step} total={TOTAL}/>}
        <div style={{ padding:"14px 16px 48px" }}>{children}</div>
      </div>
    </>
  );

  // S0 ── BOAS-VINDAS
  if (step===0) return wrap(<>
    <div style={{ textAlign:"center", padding:"20px 0 16px" }}>
      <div style={{ fontSize:52, marginBottom:10 }}>🏠</div>
      <h1 style={{ color:C.navy, fontSize:24, fontWeight:800, margin:"0 0 8px", lineHeight:1.15 }}>Jornada Interativa do Casal</h1>
      <p style={{ color:C.muted, fontSize:13, margin:0, lineHeight:1.5 }}>Cada um responde na sua vez. Ao final, vocês recebem uma análise personalizada e um diagnóstico para guardar.</p>
    </div>
    <Card style={{ marginBottom:12 }}>
      <p style={{ fontSize:14, color:C.muted, fontStyle:"italic", textAlign:"center", margin:"0 0 4px", lineHeight:1.5 }}>«Quem ouve minhas palavras e as pratica é tão sábio como a pessoa que constrói sua casa sobre uma rocha firme.»</p>
      <p style={{ fontSize:12, color:C.gold, textAlign:"center", fontWeight:700, margin:0 }}>Mateus 7:24</p>
    </Card>
    <Card style={{ marginBottom:20 }}>
      <p style={{ fontSize:13, color:C.muted, marginBottom:14, textAlign:"center" }}>Como se chamam?</p>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {["a","b"].map((p,i)=>(
          <div key={p}>
            <label style={{ fontSize:12, fontWeight:700, color:C.muted, display:"block", marginBottom:4 }}>{i===0?"Cônjuge A":"Cônjuge B"}</label>
            <input value={names[p]} onChange={e=>setNames(n=>({...n,[p]:e.target.value}))} placeholder="Nome..." style={{ width:"100%", padding:"13px 14px", borderRadius:10, border:`2px solid ${C.line}`, fontSize:15, background:C.paper, outline:"none", boxSizing:"border-box" }}/>
          </div>
        ))}
      </div>
    </Card>
    <Btn onClick={()=>goNext({to:names.a||"Cônjuge A",color:C.navy,sub:"Você vai responder as perguntas do Alicerce 1 — Ouvir com Sensibilidade."})}>Começar →</Btn>
  </>, true);

  // S1 ── A / ALICERCE 1
  if (step===1) {
    const d=data.a, ok=d.lang&&d.listenScore>0;
    return wrap(<>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>{na}</div>
        <AlicerceTag idx={0}/>
        <h2 style={{ color:C.ink, fontSize:21, fontWeight:800, margin:"8px 0 4px" }}>Ouvir com Sensibilidade</h2>
        <p style={{ color:C.muted, fontSize:13, margin:0 }}>Responda com sinceridade — {nb} não verá até a revelação.</p>
      </div>
      <Card style={{ marginBottom:12 }}>
        <p style={{ fontWeight:700, fontSize:14, color:C.ink, marginBottom:12 }}>Qual é a sua principal linguagem de amor?</p>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {LANGS.map(l=><LangCard key={l.id} item={l} selected={d.lang===l.id} onSelect={v=>setP("a","lang",v)}/>)}
        </div>
      </Card>
      <Card style={{ marginBottom:18 }}>
        <p style={{ fontWeight:700, fontSize:14, color:C.ink, marginBottom:4, textAlign:"center" }}>Com que frequência ouço para compreender,<br/>e não para responder?</p>
        <p style={{ fontSize:11, color:C.muted, textAlign:"center", margin:"0 0 8px" }}>1 = raramente · 5 = sempre</p>
        <ScoreDots value={d.listenScore} onChange={v=>setP("a","listenScore",v)} color={C.teal}/>
      </Card>
      <Btn onClick={()=>goNext({to:nb,color:C.teal,sub:"Agora é a sua vez — Alicerce 1, ouvir com sensibilidade."})} disabled={!ok}>{ok?`Passar para ${nb} →`:"Complete tudo para continuar"}</Btn>
    </>);
  }

  // S2 ── B / ALICERCE 1
  if (step===2) {
    const d=data.b, ok=d.lang&&d.listenScore>0;
    return wrap(<>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>{nb}</div>
        <AlicerceTag idx={0}/>
        <h2 style={{ color:C.ink, fontSize:21, fontWeight:800, margin:"8px 0 4px" }}>Ouvir com Sensibilidade</h2>
        <p style={{ color:C.muted, fontSize:13, margin:0 }}>{na} já respondeu. Agora é a sua vez.</p>
      </div>
      <Card style={{ marginBottom:12 }}>
        <p style={{ fontWeight:700, fontSize:14, color:C.ink, marginBottom:12 }}>Qual é a sua principal linguagem de amor?</p>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {LANGS.map(l=><LangCard key={l.id} item={l} selected={d.lang===l.id} onSelect={v=>setP("b","lang",v)}/>)}
        </div>
      </Card>
      <Card style={{ marginBottom:18 }}>
        <p style={{ fontWeight:700, fontSize:14, color:C.ink, marginBottom:4, textAlign:"center" }}>Com que frequência ouço para compreender,<br/>e não para responder?</p>
        <p style={{ fontSize:11, color:C.muted, textAlign:"center", margin:"0 0 8px" }}>1 = raramente · 5 = sempre</p>
        <ScoreDots value={d.listenScore} onChange={v=>setP("b","listenScore",v)} color={C.teal}/>
      </Card>
      <Btn onClick={()=>goNext(null)} disabled={!ok}>{ok?"Ver a revelação →":"Complete tudo para continuar"}</Btn>
    </>);
  }

  // S3 ── REVELAÇÃO 1
  if (step===3) {
    const la=LANGS.find(l=>l.id===data.a.lang), lb=LANGS.find(l=>l.id===data.b.lang);
    const same=data.a.lang===data.b.lang;
    const ins=gerarInsights(na,nb,data);
    return wrap(<>
      <div style={{ marginBottom:12 }}><AlicerceTag idx={0}/><h2 style={{ color:C.teal, fontSize:21, fontWeight:800, margin:"8px 0" }}>Revelação — Ouvir</h2></div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
        {[[na,la,data.a.listenScore],[nb,lb,data.b.listenScore]].map(([name,lang,score],i)=>(
          <Card key={i} style={{ textAlign:"center", borderTop:`4px solid ${C.teal}`, padding:"14px 10px" }}>
            <div style={{ fontWeight:800, fontSize:13, color:C.navy, marginBottom:8 }}>{name}</div>
            <div style={{ fontSize:26, marginBottom:4 }}>{lang?.icon}</div>
            <div style={{ fontWeight:700, fontSize:12, color:C.teal, marginBottom:10 }}>{lang?.label}</div>
            <div style={{ fontSize:11, color:C.muted, marginBottom:6 }}>Escuta ativa</div>
            <div style={{ display:"flex", justifyContent:"center", gap:3 }}>
              {[1,2,3,4,5].map(n=><div key={n} style={{ width:16, height:16, borderRadius:"50%", background:n<=score?C.teal:C.line }}/>)}
            </div>
            <div style={{ fontSize:12, fontWeight:700, color:C.teal, marginTop:5 }}>{score}/5</div>
          </Card>
        ))}
      </div>
      <Card style={{ background:same?C.tealLt:C.navyLt, borderColor:same?C.teal:C.line }}>
        <p style={{ fontWeight:700, fontSize:14, color:same?C.teal:C.navy, margin:"0 0 6px" }}>{same?"✨ Mesma linguagem!":"🔄 Linguagens diferentes"}</p>
        <p style={{ fontSize:13, color:C.ink, margin:0, lineHeight:1.5 }}>
          {same?`${na} e ${nb} se sentem amados(as) da mesma forma. O desafio agora é exercê-la com intencionalidade.`:`${na} sente amor por ${la?.label?.toLowerCase()} e ${nb} por ${lb?.label?.toLowerCase()}. Conhecer isso é o primeiro passo para ouvir o outro da forma certa.`}
        </p>
      </Card>
      <RochaBox idx={0} texto={ins.a1_rocha}/>
      <div style={{ marginTop:18 }}>
        <Btn color={C.teal} onClick={()=>goNext({to:na,color:C.olive,sub:"Alicerce 2 — sobre as práticas diárias do lar."})}>Continuar para o Alicerce 2 →</Btn>
      </div>
    </>);
  }

  // S4 ── A / ALICERCE 2
  if (step===4) {
    const d=data.a, ok=d.scores.every(s=>s>0);
    return wrap(<>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>{na}</div>
        <AlicerceTag idx={1}/>
        <h2 style={{ color:C.ink, fontSize:21, fontWeight:800, margin:"8px 0 4px" }}>Praticar as Bases Diárias</h2>
        <p style={{ color:C.muted, fontSize:13, margin:0 }}>1 = raramente · 5 = sempre</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:18 }}>
        {PRACTICES.map((pr,i)=>(
          <Card key={i} style={{ padding:"12px 14px 8px" }}>
            <p style={{ fontWeight:600, fontSize:13, color:C.ink, margin:"0 0 8px", lineHeight:1.4 }}>{pr}</p>
            <ScoreDots value={d.scores[i]} onChange={v=>setScore("a",i,v)} color={C.olive}/>
          </Card>
        ))}
      </div>
      <Btn onClick={()=>goNext({to:nb,color:C.olive,sub:"Sua vez no Alicerce 2 — avalie as práticas diárias."})} disabled={!ok}>{ok?`Passar para ${nb} →`:"Avalie todas as práticas"}</Btn>
    </>);
  }

  // S5 ── B / ALICERCE 2
  if (step===5) {
    const d=data.b, ok=d.scores.every(s=>s>0);
    return wrap(<>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>{nb}</div>
        <AlicerceTag idx={1}/>
        <h2 style={{ color:C.ink, fontSize:21, fontWeight:800, margin:"8px 0 4px" }}>Praticar as Bases Diárias</h2>
        <p style={{ color:C.muted, fontSize:13, margin:0 }}>1 = raramente · 5 = sempre</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:18 }}>
        {PRACTICES.map((pr,i)=>(
          <Card key={i} style={{ padding:"12px 14px 8px" }}>
            <p style={{ fontWeight:600, fontSize:13, color:C.ink, margin:"0 0 8px", lineHeight:1.4 }}>{pr}</p>
            <ScoreDots value={d.scores[i]} onChange={v=>setScore("b",i,v)} color={C.olive}/>
          </Card>
        ))}
      </div>
      <Btn onClick={()=>goNext(null)} disabled={!ok}>{ok?"Ver a revelação →":"Avalie todas as práticas"}</Btn>
    </>);
  }

  // S6 ── REVELAÇÃO 2
  if (step===6) {
    const da=data.a.scores, db=data.b.scores;
    const avgs=PRACTICES.map((_,i)=>(da[i]+db[i])/2);
    const best=avgs.indexOf(Math.max(...avgs)), worst=avgs.indexOf(Math.min(...avgs));
    const ins=gerarInsights(na,nb,data);
    return wrap(<>
      <div style={{ marginBottom:12 }}><AlicerceTag idx={1}/><h2 style={{ color:C.olive, fontSize:21, fontWeight:800, margin:"8px 0" }}>Revelação — Práticas</h2></div>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
        {PRACTICES.map((pr,i)=>{
          const isBest=i===best, isWorst=i===worst;
          return (
            <Card key={i} style={{ borderLeft:`4px solid ${isBest?C.olive:isWorst?C.terra:C.line}`, padding:"10px 14px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                <span style={{ fontSize:12, fontWeight:600, color:C.ink, flex:1, paddingRight:8, lineHeight:1.3 }}>{pr}</span>
                {isBest&&<span style={{ fontSize:10, background:C.oliveLt, color:C.olive, padding:"2px 7px", borderRadius:8, fontWeight:700, flexShrink:0 }}>✦ Força</span>}
                {isWorst&&<span style={{ fontSize:10, background:C.terraLt, color:C.terra, padding:"2px 7px", borderRadius:8, fontWeight:700, flexShrink:0 }}>↑ Crescer</span>}
              </div>
              {[[na,da[i],C.navy],[nb,db[i],C.olive]].map(([nm,val,col])=>(
                <div key={nm} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:11, color:C.muted, width:72, flexShrink:0 }}>{nm}</span>
                  <div style={{ flex:1, height:8, borderRadius:4, background:C.line, overflow:"hidden" }}>
                    <div style={{ height:"100%", borderRadius:4, background:col, width:`${(val/5)*100}%` }}/>
                  </div>
                  <span style={{ fontSize:12, fontWeight:700, color:col, width:16, textAlign:"right" }}>{val}</span>
                </div>
              ))}
            </Card>
          );
        })}
      </div>
      <RochaBox idx={1} texto={ins.a2_rocha}/>
      <div style={{ marginTop:18 }}>
        <Btn color={C.olive} onClick={()=>goNext({to:na,color:C.terra,sub:"Último alicerce — sobre como vocês enfrentam as provas do tempo."})}>Continuar para o Alicerce 3 →</Btn>
      </div>
    </>);
  }

  // S7 ── A / ALICERCE 3
  if (step===7) {
    const d=data.a, ok=d.tempestade&&d.response;
    return wrap(<>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>{na}</div>
        <AlicerceTag idx={2}/>
        <h2 style={{ color:C.ink, fontSize:21, fontWeight:800, margin:"8px 0 4px" }}>As Provas do Tempo</h2>
      </div>
      <Card style={{ marginBottom:12 }}>
        <p style={{ fontWeight:700, fontSize:14, color:C.ink, marginBottom:12 }}>Qual tipo de tempestade mais afeta nosso lar?</p>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {TEMPESTADES.map(t=>(
            <button key={t.id} onClick={()=>setP("a","tempestade",t.id)} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", border:`2px solid ${d.tempestade===t.id?C.terra:C.line}`, background:d.tempestade===t.id?C.terraLt:C.paper, borderRadius:10, cursor:"pointer", textAlign:"left" }}>
              <span style={{ fontSize:22 }}>{t.icon}</span>
              <div><div style={{ fontWeight:700, fontSize:13, color:C.ink }}>{t.label}</div><div style={{ fontSize:12, color:C.muted }}>{t.desc}</div></div>
              {d.tempestade===t.id&&<span style={{ marginLeft:"auto", color:C.terra, fontWeight:700 }}>✓</span>}
            </button>
          ))}
        </div>
      </Card>
      <Card style={{ marginBottom:18 }}>
        <p style={{ fontWeight:700, fontSize:14, color:C.ink, marginBottom:12 }}>Como costumo reagir nas crises?</p>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {RESPONSES.map(r=><OptionPill key={r.id} label={r.label} selected={d.response===r.id} onSelect={()=>setP("a","response",r.id)} color={C.terra}/>)}
        </div>
      </Card>
      <Btn onClick={()=>goNext({to:nb,color:C.terra,sub:"Último alicerce — sua vez de responder sobre as provas do tempo."})} disabled={!ok}>{ok?`Passar para ${nb} →`:"Responda tudo para continuar"}</Btn>
    </>);
  }

  // S8 ── B / ALICERCE 3
  if (step===8) {
    const d=data.b, ok=d.tempestade&&d.response;
    return wrap(<>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>{nb}</div>
        <AlicerceTag idx={2}/>
        <h2 style={{ color:C.ink, fontSize:21, fontWeight:800, margin:"8px 0 4px" }}>As Provas do Tempo</h2>
      </div>
      <Card style={{ marginBottom:12 }}>
        <p style={{ fontWeight:700, fontSize:14, color:C.ink, marginBottom:12 }}>Qual tipo de tempestade mais afeta nosso lar?</p>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {TEMPESTADES.map(t=>(
            <button key={t.id} onClick={()=>setP("b","tempestade",t.id)} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", border:`2px solid ${d.tempestade===t.id?C.terra:C.line}`, background:d.tempestade===t.id?C.terraLt:C.paper, borderRadius:10, cursor:"pointer", textAlign:"left" }}>
              <span style={{ fontSize:22 }}>{t.icon}</span>
              <div><div style={{ fontWeight:700, fontSize:13, color:C.ink }}>{t.label}</div><div style={{ fontSize:12, color:C.muted }}>{t.desc}</div></div>
              {d.tempestade===t.id&&<span style={{ marginLeft:"auto", color:C.terra, fontWeight:700 }}>✓</span>}
            </button>
          ))}
        </div>
      </Card>
      <Card style={{ marginBottom:18 }}>
        <p style={{ fontWeight:700, fontSize:14, color:C.ink, marginBottom:12 }}>Como costumo reagir nas crises?</p>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {RESPONSES.map(r=><OptionPill key={r.id} label={r.label} selected={d.response===r.id} onSelect={()=>setP("b","response",r.id)} color={C.terra}/>)}
        </div>
      </Card>
      <Btn color={C.terra} onClick={()=>{ if(ok) concluirAlicerce3(); }} disabled={!ok}>{ok?"Ver análise do casal →":"Responda tudo para continuar"}</Btn>
    </>);
  }

  // S9 ── REVELAÇÃO 3 + ANÁLISE
  if (step===9) {
    const ta=TEMPESTADES.find(t=>t.id===data.a.tempestade), tb=TEMPESTADES.find(t=>t.id===data.b.tempestade);
    const ra=RESPONSES.find(r=>r.id===data.a.response), rb=RESPONSES.find(r=>r.id===data.b.response);
    return wrap(<>
      <div style={{ marginBottom:12 }}><AlicerceTag idx={2}/><h2 style={{ color:C.terra, fontSize:21, fontWeight:800, margin:"8px 0" }}>Revelação — Provas + Análise</h2></div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
        {[[na,ta,ra],[nb,tb,rb]].map(([name,temp,resp],i)=>(
          <Card key={i} style={{ textAlign:"center", borderTop:`4px solid ${C.terra}`, padding:"14px 10px" }}>
            <div style={{ fontWeight:800, fontSize:13, color:C.navy, marginBottom:8 }}>{name}</div>
            <div style={{ fontSize:26, marginBottom:4 }}>{temp?.icon}</div>
            <div style={{ fontWeight:700, fontSize:12, color:C.terra, marginBottom:10 }}>{temp?.label}</div>
            <div style={{ fontSize:11, color:C.muted, marginBottom:4 }}>Reação típica</div>
            <div style={{ fontWeight:600, fontSize:12, color:C.ink, lineHeight:1.3 }}>{resp?.label}</div>
          </Card>
        ))}
      </div>
      {insights&&<RochaBox idx={2} texto={insights.a3_rocha}/>}
      {insights&&(
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:14, marginBottom:18 }}>
          {[["a1_titulo","a1_corpo",0],["a2_titulo","a2_corpo",1],["a3_titulo","a3_corpo",2]].map(([tk,ck,idx])=>(
            <Card key={idx} style={{ borderLeft:`4px solid ${AC[idx]}` }}>
              <div style={{ marginBottom:6 }}><AlicerceTag idx={idx}/></div>
              <p style={{ fontWeight:700, fontSize:14, color:AC[idx], margin:"0 0 6px" }}>{insights[tk]}</p>
              <p style={{ fontSize:13, color:C.ink, margin:0, lineHeight:1.5 }}>{insights[ck]}</p>
            </Card>
          ))}
          <Card style={{ background:C.goldLt, borderColor:C.gold }}>
            <p style={{ fontWeight:700, fontSize:14, color:C.gold, margin:"0 0 6px" }}>🎯 Ação desta semana</p>
            <p style={{ fontSize:13, color:C.ink, margin:0, lineHeight:1.5 }}>{insights.acao_semana}</p>
          </Card>
        </div>
      )}
      <Btn color={C.terra} onClick={()=>goNext(null)}>Ver diagnóstico geral →</Btn>
    </>);
  }

  // S10 ── DIAGNÓSTICO GERAL
  if (step===10) {
    return wrap(<>
      <div style={{ marginBottom:14, textAlign:"center" }}>
        <div style={{ fontSize:11, letterSpacing:".2em", color:C.muted, textTransform:"uppercase", marginBottom:6 }}>Diagnóstico Geral</div>
        <h2 style={{ color:C.navy, fontSize:24, fontWeight:800, margin:0 }}>O Alicerce de {na} & {nb}</h2>
      </div>

      {/* Medidor de solidez */}
      <Card style={{ textAlign:"center", marginBottom:14, borderTop:`5px solid ${insights.nivelCor}` }}>
        <div style={{ fontSize:48, fontWeight:800, color:insights.nivelCor, lineHeight:1 }}>{insights.solidez}%</div>
        <div style={{ fontSize:11, color:C.muted, margin:"4px 0 12px", letterSpacing:".05em" }}>SOLIDEZ DO ALICERCE</div>
        <div style={{ height:10, borderRadius:6, background:C.line, overflow:"hidden", marginBottom:12 }}>
          <div style={{ height:"100%", borderRadius:6, background:insights.nivelCor, width:`${insights.solidez}%` }}/>
        </div>
        <div style={{ display:"inline-block", padding:"6px 16px", borderRadius:20, background:insights.nivelCor, color:"#fff", fontWeight:700, fontSize:14 }}>
          {insights.nivel}
        </div>
        <p style={{ fontSize:13, color:C.ink, margin:"14px 0 0", lineHeight:1.5, textAlign:"left" }}>{insights.nivelDesc}</p>
      </Card>

      {/* Resumo dos 3 alicerces */}
      <Card style={{ marginBottom:14 }}>
        <p style={{ fontWeight:700, fontSize:14, color:C.navy, margin:"0 0 12px" }}>Os três alicerces do lar</p>
        {[
          { idx:0, val:insights.escutaMedia,      label:"Ouvir com Sensibilidade" },
          { idx:1, val:insights.praticaMedia,     label:"Praticar as Bases Diárias" },
          { idx:2, val:insights.resilienciaMedia, label:"Resistir às Provas do Tempo" },
        ].map(({idx,val,label})=>(
          <div key={idx} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <span style={{ fontSize:11, fontWeight:700, color:AC[idx], width:130, flexShrink:0 }}>{label}</span>
            <div style={{ flex:1, height:10, borderRadius:5, background:C.line, overflow:"hidden" }}>
              <div style={{ height:"100%", borderRadius:5, background:AC[idx], width:`${(val/5)*100}%` }}/>
            </div>
            <span style={{ fontSize:13, fontWeight:700, color:AC[idx], width:34, textAlign:"right", flexShrink:0 }}>{val.toFixed(1)}</span>
          </div>
        ))}
      </Card>

      {/* Ação da semana repetida no diagnóstico */}
      <Card style={{ background:C.goldLt, borderColor:C.gold, marginBottom:18 }}>
        <p style={{ fontWeight:700, fontSize:14, color:C.gold, margin:"0 0 6px" }}>🎯 Primeiro passo desta semana</p>
        <p style={{ fontSize:13, color:C.ink, margin:0, lineHeight:1.5 }}>{insights.acao_semana}</p>
      </Card>

      <Btn onClick={()=>goNext(null)}>Escrever nossos compromissos →</Btn>
    </>);
  }

  // S11 ── COMPROMISSOS
  if (step===11) return wrap(<>
    <div style={{ marginBottom:14 }}>
      <h2 style={{ color:C.navy, fontSize:22, fontWeight:800, margin:"0 0 6px" }}>Nossos Compromissos</h2>
      <p style={{ color:C.muted, fontSize:13, margin:0, lineHeight:1.4 }}>Escrevam juntos um compromisso por alicerce.</p>
    </div>
    <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:18 }}>
      {[0,1,2].map(i=>(
        <Card key={i} style={{ borderLeft:`4px solid ${AC[i]}` }}>
          <div style={{ marginBottom:6 }}><AlicerceTag idx={i}/></div>
          <p style={{ fontWeight:700, fontSize:13, color:AC[i], margin:"0 0 4px" }}>{ANAMES[i]}</p>
          <p style={{ fontSize:12, color:C.muted, margin:"0 0 10px" }}>{["Como vamos praticar a escuta genuína?","Que prática diária vamos fortalecer?","Como reagiremos juntos às próximas tempestades?"][i]}</p>
          <textarea value={data.a.commits[i]} onChange={e=>setCommit(i,e.target.value)} placeholder="Escrevam aqui o compromisso do casal…" rows={3} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:`1.5px solid ${C.line}`, fontSize:13, fontFamily:"inherit", resize:"none", outline:"none", boxSizing:"border-box", lineHeight:1.5 }}/>
        </Card>
      ))}
    </div>
    <Btn onClick={()=>goNext(null)}>Selar os compromissos →</Btn>
  </>);

  // S12 ── FINAL + IMPRIMIR
  if (step===12) return (
    <>
      <Head><title>Família Inabalável · IEQ Templo Gospel</title></Head>
      <style>{printStyles}</style>
      <div className="print-area" style={{ maxWidth:460, margin:"0 auto", fontFamily:"system-ui,sans-serif", minHeight:"100vh", background:C.cream }}>
        {/* Cabeçalho do relatório */}
        <div style={{ background:C.navy, padding:"24px 24px 22px", textAlign:"center" }}>
          <div style={{ fontSize:40, marginBottom:8 }}>🏠</div>
          <div style={{ color:"#7FA0BC", fontSize:11, letterSpacing:".18em", textTransform:"uppercase", marginBottom:6 }}>Relatório do Casal</div>
          <h1 style={{ color:"#fff", fontSize:26, fontWeight:800, margin:"0 0 10px", lineHeight:1.15 }}>{na} & {nb}</h1>
          <div style={{ display:"flex", width:160, height:5, borderRadius:3, overflow:"hidden", margin:"0 auto" }}>
            {AC.map((c,i)=><div key={i} style={{ flex:1, background:c }}/>)}
          </div>
        </div>

        <div style={{ padding:"18px 16px 40px" }}>
          {/* Selo de solidez */}
          {insights && (
            <Card style={{ textAlign:"center", marginBottom:14, borderTop:`5px solid ${insights.nivelCor}` }}>
              <div style={{ display:"inline-block", padding:"6px 18px", borderRadius:20, background:insights.nivelCor, color:"#fff", fontWeight:700, fontSize:15, marginBottom:8 }}>
                {insights.nivel} · {insights.solidez}%
              </div>
              <p style={{ fontSize:13, color:C.ink, margin:0, lineHeight:1.5 }}>{insights.nivelDesc}</p>
            </Card>
          )}

          {/* Versículo de fechamento */}
          {insights?.fechamento && (
            <Card style={{ marginBottom:14, background:C.navyLt, borderColor:C.navy }}>
              <p style={{ fontSize:14, color:C.navy, fontStyle:"italic", margin:"0 0 8px", lineHeight:1.6 }}>{insights.fechamento}</p>
              <p style={{ fontSize:11, color:C.gold, margin:0, textAlign:"right", fontWeight:700 }}>Mateus 7:25</p>
            </Card>
          )}

          {/* Compromissos */}
          {data.a.commits.some(c=>c) && (
            <div style={{ marginBottom:14 }}>
              <p style={{ fontWeight:700, fontSize:14, color:C.navy, margin:"0 0 10px" }}>📝 Nossos compromissos</p>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {[0,1,2].map(i=>data.a.commits[i]?(
                  <Card key={i} style={{ borderLeft:`4px solid ${AC[i]}`, padding:"12px 14px" }}>
                    <div style={{ fontSize:10, color:AC[i], fontWeight:700, marginBottom:4, letterSpacing:".08em", textTransform:"uppercase" }}>{AKICKERS[i]}</div>
                    <div style={{ fontSize:13, color:C.ink, lineHeight:1.4 }}>{data.a.commits[i]}</div>
                  </Card>
                ):null)}
              </div>
            </div>
          )}

          <p style={{ color:C.muted, fontSize:12, lineHeight:1.5, margin:"4px 0 20px", textAlign:"center" }}>
            IEQ Templo Gospel · Especial dos Namorados<br/>Construindo uma Família Inabalável · Mateus 7:24-27
          </p>

          {/* Botões — escondidos na impressão */}
          <div className="no-print" style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <Btn color={C.olive} onClick={()=>window.print()}>🖨️ Imprimir / Salvar em PDF</Btn>
            <button onClick={()=>{setStep(0);setData({a:emptyP(),b:emptyP()});setInsights(null);setNames({a:"",b:""});}} style={{ width:"100%", padding:"14px", borderRadius:12, border:`2px solid ${C.line}`, background:"transparent", color:C.muted, fontSize:14, cursor:"pointer", fontWeight:700 }}>↩ Refazer com outro casal</button>
          </div>
        </div>
      </div>
    </>
  );

  return null;
}
