import { Fragment } from "react";
import { connect } from "react-redux";
import { getData } from '../utils/fetching'
import { modalConfirm } from '../stores/actions'

const ConfirmComponent = (props) => {
  async function remove() {
    const result = await getData(`product/${props.detail.id}/delete`)
    if (result.status === 200) {
      window.location.reload()
    } else {
      if (result.status === 404)
        alert(`Opsss.. Data ${result.statusText}`)
      else
        alert(result.data.message)
    }
  }

  return (
    <Fragment>
      <div className="absolute h-screen overflow-hidden w-full bg-black bg-opacity-75 inset-0 flex justify-center items-center">
        <div className="w-full md:w-1/2 p-5 border border-white rounded">
          <p className="text-white mb-6">Yakin data ini mau dihapus?</p>
          <div className="w-full" align="right">
            <button className="w-full md:w-1/2 py-2 px-5 bg-blue-700 rounded text-white" onClick={remove}>Ya</button> &nbsp;
            <button className="w-full md:w-1/2 py-2 px-5 bg-white rounded" onClick={() => props.modalConfirm(false)}>Tidak</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  modalConfirm: (payload) => dispatch(modalConfirm(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmComponent)