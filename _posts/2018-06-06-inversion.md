---
layout: post
title: Tephra2 Inversion
categories: codes utilities
tags: tephra2utils tephra2 inversion
---

The current set of functions helps running the advection-diffusion model Tephra2 in inversion mode to estimate the best eruption source parameters (ESP) of a tephra deposit. The functions contain two sections. A first section contains a mixture of bash and python scripts for running the inversion of *OpenPBS* and *SLURM* clusters. A second section contains Matlab scripts for processing the inversion output designed to help its interpretation.

#### Updates - November 2018
The inversion scripts have been updated in November 2018. To find the scripts to post-process runs performed before this date, please download the previous version [here](https://github.com/e5k/Tephra2Utils/archive/v1.0.zip).

### Table of content
- [Introversion](#introversion)
    - [Single vs. batch runs](#single-vs-batch-runs)
    - [Caveats](#caveats)
- [Installation](#installation)
- [Getting started](#getting-started)
    - [Case-study files](#case-study-files)
    - [Configuration file](#configuration-file)
- [Running the inversion](#running-the-inversion)
    - [Single vs. batch vs. seed runs](#single-vs-batch-vs-seed-runs)
    - [OpenPBS](#openpbs)
- [Post-processing](#post-processing)
    - [Output figures](#output-figures)
        - [1. *Spaces* of solutions](#1-spaces-of-solutions)
        - [2. Everything against everything!](#2-everything-against-everything)

## Introversion
The inversion searches for the set of ESP that best reproduce *observed* values of tephra accumulations (kg/m<sup>2</sup>) with the *computed* values produced by Tephra2. As for any optimization problem, the many degrees of freedom require a critical interpretation of the inversion results. These scripts help building an empirical vision of the results in the perspective of the knowledge of the studied eruption.

For a purpose of illustration, let's consider that the fit depends mainly on *plume height* and *eruption mass*. We will therefore attempt to find the combination of plume height and eruption mass that best reproduce the deposit. To do so, the Tephra2 uses a [downhill simplex](https://en.wikipedia.org/wiki/Nelder–Mead_method) method, which searches for the minimum of a function - here the fit between observed and computed values - between user-defined ranges of [height<sub>min</sub> - height<sub>max</sub>] and [mass<sub>min</sub> - mass<sub>max</sub>].

Unfortunately, this method can suffer from numerical artifacts resulting in "fake" minima, especially when initial user-defined ranges are too large. For instance let's consider two sets of plume heights and mass, height<sub>1</sub>, mass<sub>1</sub> and height<sub>2</sub>, mass<sub>2</sub>, both giving a similarly good solution from a numerical perspective, but height<sub>1</sub>, mass<sub>1</sub> being irrealistic from a volcanological point of view. We therefore need a method to subjectively discard this solution from the inversion result.

### Single vs. batch runs
To avoid this problem, it is possible to run the inversion using three approaches, the *single*, the *batch* and the *seed* modes. The **single** mode searches for a minimum within the entire space defined by the ranges of plume heights and masses and consists of one single inversion run. The **batch** mode splits the space of plume heights and masses into smaller domains, and one inversion run is performed for each domain. The **seed** mode, for a lack of a better term, is pretty much the equivalent of the *single* mode repeated multiple times varying the *seed*. The *seed* is a number that controls the reproducability of stochastic runs, and in the case of the inversion it will control the starting point of the optimisation process. In case of unconstrained deposits, varying the seed is likely to affect the results. It is a good procedure to assess the sensitivity of the results to the input seed.

 So what are the advantages and disadvantages of each method?

* **Single**
    * *Pros:* Provides the most accurate minimum
    * *Cons:* Can get stuck in local minima
* **Batch**
    * *Pros:* Provides an overview of all minima on the height-mass space
    * *Cons:* Small sub-spaces do not provide enough flexibility to accuratly define minima
* **Seed**
    * *Pros:* Advantages of the single approach without disadvantages
    * *Cons:* Euuh... Not sure, it's pretty much my prefered approach now
  
### Caveats

Below are a few things to keep in mind when using the inversion:
* The mass is always better constrained than the plume height
* Constraining the plume height is more difficult because of the fact that in Tephra2, the plume height is intrinsically related to the computation of parameters controlling i) the grain size distribution, ii) the distribution of mass in the plume and iii) empirical parameters

## Installation

Two components are needed, both available on GitHub:

* Tephra2 source code, available [here](https://github.com/ljc-geo/tephra2)
* Tephra2Utils, available [here](https://github.com/e5k/Tephra2Utils)

For Tephra2, as far as we are concerned here, we only need the two executables created by the compilation of Tephra2 (*tephra2012_inversion* and *tephra2-2012*). For Tephra2Utils, we need the entire <pth>Inversion/</pth> directory and the post processing files (<pth>plotBetaPlume.m</pth>, <pth>plotT2.m</pth> and <pth>processT2Inversion.m</pth>).

Organize your working folder like this:

<pre>
ROOT
├── Inversion/
│       ├── _example_folder/                    -> Example of input files
│       │        ├── forwardGrid.utm
│       │        ├── inversionConfig.conf
│       │        ├── inversionInput.txt
│       │        ├── inversionWind.txt
│       │        └── runInversion.sh
│       ├── _scripts/                           -> Scripts used during inversion*
│       │        ├── genConfig.py
│       ├── _templates/                        -> Templates used during inversion*
│       │        ├── forwardConfTemplate.conf
│       │        └── inversionConfTemplate.conf
├── dependencies/                               -> Dependencies for post-processing*
│       └── xlwrite/
├── plotBetaPlume.m                             -> Used during post-processing*
├── plotT2.m                                    -> Used during post-processing*
├── processT2Inversion.m                        -> Main post-processing function*
├── plotT2Inversion.m                           -> Plot results of batch and seed runs*
├── tephra2012_inversion                        -> Tephra2 inversion exec
└── tephra2-2012                                -> Tephra2 forward exec

* Should not have to be edited
</pre>

## Getting started
Duplicate the folder <pth>Inversion/example_folder/</pth> and rename it to whatever name makes you happy. I usually name this folder after the tephra deposit I am inverting. Note that you can have as many folders for as many deposits of as many volcanoes as you want here. Let's now edit the required files. 

### Case-study files
Replace the following files by those for your own case-study.

* <pth>inversionInput.txt:</pth> This is the main file containing your field observations. It is a 4-columns, tab-delimited file containing:
    * *Column 1*: Easting coordinates of the outcrop (UTM, WGS84)
    * *Column 2*: Northing coordinates of the outcrop (UTM, WGS84)
    * *Column 3*: Altitude (m asl). Note that Tephra2 can not accurately use the elevation. Instead, a mean elevation of all outcrops should be estimated and used as a unique value for all outcrops
    * *Column 4*: The mass accumulation (kg/m<sup>2</sup>) estimated at each outcrop. Note that this is a **mass accumulation** and not a **thickness**
* <pth>forwardGrid.utm:</pth> The calculation grid used by the forward solution of Tephra2, and used during the inversion process to compare the deposit modelled by the inversion with field data. You can use [TephraProb](https://github.com/e5k/TephraProb) to create a grid following [this tutorial](https://www.youtube.com/watch?v=dgo2bZXKv0U&).
* <pth>inversionWind.txt:</pth> If a wind observation is available for the studied eruption, it can be used to constrain the inversion. If no wind is available, ranges of wind speed and directions can be defined instead (described later), but please keep then the *inversionWind.txt* file in the folder. If the eruption is within the time interval provided by Reanalysis datasets, [TephraProb](https://github.com/e5k/TephraProb) can be used to retrieve it. The wind file should be a 3-columns, tab-delimited file containing:
    * *Column 1*: Altitude (m asl)
    * *Column 2*: Wind speed (m/s)
    * *Column 3*: Wind direction (i.e. the direction the wind blows to; degrees from N) 


### Configuration file
The main inversion file is <pth>inversionConfig.conf</pth>, which **must not be renamed**. As a tip, replace the *ERUPTION_NAME* in the second line by the name of the eruption you are modelling. That my save you precious time when looking for data years from now!

Below is a summary of the different sections to fill in.

**Inversion behaviour**

This section controls the general behaviour of the inversion runs.

Variable | Description
---------|------------
<var>BATCH</var> | Enter 0 for *single* runs, 1 for *batch* runs and 2 for *seed* rund
<var>fixedWind</var> | Enter 0 to use ranges of wind direction/speed, 1 to use a wind profile
<var>SEED</var> | Used to control the seed for reproducibility. To randomely choose a seed, enter <cmd>-1</cmd>

**Input files**

This section defines the path to the input files previously described.

Variable | Description
---------|------------
<var>inputFile</var> | File containing the field observations
<var>windFile</var> | File containing the wind profile. Leave <pth>inversionWind.txt</pth> if fixedWind=0
<var>gridFile</var> | Path to the grid file

**Vent properties**

This section defines the vent geometry. Coordinates are in UTM and should be projected on the same zone as the field data.

Variable | Description
---------|------------
<var>ventE</var> | Vent easting (UTM, WGS84)
<var>ventN</var> | Vent northin (UTM, WGS84)
<var>ventA</var> | Vent elevation (m asl)
<var>ventZ</var> | UTM zone of the vent. Only the numeric part, negative in S hemisphere

**Ranges to invert**

This section contains all the variable parameters that are optimized during the inversion. Each parameter contains min/max values.

Variable | Description
---------|------------
<var>Ht</var> | Plume heights (m asl)
<var>Mass</var> | Total mass (log10, kg). Used only when BATCH=0
<var>Diff</var> | Diffusion coefficient for large particles (m<sup>2</sup>/s)
<var>FTT</var> | Fall-time threshold(s)
<var>MedPhi</var> | Median of the TGSD (Phi). Note that minMedPhi is the coarsest diameter
<var>SigPhi</var> | Standard deviation of the TGSD (Phi)
<var>Alpha</var> | Alpha parameter of the Beta function controlling the mass distribution in the plume
<var>Beta</var> | Beta parameter of the Beta function controlling the mass distribution in the plume
<var>WindSpeed</var> | Wind speed (m/s) - used when fixedWind=0
<var>WindDir</var> | Wind direction (degree from N) - used when fixedWind=0

**Constant parameters**

This section contains parameters that are kept constant during the inversion.

Variable | Description
---------|------------
<var>lithicDensity</var> | Density of the lithics (kg/m<sup>3</sup>)
<var>pumiceDensity</var> | Density of the pumices (kg/m<sup>3</sup>)
<var>minPhi</var> | Minimum bound (coarsest diameter; phi) of the TGSD
<var>maxPhi</var> | Maximum bound (finest diameter; phi) of the TGSD

**Batch parameters**

This section contains parameters that control the behavior of the batch inversion. It is still experimental, so it is recommended to keep the proposed parameters for now.

Variable | Description
---------|------------
<var>deltaMass</var> | Mass interval between each sub-run of the batch inversion (log10; kg)
<var>incrMass</var> | Mass increment between each sub-run of the batch inversion (log10; kg)
<var>deltaHt</var> | Height interval between each sub-run of the batch inversion (m asl)
<var>incrHt</var> | Height increment between each sub-run of the batch inversion (m asl)

**Tephra2 advanced parameters**

Variable | Description
---------|------------
<var>colSteps</var> | Number of integration steps along the height of the column
<var>partStep</var> | Number of integration steps along the TGSD
<var>fitTest</var> | Merit test: 0 (chi-squared test), 1 (root mean squared error), 2 (Tokyo log test)
<var>eddy</var> | Eddy constant
<var>plumeModel</var> | Mass distribution in the plume (2 is a beta distribution)
<var>windLevels</var> | Number of wind levels to consider. Only if fixedWind=0

## Running the inversion
Tephra2 is parallelised using [OpenMPI](https://www.open-mpi.org) and commonly run on clusters. Different clusters have different architectures, which will probably require some measure of editing. If your files are prepared locally, now is the time to upload everything on the server. Be sure to keep the directory tree specified before.

The main script used to run the inversion is *runInversion.sh*. The <pth>_template/</pth> folder contains templates for different cluster architectures, namely *Slurm*, *OpenPBS* and *PBSPro*. Edit the header of the script and copy it to the <pth>_example_folder/</pth> folder. Navigate to <pth>_example_folder/</pth> to start running the script.

### Single vs. batch vs. seed runs
For parallelisation purposes, single runs, batch runs and seed runs are submitted in slightly different ways. 
- For *single* runs, the mass range is defined in the <pth>inversionConfig.conf</pth> file; 
- For *batch* runs use *job arrays*, the mass range is specified on the command line when submitting the job, which will allow each mass increment to be sent to a different node;
- For *seed* runs, the mass is specified in <pth>inversionConfig.conf</pth> (as for *single* runs), but the number of seeds is specified on the command line when submitting the job.

### OpenPBS
For a **single** inversion run, set *BATCH=0* in <pth>inversionConfig.conf</pth> and type:
<pre>qsub runInversion.sh</pre>
For a **batch inversion** run with a mass range between 10<sup>9</sup> and 10<sup>11</sup> kg, set *BATCH=1* in <pth>inversionConfig.conf</pth> and use the <cmd>-t</cmd> flag:
<pre>qsub -t 9-11 runInversion.sh</pre>
For a **seed inversion** performing 100 runs with a seed number varying between 1-100, type:
<pre>qsub -t 1-100 runInversion.sh</pre>


## Post-processing
Upon successful (yey!) completion of an inversion run, one (*single* run) or multiple (*batch* run) folders are created inside <pth>_example_folder/</pth>, named *mass**M**_ht**H***, where **M** and **H** are the lower intervals of the mass (log10 kg) and plume height (km) ranges, respectively. For post processing, follow these steps:

1. In the <pth>_example_folder/</pth> on your local computer, create a folder named <pth>n/</pth>, where *n* is the number of your inversion attempt (start at 1/ and name the subsequent folders in a continuous way). By doing so, each new inversion attempt doesn't have to delete the previous one, and it becomes easier to track different attempts
2. Copy the content of <pth>_example_folder/</pth> on the cluster into your local <pth>n/</pth> folder
3. In Matlab, run the <pth>processInversion.m</pth> script. When asked, go and select your <pth>n/</pth> folder and let the script work

This process will first create four new files in each folder:
- **obsVScomp.pdf**: Plot of the computed values of tephra accumulation against their observed equivalents;
- **plume.pdf**: The plume distribution
- **tephra2.out**: Result of the forward solution
- **wind.pdf**: Wind profile

Additionally, each inversion attempt is recorded in an Excel file at the root of the <pth>Inversion/</pth> folder in a different sheet named after <pth>n/</pth>. 

### Output figures

#### 1. *Spaces* of solutions
In the case of *batch* or *seed* runs, the function <cmd>plotT2Inversion</cmd> can be used to explore spaces of results. A plane of fit values is computed and interpolated between two variable of choice. In the case of *batch* runs, this visualisation method is useful to assess the location(s) of minima. In the case of *seed* runs, these figures are helpeful to assess the stability of the inversion output to the seed number.

#### 2. Everything against everything!
In the case of *seed* runs, the script produces a matrix plot (type <cmd>doc plotmatrix</cmd> in the Matlab command line). I find this plot to be the most informative because:
1. It allows indentifying populations of solutions from the histograms
2. It allows indentifying relationships between parameters

