// Shared types for AI support system

export interface AdvancedSupportConfig {
  apiKey: string;
  financialConfig: any;
  completionConfig: any;
  protocolConfig: any;
}

export type UserLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Project {
  id: string;
  name: string;
  owner: string;
  currency: string;
  type: string;
  files: any[];
  dependencies?: string[];
  [key: string]: any;
}

export interface ProjectRequirements {
  features: string[];
  constraints?: any;
  [key: string]: any;
}

export interface AIFunction {
  name: string;
  description: string;
  parameters: any;
}

export interface AIServices {
  [key: string]: any;
}

export interface GeneratedCode {
  files: CodeFile[];
  tests: Test[];
  configurations: ConfigFile[];
  documentation: Documentation[];
}

export interface CodeFile {
  path: string;
  content: string;
  language: string;
}

export interface Test {
  path: string;
  content: string;
  framework: string;
}

export interface ConfigFile {
  path: string;
  content: string;
  format: string;
}

export interface Documentation {
  title: string;
  content: string;
  format: string;
}

export interface TestResults {
  unitTests: any;
  integrationTests: any;
  securityTests: any;
  performanceTests: any;
  coverage: number;
  passed: number;
  failed: number;
}

export interface ProjectAnalysis {
  projectStructure: any;
  missingComponents: MissingComponent[];
  codeQuality: any;
  dependencies: any;
  securityIssues: any[];
  performanceBottlenecks: any[];
  improvementSuggestions: string[];
}

export interface MissingComponent {
  id: string;
  type: 'api' | 'service' | 'module' | 'config' | 'test' | 'docs';
  name: string;
  description: string;
  requiresTests: boolean;
  userFacing: boolean;
}

export interface ProjectStructure {
  architecture: string;
  patterns: string[];
  techStack: string[];
  fileOrganization: string;
  dependencies: string[];
}
