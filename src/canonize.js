export default function canonize(color) {
  console.log(color);
  if (isHsl(color)) {
    return fromHsl(color);
  }
  if (isRgb(color)) {
    return fromRGB(color);
  }
  return fromHex(color);
}

function hslToRgb(h, s, l){
  var r, g, b;

  if(s == 0){
      r = g = b = l; // achromatic
  }else{
      var hue2rgb = function hue2rgb(p, q, t){
          if(t < 0) t += 1;
          if(t > 1) t -= 1;
          if(t < 1/6) return p + (q - p) * 6 * t;
          if(t < 1/2) return q;
          if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
  }
    let c1 = Math.round(r * 255).toString(16);
    if (c1.length < 2) c1 = c1+c1;
    let c2 = Math.round(g * 255).toString(16);
    if (c2.length < 2) c2 = c2+c2;
    let c3 = Math.round(b * 255).toString(16);
    if (c3.length < 2) c3 = c3+c3;

  return c1+c2+c3;
}
function isHsl(color) {
    color = color.toLowerCase().trim();
    const re = new RegExp('^hsl\\s*\\(\\s*(\\d+)\\s*,\\s*(\\d+)%\\s*,\\s*(\\d+)%\\s*\\)','i');
    const test = color.match(re);
    if (!test) {
        return false;
    }
    return true;
}
function fromHsl(color) {
    color = color.toLowerCase().trim();
    const re = new RegExp('^hsl\\s*\\(\\s*(\\d+)\\s*,\\s*(\\d+)%\\s*,\\s*(\\d+)%\\s*\\)','i');
    const test = color.match(re);
    if (!test) {
        throw "wrong hsl";
    }
    let c1 = parseInt(test[1], 10);
    let c2 = parseInt(test[2], 10);
    let c3 = parseInt(test[3], 10);
    if (c2 > 100) throw "wrong digit";
    if (c3 > 100) throw "wrong digit";
    const out = '#' + hslToRgb(c1/360, c2/100, c3/100);
    console.log(out);
    return out;
}


function isRgb(color) {
    color = color.toLowerCase().trim();
    const re = new RegExp('^rgb\\s*\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)\\s*\\)','i');
    const test = color.match(re);
    if (!test) {
        return false;
    }
    return true;
}
function fromRGB(color) {
    color = color.toLowerCase().trim();
    const re = new RegExp('^rgb\\s*\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)\\s*\\)','i');
    const test = color.match(re);
    if (!test) {
        throw "wrong rgb";
    }
    if (parseInt(test[1], 10) > 255) throw "wrong digit";
    if (parseInt(test[2], 10) > 255) throw "wrong digit";
    if (parseInt(test[3], 10) > 255) throw "wrong digit";
    let c1 = parseInt(test[1], 10).toString(16);
    if (c1.length < 2) c1 = c1+c1;
    let c2 = parseInt(test[2], 10).toString(16);
    if (c2.length < 2) c2 = c2+c2;
    let c3 = parseInt(test[3], 10).toString(16);
    if (c3.length < 2) c3 = c3+c3;
    const out = '#' + c1 + c2 + c3;
    console.log(out);
    return out;
}


function fromHex(color) {
    color = color.toLowerCase().trim();

    color = color.replace('#', '');

    const re = new RegExp('([a-f0-9]*)','i');
    const colorChars = color.match(re);
    if (colorChars[0] !== color) {
        throw "Invalid color chars";
    }
console.log(colorChars);
    
    if (color.length === 3) {
        color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
    }
    
    if (color.length !== 6) {
        throw "Invalid color length";
    }
    
    return '#' + color;
}