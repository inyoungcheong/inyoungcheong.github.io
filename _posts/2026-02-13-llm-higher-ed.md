---
layout: post
title:  LLM Lit Review Experiment with Claude Opus 4.6
date:   2026-02-13 16:40:16
description: Is LLMs' literature any better in early 2026?
published: true
---

<blockquote>
<p><strong>A note on this literature review.</strong> I was intrigued by the recent excitement about Claude Opus 4.6. The literature review done by commercial LLMs had not been satisfying (if you ask my opinion, I have preferred to use AI2 Asta), as my co-authors and I stressed in our <a href="https://arxiv.org/abs/2411.05025">COLM 2025 paper</a>. I instructed Claude to conduct a literature review on college students' expectation gaps on LLMs for their education. The prompt is available below and the result is as follows. It was impressive that all articles do exist (no links are dead) and all titles in the footnotes appear to be correct. Still, I found that the citations are flawed. For example, the second author (E. Wilder) is missing from fn. 25. Fn. 33 is written by J. Huang, not C. Huang. Fn. 32 is authored by M. Oliński and K. Sieciński, not Strzelecki, A. Authors' first names on fn. 25 are slightly altered. Some footnotes drop authors' names. Therefore, it's still not reliable as a literature pointer. But it provides a very rough, bird's eye view of the scholarly landscape. I pushed it further and generated a literature gap analysis. This one was visually satisfying, though I found it harder to internalize the findings. 

<a href="{{ '/assets/html/gap_analysis.html' | relative_url }}" class="pub-link-btn" target="_blank" rel="noopener">Literature Gap Analysis →</a></p>

<details>
<summary><strong>Prompt used for this literature review</strong></summary>
<p>Conduct a comprehensive literature review and synthesis of academic papers (2023–2026) regarding the use of Large Language Models (LLMs) in college-level education. I am specifically interested in the structural gap between student expectations and actual outcomes. > Please investigate and categorize findings into the following three pillars:
1. The Disillusionment Gap (Expectation > Reality): What specific tasks did students initially expect LLMs to master (e.g., deep critical analysis, factual accuracy in niche research, complex mathematical reasoning) where the technology ultimately underperformed or produced 'hallucinations'?
2. The Serendipity Factor (Reality > Expectation): In which areas did students find unexpected value that they didn't initially prioritize? (e.g., personalized tutoring, brainstorming/ideation, code debugging, or emotional support/scaffolding).
3. The Temporal Shift (Evolution of Perception): How has the 'User Expectation' evolved from the early 'ChatGPT hype' (late 2022/2023) to the current era of 'AI Literacy' (2025/2026)? Look for longitudinal studies or comparative surveys that track changes in student trust, dependency, and 'prompt engineering' sophistication.
Methodological Focus: Please look for studies applying frameworks such as Expectation-Confirmation Theory (ECT), Technology Acceptance Model (TAM), or Task-Technology Fit (TTF).
Output Requirement: Provide a summary of key papers, their core findings regarding the 'gap,' and a list of common 'points of friction' where students report the highest levels of frustration versus satisfaction.</p>
</details>
</blockquote>


---

## LLMs in Higher Education

Large language models have simultaneously disappointed and surprised college students in ways that reveal a predictable but underexplored structural pattern. Across empirical studies, meta-analyses, and large-scale surveys published between 2023 and 2026, the literature converges on a consistent finding: students initially overestimate LLM capabilities for analytical tasks while underestimating their value for scaffolding, ideation, and emotional support. This expectation-outcome mismatch follows a temporal arc from the "ChatGPT hype" of early 2023 through a disillusionment phase and toward a more calibrated "AI literacy" era emerging in 2025–2026.

Adoption rose from under 10% to over 80% within two years at U.S. institutions,[^1] creating acute pedagogical challenges that most universities have only begun to address.

---

## Pillar 1: The Disillusionment Gap (Expectation > Reality)

The most robustly documented dimension of the expectation-outcome gap concerns tasks where students expected LLM mastery but encountered systematic failure. Three task domains stand out: citation generation, mathematical reasoning, and domain-specific factual accuracy.

### 1.1 Citation Fabrication

Walters (2023) tested GPT-3.5 and GPT-4 across 42 multidisciplinary topics and found that 55% of GPT-3.5 citations and 18% of GPT-4 citations were entirely fabricated — nonexistent papers with plausible-looking authors, titles, and DOIs.[^2] Among non-fabricated citations, 43% (GPT-3.5) and 24% (GPT-4) contained substantive errors. Day (2023), writing in *The Professional Geographer*, confirmed this pattern for geography topics, finding all generated citations were fabricated.[^3]

Critically, the problem persists in newer models. Linardon, Jarman, McClure, Anderson, Liu, and Messer (2025), testing GPT-4o across mental health topics at Deakin University, found that roughly 1 in 5 citations remained fabricated, with more than half of all citations either fake or containing errors.[^4] Fabrication rates reached approximately 30% for less-studied conditions like binge eating disorder but only 6% for well-studied topics like depression — indicating that niche areas with sparse training data suffer disproportionately.

### 1.2 Mathematical Reasoning

Frieder et al. (2023) evaluated ChatGPT's mathematical proficiency and reported skills significantly worse than those of a typical mathematics graduate student.[^5] A 2024 *Frontiers in Education* study evaluating GPT-4 and GPT-4o on NAEP mathematics items found that while models performed reasonably on computational tasks, they failed on problems requiring spatial reasoning: odds of correct answers in geometry were only 18% of algebra odds.[^6]

### 1.3 Declining Trust at Population Scale

The Chegg Global Student Survey (2025), surveying 11,706 undergraduates across 15 countries, found that concern about receiving incorrect information rose from 47% in 2023 to 53% in 2025 — the single largest concern among student users.[^7] The Digital Education Council Global AI Student Survey (2024), sampling 3,839 students from 16 countries, reported that 80% of students said AI in universities was "not fully meeting expectations."[^8]

Ravšelj, Keržič, and colleagues (2025), in *PLOS ONE*, conducted the largest study to date with 23,218 students from 109 countries and found ChatGPT rated as useful for simplifying information but less reliable for providing accurate information, supporting classroom learning, or developing critical thinking.[^9]

### 1.4 Metacognitive Laziness

Fan, Tang, Le, Shen, Tan, Zhao, Shen, Li, and Gašević (2024), in *British Journal of Educational Technology*, conducted a randomized experiment with 117 university students. While the ChatGPT group produced the best essays, knowledge gain and transfer were not significantly different across groups. The authors identified a pattern they term "metacognitive laziness": AI dependency that bypasses deeper engagement with planning, monitoring, and evaluation.[^10]

Tossell, Tenhundfeld, Momen, Cooley, and de Visser (2024), in *IEEE Transactions on Learning Technologies*, studied 24 undergraduate engineering students and found that ChatGPT did not simplify the writing process as expected. Students reported the assignment was more difficult after using ChatGPT than anticipated.[^11]

---

## Pillar 2: The Serendipity Factor (Reality > Expectation)

Against the backdrop of disillusionment in expected domains, a parallel literature documents surprising value in areas students did not initially prioritize.

### 2.1 Brainstorming as the Dominant Use Case

Across virtually every large-scale survey, brainstorming and idea generation emerged as the single most common LLM use — a finding that surprised researchers who had anticipated essay generation or information retrieval would dominate. Ravšelj et al. (2025) found brainstorming was the most popular application among 23,218 students.[^9] Contractor and Reyes (2025), studying 634 students at Middlebury College, found students predominantly used AI for augmentation (61.2% — explanations, feedback, concept clarification) rather than automation (41.9% — direct text generation), with concept explanation (80.3%) and idea generation (61.9%) among the top uses.[^1]

Mollick and Mollick (2024) documented the "jagged frontier" — the finding that AI was surprisingly good at tasks expected to be hard (idea generation, creative writing) and surprisingly bad at tasks expected to be easy (basic math, consistent spelling).[^12]

### 2.2 Emotional Scaffolding and Anxiety Reduction

Perhaps the most unexpected finding across the qualitative literature is the role of LLMs in providing emotional support. Al-Abdullatif, Alsubaie, and colleagues (2023), in the *European Journal of Investigation in Health, Psychology and Education*, found reduced anxiety and increased self-confidence as emergent themes — findings not part of the original research questions.[^13]

Steiss, Tate, and colleagues (2024), in *Computers and Education: Artificial Intelligence*, conducted a randomized controlled trial with 459 secondary EFL students and found that LLM-generated feedback increased not only revision performance (d = 0.19) but also task motivation (d = 0.36) and positive emotions (d = 0.34) — medium effects that exceeded expectations for what was designed as a purely cognitive intervention.[^14]

A qualitative study published in *Interactive Learning Environments* (2024) examining management students' lived experiences identified reassurance and validation as a primary driver of use — students described ChatGPT as a judgment-free space where they could verify understanding before submitting work.[^15]

### 2.3 Accessibility Benefits

Pierrès and colleagues (2024) found that ChatGPT facilitated written communication for students with communication disabilities, improved reading comprehension for neurodiverse students, and helped organize academic work for students with executive function challenges.[^16] A 2025 *Computers & Education* survey of 124 students with disabilities confirmed this grassroots adoption pattern, though it also flagged subscription costs as an equity barrier.[^17]

### 2.4 Meta-Analytic Evidence for Cognitive Engagement

Li and colleagues (2025), in *Computers & Education: Artificial Intelligence*, conducted a PRISMA meta-analysis of 17 empirical studies (1,735 students) and found a large effect on cognitive engagement that exceeded both behavioral and emotional engagement effects.[^18] Wang and Fan (2025), in *Humanities and Social Sciences Communications* (Nature), meta-analyzed 51 studies and reported a moderately positive effect on higher-order thinking (Hedges' g = 0.457).[^19]

---

## Pillar 3: The Temporal Shift (Evolution of Perception)

### 3.1 The Adoption Curve

Contractor and Reyes (2025) provide the most granular adoption data from a U.S. institution. At Middlebury College, fewer than 10% of students used AI academically before Spring 2023, rising to over 80% by Fall 2024.[^1] The HEPI/Kortext surveys (2024–2025) of UK undergraduates show overall AI tool usage jumping from 66% to 92% in a single year.[^20]

### 3.2 Declining Trust Over Time

Polyportis and Pahos (2024), in *Frontiers in Artificial Intelligence*, conducted a two-wave panel survey of 222 Dutch higher education students separated by eight months. They documented a significant decline in both ChatGPT usage behavior and trust over the observation period.[^21] The Tyton Partners "Listening to Learners" surveys (2024–2025) documented that GenAI use for academic support actually declined between 2024 and 2025.[^22]

### 3.3 From Novelty to Study Companion

Şad (2025), in *Interactive Learning Environments*, conducted a mixed-methods longitudinal study tracking language students over one full academic year using UTAUT constructs. Performance expectancy remained high, but effort expectancy (ease of use) notably increased as students became more fluent with the technology. Social influence also shifted: initially, significant others held predominantly negative attitudes, but after one year, negative sentiments decreased and positive attitudes increased. Students evolved from viewing ChatGPT as a novelty to describing it as "a study buddy, a teacher, and sometimes just a friend."[^23]

### 3.4 The Dependency Paradox and Cognitive Debt

Bastani, Bastani, Sungu, Ge, Kabakcı, and Mariman (2025), published in *PNAS*, conducted a large-scale field experiment with approximately 1,000 high school math students. While standard ChatGPT improved practice performance by 48%, on subsequent exams without AI access, these students performed significantly worse than controls — indicating reduced skill acquisition.[^24]

Kosmyna, Hauptmann, Yuan, Situ, Liao, Beresnitzky, Braunstein, and Maes (2025), from the MIT Media Lab, conducted a four-month experimental study with EEG monitoring and documented that by the third writing session, most LLM users simply copied and pasted from ChatGPT, exhibiting up to 55% reduced brain connectivity compared to unassisted writers. The authors coined the term "cognitive debt." *Note: this study (arXiv preprint) has not yet undergone peer review and has a small sample (n = 54).*[^25]

### 3.5 The AI Literacy Gap

Despite near-universal adoption, AI literacy remains strikingly low. Only 10.1% of Middlebury students knew about college-provided AI resources and just 32.6% understood proper citation practices.[^1] The Digital Education Council survey (2024) reported that only 5% of students were "fully aware" of institutional AI guidelines.[^8] The HEPI survey (2025) found that while 67% of students considered AI "essential," only 36% had received any AI training from their institution.[^20]

---

## Theoretical Frameworks

### Expectation-Confirmation Theory (ECT)

Saxena and Doleck (2023), in *Eurasia Journal of Mathematics, Science and Technology Education*, surveyed 106 Canadian students and found their unified ECM model explained 60.5% of variance in continuance intention, with disconfirmation of pre-use expectations as a key antecedent.[^26] Ngo, An, Nguyen, and Tran (2024), in *Journal of Information Technology Education: Research*, surveyed 435 students across eight Vietnamese universities and confirmed the ECT pathway — but with a critical anomaly: perceived usefulness did not significantly predict satisfaction, suggesting that finding ChatGPT useful does not guarantee being satisfied with it.[^27]

### UTAUT2

Strzelecki (2024), in *Innovative Higher Education*, established the foundational UTAUT2 model for ChatGPT adoption, finding that performance expectancy and habit were the strongest predictors of behavioral intention.[^28] A Norwegian replication (2024, n = 104) confirmed these results.[^29] A Chinese study (2025) found that AI literacy strongly predicted both performance expectancy (β = 0.583) and effort expectancy (β = 0.585), identifying literacy as a crucial upstream variable.[^30]

### Task-Technology Fit (TTF)

Al-Mamary, Alfalah, Alshammari, and Abubakar (2024), in *Future Business Journal*, confirmed that task characteristics, technology characteristics, and individual characteristics all significantly influence task-technology fit, which in turn predicts usage intention.[^31] Strzelecki (2025), in *Youth* (MDPI), integrated TAM, ECT, and TTF in a single framework with 409 Polish students and found that students consistently rated ChatGPT's "potential" usefulness higher than its "current" usefulness — a direct operationalization of the expectation gap.[^32]

---

## Meta-Analytic Synthesis

| Meta-Analysis | N (studies) | Key Finding | Effect Size |
|---|---|---|---|
| Deng et al. (2025), *Computers & Education* | 69 | Improves performance, no effect on self-efficacy | Positive (varied) |
| Wang & Fan (2025), *Humanities & Soc. Sci. Comms.* | 51 | Large effect on learning performance | g = 0.867 |
| Liu et al. (2025), *J. Computer Assisted Learning* | — | Moderately positive, moderated by discipline | g = 0.577 |
| Lee & Lee (2025), *IRRODL* | — | Largest effects for self-regulated learning | g = 0.573 (overall); g = 1.115 (SRL) |
| Huang et al. (2025), arXiv | 133 | Strong qualification effects; fragile subjectification | Varied |

A significant methodological limitation: 78% of experimental studies originate from Asian educational contexts, with only 5.4% from North America.[^33]

---

## Points of Friction: Where Students Report Highest Frustration vs. Satisfaction

### Highest Frustration

1. **Citation fabrication** — students trust LLM-generated references and submit fabricated sources unknowingly
2. **Mathematical reasoning failures** — confident-sounding but incorrect solutions, especially in geometry and proof-based tasks
3. **Factual inaccuracy in niche domains** — less-studied topics produce dramatically higher hallucination rates
4. **Inconsistency across sessions** — the same prompt yields different quality outputs, undermining reliability
5. **Institutional policy confusion** — 80% of students report universities are not meeting expectations for AI integration; only 5% are fully aware of AI guidelines
6. **Equity barriers** — subscription costs for GPT-4/Claude create a two-tier system among students

### Highest Satisfaction

1. **Brainstorming and ideation** — consistently rated the top use case across all major surveys
2. **Concept explanation and tutoring** — 80.3% of Middlebury students used AI for this purpose
3. **Emotional scaffolding** — reduced anxiety, increased confidence, judgment-free verification
4. **Writing feedback and revision support** — medium effect sizes for motivation (d = 0.36) and positive emotions (d = 0.34)
5. **Accessibility accommodations** — neurodiverse students and second-language learners report significant benefits
6. **Structuring and planning** — students with executive function challenges find particular value

---

## Key Implications for Future Research

The literature reveals a structurally predictable pattern of misaligned expectations that is gradually self-correcting. Three insights stand out. First, the gap is task-specific: students' frustrations cluster around tasks requiring factual precision and mathematical reasoning, while their positive surprises cluster around generative breadth and scaffolding. Second, the temporal evidence suggests an oscillation toward calibration rather than monotonic decline. Third, the most consequential expectation-reality gap may concern institutional response: students have adapted faster than universities have updated pedagogy, assessment, and support structures. Future research would benefit from longitudinal panel designs at U.S. institutions, direct pre-post measurement of expectations using ECT frameworks, and experimental studies isolating task-technology fit across specific academic disciplines.

---

## Footnotes

[^1]: Contractor, Z. & Reyes, G. (2025). Generative AI in Higher Education: Evidence from an Elite College. IZA Discussion Paper No. 18055. Available at: <https://arxiv.org/abs/2508.00717>

[^2]: Walters, W. H. (2023). Fabrication and errors in the bibliographic citations generated by ChatGPT. *Scientific Reports*, 13, 14045. <https://www.nature.com/articles/s41598-023-41032-5>

[^3]: Day, T. (2023). A preliminary investigation of fake peer-reviewed citations and references generated by ChatGPT. *The Professional Geographer*, 75(6), 1024–1027. <https://www.tandfonline.com/doi/full/10.1080/00330124.2023.2190373>

[^4]: Linardon, J., Jarman, H. K., McClure, Z., Anderson, C., Liu, S., & Messer, M. (2025). Hallucinated citations in ChatGPT-generated text across mental health topics. Preprint / Deakin University. Reported in PsyPost: <https://www.psypost.org/chatgpt-hallucinates-fake-but-plausible-scientific-citations-at-a-staggering-rate-study-finds/>

[^5]: Frieder, S. et al. (2023). Mathematical capabilities of ChatGPT. *NeurIPS 2023 Workshop*. See also PMC discussion: <https://pmc.ncbi.nlm.nih.gov/articles/PMC12027771/>

[^6]: GPT-4 / GPT-4o performance on NAEP mathematics items (2024). Reported in *Frontiers in Education*. See discussion in the meta-analytic review at: <https://pmc.ncbi.nlm.nih.gov/articles/PMC12027771/>

[^7]: Chegg (2025). Chegg Global Student Survey 2025: 80% of Undergraduates Worldwide Have Used GenAI — But Accuracy a Top Concern. <https://investor.chegg.com/Press-Releases/press-release-details/2025/Chegg-Global-Student-Survey-2025-80-of-Undergraduates-Worldwide-Have-Used-GenAI-to-Support-their-Studies--But-Accuracy-a-Top-Concern/default.aspx>

[^8]: Digital Education Council (2024). Global AI Student Survey 2024. <https://www.digitaleducationcouncil.com/post/what-students-want-key-results-from-dec-global-ai-student-survey-2024>

[^9]: Ravšelj, D., Keržič, D. et al. (2025). Higher education students' perceptions of ChatGPT: A global study of early reactions. *PLOS ONE*. <https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0315011>

[^10]: Fan, Y., Tang, S., Le, H., Shen, S., Tan, Y., Zhao, L., Shen, L., Li, X., & Gašević, D. (2024). Beware of metacognitive laziness: Effects of generative artificial intelligence on learning. *British Journal of Educational Technology*. PDF available at: <https://ttim.phbern.ch/wp-content/uploads/2025/02/Brit-J-Educational-Tech-2024-Fan-Beware-of-metacognitive-laziness-Effects-of-generative-artificial-intelligence-on.pdf>

[^11]: Tossell, C. C., Tenhundfeld, N. L., Momen, A., Cooley, K., & de Visser, E. J. (2024). Student perceptions of ChatGPT use in a college essay assignment. *IEEE Transactions on Learning Technologies*. DOI: 10.1109/TLT.2024.3355015. Google Scholar entry: <https://scholar.google.com/scholar_lookup?doi=10.1109/TLT.2024.3355015>

[^12]: Mollick, E. & Mollick, L. (2024). Discussed in *Co-Intelligence: Living and Working with AI* (Penguin). See also Wharton School working papers. Context: <https://www.university-365.com/post/co-intelligence-living-and-working-with-ai-by-ethan-mollick>

[^13]: Al-Abdullatif, A. M., Alsubaie, M. A. et al. (2023). Drivers and consequences of ChatGPT use in higher education: Key stakeholder perspectives. *European Journal of Investigation in Health, Psychology and Education*. <https://pmc.ncbi.nlm.nih.gov/articles/PMC10670526/>

[^14]: Steiss, J., Tate, T. et al. (2024). Using LLMs to bring evidence-based feedback into the classroom: AI-generated feedback increases secondary students' text revision, motivation, and positive emotions. *Computers and Education: Artificial Intelligence*. <https://www.sciencedirect.com/science/article/pii/S2666920X23000784>

[^15]: Qualitative study of students' lived experience and perceptions of using ChatGPT: immediacy, equity and integrity. (2024). *Interactive Learning Environments*. <https://www.tandfonline.com/doi/full/10.1080/10494820.2024.2350655>

[^16]: Pierrès, Y. et al. (2024). Challenges in accessing generative AI for users with disabilities. *CEUR Workshop Proceedings*, Vol. 4000. <https://ceur-ws.org/Vol-4000/paper09.pdf>

[^17]: The use of generative AI by students with disabilities in higher education. (2025). *Computers & Education*. <https://www.sciencedirect.com/science/article/pii/S1096751625000235>

[^18]: Li, S. et al. (2025). How ChatGPT impacts student engagement from a systematic review and meta-analysis study. *Computers & Education: Artificial Intelligence*. <https://www.sciencedirect.com/science/article/pii/S2666920X25000013>

[^19]: Wang, T. & Fan, Y. (2025). The effect of ChatGPT on students' learning performance, learning perception, and higher-order thinking: Insights from a meta-analysis. *Humanities and Social Sciences Communications* (Nature), 12, 447. <https://www.nature.com/articles/s41599-025-04787-y>

[^20]: HEPI (2025). Student Generative AI Survey 2025. Higher Education Policy Institute / Kortext. <https://www.hepi.ac.uk/reports/student-generative-ai-survey-2025/>

[^21]: Polyportis, A. & Pahos, N. (2024). A longitudinal study on artificial intelligence adoption: Understanding the drivers of ChatGPT usage behavior change in higher education. *Frontiers in Artificial Intelligence*, 6, 1324398. <https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2023.1324398/full>

[^22]: Tyton Partners (2025). Listening to Learners 2025. <https://tytonpartners.com/listening-to-learners-2025/>

[^23]: Şad, S. N. (2025). "ChatGPT is like a study buddy, a teacher and sometimes just a friend": A longitudinal exploration of students' interactions, perception and acceptance. *Interactive Learning Environments*. <https://www.tandfonline.com/doi/full/10.1080/10494820.2025.2509276>

[^24]: Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, Ö., & Mariman, R. (2025). Generative AI without guardrails can harm learning: Evidence from high school mathematics. *Proceedings of the National Academy of Sciences* (PNAS). <https://www.pnas.org/doi/10.1073/pnas.2422633122>

[^25]: Kosmyna, N., Hauptmann, C., Yuan, H., Situ, S., Liao, X., Beresnitzky, M., Braunstein, E., & Maes, P. (2025). Your Brain on ChatGPT: Accumulation of Cognitive Debt when Using an AI Assistant for Essay Writing Task. arXiv preprint 2506.08872 / MIT Media Lab. <https://arxiv.org/abs/2506.08872>

[^26]: Saxena, R. & Doleck, T. (2023). A structural model of student continuance intentions in ChatGPT adoption. *Eurasia Journal of Mathematics, Science and Technology Education*, 19(12), em2393. <https://www.ejmste.com/article/a-structural-model-of-student-continuance-intentions-in-chatgpt-adoption-13839>

[^27]: Ngo, T. T. A., An, T. V., Nguyen, M. T., & Tran, T. H. (2024). Unlocking educational potential: Exploring students' satisfaction and sustainable engagement with ChatGPT using the ECM model. *Journal of Information Technology Education: Research*, 23, 5344. <https://www.informingscience.org/Publications/5344>

[^28]: Strzelecki, A. (2024). Understanding university students' acceptance of ChatGPT: Insights from the UTAUT2 model. *Applied Artificial Intelligence*, 38(1). <https://www.tandfonline.com/doi/full/10.1080/08839514.2024.2371168>

[^29]: Norwegian replication using UTAUT2, pre-registered (2024). Published in *Applied Artificial Intelligence*. See Strzelecki (2024) discussion at [^28].

[^30]: Bridging AI literacy and UTAUT constructs (2025). *Humanities and Social Sciences Communications* (Nature). <https://www.nature.com/articles/s41599-025-05775-y.pdf>

[^31]: Al-Mamary, Y. H., Alfalah, A. A., Alshammari, S. A., & Abubakar, U. S. (2024). Exploring factors influencing university students' intentions to use ChatGPT: Analysing task-technology fit theory. *Future Business Journal*, 10, 106. <https://fbj.springeropen.com/articles/10.1186/s43093-024-00406-5>

[^32]: Strzelecki, A. (2025). Youth and ChatGPT: Perceptions of usefulness and usage patterns of Generation Z in Polish higher education. *Youth*, 5(4), 106. <https://www.mdpi.com/2673-995X/5/4/106>

[^33]: Huang, C. et al. (2025). A meta-analysis of LLM effects on students across qualification, socialisation, and subjectification. arXiv preprint 2509.22725. <https://arxiv.org/abs/2509.22725>

---

