---
layout: post
title: Describing the geometry of tephra deposits
categories: codes
tags: TephraFits Isopach Isopleth
---

The geometry of tephra deposits reflects eruptive styles and eruption conditions producing the tephra. Describing this geometry allows the identification of sets of parameters that, in turn, permit the quantification of physical processes controlling the generation, transportation and sedimentation of the eruption products. The geometry is typically described by mapping the spatial distribution of thickness or mass, maximum size of pyroclasts and grain-size distribution. These discrete observation are then interpolated into isopach, isomass and isopleth maps, which can be fitted using various statistical methods to integrate the characteristics of the deposit in 3 dimensions. 

## Input arguments

### Fitting strategies

Three fitting strategies are implemented in **TephraFits** and include *exponential*, *power law* and *weibull* (Table 1). Fitting options must be passed in the second argument as a string or a cell array of strings.

<table>
  <thead>
    <tr>
      <th>Fit</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Exponential</td>
      <td>Fit using a single or multiple exponential segments as developed by <a href="https://link.springer.com/article/10.1007%2FBF01086757?LI=true" target="_blank">Pyle (1989)</a> and <a href="https://link.springer.com/article/10.1007/BF00278005" target="_blank">Fierstein and Nathenson (1992)</a>.</td>
    </tr>
    <tr>
      <td>Power law</td>
      <td>Power law fit as developed by <a href="https://link.springer.com/article/10.1007%2FBF01086757?LI=true" target="_blank">Bonadonna and Houghton (2005)</a></td>
    </tr> 
    <tr>
      <td>Weibull</td>
      <td>Weibull fit as developed by <a href="https://pubs.geoscienceworld.org/geology/article-abstract/40/5/415/130888/estimating-the-volume-of-tephra-deposits-a-new?redirectedFrom=fulltext" target="_blank">Bonadonna and Costa (2012)</a> and <a href="https://link.springer.com/article/10.1007/s00445-013-0742-1" target="_blank">Bonadonna and Costa (2013)</a></td>
    </tr>
  </tbody>
</table>
<figcaption><b>Table 2</b>: Type of fitting strategies implemented in the <b>TephraFits</b> function.</figcaption>


Run an **exponential** fit:
{% highlight matlab %}
tephraFits(xData, yData, 'exponential', ...)
{% endhighlight %}

Run the **exponential**,  **power law** and **weibull** fits:
{% highlight matlab %}
tephraFits(xData, yData, {'exponential', 'powerlaw', 'weibull'}, ...)
{% endhighlight %}

Fit-dependent arguments are required and should be passed as a pair of argument-value.

#### Exponential
The exponential method requires either 0 or 1 argument:
<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>BIS</td>
      <td>Location of the break(s)-in-slope for multiple exponential segments specified as a numeric value for 2 segments or a <i>n-1 x 1</i> vector for <i>n</i> segments. The location specifies the value of <i>xData</i> after which the break-in-slope occurs. If <b>BIS</b> is not specified, only one exponential segment is used.</td>
    </tr>
  </tbody>
</table>
<figcaption><b>Table 3</b>: Input arguments specific to the exponential method</figcaption>

Run an **exponential** fit using one segment:
{% highlight matlab %}
tephraFits(xData, yData, 'exponential')
{% endhighlight %}

Run an **exponential** fit using two segments, where the break in slope occurs after the 3rd value in *xData*:
{% highlight matlab %}
tephraFits(xData, yData, 'exponential', 'BIS', 3)
{% endhighlight %}

Run an **exponential** fit using three segments:
{% highlight matlab %}
tephraFits(xData, yData, 'exponential', 'BIS', [3,5])
{% endhighlight %}

#### Power law
The power law method requires 2 arguments:
<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>C</td>
      <td>Distal integration limit (km).</td>
    </tr>
	  <tr>
	    <td>T<sub>0</sub></td>
	    <td>Ordinate of the most proximal segment of the <i>exponential</i> fits. The ordinate should be expressed as a natural value of <i>yData</i> (i.e. not on a logarithmic scale). It is not necessary to define T<sub>0</sub> when the <i>power law</i> fit is passed along the <i>exponential</i>. </td>
	  </tr>
  </tbody>
</table>
<figcaption><b>Table 4</b>: Input arguments specific to the power law method</figcaption>

Run a **power** fit using three segments using a distal integration limit of 30 km and a T<sub>0</sub> of 100:
{% highlight matlab %}
tephraFits(xData, yData, 'powerlaw', 'C', 30, 'T0', 100)
{% endhighlight %}

Run a **power** fit using three segments using a distal integration limit of 30 km and a T<sub>0</sub> retrieved from a 2-segments **exponential** fit:
{% highlight matlab %}
tephraFits(xData, yData, {'exponential, 'powerlaw'}, 'BIS', 3, 'C', 30)
{% endhighlight %}

#### Weibull
The weibull method requires 0 or 2 arguments:
<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>lambdaRange</td>
      <td>Range of lambda values entered as a <i>1x2</i> vector containing [<i>min, max</i>] used during the optimisation of the weibull parameters. If specified, <i>lambdaRange</i> must be specified along with <i>nRange</i>. </td>
    </tr>
	  <tr>
	    <td>nRange</td>
	    <td>Range of n values entered as a <i>1x2</i> vector containing [<i>min max</i>] used during the optimisation of the weibull parameters. If specified, <i>nRange</i> must be specified along with <i>lambdaRange</i>.  </td>
	  </tr>  
    <tr>
      <td>-</td>
      <td>In the specific case of a <i>isopach</i> deposit where the weibull method is requested along with any other fit type, the function uses the ranges of lamda and n defined by Bonadonna and Costa (2013) as a function of the VEI obtained from the other fits.</td>
    </tr>
  </tbody>
</table>
<figcaption><b>Table 5</b>: Input arguments specific to the weibull method</figcaption>

Run a **weibull** fit using initial user-defined ranges of lambda and n:
{% highlight matlab %}
tephraFits(xData, yData, 'weibull', 'lambdaRange', [.01 100], 'nRange', [.01 100])
{% endhighlight %}

Run a **weibull** fit using initial ranges of lambda and n based on the mean VEI obtained with the exponential and power law methods:
{% highlight m %}
tephraFits(xData, yData, {'exponential', 'powerlaw', 'weibull'}, 'BIS', 3, 'C', 20, 'lambdaRange', [.01 100], 'nRange', [.01 100])
{% endhighlight %}


### Deposit types
By default, <b>TephraFits</b> assumes that the input data describe isopach contours. It is however possible to pass the optional input argument <b>'deposit'</b> to enable different approaches. Table 6 describes these different approaches and specifies the input parameters in each case.

<table>
  <thead>
    <tr>
      <th>Deposit</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Isopach<BR><i>(Default)</i></td>
      <td>Relationship of thickness vs. square-root of isopach area used to calculate the volume of tephra deposits <BR>
      		&emsp;<b>xData:</b> Square root of isopach area (km) <BR>
      		&emsp;<b>yData:</b> Isopach thickness (cm) 
      </td>
    </tr>
    <tr>
      <td>Isomass</td>
      <td>Relationship of load vs. square-root of isomass area used to calculate the mass of tephra deposits <BR>
      		&emsp;<b>xData:</b> Square root of isomass area (km) <BR>
      		&emsp;<b>yData:</b> Isomass load (kg/m<sup>2</sup>) 
      </td>
    </tr>
    <tr>
      <td>Isopleth</td>
      <td>Relationship of maximum clast diameter vs. square-root of isopleth area, primarily used to calculate <i>b<sub>T</sub></i> <BR>
      		&emsp;<b>xData:</b> Square root of isopleth area (km) <BR>
      		&emsp;<b>yData:</b> Isopleth diameter (cm) 
      </td>
    </tr>
    <tr>
      <td>Distance</td>
      <td>Relationship of outcrop thickness vs. distance from the vent, used to explore the geometry of the deposit<BR>
      		&emsp;<b>xData:</b> Distance from the vent (km) <BR>
      		&emsp;<b>yData:</b> Outcrop thickness (cm) 
      
      </td>
    </tr>
  </tbody>
</table>
<figcaption><b>Table 6</b>: Type of deposits used in the <b>TephraFits</b> function and corresponding input data formats.</figcaption>



### Probabilistic runs
A stochastic approach is implemented in <b>TephraFits</b> to assess the sensitivity of the final value (e.g. deposit volume, mass) to the uncertainty of field derived parameters. Instead of performing one single run, the probabilistic mode performs <i>nbRuns</i> fits by randomly sampling input parameters with ranges defined in Table 7 and expresses the final value as a distribution (i.e. a central value and a confidence interval). If <i>runMode</i> is not defined, the probabilistic approach is disabled by default.
 
 <table>
   <thead>
     <tr>
       <th>Argument</th>
       <th>Description</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>runMode</td>
       <td>Defines if the probabilistic mode is enabled <BR>
       		&emsp;<b>single:</b> A single fit is performed (default) <BR>
       		&emsp;<b>probabilistic:</b> Multiple runs are performed using Monte Carlo simulations 
       </td>
     </tr>
     <tr>
       <td>nbRuns</td>
       <td>Number of runs of the probabilistic mode</td>
     </tr>
     <tr>
       <td>xError</td>
       <td>Error (in %) on <i>xData</i>. <i>xError</i> can be specified either as a single value, which assumes an equal error for all <i>xData</i>, or as a vector of the same size as <i>xData</i> containing errors on individual points</td>
     </tr>
     <tr>
       <td>yError</td>
       <td>Same as <i>xError</i> on <i>yData</i></td>
     </tr>
     <tr>
       <td>CError</td>
       <td>Error (in %) on the distal integration limit <i>C</i></td>
     </tr>
     <tr>
       <td>errorType</td>
       <td>Probability density function of the error around the central value used for Monte Carlo simulations<BR>
       		&emsp;<b>normal:</b> Gaussian distribution of errors using user-defined error as 3 sigma of the distribution (default) <BR>
       		&emsp;<b>uniform:</b> Uniform distribution of errors using user-defined error as extreme values </td>
     </tr>
     <tr>
       <td>errorBounds</td>
       <td>Percentiles used to express the spread of the final values. Should be specified as a <i>1x2</i> vector containing [<i>min max</i>]. By default, using th 5<sup>th</sup> and 95<sup>th</sup> percentiles </td>
     </tr>
   </tbody>
 </table>
 <figcaption><b>Table 7</b>: Arguments required for probabilistic runs.</figcaption>
 


### Plotting options
It is possible to adjust the plotting behaviour using the optional input arguments described in Table 8.
 <table>
   <thead>
     <tr>
       <th>Argument</th>
       <th>Description</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>yScale</td>
       <td>Scale of the y-axis for plotting:<BR>
       		&emsp;<b>ln:</b> Natural logarithm (default) <BR>
       		&emsp;<b>log10:</b> Log 10 logarithm <BR>
       		&emsp;<b>linear:</b> Linear
       </td>
     </tr>
     <tr>
       <td>maxDistance</td>
       <td>Maximum extent of curve extrapolation in distal part for plotting. 1 means 100%, i.e. the distance to the most distal point is doubled</td>
     </tr>
     <tr>
       <td>fits2plot</td>
       <td>Defines which fits to plot. If passed, it should be passed as a 1xlength(fitTypes) boolean vector <BR>
       Example: if fitType = {'exponential', 'powerlaw} and 'maxDistance', [1,0] is specified, only the exponential fit will be plotted</td>
     </tr>
     <tr>
       <td>plotType</td>
       <td> &emsp;<b>subplot:</b> Multiple plots in one figure (default) <BR>
       			&emsp;<b>separate:</b> Individual figure for each plot <BR>
       			&emsp;<b>none:</b> No plot <BR>
       </td>
     </tr>
   </tbody>
 </table>
 <figcaption><b>Table 8</b>: Plotting options.</figcaption>
 

## Outputs

<figure>
	<img src="{{ site.baseurl }}/img/blog/201709/bal_grid.jpg">
	<figcaption><b>Fig. 1</b> Illustration of the different approaches to average ballistics including i) polar grids with constant concentric distance from the vent, ii) polar grids with increasing distance from the vent, iii) cartesian grids and iv) area of interests</figcaption>
</figure>























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

where **run** is a Matlab structure named as the arguments 2-9 of the argument approach.

### 2.2 Output argument
Calling:
{% highlight matlab %}
project = processGBF(...)
{% endhighlight %}

returns a Matlab structure containing all the output data... but stick around until the next section!


## 3 Outputs and results
Upon completion of the **processGBF** function, a folder named after the **name** variable is created, which contains results in a Matlab format (i.e., *name*.mat) and in a ESRI ASCII grid format. All probabilities are expressed in % and all energies are expressed in Joules.

### 3.1 ASCII grid format
Three main categories of ASCII files are written:
1. **pixel**, which use a cartesian grid
2. **concentric**, which use concentric zones around the vent
3. **radial**, which use radial sectors around the vent

Each of these categories have sub-categories defined by:
1. **prob**, which contain the exceedence probabilities (%) for ballistic impacts to exceed a given threshold of kinetic energy
2. **en**, which contain the typical kinetic energy (J) at impact for a given exceedance probabillity

The probability files are themselves differentiated between:
1. **abs**, which contain absolute probabilities and
1. **rel**, which contain relative probabilities



### 3.2 Matlab format
The Matlab output file, i.e. *name*.mat, contains the most comprehensive output. It is compiled as a Matlab *structure* containing:
1. **inBal**, which is a duplicate of the input arguments shown in Table 1
2. **bal**, which contains the data of all simulated particles
3. **pixel**, which contains the result of the processing performed using a cartesian grid  
4. **concentric**, which contains the result of the processing performed  using concentric zones around the vent
5. **radial**, which contains the result of the processing performed using radial sectors around the vent


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
The **displayGBF** function offers an interactive GUI to plot the results of the **processGBF** function. Start it by typing
{% highlight matlab %}
processGBF
{% endhighlight %}
in the Matlab command. Then select the *name*.mat file output of the **processGBF** function and you are good to go!