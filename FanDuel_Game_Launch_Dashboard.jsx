import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend, Cell } from "recharts";

const DATA = [
  { game_id:"G007", game_name:"Haunted Mansion", game_type:"Slots", has_bonus:1, stakes:"Low", provider:"Red Tiger", d1_players:2471, d7_retention:73.2, d14_retention:51.9, d30_retention:33.9, total_ggr:63010, avg_rev:1.96, avg_session:26.5, grade:"C" },
  { game_id:"G008", game_name:"Galactic Gems", game_type:"Live Dealer", has_bonus:1, stakes:"High", provider:"IGT", d1_players:3972, d7_retention:73.0, d14_retention:51.7, d30_retention:33.9, total_ggr:501239, avg_rev:9.79, avg_session:26.6, grade:"A" },
  { game_id:"G016", game_name:"Mega Jackpot Rush", game_type:"Table", has_bonus:1, stakes:"High", provider:"Red Tiger", d1_players:1414, d7_retention:73.4, d14_retention:51.7, d30_retention:34.4, total_ggr:179280, avg_rev:9.84, avg_session:26.5, grade:"A" },
  { game_id:"G015", game_name:"Safari Quest", game_type:"Instant Win", has_bonus:1, stakes:"Mid", provider:"Pragmatic Play", d1_players:1414, d7_retention:71.8, d14_retention:51.4, d30_retention:32.7, total_ggr:69436, avg_rev:3.88, avg_session:25.9, grade:"B" },
  { game_id:"G006", game_name:"Diamond Royale", game_type:"Slots", has_bonus:1, stakes:"High", provider:"Playtech", d1_players:2635, d7_retention:71.1, d14_retention:51.0, d30_retention:33.0, total_ggr:321375, avg_rev:9.79, avg_session:25.7, grade:"A" },
  { game_id:"G012", game_name:"Lucky Leprechaun", game_type:"Table", has_bonus:0, stakes:"High", provider:"IGT", d1_players:1286, d7_retention:69.4, d14_retention:49.1, d30_retention:31.0, total_ggr:153745, avg_rev:9.81, avg_session:25.1, grade:"A" },
  { game_id:"G004", game_name:"Slam Dunk Slots", game_type:"Instant Win", has_bonus:0, stakes:"Low", provider:"NetEnt", d1_players:2312, d7_retention:67.4, d14_retention:46.9, d30_retention:29.5, total_ggr:51541, avg_rev:1.95, avg_session:23.1, grade:"C" },
  { game_id:"G020", game_name:"Vegas Legends", game_type:"Slots", has_bonus:1, stakes:"Low", provider:"Playtech", d1_players:2179, d7_retention:66.7, d14_retention:45.7, d30_retention:29.8, total_ggr:48809, avg_rev:1.96, avg_session:23.1, grade:"C" },
  { game_id:"G011", game_name:"Neon Nights", game_type:"Table", has_bonus:0, stakes:"High", provider:"Pragmatic Play", d1_players:3686, d7_retention:66.4, d14_retention:45.4, d30_retention:28.6, total_ggr:410116, avg_rev:9.83, avg_session:22.8, grade:"A" },
  { game_id:"G010", game_name:"Poseidon's Treasure", game_type:"Instant Win", has_bonus:0, stakes:"Mid", provider:"Pragmatic Play", d1_players:3896, d7_retention:65.6, d14_retention:45.0, d30_retention:27.6, total_ggr:169668, avg_rev:3.92, avg_session:22.3, grade:"B" },
  { game_id:"G002", game_name:"Dragon's Fortune", game_type:"Slots", has_bonus:1, stakes:"Low", provider:"Red Tiger", d1_players:2397, d7_retention:64.2, d14_retention:43.8, d30_retention:27.7, total_ggr:50647, avg_rev:1.97, avg_session:21.5, grade:"C" },
  { game_id:"G019", game_name:"Frost Kingdom", game_type:"Instant Win", has_bonus:0, stakes:"High", provider:"Light & Wonder", d1_players:875, d7_retention:64.1, d14_retention:43.7, d30_retention:26.4, total_ggr:91010, avg_rev:9.70, avg_session:21.8, grade:"A" },
  { game_id:"G009", game_name:"Wild West Gold", game_type:"Slots", has_bonus:1, stakes:"Low", provider:"Evolution", d1_players:3456, d7_retention:63.8, d14_retention:43.5, d30_retention:26.8, total_ggr:73175, avg_rev:1.96, avg_session:21.6, grade:"C" },
  { game_id:"G001", game_name:"Golden Pharaoh", game_type:"Slots", has_bonus:0, stakes:"Low", provider:"IGT", d1_players:2658, d7_retention:62.3, d14_retention:41.3, d30_retention:25.0, total_ggr:53870, avg_rev:1.96, avg_session:20.7, grade:"C" },
  { game_id:"G014", game_name:"Crystal Palace", game_type:"Slots", has_bonus:0, stakes:"High", provider:"IGT", d1_players:1520, d7_retention:61.2, d14_retention:40.9, d30_retention:24.6, total_ggr:146684, avg_rev:9.61, avg_session:20.0, grade:"A" },
  { game_id:"G017", game_name:"Pirate's Bounty", game_type:"Live Dealer", has_bonus:0, stakes:"Low", provider:"Blueprint", d1_players:2982, d7_retention:60.0, d14_retention:39.9, d30_retention:24.5, total_ggr:57424, avg_rev:1.96, avg_session:19.6, grade:"C" },
  { game_id:"G013", game_name:"Thunder Strike", game_type:"Slots", has_bonus:0, stakes:"Mid", provider:"Playtech", d1_players:2975, d7_retention:57.7, d14_retention:37.6, d30_retention:22.8, total_ggr:108170, avg_rev:3.93, avg_session:18.5, grade:"B" },
  { game_id:"G005", game_name:"Mystic Forest", game_type:"Instant Win", has_bonus:0, stakes:"Mid", provider:"IGT", d1_players:2094, d7_retention:54.4, d14_retention:35.3, d30_retention:20.8, total_ggr:71916, avg_rev:3.93, avg_session:17.1, grade:"B" },
  { game_id:"G018", game_name:"Eternal Flame", game_type:"Slots", has_bonus:0, stakes:"High", provider:"Red Tiger", d1_players:3846, d7_retention:52.0, d14_retention:34.2, d30_retention:19.5, total_ggr:315156, avg_rev:9.88, avg_session:16.2, grade:"A" },
  { game_id:"G003", game_name:"Classic 7s Deluxe", game_type:"Slots", has_bonus:0, stakes:"High", provider:"IGT", d1_players:1975, d7_retention:52.7, d14_retention:33.6, d30_retention:19.5, total_ggr:163123, avg_rev:9.91, avg_session:16.2, grade:"A" },
];

const GC = { A:"#16a34a", B:"#2563eb", C:"#d97706", D:"#dc2626" };
const GB = { A:"#dcfce7", B:"#dbeafe", C:"#fef3c7", D:"#fee2e2" };
const fmt = n => n >= 1e6 ? `$${(n/1e6).toFixed(1)}M` : n >= 1e3 ? `$${Math.round(n/1e3)}K` : `$${n}`;

export default function App() {
  const [gf, setGf] = useState("All");
  const [tf, setTf] = useState("All");
  const [sort, setSort] = useState("d14_retention");

  const fd = useMemo(() => {
    let d = [...DATA];
    if (gf !== "All") d = d.filter(g => g.grade === gf);
    if (tf !== "All") d = d.filter(g => g.game_type === tf);
    d.sort((a, b) => b[sort] - a[sort]);
    return d;
  }, [gf, tf, sort]);

  const tots = useMemo(() => ({
    ggr: fd.reduce((s, g) => s + g.total_ggr, 0),
    d14: fd.length ? Math.round(fd.reduce((s, g) => s + g.d14_retention, 0) / fd.length * 10) / 10 : 0,
    rev: fd.length ? Math.round(fd.reduce((s, g) => s + g.avg_rev, 0) / fd.length * 100) / 100 : 0,
    pla: fd.reduce((s, g) => s + g.d1_players, 0),
  }), [fd]);

  const bonus = useMemo(() => {
    const b = DATA.filter(g => g.has_bonus), nb = DATA.filter(g => !g.has_bonus);
    return [
      { label: "With bonus", d14: Math.round(b.reduce((s, g) => s + g.d14_retention, 0) / b.length * 10) / 10 },
      { label: "No bonus", d14: Math.round(nb.reduce((s, g) => s + g.d14_retention, 0) / nb.length * 10) / 10 },
    ];
  }, []);

  const types = useMemo(() => {
    const t = {};
    DATA.forEach(g => { if (!t[g.game_type]) t[g.game_type] = { ggr: 0, p: 0 }; t[g.game_type].ggr += g.total_ggr; t[g.game_type].p += g.d1_players; });
    return Object.entries(t).map(([k, v]) => ({ type: k, gpp: Math.round(v.ggr / v.p * 100) / 100 })).sort((a, b) => b.gpp - a.gpp);
  }, []);

  const Btn = ({ active, onClick, children, color }) => (
    <button onClick={onClick} style={{ padding: "4px 12px", borderRadius: 6, border: active ? "2px solid #0f172a" : "1px solid #e2e8f0", background: active ? (color || "#f1f5f9") : "#fff", color: active ? (color ? GC[color] : "#0f172a") : "#64748b", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{children}</button>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 880, margin: "0 auto" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#0f172a" }}>New game launch performance tracker</h1>
        <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0" }}>FanDuel Casino | 20 games, 30-day window | Sai Tarun Reddy</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8, marginBottom: 16 }}>
        {[["Total GGR", fmt(tots.ggr)], ["Avg D14 retention", `${tots.d14}%`], ["Avg GGR/session", `$${tots.rev}`], ["Unique players", tots.pla.toLocaleString()]].map(([l, v], i) => (
          <div key={i} style={{ background: "#f8fafc", borderRadius: 8, padding: "12px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>{l}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginTop: 2 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>Grade:</span>
        {["All","A","B","C","D"].map(g => <Btn key={g} active={gf===g} onClick={() => setGf(g)} color={g!=="All"?g:null}>{g==="All"?"All":`${g}`}</Btn>)}
        <span style={{ margin: "0 4px", color: "#e2e8f0" }}>|</span>
        <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>Type:</span>
        {["All","Slots","Table","Live Dealer","Instant Win"].map(t => <Btn key={t} active={tf===t} onClick={() => setTf(t)}>{t}</Btn>)}
      </div>

      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
              {[["grade","Grade",50],["game_name","Game",130],["game_type","Type",76],["d7_retention","D7%",58],["d14_retention","D14%",58],["d30_retention","D30%",58],["total_ggr","GGR",74],["avg_rev","GGR/S",62],["avg_session","Min",50],["has_bonus","Bonus",46]].map(([k,l,w]) => (
                <th key={k} onClick={() => !["game_name","game_type","has_bonus"].includes(k) && setSort(k)} style={{ padding: "6px 4px", textAlign: k==="game_name"?"left":"center", color: "#64748b", fontWeight: 600, cursor: ["game_name","game_type","has_bonus"].includes(k)?"default":"pointer", width: w, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.3 }}>{l}{sort===k?" ↓":""}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fd.map((g, i) => (
              <tr key={g.game_id} style={{ borderBottom: "1px solid #f1f5f9", background: i%2===0?"#fff":"#fafbfc" }}>
                <td style={{ padding: "6px 4px", textAlign: "center" }}><span style={{ display: "inline-block", width: 26, height: 20, lineHeight: "20px", borderRadius: 4, background: GB[g.grade], color: GC[g.grade], fontWeight: 700, fontSize: 11, textAlign: "center" }}>{g.grade}</span></td>
                <td style={{ padding: "6px 4px", fontWeight: 500, color: "#0f172a", fontSize: 11.5 }}>{g.game_name}</td>
                <td style={{ padding: "6px 4px", textAlign: "center", color: "#64748b", fontSize: 11 }}>{g.game_type}</td>
                <td style={{ padding: "6px 4px", textAlign: "center" }}>{g.d7_retention}%</td>
                <td style={{ padding: "6px 4px", textAlign: "center", fontWeight: 700, color: g.d14_retention>=45?"#16a34a":g.d14_retention>=38?"#d97706":"#dc2626" }}>{g.d14_retention}%</td>
                <td style={{ padding: "6px 4px", textAlign: "center" }}>{g.d30_retention}%</td>
                <td style={{ padding: "6px 4px", textAlign: "center", fontWeight: 500 }}>{fmt(g.total_ggr)}</td>
                <td style={{ padding: "6px 4px", textAlign: "center" }}>${g.avg_rev}</td>
                <td style={{ padding: "6px 4px", textAlign: "center", color: "#64748b" }}>{g.avg_session}</td>
                <td style={{ padding: "6px 4px", textAlign: "center" }}>{g.has_bonus?"✓":"—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 16, marginBottom: 20 }}>
        <div>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 6 }}>Bonus round impact on D14 retention</h3>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={bonus} layout="vertical" margin={{ left: 10, right: 20 }}>
              <XAxis type="number" domain={[0, 60]} tickFormatter={v => `${v}%`} fontSize={10} />
              <YAxis type="category" dataKey="label" width={72} fontSize={10} />
              <Tooltip formatter={v => `${v}%`} />
              <Bar dataKey="d14" radius={[0,4,4,0]} barSize={22}><Cell fill="#16a34a" /><Cell fill="#94a3b8" /></Bar>
            </BarChart>
          </ResponsiveContainer>
          <p style={{ fontSize: 10, color: "#64748b", marginLeft: 10 }}>Bonus games retain 1.2x better at Day 14</p>
        </div>
        <div>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 6 }}>GGR per player by game type</h3>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={types} margin={{ left: 0, right: 20 }}>
              <XAxis dataKey="type" fontSize={10} />
              <YAxis tickFormatter={v => `$${v}`} fontSize={10} />
              <Tooltip formatter={v => `$${v}`} />
              <Bar dataKey="gpp" radius={[4,4,0,0]} barSize={32} fill="#2563eb" name="GGR/player" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 6 }}>Retention curves (top 10 by {sort.replace("_"," ")})</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={fd.slice(0,10).map(g => ({ name: g.game_name.length > 12 ? g.game_name.slice(0,11)+".." : g.game_name, D7: g.d7_retention, D14: g.d14_retention, D30: g.d30_retention }))} margin={{ left: 5, right: 10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" fontSize={9} angle={-35} textAnchor="end" interval={0} height={55} />
            <YAxis domain={[10, 80]} tickFormatter={v => `${v}%`} fontSize={10} />
            <Tooltip formatter={v => `${v}%`} />
            <Legend verticalAlign="top" height={28} iconSize={8} wrapperStyle={{ fontSize: 10 }} />
            <Line type="monotone" dataKey="D7" stroke="#16a34a" strokeWidth={2} dot={{ r: 2.5 }} name="Day 7" />
            <Line type="monotone" dataKey="D14" stroke="#2563eb" strokeWidth={2} dot={{ r: 2.5 }} name="Day 14" />
            <Line type="monotone" dataKey="D30" stroke="#d97706" strokeWidth={2} dot={{ r: 2.5 }} name="Day 30" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, marginBottom: 12 }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 6 }}>Key findings</h3>
        <div style={{ fontSize: 11.5, color: "#334155", lineHeight: 1.7 }}>
          <p style={{ margin: "0 0 4px" }}><strong>1.</strong> Bonus round games retain 1.2x better at D14 (48.8% vs 41.1%) and drive longer sessions. Prioritize bonus mechanics in new game procurement.</p>
          <p style={{ margin: "0 0 4px" }}><strong>2.</strong> High-stakes games dominate GGR per player but have smaller player pools. Balance the content mix between high-stakes revenue drivers and low-stakes volume builders.</p>
          <p style={{ margin: "0 0 4px" }}><strong>3.</strong> The steepest retention drop is D1 to D7. Games that hold 65%+ at D7 tend to stabilize, making the first week the highest-leverage promotion window.</p>
        </div>
      </div>

      <p style={{ fontSize: 9, color: "#94a3b8", textAlign: "center" }}>Sai Tarun Reddy | github.com/saitarunreddymittapalli-design</p>
    </div>
  );
}
