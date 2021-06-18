import { h } from 'preact';
import 'style/index.css';


const HelloWorld = ({ name='World', color='black' }) => {
  return <h1 style={{ color }}>{`Hello ${name}!`}</h1>
}


export default HelloWorld;
