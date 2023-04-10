import type { NextPage } from 'next';

import ThreeJSModelLoader from '../componensts/object';

const Home: NextPage = () => {
  return <ThreeJSModelLoader obj_type="obj" mtl="/models/duck.mtl" obj="/models/duck.obj" camera_x={100} />;
};

export default Home;
