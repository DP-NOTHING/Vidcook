'use client';
import CreativeEditorSDK from '@cesdk/cesdk-js';


import { useEffect, useRef } from 'react';


const Editor = (props = {}) => {
  const cesdk_container = useRef(null);
  useEffect(() => {
    if (cesdk_container.current) {
      props.config.license = process.env.NEXT_PUBLIC_LICENSE;
      // Serve assets from IMG.LY CDN or locally
      props.config.baseURL =
        'https://cdn.img.ly/packages/imgly/cesdk-js/1.27.1/assets';
      // Enable local uploads in Asset Library
      props.config.callbacks = { onUpload: 'local' };


      CreativeEditorSDK.create(cesdk_container.current, props.config).then(
        async (instance) => {
          // Do something with the instance of CreativeEditor SDK, for example:
          // Populate the asset library with default / demo asset sources.
          instance.addDefaultAssetSources();
          instance.addDemoAssetSources({ sceneMode: 'Video' });
          await instance.createVideoScene();
        }
      );
      
    }
  }, [props.config , cesdk_container]);


  return (
    <div
      ref={cesdk_container}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
};


export default Editor;
