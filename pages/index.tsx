import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const objObject = useRef<THREE.Group>();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    // レンダラー
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // シーン
    const scene = new THREE.Scene();

    // カメラ
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // ライト
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // MTLとOBJファイルの読み込み
    const mtlLoader = new MTLLoader();
    mtlLoader.load('/models/duck.mtl', (materials) => {
      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load('/models/duck.obj', (object) => {
        objObject.current = object;
        // テクスチャの読み込み
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('/models/duck.png', (texture) => {
          object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material.map = texture;
            }
          });

          scene.add(object);
        });
      });
    });

    // アニメーション
    const clock = new THREE.Clock();
    const tick = () => {
      // モデルの回転
      if (objObject.current) {
        objObject.current.rotation.x += 0.01;
        objObject.current.rotation.y += 0.01;
      }

      window.requestAnimationFrame(tick);
      renderer.render(scene, camera);
    };
    tick();

    // ブラウザのリサイズ処理
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);
  return <canvas ref={canvasRef} />;
};

export default Home;
