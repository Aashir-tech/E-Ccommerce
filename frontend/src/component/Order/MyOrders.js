import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import './myOrders.css';
import { useSelector , useDispatch } from 'react-redux';
import { clearErrors , myOrders} from '../../redux/slice/orderSlice';
import Loader from '../layout/Loader/loader';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Typography } from '@mui/material';
import MetaData from '../layout/MetaData';
import LaunchIcon from '@mui/icons-material/Launch';

const MyOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {isLoading , isError , errorMessage , orders} = useSelector((state) => state.myOrders);
    const {user} = useSelector((state) => state.user);
    

    const columns = [
        {
            field : "id",
            headerName : "Order ID",
            minWidth : 300,
            flex : 0.9
        },
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
          cellClassName: (params) => {
            return params.value === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Link to={`/order/${params.id}`}>
                <LaunchIcon />
              </Link>
            );
          },
        }
    ]

    const rows = []

    orders && 
        orders.forEach((item , index) => {
            rows.push({
                itemsQty : item.orderItems.length,
                id : item._id,
                status : item.orderStatus,
                amount : item.totalPrice
            })
        });

    useEffect(() => {
        if(isError) {
            alert.error(errorMessage);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    } ,[dispatch , alert , isError , errorMessage])
  return (
    <>
    <MetaData title={`${user?.name} - Orders`} />

    {isLoading ? (
        <Loader />
    ) : (
        <div className="myOrdersPage">
            <DataGrid 
            rows={rows}
            columns={columns}
            pageSizeOptions={10}
            disableRowSelectionOnClick
            className='myOrdersTable'
            autoHeight
            />

            <Typography id = "myOrdersHeading"> {user?.name}'s Orders</Typography>
        </div>
    ) }
    </>
  )
}

export default MyOrders