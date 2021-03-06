import React from "react"
import { FaExternalLinkAlt } from 'react-icons/fa'
 
export default function Saved (props) {

  return (
    <React.Fragment>
      <h4>Saved</h4>

      {props.savedImages.length === 0 &&
        <span>No saved images</span>
      }

      {props.savedImages.map((image) => (
        <div className="external-link" key={image.id}>
          <a href={image.previewURL} target='_blank' rel='noopener noreferrer'>
            <span className="saved-id-wrapper">#{image.id}</span>
            <FaExternalLinkAlt color='#6610f2' size={15}/>
          </a>
        </div>
      ))}
      
    </React.Fragment>
  );
}