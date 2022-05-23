/**
 * @param {string} s
 * @return {boolean}
 */

 var dict = {'(': 0, ')': 0, '{': 0, '}': 0, '[': 0, ']':0};

 var isValid = function(s) {
     for (var i = 0; i < s.length; i++) {
         dict[s.charAt(i)]+=1;
     }
     if(dict['('] != dict[')']) return false;
     if(dict['{'] != dict['}']) return false;
     if(dict['['] != dict[']']) return false;
     return true;
 };

 console.log(isValid("{[]}"));