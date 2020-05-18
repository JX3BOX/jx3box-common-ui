/*
 * @Description: 剑三宏语法高亮
 * @Author: iRuxu
 * @Date: 2019-09-01 01:18:34
 * @LastEditors: iRuxu
 * @LastEditTime: 2019-09-10 07:06:27
 */
import $ from 'jquery'

class JX3_MACRO{
    constructor(data){
        this.data = data
        this.macro = ''
        this.init()
    }
    init(){
        let arrays = this.data.split('\n');
		this.lines = [];
		for ( let i = 0 ; i < arrays.length ; i++ ){
			this.lines.push(this._language(arrays[i]));
        }
		this.code = '<ol>' + this.lines.join('') + '</ol>'
		return
    }
    _language(strings){
        let cmdstring = '';

        if ( !/^\#/.test($.trim(strings)) ){
			let cmd = strings.indexOf('--')
				
			if ( cmd > -1 ){
				cmdstring = strings.substring(cmd);
				strings = strings.substring(0, cmd);
				if ( $.trim(strings).length === 0 ){
					strings = cmdstring;
					cmdstring = '';
					if ( $.trim(strings).length === 0 ){
						strings = '';
					}
				}
			}
		}
		
		let tstring = $.trim(strings), 
			h = '';
			
		if ( /^\#/.test(tstring) ){
			var system = /(\s+)?#([^\s]+)\s(.+)/.exec(strings);
			var a1 = system[1] ? system[1] : '';
			var a2 = system[2];
			var a3 = system[3];
			h += '<li><pre>' + a1 + '<span class="jx3macro-system macro-system-' + a2.toLowerCase() + '">#' + a2 + '</span> <span class="jx3macro-system-string">' + this._params(a3) + '</span></pre></li>';
		}
		else if ( /^\-\-/.test(tstring) ){
			h += '<li><pre><span class="jx3macro-comment">' + strings + '</span></pre></li>';
		}
		else{
			var keyword = /(\s+)?\/([^\s\[]+)(\s?\[([^\]]+)\])?(\s?(.+))?/.exec(strings);
			if ( keyword ){
				var b1 = keyword[1] ? keyword[1] : '';
				var b2 = keyword[2];
				var b3 = keyword[4];
				var b4 = keyword[6];
				h += '<li><pre>';
				h += b1;
				h += '<span class="jx3macro-keyword jx3macro-keyword-' + b2.toLowerCase() + '">/' + b2 + '</span>';
				if ( keyword[3] ){
					h += ' ';
					h += '<span class="jx3macro-key">[</span>';
					h += '<span class="jx3macro-condition">' + this._condition(b3) + '</span>';
					h += '<span class="jx3macro-key">]</span>';
				}
				if ( keyword[5] ){
					h += ' ';
					h += '<span class="jx3macro-skill-name">' + this._condition(b4) + '</span>';
				}
				if ( cmdstring && cmdstring.length > 0 ){
					h += ' ';
					h += '<span class="jx3macro-comment">' + cmdstring + '</span>';
				}
				h += '</pre></li>';
			}else{
				h += '<li><pre>' + strings + ( cmdstring && cmdstring.length > 0 ? cmdstring : '' ) + '</pre></li>';
			}
		}
		return h;
    }
    _params(s){
		return s.replace(/v\_([^\s\<\>\=\&\;\|\(\)\[\]\:\~\,\+\-\%\*\/\!]+)/, '<span class="jx3macro-param">v_$1</span>')
			.replace(/\,/g, '<span class="jx3macro-key">,</span>')
			.replace(/(tip)(\_\d)?\:/ig, '<span class="jx3macro-key">$1$2:</span>')
			.replace(/(icon)(\_\d)?\:/ig, '<span class="jx3macro-key">$1$2:</span>')
    }
    _condition(s){
        let h = '',
			keys = ['<', '>', '=', '&', ';', '|', '(', ')', '[', ']', ':', '~', ',', '+', '-', '%', '*', '/', '!'];
			
		for ( let i = 0 ; i < s.length ; i++ ){
			let t = s.charAt(i);
			if ( keys.indexOf(t) > -1 ){
				h += '<span class="jx3macro-key">' + t + '</span>';
			}else{
				h += t;
			}
		}
		
		h = h.replace(/(v)\_([^\s\<\>\=\&\;\|\(\)\[\]\:\~\,\+\-\%\*\/\!]+)/ig, '<span class="jx3macro-condition">$1_$2</span>');
		
		return h;
    }
}
export default JX3_MACRO;