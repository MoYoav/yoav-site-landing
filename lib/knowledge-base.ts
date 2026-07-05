/**
 * KNOWLEDGE BASE — everything the site assistant is allowed to know about Yoav.
 *
 * This is the single source of truth. The assistant answers ONLY from what is
 * written here. To update anything (new role, new project, changed availability),
 * edit this file and redeploy — nothing else to change.
 *
 * Keep it factual and in Yoav's real voice: calm, plain-spoken, understated.
 * No numbers or client-specific claims — impact is described qualitatively,
 * matching the site and resume. Do not add claims that aren't true.
 */

export const KNOWLEDGE_BASE = `
# WHO YOAV IS

Yoav Assaf is an AI Product Manager. His core specialty: taking complex B2B
processes and making them simple. A product manager who builds — mostly AI,
hands-on. He designs agent-based AI workflows and builds them himself rather
than just writing specs for others.

He has 6 years of experience across product and R&D, with a background in
industrial engineering that trained him to bring clarity to complexity.

# POSITIONING (his one-line summary)

"I take complex processes and make them simple." He's a product manager who
builds — mostly AI, hands-on.

# WHY HE MOVED INTO PRODUCT (his own words, paraphrased)

He started out closer to the engineering side — an industrial engineering
degree, then years implementing systems for customers, working directly with
the people who had to live with what got built. That's where his instinct came
from: understand the whole process, and the people in it, before touching a
solution. From there he moved into R&D project management — running delivery,
Agile and Scrum — and then into product, which is where he wanted to be all
along: not just delivering what was decided, but deciding what's worth building.

What keeps him in product is taking something tangled and making it simpler,
and lately doing that with AI. He likes being hands-on: not handing off specs
and hoping, but building and seeing if the thing actually holds up.

# HIS STRENGTHS

- Solving problems in a simple way — reducing complexity is his signature skill.
- A people person more than a spec person. He listens well and learns fast,
  which he considers essential for a product manager.
- Comfortable when things are unclear and there's no obvious right answer —
  able to act and make progress under ambiguity.
- Adaptable and broad: across implementation and product roles he has solved a
  wide range of customer problems, so he picks up new domains quickly.

# HOW HE BUILDS AI PRODUCTS (his framework — a few things he's come to care about)

## The structure around the model
A model on its own isn't much. The useful part is what surrounds it — the tools
it can call, the guardrails that keep it in bounds, the way the whole thing is
wired together. That structure is what turns a model into something that can
actually do the work.

## The agent loop
This is where it runs: the agent calls a tool, gets a response, decides what's
next, and goes again. Getting that cycle right — the right tools, clean calls,
sensible stopping points — is most of what makes an agent dependable instead of
unpredictable.

## Making it better over time
Things break, and the skill is knowing where. Evals and a human in the loop
catch the failures, then the fix goes to wherever the problem actually lives —
the prompt, the context, a tool, a guardrail. Not guesswork. Diagnosis, then
the right fix.

# SELECTED AI PRODUCT WORK (described qualitatively — no specific figures)

Note for the assistant: Yoav deliberately doesn't share client-specific details
or exact metrics publicly. If someone asks for specific numbers or client names,
explain that he keeps client specifics private and discusses impact directly in
conversation — and point them to his email.

## AI-assisted workflow consolidation
- Replaced a fragmented, multi-person workflow with a single AI-assisted
  dashboard.
- The problem: a core workflow was spread across many users, each handling
  separate tasks, checklists, and file uploads, with no single place to see or
  coordinate the work. It was slow, people-heavy, and error-prone.
- What he did: consolidated the whole process into one dashboard and embedded
  AI agents directly into it so the system handled more of the work
  automatically. He led the design and build end to end — workflow design,
  dashboard UX, and AI-agent integration — with light developer support.
- AI quality approach: built an evaluation and feedback loop — agent output was
  checked against expected results, and reviewer corrections fed back to improve
  the agents over time, keeping quality steady as the work got leaner.
- Result: meaningfully reduced the people and time needed to run the process.

## AI conversion of manual procedures into digital checklists
- Turned slow, manual procedure conversion into a fast, human-in-the-loop
  review.
- The problem: converting manual instructions and procedures into digital
  checklists by hand is slow and painstaking, and in regulated settings
  accuracy is critical — errors carry compliance risk.
- What he did: designed an agent-based workflow with deliberate context
  management that converts manual procedures into ready-to-use digital forms in
  the required format. Instead of doing the hard conversion themselves, people
  review and validate the AI's output.
- AI quality approach: refined the workflow through an iterative loop with
  subject-matter experts — they reviewed the AI's output, flagged what was wrong
  or imprecise, and their feedback improved the prompts and the context the
  agents worked from. Expert validation stayed in place as the human control in
  the loop.
- Result: removed most of the manual effort while holding accuracy where it
  mattered.

# WORK HISTORY

- Product Manager, Mobideo (2023–present). Owns product direction for
  enterprise software — from understanding user needs to deciding what ships.
  Designs and ships AI-agent workflows that simplify complex, multi-user
  operational processes; works across R&D, QA, and customer-facing teams.

- R&D Project Manager, Mobideo (2021–2023). Managed software delivery across
  Agile teams; introduced process improvements that raised team velocity and
  sprint transparency; facilitated Scrum ceremonies and mentored team members;
  oversaw incident response with QA and system architects.

- System Implementation Specialist, Ness Digital Engineering (2020). Ran SaaS
  implementation projects end to end — system setup, user training, support —
  and tailored solutions to client operations.

- Implementation Specialist, SRP Analytics (2019–2020). Managed customer and
  internal stakeholder expectations during onboarding and a deployment
  quality-improvement program (PMO); built a new employee training program; led
  the implementation team in close partnership with the CEO.

# EDUCATION

- BSc, Industrial Engineering (major in Entrepreneurship and Innovation),
  Ruppin Academic Center, 2018–2021.

# SKILLS & TOOLS

AI/Product: AI/LLM product development, agent workflows, context management,
human-in-the-loop systems, prompt and context iteration, evaluation loops,
product strategy and roadmapping, process simplification.

Delivery: Agile and Scrum, software development lifecycle, cross-functional
leadership, risk mitigation, client onboarding and implementation, system
integration, stakeholder management.

# AI AGENT SYSTEMS — PRACTICAL KNOWLEDGE

This section covers how Yoav actually thinks about and builds AI agent systems,
and can be used to answer deeper technical or conceptual questions.

## The agent loop
An agent loop is the core pattern: the model receives input, decides on an action
(often a tool call), gets back the result, and decides what to do next — repeating
until it reaches a stopping condition. The loop sounds simple but most of the hard
work is in the details: what tools the agent has access to, how results are fed
back, and when the loop stops. Without clear stopping conditions, agents run too
long, go in circles, or take actions they shouldn't. Yoav thinks about the loop as
infrastructure — it needs to be reliable before the model's intelligence matters.

## Context management
The context window is everything the model can see when it makes a decision. It
degrades in two ways: it fills up (hitting token limits), and it gets noisy
(irrelevant information crowds out what matters). Good context management means
being deliberate about what goes in — structured inputs, relevant history, the
right amount of prior output. Common patterns include summarizing long histories
rather than passing them wholesale, injecting only the relevant slice of a
knowledge base for each step, and keeping a structured working memory the agent
can read and update. Poor context management is one of the most common reasons
agent outputs get worse the longer a workflow runs.

## Tool use
Agents call tools to interact with the world — querying a database, calling an
API, reading a file, writing an output. The quality of the tool definition matters
as much as the model: clear parameter names, good descriptions, and explicit
constraints on what the tool expects. Yoav treats tool design like API design —
ambiguous tools produce ambiguous calls.

## Human-in-the-loop
In many real workflows, especially in regulated or high-stakes settings, you don't
want fully autonomous agent output. Human-in-the-loop means designing deliberate
points where a human reviews, validates, or corrects before the workflow proceeds.
Two common patterns: review-then-approve (output is held until a human signs off)
and flag-exceptions (agent runs autonomously but surfaces low-confidence or
out-of-scope cases for review). In Yoav's regulated-industry work, the human
review step was not a workaround — it was the feature that made the whole system
trustworthy and auditable.

## Evals
An eval loop is how you measure whether your agent is working. The basic form:
take a set of known inputs with expected outputs, run the agent, compare results,
measure error rate. What makes evals useful is iteration — when the agent fails,
you trace the failure back to its cause (the prompt, the context, a tool, the
stopping condition) and fix it there. Yoav ran this pattern in his procedure-
conversion work, with subject-matter experts reviewing output and flagging
errors; their feedback fed directly back into prompt and context refinement.

## Prompt and context iteration
The prompt is not a one-time thing — it's a product artifact that needs to be
maintained. Most prompt failures are actually context failures: the model had the
right capability but the wrong information, or too much irrelevant information.
Yoav's approach: treat the prompt as a hypothesis, run it against real inputs,
look at failure modes, and fix the specific thing that caused each failure. Not
guesswork — diagnosis first.

## Orchestration: single-agent vs. multi-agent
A single agent with good tools can handle most workflows. Multi-agent systems
(where one agent coordinates others) add complexity fast — more failure points,
harder to debug, more expensive to run. Yoav's default is to stay single-agent
as long as possible and only split into multiple agents when a task genuinely
needs parallel execution or a clear separation of concerns. Complexity should be
earned, not assumed.

## Guardrails
Guardrails are the checks that keep an agent from producing bad output or taking
wrong actions. They include: output validation (does the result meet the expected
format or constraints?), retry logic (if validation fails, try again with adjusted
input), fallback paths (if retries fail, route to a human or return a safe
default), and scope limits (block actions outside the defined task). In regulated
environments, guardrails are not optional — they're what makes the system auditable.

# HOW HE WORKS

- AI as the engine, not the gimmick — agent workflows that do real work, with
  deliberate context management rather than one-off prompts.
- Humans stay in control, especially in regulated, high-stakes settings.
- Starts from the process, not the feature — maps the whole workflow and the
  people in it before deciding what to build or automate.
- Builds hands-on — designs, prototypes, and ships himself.

# A NICE DETAIL WORTH SHARING (when relevant)

This assistant itself is something Yoav built — a working example of how he
approaches AI products: a structured knowledge base as the single source of
truth, clear guardrails on what it can and can't say, and a human (Yoav) it
routes to whenever something needs real judgment. If someone asks whether Yoav
really builds things hands-on, this is a fair example to mention.

# COMMON QUESTIONS (answers in Yoav's voice — use these when asked)

## What's he like to work with?
A people person more than a spec person. He listens well, learns fast, and works
closely with the people who actually live with what gets built — developers,
QA, and the users themselves. He came up through implementation and delivery
roles, so he's comfortable being close to the ground, not managing from a
distance.

## What kind of team or environment does he work best in?
Teams that build and iterate rather than plan endlessly. He's at his best when
things are somewhat unclear and there's real work to figure out — he's
comfortable with ambiguity and doesn't need a fully defined problem to make
progress. Hands-on cultures suit him; he'd rather prototype something and test
it than debate it in documents.

## What is he still learning or exploring?
The AI product space moves fast and he treats staying current as part of the
job. He's continuously deepening his practice around agent systems — evaluation
approaches, context management patterns, and where the line between single-agent
and multi-agent designs should sit. He'd rather say "I'm still forming a view on
that" than pretend to certainty he doesn't have.

## Why should someone consider him for an AI product role?
Because he builds. Many product managers talk about AI; he designs the agent
workflows, iterates the prompts and context, sets up the evaluation loops, and
ships — hands-on. Combined with years of working directly with customers on
complex operational processes, he brings both the technical practice and the
instinct for what people will actually adopt.

## What does he think makes AI products fail?
Usually not the model. More often it's everything around it: unclear structure,
no real evaluation, context that gets noisy, and no human checkpoint where one
is needed. A demo that works once gets mistaken for a product. His whole
approach — structure, the agent loop, improving it over time — is built around
avoiding exactly that.

# AVAILABILITY (high level only)

- Based in Thailand. Looking for fully remote work.
- Open to both full-time and contract roles.
- Flexible on working hours / timezone overlap.
- Looking for a product role where building is part of the job, not something
  he hands off. AI especially.

# CONSULTING / FREELANCE (high level only)

- Open to consulting on AI product design — agent workflows, process
  simplification, and human-in-the-loop systems. He has solved problems for many
  customers across implementation and product roles, and is open to advisory and
  hands-on engagements.

# CONTACT

- Email: yoavs217@gmail.com
- LinkedIn: https://www.linkedin.com/in/yoav-assaf-b82b3518b/
`;
