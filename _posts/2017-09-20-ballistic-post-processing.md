---
layout: post
title: Quantifying probabilities from ballistic models
categories: codes
tags: gbf probabilities post-processing grid
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
<figcaption><b>Table 1</b>: Example of an input file for the <b>processGBF</b> function.</figcaption>

### Source material
Source material includes:
1. Our JVGR <a href="https://www.researchgate.net/publication/304243833_Great_Balls_of_Fire_A_probabilistic_approach_to_quantify_the_hazard_related_to_ballistics_-_A_case_study_at_La_Fossa_volcano_Vulcano_Island_Italy" target="_blank">paper</a>
2. The GBF <a href="{{ site.baseurl }}/files/gbf_man.pdf" target="_blank">user manual</a>
3. This 2017 <a href="https://www.researchgate.net/publication/320005132_Ballistic_hazard_assessment" target="_blank">IAVCEI presentation</a>

### Dependencies
The post-processing functions rely on two files published on the Matlab File Exchange:
1. <a href="https://uk.mathworks.com/matlabcentral/fileexchange/45699-ll2utm-and-utm2ll" target="_blank">utm2ll</a> by François Beauducel
2. <a href="https://uk.mathworks.com/matlabcentral/fileexchange/27627-zoharby-plot-google-map" target="_blank">plot\_google\_map</a> by Zohar Bar-Yehuda

### Access the code
The post-processing function can be obtained <a href="https://github.com/e5k/GBF-Post-Processing" target="_blank">here</a>

## 1. From ballistic modelling to probabilistic hazard assessment

### 1.1 The need of a reference area
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

### 1.2 What probabilities?
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

## 2 Using the function
### 2.1 Input arguments
Table 2 summarises the input parameters required by the **processGBF** function. Functions can be called using a **GUI**, **arguments** or a **structure**. The following steps assume that you are in the root of the folder containing the functions.

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
		  <td>gridRes</td>
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
<div class="figcaption">
<figcaption><b>Table 2</b>: Input variables required by the <b>processGBF</b> function.</figcaption>
</div>


#### 2.1.1 Using the GUI

In the Matlab command, type:
{% highlight matlab %}
processGBF
{% endhighlight %}

This approach will open two consecutive GUIs that will prompt you to i) locate the input file and ii) define the additional variables described above.

#### 2.1.2 Using arguments
This approach allows the user to enter all input argument separately from the command line:
{% highlight matlab %}
processGBF(pth, name, gridRes, subset, eT, pT, dI, rI, vE, vN, vZ)
{% endhighlight %}

All variables refer to Table 1.

#### 2.1.3 Using an input structure
The structure approach combines the arguments 2-9 of the argument approach into a structure. It is useful to use to output of a GBF post-processing run.

{% highlight matlab %}
processGBF(pth, run)
{% endhighlight %}

where <var>run</var> is a Matlab structure named as the arguments 2-9 of the argument approach.

### 2.2 Output argument
Calling:
{% highlight matlab %}
project = processGBF(...)
{% endhighlight %}

returns a Matlab structure containing all the output data... but stick around until the next section!


## 3 Outputs and results
Upon completion of the <var>processGBF</var> function, a folder named after the <var>name</var> variable is created, which contains results in a Matlab format (i.e., *name*.mat) and in a ESRI ASCII grid format. All probabilities are expressed in % and all energies are expressed in Joules.

### 3.1 ASCII grid format
Three main categories of ASCII files are written:
1. <var>pixel</var>, which use a cartesian grid
2. <var>concentric</var>, which use concentric zones around the vent
3. <var>radial</var>, which use radial sectors around the vent

Each of these categories have sub-categories defined by:
1. <var>prob</var>, which contain the exceedence probabilities (%) for ballistic impacts to exceed a given threshold of kinetic energy
2. <var>en</var>, which contain the typical kinetic energy (J) at impact for a given exceedance probabillity

The probability files are themselves differentiated between:
1. <var>abs</var>, which contain absolute probabilities and
1. <var>rel</var>, which contain relative probabilities



### 3.2 Matlab format
The Matlab output file, i.e. *name*.mat, contains the most comprehensive output. It is compiled as a Matlab *structure* containing:
1. <var>inBal</var>, which is a duplicate of the input arguments shown in Table 1
2. <var>bal</var>, which contains the data of all simulated particles
3. <var>pixel</var>, which contains the result of the processing performed using a cartesian grid  
4. <var>concentric</var>, which contains the result of the processing performed  using concentric zones around the vent
5. <var>radial</var>, which contains the result of the processing performed using radial sectors around the vent


#### .bal
<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
  	<tr>
  	  <td>x</td>
  	  <td>Easting of each ballistic (n x 1 vector, where n is the total number of simulated ballistics)</td>
  	</tr>
  	<tr>
  	  <td>y</td>
  	  <td>Northing of each ballistic (n x 1 vector)</td>
  	</tr>
  	<tr>
  	  <td>lat</td>
  	  <td>Latitude of each ballistic (n x 1 vector)</td>
  	</tr>
  	<tr>
  	  <td>lon</td>
  	  <td>Longitude of each ballistic (n x 1 vector)</td>
  	</tr>
  	
  	<tr>
  	  <td>e</td>
  	  <td>Kinetic energy (J) at impact of each ballistic (n x 1 vector)</td>
  	</tr>
  	
  	<tr>
  	  <td>n</td>
  	  <td>Total number of simulated ballistics</td>
  	</tr>
  	
  	<tr>
  	  <td>d</td>
  	  <td>Distance from the vent of each ballistic (n x 1 vector)</td>
  	</tr>
  	<tr>
  	  <td>r</td>
  	  <td>Angle from the vent of each ballistic (n x 1 vector)</td>
  	</tr>
    <tr>
      <td>xi</td>
      <td>X coordinate of each ballistic on the cartesian grid (n x 1 vector)</td>
    </tr>    
    <tr>
      <td>yi</td>
      <td>Y coordinate of each ballistic on the cartesian grid (n x 1 vector)</td>
    </tr>
    <tr>
      <td>data</td>
      <td>Original data contained in the user-defined input file</td>
    </tr>
  </tbody>
</table>


#### .pixel
<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
  	<tr>
  	  <td>east</td>
  	  <td>Easting coordinates of the cartesian grid (i x j matrix, where i and j represent the northing and easting intervals of a grid of resolution gridRes covering the entire ballistic field, respectively)</td>
  	</tr>
  	<tr>
  	  <td>north</td>
  	  <td>Northing coordinates of the cartesian grid (i x j matrix)</td>
  	</tr>
  	<tr>
  	  <td>lat</td>
  	  <td>Latitude of the cartesian grid (i x j matrix)</td>
  	</tr>
  	<tr>
  	  <td>lon</td>
  	  <td>Longitude of the cartesian grid (i x j matrix)</td>
  	</tr>
  	<tr>
  	  <td>Nt</td>
  	  <td>Number of ballistics in each pixel of the cartesian grid (i x j matrix)</td>
  	</tr>
  	
  	<tr>
  	  <td>E</td>
  	  <td>Kinetic energy (J) at impact for a given exceedance probability computed on the cartesian grid (i x j x pT matrix)</td>
  	</tr>
  	
  	<tr>
  	  <td>N</td>
  	  <td>Number of ballistics with kinetic energies exceeding a given energy threshold in each pixel of the cartesian grid (i x j x eT matrix)</td>
  	</tr>
  	
  	<tr>
  	  <td>Pabs</td>
  	  <td>Absolute probability (%) for ballistic impacts to exceed an energy threshold (i x j x eT matrix)</td>
  	</tr>
  	
  	<tr>
  	  <td>Prel</td>
  	  <td>Relative probability (%) for ballistic impacts to exceed an energy threshold </td>
  	</tr>
  </tbody>
</table>


#### .concentric

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
  	<tr>
  	  <td>bin</td>
  	  <td>Distances of the concentric rings around the vent (m)</td>
  	</tr>
  	<tr>
  	  <td>Nt</td>
  	  <td>Number of ballistics in each concentric ring (length(bin) x 1 vector)</td>
  	</tr>
  	
  	<tr>
  	  <td>N</td>
  	  <td>Number of ballistics with kinetic energies exceeding a given energy threshold in each concentric ring (length(bin) x eT matrix)</td>
  	</tr>
  	
  	<tr>
  	  <td>E</td>
  	  <td>Kinetic energy (J) at impact for a given exceedance probability computed in each concentric ring (length(bin) x pT matrix)</td>
  	</tr>
  	
  	<tr>
  	  <td>Pabs</td>
  	  <td>Absolute probability (%) for ballistic impacts to exceed an energy threshold (length(bin) x eT matrix)</td>
  	</tr>
  	
  	<tr>
  	  <td>Prel</td>
  	  <td>Relative probability (%) for ballistic impacts to exceed an energy threshold (length(bin) x eT matrix)</td>
  	</tr>

  	<tr>
  	  <td>east</td>
  	  <td>Easting coordinates of the cartesian grid used to represent the concentric rings on a map (i x j matrix). i and j represent the northing and easting intervals of a grid of resolution gridRes(2) (or 10% of gridRes(1) covering the entire ballistic field, respectively</td>
  	</tr>
  	
  	<tr>
  	  <td>north</td>
  	  <td>Northing coordinates of the cartesian grid used to represent the concentric rings on a map (i x j matrix)</td>
  	</tr>
  	
  	<tr>
  	  <td>lat</td>
  	  <td>Latitude of the cartesian grid used to represent the concentric rings on a map (i x j matrix)</td>
  	</tr>
  	<tr>
  	  <td>lon</td>
  	  <td>Longitude of the cartesian grid used to represent the concentric rings on a map (i x j matrix)</td>
  	</tr>
  </tbody>
</table>

Note that **binM**, **NtM**, **NM**, **EM**, **PabsM** and **PrelM** contain the same data as **bin**, **Nt**, **N**, **E**, **Pabs** and **Prel** gridded on a matrix, which can be used along **east/north** or **lon/lat** for plotting on a map. 


#### .radial

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
  	<tr>
  	  <td>bin</td>
  	  <td>Distances of the radial sectors around the vent (m)</td>
  	</tr>
  	<tr>
  	  <td>Nt</td>
  	  <td>Number of ballistics in each radial sector (length(bin) x 1 vector)</td>
  	</tr>
  	
  	<tr>
  	  <td>N</td>
  	  <td>Number of ballistics with kinetic energies exceeding a given energy threshold in each radial sector (length(bin) x eT matrix)</td>
  	</tr>
  	
  	<tr>
  	  <td>E</td>
  	  <td>Kinetic energy (J) at impact for a given exceedance probability computed in each radial sector (length(bin) x pT matrix)</td>
  	</tr>
  	
  	<tr>
  	  <td>Pabs</td>
  	  <td>Absolute probability (%) for ballistic impacts to exceed an energy threshold (length(bin) x eT matrix)</td>
  	</tr>
  	
  	<tr>
  	  <td>Prel</td>
  	  <td>Relative probability (%) for ballistic impacts to exceed an energy threshold (length(bin) x eT matrix)</td>
  	</tr>

  	<tr>
  	  <td>east</td>
  	  <td>Easting coordinates of the cartesian grid used to represent the radial sectors on a map (i x j matrix). i and j represent the northing and easting intervals of a grid of resolution gridRes(2) (or 10% of gridRes(1) covering the entire ballistic field, respectively</td>
  	</tr>
  	
  	<tr>
  	  <td>north</td>
  	  <td>Northing coordinates of the cartesian grid used to represent the radial sectors on a map (i x j matrix)</td>
  	</tr>
  	
  	<tr>
  	  <td>lat</td>
  	  <td>Latitude of the cartesian grid used to represent the radial sectors on a map (i x j matrix)</td>
  	</tr>
  	<tr>
  	  <td>lon</td>
  	  <td>Longitude of the cartesian grid used to represent the radial sectors on a map (i x j matrix)</td>
  	</tr>
  </tbody>
</table>

Here again, **binM**, **NtM**, **NM**, **EM**, **PabsM** and **PrelM** contain the same data as **bin**, **Nt**, **N**, **E**, **Pabs** and **Prel** gridded on a matrix, which can be used along **east/north** or **lon/lat** for plotting on a map. 

## 4 Displaying results
The <var>displayGBF</var> function offers an interactive GUI to plot the results of the <var>processGBF</var> function. Start it by typing
{% highlight matlab %}
displayGBF
{% endhighlight %}
in the Matlab command. Then select the <pth>name*.mat</pth> file output of the <var>processGBF</var> function and you are good to go!