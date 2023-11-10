import * as THREE from "three";
import AudioController from "../../utils/AudioController";
import Scene from "../Scene";

export default class Cover {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 10, 10);
    this.material = new THREE.MeshBasicMaterial({
      wireframe: false,
      side : THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

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