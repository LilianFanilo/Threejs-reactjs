import * as THREE from "three";
import AudioController from "../../utils/AudioController";
import Scene from "../Scene";
// eslint-disable-next-line import/no-webpack-loader-syntax
import fragmentShader from "!!raw-loader!!glslify-loader!../../shaders/cover/fragment.glsl";
// eslint-disable-next-line import/no-webpack-loader-syntax
import vertexShader from "!!raw-loader!!glslify-loader!../../shaders/cover/vertex.glsl";

export default class Cover {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(20, 20, 512, 512);
    this.material = new THREE.PointsMaterial({
      size : 0.02,
      sizeAttenuation : true
      // wireframe: false,
      // side : THREE.DoubleSide,
      // fragmentShader: fragmentShader,
      // vertexShader: vertexShader,
    });
    this.mesh = new THREE.Points(this.geometry, this.material);

    this.group = new THREE.Group()
    this.group.add(this.mesh)
  }

  updateCover(src){
    console.log(src);

    Scene.textureLoader.load(src, (texture) => {
        console.log(texture);
        this.material.map = texture;
        this.material.needsUpdate = true
    })
  }

  tick(deltaTime) {

  }
}