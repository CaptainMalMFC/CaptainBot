// Add a trim() function to all Strings
// From http://stackoverflow.com/questions/1418050/string-strip-for-javascript
if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}
if(typeof(String.prototype.startsWith) === "undefined")
{
    String.prototype.startsWith = function(prefix) 
    {
        return String(this).indexOf(prefix) == 0;
    };
}
