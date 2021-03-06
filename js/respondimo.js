(function(){
    
    var SLIR_DIR = '/respondimo';
    var RMO_RESOLUTIONS = [4,8,12,16,24,32,48,50,64,80,100,120,128,150,160,180,200,240,250,256,300,320,360,400,480,500,512,600,640,720,768,800,960,1000,1024,1080,1200,1280,1366,1400,1536,1600,1800,1920,2000,2048,2500,2560,3000,3200,3600,3840,4000,4096,5000,5120,7680,8000,8192,9600,10000,12000]
    var RMO_DEFAULT_QUALITY = 90;

    //find all rules with hashtags
    var hashTagRules = {}
      , sheets = document.styleSheets
      , sheet, rule, i, j

    for (i in sheets){
        sheet = sheets[i]
        for (j in sheet.cssRules) {
            rule = sheet.cssRules[j]
            if (/url\(.*#.*\)/.test(rule.cssText)) {
                hashTagRules[rule.selectorText] = rule.style.backgroundImage;
            }
        }
    }

    // For each rule with a hashtag
    // grab the URL hidden after the #,
    // select each element with that rule
    // and do the thing.
    $.each(hashTagRules, function (selector, url) {

        url = url.replace(/url\((['"])?(.*?)#(.+)\1\)/g,'$3')

        $(selector).each(function () {

            respondimo($(this), url, true)

        })  

    })
    
    // Fancy trickery for every img in a .respondimo noscript tag.      
    $('noscript.respondimo').replaceWith(function() {
        return (this.textContent || this.innerText).replace(/src=(["'])/,'src=$1#');
    });       

    // For every img tag with '#' in the src URL, do the thing.
    $('img[src*=#]').each(function () {
        var url = $(this).attr('src').replace(/.*?#(.+)/g,'$1');
        respondimo($(this), url, false);
    })
    
    //////////////////////////////////////////////////////////////
    // Takes an HTML element and a url                          //
    // changes that elements src or backgroundImage             //
    // to an imaged based on the URL with the ideal dimensions. //
    //////////////////////////////////////////////////////////////
    function respondimo(element, url, background){
        
          var noWidth, noHeight;
        
        if (!background) {

            if (
                element.attr('width') == undefined
                &&
                parseInt(css(element).width || 0) === 0
                &&
                parseInt(element.css('min-width')) === 0
                &&
                parseInt(element.css('padding-left')) === 0
                &&
                parseInt(element.css('padding-right')) === 0
            ) { var noWidth = true }
            
            if (
                element.attr('height') == undefined
                &&
                parseInt(css(element).height || 0) === 0
                &&
                parseInt(element.css('min-height')) === 0
                &&
                parseInt(element.css('padding-top')) === 0
                &&
                parseInt(element.css('padding-bottom')) === 0
            ) { var noHeight = true }
        }
        
        var quality = element.closest('[data-rmo-quality]').data('rmoQuality') || RMO_DEFAULT_QUALITY
        var axis = element.closest('[data-rmo-axis]').data('rmoAxis') || 'x';
        var size = background ? element.css('backgroundSize') : null;
        
        var options = { q: quality };
        
        if (/^(x|horizontal|width|w)$/.test(axis)) {
            var width =  element.outerWidth();
            if(!noWidth) options.w = getClosestValues(RMO_RESOLUTIONS, width ) || inputResolution;
        }
        if(background || /^(y|vertical|height|h)$/.test(axis)) {
            var height = element.outerHeight();
            if(!noHeight) options.h = getClosestValues(RMO_RESOLUTIONS, height ) || inputResolution;
        }
        if(typeof options.w === 'undefined' && typeof options.h === 'undefined') {
            options.w = 99999
        }
        
        
        if(background) {
            options.size = size;
        }

        if(background){
            element.css('backgroundImage', 'url(' + get_SLIR_URL(url,options) + ')' )
        } else if (element[0].tagName == 'IMG') {
            element.attr('src', get_SLIR_URL(url,options) );
        } else {
            console.warn("Respondimo: Attempted to set 'src' attribute for unsupported element type.")
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
    
    function htmlEncode( html ) {
        return document.createElement( 'a' ).appendChild( 
            document.createTextNode( html ) ).parentNode.innerHTML;
    };

    function htmlDecode( html ) {
        var a = document.createElement( 'a' ); a.innerHTML = html;
        return a.textContent;
    };
    
    function css(a) {
        var sheets = document.styleSheets, o = {};
        for (var i in sheets) {
            var rules = sheets[i].rules || sheets[i].cssRules;
            for (var r in rules) {
                if (a.is(rules[r].selectorText)) {
                    o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
                }
            }
        }
        return o;
    }

    function css2json(css) {
        var s = {};
        if (!css) return s;
        if (css instanceof CSSStyleDeclaration) {
            for (var i in css) {
                for (var i = 0; i < css.length; i += 1) {
                    s[css[i]] = css.getPropertyValue(css[i]);
                }
            }
        } else if (typeof css == "string") {
            css = css.split("; ");
            for (var i in css) {
                var l = css[i].split(": ");
                s[l[0].toLowerCase()] = (l[1]);
            }
        }
        return s;
    }

    
})();