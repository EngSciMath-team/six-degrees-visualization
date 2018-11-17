import * as topojson from 'topojson'

// This class is not supposed to be used directly, it is only extended
export default class Layer {
  constructor (options) {
    this.parent = null
    this.g = null

    // Generate unique id
    this.id = 'd' + Math.random().toString().replace('0.', '')

    // If a topojson file is passed
    if (options.type === 'topojson') {
      let file = options.file
      let geojson = topojson.feature(file, file.objects[options.object])
      this.features = geojson.features
    }

    // TODO add other files?

    // Add attribute data
    if (options.attributes) {
      this.attributes = options.attributes

      if (options.nameAttribute) {
        this.nameToIndex = {}
        this.indexToName = {}

        for (let i = 0; i < this.features.length; i++) {
          let name = this.attributes[i][options.nameAttribute]
          this.nameToIndex[name] = i
          this.indexToName[i] = name
        }
      }
    }
  }
}