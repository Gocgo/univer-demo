import { useRef, useState } from 'react';
import UniverSheet from '../../components/UniverSheet';
import { DEFAULT_WORKBOOK_DATA } from '../../assets/default-workbook-data';
import { Button } from 'antd';

function Home () {
  const [data] = useState(DEFAULT_WORKBOOK_DATA);
  const univerRef = useRef();

  return (
    // <UniverSheet style={{ flex: 1 }} ref={univerRef} data={data} />

    <div id="root" style={{height: '100%'}}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{height: '100%'}} className="bar">
          <Button
            onClick={() => {
              console.log(univerRef.current?.getData());
            }}
          >
            Get Data
          </Button>
        </div>
        <UniverSheet style={{ flex: 1 }} ref={univerRef} data={data} />
      </div>
    </div>
  );
}

export default Home;
