import React from 'react';
import Instruction from '../components/Instruction';
import Layout from '../components/Layout';
import TaskForm from '../components/TaskForm';

const Home = () => (
  <Layout>
    <Instruction />
    <TaskForm />
  </Layout>
);

export default Home;
