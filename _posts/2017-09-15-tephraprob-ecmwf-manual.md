---
layout: post
title: Manually importing ERA-Interim files in TephraProb
categories: codes
tags: tephraprob wind ECMWF ERA-Interim
---

When accessing ERA-Interim data in batch, the behaviour of the ECMWF Python API is often unpredictable, which sometime complicates the automatic downloading of wind data in TephraProb. If the API does not work for you, the option of importing NetCDF files that were manually downloaded from the ERA-Interim website was added to TephraProb. Ain't that nice?

Note that you still will have to:
1. <a href="https://apps.ecmwf.int/registration/" target="_blank">Create an account</a> on the ECMWF website
2. <a href="https://apps.ecmwf.int/auth/login/" target="_blank">Login</a> to the ECMWF website
3. <a href="https://api.ecmwf.int/v1/key/" target="_blank">Retrieve</a> an API key
4. <a href="http://apps.ecmwf.int/datasets/licences/general/" target="_blank">Accept</a> the license


## 1 Download the data
### Select variables
1. Go to <a href="http://apps.ecmwf.int/datasets/data/interim-full-daily/levtype=pl/" target="_blank">this</a> page. On the top left corner of the page, be sure the type of level is **pressure level**
2. In the **Select date** box, select the date interval. You can either manually enter the dates or click in the grid. In any case, two things to keep in mind:
	- Time ranges **must be continuous**
	- Requesting longer time periods result in longer request times on their servers. With TephraProb, you can split your time range in smaller subsets.
3. In the **Select time** box, select the four time intervals.
4. In the **Select level and parameter** box, click on (which should select all levels):
	- *Geopotential*
	- *U component of wind*
	- *V component of wind*
5. At the bottom of the page, click the **Retrieve NetCDF** button

### Customise the grid
The next page appears and a few customisations need to be done:
6. Change the **grid** resolution to 0.25x0.25.
7. Enter a custom **area**. TephraProb interpolates the wind above the vent, so it is a good practice to define a grid that spans a few (typically ≥ 2) points around the vent, knowing the grid resolution defined above.
8. Click the **Retrieve now** button and the request will start.

### Retrieving your request
Right, so depending on the size of your request, the processing on the ECMWF servers might take a while (a whole year usually takes me between 15-30 minutes). If you quit your browser's page, no worries! <a href="http://apps.ecmwf.int/webmars/joblist/" target="_blank">This page</a> provides you with an history of your requests.



## 2 Processing
Once you've got all your data ready, switch back to TephraProb and use the <cmd>Input > Wind > Download wind data</cmd> tool. Select the **ECMWF ERA-Interim Offline** Reanalysis dataset and fill the required inputs and here you go!