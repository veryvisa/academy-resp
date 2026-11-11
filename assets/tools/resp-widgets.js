/* RESP 家庭实战：计算器与演示的界面层。页面里放 <div data-resp-widget="名字"></div> 即挂载。
 * 计算全部走 RESPCalc（resp-calc.js），常量全部走 RESP_RULES（resp-rules.js，由 rules jsonl 生成）。 */
(function () {
  "use strict";
  const C = window.RESPCalc, R = window.RESP_RULES;
  if (!C || !R) return;
  const V = C.V;
  const THIS_YEAR = new Date().getFullYear();
  const $ = (tag, attrs, html) => { const e = document.createElement(tag); if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; return e; };
  const money = (x) => (x < 0 ? "−" : "") + "$" + Math.abs(Math.round(x)).toLocaleString("en-CA");
  const money2 = (x) => (x < 0 ? "−" : "") + "$" + Math.abs(x).toLocaleString("en-CA", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  const pct = (x) => (Math.round(x * 1000) / 10) + "%";
  const src = (id, label) => R[id] ? `<a href="${R[id].url}" target="_blank" rel="noopener">${label || "来源"}</a>` : "";
  const note = (h) => `<p class="rw-note">${h}</p>`;
  function field(label, name, value, type, extra) {
    type = type || "number";
    if (type === "select") return `<label class="rw-f"><span>${label}</span><select name="${name}">${extra.map(([v, t]) => `<option value="${v}"${String(v) === String(value) ? " selected" : ""}>${t}</option>`).join("")}</select></label>`;
    if (type === "check") return `<label class="rw-f rw-check"><input type="checkbox" name="${name}"${value ? " checked" : ""}><span>${label}</span></label>`;
    return `<label class="rw-f"><span>${label}</span><input type="${type}" name="${name}" value="${value}"${extra ? " " + extra : ""}></label>`;
  }
  function form(root, html, run) {
    const f = $("form", { class: "rw-form" }, html);
    const out = $("div", { class: "rw-out", "aria-live": "polite" });
    root.append(f, out);
    const read = () => { const o = {}; for (const el of f.elements) { if (!el.name) continue; o[el.name] = el.type === "checkbox" ? el.checked : (el.type === "number" || el.type === "range") ? +el.value : el.value; } return o; };
    const go = () => { try { out.innerHTML = run(read(), out) || ""; } catch (e) { out.innerHTML = `<p class="rw-err">算不出来：${e.message}</p>`; } };
    f.addEventListener("input", go); f.addEventListener("change", go); f.addEventListener("submit", (e) => { e.preventDefault(); go(); });
    go();
    return { f, out, go, read };
  }
  const provOpts = [["BC", "卑诗 BC"], ["ON", "安大略 ON"], ["QC", "魁北克 QC"], ["OT", "其他省"]];
  const tierOpts = [["high", `家庭调整后净收入高于 ${money(V("acesg_second_threshold"))}`], ["mid", `${money(V("acesg_first_threshold"))}–${money(V("acesg_second_threshold"))}（额外 10%）`], ["low", `不超过 ${money(V("acesg_first_threshold"))}（额外 20%）`]];
  function parseHist(s) { const h = {}; String(s || "").split(/[,，;\s]+/).forEach((p) => { const m = p.match(/^(\d{4})[:：=](\d+(?:\.\d+)?)$/); if (m) h[+m[1]] = (h[+m[1]] || 0) + +m[2]; }); return h; }

  // ── 1 补助最大化规划器 ─────────────────────────────────────
  function planner(root) {
    form(root,
      field("孩子出生年", "by", 2016, "number", 'min="2007" max="' + THIS_YEAR + '"') +
      field("出生月", "bm", 6, "number", 'min="1" max="12"') +
      field("开始在加拿大居住的年份（加拿大出生就填出生年）", "ry", 2021, "number", 'min="2007" max="' + THIS_YEAR + '"') +
      field("现在住哪个省", "prov", "BC", "select", provOpts) +
      field("家庭收入档（用于额外 CESG）", "tier", "high", "select", tierOpts) +
      `<label class="rw-f rw-wide"><span>已经供过的款（每孩，格式 年份:金额，逗号隔开；没有就空着）</span><input name="hist" value="2021:2500, 2022:2500"></label>`,
      (o) => {
        const hist = parseHist(o.hist);
        const common = { birthYear: o.by, residentYear: o.ry, tier: o.tier, history: hist, thisYear: THIS_YEAR, planFrom: THIS_YEAR };
        const a = C.planGrants(Object.assign({ mode: "esdc" }, common));
        const b = C.planGrants(Object.assign({ mode: "statute" }, common));
        const age = THIS_YEAR - o.by;
        const bct = C.bctesgStatus(o.by, o.bm, new Date(), o.prov);
        const future = a.rows.filter((r) => r.year >= THIS_YEAR);
        const rows = a.rows.map((r) => {
          const rb = b.rows.find((x) => x.year === r.year) || {};
          const cls = r.year < THIS_YEAR ? "rw-past" : r.year === THIS_YEAR ? "rw-now" : "";
          return `<tr class="${cls}"><td>${r.year}</td><td>${r.age}</td><td>${money(r.contrib)}</td><td>${money(r.basic + r.extra)}</td><td>${money(r.total_to_date)}</td><td>${money((rb.basic || 0) + (rb.extra || 0))}</td><td class="rw-small">${r.note || rb.note || ""}</td></tr>`;
        }).join("");
        const same = a.total === b.total;
        let clb = "";
        if (o.tier === "low" && o.by >= V("clb_birth_from")) {
          const yrs = Math.max(0, Math.min(THIS_YEAR, o.by + V("clb_last_age")) - Math.max(o.by, o.ry) + 1);
          clb = `<li><b>加拿大学习债券 CLB</b>：低收入年份每年都算的话，最多约 ${money(C.clbEstimate(o.by, o.ry, yrs))}（不用供款；要在孩子满 ${V("clb_apply_age")} 岁前申请，照护人须报税并有 CCB 资格）。${src("clb_first")}</li>`;
        }
        if (age > V("cesg_last_age")) return `<p class="rw-big">孩子今年 ${age} 岁，已过 CESG 的最后一年（满 17 岁那年）。</p>` + note("还能开 RESP，账户里的收益照样延税，但联邦 CESG 不会再付。") ;
        return `<div class="rw-kpis">
            <div><small>按 ESDC 系统口径（从出生年累积，默认）</small><b>${money(a.total)}</b><span>${a.reach7200 ? "能拿满 7,200" : "拿不满 7,200"}</span></div>
            <div><small>按法条字面（整年不在加拿大的年份不计）</small><b>${money(b.total)}</b><span>${same ? "两种口径结果相同" : "差 " + money(a.total - b.total)}</span></div>
          </div>
          <ul class="rw-list">
            <li><b>今年建议每孩供款</b>：${money((future[0] || {}).contrib || 0)}（拿满今年能拿的 CESG 所需最少额；多存不多给补助）。</li>
            <li><b>16/17 岁条件</b>：${a.cond1617 ? "按这个计划会满足" : "<span class=rw-warn>不满足</span>：15 岁那年年底前累计供款不到 " + money(V("cesg_1617_min_total")) + "，且没有 4 个年度各存 100"}。${src("cesg_1617_min_total")}</li>
            <li><b>BC 省 BCTESG ${money(V("bctesg_amount"))}</b>：${bct.why}${bct.close ? `（窗口 ${bct.open.getFullYear()}-${String(bct.open.getMonth() + 1).padStart(2, "0")} 至 ${bct.close.getFullYear()}-${String(bct.close.getMonth() + 1).padStart(2, "0")} 前一天）` : ""}。${src("bctesg_window")}</li>
            ${o.prov === "QC" ? `<li><b>魁北克 QESI</b>：另有当年净供款 10%、每年最多 250（有结转 500）、终身 3,600，本表未计。${src("qesi")}</li>` : ""}
            ${clb}
          </ul>
          <div class="rw-scroll"><table class="rw-table"><thead><tr><th>年份</th><th>年龄</th><th>每孩供款</th><th>补助（ESDC 口径）</th><th>累计</th><th>补助（法条口径）</th><th>说明</th></tr></thead><tbody>${rows}</tbody></table></div>`
          + note(`灰色行是你填的历史；之后按「拿满当年可拿补助」给建议额。补助按 ${pct(V("cesg_rate"))}、单年最多 ${money(V("cesg_annual_max_carry"))}、终身 ${money(V("cesg_lifetime"))} 计 ${src("cesg_annual_max_carry")}。两种额度口径：ESDC 发起人指引写「从出生年开始累积」${src("cesg_room_start_esdc", "原文")}；法条把整年不是加拿大居民的年份排除 ${src("cesg_room_start_statute", "原文")}。实际能追补多少，以 RESP 机构查到的 ESDC 系统可用额度为准。示意测算，不是 ESDC 核定。`);
      });
  }

  // ── 2 增长模拟 ───────────────────────────────────────────
  function growth(root) {
    form(root,
      field("孩子出生年", "by", 2020, "number") + field("从哪年开始存", "start", THIS_YEAR, "number") +
      field("每孩每年供款", "amt", 2500, "number", 'step="100" min="0"') + field("已有账户余额", "bal", 0, "number", 'step="100" min="0"') +
      field("假设年化收益率 A（%）", "r1", 3, "number", 'step="0.5"') + field("B（%）", "r2", 5, "number", 'step="0.5"') + field("C（%）", "r3", 7, "number", 'step="0.5"') +
      field("家庭收入档", "tier", "high", "select", tierOpts),
      (o) => {
        const lastYear = o.by + 17;
        const hist = {}; for (let y = o.start; y <= lastYear; y++) hist[y] = o.amt;
        const p = C.planGrants({ birthYear: o.by, history: hist, planFrom: 9999, tier: o.tier });
        const flows = [{ contrib: o.bal, grant: 0 }].concat(p.rows.filter((r) => r.year >= o.start).map((r) => ({ contrib: r.contrib, grant: r.basic + r.extra })));
        const res = [o.r1, o.r2, o.r3].map((x) => [x, C.grow(flows, x / 100)]);
        const maxB = Math.max(...res.map(([, g]) => g.balance), 1);
        return `<p>到 ${lastYear} 年底（孩子 17 岁那年）账户大约是：</p>` + res.map(([x, g]) => `
          <div class="rw-stack"><span class="rw-lbl">${x}%</span><div class="rw-bar" style="width:${(g.balance / maxB) * 100}%">
            <i style="flex:${g.principal}" class="rw-p" title="本金"></i><i style="flex:${g.grants}" class="rw-g" title="补助"></i><i style="flex:${Math.max(0, g.growth)}" class="rw-r" title="收益"></i></div>
            <span class="rw-val">${money(g.balance)}</span></div>
          <p class="rw-small">本金 ${money(g.principal)} · 补助 ${money(g.grants)} · 收益 ${money(g.growth)}</p>`).join("")
          + `<p class="rw-legend"><i class="rw-p"></i>本金（取出免税）<i class="rw-g"></i>政府补助<i class="rw-r"></i>投资收益（补助＋收益以 EAP 取出时算学生收入）</p>`
          + note("收益率是你自己填的假设，不是预测，也不是任何产品的历史回报；实际可能更低，也可能亏损。越接近入学越该把波动大的资产换成稳的——这是机制上的取舍，不是具体建议。");
      });
  }

  // ── 3 取款模拟 ───────────────────────────────────────────
  function eap(root) {
    form(root,
      field("要以 EAP 取出的补助＋收益合计", "tot", 30000, "number", 'step="500"') + field("分几年取", "yrs", 4, "number", 'min="1" max="8"') +
      field("学生每年其他收入（打工、实习）", "other", 8000, "number", 'step="500"') + field("学生报税所在省", "prov", "BC", "select", [["BC", "BC"], ["ON", "ON"]]) +
      field("每年学费（联邦学费抵免用，可填 0）", "tui", 0, "number", 'step="500"'),
      (o) => {
        const r = C.eapPlan({ eapTotal: o.tot, years: o.yrs, otherIncome: o.other, prov: o.prov, tuition: o.tui });
        return `<div class="rw-kpis"><div><small>分 ${o.yrs} 年取，EAP 带来的税合计</small><b>${money(r.spreadTax)}</b></div><div><small>假如一年全取</small><b>${money(r.lumpTax)}</b></div></div>
          <div class="rw-scroll"><table class="rw-table"><thead><tr><th>第几年</th><th>当年 EAP</th><th>因 EAP 多交的税</th></tr></thead><tbody>${r.rows.map((x) => `<tr><td>${x.year}</td><td>${money(x.eap)}</td><td>${money(x.taxOnEap)}</td></tr>`).join("")}</tbody></table></div>`
          + note(`EAP 计入学生收入、由学生报税；本金部分（PSE）免税退回，不进任何人的收入 ${src("eap_taxed_to_student")}。全日制前 13 个连续周 EAP 最多 ${money(r.first13Cap)} ${src("eap_first13_ft")}。本表只计联邦与省的基本个人额和（可选）联邦学费额，没算 CPP/EI 与其他抵免；安省附加税未计。示意，不是报税。`);
      });
  }

  // ── 4 不读书怎么办 ───────────────────────────────────────
  function noschool(root) {
    form(root,
      field("本金（你存进去的）", "pr", 30000, "number", 'step="500"') + field("CESG（含额外）", "cesg", 7200, "number", 'step="100"') +
      field("CLB", "clb", 0, "number", 'step="100"') + field("BCTESG", "bct", 1200, "number", 'step="100"') +
      field("账户里的收益（不含上面三项）", "inc", 25000, "number", 'step="500"') + field("供款人今年边际税率（%）", "mr", 30, "number", 'step="1"') +
      field("供款人 RRSP 可用额度", "room", 20000, "number", 'step="500"') + field("将来从 RRSP 取出时预计税率（%）", "rr", 20, "number", 'step="1"') +
      field("魁北克居民", "qc", false, "check"),
      (o) => {
        const r = C.noSchool({ principal: o.pr, cesg: o.cesg, clb: o.clb, bctesg: o.bct, income: o.inc, marginal: o.mr / 100, rrspRoom: o.room, retireRate: o.rr / 100, qc: o.qc });
        return `<div class="rw-scroll"><table class="rw-table"><thead><tr><th>做法</th><th>本金</th><th>补助</th><th>收益到手</th><th>备注</th></tr></thead><tbody>
          <tr><td>等：孩子以后再读（计划最长约 ${V("resp_max_years").general} 年）</td><td>留在账户</td><td>留在账户</td><td>继续延税</td><td>很多人二十多岁才读书、读职业课程，别急着关户</td></tr>
          <tr><td>换给兄弟姐妹（家庭计划或同父母的个人计划）</td><td>转过去</td><td>CESG 可跟着转（每人仍受 ${money(V("cesg_lifetime"))} 上限），CLB 不行</td><td>转过去</td><td>接收的孩子通常要未满 21 岁 ${src("family_plan_grant_share")}</td></tr>
          <tr><td>关户：收益直接取（AIP）</td><td>${money(r.principalBack)} 免税</td><td>退还 ${money(r.grantsReturned)}</td><td>${money(r.aipDirectNet)}</td><td>边际税率 ＋ ${pct(r.extraRate)} 附加税 ${src("aip_extra_tax")}</td></tr>
          <tr><td>关户：收益转 RRSP（最多 ${money(V("aip_rrsp_max"))}）</td><td>${money(r.principalBack)} 免税</td><td>退还 ${money(r.grantsReturned)}</td><td>约 ${money(r.aipViaRrspNet)}</td><td>转入 ${money(r.rrspMoved)}，今天不交税，将来从 RRSP 取出时按当时税率交 ${src("aip_rrsp_max")}</td></tr>
          </tbody></table></div>`
          + note(`AIP 能付有条件：一般要计划开户第 9 年之后、所有受益人满 21 岁且没在读书（或计划到期），供款人要是加拿大居民 ${src("aip_conditions")}。补助不读书一律退回 ${src("grants_repaid")}。示意测算；是否转 RRSP、怎么安排报税年份，找持牌税务专业人士按你家的全盘情况算。`);
      });
  }

  // ── 5 节税×福利联动 ───────────────────────────────────────
  function linkage(root) {
    form(root,
      field("省份", "prov", "BC", "select", [["BC", "卑诗 BC"], ["ON", "安大略 ON"]]) +
      field("供款人（A）年收入（净收入）", "a", 70000, "number", 'step="1000"') + field("配偶（B）年收入", "b", 30000, "number", 'step="1000"') +
      field("单亲家庭", "single", false, "check") +
      `<label class="rw-f rw-wide"><span>孩子年龄（逗号隔开）</span><input name="ages" value="4, 9"></label>` +
      field("RRSP 供款（A 名下）", "rrsp", 10000, "number", 'step="500"') + field("FHSA 供款（A 名下）", "fhsa", 0, "number", 'step="500"') +
      field("TFSA 供款", "tfsa", 0, "number", 'step="500"') + field("RESP 全年供款（所有孩子合计）", "resp", 5000, "number", 'step="500"'),
      (o) => {
        const ages = String(o.ages).split(/[,，\s]+/).map(Number).filter((x) => !isNaN(x) && String(x) !== "");
        const L = C.linkage({ prov: o.prov, incA: o.a, incB: o.b, single: o.single, ages, rrsp: o.rrsp, fhsa: o.fhsa, tfsa: o.tfsa, resp: o.resp });
        const tierName = { high: "无额外", mid: "额外 10%", low: "额外 20%" };
        const row = (k, v, s) => `<tr><td>${k}</td><td class="rw-n">${money2(v)}</td><td class="rw-small">${s || ""}</td></tr>`;
        return `<div class="rw-kpis"><div><small>这笔钱一年里合计「多拿」</small><b>${money(L.total)}</b><span>退税＋福利增量＋RESP 补助</span></div>
          <div><small>家庭调整后净收入</small><b>${money(L.afni0)} → ${money(L.afni1)}</b><span>RRSP/FHSA 抵扣只降低 A 的收入</span></div></div>
          <div class="rw-scroll"><table class="rw-table"><tbody>
          ${row("A 的个税节省（联邦＋省）", L.taxSave, "按 2026 税阶与基本个人额算的差 " + src("fed_brackets"))}
          ${row("CCB 牛奶金增量（下一福利年）", L.ccb.delta, money(L.ccb.before) + " → " + money(L.ccb.after) + " " + src("ccb_rates"))}
          ${row("杂货与必需品福利 CGEB（原 GST/HST 抵免）增量", L.cgeb.delta, money(L.cgeb.before) + " → " + money(L.cgeb.after) + " " + src("cgeb_adult"))}
          ${row(L.provBenefit.name + " 增量", L.provBenefit.delta, money(L.provBenefit.before) + " → " + money(L.provBenefit.after) + " " + src(L.prov === "BC" ? "bcfb_max" : "ocb_max"))}
          ${row("RESP 基本 CESG（当年供款的 20%）", L.cesgBasic, "每孩最多 " + money(V("cesg_annual_max")) + "（有未用额度可到 1,000，这里按当年额度算）")}
          ${row("额外 CESG 变化", L.acesg.delta, tierName[L.acesg.tierBefore] + " → " + tierName[L.acesg.tierAfter] + " " + src("acesg_first_threshold"))}
          </tbody></table></div>
          <ul class="rw-list">
            <li><b>CLB 资格</b>：抵扣前 ${L.clb.before ? "符合" : "不符合"}，抵扣后 ${L.clb.after ? "符合" : "不符合"}${!L.clb.before && L.clb.after ? "——<b>这一步把孩子带进了学习债券</b>，首年 500、此后每年 100" : ""}。${src("clb_income_1to3")}</li>
            ${L.tfsaNote ? `<li>${L.tfsaNote}。</li>` : ""}
          </ul>`
          + note(`时间差要看清：你 ${THIS_YEAR} 年的抵扣，要等报完 ${THIS_YEAR} 年税，才从 ${THIS_YEAR + 1} 年 7 月那个福利年起影响 CCB、CGEB 与省福利；额外 CESG 与 CLB 看的是用于当年 1 月 CCB 的收入，也就是再晚一年。本表用 ${R.ccb_benefit_year.value} 的参数示意。只算基本个人额，没计 CPP/EI 抵免、BC 低收入减税、安省附加税与健康费；RRSP 将来取出要交税，TFSA 取出不算收入。示意测算，以 CRA 实际计算为准。`);
      });
  }

  // ── 演示 A：额度池逐年累积与追补 ───────────────────────────
  function demoRoom(root) {
    const ui = form(root,
      `<label class="rw-f rw-wide"><span>孩子到加拿大时几岁：<b data-v="land"></b></span><input type="range" name="land" min="0" max="17" value="10"></label>` +
      `<label class="rw-f rw-wide"><span>第一次供款时几岁：<b data-v="start"></b></span><input type="range" name="start" min="0" max="17" value="10"></label>` +
      field("每年供款", "amt", 5000, "number", 'step="500"') + field("额度口径", "mode", "esdc", "select", [["esdc", "ESDC 系统（从出生年）"], ["statute", "法条字面（从居住年）"]]) +
      `<p class="rw-f"><button type="button" class="rw-btn" data-play>▶ 播放</button></p>`,
      (o, out) => {
        root.querySelector('[data-v="land"]').textContent = o.land + " 岁";
        root.querySelector('[data-v="start"]').textContent = o.start + " 岁";
        const by = 2008;
        const hist = {}; for (let a = o.start; a <= 17; a++) if (a >= o.land) hist[by + a] = o.amt;
        const p = C.planGrants({ birthYear: by, residentYear: by + o.land, history: hist, planFrom: 9999, mode: o.mode });
        const shown = +root.dataset.upto >= 0 ? +root.dataset.upto : 17;
        const cells = p.rows.map((r) => {
          const pool = r.unused_before - r.basic;
          const vis = r.age <= shown;
          return `<div class="rw-yr${vis ? "" : " rw-dim"}" title="${r.age} 岁">
            <div class="rw-pool" style="height:${Math.min(100, (Math.max(0, r.unused_before) / 4000) * 100)}%"></div>
            <div class="rw-take" style="height:${(r.basic / 4000) * 100}%"></div>
            <span>${r.age}</span><em>${r.basic ? "取 " + money(r.basic) : r.room_added ? "+500" : ""}</em></div>`;
        }).join("");
        const upto = p.rows.filter((r) => r.age <= shown);
        const got = upto.reduce((s, r) => s + r.basic, 0);
        return `<div class="rw-years">${cells}</div>
          <p class="rw-big">到 ${shown} 岁累计补助 ${money(got)}${shown === 17 ? (p.reach7200 ? "，拿满" : "，没拿满 " + money(V("cesg_lifetime"))) : ""}</p>`
          + note(`浅色柱＝额度池（每个计入年度进 ${money(V("cesg_room_per_year"))}），深色＝当年用掉的补助（每年最多 ${money(V("cesg_annual_max_carry"))}，要存 ${money(V("cesg_annual_max_carry") / V("cesg_rate"))} 才拿得满）。拖动两个滑块看「晚开户」和「晚落地」的区别；切口径看法条与 ESDC 系统的差别。`);
      });
    root.dataset.upto = 17;
    root.querySelector("[data-play]").addEventListener("click", () => {
      let a = 0; root.dataset.upto = 0; ui.go();
      const t = setInterval(() => { a++; root.dataset.upto = a; ui.go(); if (a >= 17) clearInterval(t); }, 450);
    });
  }

  // ── 演示 B：资金流向 ─────────────────────────────────────
  function demoFlow(root) {
    form(root, field("孩子的结局", "path", "school", "select", [["school", "读了高等教育"], ["sibling", "没读，但有弟弟妹妹"], ["none", "没读，也没有兄弟姐妹可转"]]),
      (o) => {
        const P = {
          school: [["本金", "PSE 退给供款人，免税", "ok"], ["政府补助", "并入 EAP，算学生收入", "stu"], ["投资收益", "并入 EAP，算学生收入", "stu"]],
          sibling: [["本金", "留在家庭计划，给弟妹用", "ok"], ["政府补助", "CESG 可转给弟妹（每人仍受 7,200 上限）；CLB 退回", "mix"], ["投资收益", "留在计划，给弟妹用", "ok"]],
          none: [["本金", "领回，免税", "ok"], ["政府补助", "全部退还政府", "bad"], ["投资收益", "AIP：边际税率 ＋ 20% 附加税；或最多 5 万转 RRSP", "bad"]],
        }[o.path];
        return `<div class="rw-flow">${P.map(([a, b, c]) => `<div class="rw-flow-row"><span class="rw-flow-src">${a}</span><span class="rw-flow-arrow rw-${c}"></span><span class="rw-flow-dst rw-${c}">${b}</span></div>`).join("")}</div>`
          + note(`来源：取款规则 ${src("eap_taxed_to_student", "CRA")} · 不读书退补助 ${src("grants_repaid", "canada.ca")} · AIP ${src("aip_extra_tax", "CRA")}`);
      });
  }

  // ── 演示 C：16/17 岁条件判定 ───────────────────────────────
  function demo1617(root) {
    form(root,
      field("孩子现在几岁", "age", 16, "number", 'min="0" max="17"') +
      field("到 15 岁那年年底，累计供款（没取出的）", "tot", 1500, "number", 'step="100"') +
      field("到 15 岁那年年底，有几个年度各存了至少 100", "yrs", 3, "number", 'min="0" max="16"'),
      (o) => {
        const a = o.tot >= V("cesg_1617_min_total"), b = o.yrs >= V("cesg_1617_min_years").years;
        const step = (t, ok) => `<li class="${ok ? "rw-yes" : "rw-no"}">${t}<b>${ok ? "是" : "否"}</b></li>`;
        if (o.age < 16) {
          const need = Math.max(0, V("cesg_1617_min_total") - o.tot);
          return `<ol class="rw-steps">${step("孩子已满 16 岁？", false)}</ol><p class="rw-big">还来得及：15 岁那年年底前再存 ${money(need)}（或凑满 4 个年度各 100），16、17 岁就还能拿补助。</p>`;
        }
        return `<ol class="rw-steps">${step("孩子今年 16 或 17 岁？", true)}${step(`15 岁年底前累计供款 ≥ ${money(V("cesg_1617_min_total"))}？`, a)}${a ? "" : step("或：此前任意 4 个年度每年 ≥ 100？", b)}</ol>
          <p class="rw-big">${a || b ? "今年的供款仍可拿 CESG。" : "今年再存也拿不到 CESG——条件是在 15 岁年底前就定死的。"}</p>` + note(`${src("cesg_1617_min_total", "canada.ca 原文")}：两个条件满足其一即可，而且都必须在孩子满 15 岁那年的 12 月 31 日前完成。`);
      });
  }

  // ── 演示 D：一块钱走几步 ─────────────────────────────────
  function demoDollar(root) {
    const ui = form(root,
      field("省份", "prov", "BC", "select", [["BC", "BC"], ["ON", "ON"]]) + field("家庭收入（全在一人名下）", "inc", 62000, "number", 'step="1000"') +
      `<label class="rw-f"><span>孩子年龄（逗号隔开）</span><input name="ages" value="4, 8"></label>` + field("存进 RRSP", "rr", 5000, "number", 'step="500"') +
      `<p class="rw-f"><button type="button" class="rw-btn" data-next>下一步 ›</button></p>`,
      (o) => {
        const ages = String(o.ages).split(/[,，\s]+/).map(Number).filter((x) => !isNaN(x));
        const L = C.linkage({ prov: o.prov, incA: o.inc, ages, rrsp: o.rr, resp: 500 * ages.length });
        const steps = [
          [`存进 RRSP ${money(o.rr)}`, "这笔钱从应税收入里扣掉"],
          [`退税约 ${money(L.taxSave)}`, "按联邦＋省的边际税率"],
          [`家庭净收入 ${money(L.afni0)} → ${money(L.afni1)}`, "福利都看这个数"],
          [`CCB 一年多 ${money(L.ccb.delta)}`, `${ages.length} 个孩子，递减率 ${pct(V("ccb_rates").r1[Math.min(ages.length, 4) - 1])}`],
          [`CGEB＋${L.provBenefit.name} 多 ${money(L.cgeb.delta + L.provBenefit.delta)}`, "同一个收入数，同时递减的其他福利"],
          [`额外 CESG：${L.acesg.tierBefore === L.acesg.tierAfter ? "档位没变" : "跨档，每孩多 " + money(L.acesg.delta / Math.max(1, ages.length))}`, `收入线 ${money(V("acesg_first_threshold"))} / ${money(V("acesg_second_threshold"))}`],
          [`合计一年多拿约 ${money(L.taxSave + L.benefitDelta + L.acesg.delta)}`, "RRSP 将来取出要交税，这不是白送，是把收入挪到了福利最「贵」的年份之外"],
        ];
        const k = Math.min(+(root.dataset.k || 0), steps.length - 1);
        return `<ol class="rw-chain">${steps.map(([a, b], i) => `<li class="${i <= k ? "on" : ""}"><b>${a}</b><span>${b}</span></li>`).join("")}</ol>`
          + note(`示意测算，参数 ${R.ccb_benefit_year.value}；抵扣对福利的影响要晚一个福利年才到账。完整算法见「节税×福利联动」计算器。`);
      });
    root.dataset.k = 0;
    root.querySelector("[data-next]").addEventListener("click", () => { root.dataset.k = (+root.dataset.k + 1) % 7; ui.go(); });
  }

  // ── 演示 E：集团计划的费用与提前退出 ─────────────────────────
  function demoGroup(root) {
    const g = V("gsp_fee_per_unit");
    form(root,
      field("购买单位数", "units", 20, "number", 'step="0.5"') + field("每月供款", "m", 300, "number", 'step="10"') +
      `<label class="rw-f rw-wide"><span>第几个月退出：<b data-v="exit"></b></span><input type="range" name="exit" min="1" max="120" value="18"></label>`,
      (o) => {
        root.querySelector('[data-v="exit"]').textContent = o.exit + " 个月";
        const fee = o.units * g.per_unit, half = fee / 2;
        let paid = 0, contrib = 0, feeDoneAt = null;
        for (let i = 1; i <= o.exit; i++) {
          contrib += o.m;
          const share = paid < half ? g.first_half_share : g.second_half_share;
          paid += Math.min(o.m * share, fee - paid);
          if (paid >= fee - 0.001 && !feeDoneAt) feeDoneAt = i;
        }
        const invested = contrib - paid;
        return `<div class="rw-kpis"><div><small>到第 ${o.exit} 个月已供款</small><b>${money(contrib)}</b></div><div><small>其中被销售费扣掉</small><b class="rw-warn">${money(paid)}</b><span>总销售费 ${money(fee)}${feeDoneAt ? "，第 " + feeDoneAt + " 个月付清" : ""}</span></div><div><small>真正进了投资的本金</small><b>${money(invested)}</b></div></div>
          <div class="rw-bar rw-bar-full"><i class="rw-bad" style="flex:${paid}"></i><i class="rw-p" style="flex:${Math.max(0, invested)}"></i></div>`
          + note(`这时退出：一般只拿回扣掉销售费后的本金；这期间的收益留在计划里给其他家庭（到期前脱落），补助须退还或转去新 RESP。签约后 ${V("gsp_60day")} 天内可以无条件全额退出。费用结构取自一种产品的 2026 招股书示例（每单位 ${money(g.per_unit)}，先全额扣一半、再每笔扣一半）${src("gsp_fee_per_unit")}；该产品披露最近五个到期组平均 ${pct(V("gsp_cancel_rate"))} 在到期前取消。你手里的计划以它自己的招股书为准。`);
      });
  }

  const W = { planner, growth, eap, noschool, linkage, "demo-room": demoRoom, "demo-flow": demoFlow, "demo-1617": demo1617, "demo-dollar": demoDollar, "demo-group": demoGroup };
  function mount() {
    document.querySelectorAll("[data-resp-widget]").forEach((el) => {
      if (el.dataset.mounted) return;
      const fn = W[el.dataset.respWidget];
      if (!fn) return;
      el.dataset.mounted = "1"; el.classList.add("rw"); el.innerHTML = "";
      fn(el);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();
