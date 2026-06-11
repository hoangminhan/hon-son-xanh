import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './sanity/schemaTypes';
import DeployTool from './sanity/components/DeployTool';
import { RocketIcon, CogIcon } from '@sanity/icons';

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'Hòn Sơn Xanh Studio',
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Nội dung')
          .items([
            // Cấu hình chung (Singleton)
            S.listItem()
              .title('Cấu Hình Chung')
              .icon(CogIcon)
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Các Document khác (Tour, Bài Viết, v.v.)
            ...S.documentTypeListItems().filter(
              (listItem) => !['siteSettings'].includes(listItem.getId())
            ),
          ]),
    }),
  ],
  tools: (prev) => [
    ...prev.filter((tool) => tool.name !== 'releases'),
    {
      name: 'deploy',
      title: 'Deploy Website',
      icon: RocketIcon,
      component: DeployTool,
    },
  ],
  document: {
    // Ẩn siteSettings khỏi nút "Create new document" ở header
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId !== 'siteSettings');
      }
      return prev;
    },
    // Vô hiệu hoá các hành động xoá, gỡ, nhân bản cho siteSettings
    actions: (prev, { schemaType }) => {
      if (schemaType === 'siteSettings') {
        return prev.filter(({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action));
      }
      return prev;
    },
  },
});
