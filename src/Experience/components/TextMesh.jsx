import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFont } from "@react-three/drei";

const TextMesh = ({
  text,
  position = [0, 0, 0],
  scale = 1,
  color = 0xffffff,
}) => {
  const mesh = useRef();

  useEffect(() => {
    if (!mesh.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.font = "bold 80px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const geometry = new THREE.PlaneGeometry(2, 1);
    const textMesh = new THREE.Mesh(geometry, material);

    mesh.current.add(textMesh);

    return () => {
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [text]);

  return <group ref={mesh} position={position} scale={scale} />;
};

export default TextMesh;
