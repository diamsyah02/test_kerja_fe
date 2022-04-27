import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import { getData } from './utils/fetching'
import { modalAdd, modalUpdate, modalConfirm } from './stores/actions';
import AddComponent from './components/addComponent';
import UpdateComponent from './components/updateComponent';
import ConfirmComponent from './components/confirmComponent';

const App = (props) => {
  const [data, setData] = useState([])
  const [detail, setDetail] = useState([])

  useEffect(() => {
    getAllProduct()

    return () => setData([])
  }, [])

  async function getAllProduct() {
    const result = await getData('product')
    if (result.status === 200) {
      setData(result.data.result)
    } else {
      if (result.status === 404)
        alert(`Opsss.. Data ${result.statusText}`)
      else
        alert(result.data.message)
    }
  }

  function edit(item) {
    setDetail(item)
    props.modalUpdate(true)
  }

  function remove(item) {
    setDetail(item)
    props.modalConfirm(true)
  }
  return (
    <Fragment>
      <div className="p-10">
        <div className='text-4xl font-bold mb-4'>Data Product</div>
        <button className="py-2 px-6 rounded bg-blue-700 text-white mb-4" onClick={() => props.modalAdd(true)}>Tambah</button>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Expired
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  ##
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) =>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {item.name}
                  </th>
                  <td className="px-6 py-4">
                    {item.qty}
                  </td>
                  <td className="px-6 py-4">
                    <img src={item.picture} width="200" alt="" />
                  </td>
                  <td className="px-6 py-4">
                    {item.expiredAt}
                  </td>
                  <td className="px-6 py-4">
                    {item.isActive === 1 ? 'Active' : 'Non Active'}
                  </td>
                  <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3" onClick={() => edit(item)}>Edit</button>
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => remove(item)}>Hapus</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {props.showAdd &&
        <AddComponent />
      }
      {props.showUpdate &&
        <UpdateComponent detail={detail} />
      }
      {props.showConfirm &&
        <ConfirmComponent detail={detail} />
      }
    </Fragment>
  );
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  modalAdd: (payload) => dispatch(modalAdd(payload)),
  modalUpdate: (payload) => dispatch(modalUpdate(payload)),
  modalConfirm: (payload) => dispatch(modalConfirm(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
