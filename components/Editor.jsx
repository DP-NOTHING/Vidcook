'use client';
import CreativeEditorSDK from '@cesdk/cesdk-js';
import { useEffect, useRef } from 'react';
import { Box } from '@mantine/core';
import { pageFormatDefinition } from '../utils/viewformat.js';

const config = {
  license: process.env.NEXT_PUBLIC_LICENSE,
  baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-js/1.27.1/assets',
  theme: 'dark',
  callbacks: {
    onUnsupportedBrowser: () => {
      window.alert(
        'Your current browser is not supported.\nPlease use one of the following:\n\n- Mozilla Firefox 86 or newer\n- Apple Safari 14.1 or newer\n- Microsoft Edge 88 or newer\n- Google Chrome 88 or newer'
      );
    },
    onLoad : 'load',
    onDownload:'Download',
    onUpload: 'local',
  },
  ui :{
    elements :{
      view: 'default',
      panels: {
        settings: true
      },
      navigation: {
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
      config.baseURL ='https://cdn.img.ly/packages/imgly/cesdk-js/1.27.1/assets';
      config.callbacks = { onUpload: 'local' ,onDownload:'Download',onExport: 'download'};


      CreativeEditorSDK.create(cesdk_container.current, config).then(
        async (instance) => {
          instance.addDefaultAssetSources();
          instance.addDemoAssetSources({ excludeAssetSourceIds: ['ly.img.video','ly.img.audio','ly.img.image'],sceneMode: 'Video',});
          await instance.createVideoScene(pageFormatDefinition);
          const engine = instance.engine;
        }
      );
      
    }
  }, [props.config , cesdk_container]);


  return (
    <Box
      ref={cesdk_container}
      style={{ width: '100vw', height: '100vh' ,maxHeight: '100vh',maxWidth: '100vw'}}
    ></Box>
  );
};


export default Editor;
