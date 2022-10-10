/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import UserList from '../../components/UserList'
import { getUserList } from './../../redux/actions';

function Mogul(props) {
  const { userList } = props
  useEffect(() => {
    console.log(2);
    (async function () {
      await props.getUserList('boss')
    })()
    return () => {
    };
  }, []);
  return (
    <UserList userList={userList} />
  )
}

export default connect(
  state => ({ userList: state.userList }),
  {
    getUserList
  }
)(Mogul)