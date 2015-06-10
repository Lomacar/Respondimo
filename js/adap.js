var selection = []
  , sheets = document.styleSheets
  , sheet, rule, i, j

for (i in sheets){
    sheet = sheets[i]
    for (j in sheet.cssRules) {
        rule = sheet.cssRules[j]
        if (/url\(.*#.*\)/.test(rule.cssText)) selection.push( rule.selectorText );
    }
}

//use this to round up to the nearest power of 2 or 3/4 of a power of two
function powerRound(x){
    v = x
    v--;
    v |= v >> 1;
    v |= v >> 2;
    v |= v >> 4;
    v |= v >> 8;
    v+=1;
    return x <= 0.75*v ? 0.75*v : v;
}

//or use this to pick ideal resolutions from a list of common ones
var resolutions = [4,8,12,16,24,32,48,50,64,80,100,120,128,150,160,180,200,240,250,256,300,320,360,400,480,500,512,600,640,720,768,800,960,1000,1024,1080,1200,1280,1366,1400,1536,1600,1800,1920,2000,2048,2500,2560,3000,3200,3600,3840,4000,4096,5000,5120,7680,8000,8192,9600,10000,12000]

var getClosestValues = function(a, x) {
    var lo = -1, hi = a.length;
    while (hi - lo > 1) {
        var mid = Math.round((lo + hi)/2);
        if (a[mid] <= x) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    if (a[lo] == x) hi = lo;
    return a[hi];
}


var inputResolution = 9999
var bestResolution = getClosestValues(resolutions, inputResolution) || inputResolution