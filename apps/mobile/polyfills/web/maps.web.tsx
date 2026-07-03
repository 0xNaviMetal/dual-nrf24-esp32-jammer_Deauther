import WebMapView, * as WebMaps from '@teovilla/react-native-web-maps';
import React from 'react';

export const PROVIDER_GOOGLE = 'google';
export const PROVIDER_DEFAULT = undefined;

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const MapView = React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
  return (
    // @ts-expect-error — library default export is not typed as a valid JSX component
    <WebMapView
      ref={ref}
      provider={PROVIDER_GOOGLE}
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      {...props}
      options={{
        disableDefaultUI: true,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        rotateControl: false,
        scaleControl: false,
        keyboardShortcuts: false,
        ...(props.options as Record<string, unknown>),
      }}
    />
  );
});

// The library namespace export doesn't declare these members but they exist at runtime
const Maps = WebMaps as Record<string, unknown>;

// Copy the library's named members onto MapView as statics, but never spread the
// module namespace object directly. `WebMaps` is an ESM namespace whose `default`
// binding (re-exported via `export { MapView as default }`) is a read-only getter.
// Spreading it (`...WebMaps`) enumerates that `default` key, and the bundler's
// CJS/ESM interop then attempts to write `default` back onto a getter-only
// namespace, throwing "Cannot set property default of #<Object> which has only a
// getter" at module-eval time (surfaced inside <ContextNavigator>). Assign the
// named members explicitly instead.
const MAP_MEMBERS = [
  'Marker',
  'Callout',
  'Polyline',
  'Polygon',
  'Circle',
  'Geojson',
  'Overlay',
  'Heatmap',
  'UrlTile',
  'WMSTile',
  'LocalTile',
] as const;
for (const member of MAP_MEMBERS) {
  if (Maps[member] !== undefined) {
    (MapView as unknown as Record<string, unknown>)[member] = Maps[member];
  }
}
(MapView as unknown as Record<string, unknown>).PROVIDER_GOOGLE = PROVIDER_GOOGLE;
(MapView as unknown as Record<string, unknown>).PROVIDER_DEFAULT = PROVIDER_DEFAULT;

export const Marker = Maps.Marker;
export const Callout = Maps.Callout;
export const Polyline = Maps.Polyline;
export const Polygon = Maps.Polygon;
export const Circle = Maps.Circle;
export const Geojson = Maps.Geojson;
export const Overlay = Maps.Overlay;
export const Heatmap = Maps.Heatmap;
export const UrlTile = Maps.UrlTile;
export const WMSTile = Maps.WMSTile;
export const LocalTile = Maps.LocalTile;

export default MapView;
