import { useEffect, useState } from 'react';

import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import darkModeLogo from '@/assets/svg/darkModeLogo.svg';
import navLogo from '@/assets/svg/navLogo.svg';
import styles from '@/assets/styles/admin/Navbar.module.scss';
import { useGetProfileInfoQuery } from '@/api/general/auth_api';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Navbar = ({}) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);
   const { data: employee, refetch } = useGetProfileInfoQuery();

   const { t, i18n } = useTranslation();
   const [date, setDate] = useState('');

   const getDate = () => {
      const date = new Date();
      setDate(date.toLocaleDateString());
   };
   useEffect(() => {
      getDate();
      refetch();
   }, []);

   return (
      <div className={styles.main} style={{ backgroundColor: isDarkMode && '#455E83' }}>
         <div className={styles.head}>
            <div className={styles.block1}>
               <img src={isDarkMode ? darkModeLogo : navLogo} alt='logo' />
            </div>
            <div className={styles.avatarBlock}>
               <Avatar size={45} icon={<UserOutlined />} />
               <div className={styles.avatarChildBlock}>
                  <p style={{ color: isDarkMode && 'white' }}>{employee?.username}</p>
                  <p style={{ color: isDarkMode && '#92BFFF' }}>{t('navbar.admin')}</p>
               </div>
            </div>
         </div>
         <div className={styles.footer}>
            <p style={{ color: isDarkMode && 'white' }}>
               {t('navbar.date')}: {date}
            </p>
         </div>
      </div>
   );
};

export default Navbar;
