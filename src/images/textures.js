/* eslint-disable no-unused-vars */
import {
  grassImg,
  dirtImg,
  logImg,
  glassImg,
  woodImg,
  pinkImg
} from './images.js'

import { NearestFilter, RepeatWrapping, TextureLoader } from 'three'

const grassTexture = new TextureLoader().load(grassImg)
const dirtTexture = new TextureLoader().load(dirtImg)
const logTexture = new TextureLoader().load(logImg)
const glassTexture = new TextureLoader().load(glassImg)
const woodTexture = new TextureLoader().load(woodImg)
const pinkTexture = new TextureLoader().load(pinkImg)

const groundTexture = new TextureLoader().load(grassImg)


// Si no hacemos esto se aplica la imagen entera al piso y se estira.  
groundTexture.wrapS = RepeatWrapping
groundTexture.wrapT = RepeatWrapping
// --


groundTexture.magFilter = NearestFilter
grassTexture.magFilter = NearestFilter
dirtTexture.magFilter = NearestFilter
logTexture.magFilter = NearestFilter
glassTexture.magFilter = NearestFilter
woodTexture.magFilter = NearestFilter

export {
  groundTexture,
  grassTexture,
  dirtTexture,
  logTexture,
  glassTexture,
  woodTexture,
  pinkTexture
}
