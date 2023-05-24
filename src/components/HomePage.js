import React from 'react';
import AdminBoard from './AdminBoard';
import './Design.css';
export default function HomePage() {
  return (
    <div className="container">
      <div className="header">here is the header</div>
      <div className="userList">
        <span>Users</span>
        {<AdminBoard />}
      </div>
      {/*<div className="userList">{<AdminBoard />}</div>*/}
      <div className="users"> </div>
    </div>
  );
}
