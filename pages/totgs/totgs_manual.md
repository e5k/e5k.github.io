---
layout: page
title: TOTGS - User manual
permalink: pages/totgs_manual
categories: codes
tags: totgs
---

## Introduction
TOTGS is an upgraded version of the Matlab code provided in Bonadonna and Houghton (2005) for the calculation of the total grainsize distribution of tephra deposits. This manual strictly aims at describing the use of this script. Refer to the aforementioned article for details on the Voronoi technique.

## Before starting
This script requires one input file containing the grain–size analyses at each outcrop. Outcrop coordinates are used by Voronoi functions to define a zone of closest distance around each outcrop and calculate the area of each zone, which implies that:
1. Since calculations depend on the area of each zone, calculations must be performed on projected coordinates in order to avoid distortion occurring with increasing latitudes;
2. A zero-mass contour must be drawn in order to close the Voronoi cells located on the edge of the deposit and avoid their areas to tend to infinity.

In order to address these issues:
1. The script can work with outcrop both in geographic or projected coordinates, depending on which the script will perform the necessary transformations. In case the users adopts to input projected coordinates, the projection must be Universal Transverse Mercator (UTM) on a WGS84 ellipsoid;
2. In case the zero-mass contour is not defined a priori, this scripts includes an interactive module to define it.

## Input files
The input file can be either a *tab–delimited* text or an *Excel* file. As the user has the choice of inputting two kind of coordinates, the files must be shaped accordingly. Tables 1 and 2 depict examples for each case. The first row is a header, and data should start from the second row. 

Grain–size bins can be defined either in mm or φ units, but **must necessarily be equally-spaced φ classes**.
Examples of input files can be found in the <pth>Examples/</pth> folder.

### Case 1: Geographic coordinates
| |  Row 1 (header) | Row 2–m (data)
| ------------- |:-------------:| -----:|
| Column 1 | Lat | Latitude (decimal degrees)
| Column 2 | Lon | Longitude (decimal degrees) 
| Column 3 | g/m2 | Tephra accumulation (g/m2)
| Column 4 | Empty | Empty column
| Column 5- | Grain–size bin | Weight % of a grain–size class at a given outcrop
 
### Case 2: Projected coordinates
| |  Row 1 (header) | Row 2–m (data)
| ------------- |:-------------:| -----:|
| Column 1 | East | Easting (m)
| Column 2 | North | Northing (m)
| Column 3 | Zone | Zone number (e.g. 19 in N hemisphere, -19 in S)
| Column 4 | g/m2 | Tephra accumulation (g/m2)
| Column 5 | Empty | Empty column
| Column 6- | Grain–size bin | Weight % of a grain–size class at a given outcrop

## Usage
In Matlab, navigate to the location of the <pth>TOTGS.m</pth> script and type:
~~~
>> TOTGS
~~~

Press enter and a GUI opens.

### Loading a file
Before loading a file, it is necessary to set:
1.  the type of coordinates used and 
2.  the unit of grain–size binning accordingly to the file you are about to load.
   
Upon loading the files, four different warnings can occur:
- If the bins are not perfectly equally–spaced, you will be asked whether you want to continue;
- If missing data are found in the input file, you will be asked whether you want to fill them with zeros;
- If the sum of the different bins are not equal to 100% for a given outcrop, you will be asked whether the code should round it;
- If coordinates span over different UTM zones, you will be asked to choose a reference UTM zone.

### Add the contour edge
Add a zero–mass contour by clicking the *Add* button. A new window opens, from which you can:

  1. Add the contour points. Click on the *Add points* button to enable the function allowing to click on the map. Right–click to leave the interactive mode;
  2. Reset the points;
  3. Save the data and proceed. Again, you might be asked to chose a reference UTM zone.

### Display and export results
Back on the main interface, click the *Ok* button to proceed with the calculation. First, a map showing the Voronoi polygons appears, followed by the main result interface. The main components of this new window are:


1. The result table, showing probability density and cumulative functions in millimetres and phi units;
2. Probability density and cumulative distributions displayed graphically;
3. Main total grain–size distribution parameters (as defined by Inman, 1952);
4. Export the table as a text file. Unlike in the GUI table, the file resulting from the export
comprise up to 7 decimals;
5. Export the probability density function as a separate plot for saving;
6. Export the cumulative density function as a separate plot for saving;
7. Close the interface.


## Dependencies
- TOTGS uses the functions *ll2utm* and *utm2ll* by François Beauducel available [here](https://www.mathworks.com/matlabcentral/fileexchange/45699-ll2utm-and-utm2ll)
- The dataset in the examples is from [Alfano et al. (2016)](https://www.researchgate.net/publication/303539961_Reconstruction_of_total_grain_size_distribution_of_the_climactic_phase_of_a_long-lasting_eruption_the_example_of_the_2008-2013_Chaiten_eruption)


## Citation
If you happened to find this script useful, we would greatly appreciate if you could cite as:
> Biass, S., Bonadonna, C., (2014), TOTGS: Total grainsize distribution of tephra fallout, https://vhub.org/resources/3297.


## References
- Alfano F, Bonadonna C, Watt S, Connor C, Volentik A,  Pyle D (2016). Reconstruction of total grain size distribution of the climactic phase of a long-lasting eruption: the example of the 2008–2013 Chaitén eruption. Bulletin of Volcanology, 78(7), 46
- Bonadonna C, Houghton B (2005) Total grain-size distribution and volume of tephra-fall deposits. Bull Volcanol 67(5):441–456
- Inman DL (1952) Measures for describing the size distribution of sediments. Journal of Sedimentary Research 22(3):125–145 