import { safeFetch } from '../lib/sanity/client';
import { siteSettingsQuery } from '../lib/sanity/queries';
import FloatingContactsClient from './FloatingContactsClient';

export default async function FloatingContacts() {
  const settings = await safeFetch(siteSettingsQuery) || {};
  const zaloUrl = settings?.zaloUrl || 'https://zalo.me/0123456789';
  const facebookUrl = settings?.facebookUrl || 'https://facebook.com';
  const phone = settings?.phone || '0123456789';

  return (
    <FloatingContactsClient 
      facebookUrl={facebookUrl} 
      zaloUrl={zaloUrl} 
      phone={phone} 
    />
  );
}
