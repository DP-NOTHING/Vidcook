'use client';
import CreativeEditorSDK from '@cesdk/cesdk-js';


import { useEffect, useRef } from 'react';
import { Box } from '@mantine/core';
import { pageFormatDefinition } from '../utils/viewformat.js';

const config = {
  // role: 'Adopter',
  license: process.env.NEXT_PUBLIC_LICENSE,
  baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-js/1.27.1/assets',
  theme: 'dark',
  callbacks: {
    onUnsupportedBrowser: () => {
      /* This is the default window alert which will be shown in case an unsupported
       * browser tries to run CE.SDK */
      window.alert(
        'Your current browser is not supported.\nPlease use one of the following:\n\n- Mozilla Firefox 86 or newer\n- Apple Safari 14.1 or newer\n- Microsoft Edge 88 or newer\n- Google Chrome 88 or newer'
      );
    },
    onLoad : 'load',
    onDownload:'Download',
    onUpload: 'local',
    onVideoExport : 'VideoExport',
  },
  ui :{
    elements :{
      view: 'default',
      panels: {
        settings: true
      },
      navigation: {
        // position: UserInterfaceElements.NavigationPosition.Top,
        action: {
          export: true
        }
      }
    },
  },
};

const Editor = (props = {}) => {
  const cesdk_container = useRef(null);
  useEffect(() => {
    if (cesdk_container.current) {
      config.license = process.env.NEXT_PUBLIC_LICENSE;
      // Serve assets from IMG.LY CDN or locally
      config.baseURL =
        'https://cdn.img.ly/packages/imgly/cesdk-js/1.27.1/assets';
      // Enable local uploads in Asset Library
      config.callbacks = { onUpload: 'local' ,onDownload:'Download',onExport: 'download'};


      CreativeEditorSDK.create(cesdk_container.current, config).then(
        async (instance) => {
          // Do something with the instance of CreativeEditor SDK, for example:
          // Populate the asset library with default / demo asset sources.
          
          instance.addDefaultAssetSources();
          instance.addDemoAssetSources({ excludeAssetSourceIds: ['ly.img.video','ly.img.audio','ly.img.image'],sceneMode: 'Video',});
          await instance.createVideoScene(pageFormatDefinition);

          const engine = instance.engine;
          // engine.block.resizeContentAware([2], 1920, 1080);
          // engine.block.resizeContentAware([0], 1920, 1080);
          // console.log(engine);
        }
      );
      
    }
  }, [props.config , cesdk_container]);


  return (
    <Box
      ref={cesdk_container}
      style={{ width: '100vw', height: '100vh' }}
    ></Box>
  );
};


export default Editor;
