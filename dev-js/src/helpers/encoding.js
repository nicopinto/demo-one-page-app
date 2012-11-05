
  
//	function trim(s)
//	{
//		return rtrim(ltrim(s));
//	};

	function ltrim(s)
	{
		var l=0;
		while(l < s.length && s[l] == ' ')
		{	l++; }
		return s.substring(l, s.length);
	};

	function rtrim(s)
	{
		var r=s.length -1;
		while(r > 0 && s[r] == ' ')
		{	r-=1;	}
		return s.substring(0, r+1);
	};
	
	function utf8_decode (str_data) {
	    // http://kevin.vanzonneveld.net
	    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
	    // +      input by: Aman Gupta
	    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +   improved by: Norman "zEh" Fuchs
	    // +   bugfixed by: hitwork
	    // +   bugfixed by: Onno Marsman
	    // +      input by: Brett Zamir (http://brett-zamir.me)
	    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // *     example 1: utf8_decode('Kevin van Zonneveld');
	    // *     returns 1: 'Kevin van Zonneveld'
	    var tmp_arr = [],
	        i = 0,
	        ac = 0,
	        c1 = 0,
	        c2 = 0,
	        c3 = 0;

	    str_data += '';

	    while (i < str_data.length) {
	        c1 = str_data.charCodeAt(i);
	        if (c1 < 128) {
	            tmp_arr[ac++] = String.fromCharCode(c1);
	            i++;
	        } else if (c1 > 191 && c1 < 224) {
	            c2 = str_data.charCodeAt(i + 1);
	            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
	            i += 2;
	        } else {
	            c2 = str_data.charCodeAt(i + 1);
	            c3 = str_data.charCodeAt(i + 2);
	            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	            i += 3;
	        }
	    }

	    return tmp_arr.join('');
	};
  
  var Encoding = {
	utf8_decode: function(texto){
	  return utf8_decode(texto);
    },
    trim: function(s){
    	return rtrim(ltrim(s));
    }
  };
