---
layout: post
title: Tephra2 Inversion
categories: codes tips
tags: tephra2 inversion
---

The current set of functions helps running the advection-diffusion model Tephra2 in inversion mode to estimate the best eruption source parameters (ESP) of a tephra deposit. The functions contain two sections. A first section contains a mixture of bash and python scripts for running the inversion of *OpenPBS* and *SLURM* clusters. A second section contains Matlab scripts for processing the inversion output designed to help its interpretation.

## Introduction
The inversion searches for the set of ESP that best reproduce *observed* values of tephra accumulations (kg/m<sup>2</sup>) with the *computed* values produced by Tephra2. As for any optimization problem, the many degrees of freedom require a critical interpretation of the inversion results. These scripts help building an empirical vision of the results in the perspective of the knowledge of the studied eruption.

For a purpose of illustration, let's consider that the fit depends mainly on *plume height* and *eruption mass*. We will therefore attempt to find the combination of plume height and eruption mass that best reproduce the deposit. To do so, the Tephra2 uses a [downhill simplex](https://en.wikipedia.org/wiki/Nelder–Mead_method) method, which searches for the minimum of a function - here the fit between observed and computed values - between user-defined ranges of [height<sub>min</sub> - height<sub>max</sub>] and [mass<sub>min</sub> - mass<sub>max</sub>].

Unfortunately, this method can suffer from numerical artifacts resulting in "fake" minima, especially when initial user-defined ranges are too large. For instance let's consider two sets of plume heights and mass, height<sub>1</sub>, mass<sub>1</sub> and height<sub>2</sub>, mass<sub>2</sub>, both giving a similarly good solution from a numerical perspective, but height<sub>1</sub>, mass<sub>1</sub> being irrealistic from a volcanological point of view. We therefore need a method to subjectively discard this solution from the inversion result.

### Single vs. batch runs
To avoid this problem, it is possible to run the inversion using two approaches, the *single* and *batch* modes. The single mode searches for a minimum within the entire space defined by the ranges of plume heights and masses and consists of one single inversion run. The batch mode splits the space of plume heights and masses into smaller domains, and one inversion run is performed for each domain. So what are the advantages and disadvantages of each method?

* Single
    * *Pros:* Provides the most accurate minimum
    * *Cons:* Can get stuck in "fake" minima
* Batch
    * *Pros:* Provides an overview of all minima on the height-mass space
    * *Cons:* Small sub-spaces do not provide enough flexibility to accuratly define minima

### Caveats
* The mass is always better constrained than the plume height

## Installation

Two components are needed, both available on GitHub:

* Tephra2 source code, available [here](https://github.com/ljc-geo/tephra2)
* Tephra2Utils, available [here](https://github.com/e5k/Tephra2Utils)

For Tephra2, as far as we are concerned here, we only need the two executables created by the compilation of Tephra2 (*tephra2012_inversion* and *tephra2-2012*). For Tephra2Utils, we need the entire *Inversion/* directory and the post processing files (*plotBetaPlume.m*, *plotT2.m* and *processT2Inversion.m*).

Organize your working folder like this:

<pre>
Inversion/
├── _example_folder/            -> Example of input files
│   ├── forwardGrid.utm
│   ├── inversionConfig.conf
│   ├── inversionInput.txt
│   ├── inversionWind.txt
│   └── runInversion.sh
├── _scripts/                   -> Scripts used during inversion*
│   ├── genConfig.py
│   └── genConfigForward.py
├── _templates/                 -> Templates used during inversion*
│   ├── forwardConfTemplate.conf
│   └── inversionConfTemplate.conf
├── dependencies/               -> Dependencies for post-processing*
│   └── xlwrite/
├── plotBetaPlume.m             -> Used during post-processing*
├── plotT2.m                    -> Used during post-processing*
├── processT2Inversion.m        -> Main post-processing function
├── tephra2012_inversion        -> Tephra2 inversion exec
└── tephra2-2012                -> Tephra2 forward exec

* Should not have to be edited
</pre>

## Getting started
Duplicate the folder *Inversion/example_folder/* and rename it to whatever name makes you happy. I usually name this folder after the tephra deposit I am inverting. Note that you can have as many folders for as many deposits of as many volcanoes as you want here. Let's now edit the required files. 

### Case-study files
Replace the following files by those for your own case-study.

* **inversionInput.txt:** This is the main file containing your field observations. It is a 4-columns, tab-delimited file containing:
    * *Column 1*: Easting coordinates of the outcrop (UTM, WGS84)
    * *Column 2*: Northing coordinates of the outcrop (UTM, WGS84)
    * *Column 3*: Altitude (m asl). Note that Tephra2 can not accurately use the elevation. Instead, a mean elevation of all outcrops should be estimated and used as a unique value for all outcrops
    * *Column 4*: The mass accumulation (kg/m<sup>2</sup>) estimated at each outcrop. Note that this is a **mass accumulation** and not a **thickness**
* **forwardGrid.utm:** The calculation grid used by the forward solution of Tephra2, and used during the inversion process to compare the deposit modelled by the inversion with field data. You can use [TephraProb](https://github.com/e5k/TephraProb) to create a grid following [this tutorial](https://www.youtube.com/watch?v=dgo2bZXKv0U&).
* **inversionWind.txt:** If a wind observation is available for the studied eruption, it can be used to constrain the inversion. If no wind is available, ranges of wind speed and directions can be defined instead (described later), but please keep then the *inversionWind.txt* file in the folder. If the eruption is within the time interval provided by Reanalysis datasets, [TephraProb](https://github.com/e5k/TephraProb) can be used to retrieve it. The wind file should be a 3-columns, tab-delimited file containing:
    * *Column 1*: Altitude (m asl)
    * *Column 2*: Wind speed (m/s)
    * *Column 3*: Wind direction (i.e. the direction the wind blows to; degrees from N) 


### Configuration file
The main inversion file is *inversionConfig.conf*, which **must not be renamed**. As a tip, replace the *ERUPTION_NAME* in the second line by the name of the eruption you are modelling. That my save you precious time when looking for data years from now!

Below is a summary of the different sections to fill in.

**Inversion behaviour**

This section controls the general behaviour of the inversion runs.

Variable | Description
---------|------------
BATCH | Enter 0 for single runs, 1 for batch runs
fixedWind | Enter 0 to use ranges of wind direction/speed, 1 to use a wind profile

**Input files**

This section defines the path to the input files previously described.

Variable | Description
---------|------------
inputFile | File containing the field observations
windFile | File containing the wind profile. Leave *inversionWind.txt* if fixedWind=0
gridFile | Path to the grid file

**Vent properties**

This section defines the vent geometry. Coordinates are in UTM and should be projected on the same zone as the field data.

Variable | Description
---------|------------
ventE | Vent easting (UTM, WGS84)
ventN | Vent northin (UTM, WGS84)
ventA | Vent elevation (m asl)
ventZ | UTM zone of the vent. Only the numeric part, negative in S hemisphere

**Ranges to invert**

This section contains all the variable parameters that are optimized during the inversion. Each parameter contains min/max values.

Variable | Description
---------|------------
Ht | Plume heights (m asl)
Mass | Total mass (log10, kg). Used only when BATCH=0
Diff | Diffusion coefficient for large particles (m<sup>2</sup>/s)
FTT | Fall-time threshold(s)
MedPhi | Median of the TGSD (Phi). Note that minMedPhi is the coarsest diameter
SigPhi | Standard deviation of the TGSD (Phi)
Alpha | Alpha parameter of the Beta function controlling the mass distribution in the plume
Beta | Beta parameter of the Beta function controlling the mass distribution in the plume
WindSpeed | Wind speed (m/s) - used when fixedWind=0
WindDir | Wind direction (degree from N) - used when fixedWind=0

**Constant parameters**

This section contains parameters that are kept constant during the inversion
Variable | Description
---------|------------
lithicDensity | Density of the lithics (kg/m<sup>3</sup>)
pumiceDensity | Density of the pumices (kg/m<sup>3</sup>)
minPhi | Minimum bound (coarsest diameter; phi) of the TGSD
maxPhi | Maximum bound (finest diameter; phi) of the TGSD

**Batch parameters**

This section contains parameters that control the behavior of the batch inversion. It is still experimental, so it is recommended to keep the proposed parameters for now.

Variable | Description
---------|------------
deltaMass | Mass interval between each sub-run of the batch inversion (log10; kg)
incrMass | Mass increment between each sub-run of the batch inversion (log10; kg)
deltaHt | Height interval between each sub-run of the batch inversion (m asl)
incrHt | Height increment between each sub-run of the batch inversion (m asl)

**Tephra2 advanced parameters**

Variable | Description
---------|------------
colSteps | Number of integration steps along the height of the column
partStep | Number of integration steps along the TGSD
fitTest | Merit test: 0 (chi-squared test), 1 (root mean squared error), 2 (Tokyo log test)
eddy | Eddy constant
plumeModel | Mass distribution in the plume (2 is a beta distribution)
windLevels | Number of wind levels to consider. Only if fixedWind=0

## Running the inversion
Tephra2 is parallelised using [OpenMPI](https://www.open-mpi.org) and commonly run on clusters. Different clusters have different architectures, which will probably require some measure of editing. If your files are prepared locally, now is the time to upload everything on the server. Be sure to keep the directory tree specified before.

The main script used to run the inversion is *runInversion.sh*. The *_template/* folder contains templates for different cluster architectures, namely *Slurm*, *OpenPBS* and *PBSPro*. Edit the header of the script and copy it to the *_example_folder/* folder. Navigate to *_example_folder/* to start running the script.

### Single vs. batch runs
For parallelisation purposes, single runs and batch runs are submitted in slightly different ways. For single runs, the mass range is defined in the inversionConfig.conf file. Conversly, batch runs use *job arrays*. Long story short, the mass range is specified upon submission of the job, which will allow each mass increment to be sent to a different node.

### OpenPBS
For a single inversion run, set *BATCH=0* in *inversionConfig.conf* and type:
<pre>qsub runInversion.sh</pre>
For a batch inversion run with a mass range between 10<sup>9</sup> and 10<sup>11</sup> kg, set *BATCH=1* in *inversionConfig.conf* and use the *-t* flag:
<pre>qsub -t 9-11 runInversion.sh</pre>

### SLURM

### PBSPro

## Inversion output
Upon successful (yey!) completion of an inversion run, one (single run) or multiple (batch run) folders are created inside *_example_folder/*, named *mass**M**_ht**H***, where **M** and **H** are the lower intervals of the mass (log10 kg) and plume height (km) ranges, respectively.