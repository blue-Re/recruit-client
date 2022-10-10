import { TabBar } from 'antd-mobile'
import React, { } from 'react'
import { useHistory, useLocation } from 'react-router-dom';

export default function FooterBar(props) {
  const history = useHistory()
  const { pathname } = useLocation();
  const { navList } = props

  const goToPath = (path) => {
    history.replace(path)
  };


  return (
    <div className='am-tab-bar' style={{ backgroundColor: 'white' }}>
      <TabBar activeKey={pathname} onChange={value => goToPath(value)}>
        {
          navList.map(item =>
          (
            <TabBar.Item
              key={item.path}
              icon={item.icon}
              title={item.text}
            />
          )
          )
        }
      </TabBar>;
    </div>
  )
}
