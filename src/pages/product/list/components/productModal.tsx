import React, { useRef } from 'react'
import { Modal } from 'antd'
import ProductInfo from '@/components/ProductInfo'

export type productProps = {
  modalVisible: boolean
  infoData?: any
  onCancel: () => void
}

const ProductModal = ({modalVisible, infoData, onCancel}: productProps) => {

  const productRef = useRef<any>({})

  const onSubmit = async() => {
    const form = productRef.current.getForm()
    await form.validateFields()
    const data = form.getFieldsValue()
    console.log(data)
  }

  return (
    <Modal
      title='产品信息'
      width={1000}
      visible={modalVisible}
      onOk={onSubmit}
      onCancel={onCancel}
    >
      <ProductInfo infoData={infoData} ref={productRef} />
    </Modal>
  )
}

export default ProductModal