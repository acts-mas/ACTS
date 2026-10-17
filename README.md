# ACTS — Learning Who Talks to Whom

**Role-Aware Communication Topology Scheduling for Efficient LLM Multi-Agent Collaboration**

Project website for ACTS (Adaptive Communication-Topology Scheduling). ACTS combines role-conditioned relational attention for partner selection with topology-aware value factorization under centralized training with decentralized execution.

## Explore

- [Research manuscript](assets/acts-paper.pdf)
- [Reported experimental results (CSV)](assets/results.csv)

All eight manuscript figures appear directly in the reading flow, from the motivation figure below the title to the framework, architecture, experimental plots, and communication examples. Each image keeps its original aspect ratio and supports enlargement or opening the original. An optional interactive communication sequence appears after the method figures, alongside interactive results for two backbone models and component ablations.

Figure notes identify differences between the supplied draft graphics and its current text or tables. Exact interactive accuracy and token values come from Tables 1 and 3. The communication illustrations are not presented as verified experimental trajectories.

## Results and provenance

| Content | Source in the manuscript |
|---|---|
| Accuracy on nine benchmarks | Table 1, page 7 |
| Component ablations | Table 2, page 9 |
| Per-sample tokens on HotpotQA and HLE | Table 3, page 26 |
| Motivation and topology comparison | Figure 1, page 2 |
| Accuracy–token and information-gain plots | Figures 4 and 5, page 8 |
| Communication-action distributions | Figure 6, page 9 |
| Communication-action heatmap | Figure 7, page 25 |
| Framework, architecture, and case studies | Figures 2, 3, and 8 |

`results-data.js` stores the transcribed table values. Accuracy is expressed in percent; tokens are in thousands per sample. Macro-averages follow the reported values. Efficiency comparisons match the same backbone, benchmark, and method. HLE refers to the manuscript's first-250-question evaluation.

## Run locally

Open `index.html` in a browser, or serve this directory with any static HTTP server. The page uses plain HTML, CSS, and JavaScript, with no build dependencies, external fonts, analytics, backend, or inference API.

## Publish with GitHub Pages

Open the repository's **Settings → Pages** and select **GitHub Actions** as the source. The included workflow deploys the static site on pushes to `main` and can also be run manually from the Actions tab. The deployment provides the public website URL.

The intended organization is `acts-mas`, with the project URL `https://acts-mas.github.io/ACTS/` after organization creation, repository transfer, and deployment. A custom domain is optional. See [DEPLOYMENT.md](DEPLOYMENT.md) for setup details in Chinese.

## Update the site

- Edit `site-config.js` to add verified author information, affiliations, paper/code links, and BibTeX. Empty fields stay hidden.
- Replace `assets/acts-paper.pdf` when updating the public manuscript.
- Update `results-data.js` and `assets/results.csv` together when the reported results change.
- Page copy and styling live in `index.html`, `styles.css`, and `figures.css`; the independent topology component lives in `topology.js` and `topology.css`.

The reading flow is inspired by the [LightVLA project page](https://liauto-research.github.io/LightVLA/). This website's layout and interactive components were implemented separately for ACTS.
