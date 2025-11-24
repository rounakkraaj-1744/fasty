import { notFound } from 'next/navigation';
import { IntroductionPage } from '@/components/pages/IntroductionPage';
import { GettingStartedPage } from '@/components/pages/GettingStartedPage';
import { CoreAPIPage } from '@/components/pages/CoreAPIPage';
import { PluginSystemPage } from '@/components/pages/PluginSystemPage';
import { BuiltInPluginsPage } from '@/components/pages/BuiltInPluginsPage';
import { TransportsPage } from '@/components/pages/TransportsPage';
import { PerformancePage } from '@/components/pages/PerformancePage';
import { AdvancedUsagePage } from '@/components/pages/AdvancedUsagePage';
import { ExamplesPage } from '@/components/pages/ExamplesPage';
import { InstallationPage } from '@/components/pages/InstallationPage';
import { FAQPage } from '@/components/pages/FAQPage';
import { ContributingPage } from '@/components/pages/ContributingPage';
import { ChangelogPage } from '@/components/pages/ChangelogPage';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const slugToComponentMap: Record<string, React.ComponentType<{ pageId: string }> | React.ComponentType> = {
  // Introduction
  'what-is-fasty': IntroductionPage,
  'why-fasty': IntroductionPage,
  'key-concepts': IntroductionPage,
  'architecture': IntroductionPage,
  
  // Installation
  'installation': InstallationPage,
  
  // Getting Started
  'quick-start': GettingStartedPage,
  'basic-requests': GettingStartedPage,
  'error-handling': GettingStartedPage,
  'timeouts': GettingStartedPage,
  'json-parsing': GettingStartedPage,
  
  // Core API
  'constructor': CoreAPIPage,
  'get-method': CoreAPIPage,
  'post-method': CoreAPIPage,
  'put-method': CoreAPIPage,
  'delete-method': CoreAPIPage,
  'request-options': CoreAPIPage,
  'response-structure': CoreAPIPage,
  
  // Plugin System
  'how-plugins-work': PluginSystemPage,
  'plugin-lifecycle': PluginSystemPage,
  'plugin-interface': PluginSystemPage,
  'writing-plugins': PluginSystemPage,
  
  // Built-in Plugins
  'retry-plugin': BuiltInPluginsPage,
  'cache-plugin': BuiltInPluginsPage,
  
  // Transports
  'browser-transport': TransportsPage,
  'node-transport': TransportsPage,
  'transport-swap': TransportsPage,
  'deno-bun': TransportsPage,
  
  // Performance
  'performance-overview': PerformancePage,
  'benchmarks': PerformancePage,
  
  // Advanced Usage
  'custom-transports': AdvancedUsagePage,
  'interceptors': AdvancedUsagePage,
  'streaming': AdvancedUsagePage,
  'batching': AdvancedUsagePage,
  'circuit-breaker': AdvancedUsagePage,
  'react-usage': AdvancedUsagePage,
  'node-usage': AdvancedUsagePage,
  
  // Examples
  'examples-rest': ExamplesPage,
  'examples-github': ExamplesPage,
  'examples-nextjs': ExamplesPage,
  'examples-workers': ExamplesPage,
  'examples-node': ExamplesPage,
  
  // Other
  'faq': FAQPage,
  'contributing': ContributingPage,
  'changelog': ChangelogPage,
};

export default async function DocPage({ params }: PageProps) {
  // Await the params Promise
  const { slug } = await params;
  
  const Component = slugToComponentMap[slug];

  if (!Component) {
    notFound();
  }

  // Check if component needs pageId prop
  const needsPageId = [
    'what-is-fasty', 'why-fasty', 'key-concepts', 'architecture',
    'quick-start', 'basic-requests', 'error-handling', 'timeouts', 'json-parsing',
    'constructor', 'get-method', 'post-method', 'put-method', 'delete-method', 'request-options', 'response-structure',
    'how-plugins-work', 'plugin-lifecycle', 'plugin-interface', 'writing-plugins',
    'retry-plugin', 'cache-plugin',
    'browser-transport', 'node-transport', 'transport-swap', 'deno-bun',
    'performance-overview', 'benchmarks',
    'custom-transports', 'interceptors', 'streaming', 'batching', 'circuit-breaker', 'react-usage', 'node-usage',
    'examples-rest', 'examples-github', 'examples-nextjs', 'examples-workers', 'examples-node'
  ].includes(slug);

  if (needsPageId) {
    const ComponentWithProps = Component as React.ComponentType<{ pageId: string }>;
    return <ComponentWithProps pageId={slug} />;
  }

}

export function generateStaticParams() {
  return Object.keys(slugToComponentMap).map((slug) => ({
    slug,
  }));
}
