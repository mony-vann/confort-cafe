import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loadGLTFModel } from "../lib/model";
import { DogSpinner, DogContainer } from "./voxel-cafe-loader";

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}

const VoxelDog = () => {
  const refContainer = useRef();
  const [loading, setLoading] = useState(true);
  const refRenderer = useRef();
  const urlDogGLB =
    (process.env.NODE_ENV === "production" ? "" : "") + "/cafe.glb";

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer;
    const { current: container } = refContainer;
    if (container && renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      renderer.setSize(scW, scH);
    }
  }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const { current: container } = refContainer;
    if (container) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(scW, scH);
      renderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild(renderer.domElement);
      refRenderer.current = renderer;
      const scene = new THREE.Scene();

      const target = new THREE.Vector3(0, 1.2, 0);
      const initialCameraPosition = new THREE.Vector3(
        20 * Math.sin(0.2 * Math.PI),
        10,
        20 * Math.cos(0.2 * Math.PI)
      );

      // 640 -> 240
      // 8   -> 6
      const scale = scH * 0.0005 + 1.8;
      const camera = new THREE.OrthographicCamera(
        -scale,
        scale,
        scale,
        -scale,
        0.01,
        50000
      );
      camera.position.copy(initialCameraPosition);
      camera.lookAt(target);

      const topLight = new THREE.DirectionalLight(0xffffff, 1);
      topLight.position.set(500, 500, 500);
      topLight.castShadow = true;
      scene.add(topLight);

      const ambientLight = new THREE.AmbientLight(0xcccccc, 5);
      scene.add(ambientLight);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.target = target;

      loadGLTFModel(scene, urlDogGLB, {
        receiveShadow: false,
        castShadow: false,
      }).then(() => {
        animate();
        setLoading(false);
      });

      let req = null;
      let increasing = true; // Flag to control the rotation direction
      let rotationAngle = 4.5; // Initial angle

      const animate = () => {
        req = requestAnimationFrame(animate);

        // Update rotation angle based on the direction
        if (increasing) {
          rotationAngle += 0.002; // Adjust this value for the speed of rotation
          if (rotationAngle >= 5) {
            // Switch direction when reaching 180 degrees
            increasing = false;
          }
        } else {
          rotationAngle -= 0.002; // Adjust this value for the speed of rotation
          if (rotationAngle <= 4.5) {
            // Switch direction when returning to 90 degrees
            increasing = true;
          }
        }

        const p = initialCameraPosition;

        camera.position.y = 10;
        camera.position.x =
          p.x * Math.cos(rotationAngle) + p.z * Math.sin(rotationAngle);
        camera.position.z =
          p.z * Math.cos(rotationAngle) - p.x * Math.sin(rotationAngle);
        camera.lookAt(target);

        renderer.render(scene, camera);
      };

      return () => {
        cancelAnimationFrame(req);
        renderer.domElement.remove();
        renderer.dispose();
      };
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize, false);
    return () => {
      window.removeEventListener("resize", handleWindowResize, false);
    };
  }, [handleWindowResize]);

  return (
    <DogContainer ref={refContainer}>{loading && <DogSpinner />}</DogContainer>
  );
};

export default VoxelDog;
