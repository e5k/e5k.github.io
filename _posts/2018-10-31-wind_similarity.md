---
layout: post
title: Find wind profiles most similar to an average
categories: codes
tags: tephraprob wind
---

Ever needed to find the *one* wind profile most similar to an average wind profile? A new function in the <cmd>Analyse wind profiles</cmd> of TephraProb does just that!

## Access the tool
The tool is available from <cmd>Tools > Find similar profiles</cmd> in the <cmd>Analyse wind profiles</cmd> window. Some specific parameters should be set for the code to work, namely:

- **Type** must be *Profiles*
- **Average** must be *Averaged*
- **Direction** must be *Direction*



## Method
The similarity between one wind profile and an average profiles is assessed following these steps:
1. The root mean square error of both direction and velocity is calculated between *all* wind profiles in the database and the average wind profile across all heights
2. The euclidian distance between the direction and the velocity is minimised
3. The similarity is expressed in terms of decreasing euclidian distance


## Use the tool
Upon clickling the tool, keep in mind that the average data used in the process is the data that is plotted in the axis. So should you select the average over a specific range of months, the most similar wind profile will reflect that range.

The first option popping up allows to choose a range of elevations over which the previous calculation is applied. Having a plume height of 15 km asl above a volcano located at 5 km asl, the entire range of altitudes provided by reanalysis databases might not be relevant. This option allows to target where the similarity matters,

The next window that opens contains the 100 most similar wind profiles ordered from top to bottom in decreasing similarity. In other word, the first item in the list is the best fit. Each wind profile is named with the date - remember that the hours are UTC - and the corresponding file number as named by TephraProb. You can now explore which single profile is best for you by plotting one or multiple profiles.



![Wind interface]({{ site.baseurl }}/img/blog/similarwind.jpg)