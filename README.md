# ymClaudeSkills

Claude Code skills for building award-level GSAP motion websites.

| Skill | Use it when |
|---|---|
| [`building-gsap-motion-sites`](./building-gsap-motion-sites/SKILL.md) | Building or restyling a portfolio, studio, agency or product site that should feel award-level: ScrollTrigger choreography, SplitText, Lenis, pins, preloaders, drag canvases, Flip transitions. It includes a browser-verified starter template, a pattern catalogue and a 7-site measured study of gsap.com/showcase. |
| [`building-gsap-sites-from-fresh-references`](./building-gsap-sites-from-fresh-references/SKILL.md) | The new site must look different from earlier builds. Each run studies showcase sites nobody has studied yet, using Playwright scripts that measure type, colour, eases and scroll. A ledger records past sites and builds so directions don't repeat. Uses `building-gsap-motion-sites` for the engineering. |

## Install
Copy the skill folders into a skills directory:

```bash
# personal (all projects)
cp -r building-gsap-* ~/.claude/skills/
# or per project
cp -r building-gsap-* <project>/.claude/skills/
```

The fresh-references skill needs the Playwright MCP server.

## Notes
- `building-gsap-sites-from-fresh-references/ledger.md` and `studies/` hold the history of the original project's studies and builds. Keep them to avoid repeating those references, or clear the tables to start fresh.
- Screenshots of studied sites are not included because they are third-party work. The studies record measurements only.
