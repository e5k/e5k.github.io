---
layout: post
title: Quantifying probabilities from ballistic models
categories: codes
tags: GBF probabilities post-processing grid
---

Here is presented an extended version of the Matlab post-processing function developed for the **[Great Balls of Fire]({{ site.baseurl }}/pages/gbf)** model for the probabilistic hazard assessment of ballistic impact. This function has been modified so output files of virtually any model can be loaded and processed through methods described <a href="https://www.researchgate.net/publication/304243833_Great_Balls_of_Fire_A_probabilistic_approach_to_quantify_the_hazard_related_to_ballistics_-_A_case_study_at_La_Fossa_volcano_Vulcano_Island_Italy" target="_blank">here</a>. Requirements are:
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
3. This 2017 <a href="https://www.researchgate.net/publication/320005132_Ballistic_hazard_assessment" target="_blank">IAVCEI presentation</a>

## Dependencies
The post-processing functions rely on two files published on the Matlab File Exchange:
1. <a href="https://uk.mathworks.com/matlabcentral/fileexchange/45699-ll2utm-and-utm2ll" target="_blank">utm2ll</a> by François Beauducel
2. <a href="https://uk.mathworks.com/matlabcentral/fileexchange/27627-zoharby-plot-google-map" target="_blank">plot\_google\_map</a> by Zohar Bar-Yehuda


# From ballistic modelling to probabilistic hazard assessment

## The need of a reference area
Unlike for tephra deposits, the discrete nature of ballistic impacts requires to average single ballistic impacts on a grid. Grids can fall in two main categories that are **polar** and **cartesian**. However, averaging impacts on a grid creates a dependancy of the final result to the spatial resolution. In other words:
1. Is it acceptable for a grid to have pixels areas that vary with distance from the vent (e.g., polar grids)?
2. Since increasing the pixel area increases the probability of impact, is there a threshold of grid resolution that provides stable results?
3. How does the grid shape/resolution interacts with the number of simulated ballistics and affect the stability of results?

Probabilistic hazard assessment for ballistic impacts should therefore address these issues, one possible way to do so being through *sensitivity analysis*. This new post-processing function can be accessed either through a GUI or programatically, which facilitates sensitivity analyses. Refer to our <a href="https://www.researchgate.net/publication/304243833_Great_Balls_of_Fire_A_probabilistic_approach_to_quantify_the_hazard_related_to_ballistics_-_A_case_study_at_La_Fossa_volcano_Vulcano_Island_Italy" target="_blank">JVGR</a> paper for more information.

<figure>
	<img src="{{ site.baseurl }}/img/blog/201709/bal_grid.jpg">
	<figcaption><b>Fig. 1</b> Illustration of the different approaches to average ballistics including i) polar grids with constant concentric distance from the vent, ii) polar grids with increasing distance from the vent, iii) cartesian grids and iv) area of interests</figcaption>
</figure>

In this post-processing function, a true polar grid is not implemented. Instead, probabilities of impact are calculated using both **a given distance from the vent** (i.e., concentric rings) and at **a given radial sector around the vent**. The union probability of both approaches will result in a polar grid.

## What probabilities?
In frequentist analyses, probabilities must represent a ratio between a *number of ballistic impacts* satisfying a given characteristics (e.g., a kinetic energy at impact that exceeds a threshold) and a *total number of ballistics*. Depending on our definition of the second term, let's call it **B<sub>TOT</sub>**, probabilities are going to express a different message.

If **B<sub>TOT</sub>** is the total number of simulated ballistics, the probability expresses **P(Z, E<sub>T</sub>)**, that is:
<div class="message">
  What is the probability of a zone Z to be impacted by a ballistic impact with an energy threshold greater than E<sub>T</sub>?
</div>

If **B<sub>TOT</sub>** is the total number of ballistics impacting a given zone, the probability expresses **P(E<sub>T</sub>|Z)**, that is:
<div class="message">
	What is the probability of a ballistic impacting zone Z to exceed an impact energy greater than E<sub>T</sub>?
</div>

These probabilities are significantly different, and both are considered in the post-processing approach presented here. For simplicity, we will refer to **B<sub>TOT</sub>** as **absolute probabilities** and **B<sub>TOT</sub>** as **relative probabilities**.

# Using the function
## Input arguments
Table 1 summarises the input parameters required by the **processGBF** function. Functions can be called using a **GUI**, **arguments** or a **structure**. The following steps assume that you are in the root of the folder containing the functions.

<table>
  <thead>
    <tr>
      <th>Variable</th>
      <th>Description</th>
      <th>Unit</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>pth</td>
      <td>Path to the output file</td>
      <td>-</td>
      <td>String</td>
    </tr>
		<tr>
		  <td>name</td>
		  <td>Run name</td>
		  <td>-</td>
		  <td>String</td>
		</tr>
		<tr>
		  <td>res</td>
		  <td>Resolution of the cartesian grid, which can be enter either as a single value or a 1x2 vector. In the case of a 1x2 vector, the first value is the resolution of the grid used for the pixel approach and the second value is the resolution of the grid used to map the result of the concentric and radial approaches. If only one value is entered, the resolution of the grid for the concentric and radial approaches is arbitrarily set to be 10% finer than the grid used for the pixel approach. This is only done to ensure smooth display on maps.</td>
		  <td>m</td>
		  <td>Numeric</td>
		</tr>
		<tr>
		  <td>subset</td>
		  <td>Subset of the total population of VBPs. Default is 100%, but can be decreased for sensitivity analyses</td>
		  <td>%</td>
		  <td>Numeric</td>
		</tr>
		<tr>
		  <td>eT</td>
		  <td>Energy threshold(s) used to calculate exceedance probabilities. Multiple values can be defined as a vector</td>
		  <td>J</td>
		  <td>Numeric</td>
		</tr>
		<tr>
		  <td>pT</td>
		  <td>Probability threshold(s) used to calculate energies occurring at a given exeedance probability. Multiple values can be defined as a vector</td>
		  <td>%</td>
		  <td>Numeric</td>
		</tr>
		<tr>
		  <td>dI</td>
		  <td>Distance interval used to define concentring rings</td>
		  <td>m</td>
		  <td>Numeric</td>
		</tr>
		<tr>
		  <td>rI</td>
		  <td>Angle interval used to define radial sectors</td>
		  <td>Degrees</td>
		  <td>Numeric</td>
		</tr>
		<tr>
		  <td>vE</td>
		  <td>Vent easting</td>
		  <td>m</td>
		  <td>Numeric</td>
		</tr>
		<tr>
		  <td>vN</td>
		  <td>Vent northing</td>
		  <td>m</td>
		  <td>Numeric</td>
		</tr>
		<tr>
		  <td>vZ</td>
		  <td>Vent zone defined as a numeric value only (i.e., do not enter the letter) and *positive* in the N hemisphere and *negative* in the S hemisphere (numeric)</td>
		  <td>-</td>
		  <td>Numeric</td>
		</tr>	
  </tbody>
</table>
**Table 1**: Input variables required by the **processGBF** function.


### Using the GUI

In the Matlab command, type:
{% highlight matlab %}
processGBF
{% endhighlight %}

This approach will open two consecutive GUIs that will prompt you to i) locate the input file and ii) define the additional variables described above.

### Using arguments
This approach allows the user to enter all input argument separately from the command line:
{% highlight matlab %}
processGBF(pth, name, res, eT, pT, dI, rI, vE, vN, vZ)
{% endhighlight %}

All variables refer to Table 1.

### Using an input structure
The structure approach combines the arguments 2-8 of the argument approach into a structure. It is useful to use to output of a GBF post-processing run.

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
2. The **prob-distance** and the **prob-radial** files contain two additional bits of information. Files containing **all** express **P(Z, E<sub>T</sub>)** while files containing **zone** express **P(E<sub>T</sub>|Z)**
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
  	  <td colspan="2">Cartesian</td>
  	</tr>
  	<tr>
  	  <td>eT</td>
  	  <td>Vector containing the energy thresholds (J)</td>
  	</tr>
  	<tr>
  	  <td>pT</td>
  	  <td>Vector containing the probability thresholds (%)</td>
  	</tr>
  	
    <tr>
      <td>gridP</td>
      <td>3D matrix containing probabilities computed on a cartesian grid of size N x E x E<sub>T</sub>, where N is the number of pixel along the northing, E is the number of pixels along the easting and E<sub>T</sub> is the number of user-defined energy thresholds</td>
    </tr>
    <tr>
      <td>gridE</td>
      <td>3D matrix containing energies for a given exceedance probability computed on a cartesian grid. Same size as storP, where the third dimension is the number of user-defined probability thresholds</td>
    </tr>
    <tr>
      <td>gridB</td>
      <td>2D matrix containing the number of ballistics impacting the pixels of a cartesian grid</td>
    </tr>
    <tr>
      <td>gridRes</td>
      <td>Pixel size of the cartesian grid</td>
    </tr>
    
    <tr>
      <td>dI</td>
      <td>2D matrix containing the number of ballistics impacting the pixels of a cartesian grid</td>
    </tr>
    <tr>
      <td>dVec</td>
      <td>2D matrix containing the number of ballistics impacting the pixels of a cartesian grid</td>
    </tr>
    <tr>
      <td>dHist</td>
      <td>2D matrix containing the number of ballistics impacting the pixels of a cartesian grid</td>
    </tr>
    <tr>
      <td>dP</td>
      <td>2D matrix containing the number of ballistics impacting the pixels of a cartesian grid</td>
    </tr>
    <tr>
      <td>rI</td>
      <td>2D matrix containing the number of ballistics impacting the pixels of a cartesian grid</td>
    </tr>
    <tr>
      <td>rVec</td>
      <td>2D matrix containing the number of ballistics impacting the pixels of a cartesian grid</td>
    </tr>
    <tr>
      <td>rHist</td>
      <td>2D matrix containing the number of ballistics impacting the pixels of a cartesian grid</td>
    </tr>
    <tr>
      <td>rP</td>
      <td>2D matrix containing the number of ballistics impacting the pixels of a cartesian grid</td>
    </tr>
    
    <tr>
      <td>n</td>
      <td>Number of simulated ballistics</td>
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
      <td>d</td>
      <td>Vector containing the distance from the vent (m; same size as x)</td>
    </tr>
    <tr>
      <td>e</td>
      <td>Vector containing ballistic energy (kJ; same size as x)</td>
    </tr>
    <tr>
      <td>lat</td>
      <td>Vector containing the latitude of the ballistic (degree; same size as x)</td>
    </tr>
    <tr>
      <td>lon</td>
      <td>Vector containing the longitude of the ballistic (degree; same size as x)</td>
    </tr>
    <tr>
      <td>d</td>
      <td>Vector containing the mass of the ballistic (same size as x)</td>
    </tr>
  </tbody>
</table>


