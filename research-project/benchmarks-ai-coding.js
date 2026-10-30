// Data and charts of the survey page "Benchmarks for AI-assisted code development" (CMS-PRO). Charts by name for
// RPViz.mount; colours from the page's --vz-* tokens (validated four-slot dataviz palette on the chart surfaces).
// Sources were opened on 30 Oct 2026: arXiv API and full text, GitHub API, Semantic Scholar batch API, OpenAlex,
// official boards rendered in headless Chrome. A field that was not stated in a source says so; nothing is estimated.
window.BS = (function () {
  const { esc, num, hbar, CHARTS, tbl } = RPViz;
  const READ = "30 Oct 2026", READ_ISO = "2026-10-30";
  const ax = id => `https://arxiv.org/abs/${id}`;
  const link = (t, u) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`;
  // "[label](id or url)" inside a data string becomes a link; ids go to arXiv.
  const rich = s => esc(s).replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => link(t, u.startsWith("http") ? u : ax(u)));

  const FAM = {
    fn: "Functions and contests", cp: "Completion inside a repo", gn: "Repo and feature generation", is: "Issue resolution",
    ag: "Agent and long-horizon tasks", cr: "Code review", cx: "Context and retrieval", ot: "Testing, security, performance, migration",
  };
  const ORACLE = { match: "Matches a reference", exec: "Runs tests from the project or task set", verify: "Runs a purpose-written verifier", judge: "LLM judge, rubric or human" };

  // The catalogue. d: first public date; o: main scoring route; r: runs in a real repository (2 yes, 1 partly, 0 no);
  // a: agentic (2 multi-turn with tools, 1 either, 0 single shot); c: criticism found, with links; g: GitHub repository.
  const NS = "Not stated in the abstract";
  const B = [
    // Functions and contests
    { n: "CodeXGLUE", d: "2021-02", f: "fn", t: "Ten code understanding and generation tasks", sc: "14 datasets", l: "Several, by task", sm: "Task-specific metrics", o: "match", r: 0, a: 0, s: "2102.04664", g: "microsoft/CodeXGLUE" },
    { n: "APPS", d: "2021-05", f: "fn", t: "Solve coding-contest problems from natural language", sc: "10,000 problems", l: "Python", sm: "Test cases", o: "exec", r: 0, a: 0, s: "2105.09938", g: "hendrycks/apps" },
    { n: "HumanEval", d: "2021-07", f: "fn", t: "Write a Python function from its docstring", sc: "164 tasks", l: "Python", sm: "Unit tests, pass@k", o: "exec", r: 0, a: 0, c: "[Data leakage](2412.01526) into training sets. [Saturated](2412.21199): o1-mini reaches 96.2 % pass@1. [Prompt quality issues](2404.10155) across nine code benchmarks.", s: "2107.03374", g: "openai/human-eval", lm: 1 },
    { n: "MBPP", d: "2021-08", f: "fn", t: "Short programs for entry-level problems", sc: "974 tasks", l: "Python", sm: "Unit tests", o: "exec", r: 0, a: 0, c: "[Most models excel](2412.21199) on it, so it no longer separates them.", s: "2108.07732", mn: "Folder in a monorepo, not assessable" },
    { n: "MultiPL-E", d: "2022-08", f: "fn", t: "Translate HumanEval and MBPP into other languages", sc: "Two sets into 18 more languages", l: "19 languages", sm: "Unit tests", o: "exec", r: 0, a: 0, c: "Inherits the limits of its two source sets (our reading).", s: "2208.08227", g: "nuprl/MultiPL-E" },
    { n: "DS-1000", d: "2022-11", f: "fn", t: "Data-science problems from StackOverflow", sc: "1,000 problems, 7 libraries", l: "Python", sm: "Tests plus surface-form rules", o: "exec", r: 0, a: 0, c: "Authors report 1.8 % of accepted Codex answers were still wrong.", s: "2211.11501" },
    { n: "HumanEval-X", d: "2023-03", f: "fn", t: "HumanEval with hand-written solutions in more languages", sc: "HumanEval tasks", l: "Python, C++, Java, JavaScript, Go", sm: "Unit tests", o: "exec", r: 0, a: 0, s: "2303.17568", g: "THUDM/CodeGeeX" },
    { n: "ClassEval", d: "2023-08", f: "fn", t: "Generate a whole class", sc: "100 tasks", l: "Python", sm: "Unit tests", o: "exec", r: 0, a: 0, c: "Authors show method-level skill does not predict class-level skill.", s: "2308.01861", g: "FudanSELab/ClassEval" },
    { n: "LiveCodeBench", d: "2024-03", f: "fn", t: "Fresh contest problems, split by date to avoid contamination", sc: "400 problems at release, growing", l: "Python", sm: "Test cases", o: "exec", r: 0, a: 0, c: "Contest tasks only, so no project context (our reading).", s: "2403.07974", g: "LiveCodeBench/LiveCodeBench" },
    { n: "NaturalCodeBench", d: "2024-05", f: "fn", t: "Real user queries from online coding services", sc: "402 problems, 6 domains", l: "Python, Java", sm: "Tests, semi-automated", o: "exec", r: 0, a: 0, s: "2405.04520", g: "THUDM/NaturalCodeBench" },
    { n: "BigCodeBench", d: "2024-06", f: "fn", t: "Tasks that need many library calls", sc: "1,140 tasks, 139 libraries", l: "Python", sm: "Tests, 99 % branch coverage on average", o: "exec", r: 0, a: 0, s: "2406.15877", g: "bigcode-project/bigcodebench" },
    { n: "HumanEval Pro", d: "2024-12", f: "fn", t: "Solve a base problem, then reuse it for a harder one", sc: "Three derived sets", l: "Python", sm: "Unit tests", o: "exec", r: 0, a: 0, s: "2412.21199", g: "CodeEval-Pro/CodeEval-Pro" },
    { n: "LiveCodeBench Pro", d: "2025-06", f: "fn", t: "Codeforces, ICPC and IOI problems, updated continuously", sc: NS, l: NS, sm: "Pass@1 plus medalist review", o: "exec", r: 0, a: 0, s: "2506.11928", g: "GavinZhengOI/LiveCodeBench-Pro" },
    { n: "DevBench", d: "2026-01", f: "fn", t: "Completion tasks shaped by developer telemetry", sc: "1,800 instances", l: "6 languages", sm: "Tests, similarity and LLM judge", o: "exec", r: 0, a: 0, s: "2601.11895", g: "microsoft/devbench" },
    { n: "Multi-LCB", d: "2026-06", f: "fn", t: "LiveCodeBench carried into more languages", sc: "LiveCodeBench tasks", l: "12 languages", sm: "Same protocol as LiveCodeBench", o: "exec", r: 0, a: 0, s: "2606.20517", g: "Multi-LCB/Multi-LCB" },
    // Completion inside a repo
    { n: "RepoEval", d: "2023-03", f: "cp", t: "Complete a line, an API call or a function body", sc: NS, l: "Python", sm: "Exact match and edit similarity; unit tests only for functions", o: "match", r: 2, a: 0, s: "2303.12570", g: "microsoft/CodeT" },
    { n: "RepoBench", d: "2023-06", f: "cp", t: "Retrieve cross-file context, then predict the next line", sc: "Three tasks: R, C, P", l: "Python, Java", sm: "Retrieval accuracy, exact match, edit similarity", o: "match", r: 2, a: 0, s: "2306.03091", g: "Leolty/repobench" },
    { n: "CrossCodeEval", d: "2023-10", f: "cp", t: "Completions that are only solvable with cross-file context", sc: NS, l: "Python, Java, TypeScript, C#", sm: "Exact match; also measures retrievers", o: "match", r: 2, a: 0, s: "2310.11248", g: "amazon-science/cceval" },
    // Repo and feature generation
    { n: "CoderEval", d: "2023-02", f: "gn", t: "Pragmatic generation with six levels of context dependency", sc: "230 Python and 230 Java tasks", l: "Python, Java", sm: "Tests on an execution platform", o: "exec", r: 2, a: 0, s: "2302.00288", g: "CoderEval/CoderEval" },
    { n: "EvoCodeBench", d: "2024-03", f: "gn", t: "Repo-aligned generation, refreshed to limit leakage", sc: "275 samples, 25 repos", l: "Python", sm: "Pass@k and dependency recall", o: "exec", r: 2, a: 0, c: "Designed to evolve, yet the repository was last pushed in Aug 2024.", s: "2404.00599", g: "seketeam/EvoCodeBench" },
    { n: "DevEval", d: "2024-05", f: "gn", t: "Manually annotated generation aligned with real repos", sc: "1,874 samples, 117 repos", l: "Python", sm: "Pass@1", o: "exec", r: 2, a: 0, s: "2405.19856", g: "seketeam/DevEval" },
    { n: "JavaBench", d: "2024-06", f: "gn", t: "Object-oriented Java projects", sc: "4 projects, 106 classes, 389 methods", l: "Java", sm: "Project test suites", o: "exec", r: 2, a: 0, s: "2406.12902", g: "java-bench/JavaBench" },
    { n: "RepoExec", d: "2024-06", f: "gn", t: "Use the dependencies a developer specified", sc: NS, l: "Python", sm: "Executability, tests, Dependency Invocation Rate", o: "exec", r: 2, a: 0, s: "2406.11927", g: "FSoft-AI4Code/RepoExec" },
    { n: "REPOCOD", d: "2024-10", f: "gn", t: "Whole functions in large projects", sc: "980 tasks, 11 projects", l: "Python", sm: "Developer tests, 314 per instance", o: "exec", r: 2, a: 0, s: "2410.21647", g: "lt-asset/REPOCOD" },
    { n: "Commit0", d: "2024-12", f: "gn", t: "Write a library from its specification", sc: "54 libraries", l: "Python", sm: "Unit tests, with interactive feedback", o: "exec", r: 1, a: 2, s: "2412.01769", g: "commit-0/commit0" },
    { n: "DI-Bench", d: "2025-01", f: "gn", t: "Infer the dependencies a repository needs", sc: "581 repositories", l: "Python, C#, Rust, JavaScript", sm: "Textual and execution pass rates", o: "exec", r: 2, a: 0, s: "2501.13699", g: "microsoft/DI-Bench" },
    { n: "FEA-Bench", d: "2025-03", f: "gn", t: "Implement features from real pull requests", sc: "1,401 tasks, 83 repos", l: "Python", sm: "Unit tests from the PR", o: "exec", r: 2, a: 0, s: "2503.06680", g: "microsoft/FEA-Bench" },
    { n: "ProjectEval", d: "2025-03", f: "gn", t: "Build a project, judged through simulated user interaction", sc: NS, l: NS, sm: "Simulated interaction and code similarity", o: "verify", r: 0, a: 2, s: "2503.07010", g: "RyanLoil/ProjectEval" },
    { n: "CoreCodeBench", d: "2025-07", f: "gn", t: "Atomised repo tasks that isolate one skill each", sc: NS, l: "Python", sm: "Tests per task type", o: "exec", r: 2, a: 0, s: "2507.05281", g: "AGI-Eval-Official/CoreCodeBench" },
    { n: "Doc2Feat-bench", d: "2025-07", f: "gn", t: "Add a feature from a documentation change", sc: "634 tasks, 10 projects", l: NS, sm: "Developer-written tests", o: "exec", r: 2, a: 2, c: "Formerly NoCode-bench under the same arXiv id.", s: "2507.18130", g: "Doc2Feat-bench/Doc2Feat-bench" },
    { n: "E2EDev", d: "2025-10", f: "gn", t: "End-to-end development from fine-grained requirements", sc: NS, l: NS, sm: "Behaviour-driven tests", o: "verify", r: 0, a: 2, s: "2510.14509", g: "SCUNLP/E2EDev" },
    { n: "FeatureBench", d: "2026-02", f: "gn", t: "Features spanning several commits, traced along a dependency graph", sc: "200 tasks, 24 repos", l: "Python", sm: "Tests; other features must keep working", o: "exec", r: 2, a: 2, c: "Claude 4.5 Opus falls from 74.4 % on SWE-bench to 11.0 % here (authors).", s: "2602.10975", g: "LiberCoders/FeatureBench" },
    { n: "ProgramBench", d: "2026-05", f: "gn", t: "Rebuild a program from its binary and documentation", sc: "200 tasks, up to FFmpeg and SQLite", l: "Agent's choice", sm: "Behavioural tests from agent-driven fuzzing", o: "verify", r: 0, a: 2, c: "No task fully solved; the best model passes 95 % of tests on 3 % of tasks. Models favour single-file code.", s: "2605.03546", g: "facebookresearch/ProgramBench" },
    { n: "MirrorCode", d: "2026-06", f: "gn", t: "Reimplement a program from its behaviour alone", sc: "25 target programs", l: "Agent's choice", sm: "Exact output on end-to-end and held-out tests", o: "verify", r: 0, a: 2, c: "Epoch built it, so Epoch does not [review it](https://epoch.ai/data/benchmark-reviews-documentation/included-benchmarks).", s: "2606.30182", g: "epoch-research/MirrorCode" },
    // Issue resolution
    { n: "SWE-bench", d: "2023-10", f: "is", t: "Fix a GitHub issue in the repository", sc: "2,294 tasks, 12 repos", l: "Python", sm: "Hidden tests from the fixing PR", o: "exec", r: 2, a: 1, c: "[Solution leakage in 32.67 %, weak tests in 31.08 %](2410.06992) of one agent's passes. [Most leaderboard entries come from industry](2602.04449).", s: "2310.06770", g: "SWE-bench/SWE-bench" },
    { n: "SWE-bench Verified", d: "2024-08", f: "is", t: "Human-filtered subset of SWE-bench", sc: "500 tasks, 12 repos", l: "Python", sm: "Hidden tests from the fixing PR", o: "exec", r: 2, a: 1, c: "[OpenAI stopped reporting it](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/). [Epoch: Flawed](https://epoch.ai/benchmarks/swe-bench-verified/review). [Half of passes would not be merged](https://metr.org/notes/2026-03-10-many-swe-bench-passing-prs-would-not-be-merged-into-main/).", s: "https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/", g: "SWE-bench/SWE-bench" },
    { n: "SWE-bench-java", d: "2024-08", f: "is", t: "SWE-bench for Java", sc: NS, l: "Java", sm: "Tests from the PR", o: "exec", r: 2, a: 1, c: "Absorbed into Multi-SWE-bench by the same team (our reading of the repos).", s: "2408.14354", g: "multi-swe-bench/multi-swe-bench-env" },
    { n: "SWE-Bench+", d: "2024-10", f: "is", t: "SWE-bench after removing leaked and weakly tested tasks", sc: "Filtered SWE-bench", l: "Python", sm: "Same tests, filtered tasks", o: "exec", r: 2, a: 1, c: "Is itself the audit: one agent falls from 12.47 % to 3.97 %.", s: "2410.06992" },
    { n: "SWE-Gym", d: "2024-12", f: "is", t: "Training environment for issue-fixing agents", sc: "2,438 tasks", l: "Python", sm: "Unit tests", o: "exec", r: 2, a: 2, s: "2412.21139", g: "SWE-Gym/SWE-Gym" },
    { n: "SWE-Lancer", d: "2025-02", f: "is", t: "Paid freelance tasks, including manager decisions", sc: "Over 1,400 tasks, $1M in payouts", l: NS, sm: "End-to-end tests; choices of the real manager", o: "verify", r: 2, a: 2, s: "2502.12115", g: "openai/SWELancer-Benchmark" },
    { n: "Multi-SWE-bench", d: "2025-04", f: "is", t: "Issue resolution beyond Python", sc: "1,632 tasks", l: "Java, TypeScript, JavaScript, Go, Rust, C, C++", sm: "Tests from the PR", o: "exec", r: 2, a: 1, s: "2504.02605", g: "multi-swe-bench/multi-swe-bench" },
    { n: "SWE-PolyBench", d: "2025-04", f: "is", t: "Bug fixes, features and refactoring", sc: "2,110 tasks, 21 repos", l: "Java, JavaScript, TypeScript, Python", sm: "Tests plus syntax-tree retrieval metrics", o: "exec", r: 2, a: 1, s: "2504.08703", g: "amazon-science/SWE-PolyBench" },
    { n: "SWE-rebench", d: "2025-05", f: "is", t: "Automated collection of fresh tasks", sc: "21,000+ Python tasks; V2: 32,079 tasks, 3,617 repos", l: "Python; V2: 20 languages", sm: "Tests from the PR", o: "exec", r: 2, a: 2, c: "Aimed at training as much as at evaluation.", s: "2505.20411", g: "SWE-rebench/SWE-bench-fork" },
    { n: "SWE-bench-Live", d: "2025-05", f: "is", t: "Live-updated tasks from issues since 2024", sc: "1,319 tasks, 93 repos", l: NS, sm: "Tests in per-task Docker images", o: "exec", r: 2, a: 1, s: "2505.23419", g: "microsoft/SWE-bench-Live" },
    { n: "SWE-bench Multilingual", d: "2025", f: "is", t: "SWE-bench style tasks across languages", sc: "300 tasks, 42 repos", l: "9 languages", sm: "Tests from the PR", o: "exec", r: 2, a: 1, c: "[Shortcut attempts in 60.7 to 90.1 % of trajectories](2609.06780) for three open models.", s: "https://www.swebench.com/multilingual.html", g: "SWE-bench/SWE-bench" },
    { n: "SWE-MERA", d: "2025-07", f: "is", t: "Dynamic benchmark from recent issues", sc: "728 samples, about 10,000 candidates", l: NS, sm: "Tests, run through Aider", o: "exec", r: 2, a: 1, s: "2507.11059", g: "MERA-Evaluation/repotest" },
    { n: "SWE-Bench Pro", d: "2025-09", f: "is", t: "Long-horizon tasks from enterprise-style repos", sc: "1,865 tasks, 41 repos; 731 public, 276 commercial, 858 held out", l: "Python, JavaScript, TypeScript, Go", sm: "Fail-to-pass and pass-to-pass tests", o: "exec", r: 2, a: 2, c: "[OpenAI: about 30 % broken, recommendation retracted](https://openai.com/index/separating-signal-from-noise-coding-evaluations/). [Epoch: Flawed](https://epoch.ai/benchmarks/swe-bench-pro/review). [Git-history reward hack](https://poolside.ai/blog/through-the-looking-glass).", s: "2509.16941", g: "scaleapi/SWE-bench_Pro-os" },
    { n: "OmniCode", d: "2026-02", f: "is", t: "Bug fixing, test generation, review fixing, style fixing", sc: "1,794 tasks", l: "Python, Java, C++", sm: "Category-specific checks", o: "exec", r: 2, a: 2, s: "2602.02262", g: "seal-research/OmniCode" },
    { n: "DeepSWE", d: "2026-05", f: "is", t: "Original tasks never contributed upstream", sc: "113 tasks, 91 repos", l: "5 languages", sm: "Hand-written verifier", o: "verify", r: 2, a: 2, c: "[Epoch: Flawed](https://epoch.ai/benchmarks/deepswe/review): 23 of 113 tasks have false negatives, mostly when agents edit tests.", s: "2607.07946", g: "datacurve-ai/deep-swe" },
    { n: "SWE-Bench ProMax", d: "2026-08", f: "is", t: "Behaviour-preserving multi-file refactoring", sc: "170 instances", l: "Python, Java, TypeScript, Go, C, C++, Rust", sm: NS, o: "exec", r: 2, a: 2, s: "2608.09802" },
    { n: "SWE-bench Science", d: "2026-08", f: "is", t: "Scientific software across 20 domains", sc: "119 tasks, 98 repos", l: NS, sm: "Pass@1", o: "exec", r: 2, a: 2, s: "2608.19799" },
    { n: "SWE-Bench Pro Verified", d: "2026-09", f: "is", t: "SWE-Bench Pro with leakage channels closed and tasks repaired", sc: "Refined Pro tasks", l: NS, sm: "Refined tests, anti-hacking safeguards", o: "exec", r: 2, a: 2, c: "Third party, separate from Scale's own [642-task V2](https://raw.githubusercontent.com/scaleapi/SWE-bench_Pro-os/main/v2/README.md).", s: "2609.08149", g: "open-compass/AgentCompass" },
    // Agent and long-horizon tasks
    { n: "SUPER", d: "2024-09", f: "ag", t: "Set up and run research repositories", sc: "45 expert, 152 sub, 602 auto problems", l: "Python", sm: "Task success and progress measures", o: "verify", r: 2, a: 2, s: "2409.07440", g: "allenai/super-benchmark" },
    { n: "ScienceAgentBench", d: "2024-10", f: "ag", t: "Data-driven discovery tasks from papers", sc: "102 tasks, 44 papers", l: "Python", sm: "Program, execution and cost metrics", o: "verify", r: 0, a: 2, s: "2410.05080", g: "OSU-NLP-Group/ScienceAgentBench" },
    { n: "MLE-bench", d: "2024-10", f: "ag", t: "Machine learning engineering from Kaggle", sc: "75 competitions", l: NS, sm: "Kaggle leaderboard medals", o: "verify", r: 0, a: 2, c: "The paper itself studies contamination from pre-training.", s: "2410.07095", g: "openai/mle-bench" },
    { n: "GitTaskBench", d: "2025-08", f: "ag", t: "Real tasks solved by reusing an existing repository", sc: "54 tasks", l: NS, sm: "Human-curated harness, cost-based alpha value", o: "verify", r: 2, a: 2, s: "2508.18993", g: "QuantaAlpha/GitTaskBench" },
    { n: "CodeClash", d: "2025-11", f: "ag", t: "Tournaments between codebases towards a goal", sc: "6 arenas", l: "Several", sm: "Head-to-head results, Elo", o: "verify", r: 0, a: 2, s: "2511.00839", g: "CodeClash-ai/CodeClash" },
    { n: "Terminal-Bench", d: "2026-01", f: "ag", t: "Hard tasks in terminal environments", sc: "2.0: 89 tasks; 4.0: 66 tasks", l: "Depends on the task", sm: "Task-specific tests", o: "verify", r: 0, a: 2, c: "[28 of 89 tasks fixed in 2.1](https://www.tbench.ai/news/terminal-bench-2-1). [Epoch: 4.0.0 Flawed](https://epoch.ai/benchmarks/terminal-bench-4/review), 30 of 66 tasks with noted defects.", s: "2601.11868", g: "harbor-framework/terminal-bench" },
    { n: "SWE-CI", d: "2026-03", f: "ag", t: "Maintain a repo through its CI history", sc: "100 tasks, 71 commits on average", l: NS, sm: "Functional correctness tracked over time", o: "exec", r: 2, a: 2, s: "2603.03823", g: "SKYLENAGE-AI/SWE-CI" },
    { n: "SlopCodeBench", d: "2026-03", f: "ag", t: "Extend your own solution over evolving specs", sc: "36 problems, 196 checkpoints", l: NS, sm: "Checkpoints plus erosion and verbosity", o: "exec", r: 0, a: 2, c: "Best agent passes 14.8 % of checkpoints; erosion rises in 77 % of trajectories.", s: "2603.24755", g: "SprocketLab/slop-code-bench" },
    { n: "SWE Atlas", d: "2026-05", f: "ag", t: "Codebase Q&A, test writing, refactoring", sc: "124, 90 and 70 tasks", l: NS, sm: "Programmatic checks plus rubrics", o: "judge", r: 2, a: 2, s: "2605.08366", g: "scaleapi/SWE-Atlas" },
    { n: "TerminalWorld", d: "2026-05", f: "ag", t: "Tasks reverse-engineered from terminal recordings", sc: "1,530 tasks, 200 verified", l: NS, sm: "Automated task checks", o: "verify", r: 0, a: 2, c: "Weak correlation with Terminal-Bench scores (r = 0.20).", s: "2605.22535", g: "EuniAI/TerminalWorld" },
    { n: "Dialogue SWE-Bench", d: "2026-06", f: "ag", t: "Resolve an issue through dialogue with a simulated user", sc: NS, l: NS, sm: "Task success and dialogue quality", o: "exec", r: 2, a: 2, s: "2606.13995", g: "jlab-nlp/dialogue_swe_bench" },
    { n: "SWE-Interact", d: "2026-06", f: "ag", t: "Multi-turn sessions with vague starting instructions", sc: NS, l: NS, sm: "Tests after simulated hand-off", o: "exec", r: 2, a: 2, c: "Best models solve about 50 % of single-turn baselines, about 25 % here.", s: "2606.30573", g: "scaleapi/SWE-Interact" },
    { n: "ChainSWE", d: "2026-07", f: "ag", t: "Sequential, dependent bug fixes in one codebase", sc: "304 issues, 54 projects", l: "Python", sm: "Tests along the chain", o: "exec", r: 2, a: 2, c: "Performance drops by up to 70 % as the chain grows.", s: "2607.02606" },
    { n: "AgentLens", d: "2026-07", f: "ag", t: "Review whole trajectories, not a single bit", sc: NS, l: NS, sm: "Formal checks and LLM trajectory reviews", o: "judge", r: 1, a: 2, s: "2607.06624", g: "agent-lens/agent-lens-bench" },
    { n: "Long-Horizon-Terminal-Bench", d: "2026-07", f: "ag", t: "Long terminal tasks with graded subtasks", sc: "46 tasks", l: NS, sm: "Dense partial credit", o: "verify", r: 0, a: 2, s: "2607.08964" },
    { n: "SWE-Shift", d: "2026-10", f: "ag", t: "Requirements and workspace change mid-task", sc: "120 scenarios", l: NS, sm: "Task plus state and evidence checks", o: "verify", r: 2, a: 2, c: "GPT-6 Astra falls from 67.35 % to 24.79 % when the task shifts.", s: "2610.32196" },
    // Code review
    { n: "CRScore", d: "2024-09", f: "cr", t: "Reference-free quality metric for review comments", sc: "2.9k human-rated reviews", l: "Several", sm: "Claims and smells; 0.54 Spearman with humans", o: "judge", r: 0, a: 0, s: "2409.19801", g: "atharva-naik/CRScore" },
    { n: "SWR-Bench", d: "2025-09", f: "cr", t: "PR-level review with full project context", sc: "1,000 PRs", l: NS, sm: "LLM judge, about 90 % agreement with humans", o: "judge", r: 2, a: 1, s: "2509.01494", g: "ZZR0/SWRench" },
    { n: "CodeFuse-CR-Bench", d: "2025-09", f: "cr", t: "End-to-end review with issue, PR and repo state", sc: "601 instances, 70 projects", l: "Python", sm: "Rule checks plus model judgement", o: "judge", r: 2, a: 1, s: "2509.14856", g: "codefuse-ai/SWE-CARE" },
    { n: "ContextCRBench", d: "2025-11", f: "cr", t: "Hunk-level quality, line-level defects and comments", sc: "67,910 entries, 90 repos", l: "9 languages", sm: "F1, accuracy, precision, comment metrics", o: "match", r: 1, a: 0, c: "Textual context helps more than code context (authors).", s: "2511.07017", g: "kinesiatricssxilm14/ContextCRBench" },
    { n: "CR-Bench", d: "2026-03", f: "cr", t: "Real, preventable defects", sc: NS, l: NS, sm: "Fine-grained evaluator, tracks false findings", o: "judge", r: 2, a: 2, c: "Agents show a low signal-to-noise ratio (authors).", s: "2603.11078" },
    { n: "c-CRAB", d: "2026-03", f: "cr", t: "Tests generated from human reviews", sc: NS, l: NS, sm: "Generated tests", o: "exec", r: 2, a: 2, c: "All review agents together solve about 40 % of tasks.", s: "2603.23448" },
    { n: "SWE-PRBench", d: "2026-03", f: "cr", t: "Review PRs at three frozen context levels", sc: "350 PRs", l: "Several", sm: "LLM judge, kappa 0.75", o: "judge", r: 2, a: 0, c: "All 8 models get worse as context grows, even with AST and import-graph context.", s: "2603.26130", g: "FoundryHQ-AI/swe-prbench" },
    { n: "MCR-Bench", d: "2026-08", f: "cr", t: "Multi-round review with defect state labels", sc: "2,269 tasks", l: "5 languages", sm: "Precision, recall, F1 with defect-state labels", o: "match", r: 2, a: 2, s: "2608.27442", g: "DeepSoftwareAnalytics/MCR-bench" },
    { n: "CRBugBench", d: "2026-10", f: "cr", t: "Does a review agent catch a real bug?", sc: "1,000 public plus 800 private tasks", l: NS, sm: "Bug caught within top-k comments", o: "match", r: 2, a: 2, c: "Best agent catches 71.9 % of bugs within its top five comments.", s: "2610.13668", g: "malusamayo/CRBugBench" },
    // Context and retrieval
    { n: "RepoQA", d: "2024-06", f: "cx", t: "Find a function from its description in long context", sc: "500 tasks, 50 repos", l: "5 languages", sm: "Search accuracy", o: "match", r: 2, a: 0, s: "2406.06025", g: "evalplus/repoqa" },
    { n: "Long Code Arena", d: "2024-06", f: "cx", t: "Six tasks that need project-wide context", sc: "6 datasets", l: "Several", sm: "Task-specific metrics", o: "match", r: 2, a: 0, s: "2406.11612", g: "JetBrains-Research/lca-baselines" },
    { n: "CodeRAG-Bench", d: "2024-06", f: "cx", t: "Does retrieval help generation?", sc: "3 task types, 5 document sources", l: "Python", sm: "Retrieval metrics and execution", o: "exec", r: 1, a: 0, c: "Generators fail to gain when context is short or hard to integrate (authors).", s: "2406.14497", g: "code-rag-bench/code-rag-bench" },
    { n: "LongCodeU", d: "2025-03", f: "cx", t: "Understanding long code, 8 tasks", sc: "8 tasks", l: "Python", sm: "Task-specific metrics", o: "match", r: 2, a: 0, c: "Models drop sharply beyond 32K tokens (authors).", s: "2503.04359" },
    { n: "LongCodeBench", d: "2025-05", f: "cx", t: "Comprehension and repair at up to 1M tokens", sc: "LongCodeQA and LongSWE-Bench", l: "Python", sm: "Multiple choice; tests for repair", o: "exec", r: 2, a: 0, s: "2505.07897", g: "Zteefano/long-code-bench" },
    { n: "SWE-Bench-CL", d: "2025-06", f: "cx", t: "Continual learning over ordered issues", sc: "Sequences from Verified", l: "Python", sm: "Forgetting and transfer metrics", o: "exec", r: 2, a: 2, c: "Built on Verified, so inherits its [problems](https://epoch.ai/benchmarks/swe-bench-verified/review).", s: "2507.00014", g: "thomasjoshi/agents-never-forget" },
    { n: "LoCoBench", d: "2025-09", f: "cx", t: "Long-context software scenarios", sc: "8,000 scenarios, 10K to 1M tokens", l: "10 languages", sm: "Multi-dimensional metrics", o: "match", r: 0, a: 0, c: "Scenarios are generated, not mined. An [agent version](2511.13998) followed.", s: "2509.09614", g: "SalesforceAIResearch/LoCoBench" },
    { n: "ContextBench", d: "2026-02", f: "cx", t: "How do agents retrieve and use code context?", sc: "1,136 tasks, 66 repos", l: "8 languages", sm: "Recall, precision and efficiency against human gold contexts", o: "match", r: 2, a: 2, c: "Sophisticated scaffolds add little; agents explore far more than they use.", s: "2602.05892", g: "EuniAI/ContextBench" },
    { n: "SWE-ContextBench", d: "2026-02", f: "cx", t: "Reuse experience from related earlier tasks", sc: "1,100 base plus 376 related tasks, 51 repos", l: "9 languages", sm: "Accuracy, runtime and tokens", o: "exec", r: 2, a: 2, s: "2602.08316" },
    { n: "SWE-QA-Pro", d: "2026-03", f: "cx", t: "Repository understanding on long-tail repos", sc: NS, l: NS, sm: "Answer quality", o: "judge", r: 2, a: 2, c: "Chosen to resist answers from memorised repositories.", s: "2603.16124", g: "TIGER-AI-Lab/SWE-QA-Pro" },
    { n: "ReCUBE", d: "2026-03", f: "cx", t: "Rebuild a masked file from the rest of the repo", sc: "40 functional subsets", l: "Python", sm: "Usage-aware tests, strict pass", o: "exec", r: 2, a: 1, c: "GPT-5 reaches 37.57 % strict pass with full context (authors).", s: "2603.25770", g: "JiseungHong/ReCUBE" },
    { n: "Time-consistent benchmark", d: "2026-03", f: "cx", t: "With and without repo knowledge from before a cutoff", sc: "2 repositories in the baseline study", l: NS, sm: "Matched A/B comparison", o: "exec", r: 2, a: 2, s: "2603.26137" },
    { n: "StackRepoQA", d: "2026-03", f: "cx", t: "Real developer questions about Java projects", sc: "1,318 questions, 134 projects", l: "Java", sm: "Answer accuracy", o: "judge", r: 2, a: 1, c: "Compares file-level and graph-based retrieval.", s: "2603.26567" },
    { n: "SWE-QA", d: "2026-04", f: "cx", t: "Multi-hop comprehension, including declaration and call links", sc: "9,072 questions, 12 repos", l: "Python", sm: "Multiple choice", o: "match", r: 2, a: 0, c: "Built from the SWE-bench repositories, so memorisation is a risk (our reading).", s: "2604.24814", g: "lailanelkoussy/swe-qa" },
    { n: "SWE-Explore", d: "2026-06", f: "cx", t: "Rank relevant code regions under a line budget", sc: "848 issues, 203 repos", l: "10 languages", sm: "Coverage and ranking against trajectory-derived truth", o: "match", r: 2, a: 2, s: "2606.07297", g: "Qiushao-E/SWE-Explore-Bench" },
    { n: "CORE-Bench", d: "2026-06", f: "cx", t: "Retrieval for agentic coding at three levels", sc: "Over 180K queries", l: "Several", sm: "Relevance labels", o: "match", r: 2, a: 0, s: "2606.11864", g: "zhangfw123/CORE-Bench-Eval" },
    { n: "Reinhartz-Berger et al.", d: "2026", f: "cx", t: "Typed context × generation or reuse (the supervisor's paper)", sc: "240 runs", l: "Java", sm: "Compile and test rates", o: "exec", r: 2, a: 0, c: "Small sample and no significance tests (authors).", s: "research-project/paper-software-reuse-variability.html", mn: "Manuscript, no public benchmark" },
    { n: "CABRA", d: "2026-10", f: "cx", t: "Synthetic tasks built as call-graph transformations", sc: "6,840 tasks", l: NS, sm: "Task accuracy across four difficulty axes", o: "verify", r: 0, a: 2, c: "Agents stay near-perfect because tools trivialise the tasks; synthetic by design.", s: "2610.10610", g: "microsoft/CABRA" },
    // Testing, security, performance, migration, editing
    { n: "TestEval", d: "2024-06", f: "ot", t: "Generate tests for coverage targets", sc: "210 programs", l: "Python", sm: "Line, branch and path coverage", o: "exec", r: 0, a: 0, s: "2406.04531", g: "LLM4SoftwareTesting/TestEval" },
    { n: "SWT-Bench", d: "2024-06", f: "ot", t: "Turn an issue into a reproducing test", sc: NS, l: "Python", sm: "Test outcome on buggy and fixed code", o: "exec", r: 2, a: 1, s: "2406.12952", g: "logic-star-ai/swt-bench" },
    { n: "TestGenEval", d: "2024-10", f: "ot", t: "Unit test authoring and completion", sc: "68,647 tests, 11 repos", l: "Python", sm: "Coverage and mutation score", o: "exec", r: 2, a: 0, s: "2410.00752", g: "facebookresearch/testgeneval" },
    { n: "RepoTransBench", d: "2024-12", f: "ot", t: "Translate a whole repository", sc: "1,897 repos, 13 language pairs", l: "Multiple", sm: "Executable test suites", o: "exec", r: 2, a: 2, s: "2412.17744", g: "DeepSoftwareAnalytics/RepoTransBench" },
    { n: "CWEval", d: "2025-01", f: "ot", t: "Functional and secure code at the same time", sc: NS, l: NS, sm: "Outcome tests for function and security", o: "exec", r: 0, a: 0, s: "2501.08200", g: "Co1lin/CWEval" },
    { n: "BaxBench", d: "2025-02", f: "ot", t: "Build correct and secure backends", sc: "392 tasks", l: "Several", sm: "Function tests and exploits", o: "exec", r: 0, a: 0, s: "2502.11844", g: "logic-star-ai/baxbench" },
    { n: "MigrationBench", d: "2025-05", f: "ot", t: "Migrate Java 8 repositories to current LTS", sc: "5,102 repos, 300 selected", l: "Java", sm: "Migration evaluation framework", o: "exec", r: 2, a: 2, s: "2505.09569", g: "amazon-science/MigrationBench" },
    { n: "SWE-Perf", d: "2025-07", f: "ot", t: "Optimise performance in a real repo", sc: "140 instances", l: NS, sm: "Runtime gain against expert patch", o: "exec", r: 2, a: 1, c: "[Only 11 of 140 reference patches](2607.01211) hold in every cross-machine replay.", s: "2507.12415", g: "SWE-Perf/SWE-Perf" },
    { n: "SecureVibeBench", d: "2025-09", f: "ot", t: "Tasks where humans once introduced a vulnerability", sc: "105 tasks, 41 projects", l: "C, C++", sm: "Functional tests, static and dynamic oracles", o: "exec", r: 2, a: 2, s: "2509.22097", g: "iCSawyer/SecureVibeBench" },
    { n: "SWE-fficiency", d: "2025-11", f: "ot", t: "Speed up real workloads", sc: "498 tasks, 9 repos", l: "Python", sm: "Speedup against expert plus unit tests", o: "exec", r: 2, a: 2, c: "[411 of 498 reference patches](2607.01211) hold in every cross-machine replay.", s: "2511.06090", g: "swefficiency/swefficiency" },
    { n: "EDIT-Bench", d: "2025-11", f: "ot", t: "Instructed edits from real assistant usage", sc: "540 problems", l: "Multiple", sm: "Tests", o: "exec", r: 1, a: 0, c: "[Audit](2604.05100): over 90 % of evaluation is on Python.", s: "2511.04486", g: "waynchi/editbench" },
    { n: "SusVibes", d: "2025-12", f: "ot", t: "Feature requests where humans once shipped a flaw", sc: "186 tasks", l: "Python", sm: "Functional and security tests", o: "exec", r: 2, a: 2, c: "SWE-agent with Claude 4 Sonnet: 57 % correct, 11.8 % secure.", s: "2512.03262", g: "LeiLiLab/susvibes" },
    { n: "SABER", d: "2026-05", f: "ot", t: "Operational safety in stateful project workspaces", sc: NS, l: NS, sm: "Final environment state", o: "verify", r: 1, a: 2, s: "2606.01317", g: "sssr-lab/saber" },
  ];

  // Repository state from the GitHub API, read on 30 Oct 2026: [last push, archived].
  const GH = {
    "microsoft/CodeXGLUE": ["2024-04-23"], "hendrycks/apps": ["2024-06-19"], "openai/human-eval": ["2026-10-16"], "nuprl/MultiPL-E": ["2026-04-12"], "THUDM/CodeGeeX": ["2024-08-13"],
    "FudanSELab/ClassEval": ["2024-10-24"], "LiveCodeBench/LiveCodeBench": ["2025-07-16"], "THUDM/NaturalCodeBench": ["2024-10-14"], "bigcode-project/bigcodebench": ["2026-01-03", 1],
    "CodeEval-Pro/CodeEval-Pro": ["2025-04-07"], "GavinZhengOI/LiveCodeBench-Pro": ["2025-12-13"], "microsoft/devbench": ["2026-05-16"], "Multi-LCB/Multi-LCB": ["2026-04-28"],
    "microsoft/CodeT": ["2024-11-01"], "Leolty/repobench": ["2024-08-16"], "amazon-science/cceval": ["2025-08-15"], "CoderEval/CoderEval": ["2024-12-25"], "seketeam/EvoCodeBench": ["2024-08-15"],
    "seketeam/DevEval": ["2024-09-04"], "java-bench/JavaBench": ["2024-09-02"], "FSoft-AI4Code/RepoExec": ["2026-01-08"], "lt-asset/REPOCOD": ["2025-08-27"], "commit-0/commit0": ["2026-02-24"],
    "microsoft/DI-Bench": ["2026-10-19"], "microsoft/FEA-Bench": ["2026-01-28"], "RyanLoil/ProjectEval": ["2026-10-26"], "AGI-Eval-Official/CoreCodeBench": ["2025-11-20"],
    "Doc2Feat-bench/Doc2Feat-bench": ["2026-08-01"], "SCUNLP/E2EDev": ["2025-10-16"], "LiberCoders/FeatureBench": ["2026-09-15"], "facebookresearch/ProgramBench": ["2026-10-12"],
    "epoch-research/MirrorCode": ["2026-09-15"], "SWE-bench/SWE-bench": ["2026-09-18"], "multi-swe-bench/multi-swe-bench-env": ["2024-09-10"], "SWE-Gym/SWE-Gym": ["2025-07-29"],
    "openai/SWELancer-Benchmark": ["2025-07-18", 1], "multi-swe-bench/multi-swe-bench": ["2025-12-18"], "amazon-science/SWE-PolyBench": ["2026-08-14"], "SWE-rebench/SWE-bench-fork": ["2026-06-03"],
    "microsoft/SWE-bench-Live": ["2026-09-25"], "MERA-Evaluation/repotest": ["2026-02-13"], "scaleapi/SWE-bench_Pro-os": ["2026-09-22"], "seal-research/OmniCode": ["2026-04-17"],
    "datacurve-ai/deep-swe": ["2026-08-26"], "open-compass/AgentCompass": ["2026-10-30"], "allenai/super-benchmark": ["2025-04-04"], "OSU-NLP-Group/ScienceAgentBench": ["2026-07-18"],
    "openai/mle-bench": ["2026-04-24"], "QuantaAlpha/GitTaskBench": ["2025-09-22"], "CodeClash-ai/CodeClash": ["2026-07-16"], "harbor-framework/terminal-bench": ["2026-10-30"],
    "SKYLENAGE-AI/SWE-CI": ["2026-06-10"], "SprocketLab/slop-code-bench": ["2026-09-22"], "scaleapi/SWE-Atlas": ["2026-10-13"], "EuniAI/TerminalWorld": ["2026-05-31"],
    "jlab-nlp/dialogue_swe_bench": ["2026-10-23"], "scaleapi/SWE-Interact": ["2026-06-30"], "agent-lens/agent-lens-bench": ["2026-09-02"], "atharva-naik/CRScore": ["2025-11-14"],
    "ZZR0/SWRench": ["2026-06-05"], "codefuse-ai/SWE-CARE": ["2026-05-07"], "kinesiatricssxilm14/ContextCRBench": ["2026-02-27"], "FoundryHQ-AI/swe-prbench": ["2026-03-30"],
    "DeepSoftwareAnalytics/MCR-bench": ["2026-05-12"], "malusamayo/CRBugBench": ["2026-10-08"], "evalplus/repoqa": ["2024-11-01"], "JetBrains-Research/lca-baselines": ["2025-03-30"],
    "code-rag-bench/code-rag-bench": ["2024-11-15"], "Zteefano/long-code-bench": ["2025-09-05"], "thomasjoshi/agents-never-forget": ["2025-05-18"], "SalesforceAIResearch/LoCoBench": ["2026-06-02"],
    "EuniAI/ContextBench": ["2026-06-12"], "TIGER-AI-Lab/SWE-QA-Pro": ["2026-06-26"], "JiseungHong/ReCUBE": ["2026-10-13"], "lailanelkoussy/swe-qa": ["2026-03-09"],
    "Qiushao-E/SWE-Explore-Bench": ["2026-08-23"], "zhangfw123/CORE-Bench-Eval": ["2026-07-13"], "microsoft/CABRA": ["2026-10-09"], "LLM4SoftwareTesting/TestEval": ["2025-01-27"],
    "logic-star-ai/swt-bench": ["2026-10-26"], "facebookresearch/testgeneval": ["2026-03-12"], "DeepSoftwareAnalytics/RepoTransBench": ["2025-11-18"], "Co1lin/CWEval": ["2026-07-30"],
    "logic-star-ai/baxbench": ["2026-01-30"], "amazon-science/MigrationBench": ["2026-10-15"], "SWE-Perf/SWE-Perf": ["2025-10-28"], "iCSawyer/SecureVibeBench": ["2026-10-28"],
    "swefficiency/swefficiency": ["2026-02-17"], "waynchi/editbench": ["2026-04-07"], "LeiLiLab/susvibes": ["2026-10-22"], "sssr-lab/saber": ["2026-10-26"],
  };
  // active: pushed within six months of the read date; quiet: within a year; dormant: longer; archived: GitHub flag.
  function maint(b) {
    if (b.mn) return { k: "na", t: b.mn };
    const r = GH[b.g];
    if (!r) return { k: "na", t: "No repository found" };
    const [d, arch] = r;
    if (arch) return { k: "arch", t: `Archived, last push ${d}` };
    const k = d >= "2026-04-30" ? "ok" : d >= "2025-10-30" ? "quiet" : "dormant";
    return { k, t: `${{ ok: "Active", quiet: "Quiet", dormant: "Dormant" }[k]}, last push ${d}` };
  }
  const when = b => { const [y, m] = b.d.split("-"); return Number(y) + (m ? (Number(m) - 0.5) / 12 : 0.5); };
  const yearOf = b => Number(b.d.slice(0, 4));
  const srcUrl = b => b.s.startsWith("http") ? b.s : b.s.startsWith("research-project/") ? b.s : ax(b.s);
  const srcLabel = b => b.s.startsWith("http") ? "Source page" : b.s.startsWith("research-project/") ? "Our write-up" : `arXiv ${b.s}`;

  // ---------------------------------------------------------------------------------------------------------
  // 1. Hero: share of tasks that independent checks found defective. Definitions differ per audit.
  // ---------------------------------------------------------------------------------------------------------
  const AUDIT = [
    { n: "SWE-Bench Pro", who: "Gabor", when: "Feb 2026", v: 83, of: "83 of 100 sampled", note: "any issue, including requirements inflation; count as reported by Epoch", u: "https://epoch.ai/benchmarks/swe-bench-pro/review" },
    { n: "Terminal-Bench 4.0.0", who: "Epoch", when: "Sep 2026", v: 45.5, of: "30 of 66 tasks", note: "publicly noted scoring defects", u: "https://epoch.ai/benchmarks/terminal-bench-4/review" },
    { n: "Terminal-Bench 2.0", who: "maintainers", when: "May 2026", v: 31.5, of: "28 of 89 tasks", note: "fixed in version 2.1", u: "https://www.tbench.ai/news/terminal-bench-2-1" },
    { n: "SWE-Bench Pro", who: "OpenAI", when: "Jul 2026", v: 30, lo: 27.4, hi: 34.1, of: "about 30 % of 731", note: "pipeline 200 tasks, human review 249", u: "https://openai.com/index/separating-signal-from-noise-coding-evaluations/" },
    { n: "DeepSWE v1.1", who: "Epoch", when: "Sep 2026", v: 20.4, of: "23 of 113 tasks", note: "false negatives only, a lower bound", u: "https://epoch.ai/benchmarks/deepswe/review" },
    { n: "SWE-bench Verified", who: "OpenAI", when: "Feb 2026", v: 16.4, floor: 1, of: "82 of 500 at least", note: "59.4 % of the 138 audited; floor over the full set as computed by Epoch", u: "https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/" },
  ];
  CHARTS.audit = narrow => {
    const W = narrow ? 360 : 760, L = narrow ? 14 : 214, R = narrow ? 40 : 56, T = 22, rh = narrow ? 50 : 34, bh = narrow ? 12 : 15, max = 90;
    const x = v => L + v / max * (W - L - R), H = T + AUDIT.length * rh + 24;
    let out = [0, 20, 40, 60, 80].map(v => `<line class="grid" x1="${x(v)}" x2="${x(v)}" y1="${T - 4}" y2="${H - 22}"/><text class="tick" x="${x(v)}" y="${H - 6}" text-anchor="middle">${v} %</text>`).join("");
    out += `<line class="thresh" x1="${x(20)}" x2="${x(20)}" y1="${T - 12}" y2="${H - 22}"/><text class="lbl" x="${x(20) + 5}" y="${T - 8}" font-size="11.5">Epoch rates a benchmark Flawed from 20 %</text>`;
    AUDIT.forEach((d, i) => { const y = T + i * rh + (narrow ? 18 : 6);
      const name = `${d.n}, ${d.who}`;
      out += `<g class="pt" tabindex="0" data-tip="${esc(`<b>${name}, ${d.when}</b>${d.of}<br>${d.note}`)}">
        <rect class="hit" x="${L}" y="${y - 6}" width="${W - L - R}" height="${bh + 12}"/>
        <path class="bar s1 anchor" d="${hbar(x(0), x(d.v), y, bh)}"/>
        ${d.lo ? `<line class="whisker" x1="${x(d.lo)}" x2="${x(d.hi)}" y1="${y + bh / 2}" y2="${y + bh / 2}"/><line class="whisker" x1="${x(d.lo)}" x2="${x(d.lo)}" y1="${y + 2}" y2="${y + bh - 2}"/><line class="whisker" x1="${x(d.hi)}" x2="${x(d.hi)}" y1="${y + 2}" y2="${y + bh - 2}"/>` : ""}
        <text class="cat" x="${narrow ? L : L - 10}" y="${narrow ? y - 5 : y + bh / 2 + 4}" text-anchor="${narrow ? "start" : "end"}" font-size="${narrow ? 12 : 13}">${esc(name)}</text>
        <text class="val" x="${x(d.hi || d.v) + 6}" y="${y + bh / 2 + 4}">${d.floor ? "≥ " : d.lo ? "~" : ""}${num(d.v, 1)} %</text></g>`; });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Share of tasks found defective by audits: SWE-Bench Pro 83 percent in one sample and about 30 percent in another, Terminal-Bench 4.0.0 45.5, Terminal-Bench 2.0 31.5, DeepSWE 20.4, SWE-bench Verified at least 16.4. Epoch's threshold for Flawed is 20 percent.">${out}</svg>`;
  };
  const auditTable = () => tbl("Table view of the audits", ["Benchmark", "Audited by", "Date", "Share", "Basis", "Source"],
    AUDIT.map(d => ({ cells: [esc(d.n), esc(d.who), d.when, `${d.floor ? "≥ " : d.lo ? "~" : ""}${num(d.v, 1)} %`, esc(`${d.of}: ${d.note}`), link("open", d.u)] })));

  // ---------------------------------------------------------------------------------------------------------
  // 2. What happens to a score when someone re-checks it.
  // ---------------------------------------------------------------------------------------------------------
  const SHIFT = [
    { n: "Top agent, SWE-bench Verified", a: 78.8, b: 62.2, how: "stronger tests, SWE-ABS 2026", u: ax("2603.00520") },
    { n: "SWE-agent + GPT-4, SWE-bench", a: 12.47, b: 3.97, how: "leaked and weakly tested tasks removed, SWE-Bench+ 2024", u: ax("2410.06992") },
    { n: "Opus 4.6 with Claude Code, Terminal-Bench", a: 58.0, b: 70.1, how: "broken tasks fixed, 2.0 to 2.1", u: "https://www.tbench.ai/news/terminal-bench-2-1" },
  ];
  CHARTS.shift = narrow => {
    const W = narrow ? 360 : 760, L = narrow ? 34 : 290, R = narrow ? 30 : 40, T = 8, rh = narrow ? 54 : 34, x = v => L + v / 100 * (W - L - R), H = T + SHIFT.length * rh + 24;
    let out = [0, 25, 50, 75, 100].map(v => `<line class="grid" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - 22}"/><text class="tick" x="${x(v)}" y="${H - 6}" text-anchor="middle">${v} %</text>`).join("");
    SHIFT.forEach((d, i) => { const y = T + i * rh + (narrow ? 30 : 16), lo = Math.min(d.a, d.b), hi = Math.max(d.a, d.b);
      out += `<g class="pt" tabindex="0" data-tip="${esc(`<b>${d.n}</b>${d.a} % → ${d.b} %<br>${d.how}`)}">
        <rect class="hit" x="${L}" y="${y - 12}" width="${W - L - R}" height="24"/>
        <line class="link" x1="${x(lo)}" x2="${x(hi)}" y1="${y}" y2="${y}"/>
        <circle class="dot f4 anchor" cx="${x(d.a)}" cy="${y}" r="6"/><circle class="dot f1" cx="${x(d.b)}" cy="${y}" r="6"/>
        <text class="cat" x="${narrow ? 8 : L - 12}" y="${narrow ? y - 14 : y + 4}" text-anchor="${narrow ? "start" : "end"}" font-size="${narrow ? 12 : 13}">${esc(d.n)}</text>
        <text class="val" x="${x(d.a) + (d.a > d.b ? 10 : -10)}" y="${y + 4}" text-anchor="${d.a > d.b ? "start" : "end"}">${d.a}</text>
        <text class="val" x="${x(d.b) + (d.a > d.b ? -10 : 10)}" y="${y + 4}" text-anchor="${d.a > d.b ? "end" : "start"}">${d.b}</text></g>`; });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Score before and after a re-check: 78.8 to 62.2 percent, 12.47 to 3.97 percent, and 58.0 up to 70.1 percent.">${out}</svg>`;
  };
  const shiftTable = () => tbl("Table view of the re-checks", ["Case", "Reported", "After the re-check", "What changed", "Source"],
    SHIFT.map(d => ({ cells: [esc(d.n), `${d.a} %`, `${d.b} %`, esc(d.how), link("open", d.u)] })));

  // ---------------------------------------------------------------------------------------------------------
  // 3. Timeline: every catalogue entry as a dot, stacked within its family. Landmarks are named.
  // ---------------------------------------------------------------------------------------------------------
  const LAND = { HumanEval: "HumanEval", LiveCodeBench: "LiveCodeBench", RepoBench: "RepoBench", CoderEval: "CoderEval", ProgramBench: "ProgramBench", "SWE-bench": "SWE-bench", "SWE-bench Verified": "Verified", "SWE-Bench Pro": "SWE-Bench Pro",
    "Terminal-Bench": "Terminal-Bench", "SWR-Bench": "SWR-Bench", "CodeRAG-Bench": "CodeRAG-Bench", ContextBench: "ContextBench", "SWT-Bench": "SWT-Bench", "SWE-fficiency": "SWE-fficiency", MLE: "" };
  CHARTS.timeline = narrow => {
    const W = narrow ? 360 : 960, L = narrow ? 8 : 196, R = 14, T = 8, foot = 28, r = narrow ? 3.6 : 4.2, step = r * 2 + 1.4;
    const x0 = 2021, x1 = 2027, x = y => L + (y - x0) / (x1 - x0) * (W - L - R);
    const keys = Object.keys(FAM);
    const lanes = keys.map(k => { const items = B.filter(b => b.f === k).sort((a, b) => when(a) - when(b)), placed = [];
      items.forEach(b => { const cx = x(when(b)); let lvl = 0; while (placed.some(p => p.lvl === lvl && Math.abs(p.cx - cx) < step)) lvl++; placed.push({ b, cx, lvl }); });
      return { k, placed, depth: Math.max(...placed.map(p => p.lvl)) + 1 }; });
    let y = T, out = "";
    lanes.forEach(l => { const head = narrow ? 18 : 16, h = head + l.depth * step + 14;
      l.y = y; l.h = h; y += h; });
    const H = y + foot;
    for (let yr = 2021; yr <= 2027; yr++) out += `<line class="grid" x1="${x(yr)}" x2="${x(yr)}" y1="${T}" y2="${y}"/>` + (yr < 2027 ? `<text class="tick" x="${x(yr + 0.5)}" y="${H - 10}" text-anchor="middle">${narrow ? "’" + String(yr).slice(2) : yr}</text>` : "");
    lanes.forEach(l => { const base = l.y + l.h - 12;
      out += `<line class="axis" x1="${L}" x2="${W - R}" y1="${l.y + l.h}" y2="${l.y + l.h}"/>`;
      const parts = l.k === "ot" ? ["Testing, security,", "performance, migration"] : [FAM[l.k]];
      out += narrow ? `<text class="cat" x="${L}" y="${l.y + 13}" font-size="11.5">${esc(FAM[l.k])}</text>` : `<text class="cat" text-anchor="end" font-size="12.5">${parts.map((t, i) => `<tspan x="${L - 12}" y="${l.y + l.h / 2 + 4 + (i - (parts.length - 1) / 2) * 15}">${esc(t)}</tspan>`).join("")}</text>`;
      let right = -1e9;
      l.placed.forEach(p => { const cy = base - p.lvl * step, exec = p.b.o === "exec" || p.b.o === "verify";
        const name = !narrow && LAND[p.b.n], half = name ? name.length * 2.9 + 3 : 0, lab = name && p.cx - half > right && p.cx + half < W - R + 8;
        if (lab) right = p.cx + half;
        out += `<g class="pt" tabindex="0" data-tip="${esc(`<b>${p.b.n}, ${p.b.d}</b>${p.b.t}<br>${ORACLE[p.b.o]}`)}">
          <circle class="hit" cx="${p.cx}" cy="${cy}" r="${r + 3}"/>
          <circle class="tdot ${exec ? "ex" : "ng"} anchor" cx="${p.cx}" cy="${cy}" r="${r}"/>
          ${lab ? `<line class="stem" x1="${p.cx}" x2="${p.cx}" y1="${l.y + 15}" y2="${cy - r - 1}"/><text class="tl" x="${p.cx}" y="${l.y + 12}" text-anchor="middle">${esc(name)}</text>` : ""}</g>`; }); });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Timeline of ${B.length} benchmarks from 2021 to 2026 in eight families. Function benchmarks start in 2021, issue resolution in 2023, and code review, context and agent families fill up in 2025 and 2026.">${out}</svg>`;
  };
  const timelineTable = () => { const yrs = [2021, 2022, 2023, 2024, 2025, 2026];
    const rows = Object.keys(FAM).map(k => ({ cells: [esc(FAM[k]), ...yrs.map(y => String(B.filter(b => b.f === k && yearOf(b) === y).length)), String(B.filter(b => b.f === k).length)] }));
    rows.push({ sum: true, cells: ["All families", ...yrs.map(y => String(B.filter(b => yearOf(b) === y).length)), String(B.length)] });
    return tbl("Table view of the timeline: entries by family and year", ["Family", ...yrs.map(String), "Total"], rows); };

  // ---------------------------------------------------------------------------------------------------------
  // 4. How scoring changed: shares per year of the catalogue, counts in the tooltip and table.
  // ---------------------------------------------------------------------------------------------------------
  const OK = ["match", "exec", "verify", "judge"];
  const oracleByYear = () => [2021, 2022, 2023, 2024, 2025, 2026].map(y => { const inY = B.filter(b => yearOf(b) === y);
    return { y, n: inY.length, c: Object.fromEntries(OK.map(k => [k, inY.filter(b => b.o === k).length])) }; });
  CHARTS.oracle = narrow => {
    const W = narrow ? 360 : 760, L = narrow ? 48 : 56, R = 22, T = 8, rh = narrow ? 30 : 30, bh = 18, data = oracleByYear(), H = T + data.length * rh + 22;
    const x = v => L + v * (W - L - R);
    let out = [0, .25, .5, .75, 1].map(v => `<line class="grid" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - 22}"/><text class="tick" x="${x(v)}" y="${H - 6}" text-anchor="middle">${v * 100} %</text>`).join("");
    data.forEach((d, i) => { const y = T + i * rh + 4; let acc = 0;
      out += `<text class="cat" x="${L - 8}" y="${y + 13}" text-anchor="end">${d.y}</text>`;
      OK.forEach((k, j) => { const v = d.c[k] / d.n; if (!v) return; const x0 = x(acc), x1 = x(acc + v) - 2; acc += v;
        const tip = `<b>${d.y}: ${ORACLE[k]}</b>${d.c[k]} of ${d.n} entries`;
        out += `<g class="pt" tabindex="0" data-tip="${esc(tip)}"><rect class="bar s${j + 1} anchor" x="${x0}" y="${y}" width="${Math.max(1, x1 - x0)}" height="${bh}"/>${x1 - x0 > 22 ? `<text class="cl ${j === 3 ? "dark" : "light"}" x="${(x0 + x1) / 2}" y="${y + 13}" text-anchor="middle">${d.c[k]}</text>` : ""}</g>`; }); });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Share of catalogue entries per year by scoring route. Tests dominate every year; matching falls and hand-written verifiers and LLM judges appear from 2024 on.">${out}</svg>`;
  };
  const oracleTable = () => tbl("Table view of the scoring routes", ["Year", ...OK.map(k => esc(ORACLE[k])), "Entries"], oracleByYear().map(d => ({ cells: [String(d.y), ...OK.map(k => String(d.c[k])), String(d.n)] })));

  // ---------------------------------------------------------------------------------------------------------
  // 5. Leaderboards: same benchmark, several numbers. Each row carries its date and source.
  // ---------------------------------------------------------------------------------------------------------
  const KIND = { off: ["Official board", 1], lab: ["Lab statement or system card", 2], trk: ["Third-party tracker", 3], rec: ["Re-scored", "g"] };
  const LB = [
    { g: "SWE-bench Verified", rows: [
      { w: "SWE-bench board data", v: 79.2, k: "off", who: "Sonar Foundation Agent and live-SWE-agent, both on Claude 4.5 Opus", dt: "runs of Dec 2025; newest entry 26 Feb 2026", u: "https://www.swebench.com/verified.html" },
      { w: "OpenAI post", v: 80.9, k: "lab", who: "state of the art as OpenAI cites it", dt: "23 Feb 2026", u: "https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/" },
      { w: "llm-stats", v: 95.0, k: "trk", who: "Claude Fable 5", dt: `read ${READ}`, u: "https://llm-stats.com/benchmarks/swe-bench-verified" },
      { w: "SWE-ABS", v: 62.2, k: "rec", who: "the 78.8 % agent after stronger tests", dt: "Feb 2026", u: ax("2603.00520") } ] },
    { g: "SWE-Bench Pro, public set", rows: [
      { w: "Scale board", v: 61.5, k: "off", ci: 3.1, who: "Muse Spark 1.1 with mini-swe-agent", dt: `no date on the page; read ${READ}`, u: "https://labs.scale.com/leaderboard/swe_bench_pro_public" },
      { w: "OpenAI post", v: 80.3, k: "lab", who: "best frontier pass rate as OpenAI cites it", dt: "8 Jul 2026", u: "https://openai.com/index/separating-signal-from-noise-coding-evaluations/" },
      { w: "llm-stats, BenchLM", v: 89.9, k: "trk", who: "Claude Opus 5.5, from a system card of 28 Sep 2026", dt: `read ${READ}`, u: "https://benchlm.ai/benchmarks/swe-bench-pro" } ] },
    { g: "Terminal-Bench 2.0", rows: [
      { w: "tbench.ai", v: 84.7, k: "off", ci: 2.1, who: "GPT-5.5 in the NexAU-AHE agent", dt: `read ${READ}`, u: "https://www.tbench.ai/leaderboard/terminal-bench/2.0" },
      { w: "tbench.ai, other agent", v: 66.1, k: "off", ci: 2.5, who: "the same GPT-5.5 in the clnkr agent", dt: `read ${READ}`, u: "https://www.tbench.ai/leaderboard/terminal-bench/2.0" },
      { w: "BenchLM", v: 82, k: "trk", who: "GPT-5.5", dt: "as of 29 Oct 2026", u: "https://benchlm.ai/benchmarks/terminal-bench-2" } ] },
  ];
  CHARTS.boards = narrow => {
    const W = narrow ? 360 : 760, L = narrow ? 14 : 190, R = narrow ? 46 : 56, T = 6, rh = narrow ? 34 : 24, gh = 26, x = v => L + v / 100 * (W - L - R);
    let y = T, out = "", rows = "";
    LB.forEach(g => { rows += `<text class="grp" x="${narrow ? L : 8}" y="${y + 15}">${esc(g.g)}</text>`; y += gh;
      g.rows.forEach(r => { const c = KIND[r.k][1], cy = y + (narrow ? 22 : 12);
        rows += `<g class="pt" tabindex="0" data-tip="${esc(`<b>${r.w}: ${r.v} %${r.ci ? ` ± ${r.ci}` : ""}</b>${r.who}<br>${r.dt}`)}">
          <rect class="hit" x="${narrow ? L : 0}" y="${cy - 11}" width="${W - (narrow ? L : 0) - R + 30}" height="22"/>
          <line class="stem" x1="${x(0)}" x2="${x(r.v)}" y1="${cy}" y2="${cy}"/>
          <circle class="dot ${c === "g" ? "fg" : "f" + c} anchor" cx="${x(r.v)}" cy="${cy}" r="6"/>
          <text class="cat" x="${narrow ? L : L - 12}" y="${narrow ? cy - 9 : cy + 4}" text-anchor="${narrow ? "start" : "end"}" font-size="12.5">${esc(r.w)}</text>
          <text class="val" x="${x(r.v) + 11}" y="${cy + 4}">${r.v}${r.ci ? ` ±${r.ci}` : ""}</text></g>`;
        y += rh; });
      y += 4; });
    const H = y + 22;
    out = [0, 25, 50, 75, 100].map(v => `<line class="grid" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - 22}"/><text class="tick" x="${x(v)}" y="${H - 6}" text-anchor="middle">${v} %</text>`).join("") + rows;
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Top scores by source. SWE-bench Verified: 79.2 official, 80.9 OpenAI, 95.0 llm-stats, 62.2 re-scored. SWE-Bench Pro: 61.5 Scale, 80.3 OpenAI, 89.9 trackers. Terminal-Bench 2.0: 84.7 official, 66.1 for the same model in another agent, 82 BenchLM.">${out}</svg>`;
  };
  const boardsTable = () => tbl("Table view of the leaderboard numbers", ["Benchmark", "Source", "Score", "Who", "Date", "Link"],
    LB.flatMap(g => g.rows.map(r => ({ cells: [esc(g.g), esc(r.w), `${r.v} %${r.ci ? ` ± ${r.ci}` : ""}`, esc(r.who), esc(r.dt), link("open", r.u)] }))));

  // ---------------------------------------------------------------------------------------------------------
  // 6. Citation counts, Semantic Scholar batch API with an OpenAlex check for the first three.
  // ---------------------------------------------------------------------------------------------------------
  const CITES = [
    { n: "Codex / HumanEval, 2021", c: 12513, oa: "1,436 and 737 (two records)", id: "2107.03374" },
    { n: "MBPP, 2021", c: 4966, id: "2108.07732" },
    { n: "SWE-bench, 2023", c: 4630, oa: "71", id: "2310.06770" },
    { n: "LiveCodeBench, 2024", c: 2537, id: "2403.07974" },
    { n: "CodeXGLUE, 2021", c: 1653, id: "2102.04664" },
    { n: "APPS, 2021", c: 1371, id: "2105.09938" },
    { n: "BigCodeBench, 2024", c: 764, id: "2406.15877" },
    { n: "Terminal-Bench, 2026", c: 672, id: "2601.11868" },
    { n: "DS-1000, 2022", c: 659, id: "2211.11501" },
    { n: "RepoCoder / RepoEval, 2023", c: 647, oa: "171 and 10 (two records)", id: "2303.12570" },
    { n: "RepoBench, 2023", c: 483, id: "2306.03091" },
    { n: "SWE-Bench Pro, 2025", c: 347, id: "2509.16941" },
  ];
  CHARTS.cites = narrow => {
    const W = narrow ? 360 : 760, L = narrow ? 14 : 200, R = 62, T = 6, bh = narrow ? 11 : 14, gap = narrow ? 25 : 9, max = 13000, x = v => L + v / max * (W - L - R), H = T + CITES.length * (bh + gap) + 24;
    let out = [0, 5000, 10000].map(v => `<line class="grid" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - 22}"/><text class="tick" x="${x(v)}" y="${H - 6}" text-anchor="middle">${num(v)}</text>`).join("");
    CITES.forEach((d, i) => { const y = T + i * (bh + gap) + (narrow ? 14 : 0);
      out += `<g class="pt" tabindex="0" data-tip="${esc(`<b>${d.n}</b>${num(d.c)} citations, Semantic Scholar, ${READ}${d.oa ? `<br>OpenAlex: ${d.oa}` : ""}`)}">
        <rect class="hit" x="${L}" y="${y - 3}" width="${W - L - R}" height="${bh + 6}"/><path class="bar s1 anchor" d="${hbar(x(0), x(d.c), y, bh)}"/>
        <text class="cat" x="${narrow ? L : L - 10}" y="${narrow ? y - 4 : y + bh / 2 + 4}" text-anchor="${narrow ? "start" : "end"}" font-size="${narrow ? 11.5 : 13}">${esc(d.n)}</text>
        <text class="val" x="${x(d.c) + 6}" y="${y + bh / 2 + 4}">${num(d.c)}</text></g>`; });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Semantic Scholar citation counts, highest first: Codex and HumanEval 12,513; MBPP 4,966; SWE-bench 4,630; LiveCodeBench 2,537; CodeXGLUE 1,653.">${out}</svg>`;
  };
  const citesTable = () => tbl("Table view of the citation counts", ["Paper", "Semantic Scholar", "OpenAlex", "Paper link"], CITES.map(d => ({ cells: [esc(d.n), num(d.c), d.oa || "not checked", link(`arXiv ${d.id}`, ax(d.id))] })));

  // ---------------------------------------------------------------------------------------------------------
  // 7. The catalogue as a filterable table; the same rows become cards on a phone.
  // ---------------------------------------------------------------------------------------------------------
  const state = { fam: "all", repo: false, agent: false, live: false, q: "", all: false };
  const sym = { 2: ["yes", "●"], 1: ["partly", "◐"], 0: ["no", "○"] };
  const flag = v => `<span class="cv ${v === 2 ? "y" : v === 1 ? "p" : "n"}" aria-hidden="true">${sym[v][1]}</span> ${sym[v][0]}`;
  function row(b) {
    const m = maint(b), mcls = { ok: "ok", quiet: "quiet", dormant: "bad", arch: "bad", na: "" }[m.k], msym = { ok: "●", quiet: "◐", dormant: "○", arch: "▣", na: "–" }[m.k];
    return `<tr>
      <th scope="row"><b>${esc(b.n)}</b><span class="yr">${b.d.slice(0, 4)}, ${esc(FAM[b.f])}</span><span class="ln">${link(srcLabel(b), srcUrl(b))}${b.g ? ` ${link("repo", `https://github.com/${b.g}`)}` : ""}</span></th>
      <td data-l="Task"><div>${esc(b.t)}</div></td><td data-l="Scale"><div>${esc(b.sc)}</div></td><td data-l="Languages"><div>${esc(b.l)}</div></td><td data-l="Scoring"><div>${esc(b.sm)}</div></td>
      <td data-l="Real repo"><div>${flag(b.r)}</div></td><td data-l="Agentic"><div>${flag(b.a)}</div></td>
      <td data-l="Criticism"><div>${b.c ? rich(b.c) : `<span class="muted">None found</span>`}</div></td>
      <td data-l="Maintained"><div><span class="st-${mcls}" aria-hidden="true">${msym}</span> ${esc(m.t)}</div></td></tr>`;
  }
  function filtered() {
    const q = state.q.trim().toLowerCase();
    return B.filter(b => (state.fam === "all" || b.f === state.fam) && (!state.repo || b.r === 2) && (!state.agent || b.a === 2) && (!state.live || maint(b).k === "ok") &&
      (!q || [b.n, b.t, b.l, b.sm].join(" ").toLowerCase().includes(q))).sort((a, b) => when(b) - when(a));
  }
  function renderCatalogue() {
    const rows = filtered(), cap = RPViz.isNarrow() ? 10 : 20, short = !state.all && rows.length > cap, shown = short ? rows.slice(0, cap) : rows;
    document.getElementById("cat-rows").innerHTML = shown.map(row).join("") || `<tr><td colspan="9">No entry matches. Clear a filter to see more.</td></tr>`;
    document.getElementById("cat-count").textContent = `${shown.length} of ${rows.length} shown, newest first`;
    const more = document.getElementById("cat-more"); more.hidden = !short && !state.all; more.textContent = state.all ? "Show fewer" : `Show all ${rows.length} entries`;
  }
  const catalogue = () => `<div class="wide">
    <div class="filters" role="group" aria-label="Filter the catalogue">
      <div class="chips"><button type="button" class="tg" data-fam="all" aria-pressed="true">All families</button>${Object.entries(FAM).map(([k, v]) => `<button type="button" class="tg" data-fam="${k}" aria-pressed="false">${esc(v)}</button>`).join("")}</div>
      <div class="opts"><label><input type="checkbox" data-opt="repo"> Runs in a real repo</label><label><input type="checkbox" data-opt="agent"> Agentic</label><label><input type="checkbox" data-opt="live"> Active repo</label>
        <label class="s"><span>Search</span><input type="search" id="cat-q" placeholder="Name, task, language"></label><span id="cat-count" role="status"></span></div>
    </div>
    <div class="catalogue"><table><thead><tr><th scope="col">Benchmark</th><th scope="col">Task</th><th scope="col">Scale</th><th scope="col">Languages</th><th scope="col">Scoring</th><th scope="col">Real repo</th><th scope="col">Agentic</th><th scope="col">Criticism</th><th scope="col">Maintained</th></tr></thead><tbody id="cat-rows"></tbody></table></div><button type="button" class="tg more" id="cat-more"></button></div>`;
  function wireCatalogue() {
    const root = document.querySelector(".filters");
    root.addEventListener("click", e => { const b = e.target.closest("button[data-fam]"); if (!b) return; state.fam = b.dataset.fam;
      root.querySelectorAll("button[data-fam]").forEach(x => x.setAttribute("aria-pressed", x === b)); renderCatalogue(); });
    root.addEventListener("change", e => { const o = e.target.dataset.opt; if (o) { state[o] = e.target.checked; renderCatalogue(); } });
    document.getElementById("cat-q").addEventListener("input", e => { state.q = e.target.value; renderCatalogue(); });
    document.getElementById("cat-more").addEventListener("click", () => { state.all = !state.all; renderCatalogue(); });
    renderCatalogue();
  }
  const counts = () => ({ all: B.length, repo: B.filter(b => b.r === 2).length, agent: B.filter(b => b.a === 2).length, y26: B.filter(b => yearOf(b) === 2026).length, live: B.filter(b => maint(b).k === "ok").length, gone: B.filter(b => ["dormant", "arch"].includes(maint(b).k)).length, py: B.filter(b => b.l === "Python").length });

  return { READ, FAM, B, GH, counts, link, ax, auditTable, shiftTable, timelineTable, oracleTable, boardsTable, citesTable, catalogue, wireCatalogue, oracleByYear };
})();
