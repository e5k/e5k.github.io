---
layout: post
title: Plot the output of Tephra2 in Matlab
categories: codes utilities
tags: tephraprob matlab tephra2 map
---

This is a quick and dirty function that I needed to directly plot the output of Tephra2 runs on a map. Tephra2 outputs are in a *column* format (i.e. easting, northing, elevation and mass accumulation), with the number of rows equal to the total number of points in the grid. For some obscure reason, most of Matlab's plotting functions only accept inputs in a *matrix* format, i.e. separate <cmd>m x n</cmd> matrices for easting, northing, elevation and mass accumulation, where <cmd>m</cmd> and <cmd>n</cmd> are the numbers of northing and easting values, respectively. Matlab, unlike other plotting tools (e.g. GMT, Python), therefore requires a transformation the data.

Additionally, Tephra works with UTM coordinates. This function accepts optional arguments to convert the output of Tephra2 to lat/lon coordinates. For this, two additional functions published on the Matlab File Exchange are required:
1. <a href="https://uk.mathworks.com/matlabcentral/fileexchange/45699-ll2utm-and-utm2ll" target="_blank">utm2ll</a> by François Beauducel
2. <a href="https://uk.mathworks.com/matlabcentral/fileexchange/27627-zoharby-plot-google-map" target="_blank">plot\_google\_map</a> by Zohar Bar-Yehuda

## The function
The function <cmd>plotT2</cmd> can be downloaded<a href="https://github.com/e5k/Tephra2Utils" target="_blank"> here</a>. One argument is required, which is a string containing the path to the file. Outputs are then matrices of easting (<var>E</var>), northing (<var>N</var>) and mass accumulation (<var>M</var>):

{% highlight matlab %}
[E, N, M] = plotT2('example.out');
{% endhighlight %}

### Optional name-value pairs of arguments
The optional pairs of name-value arguments are summarised below:
<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><cmd>'zone'</cmd></td>
      <td>UTM zone of the Tephra2 output. Should be a double, positive in the N hemisphere, negative in the S hemisphere</td>
    </tr>
		<tr>
		  <td><cmd>'plot'</cmd></td>
		  <td>Defines if accumulation is plotted as log10 (<cmd>'log10'</cmd>, default) or linear (<cmd>'linear'</cmd>)</td>
		</tr>
		<tr>
		  <td><cmd>'contours'</cmd></td>
		  <td>Vector containing the values (kg/m<SUP>2</SUP>) of accumulation to contour. By default set to <cmd>[1,10,100,1000]</cmd></td>
		</tr>	
  </tbody>
</table>
<div class="figcaption">
<figcaption></figcaption>
</div>


### Examples

When the argument <cmd>'zone'</cmd> is passed, it is possible to request the matrix versions of latitude and longitude:

{% highlight matlab %}
[E,N,M]           = plotT2('example.out');
[E,N,M,LAT,LON]   = plotT2('example.out', 'zone', 18);
[E,N,M]           = plotT2('example.out', 'plot', 'linear');
[E,N,M]           = plotT2('example.out', 'contours', [10, 50, 100]);
{% endhighlight %}

