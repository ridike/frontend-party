const longHexRegex = /^#([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})$/i
const shortHexRegex = /^#([A-Fa-f0-9])([A-Fa-f0-9])([A-Fa-f0-9])$/i
const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/
const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*((0(\.\d+)?)|1)\)$/

export class Color {
  constructor(
    private r: number,
    private g: number,
    private b: number,
    private a: number) {}

  transparency(a: number) {
    return new Color(this.r, this.g, this.b, a)
  }

  css(): string {
    if (this.a === 1) {
      return `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}`
    }
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
  }

  static fromCss(css: string): Color {
    let match = longHexRegex.exec(css) || shortHexRegex.exec(css)
    if (match) {
      return new Color(
        parseInt(match[1], 16),
        parseInt(match[2], 16),
        parseInt(match[3], 16),
        1
      )
    }

    match = rgbRegex.exec(css)
    if (match) {
      return new Color(
        parseInt(match[1], 10),
        parseInt(match[2], 10),
        parseInt(match[3], 10),
        1
      )
    }

    match = rgbaRegex.exec(css)
    if (match) {
      return new Color(
        parseInt(match[1], 10),
        parseInt(match[2], 10),
        parseInt(match[3], 10),
        parseFloat(match[4])
      )
    }

    throw new Error(`Invalid color: ${css}`)
  }
}

export function transparency(color: string, value: number): string {
  return Color.fromCss(color).transparency(value).css()
}
