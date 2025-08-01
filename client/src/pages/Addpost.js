import React, { useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Row, Col, Form, Input, Button} from 'antd';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/actions/postActions';

const {TextArea} = Input;

function Addpost() { 
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
  }
}

  const addpost = (values) => {
    values.image = image; 
    dispatch(addPost(values));
  }

  return (
    <DefaultLayout >
        
          <Row justify='center'>
            <Col lg={12}>
                <Form className='bs1 p-4 mt-5' layout='vertical' onFinish={addpost}>
                  <h3>Add New Post</h3>
                    <Form.Item name='description' label='Description' rules={[{required: true, message: 'Description is required'}]}>
                        <TextArea/>
                    </Form.Item>

                    <Form.Item name='image' label='Image' rules={[{required: true, message: 'Image is required'}]}>
                        <Input type='file' onChange={handleFileInput}/>
                    </Form.Item>

                    
                    {image !== '' && <img src={image} alt='post' className='img-fluid mt-3'/>}
                    
                    <div className='text-left mt-3'>
                    <Button type='primary' htmlType='submit' className='mt-3'>Post</Button>
                    </div>
                </Form>
            </Col>
            </Row>

    </DefaultLayout>
  )
}

export default Addpost