import React from 'react';
import { useReadCurrenciesQuery } from '../../data/api/api.slice';
import DataGrid from 'devextreme-react/data-grid';
import styles from '../../styles/Home.module.css';
import 'devextreme/dist/css/dx.light.css';

const columns = ['Name', 'Code', 'Symbol', 'Conversion'];

const Home = () => {
  const {data } = useReadCurrenciesQuery();
  console.log(data)
  return (
    <>
    <div>home</div>
    <div className={styles.center}>
      <DataGrid 
      defaultColumns={columns}/>
    </div>
    </>
  )
}

export default Home