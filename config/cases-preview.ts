export interface CasePreview {
  title: string
  icon: string
  comingSoon: string
  hint: string
}

export const casesPreview: CasePreview[] = [
  {
    title: 'Business Process Automation',
    icon: 'Zap',
    comingSoon: 'April 2026',
    hint: 'A manual process that ate 10+ hours a week — automated. Real client, real numbers.',
  },
  {
    title: 'Content on Autopilot',
    icon: 'FileText',
    comingSoon: 'May 2026',
    hint: 'Topic in, content out, published — no one touches it between start and finish.',
  },
  {
    title: 'Five Tools, One Workflow',
    icon: 'GitMerge',
    comingSoon: 'June 2026',
    hint: 'Typeform, Telegram, Sheets, Notion, Claude — connected into a single chain.',
  },
  {
    title: 'The Report That Writes Itself',
    icon: 'BarChart2',
    comingSoon: 'Q3 2026',
    hint: 'Weekly data pulled, summarized by AI, sent to Slack. Zero manual work.',
  },
  {
    title: 'AI Search Optimization',
    icon: 'Search',
    comingSoon: 'Later',
    hint: 'Optimizing content for ChatGPT, Perplexity, and Gemini — before everyone else figures it out.',
  },
]
