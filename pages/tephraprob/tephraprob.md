---
layout: page
title: TephraProb
permalink: pages/tephraprob
categories: Codes
tags: TephraProb
---

TephraProb is a toolbox of Matlab functions designed to produce scenario-based probabilistic hazard assessments for ground tephra accumulation based on the <a href="https://github.com/ljc-geo/tephra2" target="_blank">Tephra2</a> model. The toolbox includes a series of graphical user interfaces that collect, analyse and pre--process input data, create distributions of eruption source parameters based on a wide range of probabilistic eruption scenarios, run Tephra2 using the generated input scenarios and provide results as exceedence probability maps, probabilistic isomass maps and hazard curves. 

TephraProb is maintained on <a href="https://github.com/e5k/TephraProb" target="_blank">GitHub</a> and was published in <a href="https://appliedvolc.springeropen.com/articles/10.1186/s13617-016-0050-5" target="_blank">Journal of Applied Volcanology</a> as *Biass S, Bonadonna C, Connor L, Connor C (2016) TephraProb: a Matlab package for probabilistic hazard assessments of tephra fallout. J Appl Volcanol 5:1–16*.

This page provides the basic user-manual and archives all updates in the form of blog posts.

## User manual
The complete user manual for TephraProb is available <a href="{{ site.baseurl }}/files/tephraprob_man.pdf" target="_blank">here</a>. Please note that the user manual provides an in-depth review of the functionalities based on the initial version of TephraProb. Be sure to check the blog to see more recent additions.

## Video tutorial
Video tutorial were compiled [here]({{ site.baseurl }}/pages/tephraprob-videos). 

## Example of applications
This list illustrates applications of TephraProb:

1. Cotopaxi volcano, Ecuador <a href="https://www.researchgate.net/publication/256325979_A_fast_GIS-based_risk_assessment_for_tephra_fallout_The_example_of_Cotopaxi_volcano_Ecuador_Part_I_Probabilistic_hazard_assessment" target="_blank" class="tag">Paper 1</a><a href="https://www.researchgate.net/publication/256326095_A_fast_GIS-based_risk_assessment_for_tephra_fallout_The_example_of_Cotopaxi_volcano_Ecuador_Part_II_Vulnerability_and_risk_assessment" target="_blank" class="tag">Paper 2</a>

2. El Misti volcano, Peru <a href="https://www.researchgate.net/publication/261013008_Long-term_multi-hazard_assessment_for_El_Misti_volcano_Peru?_iepl%5BviewId%5D=SYlIvisrA309vcrovE3uMIgd&_iepl%5BprofilePublicationItemVariant%5D=default&_iepl%5Bcontexts%5D%5B0%5D=prfpi&_iepl%5BtargetEntityId%5D=PB%3A261013008&_iepl%5BinteractionType%5D=publicationTitle" target="_blank" class="tag">Paper</a>

3. Hekla, Katla, Askja and Eyjafjallajökull volcanoes, Iceland <a href="https://www.researchgate.net/publication/263040987_A_multi-scale_risk_assessment_for_tephra_fallout_and_airborne_concentration_from_multiple_Icelandic_volcanoes_-_Part_1_Hazard_assessment" target="_blank" class="tag">Paper 1</a><a href="https://www.researchgate.net/publication/262949293_A_multi-scale_risk_assessment_for_tephra_fallout_and_airborne_concentration_from_multiple_Icelandic_volcanoes_-_Part_2_Vulnerability_and_impact?_iepl%5BviewId%5D=SYlIvisrA309vcrovE3uMIgd&_iepl%5BprofilePublicationItemVariant%5D=default&_iepl%5Bcontexts%5D%5B0%5D=prfpi&_iepl%5BtargetEntityId%5D=PB%3A262949293&_iepl%5BinteractionType%5D=publicationTitle" target="_blank" class="tag">Paper 2</a>

4. Okataina volcanic center, New Zealand <a href="https://www.researchgate.net/publication/275234353_Exploring_the_influence_of_vent_location_and_eruption_style_on_tephra_fall_hazard_from_the_Okataina_Volcanic_Centre_New_Zealand" target="_blank" class="tag">Paper 1</a><a href="https://www.researchgate.net/publication/309881088_Quantifying_risk_to_agriculture_from_volcanic_ashfall_a_case_study_from_the_Bay_of_Plenty_New_Zealand" target="_blank" class="tag">Paper 2</a>

5. La Fossa volcano, Italy <a href="https://www.researchgate.net/publication/301483866_Probabilistic_evaluation_of_the_physical_impact_of_future_tephra_fallout_events_for_the_Island_of_Vulcano_Italy" target="_blank" class="tag">Paper</a>

6. Cordon Caulle volcano, Chile <a href="https://www.researchgate.net/publication/282896424_Chronology_and_impact_of_the_2011_Puyehue-Cordon_Caulle_eruption_Chile" target="_blank" class="tag">Paper</a>

## Related blog entries
<ul style="padding-left: 15px;">
{% for post in site.tags.TephraProb limit: 20 %}
  <div>
    <li>
         <span>{{ post.date | date:"%Y-%m-%d" }}</span> - 
         <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
    </div>
{% endfor %}
</ul>
