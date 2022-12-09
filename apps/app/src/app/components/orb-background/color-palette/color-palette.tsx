import hsl from 'hsl-to-hex';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { random } from '@georgedoescode/generative-utils';

/**
 * ColorPalette class
 */
class ColorPalette {
  hue = 0;
  complimentaryHue1 = 0;
  complimentaryHue2 = 0;
  saturation = 0;
  lightness = 0;
  baseColor = '';
  complimentaryColor1 = '';
  complimentaryColor2 = '';
  colorChoices: [string, string, string] = ['', '', ''];

  constructor() {
    this.setColors();
    this.setCustomProperties();
  }

  setColors() {
    // Pick a random hue somewhere between 220 and 360
    this.hue = ~~random(220, 360);
    this.complimentaryHue1 = this.hue + 30;
    this.complimentaryHue2 = this.hue + 60;

    // Define a fixed saturation and lightness
    this.saturation = 95;
    this.lightness = 50;

    // Define a base color
    this.baseColor = hsl(this.hue, this.saturation, this.lightness);

    // Define a complimentary color, 30 degrees away from the base
    this.complimentaryColor1 = hsl(
      this.complimentaryHue1,
      this.saturation,
      this.lightness,
    );

    // Define a second complimentary color, 60 degrees away from the base
    this.complimentaryColor2 = hsl(
      this.complimentaryHue2,
      this.saturation,
      this.lightness,
    );

    // Store the color choices in an array so that a random one can be picked later
    this.colorChoices = [
      this.baseColor,
      this.complimentaryColor1,
      this.complimentaryColor2,
    ];
  }

  randomColor(): number {
    // Pick a random color
    return this.colorChoices[
      ~~random(0, this.colorChoices.length)
    ].replace('#', '0x') as unknown as number;
  }

  setCustomProperties() {
    // Set CSS custom properties so that the colors defined here can be used throughout the UI
    document.documentElement.style.setProperty('--hue', this.hue.toString());
    document.documentElement.style.setProperty(
      '--hue-complimentary1',
      this.complimentaryHue1.toString(),
    );
    document.documentElement.style.setProperty(
      '--hue-complimentary2',
      this.complimentaryHue2.toString(),
    );
  }
}

export default ColorPalette;
