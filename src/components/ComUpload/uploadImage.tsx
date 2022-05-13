import React, { useState, useEffect } from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export type comuploadProps = {
  value?: any;
  onChange?: (arr?: any) => void;
  limit?: number;
  isDetail?: boolean;
};

const ImageUpload: React.FC<comuploadProps> = ({
  value = [],
  limit = 10,
  onChange,
  isDetail = false,
}) => {
  const [files, setFiles] = useState<any[]>([]);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewTitle, setPreviewTitle] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');

  // 获取上传图片的base64地址
  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    // 展示传入的文件数据
    if (value && (value.length || value.fileName)) {
      // 文件数值
      const newValues: any[] = [];
      if (value && value.length) {
        value.forEach((item: any) => {
          const newItem = item;
          if (!item.url) {
            newItem.name = item.fileName;
            newItem.url = item.fileUrl;
            newItem.uid = item.id ? item.id : Math.floor(Math.random() * 1000);
          }
          newValues.push(newItem);
        });
      } else if (value?.fileName) {
        // 文件对象
        newValues.push({
          name: value.fileName,
          url: value.url ? value.url : value.fileUrl,
          uid: value.id ? value.id : Math.floor(Math.random() * 1000),
        });
      }
      console.log(1, value);
      setFiles(newValues);
    }
  }, [value]);

  const action = `/api/upload/file`;

  // 文件上传
  const changeFile = async ({ file, fileList }: any) => {
    console.log(6, file, fileList);
    if (file.status !== 'uploading') {
      const url = await getBase64(file.originFileObj);
      // 需要改变fileList的值,否则status的状态不会改变
      fileList = fileList.map((item: any) => {
        let newItem = { ...item };
        if (item.response) {
          newItem = {
            fileName: item.name,
            fileUrl: item.response.data.fileUrl,
          };
          if (item.uid === file.uid) {
            newItem.url = url;
          }
        }
        return newItem;
      });
      onChange?.(fileList);
    }
    setFiles(fileList);
  };

  const checkFileSize = (file: any) => {
    const size = file.size / 1024 / 1024;
    if (size > 10) {
      message.warn('上传文件大小不能超过10M。');
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  // 预览图片
  const handlePreview = async (file: any) => {
    setPreviewTitle(file.fileName);
    setPreviewImage(file.url);
    setPreviewVisible(true);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  return (
    <>
      <Upload
        action={action}
        listType="picture-card"
        disabled={isDetail}
        maxCount={limit}
        onChange={changeFile}
        fileList={files}
        onPreview={handlePreview}
        beforeUpload={checkFileSize}
      >
        {limit > files.length && !isDetail && limit > value.length ? uploadButton : null}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ImageUpload;
