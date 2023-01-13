declare let togpx: (geojson: GeoJson, options: Record<string, string | TrackMetadataInterface>) => string;

declare module 'togpx' {
  export = togpx;
}
