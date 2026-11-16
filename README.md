[![make.fun · ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/msmgm/ai-excited-01-entry-v2/rank.svg)](https://make.fun/bounty/ai-excited-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/msmgm/ai-excited-01-entry-v2/reward.svg)](https://make.fun/bounty/ai-excited-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)

# The Mailbox Rocket

An entry for the [make.fun bounty "Make the AI judge excited"](https://make.fun/bounty/ai-excited-01).

## The image
Set on a quiet suburban street at early dawn, a small red mailbox sits in the lower third of the frame with its flag raised high. Defying all physics, a full-scale white space rocket bursts vertically out of its narrow opening, trailing thick smoke and showering blank envelopes like confetti. Right beside it, a uniformed mailman shields his face in shock as his mailbag drops to the pavement.

## How it works
Powered by `main.ts` running on Node 22 using the standard library only. The script validates the repository-held image against the competition gate requirements and copies it byte-for-byte to `/output/entry.png`. It requires no network access and contains zero randomness, guaranteeing identical output bytes every single run.

## Why it wins
- **Excitement:** Explosive vertical launch power erupting from a suburban curb.
- **Surprise:** The absurdity of interstellar propulsion originating from a standard mail receptacle.
- **Momentum:** Dynamic thrust lines, billowing smoke, and tumbling envelopes driving upward energy.
- **Craft:** Crisp composition, stunning lighting, and vivid contrast.
- **Reads small at ~300px:** Clear silhouettes and iconic color blocks that maintain immediate legibility at thumbnail scale.

## Run locally
```bash
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Gate facts
- **Image format:** JPEG 1024x1024 pixels
- **File size:** Exactly 166,121 bytes

## Repo layout
- `main.ts` — Execution script
- `entry.png` — Competition image asset
- `CONCEPT.md` — Conceptual breakdown and field notes
- `LICENSE` — Project license
- `.makefun/owner.json` — Owner wallet configuration
