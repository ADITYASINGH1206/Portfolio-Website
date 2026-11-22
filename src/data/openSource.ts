export type OpenSourceCategory = "PyTensor" | "OpenVINO" | "Kestra";

export interface OpenSourceContribution {
  id: string;
  repo: string;
  repoUrl: string;
  prNumber: number;
  prUrl: string;
  /** What the PR did, in one line. Reads like a changelog entry. */
  title: string;
  /** One plain-English sentence on the outcome. */
  summary: string;
  /** What was broken or missing. */
  problem: string;
  /** What the PR changed to fix it. */
  fix: string;
  category: OpenSourceCategory;
  status: "merged";
  /** ISO date the PR was merged. */
  mergedOn: string;
  technologies: string[];
  /** Short label for the kind of change. */
  kind: string;
}

// Newest first. Every entry below was checked against the merged PR on GitHub.
export const openSourceContributions: OpenSourceContribution[] = [
  {
    id: "openvino-constant-shape-cache",
    repo: "openvinotoolkit/openvino",
    repoUrl: "https://github.com/openvinotoolkit/openvino",
    prNumber: 39903,
    prUrl: "https://github.com/openvinotoolkit/openvino/pull/39903",
    title: "Cache the element count on ov::op::v0::Constant",
    summary: "Constant nodes no longer re-walk their shape every time the runtime asks for a size.",
    problem:
      "shape_size(m_shape) was recomputed in allocate_buffer(), get_byte_size(), evaluate() and other hot paths, an O(N) pass over the dimensions each call.",
    fix: "Computed the count once per constructor and refreshed it when deserialization changes the shape. Added tests for copies, reshapes and overflowing shapes.",
    category: "OpenVINO",
    status: "merged",
    mergedOn: "2026-11-20",
    technologies: ["C++", "OpenVINO Core", "Runtime"],
    kind: "Performance",
  },
  {
    id: "kestra-aws-dynamodb-batch",
    repo: "kestra-io/plugin-aws",
    repoUrl: "https://github.com/kestra-io/plugin-aws",
    prNumber: 869,
    prUrl: "https://github.com/kestra-io/plugin-aws/pull/869",
    title: "New DynamoDB BatchWriteItem task",
    summary: "Load large datasets into DynamoDB from a flow, from inline items or a file in Kestra storage.",
    problem: "Kestra had no task for high-volume DynamoDB writes, so bulk loads had no chunking or retry handling.",
    fix: "Splits writes into DynamoDB's 25-item batches, supports puts and deletes in one run, and retries unprocessed items with exponential backoff and jitter. Emits a written-items metric.",
    category: "Kestra",
    status: "merged",
    mergedOn: "2026-11-03",
    technologies: ["Java", "AWS SDK v2", "DynamoDB"],
    kind: "New feature",
  },
  {
    id: "kestra-azure-blob-storage",
    repo: "kestra-io/plugin-azure",
    repoUrl: "https://github.com/kestra-io/plugin-azure",
    prNumber: 390,
    prUrl: "https://github.com/kestra-io/plugin-azure/pull/390",
    title: "Consistent blob names on multi-file Azure uploads",
    summary: "Multi-file uploads now land in predictable paths, and same-named files can no longer overwrite each other.",
    problem:
      "The first file was written to the literal destination name while the rest got their filenames. Same-named files from different folders silently overwrote one another.",
    fix: "Every file is written to destination/<filename>. Duplicate targets are caught before any upload starts, and rendered JSON file lists are now parsed correctly.",
    category: "Kestra",
    status: "merged",
    mergedOn: "2026-11-02",
    technologies: ["Java", "Azure SDK", "Blob Storage"],
    kind: "Bug fix",
  },
  {
    id: "kestra-core-indent-filter",
    repo: "kestra-io/kestra",
    repoUrl: "https://github.com/kestra-io/kestra",
    prNumber: 21842,
    prUrl: "https://github.com/kestra-io/kestra/pull/21842",
    title: "Accept any Number in the indent and nindent filters",
    summary: "Templates that pass a flow input as the indent width now render instead of crashing.",
    problem:
      "The Pebble filters cast the amount straight to Long. Values from INT flow inputs arrive as Integer, which threw a ClassCastException.",
    fix: "Accepts any Number type, and rejects non-numeric input with a clear error message. Backported to the 2.0 and 1.3 release lines.",
    category: "Kestra",
    status: "merged",
    mergedOn: "2026-10-27",
    technologies: ["Java", "Pebble", "Kestra Core"],
    kind: "Bug fix",
  },
  {
    id: "kestra-ai-anthropic-tokens",
    repo: "kestra-io/plugin-ai",
    repoUrl: "https://github.com/kestra-io/plugin-ai",
    prNumber: 517,
    prUrl: "https://github.com/kestra-io/plugin-ai/pull/517",
    title: "Fix maxTokens resolution for Anthropic models",
    summary: "The token limit users configure is now the one that reaches the Anthropic API.",
    problem:
      "A duplicate builder call overwrote the provider-level maxTokens with null, so configured limits were never sent.",
    fix: "Uses the provider value first and falls back to the configuration value. The thinking budget is now validated against the resolved limit. Covered by a WireMock regression test.",
    category: "Kestra",
    status: "merged",
    mergedOn: "2026-10-26",
    technologies: ["Java", "Anthropic API", "LLM"],
    kind: "Bug fix",
  },
  {
    id: "pytensor-variance-ddof",
    repo: "pymc-devs/pytensor",
    repoUrl: "https://github.com/pymc-devs/pytensor",
    prNumber: 2495,
    prUrl: "https://github.com/pymc-devs/pytensor/pull/2495",
    title: "Correct multi-axis variance and std when ddof > 0",
    summary: "pt.var and pt.std now match NumPy when reducing over more than one axis.",
    problem:
      "ddof was subtracted from each reduced axis separately. On a 2×3 array the divisor came out as 2 instead of 5, returning 8.75 instead of 3.5.",
    fix: "The divisor is now N − ddof, with N taken as the product of all reduced axes. Added regression tests for multi-axis, negative-axis and dtype cases.",
    category: "PyTensor",
    status: "merged",
    mergedOn: "2026-10-18",
    technologies: ["Python", "PyTensor", "NumPy"],
    kind: "Bug fix",
  },
];

export function formatMergedDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
