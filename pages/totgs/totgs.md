---
layout: page
title: TOTGS
permalink: pages/totgs
categories: codes
tags: totgs
---

<a class="github-button" href="https://github.com/e5k/TOTGS/archive/master.zip" data-icon="octicon-cloud-download" data-size="large" aria-label="Download e5k/TOTGS on GitHub">Download</a>
<a class="github-button" href="https://github.com/e5k/TOTGS" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star e5k/TOTGS on GitHub">Star</a>
<a class="github-button" href="https://github.com/e5k/TOTGS/fork" data-icon="octicon-repo-forked" data-size="large" data-show-count="true" aria-label="Fork e5k/TOTGS on GitHub">Fork</a>

TOTGS is an upgraded version of the voronoi technique introduced by Bonadonna and Houghton (2005) for the calculation of the total grain-size distribution of tephra deposits. Refer to the original publication in <a href="https://link.springer.com/article/10.1007/s00445-004-0386-2" target="_blank">Bulletin of Volcanology</a> for more details on the technique.

TOTGS is maintained on <a href="https://github.com/e5k/TOTGS" target="_blank">GitHub</a> and can be cited as *Biass, S., Bonadonna, C., (2014), TOTGS: Total grainsize distribution of tephra fallout, https://vhub.org/resources/3297*.

### User manual
The user manual for TOTGS is available [here]({{ site.baseurl }}/pages/totgs_manual). Check the blog to see more recent additions.

### Related blog entries
<div class="related">
  <ul class="related-posts">
    {% for post in site.tags.totgs limit: 20 %}
      <li>
        <h4>
          <small>＿ </small><a href="{{ post.url }}">
            {{ post.title }}
            <small>{{ post.date | date_to_string }}</small>
          </a>
        </h4>
      </li>
    {% endfor %}
  </ul>
</div>

