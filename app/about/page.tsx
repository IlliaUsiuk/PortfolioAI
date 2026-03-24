import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import { ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About — MyAIWay',
  description: 'AI Automation Specialist. I find the parts of your business that eat hours without adding value, then build systems that handle them automatically.',
}

const skills = {
  'Automation': ['Make', 'Zapier', 'n8n', 'API integrations (no-code)', 'Webhooks', 'JSON'],
  'AI / LLM': ['ChatGPT API', 'Claude API', 'Gemini', 'Prompt engineering', 'AI agents via n8n/Make'],
  'Data': ['Google Sheets', 'Airtable', 'CSV', 'Power BI', 'Process analytics'],
  'Marketing': ['SEO', 'GEO (Generative Engine Optimization)', 'Email automation', 'HubSpot', 'AI-assisted content'],
  'Approach': ['Systems thinking', 'Workflow design', 'MVP validation', 'Full cycle: discovery → production'],
}

const principles = [
  {
    title: 'Find the problem before writing a single line',
    body: 'Most automation fails because the process itself was broken. I map the workflow first, find where time actually disappears, then build.',
  },
  {
    title: 'Ship fast, iterate real',
    body: 'A working system in 5 days beats a perfect spec in 5 weeks. I build to production-ready fast, then improve on real usage data.',
  },
  {
    title: 'No code means no waiting',
    body: 'No IT backlog, no sprint planning, no tech debt from custom code. What you get runs immediately and you can adjust it yourself.',
  },
  {
    title: 'Results in your language',
    body: 'Hours saved per week. Cost per task cut. Not "connected n8n to Claude via webhook." Business outcome, not tech stack report.',
  },
]

export default function AboutPage() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <main className="max-w-[760px] mx-auto px-6 pt-28 pb-24">

        {/* Intro */}
        <section className="mb-16">
          <p className="text-text-secondary text-sm mb-4">Illia Usiuk · AI Automation Specialist</p>
          <h1 className="font-bold text-text-primary text-3xl md:text-4xl mb-8">About</h1>
          <p className="text-text-secondary leading-relaxed">
            I got into AI automation the way most people do — by spending too much time on work that
            felt like it should run itself.{' '}
            <span className="text-text-disabled">[YOUR STORY]</span>. That frustration became a
            skill set. Now I find those exact places in businesses where AI can take over, and I
            build the systems that make it happen.
          </p>
        </section>

        {/* What I actually do */}
        <section className="mb-16">
          <h2 className="font-semibold text-text-primary text-xl mb-4">What I actually do</h2>
          <p className="text-text-secondary leading-relaxed">
            I find the parts of your business that eat hours without adding value — leads falling
            through the cracks, reports built manually every week, approvals sitting in inboxes for
            days. Then I build systems that handle those parts automatically: AI agents that process
            requests, workflows that trigger without anyone pressing a button, integrations that keep
            your tools in sync. Most of what I build is running in production within a week.
          </p>
        </section>

        {/* Download CV */}
        <div className="mb-16">
          <a
            href="https://drive.google.com/drive/folders/YOUR_CV_FOLDER_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-active text-text-primary text-sm font-medium hover:bg-bg-tertiary transition-colors duration-150"
          >
            Download CV
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Skills */}
        <section className="mb-16">
          <h2 className="font-semibold text-text-primary text-xl mb-6">Skills</h2>
          <div className="space-y-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <p className="text-text-secondary text-xs uppercase tracking-wider mb-2">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-sm bg-bg-secondary border border-border-default text-text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How I work */}
        <section className="mb-16">
          <h2 className="font-semibold text-text-primary text-xl mb-6">How I work</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {principles.map(({ title, body }) => (
              <div key={title} className="rounded-md bg-bg-secondary border border-border-default p-5">
                <p className="text-text-primary font-medium text-sm mb-2">{title}</p>
                <p className="text-text-secondary text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* My path */}
        <section className="mb-16">
          <h2 className="font-semibold text-text-primary text-xl mb-4">My path</h2>
          <p className="text-text-secondary leading-relaxed">
            Started in <span className="text-text-disabled">[FIELD]</span>, moved into no-code
            automation, then into AI as it became practical. The thread across all of it: find the
            friction, remove it. AI just made that possible at a scale I couldn't reach before.
          </p>
        </section>

        {/* Built with AI */}
        <section className="rounded-md bg-bg-secondary border border-border-default p-6">
          <p className="text-text-primary font-medium text-sm mb-2">Built with AI</p>
          <p className="text-text-secondary text-sm leading-relaxed">
            This site itself was planned, structured, and built with Claude as a thinking partner.
            The architecture decisions, copywriting, design system, and code — all developed through
            AI-assisted process. The portfolio is the proof of method, not just a list of projects.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
