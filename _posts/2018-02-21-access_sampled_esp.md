---
layout: post
title: Access sampled ESP in TephraProb
categories: codes tips
tags: tephraprob 
---

After running scenarios in TephraProb, you might be interested in accessing the raw ESPs that were sampled during Monte Carlo simulations. Here is how:

Let's say your run name was <pth>Sakurajima</pth> and you want to access data for the second attempt. You first need to load the file <pth>RUNS/Sakurajima/2/Sakurajima_2.mat</pth>, which should create a variable called <var>data</var> in Matlab. This is a **structure**, which contains a **field** named <var>stor</var> where all the data are stored. In <var>data.stor</var>, there are sub-fields each representing a different parameter (e.g. plume height, duration, mass, MER, TGSD). These parameters are stored as **vectors** that can have different sizes. 

If the duration of each simulated eruption is <6 h, the size of all vectors should equal the number of simulated eruptions. 

If durations are >6 h, the size of those parameters that change at each 6 h increment (e.g. plume height, MER) represents the number of times each was sampled. For instance, in the case of a 15 h-long eruption, 3 plume heights are sampled. However, other parameters (e.g. TGSD) are constant over the entire duration of the eruption, so the resulting vectors will have a size equal to the number of simulated eruptions.


## Example

Load the .mat file:

{% highlight bash %}
load RUNS/Sakurajima/2/Sakurajima_2

data.stor

1x50 struct array with fields:

    ht
    mer
    mass
    dur
    date
    gs_med
    gs_std
    gs_coef

{% endhighlight %}


Plot a histogram of the plume height:

{% highlight bash %}

toPlot = [data.stor.ht]; % Need to vectorize the data

figure;
histogram(toPlot)
xlabel('Plume height')
ylabel('Frequency')
title([num2str(numel(toPlot)), ' occurrences'])

{% endhighlight %}