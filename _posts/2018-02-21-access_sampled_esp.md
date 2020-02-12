---
layout: post
title: Access sampled ESP in TephraProb
categories: codes tips
tags: tephraprob 
---

**Article updated on 2020-02-12. This will work with TephraProb v1.6.5**

This note shows how to access the ESPs sampled during Monte Carlo simulations and how to link them to a given output. Two files are needed:
- The file located in ``RUNS/runName/runNb/`` named ``runName_runNb.mat``. This contains a **structure** called ``data``, which contains a **field** named <var>stor</var> where all the ESPs are stored. <var>data.stor</var> contains sub-fields for the different parameter (e.g. plume height, duration, mass, MER, TGSD). These parameters are stored as **vectors** that can have different sizes. If the duration of each simulated eruption is <6 h, the size of all vectors should equal the number of simulated eruptions. If durations are >6 h, the size of those parameters that change at each 6 h increment (e.g. plume height, MER) represents the number of times each was sampled. For instance, in the case of a 15 h-long eruption, 3 plume heights are sampled. However, other parameters (e.g. TGSD) are constant over the entire duration of the eruption, so the resulting vectors will have a size equal to the number of simulated eruptions.
- The file located in ``RUNS/runName/runNb/DATA/`` named ``dataT2_all.mat``, which contains two variables:
  - ``dataT2`` is a ``m`` by ``n`` matrix, where ``m`` is the number of points over which accumulations are computed and ``n`` is the number of runs. This variable contains all the summed Tephra2 outputs in kg/m2;
  - ``runNb`` is a ``m`` by 1 vector, where ``m`` is the number of runs. 

Now, there is something to keep in mind. Let's say we have 10 text files named sequentially from *01.txt* to *10.txt*. Matlab reads sequential files as *01.txt*, *10.txt*, *02.txt* ... *09.txt*, **and not as** *01.txt*, *02.txt* ... *10.txt*. In TephraProb post-processing, this means that:
- ESPs in the variable ``data.stor`` are ordered in increasing run number
- Runs outputs in ``dataT2`` are ordered in the way Matlab reads the files

It is therefore necessary to re-index ``dataT2`` to the order of the ESPs contained in ``data.stor``.

## Examples

### Re-index ESPs with outputs

``` matlab
# Load the second sampling attempt of the run called Sakurajima
load RUNS/Sakurajima/2/Sakurajima_2 

# Load the isomass output
load RUNS/Sakurajima/2/DATA/dataT2_all.mat 

# Show the loaded variables
data.stor
dataT2
runNb

# Retrieve the selected ESPs
esp = [[data.stor.ht]'./1e3,log10([data.stor.mass]'),[data.stor.dur]'./3600,[data.stor.gs_med]',date(:,2)];

# Reorder the run numbers in ascending order and save their indices
[~,id] = sort(runNb);
# Reorder the isomass outputs
dataT2 = dataT2(:,id);

# dataT2 and data.stor are now indexed
random_run = 10;
run_output = dataT2(:,random_run);
run_ESPs = esp(random_run, :);

```

Plot a histogram of the plume height:

``` matlab
toPlot = [data.stor.ht]; % Need to vectorize the data

figure;
histogram(toPlot)
xlabel('Plume height')
ylabel('Frequency')
title([num2str(numel(toPlot)), ' occurrences'])

```