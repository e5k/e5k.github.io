---
layout: post
title: Manually importing NOAA Reanalysis files in TephraProb
categories: codes
tags: tephraprob wind NOAA
---

Sometime, you might want to be able to import into TephraProb some NOAA Reanalysis NetCDF files downloaded manually. One of the reasons is that the NOAA server is accessed via FTP, and firewalls (such as those installed in University networks) might result in an error such as this:

{% highlight matlab %}
Error using ftp/mget (line 109)
FTP error: 425.
{% endhighlight %}

Alrighty then, let's find a workaround! When working with the NOAA Reanalysis dataset (either the R1 or R2 versions), TephraProb will look for NetCDF files located in the folder <pth>WIND/_Reanalysis1_Rawdata/</pth> or <pth>WIND/_Reanalysis2_Rawdata/</pth>. Each file is named <pth>variable/year.nc</pth>, where *variable* can be <var>hgt</var> (i.e. geopotential height), <var>uwnd</var> (i.e. u wind component) and <var>vwnd</var> (i.e. v wind component). Each of this file contains data for an entire year for the Global Grid defined by NOAA. 

When using the function <cmd>Input > Wind > Download</cmd> wind data from the TephraProb GUI, the code will first check whether files for the requested time period already exist in the <pth>_Rawdata/</pth> folder in order to avoid multiple downloads. If they do not, well, then they are downloaded, else the downloading part is skipped and files are automatically processed, where temporal and spatial subsets are extracted. 

What we will do is manually download files from the NOAA website from a usual web browser in order to bypass the use of FTP and manually place them in the <pth>_Rawdata/</pth> to cheat the downloading part.

## 1 Download the data
Download the raw NetCDF files from the following links:
*		Reanalysis 1: <a href="https://www.esrl.noaa.gov/psd/cgi-bin/db_search/DBListFiles.pl?did=192&tid=60830&vid=14" target="_blank" class="tag">hgt</a><a href="https://www.esrl.noaa.gov/psd/cgi-bin/db_search/DBListFiles.pl?did=192&tid=60830&vid=18" target="_blank" class="tag">uwnd</a><a href="https://www.esrl.noaa.gov/psd/cgi-bin/db_search/DBListFiles.pl?did=192&tid=60830&vid=19" target="_blank" class="tag">vwnd</a>
*		Reanalysis 2: <a href="https://www.esrl.noaa.gov/psd/cgi-bin/db_search/DBListFiles.pl?did=61&tid=59909&vid=1454" target="_blank" class="tag">hgt</a><a href="https://www.esrl.noaa.gov/psd/cgi-bin/db_search/DBListFiles.pl?did=61&tid=59909&vid=4300" target="_blank" class="tag">uwnd</a><a href="https://www.esrl.noaa.gov/psd/cgi-bin/db_search/DBListFiles.pl?did=61&tid=59909&vid=4306" target="_blank" class="tag">vwnd</a>


## 2 Processing
Move the downloaded NetCDF files to the folders <pth>WIND/_Reanalysis1_Rawdata/</pth> or <pth>WIND/_Reanalysis2_Rawdata/</pth>. Now use the <cmd>Input > Wind > Download wind data</cmd> from the TephraProb GUI as you would normally do, specify the right dataset and voila!