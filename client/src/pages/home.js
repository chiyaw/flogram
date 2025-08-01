import React, { useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../redux/actions/postActions';
import { Row, Col } from 'antd';
import Post from '../components/Post';

function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postsReducer);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <DefaultLayout>
      <Row justify='center'>


        <Col lg={12} xs={24}>
        
        {posts.map((post)=>{
          return <Post post={post} />
})}

        </Col>


      </Row>

    </DefaultLayout>
  )
}

export default Home