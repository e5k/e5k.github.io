    (function() {
          var fn = function() {
            Bokeh.safely(function() {
              (function(root) {
                function embed_document(root) {
                  
                var docs_json = '{&quot;be772e91-229b-4aea-8eac-00e8f8679e60&quot;:{&quot;roots&quot;:{&quot;references&quot;:[{&quot;attributes&quot;:{&quot;attribution&quot;:&quot;Map tiles by &lt;a href=\\&quot;https://stamen.com\\&quot;&gt;Stamen Design&lt;/a&gt;, under &lt;a href=\\&quot;https://creativecommons.org/licenses/by/3.0\\&quot;&gt;CC BY 3.0&lt;/a&gt;. Data by &lt;a href=\\&quot;https://openstreetmap.org\\&quot;&gt;OpenStreetMap&lt;/a&gt;, under &lt;a href=\\&quot;https://www.openstreetmap.org/copyright\\&quot;&gt;ODbL&lt;/a&gt;.&quot;,&quot;url&quot;:&quot;http://tile.stamen.com/toner-background/{Z}/{X}/{Y}.png&quot;},&quot;id&quot;:&quot;1142&quot;,&quot;type&quot;:&quot;WMTSTileSource&quot;},{&quot;attributes&quot;:{},&quot;id&quot;:&quot;1183&quot;,&quot;type&quot;:&quot;UnionRenderers&quot;},{&quot;attributes&quot;:{&quot;end&quot;:20026376.39,&quot;start&quot;:-20026376.39},&quot;id&quot;:&quot;1144&quot;,&quot;type&quot;:&quot;Range1d&quot;},{&quot;attributes&quot;:{&quot;data_source&quot;:{&quot;id&quot;:&quot;1143&quot;},&quot;glyph&quot;:{&quot;id&quot;:&quot;1173&quot;},&quot;hover_glyph&quot;:null,&quot;muted_glyph&quot;:null,&quot;nonselection_glyph&quot;:{&quot;id&quot;:&quot;1174&quot;},&quot;selection_glyph&quot;:null,&quot;view&quot;:{&quot;id&quot;:&quot;1176&quot;}},&quot;id&quot;:&quot;1175&quot;,&quot;type&quot;:&quot;GlyphRenderer&quot;},{&quot;attributes&quot;:{&quot;formatter&quot;:{&quot;id&quot;:&quot;1181&quot;},&quot;ticker&quot;:{&quot;id&quot;:&quot;1154&quot;},&quot;visible&quot;:false},&quot;id&quot;:&quot;1153&quot;,&quot;type&quot;:&quot;LinearAxis&quot;},{&quot;attributes&quot;:{&quot;callback&quot;:null,&quot;tooltips&quot;:&quot;\\n    &lt;div style=\\&quot;width:300px\\&quot;&gt;\\n        &lt;div&gt;\\n            &lt;img\\n                src=\\&quot;@img\\&quot; width=300 alt=\\&quot;@imgs\\&quot; \\n                style=\\&quot;float: left; margin: 0px 15px 15px 0px;\\&quot;\\n                border=\\&quot;1\\&quot;\\n            &gt;&lt;/img&gt;\\n        &lt;/div&gt;\\n\\n        &lt;div&gt;\\n                &lt;span style=\\&quot;text-align: center; display:block; font-size: 15px; color: orange\\&quot;&gt;&amp;bull; &amp;bull; &amp;bull; &amp;bull; &amp;bull; &amp;bull; &amp;bull; &amp;bull; &amp;bull; &amp;bull; &amp;bull; &amp;bull; &lt;/span&gt;\\n        &lt;/div&gt;\\n        &lt;div style=\\&quot;font-size: 13px;\\&quot;&gt;\\n                &lt;table style=\\&quot;width:100%\\&quot;&gt;\\n                        &lt;tr&gt;\\n                                &lt;td style=\\&quot;text-align: right\\&quot;&gt;&lt;b&gt;Coordinates:&lt;/b&gt;&lt;/td&gt;\\n                                &lt;td style=\\&quot;text-align: left\\&quot;&gt;@lat, @lon&lt;td&gt;\\n                        &lt;/tr&gt;\\n                        &lt;tr&gt;\\n                                &lt;td style=\\&quot;text-align: right\\&quot;&gt;&lt;b&gt;Location:&lt;/b&gt;&lt;/td&gt;\\n                                &lt;td style=\\&quot;text-align: left\\&quot;&gt;@name&lt;td&gt;\\n                        &lt;/tr&gt;\\n                        &lt;tr&gt;\\n                                &lt;td style=\\&quot;text-align: right\\&quot;&gt;&lt;b&gt;Date:&lt;/b&gt;&lt;/td&gt;\\n                                &lt;td style=\\&quot;text-align: left\\&quot;&gt;@date&lt;td&gt;\\n                        &lt;/tr&gt;\\n                        &lt;tr&gt;\\n                                &lt;td style=\\&quot;text-align: right\\&quot;&gt;&lt;b&gt;Tags:&lt;/b&gt;&lt;/td&gt;\\n                                &lt;td style=\\&quot;text-align: left\\&quot;&gt;@tags&lt;td&gt;\\n                        &lt;/tr&gt;\\n                &lt;/table&gt;\\n        &lt;/div&gt;\\n        &lt;div&gt;\\n                &lt;span style=\\&quot;text-align: center; display:block; font-size: 15px; color: orange\\&quot;&gt;&amp;bull; &amp;bull; &amp;bull; &amp;bull; &amp;bull; &amp;bull; &amp;bull; &amp;bull; &amp;bull; &amp;bull; &amp;bull; &amp;bull; &lt;/span&gt;\\n        &lt;/div&gt;\\n        &lt;div style=\\&quot;font-size: 15px;\\&quot;&gt;\\n            &lt;span style=\\&quot;text-align: justify; display:block; margin: 15px 15px 15px 15px;\\&quot;&gt;@description&lt;/span&gt;\\n        &lt;/div&gt;\\n    &lt;/div&gt;\\n&quot;},&quot;id&quot;:&quot;1163&quot;,&quot;type&quot;:&quot;HoverTool&quot;},{&quot;attributes&quot;:{},&quot;id&quot;:&quot;1147&quot;,&quot;type&quot;:&quot;DataRange1d&quot;},{&quot;attributes&quot;:{&quot;fill_alpha&quot;:{&quot;value&quot;:0.1},&quot;fill_color&quot;:{&quot;value&quot;:&quot;orange&quot;},&quot;line_alpha&quot;:{&quot;value&quot;:0.1},&quot;line_color&quot;:{&quot;value&quot;:&quot;grey&quot;},&quot;size&quot;:{&quot;units&quot;:&quot;screen&quot;,&quot;value&quot;:10},&quot;x&quot;:{&quot;field&quot;:&quot;easting&quot;},&quot;y&quot;:{&quot;field&quot;:&quot;northing&quot;}},&quot;id&quot;:&quot;1174&quot;,&quot;type&quot;:&quot;Circle&quot;},{&quot;attributes&quot;:{&quot;below&quot;:[{&quot;id&quot;:&quot;1153&quot;}],&quot;center&quot;:[{&quot;id&quot;:&quot;1156&quot;},{&quot;id&quot;:&quot;1160&quot;}],&quot;left&quot;:[{&quot;id&quot;:&quot;1157&quot;}],&quot;plot_height&quot;:500,&quot;plot_width&quot;:800,&quot;renderers&quot;:[{&quot;id&quot;:&quot;1170&quot;},{&quot;id&quot;:&quot;1175&quot;}],&quot;title&quot;:{&quot;id&quot;:&quot;1177&quot;},&quot;toolbar&quot;:{&quot;id&quot;:&quot;1165&quot;},&quot;toolbar_location&quot;:null,&quot;x_range&quot;:{&quot;id&quot;:&quot;1144&quot;},&quot;x_scale&quot;:{&quot;id&quot;:&quot;1149&quot;},&quot;y_range&quot;:{&quot;id&quot;:&quot;1147&quot;},&quot;y_scale&quot;:{&quot;id&quot;:&quot;1151&quot;}},&quot;id&quot;:&quot;1145&quot;,&quot;subtype&quot;:&quot;Figure&quot;,&quot;type&quot;:&quot;Plot&quot;},{&quot;attributes&quot;:{&quot;active_drag&quot;:{&quot;id&quot;:&quot;1161&quot;},&quot;active_inspect&quot;:&quot;auto&quot;,&quot;active_multi&quot;:null,&quot;active_scroll&quot;:{&quot;id&quot;:&quot;1162&quot;},&quot;active_tap&quot;:{&quot;id&quot;:&quot;1164&quot;},&quot;tools&quot;:[{&quot;id&quot;:&quot;1161&quot;},{&quot;id&quot;:&quot;1162&quot;},{&quot;id&quot;:&quot;1163&quot;},{&quot;id&quot;:&quot;1164&quot;}]},&quot;id&quot;:&quot;1165&quot;,&quot;type&quot;:&quot;Toolbar&quot;},{&quot;attributes&quot;:{&quot;callback&quot;:{&quot;id&quot;:&quot;1185&quot;}},&quot;id&quot;:&quot;1164&quot;,&quot;type&quot;:&quot;TapTool&quot;},{&quot;attributes&quot;:{&quot;axis&quot;:{&quot;id&quot;:&quot;1157&quot;},&quot;dimension&quot;:1,&quot;ticker&quot;:null},&quot;id&quot;:&quot;1160&quot;,&quot;type&quot;:&quot;Grid&quot;},{&quot;attributes&quot;:{&quot;data&quot;:{&quot;date&quot;:[&quot;2019-05-10&quot;,&quot;2015-11-07&quot;,&quot;2018-01-13&quot;,&quot;2013-07-30&quot;,&quot;2015-10-19&quot;,&quot; 2020-04-24&quot;],&quot;description&quot;:[&quot;Nice escape from Singapore over the weekend, drinking hot GnT&#x27;s and reading on the beach. The recording is a close up (~30 cm) of the waves gently breaking.&quot;,&quot;A beautiful, sunny fall day by the lake Geneva at the Bains des Paquis. You can feel everybody&#x27;s joy at feeling the sun before the long winter months of Geneva.&quot;,&quot;Chilling at our mate Trippy&#x27;s incredible house on the western tip of Hual\\u0101lai volcano, overlooking the Kona bay in an beautiful &#x27;Ohi&#x27;a trees forest. Funnily enough, we were awoken on the next day by the famous missile alert...&quot;,&quot;At the end of the first field deployment on Sakurajima volcano on the way back to Europe.&quot;,&quot;Waiting for explosions from Mt. Aso that never came, we spent hours in this clearing setting up the instruments. The nearby forest was splendid.&quot;,&quot; \\&quot;Another bad-ass storm recorded from home in Singapore.\\&quot;&quot;],&quot;easting&quot;:{&quot;__ndarray__&quot;:&quot;BwWf4io4ZkEdKnCjhegkQc3VzOLQjnDBytRyKhjBa0GcMC9SSdJrQTf+vyLTCWZB&quot;,&quot;dtype&quot;:&quot;float64&quot;,&quot;shape&quot;:[6]},&quot;id&quot;:[&quot;20190519_Bintan_Waves&quot;,&quot;20151107_Geneva-BainPaquis_Ambiance&quot;,&quot;20180113_Kona_Nature&quot;,&quot;20151015_Kagoshima_Airport1&quot;,&quot;20151019_Aso_Nature&quot;,&quot;20200424_Singapore_Storm&quot;],&quot;img&quot;:[&quot;../img/SMALL/20190519_Bintan_Waves.jpg&quot;,&quot;../img/SMALL/20151107_Geneva-BainPaquis_Ambiance.jpg&quot;,&quot;../img/SMALL/20180113_Kona_Nature.jpg&quot;,&quot;../img/SMALL/20151015_Kagoshima_Airport1.jpg&quot;,&quot;../img/SMALL/20151019_Aso_Nature.jpg&quot;,&quot;../img/SMALL/20200424_Singapore_Storm.jpg&quot;],&quot;lat&quot;:{&quot;__ndarray__&quot;:&quot;BcJOsWoQ8D9NFYxK6hpHQFfqWRDKszNAcqq1MAvNP0AqIO1/gG9AQAWpFDsax/Q/&quot;,&quot;dtype&quot;:&quot;float64&quot;,&quot;shape&quot;:[6]},&quot;lon&quot;:{&quot;__ndarray__&quot;:&quot;hlW8kXkpWkDEr1jDRZ4YQL8NMV7zfmPAJA9EFulWYEDM0HgiCGFgQDze5Lfo8llA&quot;,&quot;dtype&quot;:&quot;float64&quot;,&quot;shape&quot;:[6]},&quot;name&quot;:[&quot;Telukbakua, Pulau Bintan, Indonesia&quot;,&quot;Bains des Paquis, Geneva, Switzerland&quot;,&quot;Kailua-Kona, Hawaii Island, USA&quot;,&quot;Kagoshima Airport, Kyushu, Japan&quot;,&quot;Aso volcano, Kyushu, Japan&quot;,&quot; \\&quot;Wessex&quot;],&quot;northing&quot;:{&quot;__ndarray__&quot;:&quot;E8ruErZJ+0A84SSN1y1WQdFHRtSyEkFBPccOYD2DTEGQOoknoJZNQfHa6vfmpQFB&quot;,&quot;dtype&quot;:&quot;float64&quot;,&quot;shape&quot;:[6]},&quot;tags&quot;:[&quot;Waves, Beach&quot;,&quot;Ambiance, Beach&quot;,&quot;Nature&quot;,&quot;Ambiance&quot;,&quot;Nature&quot;,&quot; bD-1TA_FjL8&quot;],&quot;url&quot;:[&quot;6l4SSi-bgLY&quot;,&quot;39YSuHlYFVY&quot;,&quot;vPJrLd5E-5o&quot;,&quot;53TS7jpG2Z4&quot;,&quot;G9eBYA_FxHw&quot;,&quot; Singapore\\&quot;&quot;]},&quot;selected&quot;:{&quot;id&quot;:&quot;1184&quot;},&quot;selection_policy&quot;:{&quot;id&quot;:&quot;1183&quot;}},&quot;id&quot;:&quot;1143&quot;,&quot;type&quot;:&quot;ColumnDataSource&quot;},{&quot;attributes&quot;:{&quot;text&quot;:&quot;&quot;},&quot;id&quot;:&quot;1177&quot;,&quot;type&quot;:&quot;Title&quot;},{&quot;attributes&quot;:{&quot;formatter&quot;:{&quot;id&quot;:&quot;1179&quot;},&quot;ticker&quot;:{&quot;id&quot;:&quot;1158&quot;},&quot;visible&quot;:false},&quot;id&quot;:&quot;1157&quot;,&quot;type&quot;:&quot;LinearAxis&quot;},{&quot;attributes&quot;:{&quot;fill_color&quot;:{&quot;value&quot;:&quot;orange&quot;},&quot;line_color&quot;:{&quot;value&quot;:&quot;grey&quot;},&quot;size&quot;:{&quot;units&quot;:&quot;screen&quot;,&quot;value&quot;:10},&quot;x&quot;:{&quot;field&quot;:&quot;easting&quot;},&quot;y&quot;:{&quot;field&quot;:&quot;northing&quot;}},&quot;id&quot;:&quot;1173&quot;,&quot;type&quot;:&quot;Circle&quot;},{&quot;attributes&quot;:{&quot;url&quot;:&quot;https://www.youtube.com/embed/@url?rel=0&amp;amp;autoplay=1;fs=0;autohide=0;hd=0;mute=0;&quot;},&quot;id&quot;:&quot;1185&quot;,&quot;type&quot;:&quot;OpenURL&quot;},{&quot;attributes&quot;:{},&quot;id&quot;:&quot;1184&quot;,&quot;type&quot;:&quot;Selection&quot;},{&quot;attributes&quot;:{},&quot;id&quot;:&quot;1154&quot;,&quot;type&quot;:&quot;BasicTicker&quot;},{&quot;attributes&quot;:{&quot;tile_source&quot;:{&quot;id&quot;:&quot;1142&quot;}},&quot;id&quot;:&quot;1170&quot;,&quot;type&quot;:&quot;TileRenderer&quot;},{&quot;attributes&quot;:{&quot;source&quot;:{&quot;id&quot;:&quot;1143&quot;}},&quot;id&quot;:&quot;1176&quot;,&quot;type&quot;:&quot;CDSView&quot;},{&quot;attributes&quot;:{},&quot;id&quot;:&quot;1158&quot;,&quot;type&quot;:&quot;BasicTicker&quot;},{&quot;attributes&quot;:{},&quot;id&quot;:&quot;1181&quot;,&quot;type&quot;:&quot;BasicTickFormatter&quot;},{&quot;attributes&quot;:{},&quot;id&quot;:&quot;1161&quot;,&quot;type&quot;:&quot;PanTool&quot;},{&quot;attributes&quot;:{&quot;axis&quot;:{&quot;id&quot;:&quot;1153&quot;},&quot;ticker&quot;:null},&quot;id&quot;:&quot;1156&quot;,&quot;type&quot;:&quot;Grid&quot;},{&quot;attributes&quot;:{},&quot;id&quot;:&quot;1149&quot;,&quot;type&quot;:&quot;LinearScale&quot;},{&quot;attributes&quot;:{},&quot;id&quot;:&quot;1162&quot;,&quot;type&quot;:&quot;WheelZoomTool&quot;},{&quot;attributes&quot;:{},&quot;id&quot;:&quot;1179&quot;,&quot;type&quot;:&quot;BasicTickFormatter&quot;},{&quot;attributes&quot;:{},&quot;id&quot;:&quot;1151&quot;,&quot;type&quot;:&quot;LinearScale&quot;}],&quot;root_ids&quot;:[&quot;1145&quot;]},&quot;title&quot;:&quot;Bokeh Application&quot;,&quot;version&quot;:&quot;2.0.1&quot;}}';
                var render_items = [{"docid":"be772e91-229b-4aea-8eac-00e8f8679e60","root_ids":["1145"],"roots":{"1145":"e242320f-a7d6-4374-8bf1-7194aef1dc8a"}}];
                root.Bokeh.embed.embed_items(docs_json, render_items);
              
                }
                if (root.Bokeh !== undefined) {
                  embed_document(root);
                } else {
                  var attempts = 0;
                  var timer = setInterval(function(root) {
                    if (root.Bokeh !== undefined) {
                      clearInterval(timer);
                      embed_document(root);
                    } else {
                      attempts++;
                      if (attempts > 100) {
                        clearInterval(timer);
                        console.log("Bokeh: ERROR: Unable to run BokehJS code because BokehJS library is missing");
                      }
                    }
                  }, 10, root)
                }
              })(window);
            });
          };
          if (document.readyState != "loading") fn();
          else document.addEventListener("DOMContentLoaded", fn);
        })();
