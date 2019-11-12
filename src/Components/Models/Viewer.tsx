import React from 'react'
import { Translate } from "react-localize-redux"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { PMREMGenerator } from 'three/examples/jsm/pmrem/PMREMGenerator.js'
import { PMREMCubeUVPacker } from 'three/examples/jsm/pmrem/PMREMCubeUVPacker.js'
import classnames from 'classnames'
import Loader from './Loader'
import { Button, UncontrolledTooltip, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getPreviewLink } from '../../Functions/Helpers'

import logo from '../../Assets/logo_text.svg'
import hdri from '../../Assets/images/hdri/colorful_studio_1k.hdr'

class ModelViewer extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      isLoaded: false,
      autoRotate: true,
      fullScreen: false,
      selectedMaterial: "full"
    }
  }

  scene: any
  ambient: any
  mount: any
  camera: any
  renderer: any
  frameId: any
  controls: any
  materials: any = {
    full: null,
    normal: null,
    metalness: null,
    occlusion: null,
    roughness: null,
    wireframe: null
  }
  materialLabels: any = {
    full: "PBR",
    normal: "Normal",
    occlusion: "Ambient Occlusion",
    metalness: "Metalness",
    roughness: "Roughness",
    wireframe: "Wireframe"
  }
  envMap: any

  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    // Add scene
    this.scene = new THREE.Scene()
    // Add camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 10000)
    this.camera.position.set(2, 2, 3)
    // Add ambient light
    this.ambient = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
    this.ambient.color.setHSL(0.6, 1, 0.6)
    this.ambient.groundColor.setHSL(0.095, 1, 0.75)
    this.ambient.position.set(0, 50, 0)
    this.scene.add(this.ambient)
    // Add lights
    let keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0)
    keyLight.position.set(-100, 0, 100)

    let fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75)
    fillLight.position.set(100, 0, 100)
    fillLight.castShadow = true

    let backLight = new THREE.DirectionalLight(0xffffff, 1.0)
    backLight.position.set(100, 0, -100).normalize()
    fillLight.castShadow = true

    this.scene.add(keyLight)
    this.scene.add(fillLight)
    this.scene.add(backLight)
    // Add controls
    this.controls = new OrbitControls(this.camera, this.mount)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.enablePan = false
    this.controls.autoRotate = this.state.autoRotate
    // Add cubemap
    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .load(hdri, (texture: any) => {
        const background = new THREE.WebGLRenderTargetCube(1024, 1024).fromEquirectangularTexture(this.renderer, texture)

        let pmremGenerator = new PMREMGenerator(background.texture)
        pmremGenerator.update(this.renderer)

        let pmremCubeUVPacker = new PMREMCubeUVPacker(pmremGenerator.cubeLods)
        pmremCubeUVPacker.update(this.renderer)
        
        this.envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture

        pmremGenerator.dispose()
        pmremCubeUVPacker.dispose()

        // Add model
        const loader = new GLTFLoader()
        loader.load(getPreviewLink(this.props.model), (gltf: any) => {
          gltf.scene.traverse((child: any) => {
            if (child.isMesh) {
              child.geometry.center()
              child.castShadow = true
              child.receiveShadow = true
              child.material.envMap = this.envMap
              child.material.map.anisotropy = 16

              this.materials.full = new THREE.MeshStandardMaterial(child.material)
              
              this.materials.normal = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: child.material.normalMap
              })

              this.materials.metalness = new THREE.MeshBasicMaterial({
                color: 0x0000ff,
                map: child.material.metalnessMap
              })

              this.materials.occlusion = new THREE.MeshBasicMaterial({
                color: 0xff0000,
                map: child.material.aoMap
              })

              this.materials.roughness = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                map: child.material.roughnessMap
              })

              this.materials.wireframe = new THREE.MeshBasicMaterial({
                color: 0xe0e0ff,
                wireframe: true
              })
            }
          })
          gltf.scene.scale.set(80, 80, 80)
          this.scene.add(gltf.scene)
        }, (xhr: any) => {
          if (xhr.loaded === xhr.total) {
            this.setState({ isLoaded: true })
          }
        })
      })
    // Add renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'low-power'
    })
    this.renderer.setPixelRatio(window.devicePixelRatio * 2.0)
    this.renderer.setClearColor(new THREE.Color("hsl(0, 0%, 30%)"))
    this.renderer.setSize(width, height)
    this.renderer.gammaOutput = true
    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount() {
    this.controls.dispose()
    this.scene.dispose()
    cancelAnimationFrame(this.frameId)
    this.mount.removeChild(this.renderer.domElement)
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  animate = () => {
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  handleAutoRotate() {
    this.setState({ autoRotate: !this.state.autoRotate }, () => {
      this.controls.autoRotate = this.state.autoRotate
    })
  }

  handleFullscreen() {
    if (this.state.fullScreen === false) {
      this.setState({ fullScreen: true })
      this.mount.requestFullscreen().then(() => this.updateRenderer())
    } else {
      this.setState({ fullScreen: false })
      document.exitFullscreen().then(() => this.updateRenderer())
    }
  }

  handleMaterialSwitch(material: string) {
    this.setState({ selectedMaterial: material }, () => {
      this.scene.overrideMaterial = material !== "full" ? this.materials[material]: null
    })
  }

  updateRenderer() {
    const width = this.state.fullScreen === false ? this.mount.clientWidth : window.innerWidth
    const height = this.state.fullScreen === false ? this.mount.clientHeight : window.screen.height

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  render() {
    return (
      <React.Fragment>
        <div className="meshhouse-viewer" ref={(mount) => { this.mount = mount }}>
          <div className="meshhouse-viewer__controls">
            <img src={logo} alt="Meshhouse"/>
            <div>
              <UncontrolledButtonDropdown
                direction="up"
                size="lg"
              >
                <DropdownToggle
                  color="primary"
                  id="tooltipMaterial"
                  caret
                >
                  <FontAwesomeIcon icon={['far', 'images']} />
                  <UncontrolledTooltip
                    placement="top"
                    target="tooltipMaterial"
                  >
                    <Translate id="pages.model.viewer.material" />
                  </UncontrolledTooltip>
                </DropdownToggle>
                <DropdownMenu>
                  {Object.keys(this.materials).map((item: any, index: number) => (
                    <DropdownItem
                      key={index}
                      active={this.state.selectedMaterial === item}
                      onClick={() => { this.handleMaterialSwitch(item) }}
                    >
                      {this.materialLabels[item]}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <Button
                size="lg"
                color="primary"
                onClick={() => { this.handleAutoRotate() }}
                id="tooltipRotate"
              >
                <FontAwesomeIcon icon="redo" />
                <UncontrolledTooltip
                  placement="top"
                  target="tooltipRotate"
                >
                  <Translate id="pages.model.viewer.rotate" />
                </UncontrolledTooltip>
              </Button>
              <Button
                size="lg"
                color="primary"
                onClick={() => { this.handleFullscreen() }}
                id="tooltipFullscreen"
              >
                <FontAwesomeIcon icon="expand" />
                <UncontrolledTooltip
                  placement="top"
                  target="tooltipFullscreen"
                >
                  <Translate id="pages.model.viewer.fullscreen" />
                </UncontrolledTooltip>
              </Button>
            </div>
          </div>
        </div>
        <Loader className={classnames({ loaded: this.state.isLoaded === true })} />
        <i><Translate id="pages.model.viewer.info" /></i>
      </React.Fragment>
    )
  }
}

export default ModelViewer