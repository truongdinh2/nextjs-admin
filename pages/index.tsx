import 'antd/dist/antd.css';
import React from 'react'
import Layout from './layout';
export default function Home(props:any) {
  const employees = props.employees
  console.log(employees)
  return (
    <Layout title="create app">
      <h1 className="title">Set up </h1>
    </Layout>
  )
}
export const getStaticProps = async () => {
  const link = process.env.NAME;
  const res = await fetch(link)
  const employees = await res.json();
  return {
      props: {
          employees,
      },
  };
};