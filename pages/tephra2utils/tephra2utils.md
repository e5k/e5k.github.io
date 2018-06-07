---
layout: page
title: Tephra2Utils
permalink: pages/tephra2utils
categories: codes
tags: tephra2utils
---

<a class="github-button" href="https://github.com/e5k/Tephra2Utils/archive/master.zip" data-icon="octicon-cloud-download" data-size="large" aria-label="Download e5k/Tephra2Utils on GitHub">Download</a>
<a class="github-button" href="https://github.com/e5k/Tephra2Utils" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star e5k/Tephra2Utils on GitHub">Star</a>
<a class="github-button" href="https://github.com/e5k/Tephra2Utils/fork" data-icon="octicon-repo-forked" data-size="large" data-show-count="true" aria-label="Fork e5k/Tephra2Utils on GitHub">Fork</a>

**Tephra2Utils** is a toolbox of Matlab functions wrapped around [Tephra2](https://github.com/ljc-geo/tephra2). They are independent of the version of Tephra2: a good habit is to keep the executables at the root of the Tephra2Utils/ folder (i.e. *tephra2012_inversion* for the inversion and *tephra2-2012* for the forward solution).

## Functions
Follow the link to the homepages of each separate script for more details on their usage.

Function            | Description
---------------------|--------
plotBetaPlume.m | Easily plots the mass distribution in the plume following a beta 
[plotT2.m]({{ site.baseurl }}{% post_url 2017-12-10-plot_tephra2 %}) | Plots the output of Tephra2 on a map
[processT2Inversion.m]({{ site.baseurl }}{% post_url 2018-06-06-inversion %}) | Process the output on inversion runs
[Inversion/]({{ site.baseurl }}{% post_url 2018-06-06-inversion %}) | Bash and pyhon scripts to run the inversion on clusters
runT2.m | Experimental


### Related blog entries
<div class="related">
  <ul class="related-posts">
    {% for post in site.tags.tephra2 limit: 20 %}
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

