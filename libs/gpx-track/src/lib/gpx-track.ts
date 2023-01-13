import { gpx } from '@tmcw/togeojson';
import { TrackInterface } from '@trailpath/api-interface/track/track.interface';
import { TrackMetadataInterface } from '@trailpath/api-interface/track/track-metadata.interface';
import {
  Feature,
  FeatureCollection,
  GeoJSON,
  GeoJsonProperties,
  Geometry,
  LineString,
  MultiLineString,
  Point,
  Position,
} from 'geojson';
import togpx from 'togpx';
import { DOMParser } from 'xmldom';

export function gpxToTrack(gpxString: string, filename: string): TrackInterface {
  const gpxXml = new DOMParser().parseFromString(gpxString);

  const metadata = getMetadata(gpxXml);
  const geoJson: GeoJSON = gpx(gpxXml);

  const featureCollection: FeatureCollection = convert(geoJson);

  if (featureCollection.features.length === 0) {
    throw new Error(`No features found in GPX.`);
  }

  const points = featureCollection.features.filter((feature) => feature.geometry.type === 'Point') as Feature<Point>[];

  const tracks = featureCollection.features.filter((feature) =>
    ['LineString', 'MultiLineString'].includes(feature.geometry.type),
  ) as Feature<LineString | MultiLineString>[];

  if (tracks.length === 0) {
    throw new Error(`No track found in GPX.`);
  } else if (tracks.length > 1) {
    throw new Error(`Multiple tracks found in GPX.`);
  }

  let track: Feature<LineString>;

  if (tracks[0].geometry.type === 'MultiLineString') {
    const multilineStringFeature = tracks[0] as Feature<MultiLineString>;
    const coordinates = multilineStringFeature.geometry.coordinates.reduce((acc: Position[], curr: Position[]) => {
      return acc.concat(curr);
    }, []);

    track = {
      ...tracks[0],
      geometry: {
        type: 'LineString',
        coordinates,
      },
    };
  } else {
    track = tracks[0] as Feature<LineString>;
  }

  track = cleanProperties(track);

  return { points, track, filename, metadata };
}

export function trackToGpx({ track, metadata, points }: TrackInterface): string {
  return formatXml(
    togpx(
      {
        type: 'FeatureCollection',
        features: [...points, track],
      },
      { creator: 'trail-path', metadata },
    ),
  );
}

function convert(geoJson: GeoJSON): FeatureCollection {
  switch ((geoJson && geoJson.type) || null) {
    case 'FeatureCollection':
      return geoJson as FeatureCollection;
    case 'Feature':
      return {
        type: 'FeatureCollection',
        features: [geoJson as Feature],
      };
    case 'MultiPoint':
    case 'MultiPolygon':
    case 'MultiLineString':
    case 'GeometryCollection':
    case 'Point':
    case 'Polygon':
    case 'LineString':
      return {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: geoJson as Geometry,
            properties: {},
          },
        ],
      };
  }
}

function getMetadata(gpxXml: Document): TrackMetadataInterface {
  const metadata = gpxXml.getElementsByTagName('metadata').item(0);

  const [name, desc] = ['name', 'desc'].map((tag) => nodeVal(metadata?.getElementsByTagName(tag).item(0)));

  return { name, desc };
}

function nodeVal(node: Element | null | undefined): string {
  node?.normalize();
  return (node && node.textContent) || '';
}

function cleanProperties(track: Feature<LineString, GeoJsonProperties>): Feature<LineString, GeoJsonProperties> {
  Object.getOwnPropertyNames(track.properties)
    .filter((property) => !['name', 'desc'].includes(property))
    .forEach((property) => track.properties && delete track.properties[property]);

  return track;
}

function formatXml(xml: string) {
  let formatted = '',
    indent = '';
  const tab = '  ';
  xml.split(/>\s*</).forEach(function (node) {
    if (node.match(/^\/\w/)) indent = indent.substring(tab.length);
    formatted += indent + '<' + node + '>\r\n';
    if (node.match(/^<?\w[^>]*[^/]$/)) indent += tab;
  });
  return formatted.substring(1, formatted.length - 3);
}
