var text_to_decrypt = 'oF rht eentxc ahllneeg ,ogt  oww.wagaregcsro.eoc/merrciubttoa dnt la kiwhto rur boto'
console.log(decrypt(text_to_decrypt))

function decrypt(text)
{
var i,tmp,output = "";
for(i=1;  i<text.length ;i=i+2)
{
output += text[i] + text[i-1];
}
return output;
}
