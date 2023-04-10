import type { NextPage } from 'next';

import ThreeJSModelLoader from '../componensts/object';

const Home: NextPage = () => {
  return <ThreeJSModelLoader obj_type="gltf" gltf="/models/mofumofu.glb" camera_x={10} />;
};

export default Home;
