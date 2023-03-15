import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Dialog } from 'hds-react';
import useContainerDimensions from '../../hooks/useContainerDimensions';
import { FoulAttachment } from '../../interfaces/foulInterfaces';
import { useTranslation } from 'react-i18next';
import './ImageViewer.css';

type PreviewImageProps = {
  image: FoulAttachment;
  index: number;
  handleImageClick: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const PreviewImage: FC<PreviewImageProps> = ({
  image,
  index,
  handleImageClick
}) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const { width } = useContainerDimensions(imageRef);

  /* Set height to be the same as width when we get it from the hook,
     to make the preview images appear square and scale with screen width */
  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.cssText = `height: ${width}px`;
    }
  }, [width]);

  return (
    <input
      ref={imageRef}
      alt={t('imageViewer:image-input-alt')}
      formMethod="dialog"
      data-testid="clickable-image"
      type="image"
      src={image.data}
      className="imageViewer-preview-image"
      onClick={handleImageClick}
      value={index}
    />
  );
};

type ImageViewerProps = {
  images: Array<FoulAttachment>;
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
            src={images[currentImage].data}
            className="imageViewer-dialog-image"
          />
          <span className="imageViewer-dialog-text">
            {t('imageViewer:image')} {currentImage + 1} / {images.length}
          </span>
        </Dialog.Content>
        <Dialog.ActionButtons className="imageViewer-button-container">
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
          <PreviewImage
            key={index}
            image={image}
            index={index}
            handleImageClick={handleImageClick}
          />
        ))}
      </div>
    </>
  );
};

export default ImageViewer;
