"use client"

import { DocLayout } from '../layout/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';

export function ContributingPage() {
  return (
    <DocLayout 
      title="Contributing"
      description="Help make fasty better"
    >
      <h2>Welcome!</h2>
      <p>
        Thank you for considering contributing to fasty! We welcome contributions from everyone, 
        whether it's a bug report, feature request, documentation improvement, or code contribution.
      </p>

      <h2>Getting Started</h2>
      
      <h3>1. Fork and Clone</h3>
      <CodeBlock code={`# Fork the repository on GitHub, then clone your fork
git clone https://github.com/rounakkraaj-1744/fasty.git
cd fasty

# Add the upstream repository
git remote add upstream https://github.com/rounakkraaj-1744/fasty.git`} language="bash" />

      <h3>2. Install Dependencies</h3>
      <CodeBlock code={`npm install`} language="bash" />

      <h3>3. Create a Branch</h3>
      <CodeBlock code={`git checkout -b feature/your-feature-name`} language="bash" />

      <h2>Development</h2>

      <h3>Project Structure</h3>
      <CodeBlock code={`fasty/
├── src/
│   ├── core/           # Core fasty implementation
│   ├── plugins/        # Built-in plugins
│   ├── transports/     # Transport implementations
│   ├── types/          # TypeScript type definitions
│   └── index.ts        # Main entry point
├── tests/
│   ├── unit/           # Unit tests
│   ├── integration/    # Integration tests
│   └── e2e/            # End-to-end tests
├── docs/               # Documentation
└── examples/           # Example projects`} />

      <h3>Running Tests</h3>
      <CodeBlock code={`# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- --testPathPattern=client.test.ts

# Run tests with coverage
npm run test:coverage`} language="bash" />

      <h3>Building</h3>
      <CodeBlock code={`# Build the project
npm run build

# Build in watch mode
npm run build:watch

# Type check
npm run type-check`} language="bash" />

      <h3>Linting</h3>
      <CodeBlock code={`# Run ESLint
npm run lint

# Auto-fix issues
npm run lint:fix`} language="bash" />

      <h2>Coding Conventions</h2>

      <h3>TypeScript Style</h3>
      <ul>
        <li>Use TypeScript for all code</li>
        <li>Prefer interfaces over types for object shapes</li>
        <li>Use explicit return types for public APIs</li>
        <li>Enable strict mode in TypeScript config</li>
        <li>Avoid <code>any</code> - use <code>unknown</code> if type is truly unknown</li>
      </ul>

      <CodeBlock code={`// Good
interface RequestConfig {
  url: string;
  method: string;
  headers?: Record<string, string>;
}

export function request(config: RequestConfig): Promise<Response> {
  // Implementation
}

// Avoid
function request(config: any): any {
  // Implementation
}`} />

      <h3>Code Style</h3>
      <ul>
        <li>2 spaces for indentation</li>
        <li>Single quotes for strings</li>
        <li>Semicolons required</li>
        <li>Use async/await over promises chains</li>
        <li>Prefer const over let when possible</li>
      </ul>

      <h3>Testing</h3>
      <ul>
        <li>Write tests for all new features</li>
        <li>Maintain or improve code coverage</li>
        <li>Test both success and error cases</li>
        <li>Use descriptive test names</li>
        <li>Mock external dependencies</li>
      </ul>

      <CodeBlock code={`describe('fasty', () => {
  describe('get()', () => {
    it('should make a GET request to the specified URL', async () => {
      const client = new fasty({ baseURL: 'https://api.example.com' });
      const response = await client.get('/users');
      expect(response).toBeDefined();
    });

    it('should throw an error for 404 responses', async () => {
      const client = new fasty({ baseURL: 'https://api.example.com' });
      await expect(client.get('/not-found')).rejects.toThrow();
    });
  });
});`} />

      <h3>Documentation</h3>
      <ul>
        <li>Add JSDoc comments for public APIs</li>
        <li>Update README.md for significant changes</li>
        <li>Add examples for new features</li>
        <li>Update TypeScript definitions</li>
      </ul>

      <CodeBlock code={`/**
 * Makes an HTTP GET request.
 * 
 * @param url - The URL to request
 * @param options - Optional request configuration
 * @returns Promise resolving to the response data
 * 
 * @example
 * \`\`\`ts
 * const data = await client.get('/users', {
 *   params: { page: 1 }
 * });
 * \`\`\`
 */
async get<T>(url: string, options?: RequestOptions): Promise<T> {
  // Implementation
}`} />

      <h2>Pull Request Process</h2>

      <h3>1. Make Your Changes</h3>
      <p>
        Write your code, add tests, and update documentation.
      </p>

      <h3>2. Commit Your Changes</h3>
      <CodeBlock code={`git add .
git commit -m "feat: add retry plugin with exponential backoff"

# Follow conventional commits:
# feat: new feature
# fix: bug fix
# docs: documentation changes
# test: test changes
# refactor: code refactoring
# chore: maintenance tasks`} language="bash" />

      <h3>3. Push and Create PR</h3>
      <CodeBlock code={`git push origin feature/your-feature-name

# Then create a pull request on GitHub`} language="bash" />

      <h3>4. PR Guidelines</h3>
      <ul>
        <li>Provide a clear description of the changes</li>
        <li>Reference any related issues</li>
        <li>Ensure all tests pass</li>
        <li>Update documentation as needed</li>
        <li>Request review from maintainers</li>
      </ul>

      <h2>Reporting Bugs</h2>
      <p>
        When reporting bugs, please include:
      </p>
      <ul>
        <li>fasty version</li>
        <li>Node.js/browser version</li>
        <li>Operating system</li>
        <li>Minimal reproduction code</li>
        <li>Expected vs actual behavior</li>
        <li>Error messages and stack traces</li>
      </ul>

      <h2>Requesting Features</h2>
      <p>
        Before requesting a feature:
      </p>
      <ul>
        <li>Check if it already exists</li>
        <li>Check if it's already been requested</li>
        <li>Explain the use case</li>
        <li>Provide examples of how it would work</li>
        <li>Consider if it can be implemented as a plugin</li>
      </ul>

      <h2>Writing Plugins</h2>
      <p>
        Consider contributing your plugin to the official plugin repository:
      </p>
      <ul>
        <li>Create well-documented, reusable plugins</li>
        <li>Add comprehensive tests</li>
        <li>Provide usage examples</li>
        <li>Follow the plugin API guidelines</li>
      </ul>

      <h2>Community</h2>
      <ul>
        <li><strong>GitHub Discussions</strong> - Ask questions, share ideas</li>
        <li><strong>Discord</strong> - Chat with the community</li>
        <li><strong>Twitter</strong> - Follow for updates</li>
      </ul>

      <h2>Code of Conduct</h2>
      <p>
        We are committed to providing a welcoming and inclusive environment. Please:
      </p>
      <ul>
        <li>Be respectful and considerate</li>
        <li>Welcome newcomers</li>
        <li>Accept constructive criticism</li>
        <li>Focus on what's best for the community</li>
      </ul>

      <h2>License</h2>
      <p>
        By contributing, you agree that your contributions will be licensed under the MIT License.
      </p>
    </DocLayout>
  );
}
