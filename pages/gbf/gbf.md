---
layout: page
title: Great Balls of Fire
permalink: pages/gbf
categories: Codes
tags: GBF
---

Great Balls of Fire (GBF) is an approach for the probabilistic hazard assessment of volcanic ballistic projectiles (VBP). It contains a model describing ballistic trajectories of VBPs accounting for a variable drag coefficient and topography and is designed to model large numbers of VBPs stochastically. Associated functions come with the GBF code to post-process model outputs into a comprehensive probabilistic hazard assessment for VBP impacts. Outcomes include probability maps to exceed given thresholds of kinetic energies at impact, hazard curves and probabilistic isoenergy maps. Probabilities are calculated either on equally-sized pixels or zones of interest. 

GBF is maintained on <a href="https://github.com/unigeSPC/gbf" target="_blank">GitHub</a> and was published in <a href="https://www.researchgate.net/publication/304243833_Great_Balls_of_Fire_A_probabilistic_approach_to_quantify_the_hazard_related_to_ballistics_-_A_case_study_at_La_Fossa_volcano_Vulcano_Island_Italy" target="_blank">Journal of Volcanology and Geothermal research</a> as *Biass S, Falcone J-L, Bonadonna C, et al (2016) Great Balls of Fire: A probabilistic approach to quantify the hazard related to ballistics — A case study at La Fossa volcano, Vulcano Island, Italy. J Volcanol Geotherm Res 325:1–14*.

## User manual
The complete user manual for GBF is available <a href="{{ site.baseurl }}/files/gbf_man.pdf" target="_blank">here</a>. Check the blog to see more recent additions.

## Example of applications
This list illustrates applications of GBF:

1. La Fossa volcano, Italy <a href="https://www.researchgate.net/publication/304243833_Great_Balls_of_Fire_A_probabilistic_approach_to_quantify_the_hazard_related_to_ballistics_-_A_case_study_at_La_Fossa_volcano_Vulcano_Island_Italy" target="_blank" class="tag">Paper</a>

2. 2008 explosion of Kilauea volcano, USA <a href="https://www.researchgate.net/publication/316010762_Partitioning_of_pyroclasts_between_ballistic_transport_and_a_convective_plume_Kilauea_volcano_19_March_2008" target="_blank" class="tag">Paper</a>

## Related blog entries
<ul style="padding-left: 15px;">
{% for post in site.tags.GBF limit: 20 %}
  <div>
    <li>
         <span>{{ post.date | date:"%Y-%m-%d" }}</span> - 
         <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
    </div>
{% endfor %}
</ul>