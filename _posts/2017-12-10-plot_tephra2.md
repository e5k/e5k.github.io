---
layout: post
title: Plot the output of Tephra2 in Matlab
categories: codes utilities
tags: tephra2utils tephra2 map
---

This is a quick and dirty function that I needed to directly plot the output of Tephra2 runs on a map. Tephra2 outputs are in a *column* format (i.e. easting, northing, elevation and mass accumulation), with the number of rows equal to the total number of points in the grid. For some obscure reason, most of Matlab's plotting functions only accept inputs in a *matrix* format, i.e. separate <cmd>m x n</cmd> matrices for easting, northing, elevation and mass accumulation, where <cmd>m</cmd> and <cmd>n</cmd> are the numbers of northing and easting values, respectively. Matlab, unlike other plotting tools (e.g. GMT, Python), therefore requires a transformation the data.

Additionally, Tephra works with UTM coordinates. This function accepts optional arguments to convert the output of Tephra2 to lat/lon coordinates. For this, two additional functions published on the Matlab File Exchange are required:
1. <a href="https://uk.mathworks.com/matlabcentral/fileexchange/45699-ll2utm-and-utm2ll" target="_blank">utm2ll</a> by François Beauducel
2. <a href="https://uk.mathworks.com/matlabcentral/fileexchange/27627-zoharby-plot-google-map" target="_blank">plot\_google\_map</a> by Zohar Bar-Yehuda

## The function
The function <cmd>plotT2</cmd> can be downloaded<a href="https://github.com/e5k/Tephra2Utils" target="_blank"> here</a>. One argument is required, which is a string containing the path to the file. Outputs are then matrices of easting (<var>E</var>), northing (<var>N</var>) and mass accumulation (<var>M</var>):

{% highlight matlab %}
[E,N,M,Carea,Pmass,cont,varargout] = plotT2(pathToFile, varargin)
{% endhighlight %}

### Required argument

Argument | Description
---------|---------
<var>pathToFile</var> | Path to Tephra2 output file

### Optional name-value pairs of arguments
The optional pairs of name-value arguments are summarised below:

Argument | Description
---------|---------
<var>'zone'</var> | UTM zone of the Tephra2 output, used to convert projected to geographic coordinates and plot a Google Map background if both [utm2ll](https://uk.mathworks.com/matlabcentral/fileexchange/45699-ll2utm-and-utm2ll) and [plot_google_map](https://uk.mathworks.com/matlabcentral/fileexchange/27627-zoharby-plot-google-map) are available. Should be a double, positive in the N hemisphere, negative in the S hemisphere
<var>'plot'</var> | Defines if accumulation is plotted as log10 (<pth>'log10'</pth>, default) or linear (<pth>'linear'</pth>)
<var>'contours'</var> | Vector containing the values (kg/m<SUP>2</SUP>) of accumulation to contour. By default set to <cmd>[1,10,100,1000]</cmd></td>
<var>'minVal'</var> | Minimum value to be represented on the continuous color surface (kg/m<sup>2</sup>)
<var>'vent'</var> | Plot the vent, entered as <pth>[easting, northing]</pth> coordinates.
<var>'points'</var> | Additional points to plot, entered as a 2-columns <pth>[easting,northing]</pth> matrix. If entered as a 3-columns <pth>[easting,northing,value]</pth> matrix, value is used as a label

### Output arguments

Argument | Description
---------|---------
<var>E</var> | Easting matrix (m)
<var>N</var> | Northing matrix (m)
<var>M</var> | Mass accumulation matrix (kg/m<SUP>2</SUP>)
<var>Carea</var> | Area of each isomass contour (km<SUP>2</SUP>)
<var>Pmass</var> | Mass contained within each contour (kg)
<var>contour</var> | Contours (kg/m<SUP>2</SUP>)
<var>lat</var> | Optional - latitude matrix, if <var>'zone'</var> is specified
<var>lon</var> | Optional - longitude matrix, if <var>'zone'</var> is specified

### Examples

When the argument <cmd>'zone'</cmd> is passed, it is possible to request the matrix versions of latitude and longitude:

{% highlight matlab %}
plotT2('example.out');
plotT2('example.out', 'zone', 18);
plotT2('example.out', 'plot', 'linear');
plotT2('example.out', 'contours', [10, 50, 100]);
{% endhighlight %}

