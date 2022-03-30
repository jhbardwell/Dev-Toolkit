let utils = {

    bezierCubic: function(p0, p1, p2, p3, t, pFinal) {
        pFinal = pFinal || {};
        pFinal.x = Math.pow(1 - t, 3) * p0.x + 
                   Math.pow(1 - t, 2) * 3 * t * p1.x + 
                   (1 - t) * 3 * t * t * p2.x + 
                   t * t * t * p3.x;
        pFinal.y = Math.pow(1 - t, 3) * p0.y + 
                   Math.pow(1 - t, 2) * 3 * t * p1.y + 
                   (1 - t) * 3 * t * t * p2.y + 
                   t * t * t * p3.y;
        return pFinal;
    },
    
    bezierMulticurve: function(points, context) {
        var p0, p1, midx, midy;
    
        context.moveTo(points[0].x, points[0].y);
    
        for(var i = 1; i < points.length - 2; i += 1) {
            p0 = points[i];
            p1 = points[i + 1];
            midx = (p0.x + p1.x) / 2;
            midy = (p0.y + p1.y) / 2;
            context.quadraticCurveTo(p0.x, p0.y, midx, midy);
        }
        p0 = points[points.length - 2];
        p1 = points[points.length - 1];
        context.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);
    },
    
    bezierQuadratic: function(p0, p1, p2, t, pFinal) {
        pFinal = pFinal || {};
        pFinal.x = Math.pow(1 - t, 2) * p0.x + 
                   (1 - t) * 2 * t * p1.x + 
                   t * t * p2.x;
        pFinal.y = Math.pow(1 - t, 2) * p0.y + 
                   (1 - t) * 2 * t * p1.y + 
                   t * t * p2.y;
        return pFinal;
    },

    clamp: function(value, min, max) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
    },

    collisionCircleVCircle: function(c0, c1) {
        return utils.distance(c0, c1) <= c0.radius + c1.radius;
    },

    collisionPointVCircle: function(x, y, circle) {
        return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
    },

    collisionPointVRectangle: function(x, y, rect) {
        return utils.rangeWithin(x, rect.x, rect.x + rect.width) &&
            utils.rangeWithin(y, rect.y, rect.y + rect.height);
    },

    collisionRectangleVRectangle: function(r0, r1) {
        return utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
            utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
    },

    convertDegreesToRadians: function(degrees) {
        return degrees / 180 * Math.PI;
    },

    convertRadiansToDegrees: function(radians) {
        return radians * 180 / Math.PI;
    },

    convertHexToHSL: function(H) {
        // Convert hex to RGB first
        let r = 0, g = 0, b = 0;
        if (H.length == 4) {
          r = "0x" + H[1] + H[1];
          g = "0x" + H[2] + H[2];
          b = "0x" + H[3] + H[3];
        } else if (H.length == 7) {
          r = "0x" + H[1] + H[2];
          g = "0x" + H[3] + H[4];
          b = "0x" + H[5] + H[6];
        }
        // Then to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r,g,b),
            cmax = Math.max(r,g,b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
      
        if (delta == 0)
          h = 0;
        else if (cmax == r)
          h = ((g - b) / delta) % 6;
        else if (cmax == g)
          h = (b - r) / delta + 2;
        else
          h = (r - g) / delta + 4;
      
        h = Math.round(h * 60);
      
        if (h < 0)
          h += 360;
      
        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
      
        return "hsl(" + h + "," + s + "%," + l + "%)";
      },

    convertHexToRGB: function(h) {
        let r = 0, g = 0, b = 0;
      
        // 3 digits
        if (h.length == 4) {
          r = "0x" + h[1] + h[1];
          g = "0x" + h[2] + h[2];
          b = "0x" + h[3] + h[3];
      
        // 6 digits
        } else if (h.length == 7) {
          r = "0x" + h[1] + h[2];
          g = "0x" + h[3] + h[4];
          b = "0x" + h[5] + h[6];
        }
        
        return "rgb("+ +r + "," + +g + "," + +b + ")";
      },

      convertHSLToHex: function(h,s,l) {
        h /= 100;
        s /= 100;
        l /= 100;
      
        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c/2,
            r = 0,
            g = 0, 
            b = 0; 
      
        if (0 <= h && h < 60) {
          r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
          r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
          r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
          r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
          r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
          r = c; g = 0; b = x;
        }
        // Having obtained RGB, convert channels to hex
        r = Math.round((r + m) * 255).toString(16);
        g = Math.round((g + m) * 255).toString(16);
        b = Math.round((b + m) * 255).toString(16);
      
        // Prepend 0s, if necessary
        if (r.length == 1)
          r = "0" + r;
        if (g.length == 1)
          g = "0" + g;
        if (b.length == 1)
          b = "0" + b;
      
        return "#" + r + g + b;
      },

      convertHSLToRGB: function(h,s,l) {
        // Must be fractions of 1
        h /= 100;
        s /= 100;
        l /= 100;
      
        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c/2,
            r = 0,
            g = 0,
            b = 0;
        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;  
            } 
        else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
            } 
        else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
            } 
        else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
            } 
        else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
            } 
        else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
            }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        
        return "rgb(" + r + "," + g + "," + b + ")";
      },

    convertRGBToHex: function(r,g,b){
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);
      
        if (r.length == 1)
          r = "0" + r;
        if (g.length == 1)
          g = "0" + g;
        if (b.length == 1)
          b = "0" + b;
      
        return "#" + r + g + b;
      },

      convertRGBToHSL: function(r,g,b) {
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;
      
        // Find greatest and smallest channel values
        let cmin = Math.min(r,g,b),
            cmax = Math.max(r,g,b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        
        // Calculate hue
        // No difference
        if (delta == 0)
            h = 0;
        // Red is max
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        // Green is max
        else if (cmax == g)
            h = (b - r) / delta + 2;
        // Blue is max
        else
            h = (r - g) / delta + 4;
        h = Math.round(h * 60);
        
        // Make negative hues positive behind 360°
        if (h < 0)
            h += 360;

        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
            
        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return "hsl(" + h + "," + s + "%," + l + "%)";
      },


    distance: function(p0, p1) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y;
        return Math.sqrt(dx * dx + dy * dy);
    },

    distanceXY: function(x0, y0, x1, y1) {
        var dx = x1 - x0,
            dy = y1 - y0;
        return Math.sqrt(dx * dx + dy * dy);
    },

    lerp: function(norm, min, max) {
        return (max - min) * norm + min;
    },

    map: function(value, sourceMin, sourceMax, destMin, destMax) {
        return utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax);
    },

    normalize: function(value, min, max) {
        return (value - min) / (max - min);
    },

    randomInt: function(min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    },

    randomArray: function(arr) {
        return Math.floor(Math.random() * (arr[arr.length - 1] + arr[0])) - arr[0];
    },
    
    rangeArray: function(start, stop, step) {
        const length = (stop - start) / step + 1;
        return Array.from({ length }, (_, i) => start + i * step);
    },

    rangeIntersect: function(min0, max0, min1, max1) {
        return Math.max(min0, max0) >= Math.min(min1, max1) && 
            Math.min(min0, max0) <= Math.max(min1, max1);
    },

    rangeRandom: function(min, max) {
        return min + Math.random() * (max - min);
    },

    rangeWithin: function(value, min, max) {
        return value >= Math.min(min, max) && value <= Math.max(min, max);
    },

    roundNearest: function(value, nearest) {
        return Math.round(value / nearest) * nearest;
    },

    roundToPlaces: function(value, places) {
        var mult = Math.pow(10, places);
        return Math.round(value * mult) / mult;
    },

}






















