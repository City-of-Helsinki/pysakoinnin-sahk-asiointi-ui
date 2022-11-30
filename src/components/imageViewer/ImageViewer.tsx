import { Button, Dialog } from 'hds-react';
import React, { useState } from 'react';

import './ImageViewer.css';
import { useTranslation } from 'react-i18next';

type ImageViewerProps = {
  images: Array<string>;
};

const ImageViewer = (props: ImageViewerProps) => {
  const { images } = props;

  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleImageClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setModalOpen(true);
    setCurrentImage(Number(e.currentTarget.value));
  };

  const closeDialog = () => setModalOpen(false);

  const nextImage = () => {
    if (currentImage !== images.length) {
      setCurrentImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage !== 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  return (
    <>
      <Dialog
        id="imageViewer"
        data-testid="image-viewer"
        aria-labelledby={t('imageViewer:header')}
        isOpen={modalOpen}
        close={closeDialog}
        closeButtonLabelText={t('imageViewer:closebutton-text')}
        className="imageViewer-dialog">
        <Dialog.Header
          id="imageviewer-header"
          title={t('imageViewer:header')}
        />
        <Dialog.Content>
          <img
            data-testid="image"
            src={images[currentImage]}
            className="imageViewer-dialog-image"
          />
          <span className="imageViewer-dialog-text">
            {t('imageViewer:image')} {currentImage + 1} / {images.length}
          </span>
        </Dialog.Content>
        <Dialog.ActionButtons>
          <Button onClick={previousImage} disabled={currentImage === 0}>
            {t('imageViewer:previous-image')}
          </Button>
          <Button
            onClick={nextImage}
            disabled={currentImage === images.length - 1}>
            {t('imageViewer:next-image')}
          </Button>
        </Dialog.ActionButtons>
      </Dialog>
      <div className="imageViewer-preview-container">
        {images.map((image, index) => (
          <input
            alt={t('imageViewer:image-input-alt')}
            formMethod="dialog"
            data-testid="clickable-image"
            key={index}
            type="image"
            src={image}
            className="imageViewer-preview-image"
            onClick={handleImageClick}
            value={index}
          />
        ))}
      </div>
    </>
  );
};

export default ImageViewer;
