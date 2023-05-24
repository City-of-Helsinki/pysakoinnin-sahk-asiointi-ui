/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React, { FC, useState } from 'react';
import {
  Button,
  Dialog,
  IconDocument,
  IconPrinter,
  Notification
} from 'hds-react';
import { useTranslation } from 'react-i18next';
import { formatDate, formatDateTime, sortByDate } from '../../utils/helpers';
import RectificationSummary from '../rectificationSummary/RectificationSummary';
import { ObjectionDocument } from '../../interfaces/objectionInterfaces';
import { FoulData } from '../../interfaces/foulInterfaces';
import { TransferData } from '../../interfaces/transferInterfaces';
import './RectificationListDetails.css';

interface Props {
  form: ObjectionDocument;
  formType: string;
  foulData?: FoulData;
  transferData?: TransferData;
}

const RectificationListDetails: FC<Props> = ({
  form,
  formType,
  foulData,
  transferData
}): React.ReactElement => {
  const { t } = useTranslation();
  const isDueDateForm = form.content?.dueDate;
  const notificationType = isDueDateForm ? formType : form.status.value;
  const [notificationOpen, setNotificationOpen] = useState(
    isDueDateForm || form.status.value === 'resolvedViaMail'
  );
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const decision = foulData
    ? foulData.attachments.find(attachment => attachment.attachmentType === 1)
    : transferData?.attachments.find(
        attachment => attachment.attachmentType === 1
      );

  const closeFormDialog = () => {
    setFormDialogOpen(false);
    document.body.classList.remove('modal-open');
  };

  // Opens a decision pdf in a new window
  const openDecisionDocument = async () => {
    if (decision) {
      const byteCharacters = atob(decision.data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const file = new Blob([byteArray], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    }
  };

  return (
    <div className="rectification-details">
      <div className="rectification-details-log">
        <div className="rectification-details-events">
          <span className="rectification-details-title">
            {t('landing-page:list:details:events')}
          </span>
          <p>
            {formatDateTime(form.status.timestamp)}{' '}
            {t(`landing-page:list:status:${form.status.value}:default`)}
          </p>
          {form?.status_histories
            .sort((a, b) => sortByDate(a.timestamp, b.timestamp, true))
            .map((event, i) => (
              <p key={i}>
                {formatDateTime(event.timestamp)}{' '}
                {t(`landing-page:list:status:${event.value}:default`)}
              </p>
            ))}
        </div>
        {!isDueDateForm && (
          <div className="rectification-details-attachments">
            <span className="rectification-details-title">
              {t('landing-page:list:details:attachments')}
            </span>
            {form?.content.attachments?.map((attachment, i) => (
              <p key={i}>{attachment.fileName}</p>
            ))}
          </div>
        )}
      </div>
      <div className="rectification-details-button-container">
        {notificationOpen && (
          <Notification
            size="small"
            label={t(
              `landing-page:list:details:notification:${notificationType}:label`
            )}
            dismissible
            closeButtonLabelText={t('common:close-notification') as string}
            onClose={() => setNotificationOpen(false)}>
            {t(
              `landing-page:list:details:notification:${notificationType}:text`,
              {
                dueDate:
                  form.content.dueDate && formatDate(form.content.dueDate)
              }
            )}
          </Notification>
        )}
        {decision && (
          <Button
            iconRight={<IconDocument />}
            onClick={() => openDecisionDocument()}>
            {t('landing-page:list:details:open-decision')}
          </Button>
        )}
        {!isDueDateForm && (
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setFormDialogOpen(true);
                document.body.classList.add('modal-open');
              }}>
              {t('landing-page:list:details:show-form')}
            </Button>
            <Dialog
              id="form-summary-dialog"
              aria-labelledby={t(`${formType}:title`)}
              isOpen={formDialogOpen}
              close={closeFormDialog}
              closeButtonLabelText={
                t('common:close-rectification-dialog') as string
              }
              scrollable>
              <Dialog.Header
                id="form-summary-dialog-header"
                title={t(`${formType}:title`)}
              />
              <Dialog.Content>
                <div id="form-summary-dialog-content">
                  <RectificationSummary
                    form={form.content}
                    formType={formType}
                    foulData={foulData}
                    transferData={transferData}
                    editMode={false}
                    formFiles={{
                      attachments: form.content.attachments
                        ? form.content.attachments.map(
                            file =>
                              new File([file.data], file.fileName, {
                                type: file.mimeType
                              })
                          )
                        : [],
                      poaFile: []
                    }}
                  />
                </div>
              </Dialog.Content>
              <Dialog.ActionButtons className="form-summary-dialog-buttons">
                <Button className="button-close" onClick={closeFormDialog}>
                  {t('common:close')}
                </Button>
                <Button
                  className="button-print"
                  onClick={() => window.print()}
                  iconLeft={<IconPrinter />}
                  variant="secondary">
                  {t('common:print')}
                </Button>
              </Dialog.ActionButtons>
            </Dialog>
          </>
        )}
      </div>
      <div id="rectification-summary-print" aria-hidden="true">
        <RectificationSummary
          form={form.content}
          formType={formType}
          foulData={foulData}
          transferData={transferData}
          editMode={false}
          formFiles={{
            attachments: form.content.attachments
              ? form.content.attachments.map(
                  file =>
                    new File([file.data], file.fileName, {
                      type: file.mimeType
                    })
                )
              : [],
            poaFile: []
          }}
        />
      </div>
    </div>
  );
};

export default RectificationListDetails;
