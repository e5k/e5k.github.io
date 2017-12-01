---
layout: page
title: TOTGS
permalink: pages/totgs
categories: Codes
tags: TOTGS
---
TOTGS is an upgraded version of the voronoi technique introduced by Bonadonna and Houghton (2005) for the calculation of the total grain-size distribution of tephra deposits. Refer to the original publication in <a href="https://link.springer.com/article/10.1007/s00445-004-0386-2" target="_blank">Bulletin of Volcanology</a> for more details on the technique.

TOTGS is maintained on <a href="https://github.com/e5k/TOTGS" target="_blank">GitHub</a> and can be cited as *Biass, S., Bonadonna, C., (2014), TOTGS: Total grainsize distribution of tephra fallout, https://vhub.org/resources/3297*.

### User manual
The user manual for TOTGS is available <a href="{{ site.baseurl }}/files/totgs_man.pdf" target="_blank">here</a>. Check the blog to see more recent additions.

### Related blog entries
<div class="related">
  <ul class="related-posts">
    {% for post in site.tags.TOTGS limit: 20 %}
      <li>
        <h4>
          <a href="{{ post.url }}">
            {{ post.title }}
            <small>{{ post.date | date_to_string }}</small>
          </a>
        </h4>
      </li>
    {% endfor %}
  </ul>
</div>

