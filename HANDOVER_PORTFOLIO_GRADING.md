# Handover: Benchmark Portfolio Grading (World History I, McDonogh, Canvas)

Written 2026-11-16 for a Claude session building portfolio grading into a separate
World History teaching-assistant agent (a Netlify function that calls the Claude API with its own tools).
It describes what the cloud Claude Code session actually did for Benchmark 1. It contains no
secrets, no student names, no student work and no grades. Examples are made up.

> **Read this first: three things don't match the request.**
> 1. **There is no 0-to-100 scale.** Each of the five rubric categories is all-or-nothing:
>    **Full Marks = 100, No Marks = 0**, so the total is 0, 100, 200, 300, 400 or 500. This is
>    in the Canvas rubric itself and in the student-facing grading text. Don't build a
>    partial-credit scale unless Harry changes the rubric.
> 2. **This session never wrote grades, rubric assessments or comments to Canvas.** It drafted
>    feedback in Google Drive copies and stopped at Harry's approval. Harry says the Benchmark 1
>    grades were later written to Canvas, but not by any script in this project, so the write
>    endpoints in Section 2 are standard Canvas API calls that were **not** run here.
> 3. **The exact grading instructions given to the grading subagents are lost.** They were in
>    temporary files (`apply_spec.md`, `grade_spec_fg.md`) that were cleared, and the conversation
>    they came from was summarized. Section 4 gives the rubric text **word for word** from the repo,
>    plus a **reconstruction** of the procedure, clearly labeled. There were no anchor papers.

---

## 1. "Grade the portfolios": the process from start to finish

This is what happened for Benchmark 1 (Oct 2026). Steps 1–7 were done. Steps 8–10 were the agreed
plan after approval and were not done by this session.

1. **Confirm scope.** Grade one section at a time: the section whose portfolio is due (Harry:
   "We are only doing the section that was due"). Benchmark 1 went E1 first, then F2 and G1.
2. **Find the assignment.** In Canvas course 8557, the portfolio is the assignment named
   `BENCHMARK n PORTFOLIO` (exact match, case-insensitive). Look it up by name with
   `search_term=PORTFOLIO`, don't hard-code it. Known IDs are in Section 2.
3. **List the section's submissions** (Section 2, "List submissions"). Leave out the
   "Test Student". For each student record whether they submitted, when, `late`, `missing`, the
   submission type and the URL or attachment names. Read-only scripts:
   `report_portfolio_e1.py`, `report_portfolios_section.py`.
4. **Get each portfolio's content.** Portfolios are links to Google Docs (submission type
   `online_url`). For each one:
   - Find the student's Google Doc in Harry's Drive. These are shared with his McDonogh account.
   - **Make a WORKING copy** (Drive `copy_file`) named `<original title> (WORKING)` and put it in
     that section's working folder. **Never edit, comment on or highlight the original.** This
     applies to docs the portfolio links to as well.
5. **Read and grade the WORKING copy** against the five categories (Section 4). Note what is
   present, what is missing, and evidence for each Full or No decision.
6. **Write draft feedback into the WORKING copy only** (format in Section 4):
   - A feedback block at the top, headed "Benchmark 1 Portfolio Feedback (DRAFT: pending
     Mr. Canellakis's approval)", with the five Full/No marks, a suggested total, a placeholder
     line for the Part 2 discussion (Harry grades that himself), a list of what's missing, and
     other notes.
   - Highlighted passages in the body, each followed by a short inline note in bold dark red:
     `[Mr. C — Strength: …]`, `[Mr. C — Fix: …]` or `[Mr. C — Missing: …]`.
   - Copies that are finished move to the section's Graded folder.
7. **Build a review doc for Harry**, one per section (Section 5). It lists each student's draft
   marks and total, links to the working copy, and **teacher-only flags**. Flags go here only,
   never in a student's doc. Then **stop and wait for approval.**
8. *(Planned, not done here)* After Harry approves or changes each student's marks, export
   the approved WORKING copy as a PDF (Drive export). That PDF is what the student gets back.
   How to return it was never settled: a Canvas submission comment or email.
9. *(Planned, not done here)* Enter the rubric assessment in Canvas (assignment plus rubric
   9264), which sets the score out of 500.
10. *(Planned, not done here)* Deal with students who didn't submit, late work and make-up rules
   (Section 3), as Harry decides.

---

## 2. Canvas access

**Base URL:** `https://mcdonogh.instructure.com`. All API paths below start with `/api/v1`.

**Credentials (no values here):**
- In this project, the token and base URL are **GitHub Actions secrets** on the repo
  `canellakish-design/world-history-canvas`, named **`CANVAS_ACCESS_TOKEN`** and
  **`CANVAS_BASE_URL`**. Scripts get them as environment variables of the same names, plus
  `CANVAS_COURSE_ID` (a workflow input). The token is Harry's teacher token, sent as
  `Authorization: Bearer <token>`.
- The new agent needs its own copy stored as a **Netlify environment variable**, never in code or
  prompts. Ask Harry where he wants it kept.
- Google Drive access used the Google Drive / Docs connector on Harry's personal Google account.
  McDonogh-restricted files can't be opened from that account (Section 8).

**Course and sections:**
| Thing | ID |
|---|---|
| Course (CP World History I, 2026–27) | 8557 |
| Section E1 | 20549 |
| Section F2 | 20550 |
| Section G1 | 20551 |
| Course 8316 (CORE) | **never touch** |

**Assignments and rubric:**
| Item | ID | Notes |
|---|---|---|
| BENCHMARK 1 PORTFOLIO | 281578 | 500 pts, Benchmark Rubric attached |
| BENCHMARK 2 PORTFOLIO | 298836 | 500 pts, online URL, same rubric |
| BENCHMARK 3 PORTFOLIO | 298899 | 500 pts, online URL, same rubric |
| Benchmark Rubric (course 8557) | 9264 | 5 criteria × 100, ratings Full Marks 100 / No Marks 0 |
| Source of the rubric | course 7487, rubric 8231 | `content/benchmark-rubric.json` is the copy |

**Endpoints this project actually called** (all with a teacher token; paginate with
`per_page=100&page=n` until a page comes back with fewer than 100):

| Purpose | Method and path | Parameters | Permission needed |
|---|---|---|---|
| Find portfolio assignments | `GET /courses/{course}/assignments` | `search_term=PORTFOLIO`, `per_page` | teacher: view assignments |
| Read one assignment (rubric, settings, dates) | `GET /courses/{course}/assignments/{id}` | `include[]=overrides`, `include[]=all_dates` | teacher: view assignments |
| **List submissions for one section** | `GET /sections/{section}/assignments/{id}/submissions` | `include[]=user`, `include[]=rubric_assessment`, `per_page=100` | teacher: View all grades |
| List submissions, whole course | `GET /courses/{course}/assignments/{id}/submissions` | `include[]=user` | View all grades |
| Read rubrics and where they're used | `GET /courses/{course}/rubrics` | `include[]=assignment_associations` | Manage rubrics (read) |
| Attach a rubric for grading | `POST /courses/{course}/rubric_associations` | `rubric_association[rubric_id]`, `[association_id]`, `[association_type]=Assignment`, `[use_for_grading]=true`, `[purpose]=grading` | Manage rubrics |
| Create the rubric (done once) | `POST /courses/{course}/rubrics` | see `scripts/attach_portfolio_rubric.py` | Manage rubrics |
| Read a Canvas file (attachment) | `GET /files/{id}`, then GET its `url` field | the url is a signed download link | course file access |

The fields of each submission object that this project used: `user.sortable_name`,
`workflow_state`, `submitted_at`, `late`, `missing`, `submission_type`, `url` (the link a student
submitted), `attachments[].display_name` / `.url`, `body` (text entry), `score`,
`rubric_assessment`.

**Write endpoints (standard Canvas API, NOT used by this project; check before relying on them):**
| Purpose | Method and path | Parameters | Permission |
|---|---|---|---|
| Grade + rubric assessment + comment in one call | `PUT /courses/{course}/assignments/{id}/submissions/{user_id}` | `rubric_assessment[<criterion_id>][points]=100\|0`, optional `rubric_assessment[<criterion_id>][comments]`, `comment[text_comment]=...`; or `submission[posted_grade]=400` without a rubric | Edit grades |
| Get the criterion IDs | from `GET .../assignments/{id}`: the `rubric[]` array (`id`, `description`, `points`) | | view assignments |
| Attach a PDF to a comment | `POST /courses/{course}/assignments/{id}/submissions/{user_id}/comments/files` (upload flow), then the PUT above with `comment[file_ids][]` | | Edit grades |
| Hide grades until released | assignment set to manual posting; release with Canvas "Post grades" | | Edit grades |

A rubric assessment sets the score from the rubric points, so don't also send a `posted_grade`
that disagrees. Send each criterion as 100 or 0, never anything in between.

---

## 3. Reading a submission

**What a portfolio is.** One Google Doc per student, submitted as a link (`online_url`), shared so
Mr. Canellakis can open it. What goes in it depends on the benchmark and is listed in the
assignment description:
- **Benchmark 1:** five sections, set by the Canvas page "Portfolio Submission Document — Template
  (B1)". These included reading notes (tabs in the doc), a debate evidence table, a Mastery
  Reflection, the DBQ essay and a revision. Unpublished Canvas items are not required, and neither
  are reading quizzes.
- **Benchmark 2:** (1) Notes: journal entries for the Anchor Document and Documents A–H;
  (2) Second Ship notes: chart plus exit ticket; (3) Handwritten essay: photos or scans of every page
  of the in-class DBQ; (4) Revision: the revised essay. All in one Google Doc, in that order, each
  part with a heading.
- **Benchmark 3:** (1) Notes: journal entries for the Anchor Document and Documents A–H;
  (2) Handwritten essay photos; (3) Revision.

**How each kind of content was fetched:**
| Kind | How |
|---|---|
| Google Doc link | Drive connector: find the file, `copy_file` to a WORKING copy, then read the copy (`read_file_content`). Edit only the copy (Docs `update_doc`). |
| Docs linked inside the portfolio | Treat as originals too. Read them, never edit. Copy them if you need to mark them up. |
| Photos of handwritten pages | Inside the Google Doc as images. The model can't reliably read handwriting from text export, so these were **flagged for Harry**, not graded blind. |
| Canvas file upload | `GET /files/{id}` → download `url`. |
| "Canvas Google Drive tool" submissions | The file is not in Harry's Drive. The only way found was to open it in SpeedGrader and export it. Flag these for Harry. |
| Text entry | `body` field (none were used for portfolios). |

**Missing, late, empty:**
- **Not submitted:** listed separately for Harry. Don't grade, don't message the student.
- **Late:** take the `late` flag and `submitted_at` from Canvas and report them. Lateness counts
  against **Executive Skills** ("submitted on time"). One late Benchmark 1 portfolio was drafted
  at 0; Harry has the final say.
- **Edited after the deadline:** the Google Doc's modified time was later than the deadline.
  Flag it in the review doc and grade what's there unless Harry says otherwise.
- **Empty sections or tabs:** count as missing for the category they support. Empty reading-note
  tabs drove most Executive Skills "No" marks.
- **Same doc pasted by several students** (group debate docs), or **text that looks pasted or
  AI-written:** flag it for Harry in the review doc only. Never accuse a student in feedback.
- **Absent for the debate:** Harry's make-up rule is one paragraph with a summary of the debate,
  a question it raised, and a response to that question. If a student was absent, note in the
  feedback that this paragraph is owed. Attendance is in Dash, which the cloud session can't reach.
- **Student on two section rosters:** grade under one section and flag it.

---

## 4. How to grade

### 4a. The five categories, word for word from the Canvas rubric (`content/benchmark-rubric.json`)

Each is worth 100 points. The ratings are **Full Marks (100)** and **No Marks (0)**.

1. **Mastery of Content.** "This standard evaluates how well a student has picked up the theme of the benchmark and used the anchor doc to answer the unit questions in varying levels of mastery with the support of unit documents."
2. **Integration of Evidence.** "This standard evaluates how well a student can cite specific textual evidence to support analysis of primary and secondary sources. They then draw evidence from informational texts to support analysis, reflection, and research. And they use evidence to write arguments focused on discipline-specific content."
3. **Analysis of Content.** "This standard aims to evaluate how well a student is able to determine the central ideas or information of a primary or secondary source; provide an accurate summary of how key events or ideas develop over the course of the text. They will then analyze in detail a series of events described in a text; determine whether earlier events caused later ones or simply preceded them. They will take their analysis and assess the extent to which the reasoning and evidence in a text support the author’s claims, they can identify and interpret the date and origin of the text and how that impacts its bias and claims."
4. **Clarity and Organization.** "This standard aims to evaluate how well a student is able to produce clear and coherent writing in which the development, organization, and style are appropriate to task, purpose, and audience. How well students are able to write informative or explanatory texts, including the narration of historical events. Students should develop and strengthen writing as needed by planning, revising, editing, rewriting, or trying a new approach, focusing on addressing what is most significant for a specific purpose and audience. They follow research guidelines and Chicago Style format."
5. **Executive Skills.** "This standard aims to help students build productive study habits and evaluate how well students create a conducive classroom environment for learning. This standard applies to organization, student ability to read instructions and complete the task as asked. Time management, evaluating if work is submitted late or on time. Attention and focus on the task at hand and creating minimal distractions for others. Along with flexible thinking, a student is able to adjust their thinking or behavior based on new evidence or correction."

### 4b. The "Full Marks looks like" bar, word for word (the student-facing text on every portfolio assignment, `content/portfolio-grading.html`)

> Your portfolio is graded with the Benchmark Rubric, which has five categories. Each category is worth 100 points, for a total of 500 points. Each category gets Full Marks (100) or No Marks (0). There is no partial credit within a category. Your portfolio either shows the skill clearly or it does not yet.
>
> 1. Mastery of Content — Full Marks looks like: your journal entries and essay answer the essential question, connect back to the anchor document, and show you understand the history, not just the reading.
> 2. Integration of Evidence — Full Marks looks like: direct quotations or precise details, with the document named, in your journal answers and your essay. Every claim has evidence behind it.
> 3. Analysis of Content — Full Marks looks like: you identify a document’s main idea and explain how events connect. You decide whether one event caused another or just came before it. You ask who wrote the source, when, and why, and you explain how that shapes its point of view and its claims.
> 4. Clarity and Organization — Full Marks looks like: a clear thesis, organized paragraphs, and a real revision of your essay that improves it, not just a fixed typo or two. Sources are cited in Chicago style when the assignment calls for it.
> 5. Executive Skills — Full Marks looks like: Everything is in the portfolio, in the order the assignment asks for. You read and follow the directions. It is submitted on time. You use class work days well. You adjust your thinking when you get new evidence or feedback.
>
> Checklist: Every journal entry is there, labeled with the document name. My answers use specific evidence from the documents. I explained what the evidence shows, not just quoted it. My essay revision is a real improvement. My Google Doc is organized, shared, and submitted on time.

This text was written 11/12, after Benchmark 1 was graded. It is the clearest statement of the bar
Harry has approved.

**Turning the descriptions into a score:** for each category, decide whether the portfolio
*clearly* meets the "Full Marks looks like" bar. Yes = 100. Not yet = 0. Nothing in between.
Total = sum (0–500).

**Known inconsistency:** the "What is a Benchmark?" page (Benchmark Document A) names only
four categories and leaves out Clarity and Organization. The Canvas rubric has five. Use five
unless Harry says otherwise; he hasn't settled it.

### 4c. Grading procedure (reconstructed, not the original wording)

- Grade the first student in the section completely, show Harry, and once he accepts it use that
  as the model: "Grade the copies the same way you've graded [the first student]'s." That was
  the only calibration. **There are no anchor papers.**
- Use the portfolio checklist for that benchmark (Section 3) to decide what's present.
- Mastery of Content: usually decided by the Mastery Reflection (B1) or by whether the essay and
  journals answer the essential question using the anchor document. A missing reflection was
  the most common reason for No.
- Integration of Evidence: named documents and specific quotes or details in the journals and essay.
- Analysis of Content: explains, not just summarizes. Covers cause vs. sequence, and who wrote
  the source, when and why.
- Clarity and Organization: thesis, paragraphs, and a revision that really improves the essay.
- Executive Skills: everything present and in order, directions followed, on time.
- The Part 2 discussion is **not** graded by the agent. Harry grades it himself, student by student.
  Leave the line "Part 2 discussion: to be added" in the feedback block.

**Harry's corrections and decisions:**
- Never edit an original. Grade only copies ("Do not grade the original copies. Make copies and
  create a folder.").
- Every piece of feedback is approved by him before a student sees it.
- Feedback is highlights plus written comments on the working document ("Highlighting areas and
  giving feedback").
- What the student gets back is a PDF of the approved working copy.
- Debate make-up paragraph rule (above).
- Benchmark 2: F2 had a very good work day on 11/9, so lean toward Full Marks for F2's Executive
  Skills.
- **Open, not decided:** in Benchmark 1, almost every draft got No on Executive Skills (empty
  note tabs, missing debate evidence table). Harry was asked whether that bar is too strict and
  hasn't answered. Ask him before the agent repeats it.

### 4d. Feedback format and tone

On the WORKING copy (so it survives PDF export, written as document text, not Google comments):

```
Benchmark 2 Portfolio Feedback (DRAFT: pending Mr. Canellakis's approval)      <- Heading 2, dark red
Mastery of Content: Full Marks (100)
Integration of Evidence: Full Marks (100)
Analysis of Content: No Marks (0)
Clarity and Organization: Full Marks (100)
Executive Skills: No Marks (0)
Suggested total: 300 / 500
Part 2 discussion: to be added
Missing: Document F journal entry; photo of essay page 2.
Other notes: Your revision adds a clear thesis. Next time, explain who wrote each source and why.
```
Then in the body, highlight a passage and follow it with an inline note in bold dark red (RGB 0.6, 0, 0):
- green highlight: `[Mr. C — Strength: You name Document B and quote it directly.]`
- yellow highlight: `[Mr. C — Fix: This summarizes the source; say why the author wrote it.]`
- red highlight: `[Mr. C — Missing: No journal entry for Document D.]`

Tone: plain, specific and matter-of-fact. Talk to the student ("you"), point to the exact place,
and say what to do. Keep each note to one or two sentences. Put 3–8 notes in the body and keep
the block at the top short. No emoji. No sarcasm. Don't guess at motives, and never mention
AI or copying in student-facing text.

---

## 5. What Harry reviews, and how

Nothing is written to Canvas, shared, emailed or returned until Harry approves it.

- **One review doc per section** in Google Drive, plus the **WORKING copies** (in the Graded folder
  once feedback is applied). For each student the review doc shows the name, draft Full/No per
  category, suggested total, a link to the working copy, what's missing, and **teacher-only
  flags**: late, edited after the deadline, shared or pasted group docs, possible pasted or AI
  text, tone problems in the writing, photo-only sections that need his eye, roster problems,
  make-up owed.
- Harry works mostly from his phone, so keep summaries short in chat and point him to the doc.
- He approves or changes each student's marks. Only then: export PDFs, enter rubric scores in
  Canvas, return feedback. Each of those needs its own explicit OK.

---

## 6. Rules and limits

- **Never edit a student's original document**, including docs linked inside the portfolio.
  Work only on "(WORKING)" copies.
- **Nothing reaches students without Harry's explicit approval:** no grades, comments, PDFs,
  sharing, emails or Canvas Inbox messages. Drafts stay drafts. If he says "Do not send", don't.
- **Do not grade unless Harry asks, and don't change anything in Canvas unless asked**
  (his instruction 11/16: "Do not grade anything", "Don't change anything in Canvas").
- Never touch course 8316 (CORE). Don't delete rubrics in past courses. Note:
  `attach_portfolio_rubric.py` deletes **every other rubric in the course it runs on**. Don't
  run it again without changing that.
- Student data stays private: no names or work in logs that leave the project, in prompts to
  outside services, or in commit messages. Teacher-only flags never go in student documents.
- No Facebook or social media for student photos. Photos and attendance come only from Dash
  (the school system), through Harry's computer.
- Student-facing wording: plain, no emoji, say "at the start of class" (never "the bell").

---

## 7. Tools, scripts and files

**Repo `canellakish-design/world-history-canvas` (branch `main`):**
| File | What it does |
|---|---|
| `CLAUDE.md` | Course conventions: five-category Benchmark Rubric, 100 each, 500 total; section-specific calendar events. |
| `content/benchmark-rubric.json` | The rubric text (Section 4a). |
| `content/portfolio-grading.html` | Student-facing "How Your Benchmark Portfolio Is Graded" block (Section 4b), added to every portfolio assignment. |
| `scripts/attach_portfolio_rubric.py` | Creates the rubric and attaches it for grading. **Deletes all other rubrics in the course.** |
| `scripts/add_portfolio_grading.py` | Appends or replaces the grading block on every `BENCHMARK n PORTFOLIO`. Broken: it finds the block by HTML comment markers, which Canvas strips, so rerunning it duplicates the block. |
| `scripts/create_b2_portfolio.py`, `scripts/b3_setup.py` | Create the portfolio assignments with settings and rubric copied from the one before. |
| `scripts/report_portfolio_e1.py` | Read-only: one section's submissions for 281578, with rubric assessment. Env `PORTFOLIO_SECTION`. |
| `scripts/report_portfolios_section.py` | Read-only: all portfolio assignments for one section: who's in, who's out, late, link. |
| `scripts/report_portfolio_text.py`, `report_all_rubrics.py`, `report_b2_portfolio_access.py` | Read-only checks of descriptions, rubrics and visibility. |
| `.github/workflows/run-script.yml` | Runs any script with the Canvas secrets. **It also runs `make_events_section_specific.py` afterwards, which can change calendar events**, so even "read-only" runs aren't completely read-only. |

**Claude tools used:** Google Drive connector (search, `copy_file`, `read_file_content`,
`download_file_content` for PDF export, `create_file` for review docs), Google Docs connector
(`update_doc` to write the feedback block, highlights and notes into WORKING copies),
GitHub MCP (trigger workflows, read logs), and subagents for batches of students.

**No skill files exist for grading.** The subagent instruction files (`apply_spec.md`,
`grade_spec_fg.md`) and the review-doc builder (`build_review.py`) were temporary and are lost.
Sections 4c and 4d replace them.

---

## 8. Known problems and edge cases

- **McDonogh-restricted files:** docs owned by Harry's school account or by students can be
  readable only when signed in to McDonogh. The connected Google account sometimes gets "not
  found". The agent needs access as the McDonogh account or the files shared to it.
- **Canvas Drive-tool submissions** aren't in Harry's Drive (SpeedGrader export only).
- **Handwritten essays as photos:** missing pages, sideways or blurry images. Flag them; don't guess.
- **Large docs** (10–60 MB with photos): PDF export is big. The connector returns base64 that
  has to be saved to a file, not held in context.
- **Shared group docs** pasted by several students, and possible AI or pasted text: flag only.
- **Student on two section rosters:** grade once and flag it.
- **Docs edited after the deadline:** check the Drive modified time against `submitted_at` and the due date.
- **Executive Skills strictness** is unresolved (Section 4c).
- **Four vs five categories** on the "What is a Benchmark?" page (Section 4b).
- **Canvas strips HTML comments** in descriptions, so don't use comment markers to find
  content again.
- **Comment markers vs. PDF:** Google Docs comments don't show in a PDF export, which is why
  notes are written as text in the document.
- **The duplicate rubric section** on the Benchmark 1 portfolio description is still there.
- The cloud Claude Code session couldn't use Chrome, Dash, printing or Harry's computer.
