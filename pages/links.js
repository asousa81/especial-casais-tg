import { useState } from "react";
import Head from "next/head";
import { QRCodeSVG } from "qrcode.react";

// ════════════════════════════════════════════════════════════════════════════
//  ✏️  EDITE AQUI — adicione, remova ou troque os links à vontade
// ════════════════════════════════════════════════════════════════════════════
const TITULO    = "Família Inabalável";
const SUBTITULO = "Palestra para Casais · IEQ Templo Gospel";
const VERSICULO = "«…construída sobre rocha firme.» — Mateus 7:24";

// O link que vira QR Code grande no topo (geralmente o app interativo)
const LINK_PRINCIPAL = {
  url:   "https://especial-casais-tg.vercel.app",
  label: "App Interativo do Casal",
  desc:  "Façam a jornada juntos e recebam o diagnóstico",
};

// Demais links — adicione quantos quiser, seguindo o mesmo formato
const LINKS = [
  { icon:"📱", titulo:"App Interativo do Casal", desc:"Jornada pelos 3 alicerces com diagnóstico final", url:"https://especial-casais-tg.vercel.app", cor:"#2F6E78" },
  { icon:"🖼️", titulo:"Infográfico (resumo visual)", desc:"Imagem para salvar e compartilhar no WhatsApp", url:"https://exemplo.com/infografico", cor:"#5E7B3A" },
  { icon:"📄", titulo:"Folder / Tríptico (PDF)", desc:"Material de apoio para imprimir e dobrar", url:"https://exemplo.com/triptico", cor:"#B5532A" },
  { icon:"📖", titulo:"Documento de Apoio Completo", desc:"As 5 portas, autoavaliação e reflexões", url:"https://exemplo.com/documento", cor:"#16314F" },
  // { icon:"🎥", titulo:"Vídeo da Pregação", desc:"Assista novamente quando quiser", url:"https://youtube.com/...", cor:"#C99A3F" },
];
// ════════════════════════════════════════════════════════════════════════════

const C = {
  navy:"#16314F", navyDk:"#0E2238",
  cream:"#FBF7EF", paper:"#FFFFFF", ink:"#2B2A28",
  muted:"#6F6457", gold:"#C99A3F", line:"#E4DCCB",
};

export default function Links() {
  const [copiado, setCopiado] = useState(false);

  function compartilhar() {
    const texto = `${TITULO} — ${SUBTITULO}\nAcesse os materiais: `;
    if (navigator.share) {
      navigator.share({ title:TITULO, text:texto, url:window.location.href }).catch(()=>{});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiado(true);
      setTimeout(()=>setCopiado(false), 2000);
    }
  }

  return (
    <>
      <Head>
        <title>{TITULO} · Materiais</title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta name="description" content={SUBTITULO}/>
      </Head>

      <div style={{ minHeight:"100vh", background:C.cream, fontFamily:"system-ui,sans-serif" }}>
        <div style={{ maxWidth:460, margin:"0 auto" }}>

          {/* CABEÇALHO */}
          <div style={{ background:C.navy, padding:"36px 24px 30px", textAlign:"center" }}>
            <div style={{ fontSize:46, marginBottom:10 }}>🏠</div>
            <div style={{ color:"#7FA0BC", fontSize:11, letterSpacing:".2em", textTransform:"uppercase", marginBottom:8 }}>{SUBTITULO}</div>
            <h1 style={{ color:"#fff", fontSize:30, fontWeight:800, margin:"0 0 12px", lineHeight:1.1 }}>{TITULO}</h1>
            <div style={{ display:"flex", width:160, height:5, borderRadius:3, overflow:"hidden", margin:"0 auto 14px" }}>
              {["#2F6E78","#5E7B3A","#B5532A"].map((c,i)=><div key={i} style={{ flex:1, background:c }}/>)}
            </div>
            <p style={{ color:"#AFC2D5", fontSize:13, fontStyle:"italic", margin:0 }}>{VERSICULO}</p>
          </div>

          <div style={{ padding:"22px 18px 40px" }}>

            {/* QR CODE PRINCIPAL */}
            <div style={{ background:C.paper, borderRadius:18, border:`1px solid ${C.line}`, padding:"22px", textAlign:"center", marginBottom:22 }}>
              <div style={{ fontSize:11, color:C.muted, letterSpacing:".15em", textTransform:"uppercase", marginBottom:14 }}>Aponte a câmera do celular</div>
              <div style={{ display:"inline-block", padding:14, background:"#fff", borderRadius:14, border:`2px solid ${C.line}` }}>
                <QRCodeSVG value={LINK_PRINCIPAL.url} size={180} level="M" fgColor={C.navy} bgColor="#ffffff"/>
              </div>
              <div style={{ fontWeight:800, fontSize:16, color:C.navy, marginTop:14 }}>{LINK_PRINCIPAL.label}</div>
              <div style={{ fontSize:13, color:C.muted, marginTop:2 }}>{LINK_PRINCIPAL.desc}</div>
            </div>

            {/* TÍTULO DA LISTA */}
            <div style={{ fontSize:12, fontWeight:700, color:C.muted, letterSpacing:".1em", textTransform:"uppercase", margin:"0 4px 12px" }}>
              Todos os materiais
            </div>

            {/* LISTA DE LINKS */}
            <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:24 }}>
              {LINKS.map((l,i)=>(
                <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
                  <div style={{ background:C.paper, borderRadius:14, border:`1px solid ${C.line}`, borderLeft:`6px solid ${l.cor}`, padding:"16px 16px", display:"flex", alignItems:"center", gap:14, transition:"transform .1s" }}>
                    <div style={{ fontSize:28, flexShrink:0 }}>{l.icon}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:15, color:C.ink }}>{l.titulo}</div>
                      <div style={{ fontSize:12.5, color:C.muted, marginTop:2 }}>{l.desc}</div>
                    </div>
                    <div style={{ color:l.cor, fontSize:22, fontWeight:700, flexShrink:0 }}>→</div>
                  </div>
                </a>
              ))}
            </div>

            {/* BOTÃO COMPARTILHAR */}
            <button onClick={compartilhar} style={{ width:"100%", padding:"15px", borderRadius:12, background:C.gold, border:"none", color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", marginBottom:20 }}>
              {copiado ? "✓ Link copiado!" : "🔗 Compartilhar esta página"}
            </button>

            <p style={{ color:C.muted, fontSize:12, textAlign:"center", lineHeight:1.5, margin:0 }}>
              IEQ Templo Gospel · Culto da Família<br/>
              Construindo uma Família Inabalável · Mateus 7:24-27
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
