import { useState, useEffect, useCallback, useRef } from "react";

import miku from "./imports/1120692688541981615.jpg";
import pinkGirl from "./imports/46724914877516105.jpg";
import kawaiiCat from "./imports/Kawaii_cat_drawing_set_up_for_quick_teacher_resources.jpg";
import mikuGun from "./imports/Mikuuu.jpg";
import catGirlSleep from "./imports/____________.jpg";
import dancingPinkHair from "./imports/1067493917917026929.gif";
import hulkDance from "./imports/455496949806433393.gif";
import hoodiGirl from "./imports/821273682026322808.gif";
import zeroTwo from "./imports/Zero_Two_Dancing___Hai_Ph_t_H_n.gif";
import cockroach from "./imports/660903314085911226.gif";

function rnd(a: number, b: number) { return Math.random() * (b - a) + a; }

// ── Floating background ───────────────────────────────────────────────────────
function FloatingBg({ emojis = ["🌹","💖","✨","🌸","🎀","💫","🌷","⭐","🦋","💕"] }: { emojis?: string[] }) {
  const [pts] = useState(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i, x: rnd(2, 98),
      emoji: emojis[i % emojis.length],
      duration: rnd(7, 18), size: rnd(13, 27), delay: rnd(0, 12),
    }))
  );
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pts.map(p => (
        <span key={p.id} className="absolute select-none" style={{
          left: `${p.x}%`, bottom: "-30px", fontSize: `${p.size}px`,
          animation: `floatUp ${p.duration}s ${p.delay}s linear infinite`, opacity: 0.4,
        }}>{p.emoji}</span>
      ))}
    </div>
  );
}

// ── Confetti ──────────────────────────────────────────────────────────────────
function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<{ id:number;x:number;color:string;duration:number;delay:number;size:number;br:string }[]>([]);
  const colors = ["#FF85A1","#FFD700","#E8527A","#B784D1","#7BC8F6","#98FB98","#FFA07A","#FF69B4","#87CEEB"];
  useEffect(() => {
    if (!active) return;
    setPieces(Array.from({ length: 100 }, (_, i) => ({
      id: i, x: rnd(2, 98),
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: rnd(2.5, 5.5), delay: rnd(0, 3),
      size: rnd(7, 18),
      br: Math.random() > 0.5 ? "50%" : "3px",
    })));
    const t = setTimeout(() => setPieces([]), 9000);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map(p => (
        <div key={p.id} style={{
          position:"absolute", left:`${p.x}%`, top:"-20px",
          width:`${p.size}px`, height:`${p.size}px`,
          backgroundColor:p.color, borderRadius:p.br,
          animation:`confettiFall ${p.duration}s ${p.delay}s linear forwards`,
        }} />
      ))}
    </div>
  );
}

// ── Typewriter text ───────────────────────────────────────────────────────────
function TypeWriter({ text, speed = 55, className = "" }: { text:string; speed?:number; className?:string }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return <span className={className}>{displayed}<span className="animate-pulse">|</span></span>;
}

// ── Shimmer text ──────────────────────────────────────────────────────────────
function Sh({ children, className="" }: { children:React.ReactNode; className?:string }) {
  return (
    <span className={className} style={{
      background:"linear-gradient(90deg,#c0392b,#E8527A,#FFD700,#FF85A1,#c0392b)",
      backgroundSize:"200% auto", WebkitBackgroundClip:"text",
      WebkitTextFillColor:"transparent", backgroundClip:"text",
      animation:"shimmer 3s linear infinite",
    }}>{children}</span>
  );
}

// ── Progress dots ─────────────────────────────────────────────────────────────
function Dots({ cur, total, go }: { cur:number; total:number; go:(i:number)=>void }) {
  return (
    <div className="flex gap-1.5 items-center">
      {Array.from({length:total}).map((_,i) => (
        <button key={i} onClick={() => go(i)} style={{
          width: i===cur ? "22px":"8px", height:"8px", borderRadius:"999px",
          background: i===cur ? "linear-gradient(90deg,#E8527A,#FF85A1)" : "rgba(232,82,122,0.22)",
          transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)", border:"none", cursor:"pointer",
        }} />
      ))}
    </div>
  );
}

// ── Escape button ─────────────────────────────────────────────────────────────
function EscapeBtn({ label="لا 😤", onEscape }: { label?:string; onEscape?:()=>void }) {
  const [pos, setPos] = useState({ x:60, y:55 });
  const [hits, setHits] = useState(0);
  const [sparks, setSparks] = useState<{id:number;x:number;y:number;e:string}[]>([]);
  const pool = ["😤","😠","🙄","😒","💢","👿","😡","🤬","😾","🫠","💀","🥴"];

  const flee = () => {
    const nx = rnd(10, 75); const ny = rnd(10, 75);
    setPos({ x:nx, y:ny });
    setHits(h => h+1);
    const e = pool[Math.floor(Math.random()*pool.length)];
    const id = Date.now();
    setSparks(a => [...a.slice(-5), {id,x:nx,y:ny,e}]);
    setTimeout(() => setSparks(a => a.filter(x => x.id!==id)), 1100);
    onEscape?.();
  };

  return (
    <>
      {sparks.map(s => (
        <span key={s.id} className="fixed text-3xl pointer-events-none z-40"
          style={{ left:`${s.x}%`, top:`${s.y}%`, animation:"floatUp 1.1s ease-out forwards" }}>
          {s.e}
        </span>
      ))}
      <button
        className="absolute text-sm font-bold px-5 py-2.5 rounded-full border-2 z-20 select-none"
        style={{
          left:`${pos.x}%`, top:`${pos.y}%`, transform:"translate(-50%,-50%)",
          borderColor:"#FFB6C1", color:"#E8527A", background:"rgba(255,255,255,0.8)",
          backdropFilter:"blur(6px)", transition:"all 0.15s ease",
        }}
        onMouseEnter={flee} onTouchStart={flee} onClick={flee}
      >
        {hits > 5 ? `لن تمسكيني! (${hits}x 🤬)` : hits > 2 ? `${label} (${hits}x)` : label}
      </button>
    </>
  );
}

// ── Card wrapper ──────────────────────────────────────────────────────────────
function Card({ children, className="", delay=0 }: { children:React.ReactNode; className?:string; delay?:number }) {
  return (
    <div className={`bg-white/88 backdrop-blur-sm rounded-3xl border border-rose-100 text-center ${className}`}
      style={{
        boxShadow:"0 14px 60px rgba(232,82,122,0.16), 0 2px 10px rgba(232,82,122,0.07)",
        animation:`slideInBottom 0.55s ${delay}s cubic-bezier(0.34,1.3,0.64,1) both`,
      }}>
      {children}
    </div>
  );
}

// ── Mission badge ─────────────────────────────────────────────────────────────
function Badge({ n, total }: { n:number; total:number }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-xs font-black mb-2 shadow-md"
      style={{ background:"linear-gradient(135deg,#E8527A,#FF85A1)" }}>
      <span>🎯</span><span>تحدي {n} من {total}</span>
    </div>
  );
}

// ── Stars ─────────────────────────────────────────────────────────────────────
function Stars({ n=5 }: { n?:number }) {
  return (
    <div className="flex gap-1 justify-center">
      {Array.from({length:n}).map((_,i) => (
        <span key={i} className="text-xl" style={{ animation:`starPop 2s ${i*0.2}s ease-in-out infinite` }}>⭐</span>
      ))}
    </div>
  );
}

// ── GIF player (loops by default, add subtle bounce) ─────────────────────────
function GifLoop({ src, alt, className="", style={} }: { src:string; alt:string; className?:string; style?:React.CSSProperties }) {
  return (
    <img src={src} alt={alt} className={`object-contain ${className}`}
      style={{ imageRendering:"auto", ...style }} />
  );
}

// ── Mood meter (fun interactive bar) ─────────────────────────────────────────
function MoodMeter({ label, emoji }: { label:string; emoji:string }) {
  const [val, setVal] = useState(0);
  const [locked, setLocked] = useState(false);
  useEffect(() => {
    if (locked) return;
    const t = setInterval(() => setVal(v => {
      if (v >= 100) { setLocked(true); return 100; }
      return v + 2;
    }), 35);
    return () => clearInterval(t);
  }, [locked]);
  const color = val < 40 ? "#FFB347" : val < 80 ? "#FF85A1" : "#E8527A";
  return (
    <div className="w-full space-y-1 text-right">
      <div className="flex justify-between text-xs font-bold text-rose-500">
        <span>{emoji} {val}%</span>
        <span>{label}</span>
      </div>
      <div className="w-full h-3 bg-rose-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all"
          style={{ width:`${val}%`, background:`linear-gradient(90deg,${color},#FFD700)`, transition:"width 0.05s linear" }} />
      </div>
    </div>
  );
}

// ── Pulse ring decoration ─────────────────────────────────────────────────────
function PulseRing({ children, color="#E8527A" }: { children:React.ReactNode; color?:string }) {
  return (
    <div className="relative inline-block">
      <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor:color }} />
      <div className="relative">{children}</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  S L I D E S
// ══════════════════════════════════════════════════════════════════════════════

// ── 0: Intro ──────────────────────────────────────────────────────────────────
function S0({ onNext }: { onNext:()=>void }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center size-full gap-3 px-5 py-6">
      {/* Avatar */}
      <div className="relative" style={{ animation:"float 3.5s ease-in-out infinite" }}>
        <div className="absolute inset-0 rounded-full" style={{
          background:"radial-gradient(circle,rgba(255,133,161,0.5),transparent 70%)",
          transform:"scale(1.4)", animation:"glowPulse 2.5s ease-in-out infinite",
        }} />
        <img src={pinkGirl} alt="jannat" className="w-36 h-36 object-cover rounded-full relative z-10"
          style={{ border:"4px solid #FF85A1", boxShadow:"0 0 30px rgba(255,133,161,0.55)" }} />
        <span className="absolute -top-2 -right-1 text-2xl z-20" style={{ animation:"heartbeat 1.4s infinite" }}>💖</span>
        <span className="absolute -bottom-1 -left-1 text-xl z-20" style={{ animation:"starPop 2s 0.5s infinite" }}>✨</span>
      </div>

      {/* Name */}
      <div className="text-center">
        <p className="text-rose-400 text-xs font-bold tracking-widest mb-1">🎀 هدية خاصة لـ 🎀</p>
        <h1 className="text-6xl font-black leading-none mb-1">
          <Sh>جَنَّات</Sh>
        </h1>
        <p className="text-rose-500 font-bold text-sm">🎓 بمناسبة نجاحها الرهيب من السادس الإعدادي</p>
      </div>

      {step >= 1 && (
        <Card className="px-5 py-4 max-w-xs w-full" delay={0}>
          <p className="text-rose-700 text-sm font-medium leading-loose">
            يا جنات يا عيني 🌹<br />
            هاي الصفحة مهيأة خصيصاً إلك<br />
            اضغطي وشوفي اشنو الفاجأة 🎀
          </p>
        </Card>
      )}

      {step >= 2 && (
        <button onClick={onNext}
          className="px-10 py-3.5 rounded-full font-black text-white text-lg shadow-xl transition-all hover:scale-105 active:scale-95"
          style={{
            background:"linear-gradient(135deg,#E8527A,#FF85A1)",
            boxShadow:"0 8px 30px rgba(232,82,122,0.45)",
            animation:"heartbeat 2.2s infinite slideInBottom 0.5s ease-out",
          }}>
          يلّه دلّيني! 🌸
        </button>
      )}

      <div className="flex gap-3">
        {["🌹","💖","🌸","✨","🎀","💫"].map((e,i) => (
          <span key={i} className="text-lg" style={{ animation:`sway ${2.5+i*0.3}s ${i*0.18}s ease-in-out infinite` }}>{e}</span>
        ))}
      </div>
    </div>
  );
}

// ── 1: تحدي ١ — هل دزّيتيها؟ ─────────────────────────────────────────────────
function S1({ onNext }: { onNext:()=>void }) {
  const [state, setState] = useState<"ask"|"yes"|"joke">("ask");

  return (
    <div className="flex flex-col items-center justify-center size-full gap-3 px-5 py-6">
      <Badge n={1} total={3} />

      <Card className="p-5 max-w-sm w-full" delay={0}>
        <GifLoop src={hoodiGirl} alt="cute" className="w-20 h-20 mx-auto mb-3"
          style={{ animation:"float 4s ease-in-out infinite", filter:"drop-shadow(0 4px 8px rgba(232,82,122,0.3))" }} />

        <h2 className="text-xl font-black text-rose-600 mb-2">سؤال جد مهم 📚</h2>
        <p className="text-rose-800 text-sm font-medium leading-relaxed mb-4">
          طول السنة... دگّيتيها وما خليتيها تگدر عليكِ؟
          الدراسة، الامتحانات، الضغط... واجهتيهم كلهم؟
        </p>

        {state === "ask" && (
          <div className="relative" style={{ height:"76px" }}>
            <button onClick={() => setState("yes")}
              className="absolute px-6 py-2.5 rounded-full font-bold text-white shadow-md text-sm hover:scale-105 transition-all"
              style={{ background:"linear-gradient(135deg,#E8527A,#FF85A1)", left:"4%", top:"50%", transform:"translateY(-50%)" }}>
              آي والله دگّيتها 💪
            </button>
            <EscapeBtn label="لا ما دگّيت 😴" onEscape={() => {}} />
          </div>
        )}

        {state === "yes" && (
          <div style={{ animation:"bounceIn 0.55s ease-out" }} className="space-y-3">
            <div className="text-4xl" style={{ animation:"heartbeat 1.5s infinite" }}>🥹</div>
            <p className="text-rose-600 font-bold text-sm leading-relaxed">
              عرفت! بس گلبي شايف تعبك من البداية 💝<br/>
              وأنا فخورة فيكِ والله فخورة يا قلبي!
            </p>
            <button onClick={onNext}
              className="px-7 py-2.5 rounded-full font-bold text-white shadow-md text-sm hover:scale-105 transition-all"
              style={{ background:"linear-gradient(135deg,#E8527A,#FF85A1)" }}>
              التحدي الجاي ➜
            </button>
          </div>
        )}
      </Card>

      {/* Stats meters */}
      <Card className="px-5 py-4 max-w-sm w-full space-y-2.5" delay={0.1}>
        <p className="text-rose-500 text-xs font-bold mb-1 text-center">📊 إحصائيات جنات السرية</p>
        <MoodMeter label="مستوى الذكاء" emoji="🧠" />
        <MoodMeter label="قوة التحمّل" emoji="💪" />
        <MoodMeter label="كمية الحلاوة" emoji="🌹" />
      </Card>
    </div>
  );
}

// ── 2: تحدي ٢ — الزر الهارب ──────────────────────────────────────────────────
function S2({ onNext }: { onNext:()=>void }) {
  const [escaped, setEscaped] = useState(0);
  const [answered, setAnswered] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center size-full gap-3 px-5 py-6">
      <Badge n={2} total={3} />

      <Card className="p-5 max-w-sm w-full" delay={0}>
        <img src={miku} alt="miku" className="w-20 h-20 object-contain mx-auto mb-2"
          style={{ animation:"float 3s 0.5s ease-in-out infinite", filter:"drop-shadow(0 4px 12px rgba(100,200,200,0.4))" }} />

        <h2 className="text-xl font-black text-rose-600 mb-1">تحدي صعب شوية 🤔</h2>
        <p className="text-rose-800 text-sm font-medium leading-relaxed mb-2">
          أحياناً تحسّين إنك تعبانة ولا أحد يفهم شعورك؟
        </p>
        {escaped > 0 && (
          <p className="text-rose-400 text-xs mb-2" style={{ animation:"slideInBottom 0.3s ease-out" }}>
            {escaped < 3 ? "😏 حاولي تمسكيه..." : escaped < 6 ? "😂 هاي الزر شطور مثلچ!" : "🤣 خلي عنه! هو مو راضي يتمسك!"}
          </p>
        )}

        {!answered ? (
          <div className="relative" style={{ height:"80px" }}>
            <button onClick={() => setAnswered(true)}
              className="absolute px-5 py-2.5 rounded-full font-bold text-white shadow-md text-sm"
              style={{ background:"linear-gradient(135deg,#E8527A,#FF85A1)", left:"4%", top:"50%", transform:"translateY(-50%)" }}>
              آي أحياناً أحس هيچ 🥲
            </button>
            <EscapeBtn label="لا ما وحدي 💪" onEscape={() => setEscaped(e => e+1)} />
          </div>
        ) : (
          <div style={{ animation:"bounceIn 0.55s ease-out" }} className="space-y-2">
            <div className="text-4xl">🤗</div>
            <p className="text-rose-600 font-bold text-sm leading-relaxed">
              يا عيني عليكِ 💞<br/>
              ربّك شايفك دايماً، وكل اللي يحبونك<br/>
              حاسين فيكِ حتى لو ما تگولين شي!
            </p>
            <button onClick={onNext}
              className="px-7 py-2.5 rounded-full font-bold text-white shadow-md text-sm hover:scale-105 transition-all"
              style={{ background:"linear-gradient(135deg,#E8527A,#FF85A1)" }}>
              التحدي الأخير ➜
            </button>
          </div>
        )}
      </Card>

      <Card className="px-5 py-3 max-w-sm w-full" delay={0.15}>
        <p className="text-rose-500 text-xs font-bold text-center">
          💡 معلومة: الزر هرب {escaped} مرة — وإنتِ ما هربتِ من شي بحياتك! 🌟
        </p>
      </Card>
    </div>
  );
}

// ── 3: تحدي ٣ — التحدي الأخير ────────────────────────────────────────────────
function S3({ onNext }: { onNext:()=>void }) {
  const [answered, setAnswered] = useState(false);
  const [clicked, setClicked] = useState<"yes"|"no"|null>(null);

  return (
    <div className="flex flex-col items-center justify-center size-full gap-3 px-5 py-6">
      <Badge n={3} total={3} />

      <Card className="p-5 max-w-sm w-full" delay={0}>
        <div className="text-4xl mb-2" style={{ animation:"heartbeat 1.5s infinite" }}>🎉</div>
        <h2 className="text-xl font-black text-rose-600 mb-2">السؤال الأهم! 👑</h2>

        <div className="space-y-2 text-right mb-4">
          <p className="text-rose-800 text-sm font-medium leading-relaxed">
            بعد كل هذا التعب والكد والصبر...
            <br />تگدرين تگولين للنفس: "أنا تستاهل كل شي حلو"؟ 🌹
          </p>
        </div>

        {!answered ? (
          <div className="relative" style={{ height:"80px" }}>
            <button onClick={() => { setAnswered(true); setClicked("yes"); }}
              className="absolute px-5 py-2.5 rounded-full font-bold text-white shadow-md text-sm hover:scale-105 transition-all"
              style={{ background:"linear-gradient(135deg,#E8527A,#FF85A1)", left:"4%", top:"50%", transform:"translateY(-50%)" }}>
              آي أستاهل! 👑
            </button>
            <EscapeBtn label="ما أستاهل 😔" onEscape={() => { setAnswered(true); setClicked("no"); }} />
          </div>
        ) : (
          <div style={{ animation:"bounceIn 0.55s ease-out" }} className="space-y-3">
            <Stars n={5} />
            {clicked === "yes" ? (
              <p className="text-rose-600 font-bold text-sm leading-relaxed">
                صح! وأنا بضمن إنك تستاهلين أكثر مما تتخيلين! 🌟<br/>
                النجاح هذا بس أول خطوة يا غالية 🚀
              </p>
            ) : (
              <p className="text-rose-600 font-bold text-sm leading-relaxed">
                گلبي 🥺 إنتِ تستاهلين الدنيا وما فيها!<br/>
                ربّك شايف تعبك وما ينسى صبرك أبد 💝
              </p>
            )}
            <button onClick={onNext}
              className="px-7 py-2.5 rounded-full font-bold text-white shadow-md text-sm hover:scale-105 transition-all"
              style={{ background:"linear-gradient(135deg,#FFD700,#FFA500)", animation:"heartbeat 1.5s infinite" }}>
              شوف المفاجأة 🎁
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}

// ── 4: رسالة المديح الأولى ───────────────────────────────────────────────────
function S4({ onNext }: { onNext:()=>void }) {
  const lines = [
    ["✨","إنتِ مو بس ناجحة من السادس الإعدادي..."],
    ["💪","إنتِ ناجحة بكل تعبك وصبرك ومثابرتك"],
    ["📚","كل ورقة درستيها وكل سؤال كتبتيه ما ضاع"],
    ["🌟","هذا النجاح يجيب البسمة على كل اللي يحبونك"],
    ["🤲","والله يكمّل عليكِ ويفتح إلك أبواب الخير الكبير"],
    ["👑","وإنتِ دايماً الأفضل بنظر اللي يعرفونك"],
  ];

  return (
    <div className="flex flex-col items-center justify-center size-full gap-3 px-5 py-6">
      <GifLoop src={dancingPinkHair} alt="celebrating"
        className="w-28 h-28 mx-auto"
        style={{ animation:"float 4s ease-in-out infinite", filter:"drop-shadow(0 4px 15px rgba(232,82,122,0.35))" }} />

      <Card className="p-5 max-w-sm w-full" delay={0}>
        <h2 className="text-2xl font-black mb-3"><Sh>يا جنات يا غالية</Sh></h2>
        <div className="space-y-2 text-right">
          {lines.map(([icon, text], i) => (
            <p key={i} className="text-rose-700 font-medium text-sm leading-loose"
              style={{ animation:`slideInBottom 0.45s ${0.05+i*0.1}s ease-out both` }}>
              {icon} {text}
            </p>
          ))}
        </div>
      </Card>

      <button onClick={onNext}
        className="px-8 py-3 rounded-full font-bold text-white shadow-lg hover:scale-105 transition-all"
        style={{ background:"linear-gradient(135deg,#E8527A,#FF85A1)" }}>
        في شي أحلى! 👇
      </button>
    </div>
  );
}

// ── 5: رسالة من القلب ────────────────────────────────────────────────────────
function S5({ onNext }: { onNext:()=>void }) {
  return (
    <div className="flex flex-col items-center justify-center size-full gap-3 px-5 py-6">
      <img src={catGirlSleep} alt="cat girl" className="w-28 h-28 object-cover rounded-2xl shadow-xl"
        style={{ animation:"float 3.5s ease-in-out infinite", border:"3px solid #FFB6C1" }} />

      <Card className="p-5 max-w-sm w-full space-y-3" delay={0}>
        <h2 className="text-xl font-black text-rose-600">💌 رسالة من گلبي</h2>
        <div
          className="rounded-2xl p-4 text-right space-y-2"
          style={{ background:"linear-gradient(135deg,#FFF0F5,#FFE4EE)", borderRight:"3px solid #E8527A" }}>
          <p className="text-rose-700 font-bold text-sm leading-loose">
            يا جنات...
          </p>
          <TypeWriter
            text="لو گدرت أوصف قد شبيبي فيكِ ما گدرت، لأن الكلام أضعف من الإحساس 💕"
            speed={50}
            className="text-rose-600 font-medium text-sm leading-loose"
          />
        </div>
        <div className="space-y-1.5 text-right">
          {[
            ["🦋","إنتِ مو بس طالبة ذكية — إنتِ واحدة بألف"],
            ["💫","وكل شي تحلمين فيه قريب منكِ أكثر مما تتخيلين"],
            ["🌸","واللي يحبونك شايفين فيكِ كل الفخر"],
            ["🤲","ربّك ما ينسى صبرك — وبركته دايماً وياكِ"],
          ].map(([icon,text],i) => (
            <p key={i} className="text-rose-700 font-medium text-sm leading-loose"
              style={{ animation:`slideInBottom 0.45s ${0.1+i*0.1}s ease-out both` }}>
              {icon} {text}
            </p>
          ))}
        </div>
      </Card>

      <button onClick={onNext}
        className="px-8 py-3 rounded-full font-bold text-white shadow-lg hover:scale-105 transition-all"
        style={{ background:"linear-gradient(135deg,#E8527A,#FF85A1)" }}>
        والله في أحلى 😭✨
      </button>
    </div>
  );
}

// ── 6: كلمات ذهب ─────────────────────────────────────────────────────────────
function S6({ onNext }: { onNext:()=>void }) {
  const [active, setActive] = useState(0);
  const quotes = [
    { q:"\"النجاح مو بالصدفة، هو ثمرة الصبر والاجتهاد، وإنتِ زرعتِ الاثنين...\"", e:"🌱" },
    { q:"\"كل دمعة تعب انسكبت... صارت ضوء بطريقك!\"", e:"💡" },
    { q:"\"الأذكياء يدرسون، لكن الأقوياء يكملون حتى لو تعبوا — وإنتِ الثنتين.\"", e:"👑" },
    { q:"\"مو المهم وين بدأتِ، المهم وين راحت توصلين.\"", e:"🚀" },
  ];
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a+1) % quotes.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center size-full gap-3 px-5 py-6">
      <Stars n={5} />

      <Card className="p-5 max-w-sm w-full space-y-4" delay={0}>
        <div className="text-4xl" style={{ animation:"starPop 2.2s ease-in-out infinite" }}>✨</div>
        <h2 className="text-xl font-black text-rose-600">كلام من ذهب 👑</h2>

        {/* Rotating quote */}
        <div className="rounded-2xl p-4 min-h-[90px] flex flex-col items-center justify-center transition-all duration-500"
          style={{ background:"linear-gradient(135deg,#FFF0F5,#FFE4EE)", borderRight:"3px solid #E8527A" }}
          key={active}>
          <span className="text-3xl mb-2">{quotes[active].e}</span>
          <p className="text-rose-600 font-bold text-sm leading-relaxed text-right"
            style={{ animation:"slideInBottom 0.4s ease-out" }}>
            {quotes[active].q}
          </p>
        </div>

        {/* Dot switcher */}
        <div className="flex gap-1.5 justify-center">
          {quotes.map((_,i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width:i===active?"18px":"8px", height:"8px", borderRadius:"999px",
              background:i===active?"#E8527A":"rgba(232,82,122,0.25)",
              transition:"all 0.35s ease", border:"none", cursor:"pointer",
            }} />
          ))}
        </div>

        <div className="space-y-1.5 text-right">
          {[["🤲","ربّك يوفّقك ويسهّل طريقك دايماً"],["💖","ومستقبلك يكون أضوى من النجوم"]].map(([ic,tx],i) => (
            <p key={i} className="text-rose-700 font-medium text-xs leading-loose">{ic} {tx}</p>
          ))}
        </div>
      </Card>

      <button onClick={onNext}
        className="px-8 py-3 rounded-full font-black text-white shadow-xl hover:scale-105 transition-all"
        style={{
          background:"linear-gradient(135deg,#FFD700,#FFA500)",
          boxShadow:"0 6px 25px rgba(255,165,0,0.4)",
          animation:"heartbeat 2s infinite",
        }}>
        شوف المفاجأة الكبيرة 🎁✨
      </button>
    </div>
  );
}

// ── 7: حفلة الرقص ────────────────────────────────────────────────────────────
function S7({ onNext }: { onNext:()=>void }) {
  const [reaction, setReaction] = useState<string|null>(null);
  const reactions = ["😂 صح صح!","🤣 هاي هي!","😭 والله إيد!","💀 ما توقعتها!","🤌 شبيحة!"];
  const [ri, setRi] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center size-full gap-2 px-4 py-5">
      <h2 className="text-xl font-black text-center" style={{ animation:"heartbeat 1.5s infinite" }}>
        <Sh>🎊 حفلة النجاح يا جنات! 🎊</Sh>
      </h2>
      <p className="text-rose-400 text-xs font-bold">الكل يحتفل وياكِ 🕺💃</p>

      {/* Dance grid */}
      <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
        {[
          { src:zeroTwo, label:"Zero Two ترقص 🌸", bg:"bg-amber-50" },
          { src:dancingPinkHair, label:"الحفلة تبدأ! 🎉", bg:"bg-white" },
          { src:hulkDance, label:"هالك: MBROOOK 💪", bg:"bg-green-50" },
          { src:cockroach, label:"صرصور الكاوبوي 🤠😂", bg:"bg-yellow-50" },
        ].map((item, i) => (
          <div key={i}
            className={`rounded-2xl overflow-hidden border-2 border-rose-200 shadow-lg cursor-pointer hover:scale-105 transition-all ${item.bg}`}
            style={{ animation:`slideInBottom 0.5s ${i*0.1}s ease-out both` }}
            onClick={() => { setReaction(reactions[ri % reactions.length]); setRi(r => r+1); }}>
            <GifLoop src={item.src} alt={item.label} className="w-full h-28" />
            <p className="text-rose-500 text-xs font-bold text-center py-1.5 bg-white/80">{item.label}</p>
          </div>
        ))}
      </div>

      {reaction && (
        <div className="px-5 py-2 rounded-2xl text-rose-600 font-black text-sm"
          style={{ background:"linear-gradient(135deg,#FFE4EE,#FFF0F5)", animation:"bounceIn 0.4s ease-out" }}>
          {reaction}
        </div>
      )}
      <p className="text-rose-400 text-xs">اضغطي على الصور للتفاعل 😄</p>

      <button onClick={onNext}
        className="px-9 py-3 rounded-full font-black text-white shadow-xl hover:scale-105 transition-all"
        style={{ background:"linear-gradient(135deg,#E8527A,#FF85A1)", boxShadow:"0 8px 30px rgba(232,82,122,0.45)" }}>
        الختام 🌹👑
      </button>
    </div>
  );
}

// ── 8: صالة الصور ────────────────────────────────────────────────────────────
function S8({ onNext }: { onNext:()=>void }) {
  const photos = [
    { src:pinkGirl, label:"عيوني 🌸", size:"big" },
    { src:miku, label:"ميكو تهدي وردة 🌹", size:"small" },
    { src:kawaiiCat, label:"قطة كيوت زيّك 🐱", size:"small" },
    { src:catGirlSleep, label:"راحة بعد التعب 😴💕", size:"small" },
    { src:mikuGun, label:"لا تزعلينا 😂", size:"small" },
  ];

  return (
    <div className="flex flex-col items-center justify-center size-full gap-3 px-5 py-5">
      <h2 className="text-xl font-black"><Sh>🖼️ صالة جنات الحلوة</Sh></h2>
      <p className="text-rose-400 text-xs font-bold">اضغطي على الصور 😄</p>

      <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
        {/* Big feature */}
        <div className="col-span-2 row-span-2">
          <PhotoCard src={photos[0].src} label={photos[0].label} big />
        </div>
        {photos.slice(1).map((p,i) => (
          <PhotoCard key={i} src={p.src} label={p.label} />
        ))}
      </div>

      <button onClick={onNext}
        className="px-8 py-3 rounded-full font-bold text-white shadow-lg hover:scale-105 transition-all"
        style={{ background:"linear-gradient(135deg,#E8527A,#FF85A1)" }}>
        ويّه 🌟 الختام!
      </button>
    </div>
  );
}

function PhotoCard({ src, label, big=false }: { src:string; label:string; big?:boolean }) {
  const [tapped, setTapped] = useState(false);
  const reactions = ["💖","✨","🌹","😍","🥹","💫"];
  const [hearts, setHearts] = useState<{id:number;e:string}[]>([]);

  const tap = () => {
    setTapped(true);
    setTimeout(() => setTapped(false), 300);
    const e = reactions[Math.floor(Math.random()*reactions.length)];
    const id = Date.now();
    setHearts(h => [...h.slice(-3), {id,e}]);
    setTimeout(() => setHearts(h => h.filter(x => x.id!==id)), 1000);
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden border-2 border-rose-200 shadow-md cursor-pointer transition-all ${tapped?"scale-95":"hover:scale-102"} ${big?"h-36":"h-[68px]"}`}
      onClick={tap}>
      <img src={src} alt={label} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-1.5">
        <span className="text-white text-[9px] font-bold leading-tight">{label}</span>
      </div>
      {hearts.map(h => (
        <span key={h.id} className="absolute top-1 right-2 text-xl pointer-events-none"
          style={{ animation:"floatUp 1s ease-out forwards" }}>{h.e}</span>
      ))}
    </div>
  );
}

// ── 9: Finale ─────────────────────────────────────────────────────────────────
function S9({ onRestart }: { onRestart:()=>void }) {
  const [confetti, setConfetti] = useState(false);
  const SENDER = "منتظر"; // اسم المُرسِل

  useEffect(() => {
    setConfetti(true);
    const t = setTimeout(() => setConfetti(false), 9000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center size-full gap-2 px-5 py-4">
      <Confetti active={confetti} />

      <div className="flex gap-1">
        {["🌹","🌷","🌸","🌹","🌷","🌸","🌹","🌷","🌸"].map((e,i) => (
          <span key={i} className="text-xl" style={{ animation:`roseBloom 0.5s ${i*0.09}s ease-out both` }}>{e}</span>
        ))}
      </div>

      {/* Miku hero */}
      <div style={{ animation:"float 3s ease-in-out infinite", filter:"drop-shadow(0 0 20px rgba(100,200,200,0.5))" }}>
        <img src={miku} alt="miku" className="w-28 h-28 object-contain" />
      </div>

      <Card className="p-5 max-w-sm w-full space-y-3" delay={0}>
        <div className="text-2xl font-black" style={{ animation:"bounceIn 0.8s ease-out" }}>
          <Sh>🎊 مبروك مبروك مبروك! 🎊</Sh>
        </div>
        <h2 className="text-2xl font-black" style={{ animation:"heartbeat 1.5s infinite" }}>
          <Sh>⭐ نجمة السادس الإعدادي ⭐</Sh>
        </h2>

        <div className="space-y-1.5 text-right">
          {[
            ["🥹","ما أگدر أعبّر عن قد شبيبي فيكِ يا جنات"],
            ["🌹","من السادس الإعدادي لأحسن مستقبل بالدنيا"],
            ["🤲","الله يكمّل عليكِ ويوفّقك كل خطوة تخطيها"],
            ["👑","ودايماً تبقين النجمة الأحلى بقلوبنا"],
            ["💫","إنتِ مو بس ناجحة — إنتِ فخر اللي يحبونك"],
          ].map(([ic,tx],i) => (
            <p key={i} className="text-rose-700 font-bold text-sm leading-loose"
              style={{ animation:`slideInBottom 0.4s ${i*0.1}s ease-out both` }}>
              {ic} {tx}
            </p>
          ))}
        </div>

        <Stars n={5} />

        {/* Sender reveal */}
        <div className="rounded-2xl p-3 text-center"
          style={{ background:"linear-gradient(135deg,#FFE4EE,#FFF0F5)", border:"2px solid #FFB6C1" }}>
          <p className="text-rose-400 text-xs font-medium mb-1">هاي الهدية مع كل الحب من</p>
          <p className="text-rose-600 font-black text-lg" style={{ animation:"heartbeat 2s infinite" }}>
            💌 {SENDER} 💌
          </p>
          <p className="text-rose-400 text-xs mt-1">دايماً فخور فيكِ 🌹</p>
        </div>
      </Card>

      {/* Supporting cast */}
      <div className="flex gap-3 items-end">
        <GifLoop src={zeroTwo} alt="" className="w-12 h-12" style={{ animation:"float 4s ease-in-out infinite" }} />
        <img src={pinkGirl} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-rose-300 shadow"
          style={{ animation:"float 3.5s 0.5s ease-in-out infinite" }} />
        <GifLoop src={dancingPinkHair} alt="" className="w-12 h-12"
          style={{ animation:"float 4.5s 1s ease-in-out infinite" }} />
        <GifLoop src={hulkDance} alt="" className="w-12 h-12"
          style={{ animation:"float 3.8s 0.3s ease-in-out infinite" }} />
      </div>

      <button onClick={onRestart}
        className="px-6 py-2 rounded-full font-bold text-rose-400 border-2 border-rose-200 bg-white/70 hover:scale-105 transition-all text-sm">
        من البداية 🔄
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  ROOT
// ══════════════════════════════════════════════════════════════════════════════
const TOTAL = 10;

export default function App() {
  const [idx, setIdx] = useState(0);
  const next     = useCallback(() => setIdx(i => Math.min(i+1, TOTAL-1)), []);
  const go       = useCallback((i: number) => setIdx(i), []);
  const restart  = useCallback(() => setIdx(0), []);

  const slides = [
    <S0 onNext={next} />,
    <S1 onNext={next} />,
    <S2 onNext={next} />,
    <S3 onNext={next} />,
    <S4 onNext={next} />,
    <S5 onNext={next} />,
    <S6 onNext={next} />,
    <S7 onNext={next} />,
    <S8 onNext={next} />,
    <S9 onRestart={restart} />,
  ];

  return (
    <div className="size-full relative overflow-hidden"
      style={{
        background:"linear-gradient(135deg,#FFE4EE 0%,#FFF0F5 30%,#FFE8F5 60%,#FFF4F8 100%)",
        backgroundSize:"400% 400%", animation:"gradientShift 10s ease infinite",
      }}>
      <FloatingBg />

      <div className="relative z-10 size-full overflow-y-auto" key={idx}
        style={{ animation:"slideInBottom 0.45s cubic-bezier(0.34,1.3,0.64,1)" }}>
        {slides[idx]}
      </div>

      <div className="fixed bottom-3 left-0 right-0 z-30 flex justify-center">
        <Dots cur={idx} total={TOTAL} go={go} />
      </div>
    </div>
  );
}
