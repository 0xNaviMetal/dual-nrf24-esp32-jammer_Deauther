import { App } from 'expo-router/build/qualified-entry';
import { ScreenViewTracker } from './src/__create/analytics';

// Screen-view analytics is mounted here, in the entry, rather than in
// app/_layout. The entry is platform scaffold that ships with the template, so
// the tracker reaches every app on its next rebuild WITHOUT editing each
// project's own _layout (mirrors how App.web.tsx tracks navigation at the
// root). usePathname reads expo-router's global store.
export default function MobileRoot() {
  return (
    <>
      <ScreenViewTracker />
      <App />
    </>
  );
}
