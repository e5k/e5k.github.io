---
layout: post
title: Post-processing ballistic modelling
categories: codes
tags: gbf probabilities post-processing grid
---

Here is a presentation of an extended version of the Matlab post-processing tools developed for our **[Great Balls of Fire]({{ site.baseurl }}/pages/gbf)** model for probabilistic hazard assessments of ballistic impact. The functions have been modified so output files of virtually any model can be loaded and processed through methods described <a href="https://www.researchgate.net/publication/304243833_Great_Balls_of_Fire_A_probabilistic_approach_to_quantify_the_hazard_related_to_ballistics_-_A_case_study_at_La_Fossa_volcano_Vulcano_Island_Italy" target="_blank">here</a>. These are the requirements:
1. Impact coordinates must be defined in UTM WGS84
2. Files must be ascii and tab delimited
3. Columns in the output file should be organised as indicated in the table below. Note that adding extra columns is acceptable


<table>
  <thead>
    <tr>
      <th>Column</th>
      <th>Data</th>
      <th>Unit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Easting</td>
      <td>m</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Northing</td>
      <td>m</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Altitude</td>
      <td>m asl</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Mass</td>
      <td>kg</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Diameter</td>
      <td>m</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Kinetic energy</td>
      <td>kJ</td>
    </tr>
  </tbody>
</table>

## Source material
Source material includes:
1. Our JVGR <a href="https://www.researchgate.net/publication/304243833_Great_Balls_of_Fire_A_probabilistic_approach_to_quantify_the_hazard_related_to_ballistics_-_A_case_study_at_La_Fossa_volcano_Vulcano_Island_Italy" target="_blank">paper</a>
2. The GBF <a href="{{ site.baseurl }}/files/gbf_man.pdf" target="_blank">user manual</a>
3. This 2017 IAVCEI presentation

## Dependencies
The post-processing functions rely on two files published on the Matlab File Exchange:
1. utm2ll
2. plot_google_map


# Ballistic modelling to probabilistic hazard assessment

## Note on grid averaging
Unlike for tephra deposits, the discrete nature of ballistic impacts requires the averaging on a grid. Grids can fall in two main categories that are **polar** and **cartesian**. However, grid averaging creates a dependancy of the result to the grid resolution/pixel area, which is not straightforward. Specifically:
1. Is it acceptable for a grid to have a pixels that have variable areas with distance from the vent (e.g., polar grids)?
2. Since increasing the pixel area increases the probability of impact, is there a threshold of grid resolution that provides stable results?
3. How does the grid shape/resolution interacts with the number of simulated ballistics and affect the stability of results?

This is just food for thought, but all these issues are associated with probabilistic hazard assessment for ballistic impacts, so better keeping them in mind. These issues should also be investigated, one possible way to do so being *sensitivity analysis*. Refer to our <a href="https://www.researchgate.net/publication/304243833_Great_Balls_of_Fire_A_probabilistic_approach_to_quantify_the_hazard_related_to_ballistics_-_A_case_study_at_La_Fossa_volcano_Vulcano_Island_Italy" target="_blank">JVGR</a> paper for more information.

<figure>
	<img src="{{ site.baseurl }}/img/blog/201709/bal_grid.jpg">
	<figcaption><b>Fig. 1</b> Illustration of the different approaches to average ballistics including i) polar grids with constant concentric distance from the vent, ii) polar grids with increasing distance from the vent, iii) cartesian grids and iv) area of interests</figcaption>
</figure>

In these post-processing functions, a true polar grid is not implemented. Instead, they calculate the probabilities of impact on both for **a given distance from the vent** (i.e., concentric rings) and at **a given radial sector around the vent**. The union probability of both approaches will result in a polar grid.

## Note on probabilities
In frequentist analyses, probabilities must represent a ratio between a *number of ballistic impacts* satisfying a given characteristics (e.g., a kinetic energy at impact that exceeds a threshold) and a *total number of ballistics*. Depending on our definition of the second term, let's call it **B<sub>TOT</sub>**, probabilities are going to express a different message.

If **B<sub>TOT</sub>** is the total number of simulated ballistics, the probability expresses **P(Z, E<sub>T</sub>)**, that is:
<div class="message">
  What is the probability of a zone Z to be impacted by a ballistic impact with an energy threshold greater than E<sub>T</sub>?
</div>

If **B<sub>TOT</sub>** is the total number of ballistics impacting a given zone, the probability expresses **P(E<sub>T</sub>|Z)**, that is:
<div class="message">
	What is the probability of a ballistic impacting zone Z to exceed an impact energy greater than E<sub>T</sub>?
</div>

These probabilities are significantly different. The post-processing functions presented here use both approaches.

# Using the functions
Additionally to the output file of your favourite model, you will need some more information:
1. Run name
2. The cartesian grid resolution (m)
3. Energy thresholds (J) to calculate exceedance probabilities
4. Probability thresholds (%) to calculate energies occurring at a given exeedance probability
5. Distance interval (m) used to define concentring rings
6. Radial interval (degree from north) used to define sectors around the vent
7. Vent easting (m, UTM WGS84)
8. Vent northing (m, UTM WGS84)
9. Vent's UTM zone

Functions can be called using a **GUI** approach, an **argument** approach or a **structure** approach. The following steps assume that you are in the root of the folder containing the functions.

## GUI approach

In the Matlab command, type:
{% highlight matlab %}
processGBF
{% endhighlight %}

This approach will open two consecutive GUIs that will prompt you to i) locate the input file and ii) define the additional variables described above.

## Argument approach
This approach allows the user to enter all inputs from the command line:
{% highlight matlab %}
processGBF(pth, name, res, eT, pT, dI, rI, vE, vN, vZ)
{% endhighlight %}

where:
1. **pth** is the path to the output file (string)
2. **name** is the run name (string)
2. **res** is the resolution of the cartesian grid (string)
3. **eT** is the energy threshold(s), where multiple values can be defined as a 1 x m vector (numeric)
4. **pT** is the probability threshold(s), where multiple values can be defined as a 1 x m vector (numeric)
5. **dI** is the distance interval (numeric)
6. **rI** is the radial interval (numeric)
7. **vE**, **vN** are the vent easting and northing, respectively (numeric)
8. **vZ** is the vent zone, defined as a numeric value only (i.e., do not enter the letter) and *positive* in the N hemisphere and *negative* in the S hemisphere (numeric)

## Structure approach
The structure approach combines the arguments 2-8 of the argument approach into a structure. Is is useful to use to output of a GBF post-processing run.

{% highlight matlab %}
processGBF(pth, run)
{% endhighlight %}

where **run** is a Matlab structure named as the arguments 2-8 of the argument approach.

## Output argument
Calling:
{% highlight matlab %}
project = processGBF(...)
{% endhighlight %}

returns a Matlab structure containing all the output data... but stick around until the next section!


# Outputs and results
Upon completion of the **processGBF** function, a folder named after the **name** variable is created, which contains results in a Matlab format (i.e., *name*.mat) and in a ESRI ASCII grid format. All probabilities are expressed in % and all energies are expressed in Joules.

## ASCII grid format
Probabilities are written in three main shapes:
1. **prob-pixel** are probabilities averaged over a cartesian grid
2. **prob-distance** are probabilities at a given distance from the vent
3. **prob-radial** are probabilities in a given radial sector around the vent

Note that:
1. Each file also contains the energy threshold for which the probability is calculated (in Joules)
2. The **prob-distance** and the **prob-radial** files contain two additional bits of information:
		- Files containing **all** express **P(Z, E<sub>T</sub>)**
		- Files containing **zone** express **P(E<sub>T</sub>|Z)**
3. The **prob-pixel** files do not make this distinction and express **P(Z, E<sub>T</sub>)**

Additional files contain:
1. **en** files, showing the energy occurring within a pixel of the cartesian grid for a given probability of occurrence
2. **nb-part** contains the number of ballistics impacting each pixel of the cartesian grid

## Matlab format

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>storP</td>
      <td>3D matrix containing probabilities computed on a cartesian grid of size N x E x E<sub>T</sub>, where N is the number of pixel along the northing, E is the number of pixels along the easting and E<sub>T</sub> is the number of user-defined energy thresholds</td>
    </tr>
    <tr>
      <td>storE</td>
      <td>3D matrix containing energies for a given exceedance probability computed on a cartesian grid. Same size as storP, where the third dimension is the number of user-defined probability thresholds</td>
    </tr>
    <tr>
      <td>storB</td>
      <td>2D matrix containing the number of ballistics impacting the pixels of a cartesian grid</td>
    </tr>
    <tr>
      <td>x</td>
      <td>Vector containing the easting coordinate of the ballistic impact. The vector length equals the number of simulated ballistics</td>
    </tr>
    <tr>
      <td>y</td>
      <td>Vector containing the northing coordinate of the ballistic impact (same size as x)</td>
    </tr>
    <tr>
      <td>m</td>
      <td>Vector containing the mass of the ballistic (same size as x)</td>
    </tr>
  </tbody>
</table>



## Recommendations
Plume height is an important source parameter, and although recent method help estimating it when observed, the characterisation of older deposit still strongly depends on the method of Carey and Sparks (1986) and the characterisation of the maximum clasts. The work of Mohssen Bagheri really reduces the uncertainty on the estimation of the drag coefficient and here are the recommendations that come out of his papers for estimating an equivalent diameter:
1. For a given clast, look for the projection with the maximum area.
2. The largest axis from this projection defines L and the smallest axis defines I. Note that they <b>do not need</b> to be perpendicular.
3. Look for the projection with the smallest area. The smallest axis on this projection defines S.
4. Use the geometric mean of L, I and S as your equivalent diameter.

## Further reading
1. Bagheri GH, Bonadonna C, Manzella I, Vonlanthen P (2015) On the characterization of size and shape of irregular particles. Powder Technol 270:141–153.
2. Bagheri G, Bonadonna C (2016) On the drag of freely falling non-spherical particles. Powder Technol 301:526–544. doi: https://doi.org/10.1016/j.powtec.2016.06.015
3. Biass S, Bagheri G, Aeberhard W, Bonadonna C (2014) TError: towards a better quantification of the uncertainty propagated during the characterization of tephra deposits. Stat Volcanol 1:1–27.
4. Carey S, Sparks R (1986) Quantitative models of the fallout and dispersal of tephra from volcanic eruption columns. Bull Volcanol 48:109–125.
