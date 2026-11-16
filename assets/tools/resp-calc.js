/* RESP 家庭实战工具 · 纯计算层（无 DOM）。
 * 常量只从 RESP_RULES 读（resp-rules.js 由 tools/build_rules.py 从 research/rules-2026-09-29.jsonl 生成），
 * 这里不手写任何规则数字。浏览器里挂在 window.RESPCalc；node 里 require 本文件（测试用）。
 * 所有结果都是示意测算，不是 ESDC / CRA 的实际核定。
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(require("./resp-rules.js"));
  } else {
    root.RESPCalc = factory(root.RESP_RULES);
  }
})(typeof self !== "undefined" ? self : this, function (R) {
  "use strict";
  const V = (id) => {
    if (!(id in R)) throw new Error("规则缺失：" + id);
    return R[id].value;
  };
  const round2 = (x) => Math.round(x * 100) / 100;

  // ── 补助额度与规划 ────────────────────────────────────────────
  // mode: "esdc"（ESDC 系统口径，从出生年累积，默认）| "statute"（法条字面，整年非居民的年份不计）
  function roomStartYear(birthYear, residentYear, mode) {
    if (mode === "statute" && residentYear && residentYear > birthYear) return residentYear;
    return birthYear;
  }

  function acesgRate(tier) {
    const a = V("acesg_rates");
    return tier === "low" ? a.low : tier === "mid" ? a.mid : 0;
  }

  function tierFromIncome(afni) {
    if (afni <= V("acesg_first_threshold")) return "low";
    if (afni <= V("acesg_second_threshold")) return "mid";
    return "high";
  }

  /**
   * 逐年补助模拟 / 规划。
   * opts: birthYear, residentYear, mode, tier, history {year: 供款额}, planFrom（从哪年开始按建议供款，默认 thisYear）,
   *       thisYear, fixed（可选：未来每年固定供款额，给了就不用「建议额」）
   * 返回 {rows:[{year, age, room_added, unused_before, contrib, basic, extra, total_to_date, note}], total, reach7200, cond1617, lastAge17Year}
   */
  function planGrants(o) {
    const lifetime = V("cesg_lifetime");
    const perYear = V("cesg_room_per_year");
    const capCarry = V("cesg_annual_max_carry");
    const rate = V("cesg_rate");
    const lastYear = o.birthYear + V("cesg_last_age");
    const start = roomStartYear(o.birthYear, o.residentYear, o.mode || "esdc");
    const thisYear = o.thisYear || new Date().getFullYear();
    const planFrom = o.planFrom || thisYear;
    const hist = o.history || {};
    const extraRate = acesgRate(o.tier);
    const extraBase = V("acesg_rates").base;
    const min1617 = V("cesg_1617_min_total");
    const yrs1617 = V("cesg_1617_min_years");
    const residentFrom = o.residentYear || o.birthYear;
    let room = 0, basicPaid = 0, total = 0, contribTo15 = 0, years100 = 0;
    const rows = [];
    for (let y = Math.max(o.birthYear, 2007); y <= lastYear; y++) {
      const age = y - o.birthYear;
      const added = y >= start ? perYear : 0;
      room += added;
      const unusedBefore = room - basicPaid;
      let contrib;
      const resident = y >= residentFrom;
      if (y < planFrom) contrib = +hist[y] || 0;
      else if (o.fixed != null) contrib = o.fixed;
      else {
        // 建议额：拿满本年能拿的基本 CESG 所需供款（不超过终身剩余）
        const canBasic = Math.min(capCarry, unusedBefore, Math.max(0, lifetime - total));
        contrib = resident ? Math.ceil(canBasic / rate) : 0;
        // 16/17 岁条件：15 岁那年若还没满足，至少补到 2,000
        if (age === 15 && contribTo15 + contrib < min1617 && years100 + (contrib >= yrs1617.each ? 1 : 0) < yrs1617.years)
          contrib = Math.max(contrib, min1617 - contribTo15);
      }
      let note = "";
      let basic = 0, extra = 0;
      const eligible1617 = age < 16 || contribTo15 >= min1617 || years100 >= yrs1617.years;
      if (!resident && contrib > 0) note = "供款时孩子不是加拿大居民，这笔供款不付补助";
      else if (!eligible1617 && contrib > 0) note = "16/17 岁条件未满足：本年供款不付 CESG";
      else if (contrib > 0) {
        basic = Math.min(round2(contrib * rate), capCarry, unusedBefore, Math.max(0, lifetime - total));
        basicPaid += basic;
        total += basic;
        extra = Math.min(round2(Math.min(contrib, extraBase) * extraRate), Math.max(0, lifetime - total));
        total += extra;
      }
      if (age <= 15) {
        contribTo15 += contrib;
        if (contrib >= yrs1617.each) years100 += 1;
      }
      rows.push({ year: y, age, room_added: added, unused_before: unusedBefore, contrib, basic, extra,
                  total_to_date: round2(total), note });
    }
    return {
      rows, total: round2(total), reach7200: total >= lifetime - 0.005,
      cond1617: contribTo15 >= min1617 || years100 >= yrs1617.years,
      roomStart: start, lastYear,
    };
  }

  // 孩子在 BCTESG 窗口里吗（today: Date）
  function bctesgStatus(birthYear, birthMonth, today, province) {
    if (province !== "BC") return { ok: false, why: "BCTESG 只给 BC 居民（申请时孩子与父母都在 BC）" };
    if (birthYear < V("bctesg_birth_from")) return { ok: false, why: "2006 年以前出生的孩子不适用" };
    const w = V("bctesg_window");
    const open = new Date(birthYear + w.from_age, (birthMonth || 1) - 1, 1);
    let close = new Date(birthYear + w.to_age_exclusive, (birthMonth || 1) - 1, 1);
    const endStr = V("bctesg_end");               // BC 2026 年预算：终止日（已宣布，过渡安排未详）
    const end = new Date(endStr + "T00:00:00");
    const tail = `（BC 已宣布 ${endStr} 起终止 BCTESG，过渡安排官方未详）`;
    if (open >= end) return { ok: false, state: "赶不上", open, close: end, why: "6 岁生日在终止日之后，按现有公告拿不到" + tail };
    const cut = close > end;
    if (cut) close = end;
    if (today < open) return { ok: true, state: "未到", open, close, why: "窗口还没开：6 岁生日起可申请" + (cut ? "，而且要赶在终止日之前" : "") + tail };
    if (today >= close) return { ok: false, state: "已过", open, close, why: (cut ? "已到终止日" : "9 岁生日前一天已过，窗口关闭") + tail };
    return { ok: true, state: "进行中", open, close, why: "正在窗口里：尽早开 RESP 并请机构代申请" + (cut ? "，窗口会被终止日截短" : "") + tail };
  }

  // CLB 估算：低收入且 2004 年后出生；按合格年度 500 + 100×(n−1)，到 15 岁、终身 2,000
  function clbEstimate(birthYear, residentYear, lowIncomeYears) {
    if (birthYear < V("clb_birth_from")) return 0;
    const n = Math.min(lowIncomeYears, V("clb_last_age") + 1);
    if (n <= 0) return 0;
    return Math.min(V("clb_first") + V("clb_annual") * (n - 1), V("clb_lifetime"));
  }

  // ── 增长模拟 ────────────────────────────────────────────────
  // flows: [{contrib, grant}] 按年（年初存入），r 年化收益率
  function grow(flows, r) {
    let bal = 0, principal = 0, grants = 0;
    for (const f of flows) {
      principal += f.contrib; grants += f.grant; bal += f.contrib + f.grant;
      bal *= 1 + r;
    }
    return { balance: round2(bal), principal: round2(principal), grants: round2(grants),
             growth: round2(bal - principal - grants) };
  }

  // ── 税 ──────────────────────────────────────────────────────
  function bracketTax(income, brackets) {
    let tax = 0, lo = 0;
    for (const [hi, rt] of brackets) {
      const top = hi == null ? Infinity : hi;
      if (income > lo) tax += (Math.min(income, top) - lo) * rt;
      lo = top;
    }
    return tax;
  }
  function fedBPA(income) {
    const b = V("fed_bpa"), br = V("fed_brackets");
    const lo = br[2][0], hi = br[3][0];   // 26% 档起点到 33% 档起点之间递减
    if (income <= lo) return b.max;
    if (income >= hi) return b.min;
    return b.max - (b.max - b.min) * (income - lo) / (hi - lo);
  }
  /** 个人所得税（联邦＋省），只计基本个人额与可选学费额；省：BC / ON。示意。 */
  function incomeTax(income, prov, tuition) {
    income = Math.max(0, income);
    const fb = V("fed_brackets"), lowF = fb[0][1];
    const fed = Math.max(0, bracketTax(income, fb) - lowF * (fedBPA(income) + (tuition || 0)));
    const pb = prov === "ON" ? V("on_brackets") : V("bc_brackets");
    const pbpa = prov === "ON" ? V("on_bpa") : V("bc_bpa");
    const pv = Math.max(0, bracketTax(income, pb) - pb[0][1] * pbpa);
    return { fed: round2(fed), prov: round2(pv), total: round2(fed + pv) };
  }

  // ── 福利 ────────────────────────────────────────────────────
  function ccb(afni, ages) {
    const n = ages.length;
    if (!n) return 0;
    const max = ages.reduce((s, a) => s + (a < 6 ? V("ccb_under6") : a < 18 ? V("ccb_6to17") : 0), 0);
    const k = Math.min(n, 4) - 1, t1 = V("ccb_t1"), t2 = V("ccb_t2"), rt = V("ccb_rates");
    let red = 0;
    if (afni > t2) red = rt.base2[k] + (afni - t2) * rt.r2[k];
    else if (afni > t1) red = (afni - t1) * rt.r1[k];
    return round2(Math.max(0, max - red));
  }
  function cgeb(afni, nKids, hasSpouse) {
    // 成人 + 配偶（或单亲的第一个孩子按配偶额） + 其余孩子；单亲补充从略（示意）
    const adults = hasSpouse ? 2 : (nKids > 0 ? 2 : 1);
    const kids = hasSpouse ? nKids : Math.max(0, nKids - 1);
    const full = adults * V("cgeb_adult") + kids * V("cgeb_child");
    const red = Math.max(0, afni - V("cgeb_phaseout")) * V("cgeb_rate");
    return round2(Math.max(0, full - red));
  }
  function bcfb(afni, nKids, single) {
    if (!nKids) return 0;
    const mx = V("bcfb_max"), mn = V("bcfb_min"), t1 = V("bcfb_t1"), t2 = V("bcfb_t2"), rt = V("bcfb_rate");
    const pick = (arr) => Array.from({ length: nKids }, (_, i) => arr[Math.min(i, 2)]).reduce((a, b) => a + b, 0);
    const full = pick(mx) + (single ? V("bcfb_single") : 0);
    const floor = pick(mn);
    let amt = full - Math.max(0, afni - t1) * rt;
    amt = Math.max(amt, Math.min(floor, full));
    if (afni > t2) amt = Math.max(0, Math.min(amt, floor) - (afni - t2) * rt);
    return round2(amt);
  }
  function ocb(afni, nKids) {
    if (!nKids) return 0;
    return round2(Math.max(0, nKids * V("ocb_max") - Math.max(0, afni - V("ocb_t1")) * V("ocb_rate")));
  }
  function clbEligibleNow(afni, nKids) {
    const lim = nKids >= 5 ? V("clb_income_5") : nKids === 4 ? V("clb_income_4") : V("clb_income_1to3");
    return nKids >= 4 ? afni < lim : afni <= lim;
  }

  /**
   * 节税×福利联动。o: prov, incA, incB, single, ages[], rrsp, fhsa, tfsa, resp（全年 RESP 供款合计，均分给未满 18 岁的孩子）
   * RRSP 与 FHSA 都记在 A 名下抵扣。福利按 2026-07 至 2027-06 参数、用「抵扣后的这一年收入」示意下一福利年的变化。
   */
  function linkage(o) {
    const prov = o.prov === "ON" ? "ON" : "BC";
    const ages = (o.ages || []).filter((a) => a >= 0 && a < 18);
    const n = ages.length;
    const ded = (o.rrsp || 0) + (o.fhsa || 0);
    const afni0 = (o.incA || 0) + (o.single ? 0 : (o.incB || 0));
    const afni1 = Math.max(0, afni0 - ded);
    const taxBefore = incomeTax(o.incA || 0, prov), taxAfter = incomeTax((o.incA || 0) - ded, prov);
    const taxSave = round2(taxBefore.total - taxAfter.total);
    const ccb0 = ccb(afni0, ages), ccb1 = ccb(afni1, ages);
    const g0 = cgeb(afni0, n, !o.single), g1 = cgeb(afni1, n, !o.single);
    const p0 = prov === "BC" ? bcfb(afni0, n, o.single) : ocb(afni0, n);
    const p1 = prov === "BC" ? bcfb(afni1, n, o.single) : ocb(afni1, n);
    const perKid = n ? (o.resp || 0) / n : 0;
    const basicPerKid = Math.min(perKid * V("cesg_rate"), V("cesg_annual_max"));
    const base = V("acesg_rates").base;
    const t0 = tierFromIncome(afni0), t1 = tierFromIncome(afni1);
    const extra0 = n * round2(Math.min(perKid, base) * acesgRate(t0));
    const extra1 = n * round2(Math.min(perKid, base) * acesgRate(t1));
    const clb0 = clbEligibleNow(afni0, n), clb1 = clbEligibleNow(afni1, n);
    const out = {
      prov, afni0, afni1, taxSave,
      ccb: { before: ccb0, after: ccb1, delta: round2(ccb1 - ccb0) },
      cgeb: { before: g0, after: g1, delta: round2(g1 - g0) },
      provBenefit: { name: prov === "BC" ? "BC 家庭福利" : "安省儿童福利 OCB", before: p0, after: p1, delta: round2(p1 - p0) },
      acesg: { tierBefore: t0, tierAfter: t1, before: extra0, after: extra1, delta: round2(extra1 - extra0) },
      clb: { before: clb0, after: clb1 },
      cesgBasic: round2(basicPerKid * n),
      tfsaNote: (o.tfsa || 0) > 0 ? "TFSA 供款不抵税、取款不算收入：对福利中性" : "",
    };
    out.benefitDelta = round2(out.ccb.delta + out.cgeb.delta + out.provBenefit.delta);
    out.grantTotal = round2(out.cesgBasic + extra1);
    out.total = round2(taxSave + out.benefitDelta + out.acesg.delta + out.cesgBasic);
    return out;
  }

  // ── 取款与不读书 ────────────────────────────────────────────
  function eapPlan(o) {
    // o: eapTotal, years, otherIncome, prov, tuition（每年学费额，可 0）
    const n = Math.max(1, o.years | 0), per = (o.eapTotal || 0) / n;
    const rows = [];
    for (let i = 0; i < n; i++) {
      const inc = per + (o.otherIncome || 0);
      const withEap = incomeTax(inc, o.prov, o.tuition), without = incomeTax(o.otherIncome || 0, o.prov, o.tuition);
      rows.push({ year: i + 1, eap: round2(per), taxOnEap: round2(withEap.total - without.total), totalTax: withEap.total });
    }
    const lumpInc = (o.eapTotal || 0) + (o.otherIncome || 0);
    const lump = incomeTax(lumpInc, o.prov, o.tuition).total - incomeTax(o.otherIncome || 0, o.prov, o.tuition).total;
    return { rows, spreadTax: round2(rows.reduce((s, r) => s + r.taxOnEap, 0)), lumpTax: round2(lump),
             first13Cap: V("eap_first13_ft") };
  }

  function noSchool(o) {
    // o: principal, cesg, clb, bctesg, income（账户收益部分）, marginal（供款人边际税率 0–1）, rrspRoom, qc（bool）, retireRate（取 RRSP 时预计税率）
    const extra = V("aip_extra_tax")[o.qc ? "qc" : "general"];
    const cap = V("aip_rrsp_max");
    const inc = o.income || 0;
    const grantsBack = (o.cesg || 0) + (o.clb || 0) + (o.bctesg || 0);
    const direct = inc * (1 - (o.marginal || 0) - extra);
    const toRrsp = Math.min(inc, cap, o.rrspRoom || 0);
    const rest = inc - toRrsp;
    const viaRrsp = toRrsp * (1 - (o.retireRate != null ? o.retireRate : o.marginal || 0)) + rest * (1 - (o.marginal || 0) - extra);
    return {
      principalBack: o.principal || 0,
      grantsReturned: round2(grantsBack),
      aipDirectNet: round2(direct),
      aipDirectTax: round2(inc - direct),
      aipViaRrspNet: round2(viaRrsp),
      rrspMoved: round2(toRrsp),
      extraRate: extra,
    };
  }

  return { V, planGrants, bctesgStatus, clbEstimate, grow, incomeTax, bracketTax, fedBPA, ccb, cgeb, bcfb, ocb,
           clbEligibleNow, tierFromIncome, linkage, eapPlan, noSchool, roomStartYear };
});
