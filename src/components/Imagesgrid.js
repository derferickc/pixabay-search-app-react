import React, { Component } from "react"
import Tile from './Tile'
 
class ImagesGrid extends Component {

  render() {
    return (
      <div>
        {this.props.images.map((image, index) => (
          <Tile
            index={index}
            key={image.id}
            id={image.id}
            likes={image.likes}
            favorites={image.favorites}
            previewURL={image.previewURL}
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            savePicture={this.props.savePicture}
            savedImages={this.props.savedImages}
            />
        ))}
      </div>
    )
  }
}
 
export default ImagesGrid;