import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './sanity/schemaTypes';
import DeployTool from './sanity/components/DeployTool';
import { RocketIcon } from '@sanity/icons';

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'Hòn Sơn Xanh Studio',
  schema,
  plugins: [
    structureTool(),
  ],
  tools: (prev) => [
    ...prev,
    {
      name: 'deploy',
      title: 'Deploy Website',
      icon: RocketIcon,
      component: DeployTool,
    },
  ],
});
