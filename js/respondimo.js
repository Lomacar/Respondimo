(function(){
    
    var SLIR_DIR = '/respondimo';
    var ADAP_RESOLUTIONS = [4,8,12,16,24,32,48,50,64,80,100,120,128,150,160,180,200,240,250,256,300,320,360,400,480,500,512,600,640,720,768,800,960,1000,1024,1080,1200,1280,1366,1400,1536,1600,1800,1920,2000,2048,2500,2560,3000,3200,3600,3840,4000,4096,5000,5120,7680,8000,8192,9600,10000,12000]
    var ADAP_DEFAULT_QUALITY = 90;

    //find all rules with hashtags
    var adaptThese = {}
      , sheets = document.styleSheets
      , sheet, rule, i, j

    for (i in sheets){
        sheet = sheets[i]
        for (j in sheet.cssRules) {
            rule = sheet.cssRules[j]
            if (/url\(.*#.*\)/.test(rule.cssText)) {
                adaptThese[rule.selectorText] = rule.style.backgroundImage;
            }
        }
    }

    // For each rule with a hashtag
    // select each element with that rule
    // and do the thing.
    $.each(adaptThese, function (selector, url) {

        url = url.replace(/"/g,'') //for IE
                 .replace(/url\(.*?#(.+)\)/g,'$1')

        $(selector).each(function () {

            adapMagic($(this), url, true)

        })  

    })

    // For every img tag with '#' in the src URL, do the thing.
    $('img[src*=#]').each(function () {
        var url = $(this).attr('src').replace(/.*?#(.+)/g,'$1');
        adapMagic($(this), url, false);
    })
    
    //////////////////////////////////////////////////////////////
    // Takes an HTML element and a url                          //
    // changes that elements src or backgroundImage             //
    // to an imaged based on the URL with the ideal dimensions. //
    //////////////////////////////////////////////////////////////
    function adapMagic(element, url, background){

        var width = element.outerWidth();
        width = getClosestValues(ADAP_RESOLUTIONS, width ) || inputResolution
        
        var quality = element.closest('[data-adap-quality]').data('adapQuality') || ADAP_DEFAULT_QUALITY
        var axis = element.closest('[data-adap-axis]').data('adapAxis') || 'x'
        
        var options = { q: quality }
        
        if (/^(x|horizontal|width|w)$/.test(axis)) {
            options.w = width;
        }
        if(background || /^(y|vertical|height|h)$/.test(axis)) {
            options.h = element.outerHeight();
        }

        if(background){
            element.css('backgroundImage', 'url(' + get_SLIR_URL(url,options) + ')' )
        } else if (element[0].tagName == 'IMG') {
            element.attr('src', get_SLIR_URL(url,options) );
        } else {
            console.warn("ADAP: Attempted to set 'src' attribute for unsupported element type.")
        }
    }

    //combines src path and options creating a querystring that SLIR can digest
    function get_SLIR_URL(src, options) {
        options = $.param(options)
        options = options ? '?'+options+'&' : '?';
        return SLIR_DIR + '/' + options + 'i=' + src;
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

    function getClosestValues (a, x) {
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
})();