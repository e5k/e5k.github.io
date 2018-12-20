---
layout: post
title: Manual compilation of Tephra2
categories: codes tips
tags: tephraprob tephra2 troubleshoot
---

TephraProb compiles Tephra2 through a bit of Matlab hocus pocus to facilitate problems of OS dependancy, but the mighty Matlab can sometime fail us. In this case, it becomes necessary to manually compile Tephra2 from the command line to see what the error message is. I spent a fair amount of time writing this procedure in emails to people who encountered problems and I thought I would write it down here.

Just to clarify things, **compiling** is the process of transforming files containing lines of code into a program that can be executed by the user. The whole compilation process depends on such aspects as the computer's architecture or OS, so it needs to be performed on each computer separately. Again, most of the time everything should be taken care of smoothly within TephraProb, but just in case...

## Unix for non-nerds
This process requires to access Tephra2 through the command line (<var>Terminal</var> on Unix, <var>Cygwin Terminal</var> on Windows). Here are some tips on how to use it.

### Navigating through folders
The main command to navigate through folders is <cmd>cd</cmd>:
{% highlight bash %}
cd folder 	# Enter the directory called folder
cd .. 		# Go back to the parent directory
{% endhighlight %}

### Where to go?
Another useful command is <cmd>ls</cmd>, which lists the content of the current directory. When navigating directories with <cmd>cd</cmd>, note that the <var>tab</var> key auto-completes commands. Taking the example above, typing <cmd>cd fold</cmd> and hitting <var>tab</var> is likely to complete the command to <cmd>cd folder/</cmd>.

### Locating Tephra2
The Tephra2 executable (<var>tephra2-2012</var> on Unix, <var>tephra2-2012.exe</var> on Windows) should be located in the <pth>tephraProb/MODEL/</pth> folder. Open the terminal and navigate to this location. If you are unsure in which directory you are when starting the Terminal, the command <cmd>pwd</cmd> will help. On Unix, it usually starts in your home folder (<pth>/home/username/</pth> on Linux, <pth>/Users/username/</pth> on Mac).

On Windows/Cygwin, things are slightly different. Let's assume that TephraProb is located in <pth>E:/TephraProb/</pth>, the right way to navigate to this location on the Cygwin terminal is: 

{% highlight bash %}
cd /cygdrive/e/TephraProb
{% endhighlight %}


## Manual compilation
Once in the <pth>MODEL/</pth> folder, enter the <pth>forward_src</pth> folder and type:
{% highlight bash %}
make
{% endhighlight %}

Hopefully, that should result in the last line printed to the command line being:
{% highlight bash %}
mv tephra2-2012 ../tephra2-2012
{% endhighlight %}

There might be warnings, but these should be ok. 

### Common errors
Here, I will try and list common errors that have been encountered.

#### File format not recognised
This error was encountered on Cygwin:
{% highlight bash %}
make[1]: Entering directory '/cygdrive/e/Seb/Documents/CODES/TephraProb/MODEL/forward_src'
`which gcc` -Wall -g -idirafter ../include -o tephra2-2012 new_tephra.o tephra2_calc.o -lm /libcygwin64/libgc.a -ldl
new_tephra.o: file not recognized: File format not recognized
{% endhighlight %}

This was solved by entering in the <pth>forward_src</pth>, removing the *.o files and recompiling:
{% highlight bash %}
cd forward_src
rm *.o 	# Remove *.o files
make
{% endhighlight %}


## Manual Tephra2 run
If the compilation worked, the Tephra2 executable should now be located in the folder <pth>MODEL/</pth>. To start the command, type <cmd>./tephra2-2012</cmd> on Unix or <cmd>./tephra2-2012.exe</cmd> on Windows, which will result in:
{% highlight bash %}
Missing comand line arguments,
USAGE: <program name> <config file> <points file> <wind file> <file of grain sizes>
{% endhighlight %}

You now have to specify all input files including:
1. A configuration file, typically a <cmd>.conf</cmd> file located somewhere in <pth>TephraProb/RUNS/runName/runNumber/CONF/</pth>
2. A grid file, typically a <cmd>.utm</cmd> file located in <pth>TephraProb/GRID/gridName/</pth>
3. A wind file, typically a <cmd>.gen</cmd> file located in <pth>TephraProb/WIND/windName/</pth>
4. A grain-size distribution file, typically a <cmd>.gsd</cmd> file located somewhere in <pth>TephraProb/RUNS/runName/runNumber/GS/</pth>

You can either specify the full path to these files or copy them in the same folder as the Tephra2 executable, in which case Tephra2 can be run by typing:
{% highlight bash %}
./tephra2 conf.conf grid.utm wind.gen tgsd.gsd > test.out # Unix
./tephra2.exe conf.conf grid.utm wind.gen tgsd.gsd > test.out # Windows
{% endhighlight %}

Note that the last argument <cmd>> test.out</cmd> specifies the output file to Tephra2.

### Common errors

#### Permission denied
If a <cmd>Permission denied</cmd> error is returned upon using the <cmd>./tephra2-2012</cmd> command, try changing the access permissions:
{% highlight bash %}
chmod 755 tephra2-2012
{% endhighlight %}


## Other problems
I am trying to build a database of common problems faced by TephraProb / Tephra2 users. Contact me (if you haven't already done it) and we will post the answer here for other people.