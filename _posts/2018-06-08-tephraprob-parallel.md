---
layout: post
title: TephraProb on a cluster
categories: codes
tags: tephraprob parallel
---

There is a relatively easy way to parallelise TephraProb on a computer cluster without having to struggle with Matlab's Parallel Computing Toolbox. Matlab is not even needed on the cluster, and it is just a matter of sending single occurrences of Tephra2 on different nodes. Here is how to do so:

1. Generate your input files and eruption scenarios locally
2. Send the required files on the cluster
3. Run the scenario on the cluster
4. Retrieve the output files from the cluster to the local computer
5. Post-process the output files (e.g. probability calculations) locally

## Setting up remote files
Following the procedure in the <a href="{{ site.baseurl }}/files/tephraprob_man.pdf" target="_blank">TephraProb manual</a>, all tasks should be completed until section 5.3 - meaning you should be set to hit the <var>Run Tephra2</var> function. The main file that will be used for the parallelisaition is **T2_stor.txt**, located in <pth>RUNS/runName/runNumber/T2_stor.txt</pth>, which contains the Tephra2 commands for all single model runs of the scenario.

Transfer your run, grid and wind files on the cluster. Unless you decide to customize <pth>T2_stor.txt</pth>, the directory tree once on the cluster should look like the following. Note that **not all** files of the <pth>RUNS/</pth>, <pth>GRID/</pth> and <pth>WIND</pth> folders need to be transferred.

<pre>
ROOT
├── MODEL/
│   └── tephra2-2012
├── RUNS/
│   └── runName/
│       └── runNumber/
│           ├── CONF/*.*
│           ├── GS*.*
│           └── OUT/*.*
├── WIND/
│   └── windName/
│           └── pathToAscii/*.*
├── GRID/
│   └── gridName/
│           └── *.utm
├── T2_stor.txt
└── runTephraProb.sh
</pre>

Note that <pth>T2_stor.txt</pth> should be at the root, and all commands specified in it should point to locations that have been uploaded on the cluster. Note that by default, all paths defined in <pth>T2_stor.txt</pth> are *relative*.

## Running in parallel

The parallelization is achieved using *job arrays*. Conceptually:

1. <pth>T2_stor.txt</pth> is cut in smaller files named <pth>T2_stor.txt00</pth>, <pth>T2_stor.txt01</pth> ... <pth>T2_stor.txtXX</pth> using the <cmd>split</cmd> Unix command
2. The subset of commands to Tephra2 in each of the sub-file is sent to a different node using a *job array*

On the cluster, split <pth>T2_stor.txt</pth>:
<pre>
split -l 1000 -a 2 -d T2_stor.txt T2_stor.txt
</pre>

where <cmd>-l</cmd> is the number of line of each sub-file (here <pth>T2_stor.txt</pth> will be split into subsets of 1000 lines) and <cmd>-a</cmd> is the number of digits appended to the name of the subfile (e.g. -a 2 produced 01, 02 etc...). The last argument is the generic name of the sub-file.

Let's say that this created 10 files named <pth>T2_stor.txt00</pth> to <pth>T2_stor.txt09</pth>. We need to adapt the job array to account for the range 0-9.

### SLURM

On a SLURM cluster, the bash <pth>runTephraProb.sh</pth> should contain the following lines:

<pre>
module load GCC/4.9.3-2.25
module load OpenMPI/1.10.2
module load parallel
chunk=`printf "%02d" $SLURM_ARRAY_TASK_ID`
srun parallel -j 16 -a T2_stor.txt$chunk
</pre>

The job can then be submitted using:
<pre>
sbatch --array=0-9 runTephraProb.sh
</pre>

Note the dependency to [GNU Parallel](https://savannah.gnu.org/projects/parallel/).

### OpenPBS


## Post-processing
Once the modelling is finished, copy the remote version of <pth>RUNS/runName/runNumber/OUT/</pth> on to your local <pth>RUNS/runName/runNumber/OUT/</pth> and go on with the post-processing.