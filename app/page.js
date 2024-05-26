import Editor from "@/components/Editor";
import dynamic from "next/dynamic";
import {viewformat} from "../utils/viewformat.js";
import PAGE_FORMAT_ASSETS from '../utils/PageFormatAssets.json';
import { createApplyFormatAsset } from '../utils/createApplyFormatAsset';
import {
  PAGE_FORMATS_INSERT_ENTRY,
  formatAssetsToPresets,
  pageFormatI18n
} from '../utils/PageFormatAssetLibrary';

const DynamicEditor = dynamic(
  () => import('../components/Editor'),
  {
    ssr: false
  }
);
export default function Home() {

  const config = {
    license: process.env.NEXT_PUBLIC_LICENSE,
    baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-js/1.27.1/assets',
    callbacks: { onUpload: 'local' },
    theme: 'dark',
  };
  return (
    <DynamicEditor config={config}/>
  );
}
