# Handover: World History I (Canvas 8557) — Benchmark 1 grading and Benchmark 2 setup

Written 2026-10-15 (Thu) from a cloud session. Hand this to a session that runs on
Harry's computer (Claude Desktop / `claude remote-control`) so it can print, open
Dash, and use the browser. Harry works mostly from his phone.

## Standing rules (do not break)
- **Never edit a student's original document.** Grade only the "(WORKING)" copies
  in Harry's Drive. Linked docs inside a portfolio are originals too.
- **Nothing reaches students without Harry's explicit approval**: no Canvas grades,
  no PDFs returned, no sharing, no emails. Drafts are drafts.
- No emails or drafts are sent. Gmail drafts may be created only when asked.
- Canvas changes go through the course repo + GitHub Actions (below), never by
  hand-editing Canvas. Never sync CORE 8316. Do not delete rubrics in past courses.
- Per-section calendar events must be section-specific (helper:
  `scripts/section_events.py`; guard runs after every script).
- Wording: matter-of-fact, no "the bell" (say "at the start of class"), no emoji
  in student-facing text. Activities go at the bottom of the module. Don't
  reference other activities inside an activity.

## People, sections, times (Eastern)
- Harry Canellakis, hcanellakis@mcdonogh.org (school) / harry.canellakis@mdunitedfc.org.
- Colleagues: Gus Mahler gmahler@mcdonogh.org; Jourdan (likely) jdelerme@mcdonogh.org.
- Canvas course 8557. Sections: E1 = 20549, F2 = 20550, G1 = 20551.
- Rotating schedule; pull times from Harry's Google Calendar ("(CP) World History I (Sec. X)").
  Known: Thu 10/15 E1 8:30, F2 10:25, G1 12:50. Fri 10/16 E1 2:05–3:15.
  Tue 10/20 F2 8:30–9:45, G1 10:25–12:05. Wed 10/21 E1 12:50, F2 2:05.
- Debate days were Mon 9/28 (E1) and Tue 9/29 (F2, G1).

## Repos and automation
- Course repo: `canellakish-design/world-history-canvas`, branch `main`.
  `git pull -q origin main` before committing. Commit trailer:
  `Co-Authored-By: Claude ... <noreply@anthropic.com>` + `Claude-Session: <url>`.
- Canvas scripts run via GitHub Actions `run-script.yml` (inputs: `script`, `course_id`);
  module content syncs via `sync-canvas.yml` (course_id, module_filter, modules_file
  `content/modules-canellakis.json`). Read logs with the GitHub MCP `get_job_logs`.
- Useful read-only scripts: `report_portfolio_e1.py` (PORTFOLIO_SECTION env),
  `report_portfolio_f2_g1.py`, `report_section_visibility.py`, `report_avatars.py`.
- Key IDs: BENCHMARK 1 PORTFOLIO assignment 281578 (500 pts, Benchmark Rubric id 9264,
  5 categories × 100, Full Marks / No Marks). Discussion Reflection Part 2 = 296631.
  B2 Part 1 discussion = 295779. Kaplan READ = 296994. Doc A READ = 297126.
  B2 JOURNAL assignments = 297224 (Anchor) … 297232 (H). Announcement topic 49322.

## Benchmark 1 portfolio grading — current state
All submitted portfolios are copied, draft-graded, and waiting for Harry's approval.

| Section | Working-copy folder | Graded folder (feedback applied) | Review doc |
|---|---|---|---|
| E1 (13) | `1PDUvjy--NRrue_RG9sRHPc-4EuX5-oJ0` | `1Rw6K11qvN6VpIceS4A0i6HgQildeTUZ3` | `1SOlFVTfvbqZpgw7FSlqvSe2fMkjzmJihiZKcsKiSm8s` |
| F2 (12) | `1CjA27yPLijKYVAf05DDmO8kSz0jAfohX` | `1U13znh7hVUjWJJ5xRw0Zd7_1NJhMfxjv` | `1eMZF1rtyGBc9K5kAPSKx2h-K_DRtFxuQsr6pAMdkMDY` |
| G1 (16) | `1IS9Rfmjn1jIoCGjSAbn8MZZ8pGuJCyIJ` | `1UUNYq-Un5g8zLzm67iEkeZWyNJm8R7Yy` | `1JkiRij5p9riWz3NvIeQU91xMiNseghcNFwbxNekL4yQ` |

What each WORKING copy has: a dark-red "Benchmark 1 Portfolio Feedback (DRAFT: pending
Mr. Canellakis's approval)" block at the top (5 scores, suggested total, "Part 2
discussion: to be added", Missing list, Other notes), plus highlighted passages
(green strength / yellow fix / red missing) each followed by a bold dark-red
`[Mr. C — …]` note written into the text so it survives PDF export. Teacher-only
flags live only in the review docs.

Rubric: Mastery of Content · Integration of Evidence · Analysis of Content ·
Clarity and Organization · Executive Skills; each Full (100) or No (0).

### Students: original doc ID → working copy ID (draft total)
E1
- Altshuler, Evan — 1IQcbUhgjPEQV66Pg1OnUFbFAenP72tYaKKeliEG_D_E → 1w_6xo_i-t6dcsyrfbFRoQptwUyr3GbtcJ25Hu35AUC0 (300)
- Applegate, Reese — 1mJIiAjCosr8jdwch5yeTitWTEzevvrCMuLPiWfSxCk4 → 1uieoGkdm1_Y04DVIKThI9HE7-RfPZUCvAOuO7IHinfM (400)
- Bank, Campbell — 1TQYZ9JaFQpBPNugcIjtkdmxgSLrj_gr8ZdXtFKvMiPM → 1gF6LqiauXoLOpOedjrVklM-276IT6bWhqhpZ82EDhhg (200)
- Bisset, Will — 1a2ultUMNIpWBMBtpYXCS_a-cgsrofTEgDcT88J5XAHY → 1vp0ckAFvcJsPxrzm7teR7wqUXOpMY7_uVFzcb08Ov5o (100)
- Davis, Evan — 1yN6l5XkySDCIEK-qI1I74gOAygHzcTstYYheUoLsHPY → 1HJTZhG4NRiVQUPXrIWMPR1-b7j9fMg-nDkpfuWZDz6M (100) — also on G1 roster; doc titled "…-G1"; confirm section
- Frimpong, McNeil — 1mlanALV66ZcgNGJkNjeTLG50GZ3cVh9EevehlWcQO08 → 1xpmfVXQ6vOzOaMT3iveGqdsVX-mwBAAWWM6KhX0gp6k (200)
- Hecker, Reagan — 1w7dBtBCnwQIE-GJ5_twQLTDsWu9NNdNBVHpohs3AcYM → 1l5pFaJ4GEUnFWFQEpEC945ttMpbZ5YW_oh-Y-hQ_4GM (500; content is in linked docs; owes debate make-up paragraph)
- Kasireddy, Ronav — 1XJ_Jq_kgAsPnt2kYQ-x3l75SU0Pl40TcKVHLrWMu5-w → 1EFapoWJybNCzK7FYpYWA8-nhFxkNxY0pvBQ1LhLJc2w (400)
- Kaur, Agum — 1ALJvxgpMFOMBRrvyfDxYp0bgV_D6P_OqNial06T0gdw → 16wr3tCz0Asno-XG74CnptHX1ta1lbXOf3qVnADfKJH0 (300)
- Kendall, Zoe — 1KDglTMwOlbdIf1ciikYi5vlsKy7tEgSdWN4h3hWbtmA → 1cKqdqkNUqjp2v2lSQNXFW0AlqF2lblW0q_sDq1Nn_CI (300)
- Patel, Siya — 120Va_076iW0xezQM37TYF9V-QchdIs-mdjliGEUBvEk → 13kz3O4OUroTOuiQ_5TjuRdsPxzRKcC1GS98iEctK4cE (300)
- Reicher, Olivia — 156XgXlM7VSmkszTSUj2-bYuovBz4QgZXhvpHlnUW-oQ → 19u7jCd0a84mU3I8QKtceh0iUBIcrmTmpm82ir0UzJdQ (400)
- Shettigar, Sakshi — 13sC9xWrgrTmsiwV6UVNWsLibklvz4yfetLJ2u-7rqtw → 1c54npvJmeRcN3wwwJH-MYMMA4aSbm6vwZOt0PEPA6cQ (200)
- Not submitted: Owens, Halayna; Oyetunji, Kanmi (shared doc 1gwKY70LhJ7taGM4rHqQcNbW3cLQXEJn2e_a5sB-lGPQ); Preston, JP (shared doc 1M1JXbXX1veHpRTjZUMb3PJi4WnIiy8avzsww1gxLeQ4).

F2 (deadline Tue 10/13 11:59 PM)
- Casper, Becca — 1lM1veReBPJE2WlQk-hKMKjcRftfHOBlfHz-dRLjJaMs → 19HYaAdXfu8bFTRkNBJF73E3STa19Miyb1LBca87-Zoc (300)
- Ciarpella, Carter — 17cb5M5mdh_W9BhPZ2Gp5clmo_90IoLnoQ0Do-d9mDxU → 17coZrdGuPwbYvAE5Zx3hR_Q5tPVYqU4Dozt2U29hbkI (100)
- Connolly, Hudson — 1xx2aGclCiymZAaFFLh-i1KzDyXsAlSRY0yrp96PswE4 → 1qStzUNhkqOesyQo-PXfF14VBszYn_rP1JVq10FjOK5g (0; LATE Wed 10/14)
- Dike, Allyn — 1Zp6TILGJHWTRrItA1-018HW2Vn2cgHN5_BbuixpmTnE → 1grx6AWZFf3iij8VdtwmQh1Y6Le5vPg06lKjhadrBa58 (300)
- Doyle, Jane — 12wEdV6bApq_2hxSdUSB_qF4Xtldtc88pTyEMlNFm0rk → 1c6InkKJrky_VUr_rWbPaNDhLglYdcy7GoLFDOl5SoP8 (300)
- Garg, Yash — 13RWW1IDA1PC5knp3DLdsUU3-5E7KsMRghzBsUhlXeGE → 1O69TfOjLutMMCyVVURrbAfgkva2aRnQ-KDUERLOPwvs (300)
- Goode, Cloe — 1NdJzTPK5TDqnql-4DTYbouTJfchN3kuhN3QJgJBize0 → 1hbtNLEbr-R3izWhFUs0gc_-r75dgOecBXeXtorfJJZY (0; sick for debate, owes make-up paragraph)
- Katzen, Mia — 1H1qSSAT6bD5GvjY-iWx2XwcvVFprWd95It1eiW0Wz-Q → 1X5eMksVy0pQ9Er1heq5H-U47_pXx0lMAOP3zTeak4xE (300)
- Leipold, Cooper — 1aVQijEpRJ95zmGBmPOBCJ-T88wdPPgQhd0eN8_dcpHM → 1atT237tu3o5LNiFgU99-fpaMm3KbLUm04r0vsUlsuiI (300)
- Oestringer, Nick — 1wqe-oY8syLf9bYrCOuQ32ts6qP19yDs71z-jmgn9lw8 → 1Md8TeK-l2yob_Qt_OAhBocS2jy3aSTLYkiRlzN-k_AE (0)
- Ogunsola, Enny — 1Ydo9Og6F31KouNB7uo52EvEyWLdVZnwMW5uK5DbvRPg → 1ZrarkEoW7X6MGsMNh8GV9Ohdvm4ZfXUhCxSdNtEB0AU (300)
- Poch, Apollo — 17res6kOMLE2MykZincmguQvxke4swpRYt-V0yPULJwA → 1ED028ZzBT1JDYWep7dMtiVafF6YH_iFGa-K4pWVFsHY (100)
- Maurath, Nate and Orlando, Josiah submitted via the Canvas Google Drive tool; files are not in Harry's Drive. Open in SpeedGrader (assignment 281578), export, then copy/grade.
- Not submitted: Bakhsh, Cody; Offurum, Zugo; Tillett, Sophia.

G1 (deadline Tue 10/13 11:59 PM)
- Abrams, Landon — 159gXCuqbFebzsaLmnUn5PKQwqw-A0fPBmNjfklzjXzg → 1BmioYBdmW_cnwYyjX2_QjkowoFj45kMxr3sgPg8V5oM (400)
- Baras, Luke — 1Qnv1Dfz1GKUM6nmdDIySc3RZ3WJlruUWKdEPa77CyF0 → 1S9N_chP2s05HAuwDC-Fz1Jit6Yj2ZIQvnnA54vgnU7U (0; typed DBQ incoherent, compare with photos)
- Delegan, Eva — 15KB-CR_AVlVrgeBXc2-1s-LzsReYA4-ckn3AdXCB7bg → 1CgayAHuxpMCrVPIh1gecoILtga_N7DVHmiXKQt-9Ii8 (0)
- Finkelstein, Nathan — 1VtujM3aCT_62bqj2KlUYIgAQ1pJNE-IDf4nfzwaBzJY → 1affyqf-arBWq73RJVnNGrr0H33YTh1HuF63HzLB9uDI (300)
- Kovalerchik, Aaron — 16qkHiBCspw8JYaabei8IhB9jqJ9iEqN93J_ZVkDtRww → 13OKLPEjwsjx9HhDY08wmd-FG-JQcRit6bsSScuqiUoY (200; original edited after deadline)
- Lauer, Natalie — 1__knb97IG0pWm422byqvlWERpiVjovSkbnWVwp3P-3Q → 1phpzFIu-HSMoPKyI45o7jH5QMYTQ5JBMGoL7uFz232E (100; submitted via Canvas Drive tool — check Canvas snapshot matches)
- Levin, Jacob — 1vWHLST-F6-zKZefKizaThGXF1BgpXR-XAnUu7GLbS-4 → 1Ds7e-PdvlfeH4bfLJUSpHQHt2iw1IY5EbJt1ewItLr0 (100)
- Lyles, Quinn — 1f1mWcEt5oyhAgt418RzwXIqrqYifk7KpuNWcxTn3P1g → 1XpCUUgE00O0Ot5oxxdIk0Ph7me12GCnLO6NP5YTiwoM (300; Seven Sisters chart done in notebook, photos present, Harry hasn't ruled)
- Mielke, Cameron — 1fi9QyE_dvtzVD2ugB7F2HDbhJr_Tdkxt7SoXiYvh_f4 → 1_8IsLt1ppuUkDhQkaflCzYdBfRN3oDa0kNf6qVZTC6M (300)
- Perry, Sarah — 13hZEPnNks9DllNa4LePOpjI8FB3NBB_ye69lXPnUDTg → 12P-YO5pC4SxwotAzaRTCAZyN3Mn41NMY3E9VIEqTSBg (300)
- Sackey, Noah — 18yMn27IWVrleOrl71ncP-fG-WhBKtciP9PnUbo8GmZ0 → 1Hh65CaYPwKEDXZOsTSNdKOTEbWRaAZE6jVcu-kyKouE (200)
- Sherbakov, Adele — 1R24pOSLQk5nDozg3OT1MSgpvQOZ6wudx0NGClUlCMhE → 19nrVPMs74UWANE1LrY4MOk6Mf1YkkC4Uk_qyx8avJvo (300; DBQ photo page 1 missing)
- Stein, Brody — 1pPMkmjBqCsWitMh9yfRXQwj3Ny44XBsAXuKbX4jf1nc → 1DeyCEcGCell1laOYvix6An9XbdeUL-yWVc5Z6Y3uXbI (200)
- Trinh, Henry — 1hovZrEzROSY7tWl44zAbdNVgPW_xU-moZ_2cfq8SpW0 → 1iXx_pd8d78VulKGNHXTiOOHl0cqHIB2Mulu1H-9y3kU (200)
- Walker, DJ — 1Pvh8Vqixtn14YRK80vB0lXn6gXZFywYoduEGjygG1rE → 1VpYqz9l7NAXErT4rFtptBfS5YfpXiVD86nNSabdbCmk (100)
- Williams, Hailey — 10iW8J6vkTEvJSf4tkfgLu7htrM7V0BjPXFdsTVFKicY → 1Av0-oZvaGELyd1k0El0sOs0vMZc3gjvc44-6RrqJHDU (300)

### Calibration questions Harry still has to answer
1. Executive Skills: 39 of 41 drafts get No (empty reading-note tabs, no debate evidence
   table). If the bar is looser, almost every total rises by 100.
2. Mastery Reflection missing drives most Mastery "No" marks.
3. Part 2 discussion notes per student (Harry grades this himself; placeholder line in each block).
4. Shared group debate docs pasted by several students (Casper/Dike, Doyle/Garg,
   Mielke/Perry/Sherbakov, Stein/Trinh/Walker). Possible AI/pasted work: Connolly,
   Ciarpella, Leipold, Abrams. Tone issues: Bisset, Davis, Trinh.
5. Photo-only sections (Williams, Lauer, Katzen, Oestringer, Doyle, handwritten DBQs) need Harry's eye.

### Debate make-up rule (set 10/15)
Anyone absent for the debate writes one paragraph: a summary of the debate, a question
it raised, and a response to that question. Known: Goode (F2), Hecker (E1). Harry has
not yet said who else was absent (he has the attendance; we don't).

### After approval (not started)
Export each approved WORKING copy to PDF, return to the student (method TBD: Canvas
submission comment or email), enter rubric scores in Canvas (assignment 281578,
rubric 9264), and address the unsubmitted students.

## NEW REQUEST (not started): print all portfolios with a blank rubric at the end
Harry's words: "print all of the portfolios but make sure the rubric is at the end and
nothing is filled out." Interpretation: for each submitted portfolio, print the
student's **original** submission (clean, no feedback) followed by a **blank**
5-category Benchmark Rubric page (Mastery of Content, Integration of Evidence,
Analysis of Content, Clarity and Organization, Executive Skills; Full Marks 100 /
No Marks 0; total /500; lines for comments). Nothing filled in.
- Verified method: Drive MCP `download_file_content(fileId, exportMimeType="application/pdf")`
  returns JSON `{content: <base64>}`; big results are saved to a tool-results file on disk —
  `jq -r .content FILE | base64 -d > out.pdf`. Export is read-only; originals stay untouched.
- Build the rubric page with reportlab (installed) or HTML→PDF; merge with pypdf
  (`pip install pypdf`). Name files `B1 Portfolio — <Last, First> — <Sec>.pdf`;
  one merged PDF per section is easiest to print. Many docs are 10–60 MB (photos).
- Physical printing needs the computer session. Confirm with Harry: originals vs working
  copies, which sections, double-sided, and whether to include the 3 unsubmitted E1
  students' shared docs.

## Other open items
- Attendance: Harry asked twice; needs Dash (school system) — only from the computer session.
- Student photos: Harry wants to see each student's photo while grading; Dash has them.
  7 E1 students have Canvas avatars (`report_avatars.py`); do not use Facebook.
- Reese Applegate emailed 10/9 and 10/12 asking for the Part 2 discussion transcript. Unanswered.
- Quinn Lyles emailed 10/11 about the notebook Seven Sisters chart. Unanswered.
- Halayna Owens asked to retake DBQ photos (Harry said yes); she has not submitted.
- Gmail draft to Gus and Jourdan ("B2 Persia economy documents") with links to two
  Google Docs (`1NWaiD1OMBk6LovYTOrICcER7_B5sEj4C4nHnqYLT-yY`, `1-9c0sPREo0ZnLY6eOt8ZUvUPhZocydzZE-9mrPaGQt8`)
  is saved, NOT sent; the two docs are not yet shared with them.
- Announcement 49322 still shows old E1/F2 portfolio dates.

## Benchmark 2 — what is live
- Module "[World History I] Benchmark 2: Empires" published: Anchor (Kaplan, text fixed
  10/12), Docs A–H, Part 1 and Part 2 discussions, Further Research page, two unpublished
  in-class activities (Peter Green "Darius's Treasury at Susa"; "Ionian Tribute Bearers at
  Persepolis", image file 1302783 — check for watermark before publishing).
- READ assignments (ungraded): Kaplan due Thu 10/15 start of class all sections;
  Doc A due Thu 10/15 start of class all sections.
- JOURNAL assignments (one per document, complete/incomplete, no Canvas submission —
  answers go in the student's journal, 3–6 sentences per question, questions are the
  page's own two): Anchor, A, B, C, D published and due at the start of the next class
  (E1 Fri 10/16 2:05 PM; F2 Tue 10/20 8:30 AM; G1 Tue 10/20 10:25 AM). E–H created
  unpublished, no dates, until Part 2 is scheduled.
- Part 1 discussion (295779) due at those same times. Calendar: section-specific
  "WHI B2 · Lesson 2: Part 1 Discussion" events created; "Lesson 1" events note it.
- Not yet scheduled: Part 2 (Docs E–H), B2 portfolio, B2 activities.
- Update 11/9: BENCHMARK 2 PORTFOLIO = assignment 298836 (unpublished, 500 pts, Benchmark
  Rubric 9264, online URL). Contents: Notes, Second Ship notes, handwritten essay (photos),
  Revision. Due end of class as B3 begins: F2 Tue 11/10 3:15 PM; E1 Mon 11/16 9:45 AM;
  G1 not set.

## Benchmark 2 grading notes (from Mr. Canellakis)
- F2 had a very good portfolio work day on Mon 11/9. F2 should get higher Executive
  Skills scores on the B2 portfolio. The rubric is Full (100) or No (0) per category, so
  this means leaning toward Full Marks for Executive Skills in F2.

## Benchmark 1 wrap-up facts
- Portfolio due dates were: E1 Tue 10/13 12:05 PM; F2 Tue 10/13 11:59 PM; G1 Tue 10/13 11:59 PM.
- Portfolio checklist (five sections) is on the Canvas page "Portfolio Submission Document — Template (B1)".
- Unpublished items are excluded from the portfolio; reading quizzes are not required.

## Benchmark 3 — live as of Tue 11/10
- Module "[World History I] Benchmark 3: Ideology" published with full reading excerpts
  (Machiavelli; A Polybius; B Cicero De Officiis; C Livy; D Cicero vs Catiline; E Suetonius;
  F Priene inscription; G Res Gestae; H Aeneid). Script: world-history-canvas scripts/b3_setup.py.
- Ten classes per section: c1 begins; c2 Anchor due; c3 A,B due; c4 C,D + Part 1 discussion;
  c5 E,F; c6 G,H + Part 2 discussion; c7 DBQ prep; c8 in-class DBQ; c9 portfolio work day;
  c10 Benchmark 4 begins, BENCHMARK 3 PORTFOLIO (298899) due end of class.
- Portfolio due: F2 Thu 12/10 2:05 PM; G1 Thu 12/10 3:15 PM; E1 Wed 12/16 3:15 PM.
- Two old unpublished, ungraded duplicate assignments (295783, 295785) share the B3
  discussion names; students cannot see them. Left in place.

## Benchmark 3 rebuilt 11/11 from Ashleigh Tinkle's team draft
- Part 1 Qin China: A Unification of China (PoI 4.4), B Sima Qian, C Li Si, D Jia Yi, plus
  Textbook: Han Emperors in China (PoI 7.3). Part 1 discussion = debate, Shi Huangdi leader or tyrant.
- Part 2 Roman Empire: Textbook: The Romans Create a Republic (PoI 6.1), E The Roman Empire
  (PoI 6.2), F Augustus of Primaporta video, G Roman Empire Source Experts, H Hierarchy reading.
- Same 10-class schedule and due dates; Anchor (Machiavelli) unchanged.
- Old Roman readings (Polybius ... Aeneid) and their journals unpublished, not deleted.
- Team links need McDonogh sign-in; Canvas copies of PoI 4.4/6.1/6.2/7.3 are in course files
  folder "benchmark 3 textbook" (ids 1325931-1325934). Journal questions for A-H were written
  without opening the team files (not accessible from this session); check Doc G especially.
