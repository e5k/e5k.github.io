---
layout: page
title: TOTGS
permalink: pages/totgs
categories: Codes
tags: TOTGS
---
TOTGS is an upgraded version of the voronoi technique introduced by Bonadonna and Houghton (2005) for the calculation of the total grain-size distribution of tephra deposits. Refer to the original publication in <a href="https://link.springer.com/article/10.1007/s00445-004-0386-2" target="_blank">Bulletin of Volcanology</a> for more details on the technique.

TOTGS is maintained on <a href="https://github.com/e5k/TOTGS" target="_blank">GitHub</a> and can be cited as *Biass, S., Bonadonna, C., (2014), TOTGS: Total grainsize distribution of tephra fallout, https://vhub.org/resources/3297*.

## User manual
The user manual for TOTGS is available <a href="{{ site.baseurl }}/files/totgs_man.pdf" target="_blank">here</a>. Check the blog to see more recent additions.

## Related blog entries
<ul style="padding-left: 15px;">
{% for post in site.tags.TOTGS limit: 20 %}
  <div>
    <li>
         <span>{{ post.date | date:"%Y-%m-%d" }}</span> - 
         <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
    </div>
{% endfor %}
</ul>