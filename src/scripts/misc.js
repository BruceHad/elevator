/* global module */
'use strict';

var htr = function(hex){
  // Convert hex colour definitions to RGB
  hex = hex.toUpperCase();
  var b16 = '0123456789ABCDEF';
  var values = [hex.slice(1,3), hex.slice(3,5), hex.slice(5,7)];
  for(var i in values){
    values[i] = b16.indexOf(values[i][0]) * 16 + b16.indexOf(values[i][1]);
  }
  return 'rgb('+values.join(',')+')';
};

module.exports.htr = htr;

// Tests
if(htr('#000000') != 'rgb(0,0,0)')
  console.error('htr("#000000") failed', misc.htr('#000000'));
if(htr('#FFFFFF') != 'rgb(255,255,255)')
  console.error('htr("#000000") failed', misc.htr('#FFFFFF'));
if(htr('#123456') != 'rgb(18,52,86)')
  console.error('htr("#000000") failed', misc.htr('#123456') );
