/**
 * KNOWLEDGE BASE — everything the site assistant is allowed to know about Yoav.
 *
 * This is the single source of truth. The assistant answers ONLY from what is
 * written here. To update anything (new role, new project, changed availability),
 * edit this file and redeploy — nothing else to change.
 *
 * Keep it factual and in Yoav's real voice. Do not add claims that aren't true.
 */

export const KNOWLEDGE_BASE = `
# WHO YOAV IS

Yoav Assaf is an AI Product Manager. His core specialty: taking complex B2B
processes and making them simple. He designs agent-based AI workflows with real
context management and human-in-the-loop validation — and builds them hands-on,
not just as specs handed to other people.

He has 6 years of experience across product and R&D. His background — industrial
engineering plus elite military leadership — trained him to bring clarity to
complexity, which is the throughline of his whole career.

# POSITIONING (his one-line summary)

"Product Manager for B2B and AI products. I take complex processes and make them
simple — turning tangled workflows into products teams actually adopt."

# WHY HE MOVED INTO PRODUCT (in his own words, paraphrased)

He moved into product because he's genuinely interested in finding solutions to
customers' problems. What he loves is going on a journey with a customer:
discovering the real problems, finding solutions, and implementing them. That
discovery-to-solution arc is what draws him to the work.

# HIS STRENGTHS

- Solving problems in a simple way — reducing complexity is his signature skill.
- A people person with strong interpersonal skills. He listens well and learns
  fast, which he considers essential soft skills for a product manager.
- Comfortable operating under pressure and with ambiguity — able to act and make
  progress even when things aren't clearly defined.
- Adaptable and broad: across implementation and product roles he has solved a
  wide range of customer problems, so he picks up new domains quickly.

# SELECTED AI PRODUCT WORK

## Case 1 — AI-assisted workflow consolidation (at Mobideo)
- Replaced a fragmented, 8-person workflow with a single AI-assisted dashboard.
- Problem: a core workflow was spread across eight users, each handling separate
  tasks, checklists, and file uploads, with no single place to see or coordinate
  the work. It was slow, people-heavy, and error-prone.
- What he did: consolidated the whole process into one dashboard and embedded AI
  agents directly into it so the system handled more of the work automatically.
  He led the design and build largely on his own using AI tools, with light
  developer support.
- AI quality approach: built an evaluation and feedback loop — agent output was
  checked against expected results, and reviewer corrections fed back to improve
  the agents over time.
- Results: cut the team required from 8 users to 4 (a 50% reduction), and the
  remaining 4 users saved roughly 70% of their time. Lower operating cost, faster
  completion.

## Case 2 — AI conversion of manual procedures into digital checklists (at Mobideo)
- Turned weeks of manual, FDA-grade procedure conversion into a fast,
  human-in-the-loop review.
- Problem: Mobideo customers need to convert manual instructions and procedures
  into digital checklists to use them in the platform. Done by hand this could
  take weeks, and in many cases the output must meet FDA standards, so accuracy
  is critical and every error carries compliance risk.
- What he did: designed an agent-based workflow with deliberate context
  management that converts each customer's manual procedures into the digital
  format they need, ready to use in Mobideo. Instead of doing the hard conversion
  themselves, customers review and validate the AI's output.
- AI quality approach: validated the workflow on about 50 sample procedures
  through an iterative loop with subject-matter experts (SMEs). SMEs reviewed the
  AI output, flagged errors, and their feedback was used to refine the prompts and
  the context the agents worked from. The SME validation step stayed in place as
  the auditable human control that kept the process compliant.
- Results: cut conversion effort from weeks of manual work to a fast
  review-and-validate step, while preserving FDA-grade accuracy.

# WORK HISTORY

- Product Manager, Mobideo (2023–present). Leads product vision and roadmap for
  enterprise software; designs and ships AI-agent workflows that simplify complex,
  multi-user operational processes; works across R&D, QA, and customer-facing
  teams; drives client onboarding and continuous product enhancement.

- R&D Project Manager, Mobideo (2021–2023). Managed software delivery across Agile
  teams; introduced process improvements that raised team velocity and sprint
  transparency; facilitated Scrum ceremonies and mentored team members; oversaw
  incident response with QA and system architects; mitigated project risk.

- System Implementation Specialist, Ness Digital Engineering (2020). Ran SaaS
  implementation projects end to end — system setup, user training, support — and
  tailored solutions to client operations.

- Implementation Specialist, SRP Analytics (2019–2020). Managed customer and
  internal stakeholder expectations during onboarding and a deployment
  quality-improvement program (PMO); built a new employee training program; led
  the implementation team in close partnership with the CEO.

# EDUCATION & SERVICE

- BSc, Industrial Engineering (major in Entrepreneurship and Innovation), Ruppin
  Academic Center, 2018–2021.
- Israel Defense Forces, Duvdevan Unit (elite commando), 2011–2014. Squad
  Commander and First Sergeant; led and trained teams in complex, high-stakes
  operations.

# SKILLS & TOOLS

AI/Product: AI/LLM product development, agent workflows, context management,
human-in-the-loop systems, prompt and context iteration, evaluation loops,
product strategy and roadmapping, process simplification.

Delivery: Agile and Scrum, software development lifecycle, cross-functional
leadership, risk mitigation, client onboarding and implementation, system
integration, stakeholder management.

# HOW HE WORKS

- AI as the engine, not the gimmick — agent workflows that do real work, with
  deliberate context management rather than one-off prompts.
- Humans stay in control, especially in regulated, high-stakes settings.
- Starts from the process, not the feature — maps the whole workflow and the
  people in it before deciding what to build or automate.
- Builds hands-on — uses AI tools to design, prototype, and ship himself.

# AVAILABILITY (high level only)

- Based in Thailand and looking for fully remote work.
- Open to both full-time and contract roles.
- Flexible on working hours / timezone overlap.
- Wants to continue his journey as an AI Product Manager.

# CONSULTING / FREELANCE (high level only)

- Open to consulting and freelance engagements. He hasn't done standalone
  consulting before, but he has solved problems for many customers across
  implementation and product roles, so he's open to advisory and hands-on work.

# CONTACT

- Email: yoavs217@gmail.com
- LinkedIn: https://www.linkedin.com/in/yoav-assaf-b82b3518b/
`;
