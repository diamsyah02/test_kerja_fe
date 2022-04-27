import { Fragment, useState } from "react"
import convertBase64 from '../utils/convertBase64'
import { postData } from '../utils/fetching'
import { connect } from "react-redux";
import { modalUpdate } from '../stores/actions'

const UpdateComponent = (props) => {
  const [name, setName] = useState(props.detail.name)
  const [qty, setQty] = useState(props.detail.qty)
  const [picture, setPicture] = useState(props.detail.picture)
  const [expired, setExpired] = useState(props.detail.expiredAt)
  const [status, setStatus] = useState(props.detail.isActive)

  async function save(e) {
    e.preventDefault();
    if(name != null && qty != null && expired != null && status != null) {
      const data = {
        name: name,
        qty: qty,
        picture: picture,
        expiredAt: expired,
        isActive: status
      }
      const result = await postData(`product/${props.detail.id}`, data)
      if (result.status === 200 || result.status === 201) {
        alert(result.data.message)
        window.location.reload()
      } else {
        if (result.status === 404)
          alert(`Opsss.. Data ${result.statusText}`)
        else
          alert(result.data.message)
      }
      return
    }
    alert('Data Harus Diisi Semua')
  }
  
  function getBase64(file) {
    convertBase64(file.target.files[0], (result) => {
      setPicture(result)
    })
  }
  return (
    <Fragment>
      <div className="absolute h-screen overflow-hidden w-full bg-black bg-opacity-75 inset-0">
        <button className="float-right py-2 px-3 mt-5 mr-5 text-white border border-white rounded" onClick={() => props.modalUpdate(false)}>X</button>
        <div className="w-full h-screen flex justify-center">
          <form onSubmit={save}>
            <div className="mb-3 text-white">
              <label htmlFor="name" className="mb-2 text-sm font-medium">Name Product</label>
              <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onInput={(text) => setName(text.target.value)} value={name} />
            </div>
            <div className="mb-3 text-white">
              <label htmlFor="qty" className="mb-2 text-sm font-medium">Qty</label>
              <input type="text" id="qty" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onInput={(text) => setQty(text.target.value)} value={qty} />
            </div>
            <div className="mb-3 text-white">
              <label htmlFor="picture" className="mb-2 text-sm font-medium">Picture</label>
              <input type="file" id="picture" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={getBase64} />
            </div>
            <div className="mb-3 text-white">
              <label htmlFor="expired" className="mb-2 text-sm font-medium">Expired</label>
              <input type="date" id="expired" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onInput={(text) => setExpired(text.target.value)} value={expired} />
            </div>
            <div className="mb-3 text-white">
              <label htmlFor="status" className="mb-2 text-sm font-medium">Status</label><br />
              <input type="checkbox" value="1" checked={status == 1 ? true : false} onChange={(text) => setStatus(text.target.value)} /> Active &nbsp;
              <input type="checkbox" value="0" checked={status == 0 ? true : false} onChange={(text) => setStatus(text.target.value)} /> Non Active
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  modalUpdate: (payload) => dispatch(modalUpdate(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateComponent);