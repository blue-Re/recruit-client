/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import UserList from '../../components/UserList'
import { getUserList } from './../../redux/actions';

function Boss(props) {
  const { userList } = props
  useEffect(() => {
    (async function () {
      await props.getUserList('mogul')
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
)(Boss)