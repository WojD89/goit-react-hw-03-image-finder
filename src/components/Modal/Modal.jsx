import css from './Modal.module.css'
import PropTypes from 'prop-types'
import React from 'react'

export const Modal = (props) => {
const { largeImageURL, tags, nnn } = props;

    React.useEffect(() => {
        const closeOnEscapePressed = (e) => {
          if (e.key === "Escape") {
            nnn();
          }
        };
        window.addEventListener("keydown", closeOnEscapePressed);
        return () =>
          window.removeEventListener("keydown", closeOnEscapePressed);
      }, []);

    return (
        <div className={css.overlay} onClick={nnn}>
            <div className={css.modal}>
                <img
                    className={css.image}
                    src={largeImageURL}
                    alt={tags}
                    
                />
            </div>
        </div>
    )
}

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    nnn: PropTypes.func.isRequired,
}