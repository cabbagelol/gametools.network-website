
import '../../locales/config';
import { useTranslation } from 'react-i18next';

export function Footer() {
    const { t } = useTranslation();
    return (
        <div>
            <h1>{t('test')}</h1>
        </div>
    )
}