
import { Grid, List } from 'antd-mobile'
import React, { useState, useEffect } from 'react'

export default function HeaderSelect(props) {
  const [header, setHeader] = useState('');
  const [headerList, setHeaderList] = useState([]);

  function getHeaderLists() {
    const headerList = []
    for (let i = 0; i < 20; i++) {
      headerList.push({
        text: `头像${i + 1}`,
        icon: require(`../../assets/images/头像${i + 1}.png`)
      })
    }
    setHeaderList(headerList)
  }

  const handleHeader = (header) => {
    // console.log(header);
    props.getHeader(header)
    setHeader(header)
  };


  useEffect(() => {
    getHeaderLists()
    return () => {
    };
  }, []);
  return (
    <List header="请选择头像">
      {header ? <div style={{ textAlign: 'center' }}><img src={header} alt=""/></div> : ''}
      <Grid columns={5}>
        {
          headerList.map(item => {
            return (
              <Grid.Item key={item.text} onClick={() => handleHeader(item.icon)}>
                <div style={{ padding: '5px', textAlign: 'center' }}>
                  <img src={item.icon} alt="" />
                  <span>{item.text}</span>
                </div>
              </Grid.Item>
            )
          })
        }
      </Grid>
    </List>
  )
}
