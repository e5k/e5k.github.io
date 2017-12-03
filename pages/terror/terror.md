---
layout: page
title: TError
permalink: pages/terror
categories: codes
tags: terror
---

<a class="github-button" href="https://github.com/e5k/TError/archive/master.zip" data-icon="octicon-cloud-download" data-size="large" aria-label="Download e5k/TError on GitHub">Download</a>
<a class="github-button" href="https://github.com/e5k/TError" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star e5k/TError on GitHub">Star</a>
<a class="github-button" href="https://github.com/e5k/TError/fork" data-icon="octicon-repo-forked" data-size="large" data-show-count="true" aria-label="Fork e5k/TError on GitHub">Fork</a>

TError is a Matlab package designed to quantify systematically the uncertainty associated with the characterisation of tephra deposits, in which the most commonly used methods to quantify eruption source parameters are implemented. Inputs of the code are a range of field-based, model-based and empirical parameters (i.e., clast diameter, crosswind and downwind ranges, thickness measurement, area of isopach contours, bulk deposit density, empirical constants and wind speed).

TError is maintained on <a href="https://github.com/e5k/TError" target="_blank">GitHub</a> and was published in <a href="http://scholarcommons.usf.edu/siv/vol1/iss1/2/" target="_blank">Statistics in Volcanology</a> as *Biass S, Bagheri G, Aeberhard W, Bonadonna C (2014) TError: towards a better quantification of the uncertainty propagated during the characterization of tephra deposits. Stat Volcanol 1:1–27*.

### User manual
The complete user manual for TError is available <a href="{{ site.baseurl }}/files/terror_man.pdf" target="_blank">here</a>. Check the blog to see more recent additions.

### Example of applications
This list illustrates applications of TError:

1. 2008 explosion of Kilauea volcano, USA <a href="https://www.researchgate.net/publication/316010762_Partitioning_of_pyroclasts_between_ballistic_transport_and_a_convective_plume_Kilauea_volcano_19_March_2008" target="_blank" class="tag">Paper</a>

### Related blog entries

<div class="related">
  <ul class="related-posts">
    {% for post in site.tags.TError limit: 20 %}
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
