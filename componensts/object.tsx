import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

type Props = {
  obj_type: string;
  gltf?: string;
  mtl?: string;
  obj?: string;
  camera_x: number;
};

const ThreeJSModelLoader: React.FC<Props> = ({ obj_type, gltf, mtl, obj, camera_x }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    camera.position.z = camera_x;

    // ライト
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // gltfファイルの読み込み
    if (obj_type == 'gltf' && gltf) {
      const loader = new GLTFLoader();
      loader.load(gltf, (gltf) => {
        scene.add(gltf.scene);
      });
    }

    // MTLとOBJファイルの読み込み
    if (obj_type == 'obj' && mtl && obj) {
      const mtlLoader = new MTLLoader();
      mtlLoader.load(mtl, (materials) => {
        materials.preload();

        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(obj, (object) => {
          scene.add(object);
        });
      });
    }

    // OrbitControlsの読み込み
    const controls = new OrbitControls(camera, renderer.domElement);

    // アニメーション
    const clock = new THREE.Clock();
    const tick = () => {
      controls.update();
      window.requestAnimationFrame(tick);
      renderer.render(scene, camera);
    };
    tick();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default ThreeJSModelLoader;
