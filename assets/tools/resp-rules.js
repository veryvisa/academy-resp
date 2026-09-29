/* 自动生成，勿手改：python3 courses/resp-rep/tools/build_rules.py
 * 源：research/rules-2026-09-29.jsonl（96 条） */
(function (root) {
  var R = {
"acesg_first_threshold": {
"effective": "2026",
"rule": "额外 CESG（A-CESG）20% 档收入线（调整后家庭净收入，2026 日历年）",
"status": "已生效",
"url": "https://www.canada.ca/en/employment-social-development/services/student-financial-aid/education-savings/resp/resp-promoters/bulletin/notice-2025-1114.html",
"value": 58523
},
"acesg_rates": {
"effective": "",
"rule": "额外 CESG：首 500 供款的 20%（≤第一线）或 10%（第一线与第二线之间），不可结转",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/estimating-amounts.html",
"value": {
"base": 500,
"low": 0.2,
"mid": 0.1
}
},
"acesg_second_threshold": {
"effective": "2026",
"rule": "额外 CESG 10% 档收入上限（2026 日历年）",
"status": "已生效",
"url": "https://www.canada.ca/en/employment-social-development/services/student-financial-aid/education-savings/resp/resp-promoters/bulletin/notice-2025-1114.html",
"value": 117045
},
"aip_conditions": {
"effective": "",
"rule": "AIP 可付条件之一：计划开户第 9 年之后，且所有受益人满 21 岁且不在读；或计划到第 35 年",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps/payments-resp.html",
"value": {
"after_year": 9,
"age": 21
}
},
"aip_extra_tax": {
"effective": "",
"rule": "AIP 附加税：普通所得税之外另加 20%（魁北克居民 12%）",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps/payments-resp.html",
"value": {
"general": 0.2,
"qc": 0.12
}
},
"aip_rrsp_max": {
"effective": "",
"rule": "AIP 转入供款人（或配偶）RRSP 的终身上限，须有 RRSP 额度",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps/payments-resp.html",
"value": 50000
},
"bc_bpa": {
"effective": "2026",
"rule": "BC 基本个人额",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/adjustment-personal-income-tax-benefit-amounts.html",
"value": 13216
},
"bc_brackets": {
"effective": "2026",
"rule": "BC 2026 税阶",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/current-year.html",
"value": [
[
50363,
0.056
],
[
100728,
0.077
],
[
115648,
0.105
],
[
140430,
0.1229
],
[
190405,
0.147
],
[
265545,
0.168
],
[
null,
0.205
]
]
},
"bcfb_max": {
"effective": "2026-07",
"rule": "BC 家庭福利年度最高（首孩/第二孩/以后每孩）",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/provincial-territorial-programs/province-british-columbia.html",
"value": [
1750,
1100,
900
]
},
"bcfb_min": {
"effective": "2026-07",
"rule": "BC 家庭福利保底额（首孩/第二孩/以后每孩，收入在两门槛之间）",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/provincial-territorial-programs/province-british-columbia.html",
"value": [
775,
750,
725
]
},
"bcfb_rate": {
"effective": "2026-07",
"rule": "BC 家庭福利递减率",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/provincial-territorial-programs/province-british-columbia.html",
"value": 0.04
},
"bcfb_single": {
"effective": "2026-07",
"rule": "BC 家庭福利单亲补充最高",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/provincial-territorial-programs/province-british-columbia.html",
"value": 500
},
"bcfb_t1": {
"effective": "2026-07",
"rule": "BC 家庭福利第一递减门槛（超出部分 4%）",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/provincial-territorial-programs/province-british-columbia.html",
"value": 30176
},
"bcfb_t2": {
"effective": "2026-07",
"rule": "BC 家庭福利第二递减门槛（超出部分 4% 直到为零）",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/provincial-territorial-programs/province-british-columbia.html",
"value": 96562
},
"bctesg_amount": {
"effective": "",
"rule": "BCTESG 一次性补助",
"status": "已生效",
"url": "https://www2.gov.bc.ca/gov/content/education-training/k-12/support/scholarships/bc-training-and-education-savings-grant",
"value": 1200
},
"bctesg_birth_from": {
"effective": "",
"rule": "BCTESG 只给 2006-01-01 及以后出生的孩子",
"status": "已生效",
"url": "https://www2.gov.bc.ca/gov/content/education-training/k-12/support/scholarships/bc-training-and-education-savings-grant",
"value": 2006
},
"bctesg_no_contrib": {
"effective": "",
"rule": "BCTESG 不需要配比供款；申请时孩子与父母须为 BC 居民、都有 SIN；经 RESP 机构申请",
"status": "已生效",
"url": "https://www2.gov.bc.ca/gov/content/education-training/k-12/support/scholarships/bc-training-and-education-savings-grant",
"value": true
},
"bctesg_window": {
"effective": "",
"rule": "BCTESG 申请窗口：6 岁生日起至 9 岁生日前一天",
"status": "已生效",
"url": "https://www2.gov.bc.ca/gov/content/education-training/k-12/support/scholarships/bc-training-and-education-savings-grant",
"value": {
"from_age": 6,
"to_age_exclusive": 9
}
},
"ccb_6to17": {
"effective": "2026-07",
"rule": "CCB 每名 6–17 岁孩子年额",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview/canada-child-benefit-we-calculate-your-ccb.html",
"value": 6883
},
"ccb_benefit_year": {
"effective": "",
"rule": "本站福利测算采用的福利年",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview/canada-child-benefit-we-calculate-your-ccb.html",
"value": "2026-07 至 2027-06（基于 2025 年 AFNI）"
},
"ccb_rates": {
"effective": "2026-07",
"rule": "CCB 递减率（按孩子数 1/2/3/4+）：两门槛之间与第二门槛之上，以及第二段基础扣减额",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview/canada-child-benefit-we-calculate-your-ccb.html",
"value": {
"base2": [
3123,
6022,
8476,
10260
],
"r1": [
0.07,
0.135,
0.19,
0.23
],
"r2": [
0.032,
0.057,
0.08,
0.095
]
}
},
"ccb_status": {
"effective": "",
"rule": "CCB 身份条件：父母一方为公民、永久居民、受保护人，或在加连续居住 18 个月且第 19 个月持有效许可的临时居民",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview/canada-child-benefit-before-you-apply.html",
"value": true
},
"ccb_t1": {
"effective": "2026-07",
"rule": "CCB 第一递减门槛",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview/canada-child-benefit-we-calculate-your-ccb.html",
"value": 38237
},
"ccb_t2": {
"effective": "2026-07",
"rule": "CCB 第二递减门槛",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview/canada-child-benefit-we-calculate-your-ccb.html",
"value": 82847
},
"ccb_under6": {
"effective": "2026-07",
"rule": "CCB 每名 6 岁以下孩子年额",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview/canada-child-benefit-we-calculate-your-ccb.html",
"value": 8157
},
"cesg_1617_min_total": {
"effective": "",
"rule": "16/17 岁领 CESG 前置条件之一：15 岁那年年底前累计供款（未取出）至少",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/estimating-amounts.html",
"value": 2000
},
"cesg_1617_min_years": {
"effective": "",
"rule": "16/17 岁领 CESG 前置条件之二：15 岁年底前任意 4 个年度每年至少供款 100（未取出）",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/estimating-amounts.html",
"value": {
"each": 100,
"years": 4
}
},
"cesg_annual_max": {
"effective": "2007 起",
"rule": "基本 CESG 每年上限（无结转时）",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/estimating-amounts.html",
"value": 500
},
"cesg_annual_max_carry": {
"effective": "2007 起",
"rule": "有未用额度时基本 CESG 单年上限",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/estimating-amounts.html",
"value": 1000
},
"cesg_last_age": {
"effective": "",
"rule": "受益人满 17 岁那一年年底之后不再累积额度、也不再付 CESG（供款年：受益人上一年年底未满 17 岁）",
"status": "已生效",
"url": "https://laws-lois.justice.gc.ca/eng/acts/c-3.6/FullText.html",
"value": 17
},
"cesg_lifetime": {
"effective": "",
"rule": "CESG 终身上限（基本＋额外合计）",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/estimating-amounts.html",
"value": 7200
},
"cesg_no_pr_needed": {
"effective": "",
"rule": "领 CESG 不需要公民或永久居民身份：条件是受益人有 SIN、供款当时是加拿大居民",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps/who-become-a-beneficiary.html",
"value": true
},
"cesg_rate": {
"effective": "2007 起",
"rule": "基本 CESG 配比率",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/estimating-amounts.html",
"value": 0.2
},
"cesg_resident_at_contribution": {
"effective": "",
"rule": "供款时受益人须为加拿大居民、须有有效 SIN，才对这笔供款付 CESG",
"status": "已生效",
"url": "https://www.canada.ca/en/employment-social-development/services/student-financial-aid/education-savings/resp/resp-promoters/user-guide/chapter-5.html",
"value": true
},
"cesg_room_per_year": {
"effective": "2007 起（1998–2006 为 400）",
"rule": "每个计入年度新增的 CESG 额度",
"status": "已生效",
"url": "https://laws-lois.justice.gc.ca/eng/acts/c-3.6/FullText.html",
"value": 500
},
"cesg_room_start_esdc": {
"effective": "2007 起",
"rule": "ESDC 系统口径：2007 年及以后出生的孩子，CESG 额度从出生年开始每年累积，未开 RESP 也累积（计算器默认口径）",
"status": "已生效",
"url": "https://www.canada.ca/content/dam/canada/employment-social-development/migration/documents/assets/portfolio/docs/en/reports/resp_promoters/infocapsules/ic-12-grant-room-and-carry-forward.pdf",
"value": "birth_year"
},
"cesg_room_start_statute": {
"effective": "2004 起",
"rule": "法条字面口径：整年都不是加拿大居民的年份不计额度；落地当年计入（计算器可切换）",
"status": "已生效",
"url": "https://laws-lois.justice.gc.ca/eng/acts/c-3.6/FullText.html",
"value": "resident_year"
},
"cgeb_adult": {
"effective": "2026-07",
"rule": "CGEB（原 GST/HST 抵免）成人/配偶额",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-groceries-essentials-benefit.html",
"value": 445
},
"cgeb_child": {
"effective": "2026-07",
"rule": "CGEB 每名孩子额",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-groceries-essentials-benefit.html",
"value": 234
},
"cgeb_phaseout": {
"effective": "2026-07",
"rule": "CGEB 家庭净收入递减起点（超出部分按 5% 递减）",
"status": "已生效",
"url": "https://laws-lois.justice.gc.ca/eng/acts/I-3.3/section-122.5.html",
"value": 46432
},
"cgeb_rate": {
"effective": "2026-07",
"rule": "CGEB 递减率",
"status": "已生效",
"url": "https://laws-lois.justice.gc.ca/eng/acts/I-3.3/section-122.5.html",
"value": 0.05
},
"clb_annual": {
"effective": "",
"rule": "CLB 此后每个合格年度",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/estimating-amounts.html",
"value": 100
},
"clb_apply_age": {
"effective": "",
"rule": "CLB 须在受益人未满 21 岁时申请（现行法条）",
"status": "已生效",
"url": "https://laws-lois.justice.gc.ca/eng/acts/c-3.6/FullText.html",
"value": 21
},
"clb_apply_age_2028": {
"effective": "2028-04",
"rule": "自 2028 年 4 月起追溯申领 CLB 的年龄上限延至 30 岁",
"status": "已宣布",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/canada-learning-bond.html",
"value": 30
},
"clb_auto_2028": {
"effective": "2028-04",
"rule": "2024 年及以后出生、4 岁仍未开 RESP 的合格孩子，政府自 2028 年 4 月起自动开户存入 CLB；2027 年起可申请退出",
"status": "已宣布",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/canada-learning-bond.html",
"value": "2028-04"
},
"clb_birth_from": {
"effective": "",
"rule": "CLB 只给 2004-01-01 及以后出生的孩子",
"status": "已生效",
"url": "https://laws-lois.justice.gc.ca/eng/acts/c-3.6/FullText.html",
"value": 2004
},
"clb_first": {
"effective": "",
"rule": "CLB 首个合格年度",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/estimating-amounts.html",
"value": 500
},
"clb_income_1to3": {
"effective": "2026-07",
"rule": "CLB 收入线（1–3 个孩子，2026-07 至 2027-06 福利年）",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/estimating-amounts.html",
"value": 58523
},
"clb_income_4": {
"effective": "2026-07",
"rule": "CLB 收入线（4 个孩子，低于）",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/estimating-amounts.html",
"value": 66036
},
"clb_income_5": {
"effective": "2026-07",
"rule": "CLB 收入线（5 个孩子，低于）",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/estimating-amounts.html",
"value": 73577
},
"clb_last_age": {
"effective": "",
"rule": "CLB 按年累积到受益人 15 岁那个福利年为止",
"status": "已生效",
"url": "https://laws-lois.justice.gc.ca/eng/acts/c-3.6/FullText.html",
"value": 15
},
"clb_lifetime": {
"effective": "",
"rule": "CLB 终身上限",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/estimating-amounts.html",
"value": 2000
},
"clb_no_share": {
"effective": "",
"rule": "CLB 不能在兄弟姐妹间共享，不读书须退回",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/managing-plan.html",
"value": true
},
"clb_requires_ccb": {
"effective": "",
"rule": "CLB 前提：主要照护人已报税且有 CCB 资格",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/canada-learning-bond.html",
"value": true
},
"eap_13wk_pt": {
"effective": "2023-03-28",
"rule": "非全日制：每 13 周 EAP 上限",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps/payments-resp.html",
"value": 4000
},
"eap_first13_ft": {
"effective": "2023-03-28",
"rule": "全日制：前 13 个连续周 EAP 上限",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps/payments-resp.html",
"value": 8000
},
"eap_grants_need_resident": {
"effective": "",
"rule": "学生须是加拿大居民，EAP 里才能含 CESG 或 CLB",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps/payments-resp.html",
"value": true
},
"eap_reasonable_2026": {
"effective": "2026",
"rule": "2026 年 EAP 合理性门槛（超过要审核）",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/bulletins/resp-bulletin-1.html",
"value": 29459
},
"eap_taxed_to_student": {
"effective": "",
"rule": "EAP（补助＋收益部分）计入学生当年收入；本金（PSE）免税退回",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps/payments-resp.html",
"value": true
},
"family_plan_age": {
"effective": "",
"rule": "家庭计划新增受益人须未满 21 岁（或此前已是 RESP 受益人），且与供款人有血缘或收养关系",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/managing-plan.html",
"value": 21
},
"family_plan_grant_share": {
"effective": "",
"rule": "家庭计划内兄弟姐妹可共享 CESG（每人仍受 7,200 上限）；CLB 不能共享",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/managing-plan.html",
"value": true
},
"fed_bpa": {
"effective": "2026",
"rule": "联邦基本个人额（上限/下限），高收入段递减",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/adjustment-personal-income-tax-benefit-amounts.html",
"value": {
"max": 16452,
"min": 14829
}
},
"fed_brackets": {
"effective": "2026",
"rule": "联邦 2026 税阶（上限，税率）",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/current-year.html",
"value": [
[
58523,
0.14
],
[
117045,
0.205
],
[
181440,
0.26
],
[
258482,
0.29
],
[
null,
0.33
]
]
},
"fhsa_annual": {
"effective": "",
"rule": "FHSA 年度供款上限（终身 40,000）",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html",
"value": 8000
},
"grants_repaid": {
"effective": "",
"rule": "孩子不读书时 CESG 须退还政府；CLB 不读书也须退回",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/managing-plan.html",
"value": true
},
"gsp_60day": {
"effective": "",
"rule": "集团奖学金计划签约后 60 天内可无条件取消、全额退款",
"status": "已生效",
"url": "https://www.cst.org/content/dam/consultantsexternal/documents/2026/en/CSTPlan_Prospectus_2026.pdf",
"value": 60
},
"gsp_cancel_rate": {
"effective": "2026-01-28",
"rule": "CST 招股书披露：最近五个到期受益人组平均 17% 的计划在到期前被取消",
"status": "已生效",
"url": "https://www.cst.org/content/dam/consultantsexternal/documents/2026/en/CSTPlan_Prospectus_2026.pdf",
"value": 0.17
},
"gsp_fee_per_unit": {
"effective": "2026-01-28",
"rule": "集团奖学金计划费用示例（CST Advantage Plan，2026-01-28 招股书）：销售费每单位 200 加元，先从供款里全额扣到付清一半，再从每笔供款扣一半直到付清",
"status": "已生效",
"url": "https://www.cst.org/content/dam/consultantsexternal/documents/2026/en/CSTPlan_Prospectus_2026.pdf",
"value": {
"first_half_share": 1.0,
"per_unit": 200,
"second_half_share": 0.5
}
},
"oas_clawback": {
"effective": "2026",
"rule": "OAS 回收门槛（2026 净收入），超出部分 15%",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/adjustment-personal-income-tax-benefit-amounts.html",
"value": 95323
},
"ocb_max": {
"effective": "2026-07",
"rule": "安省儿童福利 OCB 每孩年额（2026-07 至 2027-06）",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/provincial-territorial-programs/province-ontario.html",
"value": 1759.92
},
"ocb_rate": {
"effective": "2026-07",
"rule": "OCB 递减率（超出门槛部分 8%）",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/provincial-territorial-programs/province-ontario.html",
"value": 0.08
},
"ocb_t1": {
"effective": "2026-07",
"rule": "OCB 递减门槛",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/provincial-territorial-programs/province-ontario.html",
"value": 26865
},
"on_bpa": {
"effective": "2026",
"rule": "安省基本个人额",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/adjustment-personal-income-tax-benefit-amounts.html",
"value": 12989
},
"on_brackets": {
"effective": "2026",
"rule": "安省 2026 税阶（不含附加税与健康费）",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/current-year.html",
"value": [
[
53891,
0.0505
],
[
107785,
0.0915
],
[
150000,
0.1116
],
[
220000,
0.1216
],
[
null,
0.1316
]
]
},
"overcontrib_tax": {
"effective": "",
"rule": "超额供款税：超额部分每月 1%，直到取出",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps/resp-contributions.html",
"value": 0.01
},
"qesi": {
"effective": "",
"rule": "QESI（魁北克）：当年净供款 10%，基本每年最多 250（有结转最多 500），低收入另加最多 50，终身 3,600",
"status": "已生效",
"url": "https://www.revenuquebec.ca/en/citizens/tax-credits/quebec-education-savings-incentive/determining-the-qesi-amount/",
"value": {
"annual": 250,
"annual_carry": 500,
"extra": 50,
"lifetime": 3600,
"rate": 0.1
}
},
"resp_contrib_years": {
"effective": "",
"rule": "开户后最多可供款 31 年",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/managing-plan.html",
"value": 31
},
"resp_lifetime_contrib": {
"effective": "",
"rule": "每名受益人终身供款上限（所有计划合计），无年度上限",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps/resp-contributions.html",
"value": 50000
},
"resp_max_years": {
"effective": "",
"rule": "计划最长存续：一般 35 年（残障受益人的特定计划 40 年）",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps/payments-resp.html",
"value": {
"general": 35,
"specified": 40
}
},
"rrsp_limit_2026": {
"effective": "2026",
"rule": "RRSP 2026 年度上限（另受上一年收入 18% 限制）",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html",
"value": 33810
},
"sages_cancelled": {
"effective": "",
"rule": "萨省 SAGES 已取消（2023-09-01 起账户内 SAGES 转为累积收益，不再受理）",
"status": "已生效",
"url": "https://www.canada.ca/en/employment-social-development/services/student-financial-aid/education-savings/resp/resp-promoters/bulletin/notice-2022-966.html",
"value": true
},
"tfsa_2026": {
"effective": "2026",
"rule": "TFSA 2026 年度额度",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html",
"value": 7000
},
"tl_1998_cesg": {
"effective": "1998",
"rule": "联邦推出 CESG：供款的 20%，1998–2006 年每年额度 400",
"status": "已生效",
"url": "https://laws-lois.justice.gc.ca/eng/acts/c-3.6/FullText.html",
"value": "1998"
},
"tl_2004_act": {
"effective": "2004-10",
"rule": "《加拿大教育储蓄法》提交议会，设立学习债券（CLB），面向 2004 年起出生的孩子",
"status": "已生效",
"url": "https://www.canada.ca/en/news/archive/2004/10/government-canada-tables-canada-education-savings-act-creating-canada-learning-bond.html",
"value": "2004-10"
},
"tl_2005_acesg": {
"effective": "2005-01",
"rule": "额外 CESG 开始：低、中收入家庭首 500 供款另加 20% 或 10%",
"status": "已生效",
"url": "https://lop.parl.ca/sites/PublicWebsite/default/en_CA/ResearchPublications/LegislativeSummaries/381LS483E",
"value": "2005-01"
},
"tl_2007_limits": {
"effective": "2007",
"rule": "CESG 年额度升到 500、单年上限 1,000（有未用额度）；取消 RESP 年度供款上限，终身上限由 42,000 提到 50,000",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps/resp-contributions.html",
"value": "2007"
},
"tl_2007_qesi": {
"effective": "2007",
"rule": "魁北克 QESI 开办（当年净供款 10%，终身 3,600）",
"status": "已生效",
"url": "https://www.revenuquebec.ca/en/citizens/tax-credits/quebec-education-savings-incentive/determining-the-qesi-amount/",
"value": "2007"
},
"tl_2015_bctesg": {
"effective": "2015",
"rule": "BC 省 BCTESG 开办：2006 年后出生的孩子一次性 1,200，不需供款",
"status": "已生效",
"url": "https://www2.gov.bc.ca/gov/content/education-training/k-12/support/scholarships/bc-training-and-education-savings-grant",
"value": "2015"
},
"tl_2023_eap": {
"effective": "2023-03-28",
"rule": "EAP 前 13 周上限由 5,000/2,500 提到 8,000/4,000（全日制/非全日制）",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/bulletins/resp-bulletin-1.html",
"value": "2023-03-28"
},
"tl_2023_sages": {
"effective": "2023-09-01",
"rule": "萨省 SAGES 取消，账户内余额转为累积收益",
"status": "已生效",
"url": "https://www.canada.ca/en/employment-social-development/services/student-financial-aid/education-savings/resp/resp-promoters/bulletin/notice-2022-966.html",
"value": "2023-09-01"
},
"tl_2024_c69": {
"effective": "2024-06-20",
"rule": "Budget 2024（C-69）御准：学习债券自动开户立法",
"status": "已生效",
"url": "https://www.canada.ca/en/department-finance/news/2024/06/budget-2024-legislation-to-ensure-fairness-for-every-generation-receives-royal-assent.html",
"value": "2024-06-20"
},
"tl_2026_cgeb": {
"effective": "2026-07",
"rule": "GST/HST 抵免改名为杂货与必需品福利（CGEB）并增额",
"status": "已生效",
"url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-groceries-essentials-benefit.html",
"value": "2026-07"
},
"tl_2027_optout": {
"effective": "2027",
"rule": "学习债券自动开户：家长可开始申请退出",
"status": "已宣布",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/canada-learning-bond.html",
"value": "2027"
},
"tl_2027_qualinv": {
"effective": "2027-01-01",
"rule": "注册计划（含 RESP）合格投资规则拟统一（Budget 2025 提议）",
"status": "拟议",
"url": "https://www.canada.ca/en/department-finance.html",
"value": "2027-01-01"
},
"tl_2028_auto": {
"effective": "2028-04",
"rule": "政府为符合条件、4 岁仍无 RESP 的 2024 年后出生孩子自动开户存入学习债券；追溯申领年龄拟延至 30 岁",
"status": "已宣布",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/canada-learning-bond.html",
"value": "2028-04"
},
"transfer_no_tax": {
"effective": "",
"rule": "同一受益人在机构之间转户没有税务后果（可能有手续费）",
"status": "已生效",
"url": "https://www.canada.ca/en/services/benefits/education/education-savings/managing-plan.html",
"value": true
}
};
  if (typeof module === 'object' && module.exports) module.exports = R; else root.RESP_RULES = R;
})(typeof self !== 'undefined' ? self : this);
