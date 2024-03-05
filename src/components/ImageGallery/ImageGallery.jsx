import { Component, createRef } from 'react'
import css from './ImageGallery.module.css'
import PropTypes from 'prop-types'
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'



export class ImageGallery extends Component {
    constructor(props) {
        super(props)
        this.listRef = createRef()
    }

    

    
    

    render() {
        

        return (
            <div>
                <ul className={css.gallery} ref={this.listRef}>
                    {this.props.images.map(({ id, ...rest }) => (
                        <ImageGalleryItem
                            key={id}
                            {...rest}
                            onClick={this.props.openModal}
                        ></ImageGalleryItem>
                    ))}
                </ul>

                
            </div>
        )
    }
}

ImageGallery.propTypes = {
    images: PropTypes.array,
    openModal: PropTypes.func,
}