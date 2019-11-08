import React from 'react'
import { Engine, Model, Scene, withBabylonJS } from 'react-babylonjs'
import { Color3, Vector3, Tools } from '@babylonjs/core'

const EngineWithContext = withBabylonJS(Engine)
const url = 'http://172.16.1.45/upload/interactive/BoomBox.glb'
const EnvironmentOptions:any = {
  cameraExposure: 1.5,
  enableGroundShadow: true,
  groundYBias: 1,
  groundSize: 100,
  sizeAuto: false,
  skyboxSize: 200,
  rootPosition: new Vector3(0, -0.5, 0),
  groundColor: Color3.FromHexString("#74b9ff"),
  skyboxColor: Color3.FromHexString("#74b9ff"),
  toneMappingEnabled: true
}

const ModelViewer = (props: any) => (
  <React.Fragment>
    <EngineWithContext
      antialias={true}
      adaptToDeviceRatio={true}
      canvasId="meshhouse-viewer"
    >
      <Scene>
        <arcRotateCamera
          name="arc"
          target={new Vector3(0, 1, 0)}
          alpha={Math.PI / 1.5}
          beta={(0.5 + (Math.PI / 4))}
          radius={8}
          minZ={0.001}
          wheelPrecision={50}
          lowerRadiusLimit={4}
          upperRadiusLimit={30}
          upperBetaLimit={Math.PI}
        />
        <directionalLight
          name="dl"
          direction={new Vector3(0, -0.5, 0.5)}
          position={new Vector3(0, 50, 0.5)}
          autoUpdateExtends={true}
        >
        </directionalLight>
        <Model
          scaleToDimension={3}
          position={new Vector3(0, 1, 0)}
          sceneFilename={Tools.GetFilename(url)}
          rootUrl={Tools.GetFolderPath(url)}
        />
        <environmentHelper options={EnvironmentOptions} />
      </Scene>
    </EngineWithContext>
    <i>Model preview may differs from real model</i>
  </React.Fragment>
)

export default ModelViewer