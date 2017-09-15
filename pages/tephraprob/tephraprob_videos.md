---
layout: page
title: TephraProb video tutorial
permalink: pages/tephraprob-videos
categories: codes
tags: TephraProb tutorial videos
---

## 1/7 Introduction
<div class="videoFrame">
<iframe width="560" height="315" src="https://www.youtube.com/embed/ggHHLBKBLn8?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
</div>

This is the first of a series of video tutorials for TephraProb, which is a set of Matlab functions wrapped around user-friendly interfaces that assists each step of the compilation of probabilistic hazard assessments for tephra accumulation.

## 2/7 Grid and points of interests
<div class="videoFrame">
<iframe width="560" height="315" src="https://www.youtube.com/embed/dgo2bZXKv0U?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
</div>
Generation of computation grids and points over continuous UTM coordinates. Although grids allow the compilation of probability maps, their use can be difficult when running calculations on a single-CPU computer. In this case, computations can also be performed on points of interests, which allows to compute hazard curves. 

This part of the tutorial illustrates how to create calculation grids and points of interests and how to display them over a map.

## 3/7 Wind
<div class="videoFrame">
<iframe width="560" height="315" src="https://www.youtube.com/embed/zZ-oafGPkqg?rel=0&amp;showinfo=0&amp;start=3" frameborder="0" allowfullscreen></iframe></div>
Episode 3 of the saga keeps on being deleted for "Copyright reasons" (right.). Sorry about that. Instead sit back and enjoy this classic motion picture.

## 4/7 Accessing the GVP database
<div class="videoFrame">
<iframe width="560" height="315" src="https://www.youtube.com/embed/WgpZe8MXdM0?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
</div>
Hazard assessments are based upon the assumption that future activity will be similar to past activity or will follow the present trend. Understanding the eruptive history of a given volcano is therefore crucial, although difficult due to the nature of field work. The Global Volcanism Program of the Smithsonian Institution compiles published  data in a single database, which is useful when extrapolating studied eruptions into broader eruption scenarios.

This part of the tutorial demonstrates how to access, display and analyse eruption data from the GVP database, and allows basic statistical calculations.

## 5/7 Probabilistic eruption scenarios
<div class="videoFrame">
<iframe width="560" height="315" src="https://www.youtube.com/embed/x6rHXq87t8I?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
</div>
Probabilistic strategies aim at accounting for eruptive events that are not preserved in the geological record or that haven't occurred yet. Probabilistic eruption scenarios are defined by sets of critical eruption source parameters (ESP) defined as distributions rather than single values, which allows stochastic sampling of ESPs.

This part of the tutorials reviews the range of eruption scenarios offered in TephraProb, including short-lasting Plinian eruptions, long-lasting eruptions, Vulcanian explosions and long-lasting Vulcanian cycles. Eruption scenarios are those of Bonadonna (2006) further developed by Biass et al. (2014).


## 6/7 Eruption scenarios and modeling
<div class="videoFrame">
<iframe width="560" height="315" src="https://www.youtube.com/embed/x4PdQuVfH5E?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
</div>
Following on the previous video, this part of the tutorial illustrates how to setup the stochastic sampling of ESPs within TephraProb and run the TEPHRA2 model (Bonadonna et al. 2005). A detailed review of the output folders and files is given.

## 7/7 Probability calculations, display and export
<div class="videoFrame">
<iframe width="560" height="315" src="https://www.youtube.com/embed/0n1n0p_RHN0?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
</div>
A frequentist approach is used on the model output to quantify the probability of exceeding a given accumulation of tephra given the occurrence of the eruption scenario. TephraProb automatizes these calculations and produces three main output types, namely i) probability maps showing the geographical distribution of probabilities to exceed one given accumulation of tephra, ii) hazard curves summarizing the probability of exceeding any tephra accumulation for a single point and iii) probabilistic isomass maps showing typical tephra accumulations for a given probability of occurrence.

Final results can be either directly visualized in TephraProb or exported for the most common mapping and GIS platforms for further analyses.