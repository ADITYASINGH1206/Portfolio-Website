export interface OpenSourceContribution {
  id: string;
  repo: string;
  repoUrl: string;
  prNumber: number;
  prUrl: string;
  title: string;
  headline: string;
  problem: string;
  solution: string;
  category: "PyTensor" | "OpenVINO" | "Kestra";
  status: "merged";
  date: string;
  technologies: string[];
  impactBadge: string;
}

export const openSourceContributions: OpenSourceContribution[] = [
  {
    id: "pytensor-variance-ddof",
    repo: "pymc-devs/pytensor",
    repoUrl: "https://github.com/pymc-devs/pytensor",
    prNumber: 2495,
    prUrl: "https://github.com/pymc-devs/pytensor/pull/2495",
    title: "Multi-Axis Variance & Standard Deviation Normalization",
    headline: "Fixed mathematical divisor normalization across multi-dimensional tensor reductions with ddof > 0",
    problem: "PyTensor subtracted degrees of freedom from each dimension individually inside an iterative reduction loop, compounding divisor errors across multi-axis variance operations.",
    solution: "Normalized arbitrary axis configurations using variadic dimensional products, ensuring mathematically rigorous N - ddof sample variance scaling consistent with NumPy.",
    category: "PyTensor",
    status: "merged",
    date: "Oct 2026",
    technologies: ["Python", "PyTensor", "Symbolic Math", "NumPy", "Graph Compiler"],
    impactBadge: "Core Math Engine",
  },
  {
    id: "openvino-constant-shape-cache",
    repo: "openvinotoolkit/openvino",
    repoUrl: "https://github.com/openvinotoolkit/openvino",
    prNumber: 39903,
    prUrl: "https://github.com/openvinotoolkit/openvino/pull/39903",
    title: "Constant Operator Shape-Size Caching in Core Runtime",
    headline: "Cached shape dimensions to eliminate repeated recalculations during deep learning tensor inference",
    problem: "Graph execution repeatedly invoked shape_size(m_shape) on Constant operator nodes during shape inference, introducing avoidable CPU overhead in hot inference paths.",
    solution: "Refactored ov::op::v0::Constant to cache the scalar element count alongside its shape descriptor, accelerating graph compilation and inference validation.",
    category: "OpenVINO",
    status: "merged",
    date: "Nov 2026",
    technologies: ["C++", "OpenVINO Core", "Runtime Optimization", "Inference Engine"],
    impactBadge: "Core Runtime",
  },
  {
    id: "kestra-core-indent-filter",
    repo: "kestra-io/kestra",
    repoUrl: "https://github.com/kestra-io/kestra",
    prNumber: 21842,
    prUrl: "https://github.com/kestra-io/kestra/pull/21842",
    title: "Pebble Template Engine Numeric Coercion in Indent Filters",
    headline: "Hardened dynamic indentation filters against generic Number types in code generation templates",
    problem: "Templating filters in Kestra Core failed with ClassCastException when indentation width arguments were provided as generic Numbers rather than primitive Integers.",
    solution: "Added safe Number type coercion across IndentFilter and NindentFilter, ensuring reliable multi-line YAML and configuration generation in workflow pipelines.",
    category: "Kestra",
    status: "merged",
    date: "Oct 2026",
    technologies: ["Java", "Pebble Engine", "Orchestration", "YAML Generation"],
    impactBadge: "Core Engine",
  },
  {
    id: "kestra-aws-dynamodb-batch",
    repo: "kestra-io/plugin-aws",
    repoUrl: "https://github.com/kestra-io/plugin-aws",
    prNumber: 869,
    prUrl: "https://github.com/kestra-io/plugin-aws/pull/869",
    title: "Native DynamoDB BatchWriteItem Task for High-Throughput Ingestion",
    headline: "Engineered high-throughput batch ingestion task with chunking and exponential backoff",
    problem: "Enterprise workflows lacked an atomic, high-volume DynamoDB batch writer task, forcing inefficient sequential writes for large dataset synchronization.",
    solution: "Implemented BatchWriteItem supporting automated 25-item batch partitioning, concurrent flush buffers, and exponential backoff retry for unprocessed items.",
    category: "Kestra",
    status: "merged",
    date: "Nov 2026",
    technologies: ["Java", "AWS SDK v2", "DynamoDB", "Cloud Storage"],
    impactBadge: "New Feature",
  },
  {
    id: "kestra-azure-blob-storage",
    repo: "kestra-io/plugin-azure",
    repoUrl: "https://github.com/kestra-io/plugin-azure",
    prNumber: 390,
    prUrl: "https://github.com/kestra-io/plugin-azure/pull/390",
    title: "Azure Blob Storage Collision Prevention on Concurrent Uploads",
    headline: "Eliminated race-condition filename collisions during multi-file concurrent cloud uploads",
    problem: "Parallel execution tasks uploading multiple files to Azure containers experienced intermittent name collisions and inconsistent blob key normalization.",
    solution: "Enforced deterministic blob naming conventions and collision guards, ensuring robust parallel multi-file transfers in enterprise cloud workflows.",
    category: "Kestra",
    status: "merged",
    date: "Nov 2026",
    technologies: ["Java", "Azure SDK", "Blob Storage", "Concurrency"],
    impactBadge: "Cloud Storage",
  },
  {
    id: "kestra-ai-anthropic-tokens",
    repo: "kestra-io/plugin-ai",
    repoUrl: "https://github.com/kestra-io/plugin-ai",
    prNumber: 517,
    prUrl: "https://github.com/kestra-io/plugin-ai/pull/517",
    title: "Anthropic Claude Token Resolution & Configuration Fallback",
    headline: "Stabilized dynamic token limit handling across autonomous LLM pipeline tasks",
    problem: "Anthropic model tasks crashed during execution when maxTokens was either omitted by dynamic expressions or missing model-specific configuration defaults.",
    solution: "Implemented dynamic token resolution with fallback cascading from global configuration to model ceilings, ensuring fault-tolerant agent execution.",
    category: "Kestra",
    status: "merged",
    date: "Oct 2026",
    technologies: ["Java", "Anthropic API", "LLM Orchestration", "AI Plugins"],
    impactBadge: "AI & LLMs",
  },
];
