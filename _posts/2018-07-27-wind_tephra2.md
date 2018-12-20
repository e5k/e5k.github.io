---
layout: post
title: Wind data for Tephra2
categories: tips
tags: tephra2 troubleshoot
---

I thought I'd share some problems I've recently encountered with the format of wind files used in Tephra2. Just as a reminder, wind file should be a 3-columns, tab-delimited ASCII file containing:

* *Column 1*: Altitude (m asl)
* *Column 2*: Wind speed (m/s)
* *Column 3*: Wind direction (i.e. the direction the wind blows to; degrees from N) 

Let's review some aspects that can cause problems in Tephra2.

## Null elevations
Tephra2 no like no 0 m elevation. Period. The reason is that wind directions and velocities are interpolated between levels. Entering a minimum elevation of 0 m asl will cause an error in the interpolation, which will not be output but *will produce unrealistic results*

## End-of-the-file
It should not matter whether wind profiles are organised with *ascending* or *descending* altitudes as Tephra2 re-orders it anyway. **BUT**, because there is a but, one thing that can cause a problem is the definition of the [End of the File](https://en.wikipedia.org/wiki/End-of-file) - or **EOF**, which is:
> ...a condition in a computer operating system where no more data can be read from a data source.

This EOF can have an impact when **i)** wind files are organised in descending elevations and **ii)** the EOF is a new line (i.e. check if a file has an empty line at the end). If these two conditions occur, Tephra2 will reorder the wind data in ascending order, which will result in empty data as the first line and all hell will break loose.

## Conclusion
The two main important points in the format of wind files for Tephra2 are:

1. Wind files should not contain elevations of 0 m asl. Enter 1 instead
2. Avoid empty lines in wind files, or at least make sure wind files are organised in increasing elevations

### How to notice problems?
As already specified, should these problem occur, Tephra2 *will not* output an error but *will* produce unrealistic results. From experience, bogus results tend to display **a conspicuous eastwards dispersal**. So always double check the model output against the wind data, which is valid for both Tephra2 and TephraProb!