import React from 'react'
import Layout from '../../components/layout/layout'
import AdminMenu from '../../components/layout/AdminMenu'
import Dashboard from '../user/Dashboard'

const Users = () => {
  return (
    <Layout title={"Dashboard-All users"}>
    <br></br><br></br><br></br>
    <div className="row">
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
        <h1>All Users</h1>
        </div>
    </div>
       
    </Layout>
    
    
  )
}

export default Users