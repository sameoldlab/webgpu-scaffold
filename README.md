# WebGPU Scaffold 
---

A simple template to get started writing shaders in WebGPU. 

## Getting started
```sh
# copy the repo
npx degit sameoldlab/webgpu-scaffold project-name
# enter project directory
cd project-name
# install dependencies
pnpm i # or yarn, npm

# start server at localhost:5173
pnpm dev
```


## Browser Support
As of February 16th, 2023, WebGPU is available in Google Chrome and Firefox Nightly. See [gpuweb wiki Implementation Status](https://github.com/gpuweb/gpuweb/wiki/Implementation-Status) for up to date support and progress. To enable it on Firefox Nightly set `dom.webgpu.enabled=true` in `about:config`. For Chromium browsers on Linux the `chrome://flags/#enable-unsafe-webgpu` should be and the browser launched with `--enable-features=vulkan`.


## Credit
Adapted from [GetIntoGameDev's WebGPU series](https://www.youtube.com/playlist?list=PLn3eTxaOtL2Ns3wkxdyS3CiqkJuwQdZzn)
and [Orillusion webgpu samples](https://github.com/Orillusion/orillusion-webgpu-samples?tab=License-1-ov-file)
