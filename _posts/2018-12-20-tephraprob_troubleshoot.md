---
layout: post
title: TephraProb troubleshoot
categories: codes tips
tags: tephraprob troubleshoot
---

This is an attempt to track issues that could not be solved within the code. Keep in mind that having a code that works on everybody's computers is hard, especially on Windows where errors can arise because of loaaaaads of different factors. Also, please keep in mind I am not a personal hotline :)

### Content
- [ECMWF-Related issues](#ecmwf-related-issues)
  - [Pip](#pip)
    - [Case yey!](#case-yey)
  - [SSL](#ssl)
  - [Setuptools](#setuptools)
  - [ECMWF Python API](#ecmwf-python-api)
- [Tephra2 related issues](#tephra2-related-issues)
  - [Mac OS 10.14 Mojave](#mac-os-1014-mojave)

## ECMWF-Related issues

### Pip
Pip is a package manager, see it as an AppStore for nerds, but the principle is the same. Most of the errors related to the access to ECMWF datasets can be solved by installing small bits of code, and Pip helps with that. The first thing you have to check is whether Pip is installed on your system. To do so, you need to open a *terminal*

- **Windows**: Open the start menu and type <cmd>cmd</cmd> and open *Command Prompt*
- **Mac OS**: Open *Terminal.app*
- **Linux**: I assume you know how to do it

Now type:

```pip```

#### Case ney :(
Do you see anything that tells you that <cmd>pip</cmd> is not a recognized command? Then you need to install it. First, still in the terminal, let's hope that the following command works

```easy_install pip```

Else, you unfortunately need to figure it out using [this tutorial](https://www.makeuseof.com/tag/install-pip-for-python/)

#### Case yey!
Move on to installing the required package as described below!

### SSL
Error:

```urllib.error.URLError: <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self signed certificate in certificate chain ```

Fix:

```pip install pyopenssl```

### Setuptools

Error:

```ImportError: No module named setuptools```

Fix:

```pip install setuptools```

### ECMWF Python API
Summary of troubleshooting issues [here](https://confluence.ecmwf.int/display/WEBAPI/Web-API+Troubleshooting).

## Tephra2 related issues
### Mac OS 10.14 Mojave
If error during compilation, [this thread](https://stackoverflow.com/questions/52509602/cant-compile-c-program-on-a-mac-after-upgrade-to-mojave) helps fixing it.