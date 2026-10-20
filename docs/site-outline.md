# Site outline

Company profile for a small AI team from Indonesia. This is the section outline before design. Copy is placeholder. `[ ]` marks content to supply.

## Decisions

- **Buyers:** Indonesian mid-size companies, startups, enterprise and government.
- **Language:** English only. Plain copy. The space and cyberpunk theme lives in the visuals, not in the words.
- **Main actions:** Book a call (Cal.com) and a short contact form.
- **Proof:** live products, hackathon wins, team backgrounds. Use mock data until real content is ready.
- **Pages:** Home, `/work`, `/team`, `/contact`.
- **Header:** Work · Team · Contact + "Book a call" button (goes to `/contact`).
- **Out of scope for now:** prices, a numbers bar, a Lab section, a blog, a Bahasa version, buyer-specific pages, `/work` filters.

---

## Home `/`

### 1. Hero

Linear-style layout. 3D space objects with a light cyberpunk touch. Visuals are planned in a separate session.

- **Headline:** Less orbit. More landing.
- **Subline:** A small AI team from Indonesia. We build AI that works in your business, not in a slide deck.
- **Actions:** Book a call · See our work →

### 2. Showcase

Four tabs. The device frame changes with the tab. The screens show custom apps built with our design system, not third-party apps. Caption: "Example build".

| Tab | Capability | Device | Example screen |
| --- | --- | --- | --- |
| Ask | Chat on your data | Phone | "Why did sales drop in Surabaya last week?" → answer with the cause and a chart |
| Read | Document reading | Laptop | A stack of invoices → extracted fields in a table, with low-confidence fields marked |
| Act | Automation with approval | Laptop | Restock order drafted from stock levels → "Approve" / "Edit" |
| Alert | Early warning | Phone | "Water level at sensor 4 rising fast. Est. 40 min to threshold." → action buttons |

Below the frame: "Your data stays in your systems. How we handle data →" (links to section 8).

### 3. What we build

Six cards, one per business function. Each card has one line and four bullets.

- **Customer service:** Answer customers on the channels they already use.
  - Chat assistant on your product and policy docs
  - Handover to a human with full context
  - Ticket sorting and routing
  - Daily summary of top questions
- **Sales:** Find the deals that need attention.
  - Pipeline questions in plain language
  - Lead scoring from your CRM data
  - Follow-up drafts for each deal
  - Weekly sales brief
- **Operations:** See problems before they stop the line.
  - Stock risk and restock drafts
  - Delay detection across orders
  - Daily ops brief
  - Approval flow for every action
- **Finance:** Less manual checking, faster close.
  - Invoice and receipt reading
  - Matching payments to invoices
  - Spending anomaly flags
  - Draft monthly reports
- **Admin & documents:** Turn paper and PDFs into data.
  - Form and contract reading
  - Search across all company documents
  - Data entry into your current system
  - Summaries of long documents
- **Field & safety:** Watch the field so people do not have to.
  - Sensor and camera monitoring
  - Early warning alerts
  - Incident reports from photos
  - Field team dispatch

### 4. Who we work with

Flat grid: one frame, three cells, 1px lines between them, no card backgrounds. Each cell has an isometric figure made with the anatomy skill. Each figure has one small idle detail. Static under `prefers-reduced-motion`.

| Buyer | Figure | Idle detail | Line |
| --- | --- | --- | --- |
| Companies | Office block with a server rack visible inside | Server LEDs flash | Add AI to the systems you already run. |
| Startups | Small rocket on a launch pad | Rocket vents steam | Build your AI product with a team that ships. |
| Government | Civic building with an antenna or siren tower | Antenna light blinks | Public-safety AI that runs on your own servers. |

### 5. Selected work

- **Featured project card (mock):** Disaster detection. One-line problem, one result, one screenshot. Link to its `/work` story.
- **Hackathon wins strip (mock):** `[Event] · [Place] · [Year]` × 3–5
- **Link:** See all work →

### 6. How to start

Three offers. No prices.

- **Add AI to your product:** Chat, search, document reading, or automation, wired into your app and your data.
- **Prototype Sprint:** One use case, from your data to a screen you can click. Fixed scope, 2 weeks.
- **Design, build, launch:** Design, engineering, and AI in one small team. We stay until real users are on it.

### 7. The 14-day sprint

A two-week calendar. One milestone per working day.

| Day | Milestone |
| --- | --- |
| 1 | Kickoff. Pick one use case. |
| 2 | Data in. Access to your sample data. |
| 3 | Data check. Clean and map the data. |
| 4 | First model on your data. |
| 5 | Review with you. |
| 8 | First clickable screen. |
| 9 | Connect the screen to the model. |
| 10 | Review with you. |
| 11 | Test with real users. |
| 12 | Fix what users found. |
| 13 | Dry run. |
| 14 | Demo day. You click it. |

### 8. Your data stays yours

Four claims, then a logo row of models and tools.

- **On-prem or private cloud:** It runs on your servers or your cloud account.
- **Hosted in Indonesia:** Data stays in the country. Built for UU PDP.
- **Local open models:** We can use open models (Llama, Qwen) so no data goes to outside AI providers.
- **NDA by default:** We sign before we see your data.

Logo row: `[GPT] [Claude] [Gemini] [Llama] [Qwen] [tools]`

### 9. FAQ

- Who owns the code? You do.
- Can it run on our own servers? Yes.
- Which AI models do you use? The one that fits the job and your data rules.
- What happens after launch? `[support, maintenance, handover, training]`
- How long until we see something? A clickable demo in 14 days.
- How do we start? Book a call. We pick one use case together.

### 10. Final CTA

- **Headline:** Ready to start?
- **Actions:** Book a call · Send a message

### 11. Footer

Nav (Work, Team, Contact), email, location, socials.

---

## `/work`

1. **Header:** Things we shipped.
2. **Featured story (mock):** Disaster detection. Problem → Approach → Result.
3. **Project grid (mock):** no filter until there are more than 6 projects.
4. **CTA:** Book a call.

Project fields:

| Field | Notes |
| --- | --- |
| Name | |
| Type | Live product or Hackathon |
| Problem | One line |
| What we built | One line |
| Result or award | Hackathon: award + date |
| Stack | |
| Link | Live product URL |
| Screenshots | 1–2 |

## `/team`

1. **Header**
2. **Team carousel** (moved from the current home page)
3. **Backgrounds:** for each person: role, past work, school, one fact. `[ ]`
4. **Hackathon history:** event · place · year · project, linked to its `/work` entry. `[ ]`
5. **CTA:** Book a call.

## `/contact`

1. **Header**
2. **Cal.com booking**
3. **Prefer to write?** Form: name, email, message.
4. **Email and location**
