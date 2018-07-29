---
layout: post
title: TephraProb v.1.5
categories: codes
tags: tephraprob release
---

Version releases were never systematically attributed to TephraProb until now. This new version was labeled **v1.5** as some important changes have been made.

## Changes in TephraProb v1.5
### Probability calculations
Changes on storage of probability data have been made to reduce disk space usage and improve speed of reading Tephra2 outputs during probability calculations. Namely, the <cmd>probability_maker</cmd> function, accessed from <cmd>Post processing > Probability calculations</cmd> in TephraProb, proceeds in 2 steps:

1. Read the Tephra2 output, sums them if needed and stores the output in <pth>RunName/RunNb/DATA/dataT2_*.mat</pth>. This is a 3D matrix, where the 3rd dimension equals the number of runs (i.e. each summed Tephra2 output is stored along the 3rd dimension). The 1st and 2nd dimensions vary with the grid type:
    - If runs are performed on a **full grid**, dimensions 1 and 2 are equal to the dimensions of the grid northing and easting, respectively
    - If runs are performed on a **list of points**, each output is in a 3 column format, with dimension 1 equal to the number of points and dimension 2 being [easting, northing, mass accumulation]
2. This new output is used for probabilit calculations, which are stored in  <pth>RunName/RunNb/DATA/dataProb.mat</pth>. This file loads a Matlab structure containing the outputs of probability maps, probabilistic isomass maps and hazard curves

Note that to save disk space, the output of Tephra2 is now:
1. Rounded to a significant digit number
2. Accumulations below a thresholds are considered equal to zero

Both the significant digit number and the thresholds are controlled in the preferences of TephraProb, accessible from <cmd>File > Preferences</cmd>.

### Export to ASCII files
ASCII files previously generated upon completion of the post-processing are not anymore automatically generated, which save a considerable amount of disk storage (i.e. the <pth>3C/</pth>, <pth>GIS/</pth> and <pth>MAT/</pth> folders in the <pth>SUM/</pth>, <pth>PROB/</pth> and <pth>IM/</pth> folders). Instead, a new function accessible from <cmd>Post processing > File management > Export to ASCII files</cmd> is available, which allows the user to choose the type and the format of files to export.

### Archive Tephra2 files
A new function available from <cmd>Post processing > File management > Archive Tephra2 files</cmd> offers to compress the files generated for Tephra2 (i.e. the <pth>OUT/</pth>, <pth>CONF/</pth> and <pth>GS/</pth> folders). This was also implemented with concern for disk space usage. Note that this function should only be used **once the Tephra2 modelling has successfully completed**. This process takes a long time due to the large amount of small files and individual folders created.

### Probabilistic isomass maps
The method used to compute probabilistic isomass maps has been re-written and uses a percentile approach rather than an interpolation of iso-probability contours on probability maps. Note that a probability of occurrence of a given isomass is given by **the inverse of the percentile**, i.e. a percentile of 25% reflects a 75% probability of occurrence.

### Hazard curves
It is now possible to import text files in the <cmd>Input > Points</cmd> dialogue box. Text files should be 3-columns tab-delimited ASCII files with columns containing:
* *Column 1*: Point name
* *Column 2*: Latitude (decimal degree, WGS84)
* *Column 3*: Longitude (decimal degree, WGS84)

### Map preferences
A more in-depth customization of output maps is now offered from <cmd>File > Preferences</cmd>. These parameters allow to:
- Scale the colors of probability and isomass maps to the min/max values set in their respective contours. For instance, this is useful for plotting isomass maps for various probability threshold while preserving the value of a pixel color across maps
- Control the display of contours labels. This is useful when the display gets jammed
- Plot the points used for the calculation of hazard curves and their names

### Bug fix
- A bug was corrected for Plinian scenarios, causing problems in the calculation of eruption duration for eruptions > 6h and the long-lasting option disactivated
- A problem was reported by two users concerning an improper interpretation of ECMWF wind files in Tephra2. The problem is discussed [here]({{ site.baseurl }}/tips/2018/07/27/wind_tephra2/). Changes were made in TephraProb to avoid the occurrence of this bug, but please **check any run that could have been affected**

