import { Modal } from 'antd';
import { useTranslations } from 'next-intl';

interface DetailsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DetailsModal({ open, onClose }: DetailsModalProps) {
  const t = useTranslations('Index');

  return (
    <>
      <Modal open={open} onCancel={onClose} title={t('Details')} footer={null} centered>
        <div className="flex flex-col gap-4">
          <p style={{ whiteSpace: 'pre-line' }}>{t('DetailsContent')}</p>
        </div>
      </Modal>
    </>
  );
}