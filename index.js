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

// ── UI ATOMS ─────────────────────────────────────────────────────────────────
function AlicerceTag({ idx }) {
  return <span style={{ display:"inline-block", padding:"3px 10px", borderRadius:20, background:ACL[idx], color:AC[idx], fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase" }}>{AKICKERS[idx]}</span>;
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
    <div style={{ padding:"10px 20px 0" }}>
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
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const na = names.a || "Cônjuge A";
  const nb = names.b || "Cônjuge B";
  const TOTAL = 12;

  const setP      = (person,field,val) => setData(d=>({...d,[person]:{...d[person],[field]:val}}));
  const setScore  = (person,idx,val)   => setData(d=>({...d,[person]:{...d[person],scores:d[person].scores.map((s,i)=>i===idx?val:s)}}));
  const setCommit = (idx,val)          => setData(d=>({...d,a:{...d.a,commits:d.a.commits.map((c,i)=>i===idx?val:c)}}));

  const goNext = (pc) => { if(pc){setPass(pc);return;} setStep(s=>s+1); };
  const confirmPass = () => { setPass(null); setStep(s=>s+1); };

  async function fetchInsights() {
    setLoading(true); setStep(9); setError(null);
    const ll = id => LANGS.find(l=>l.id===id)?.label||"—";
    const tl = id => TEMPESTADES.find(t=>t.id===id)?.label||"—";
    const rl = id => RESPONSES.find(r=>r.id===id)?.label||"—";
    const prompt = `Você é um conselheiro cristão de casais com base na palestra Construindo uma Família Inabalável (Mateus 7:24-27). Retorne SOMENTE JSON válido, sem markdown.\n\nCASAL: ${na} e ${nb}\n\nALICERCE 1:\n- ${na}: linguagem="${ll(data.a.lang)}", escuta=${data.a.listenScore}/5\n- ${nb}: linguagem="${ll(data.b.lang)}", escuta=${data.b.listenScore}/5\n\nALICERCE 2:\n${PRACTICES.map((p,i)=>`- "${p}": ${na}=${data.a.scores[i]}, ${nb}=${data.b.scores[i]}`).join("\n")}\n\nALICERCE 3:\n- ${na}: tempestade="${tl(data.a.tempestade)}", resposta="${rl(data.a.response)}"\n- ${nb}: tempestade="${tl(data.b.tempestade)}", resposta="${rl(data.b.response)}"\n\nRetorne exatamente:\n{"a1_titulo":"...","a1_corpo":"2-3 frases com os nomes sobre linguagens de amor e escuta.","a2_titulo":"...","a2_corpo":"2-3 frases destacando força e área de crescimento.","a3_titulo":"...","a3_corpo":"2-3 frases sobre as provas conectando com Mateus 7.","acao_semana":"Uma ação concreta para essa semana.","fechamento":"Encorajamento final com base bíblica usando os nomes."}`;
    try {
      const res = await fetch("/api/insights", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000, messages:[{role:"user",content:prompt}] })
      });
      const json = await res.json();
      setInsights(JSON.parse((json.content?.[0]?.text||"").replace(/```json|```/g,"").trim()));
    } catch(e) {
      setInsights({
        a1_titulo:"A conexão começa pela escuta",
        a1_corpo:`${na} e ${nb}, conhecer a linguagem de amor um do outro é o primeiro passo. Ouvir para compreender — não para responder — é o mandamento de Tiago 1:19 posto em prática.`,
        a2_titulo:"O trabalho invisível que sustenta tudo",
        a2_corpo:"Toda família que permanece de pé escolheu, dia após dia, cavar mais fundo do que a conveniência exige. Humildade, misericórdia e pacificação não são sentimentos — são decisões.",
        a3_titulo:"A chuva cai sobre as duas casas",
        a3_corpo:"Jesus usa as mesmas palavras para descrever o que acontece com ambas. A diferença não está na ausência de tempestades, mas na firmeza do alicerce.",
        acao_semana:"Reservem 20 minutos esta semana, sem telas, para cada um compartilhar uma coisa que está pesando — sem interromper, sem defender.",
        fechamento:`Que Cristo, a Rocha Eterna, seja o fundamento de cada decisão do lar de ${na} e ${nb}.`
      });
      setError("Insight padrão (verifique a chave de API nas configurações do Vercel).");
    }
    setLoading(false);
  }

  // ── PASSAGEM ──────────────────────────────────────────────────────────────
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
      <div style={{ maxWidth:460, margin:"0 auto", fontFamily:"system-ui,sans-serif", minHeight:"100vh", background:C.cream }}>
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
      <p style={{ color:C.muted, fontSize:13, margin:0, lineHeight:1.5 }}>Cada um responde na sua vez. Ao final, a IA gera uma análise personalizada para vocês dois.</p>
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
      <Card style={{ background:same?C.tealLt:C.navyLt, borderColor:same?C.teal:C.line, marginBottom:18 }}>
        <p style={{ fontWeight:700, fontSize:14, color:same?C.teal:C.navy, margin:"0 0 6px" }}>{same?"✨ Mesma linguagem!":"🔄 Linguagens diferentes"}</p>
        <p style={{ fontSize:13, color:C.ink, margin:0, lineHeight:1.5 }}>
          {same?`${na} e ${nb} se sentem amados(as) da mesma forma. O desafio agora é exercê-la com intencionalidade.`:`${na} sente amor por ${la?.label?.toLowerCase()} e ${nb} por ${lb?.label?.toLowerCase()}. Conhecer isso é o primeiro passo para ouvir o outro da forma que realmente importa.`}
        </p>
      </Card>
      <Btn color={C.teal} onClick={()=>goNext({to:na,color:C.olive,sub:"Alicerce 2 — sobre as práticas diárias do lar."})}>Continuar para o Alicerce 2 →</Btn>
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
    return wrap(<>
      <div style={{ marginBottom:12 }}><AlicerceTag idx={1}/><h2 style={{ color:C.olive, fontSize:21, fontWeight:800, margin:"8px 0" }}>Revelação — Práticas</h2></div>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
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
      <Btn color={C.olive} onClick={()=>goNext({to:na,color:C.terra,sub:"Último alicerce — sobre como vocês enfrentam as provas do tempo."})}>Continuar para o Alicerce 3 →</Btn>
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
      <Btn color={C.terra} onClick={()=>{ if(ok) fetchInsights(); }} disabled={!ok}>{ok?"Gerar análise do casal →":"Responda tudo para continuar"}</Btn>
    </>);
  }

  // S9 ── LOADING / RESULTADOS
  if (step===9) {
    if (loading) return wrap(
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"65vh", gap:20, textAlign:"center" }}>
        <div style={{ width:60, height:60, borderRadius:"50%", border:`4px solid ${C.line}`, borderTopColor:C.gold, animation:"spin 1s linear infinite" }}/>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <p style={{ color:C.muted, fontSize:14, margin:0 }}>Analisando as respostas de {na} e {nb}…</p>
      </div>, true
    );
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
      {error&&<div style={{ background:C.terraLt, border:`1px solid ${C.terra}`, borderRadius:10, padding:"10px 14px", marginBottom:12, fontSize:12, color:C.terra }}>{error}</div>}
      {insights&&(
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:18 }}>
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
      <Btn color={C.terra} onClick={()=>goNext(null)}>Escrever nossos compromissos →</Btn>
    </>);
  }

  // S10 ── COMPROMISSOS
  if (step===10) return wrap(<>
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

  // S11 ── FINAL
  if (step===11) return (
    <>
      <Head><title>Família Inabalável · IEQ Templo Gospel</title></Head>
      <div style={{ maxWidth:460, margin:"0 auto", fontFamily:"system-ui,sans-serif", minHeight:"100vh", background:C.navyDk, display:"flex", flexDirection:"column" }}>
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px 24px", textAlign:"center" }}>
          <div style={{ fontSize:56, marginBottom:14 }}>🏠</div>
          <div style={{ color:"rgba(255,255,255,.5)", fontSize:11, letterSpacing:".2em", textTransform:"uppercase", marginBottom:8 }}>Construído sobre a Rocha</div>
          <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 14px", lineHeight:1.15 }}>{na} & {nb}</h1>
          <div style={{ display:"flex", width:180, height:5, borderRadius:3, overflow:"hidden", marginBottom:28 }}>
            {AC.map((c,i)=><div key={i} style={{ flex:1, background:c }}/>)}
          </div>
          {insights?.fechamento&&(
            <Card style={{ width:"100%", marginBottom:16, background:"rgba(255,255,255,.06)", borderColor:"rgba(255,255,255,.12)" }}>
              <p style={{ fontSize:14, color:"rgba(255,255,255,.85)", fontStyle:"italic", margin:"0 0 8px", lineHeight:1.6, textAlign:"left" }}>{insights.fechamento}</p>
              <p style={{ fontSize:11, color:C.gold, margin:0, textAlign:"right", fontWeight:700 }}>Mateus 7:25</p>
            </Card>
          )}
          {data.a.commits.some(c=>c)&&(
            <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
              {[0,1,2].map(i=>data.a.commits[i]?(
                <div key={i} style={{ borderRadius:10, padding:"10px 14px", background:"rgba(255,255,255,.06)", borderLeft:`3px solid ${AC[i]}`, textAlign:"left" }}>
                  <div style={{ fontSize:10, color:AC[i], fontWeight:700, marginBottom:4, letterSpacing:".08em", textTransform:"uppercase" }}>{AKICKERS[i]}</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,.8)", lineHeight:1.4 }}>{data.a.commits[i]}</div>
                </div>
              ):null)}
            </div>
          )}
          <p style={{ color:"rgba(255,255,255,.3)", fontSize:12, lineHeight:1.5, margin:0 }}>IEQ Templo Gospel · Culto da Família<br/>Baseado em Mateus 7:24-27</p>
        </div>
        <div style={{ padding:"0 24px 40px" }}>
          <button onClick={()=>{setStep(0);setData({a:emptyP(),b:emptyP()});setInsights(null);setNames({a:"",b:""}); }} style={{ width:"100%", padding:"14px", borderRadius:12, border:"2px solid rgba(255,255,255,.18)", background:"transparent", color:"rgba(255,255,255,.5)", fontSize:14, cursor:"pointer" }}>↩ Refazer com outro casal</button>
        </div>
      </div>
    </>
  );

  return null;
}
