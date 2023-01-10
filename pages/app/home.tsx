import React from 'react';
import { useReadCurrenciesQuery } from '../../data/api/api.slice';
import DataGrid, { Column, Pager, Paging } from 'devextreme-react/data-grid';
import styles from '../../styles/Home.module.css';
import 'devextreme/dist/css/dx.light.css';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { convertToQueryString } from '../../utils/convertToQueryString';

const columns = [
  {name:'name', dataType: 'name' },
  {name:'code', dataType: 'code' },
  {name:'symbol', dataType: 'symbol' },
  {name:'Creation date', dataType: 'creationTime' },
];
function isNotEmpty(value: string | any[] ) {
  return value !== undefined && value !== null && value !== '';
}
const Home = () => {
  const {data } = useReadCurrenciesQuery();
  console.log(data)
  
  // const store = new CustomStore({
  //   key: 'id',
  //   load(loadOptions) => {}
  // });
  return (
    <>
    <div>home</div>
    <div className={styles.center}>
      <DataGrid 
      dataSource={data?.items}
      keyExpr="id"
      showBorders={true}
      remoteOperations={true}
      >
      
      {columns?.map((column) => (
        <Column 
        key={column.dataType}
        dataField={column.dataType}
        caption={column.name}/>
      ) )}
      <Paging defaultPageSize={20} />
      <Pager
      visible={true}
            displayMode='compact'
            showPageSizeSelector
            showInfo
            showNavigationButtons />
      </DataGrid>
    </div>
    </>
  )
}

export default Home