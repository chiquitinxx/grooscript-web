
File main = new File('.')
main.eachFileRecurse { File file ->
    if (file.name.endsWith('.html')) {
        if (file.text.trim().endsWith('</html>') && !file.absolutePath.contains('pluginManual/gapi') &&
            !file.text.contains('UA-37511810-1')) {

            println 'Yes:'+file.absolutePath
            /*file.text = file.text.replaceFirst('</html>','''
    <script>
        //Google Analytics info
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-37511810-1']);
        _gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    </script></html>''') */
        } else {
            println 'No:'+file.absolutePath
        }
    }
}
