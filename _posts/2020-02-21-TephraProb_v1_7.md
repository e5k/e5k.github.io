---
layout: post
title: TephraProb v.1.7
categories: codes
tags: tephraprob release
---

TephraProb v1.7 includes access to ERA-5 wind data, a different sampling of masses and some bug fixes.

## Changes in TephraProb v1.7
### Added functionalities

#### ERA-5
ERA-5 is now available for download. It follows the same procedure as ERA-Interim (refer to manual), but it uses a different Python API ([cdsapi](https://pypi.org/project/cdsapi/#files)) - which also requires a new key. 
1. Create a new account on the [CDS website](https://cds.climate.copernicus.eu/user/register?destination=/drupal_auth_check)
2. Retrieve your `UID` and `key` and format it as such (where `1234` is your UID and the string following the column is the API key):
```
url: https://cds.climate.copernicus.eu/api/v2
key: 1234:abcdefghij-134-abcdefgadf-82391b9d3f
```
3. Enter this key in **TephraProb** under `Input` > `Wind` > `Set ERA-5 API key`
4. Install the `cdsapi` in **TephraProb** using `Input` > `Wind` > `Install ERA-5 libraries`

Note it is only required to perform steps 4-5 once.

##### Relevant ERA-5 documentation
- Reference page for [ERA-5](https://confluence.ecmwf.int/display/CKB/ERA5)
- Good introduction to ERA-5 on [retostauffer.org](https://retostauffer.org/code/Download-ERA5/).
- Introduction to [CDS API](https://cds.climate.copernicus.eu/api-how-to)


#### Loading wind datasets
It is now possible to load existing datasets in the `Input` > `Wind` > `Download Wind` module.

#### Logarthmic sampling of mass
For subplinian/Plinian scenarios, the sampling of the eruption mass when `constrain=0` was linked to the distribution chosen for the plume height. A new variable `mass_sample` was introduced to control the shape of the distribution from which the mass is sampled:
- `mass_sample=0`: the mass is sampled between `min_mass` and `max_mass`
- `mass_sample=1`: the mass is sampled between log10(`min_mass`) and log10(`max_mass`)

#### Linking outputs to original ESPs
A new scheme was introduced to be able to link the content of the files `dataProb.mat` and `dataT2_*.mat` located in `RUNS/runName/runNb/DATA/`. This is explained in more details in 

### Bug fixes
- Fixed a bug on the sampling wind profiles when `seasonality=1`